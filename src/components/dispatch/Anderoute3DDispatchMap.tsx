/**
 * Anderoute3DDispatchMap — Google Maps-powered logistics intelligence map.
 *
 * Uses the Google Maps JavaScript API (v=beta) with:
 *   • AdvancedMarkerElement (when Map ID is configured, falls back to standard Marker)
 *   • google.maps.places.Autocomplete for address/POI search
 *   • google.maps.Polygon for geofence overlays
 *   • TrafficLayer for real-time traffic
 *   • Tilt (45°) for 3D perspective view
 *   • Logistics-optimised dark style (applied when no Map ID is used)
 *
 * Required env:
 *   VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY — Maps JS API key
 *
 * Optional env:
 *   VITE_GOOGLE_MAPS_MAP_ID — Map ID for AdvancedMarkerElement and Cloud-based
 *   styling. When set, Cloud Console dark style replaces the inline DARK_LOGISTICS_STYLE.
 *   When not set, inline dark styles are applied and standard Markers are used.
 *
 * Note: `styles` and `mapId` are mutually exclusive in the Google Maps JS API.
 * Set VITE_GOOGLE_MAPS_MAP_ID and configure dark styling in Cloud Console for
 * production deployments that require AdvancedMarkerElement.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Plus,
  Minus,
  Compass,
  Maximize2,
  Wifi,
  WifiOff,
  Loader2,
  Building2,
  Layers,
} from "lucide-react";

import { useLiveDriverLocations } from "@/hooks/useLiveDriverLocations";
import { useLogisticsMapPois } from "@/hooks/useLogisticsMapPois";
import { useMapLayerPreferences } from "@/hooks/useMapLayerPreferences";
import { useMapSavedViews } from "@/hooks/useMapSavedViews";
import { useMapGeofences } from "@/hooks/useMapGeofences";

import { MapLayerControlPanel } from "./MapLayerControlPanel";
import { MapPoiPanel } from "./MapPoiPanel";
import { MapSavedViewsPanel } from "./MapSavedViewsPanel";
import { MapGeofencePanel } from "./MapGeofencePanel";
import { SelectedMapObjectCard } from "./SelectedMapObjectCard";
import { POI_CATEGORY_META } from "./poiHelpers";

import type {
  LayerKey,
  LiveDriverLocation,
  MapGeofence,
  MapPoi,
  MapSavedView,
  PoiCategory,
  SelectedObjectType,
} from "@/types/map";

// ─── Google Maps loader ───────────────────────────────────────────────────────

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    __anderouteGmInit?: () => void;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GMap = any;

let gmPromise: Promise<void> | null = null;

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.Map) return Promise.resolve();
  if (gmPromise) return gmPromise;

  // Primary: VITE_GOOGLE_MAPS_API_KEY
  // Fallback: legacy VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY
  const key =
    (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) ||
    (import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined);
  const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as
    | string
    | undefined;

  if (!key) {
    return Promise.reject(
      new Error("Google Maps API key not set. Add VITE_GOOGLE_MAPS_API_KEY to your .env file."),
    );
  }

  gmPromise = new Promise<void>((resolve, reject) => {
    window.__anderouteGmInit = () => {
      if (window.google?.maps) {
        resolve();
      } else {
        reject(new Error("Google Maps loaded but google.maps is unavailable."));
      }
    };
    const s = document.createElement("script");
    s.src = [
      `https://maps.googleapis.com/maps/api/js?key=${key}`,
      `v=beta`,
      `libraries=marker,places`,
      `callback=__anderouteGmInit`,
      channel ? `channel=${channel}` : "",
    ]
      .filter(Boolean)
      .join("&");
    s.async = true;
    s.defer = true;
    s.onerror = () => {
      gmPromise = null;
      reject(
        new Error(
          "Google Maps script failed to load. Check your API key and referrer restrictions.",
        ),
      );
    };
    document.head.appendChild(s);
  });

  return gmPromise;
}

// ─── Logistics dark map style (used when mapId is NOT configured) ─────────────
// Emphasises interstates and highways for truck route visibility.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DARK_LOGISTICS_STYLE: any[] = [
  { elementType: "geometry", stylers: [{ color: "#0b1526" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b1526" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b8099" }] },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1e3a5f" }],
  },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#0f1e33" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1a2d48" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#20364f" }] },
  { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#162540" }] },
  // Highways teal — truck route visibility
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2a4a6e" }] },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#14b8a6" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{ color: "#1d5c8f" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "labels.text.fill",
    stylers: [{ color: "#38d9c8" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#0f1e33" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#060e1c" }] },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#1e4068" }],
  },
];

// ─── Status colors ─────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  driving: "#14b8a6",
  idle: "#f59e0b",
  loading: "#3b82f6",
  unloading: "#8b5cf6",
  break: "#f97316",
  offline: "#475569",
};

// ─── Marker content builders ──────────────────────────────────────────────────

function createDriverContent(driver: LiveDriverLocation, selected: boolean): HTMLElement {
  const color = STATUS_COLORS[driver.status] ?? "#475569";
  const size = selected ? 40 : 30;
  const ring = selected ? `box-shadow:0 0 0 3px ${color}40,0 0 12px ${color}60;` : "";
  const opacity = driver.is_stale ? "0.45" : "1";
  const heading = driver.heading ?? 0;

  const el = document.createElement("div");
  el.style.cssText = `
    width:${size}px;height:${size}px;border-radius:50%;
    background:${color};border:2px solid white;
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;${ring}opacity:${opacity};
    transition:transform 0.2s;transform:scale(${selected ? 1.15 : 1});
  `;
  el.innerHTML = `
    <svg width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 12 12"
         style="transform:rotate(${heading}deg)" fill="none">
      <polygon points="6,1 9.5,10 6,8 2.5,10" fill="white" opacity="0.95"/>
    </svg>`;
  return el;
}

function createPoiContent(poi: MapPoi, selected: boolean): HTMLElement {
  const meta = POI_CATEGORY_META[poi.category] ?? POI_CATEGORY_META.custom;
  const size = selected ? 38 : 30;
  const ring = selected ? `box-shadow:0 0 0 3px ${meta.color}50,0 0 10px ${meta.color}60;` : "";

  const el = document.createElement("div");
  el.style.cssText = `
    width:${size}px;height:${size}px;border-radius:${selected ? "10px" : "8px"};
    background:${meta.color};border:2px solid white;
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;font-size:${size * 0.45}px;line-height:1;${ring}
    transition:transform 0.2s;transform:scale(${selected ? 1.15 : 1});
  `;
  el.textContent = meta.emoji;
  return el;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  className?: string;
  compact?: boolean;
}

export function Anderoute3DDispatchMap({ className, compact = false }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const mapRef = useRef<GMap>(null);
  const trafficLayerRef = useRef<GMap>(null);
  const driverMarkersRef = useRef<Map<string, GMap>>(new Map());
  const poiMarkersRef = useRef<Map<string, GMap>>(new Map());
  const geofencePolygonsRef = useRef<GMap[]>([]);
  const usingAdvancedMarkers = useRef(false);

  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [currentViewId, setCurrentViewId] = useState<string | null>("usa");
  const [searchQuery, setSearchQuery] = useState("");
  const [is3D, setIs3D] = useState(false);

  const [selectedObj, setSelectedObj] = useState<{
    type: SelectedObjectType;
    data: LiveDriverLocation | MapPoi | MapGeofence | null;
  }>({ type: null, data: null });

  const [activePoiCategories, setActivePoiCategories] = useState<Set<PoiCategory>>(
    new Set<PoiCategory>(["depot", "warehouse", "truck_stop", "airport", "fuel"]),
  );

  const { drivers, loading: driversLoading, realtimeStatus } = useLiveDriverLocations();
  const { pois, loading: poisLoading } = useLogisticsMapPois();
  const { layers, toggleLayer, isEnabled, applyViewLayerSettings } = useMapLayerPreferences();
  const { views, loading: viewsLoading } = useMapSavedViews();
  const { geofences, loading: geofencesLoading } = useMapGeofences();

  // ─── Init map ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;
    let cancelled = false;

    const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined;

    // Google Maps calls this global when the API key is invalid or the referrer
    // is not authorised. We intercept it to show our own friendly error overlay.
    // Google Maps calls this global when the API key is rejected or the referrer
    // is not in the allowed list. We intercept it to show our actionable error card.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gm_authFailure = () => {
      if (!cancelled) {
        setMapError("referrer_restriction");
        setMapReady(false);
      }
    };

    loadGoogleMaps()
      .then(() => {
        if (cancelled || !mapContainerRef.current || !window.google?.maps?.Map) return;
        const g = window.google.maps;

        // When mapId is provided use it (Cloud styling + AdvancedMarker support).
        // When not provided use inline dark styles — styles and mapId are mutually exclusive.
        const mapOptions: Record<string, unknown> = {
          center: { lat: 39.8283, lng: -98.5795 },
          zoom: 4,
          disableDefaultUI: true,
          gestureHandling: "greedy",
          backgroundColor: "#0b1526",
        };

        if (mapId) {
          mapOptions.mapId = mapId;
        } else {
          mapOptions.styles = DARK_LOGISTICS_STYLE;
        }

        const map: GMap = new g.Map(mapContainerRef.current, mapOptions);
        mapRef.current = map;

        // Determine marker strategy
        usingAdvancedMarkers.current = !!(mapId && g.marker?.AdvancedMarkerElement);

        try {
          trafficLayerRef.current = new g.TrafficLayer();
        } catch {
          // TrafficLayer unavailable — skip silently
        }

        setMapReady(true);
      })
      .catch((e: Error) => {
        if (!cancelled) setMapError(e?.message ?? "Failed to load Google Maps");
      });

    const driverMarkers = driverMarkersRef.current;
    const poiMarkers = poiMarkersRef.current;
    return () => {
      cancelled = true;
      for (const m of driverMarkers.values()) {
        try {
          if (usingAdvancedMarkers.current) {
            m.map = null;
          } else {
            m.setMap(null);
          }
        } catch {
          /* ignore */
        }
      }
      for (const m of poiMarkers.values()) {
        try {
          if (usingAdvancedMarkers.current) {
            m.map = null;
          } else {
            m.setMap(null);
          }
        } catch {
          /* ignore */
        }
      }
      driverMarkers.clear();
      poiMarkers.clear();
      mapRef.current = null;
      setMapReady(false);
    };
  }, []);

  // ─── Places Autocomplete ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!mapReady || !searchInputRef.current || !window.google?.maps?.places?.Autocomplete) return;
    try {
      const ac = new window.google.maps.places.Autocomplete(searchInputRef.current, {
        fields: ["geometry", "name", "formatted_address"],
      });

      ac.addListener("place_changed", () => {
        try {
          const place = ac.getPlace();
          if (!place?.geometry?.location) return;
          if (place.geometry.viewport) {
            mapRef.current?.fitBounds(place.geometry.viewport);
          } else {
            mapRef.current?.setCenter(place.geometry.location);
            mapRef.current?.setZoom(14);
          }
          setSearchQuery(place.name ?? place.formatted_address ?? "");
        } catch {
          /* ignore */
        }
      });

      return () => {
        try {
          window.google?.maps?.event?.clearInstanceListeners(ac);
        } catch {
          /* ignore */
        }
      };
    } catch {
      /* Autocomplete unavailable — search input still works for local search */
    }
  }, [mapReady]);

  // ─── Traffic layer ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (!mapReady || !trafficLayerRef.current) return;
    try {
      trafficLayerRef.current.setMap(isEnabled("traffic") ? mapRef.current : null);
    } catch {
      /* ignore */
    }
  }, [mapReady, isEnabled]);

  // ─── 3D perspective (tilt) ─────────────────────────────────────────────────

  useEffect(() => {
    if (!mapReady) return;
    const enable = isEnabled("buildings_3d");
    setIs3D(enable);
    try {
      mapRef.current?.setTilt(enable ? 45 : 0);
    } catch {
      /* ignore */
    }
  }, [mapReady, isEnabled]);

  // ─── Geofence polygons ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!mapReady || !window.google?.maps?.Polygon) return;
    const g = window.google.maps;

    for (const p of geofencePolygonsRef.current) {
      try {
        p.setMap(null);
      } catch {
        /* ignore */
      }
    }
    geofencePolygonsRef.current = [];

    if (!isEnabled("geofences")) return;

    for (const gf of geofences) {
      if (!gf.is_active) continue;

      let paths: { lat: number; lng: number }[][] = [];

      if (gf.geometry?.type === "Polygon") {
        paths = gf.geometry.coordinates.map((ring) => ring.map(([lng, lat]) => ({ lat, lng })));
      } else if (gf.latitude != null && gf.longitude != null && gf.radius_m != null) {
        const steps = 36;
        const earthR = 6_371_000;
        const ring = Array.from({ length: steps }, (_, i) => {
          const angle = (i / steps) * 2 * Math.PI;
          const dLat = (gf.radius_m! / earthR) * (180 / Math.PI);
          const dLng =
            (gf.radius_m! / (earthR * Math.cos((Math.PI * gf.latitude!) / 180))) * (180 / Math.PI);
          return {
            lat: gf.latitude! + dLat * Math.sin(angle),
            lng: gf.longitude! + dLng * Math.cos(angle),
          };
        });
        paths = [ring];
      } else {
        continue;
      }

      try {
        const poly: GMap = new g.Polygon({
          paths,
          fillColor: gf.color,
          fillOpacity: 0.12,
          strokeColor: gf.color,
          strokeWeight: 2,
          strokeOpacity: 0.7,
          map: mapRef.current,
          clickable: true,
        });
        poly.addListener("click", () => setSelectedObj({ type: "geofence", data: gf }));
        geofencePolygonsRef.current.push(poly);
      } catch {
        /* ignore individual polygon failures */
      }
    }
  }, [mapReady, geofences, isEnabled]);

  // ─── Driver markers ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!mapReady || !window.google?.maps) return;
    const g = window.google.maps;
    const existing = driverMarkersRef.current;
    const showDrivers = isEnabled("drivers");
    const keepIds = new Set(showDrivers ? drivers.map((d) => d.driver_id) : []);

    for (const [id, marker] of existing) {
      if (!keepIds.has(id)) {
        try {
          if (usingAdvancedMarkers.current) {
            marker.map = null;
          } else {
            marker.setMap(null);
          }
        } catch {
          /* ignore */
        }
        existing.delete(id);
      }
    }

    if (!showDrivers) return;

    for (const driver of drivers) {
      const isSelected =
        selectedObj.type === "driver" &&
        (selectedObj.data as LiveDriverLocation)?.driver_id === driver.driver_id;
      const pos = { lat: driver.latitude, lng: driver.longitude };

      try {
        if (usingAdvancedMarkers.current && g.marker?.AdvancedMarkerElement) {
          const content = createDriverContent(driver, isSelected);
          const m = existing.get(driver.driver_id);
          if (m) {
            m.position = pos;
            m.content = content;
          } else {
            const marker: GMap = new g.marker.AdvancedMarkerElement({
              position: pos,
              map: mapRef.current,
              content,
              title: driver.driver_name ?? driver.driver_id,
              zIndex: isSelected ? 999 : 10,
            });
            marker.addListener("click", () => setSelectedObj({ type: "driver", data: driver }));
            existing.set(driver.driver_id, marker);
          }
        } else {
          // Fallback: standard Marker with custom icon
          const color = STATUS_COLORS[driver.status] ?? "#475569";
          const size = isSelected ? 30 : 22;
          const svg = encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="${isSelected ? 10 : 8}" fill="${color}" stroke="white" stroke-width="2"/>
              <polygon points="12,5 15,17 12,14 9,17" fill="white" opacity="0.9"
                transform="rotate(${driver.heading ?? 0},12,12)"/>
            </svg>`,
          );
          const icon = {
            url: `data:image/svg+xml;charset=UTF-8,${svg}`,
            scaledSize: new g.Size(size, size),
            anchor: new g.Point(size / 2, size / 2),
          };
          const m = existing.get(driver.driver_id);
          if (m) {
            m.setPosition(pos);
            m.setIcon(icon);
          } else {
            const marker: GMap = new g.Marker({
              position: pos,
              map: mapRef.current,
              icon,
              title: driver.driver_name ?? driver.driver_id,
              zIndex: isSelected ? 999 : 10,
              opacity: driver.is_stale ? 0.4 : 1,
            });
            marker.addListener("click", () => setSelectedObj({ type: "driver", data: driver }));
            existing.set(driver.driver_id, marker);
          }
        }
      } catch {
        /* ignore individual marker failures */
      }
    }
  }, [mapReady, drivers, isEnabled, selectedObj]);

  // ─── POI markers ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!mapReady || !window.google?.maps) return;
    const g = window.google.maps;
    const existing = poiMarkersRef.current;

    const categoryLayerMap: Partial<Record<PoiCategory, LayerKey>> = {
      depot: "depots",
      warehouse: "warehouses",
      customer: "customers",
      truck_stop: "truck_stops",
      fuel: "fuel",
      maintenance: "maintenance",
      airport: "airports",
      port: "ports",
      rail_yard: "rail_yards",
      store: "stores",
      landmark: "landmarks",
      lake: "lakes",
      river: "rivers",
      custom: "custom_pins",
    };

    const visibleCats = new Set<string>(
      (Object.entries(categoryLayerMap) as [PoiCategory, LayerKey][])
        .filter(([, lk]) => isEnabled(lk))
        .map(([cat]) => cat),
    );

    const keepIds = new Set(
      pois
        .filter((p) => activePoiCategories.has(p.category) && visibleCats.has(p.category))
        .map((p) => p.id),
    );

    for (const [id, marker] of existing) {
      if (!keepIds.has(id)) {
        try {
          if (usingAdvancedMarkers.current) {
            marker.map = null;
          } else {
            marker.setMap(null);
          }
        } catch {
          /* ignore */
        }
        existing.delete(id);
      }
    }

    for (const poi of pois) {
      if (!keepIds.has(poi.id)) continue;
      const isSelected = selectedObj.type === "poi" && (selectedObj.data as MapPoi)?.id === poi.id;
      const pos = { lat: poi.latitude, lng: poi.longitude };

      try {
        if (usingAdvancedMarkers.current && g.marker?.AdvancedMarkerElement) {
          const content = createPoiContent(poi, isSelected);
          const m = existing.get(poi.id);
          if (m) {
            m.position = pos;
            m.content = content;
          } else {
            const marker: GMap = new g.marker.AdvancedMarkerElement({
              position: pos,
              map: mapRef.current,
              content,
              title: poi.name,
              zIndex: 5,
            });
            marker.addListener("click", () => setSelectedObj({ type: "poi", data: poi }));
            existing.set(poi.id, marker);
          }
        } else {
          const meta = POI_CATEGORY_META[poi.category] ?? POI_CATEGORY_META.custom;
          const size = isSelected ? 32 : 26;
          const svg = encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
              <rect x="1" y="1" width="30" height="30" rx="8" fill="${meta.color}" stroke="white" stroke-width="2"/>
              <text x="16" y="22" text-anchor="middle" font-size="16">${meta.emoji}</text>
            </svg>`,
          );
          const icon = {
            url: `data:image/svg+xml;charset=UTF-8,${svg}`,
            scaledSize: new g.Size(size, size),
            anchor: new g.Point(size / 2, size / 2),
          };
          const m = existing.get(poi.id);
          if (m) {
            m.setPosition(pos);
            m.setIcon(icon);
          } else {
            const marker: GMap = new g.Marker({
              position: pos,
              map: mapRef.current,
              icon,
              title: poi.name,
              zIndex: 5,
            });
            marker.addListener("click", () => setSelectedObj({ type: "poi", data: poi }));
            existing.set(poi.id, marker);
          }
        }
      } catch {
        /* ignore individual marker failures */
      }
    }
  }, [mapReady, pois, isEnabled, activePoiCategories, selectedObj]);

  // ─── Map controls ──────────────────────────────────────────────────────────

  const zoom = (delta: number) => {
    if (!mapRef.current) return;
    try {
      mapRef.current.setZoom((mapRef.current.getZoom() ?? 4) + delta);
    } catch {
      /* ignore */
    }
  };

  const resetView = () => {
    try {
      mapRef.current?.setCenter({ lat: 39.8283, lng: -98.5795 });
      mapRef.current?.setZoom(4);
      mapRef.current?.setTilt(0);
      mapRef.current?.setHeading(0);
    } catch {
      /* ignore */
    }
  };

  const fitAll = () => {
    if (!mapRef.current || !window.google?.maps?.LatLngBounds || drivers.length === 0) return;
    try {
      const bounds = new window.google.maps.LatLngBounds();
      for (const d of drivers) bounds.extend({ lat: d.latitude, lng: d.longitude });
      mapRef.current.fitBounds(bounds, 80);
    } catch {
      /* ignore */
    }
  };

  // ─── Saved view handler ─────────────────────────────────────────────────────

  const handleSelectView = useCallback(
    (view: MapSavedView) => {
      setCurrentViewId(view.id);
      try {
        mapRef.current?.panTo({ lat: view.center_lat, lng: view.center_lng });
        mapRef.current?.setZoom(view.zoom);
        mapRef.current?.setTilt(view.pitch > 0 ? Math.min(view.pitch, 67.5) : 0);
        mapRef.current?.setHeading(view.bearing);
      } catch {
        /* ignore */
      }
      if (Object.keys(view.layer_settings).length > 0) {
        applyViewLayerSettings(view.layer_settings);
      }
    },
    [applyViewLayerSettings],
  );

  // ─── POI category toggle ────────────────────────────────────────────────────

  const togglePoiCategory = useCallback((cat: PoiCategory) => {
    setActivePoiCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden border border-[#1e3a5f] shadow-2xl bg-[#0b1526]",
        className,
      )}
      style={{ boxShadow: "0 0 0 1px rgba(20,184,166,0.08), 0 20px 60px rgba(0,0,0,0.5)" }}
    >
      {/* Google Maps surface */}
      <div ref={mapContainerRef} className="absolute inset-0" />

      {/* Loading overlay */}
      {!mapReady && !mapError && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0b1526]/95 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="size-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <Loader2 className="size-7 text-teal-400 animate-spin" />
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-slate-200">Loading Map Intelligence</div>
              <div className="text-xs text-slate-500 mt-1">Connecting to Google Maps…</div>
            </div>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {mapError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1526]/97">
          <div className="max-w-md w-full rounded-2xl border border-amber-500/25 bg-[#0f1a2e] p-5 space-y-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <svg
                  className="size-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-amber-400">
                  {mapError === "referrer_restriction"
                    ? "Google Maps — Referrer Not Authorised"
                    : "Google Maps Unavailable"}
                </div>
                <div className="text-[10px] text-slate-500">
                  {mapError === "referrer_restriction"
                    ? "Add andetrack.com + localhost to your API key's allowed referrers"
                    : mapError}
                </div>
              </div>
            </div>

            {/* Fix steps */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-slate-300">
                Fix in Google Cloud Console:
              </div>
              <ol className="space-y-1.5 text-[10px] text-slate-400">
                <li className="flex gap-2">
                  <span className="shrink-0 font-bold text-teal-500">1.</span>Open{" "}
                  <span className="text-teal-400 underline">
                    console.cloud.google.com/apis/credentials
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 font-bold text-teal-500">2.</span>Click your API key →{" "}
                  <strong className="text-slate-300">Website restrictions</strong>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 font-bold text-teal-500">3.</span>Add these HTTP
                  referrers:
                </li>
              </ol>
              <div className="ml-5 mt-1 rounded-lg bg-[#060e1c] border border-[#1e3a5f] px-3 py-2 font-mono text-[10px] text-teal-300 space-y-0.5">
                <div className="text-slate-500">— localhost —</div>
                <div>http://localhost:*</div>
                <div>http://localhost:5173/*</div>
                <div>http://127.0.0.1:5173/*</div>
                <div className="text-slate-500 mt-1">— production —</div>
                <div>https://andetrack.com/*</div>
                <div>https://www.andetrack.com/*</div>
                <div>https://app.andetrack.com/*</div>
              </div>
              <div className="text-[10px] text-slate-500">
                After saving in Cloud Console, refresh this page — the map loads immediately.
              </div>
            </div>

            {/* Also ensure APIs are enabled */}
            <div className="rounded-lg bg-[#060e1c] border border-[#1e3a5f] px-3 py-2 text-[10px] text-slate-500 space-y-0.5">
              <div className="font-semibold text-slate-400 mb-1">
                Also confirm these APIs are enabled on your key:
              </div>
              <div>✓ Maps JavaScript API</div>
              <div>✓ Places API</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Overlaid controls ── */}
      {mapReady && (
        <>
          {/* Google Places search input */}
          {!compact && (
            <div className="absolute top-3 left-14 z-30 w-64">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2 transition-all",
                  "bg-[#0f1a2e]/95 border-[#1e3a5f] backdrop-blur-md shadow-lg",
                  searchQuery && "border-teal-500/40",
                )}
              >
                <svg
                  className="size-3.5 shrink-0 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search addresses, places, drivers…"
                  className="flex-1 bg-transparent text-[11px] text-slate-200 placeholder:text-slate-600 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      if (searchInputRef.current) searchInputRef.current.value = "";
                    }}
                    className="text-slate-600 hover:text-slate-300"
                  >
                    <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Saved Views */}
          {!compact && (
            <MapSavedViewsPanel
              views={views}
              currentViewId={currentViewId}
              onSelectView={handleSelectView}
              loading={viewsLoading}
            />
          )}

          {/* Layer Control */}
          <MapLayerControlPanel layers={layers} onToggle={toggleLayer} />

          {/* POI Panel */}
          {!compact && (
            <MapPoiPanel
              pois={pois}
              onSelectPoi={(poi) => {
                setSelectedObj({ type: "poi", data: poi });
                try {
                  mapRef.current?.panTo({ lat: poi.latitude, lng: poi.longitude });
                  mapRef.current?.setZoom(14);
                } catch {
                  /* ignore */
                }
              }}
              activeCategories={activePoiCategories}
              onToggleCategory={togglePoiCategory}
              loading={poisLoading}
            />
          )}

          {/* Geofence Panel */}
          {!compact && (
            <MapGeofencePanel
              geofences={geofences}
              onSelectGeofence={(gf) => {
                setSelectedObj({ type: "geofence", data: gf });
                try {
                  if (gf.geometry?.type === "Polygon") {
                    const coords = gf.geometry.coordinates[0];
                    const lngs = coords.map((c) => c[0]);
                    const lats = coords.map((c) => c[1]);
                    const bounds = new window.google.maps.LatLngBounds(
                      { lat: Math.min(...lats), lng: Math.min(...lngs) },
                      { lat: Math.max(...lats), lng: Math.max(...lngs) },
                    );
                    mapRef.current?.fitBounds(bounds, 80);
                  } else if (gf.latitude != null && gf.longitude != null) {
                    mapRef.current?.panTo({ lat: gf.latitude, lng: gf.longitude });
                    mapRef.current?.setZoom(13);
                  }
                } catch {
                  /* ignore */
                }
              }}
              loading={geofencesLoading}
            />
          )}

          {/* Zoom / compass / fit controls */}
          <div className="absolute right-3 top-16 z-20 flex flex-col gap-1.5">
            <div className="flex flex-col rounded-xl border border-[#1e3a5f] bg-[#0f1a2e]/90 backdrop-blur-md shadow-lg overflow-hidden">
              <button
                onClick={() => zoom(1)}
                className="size-8 grid place-items-center hover:bg-white/5 transition-colors border-b border-[#1e3a5f]"
              >
                <Plus className="size-3.5 text-slate-300" />
              </button>
              <button
                onClick={() => zoom(-1)}
                className="size-8 grid place-items-center hover:bg-white/5 transition-colors"
              >
                <Minus className="size-3.5 text-slate-300" />
              </button>
            </div>
            <button
              onClick={resetView}
              className="size-8 grid place-items-center rounded-xl border border-[#1e3a5f] bg-[#0f1a2e]/90 backdrop-blur-md shadow-lg hover:bg-white/5 transition-colors"
              title="Reset view"
            >
              <Compass className="size-3.5 text-slate-300" />
            </button>
            <button
              onClick={fitAll}
              className="size-8 grid place-items-center rounded-xl border border-[#1e3a5f] bg-[#0f1a2e]/90 backdrop-blur-md shadow-lg hover:bg-white/5 transition-colors"
              title="Fit all drivers"
            >
              <Maximize2 className="size-3.5 text-slate-300" />
            </button>
          </div>

          {/* Bottom status bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-3 py-2 bg-[#080f1d]/80 backdrop-blur-md border-t border-[#1e3a5f]">
            <div className="flex items-center gap-2">
              {realtimeStatus === "connected" ? (
                <div className="flex items-center gap-1.5 text-[10px] text-teal-400 font-semibold">
                  <Wifi className="size-3" />
                  <span className="size-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Realtime Connected
                </div>
              ) : realtimeStatus === "connecting" ? (
                <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold">
                  <Loader2 className="size-3 animate-spin" />
                  Connecting
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                  <WifiOff className="size-3" />
                  Realtime Offline · Mock Data
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              {driversLoading ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <>
                  <span className="font-semibold text-teal-400">
                    {drivers.filter((d) => !d.is_stale).length}
                  </span>
                  <span>active</span>
                  {drivers.filter((d) => d.is_stale).length > 0 && (
                    <>
                      <span className="text-amber-400 font-semibold">
                        {drivers.filter((d) => d.is_stale).length}
                      </span>
                      <span>stale</span>
                    </>
                  )}
                  <span className="opacity-40">·</span>
                  <span>{pois.length} POIs</span>
                  <span className="opacity-40">·</span>
                  <span>{geofences.filter((g) => g.is_active).length} zones</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              {is3D && (
                <div className="flex items-center gap-1 text-[9px] text-teal-500">
                  <Building2 className="size-3" />
                  <span>3D active</span>
                </div>
              )}
              {!compact && (
                <div className="flex items-center gap-1 text-[9px] text-slate-600">
                  <Layers className="size-2.5" />
                  <span>Google Maps</span>
                </div>
              )}
            </div>
          </div>

          {/* Selected object card */}
          {selectedObj.type && selectedObj.data && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40">
              <SelectedMapObjectCard
                type={selectedObj.type}
                data={selectedObj.data}
                onClose={() => setSelectedObj({ type: null, data: null })}
              />
            </div>
          )}
        </>
      )}

      {/* Anderoute branding pill */}
      <div className="absolute top-3 left-3 z-30">
        <div className="flex items-center gap-1.5 rounded-xl border border-[#1e3a5f] bg-[#0f1a2e]/90 px-2.5 py-1.5 text-[10px] font-bold tracking-widest text-teal-400 backdrop-blur-md shadow-lg uppercase">
          <span className="size-1.5 rounded-full bg-teal-400 animate-pulse" />
          Anderoute
        </div>
      </div>
    </div>
  );
}
