/**
 * Anderoute3DDispatchMap — the primary MapLibre GL-powered logistics intelligence map.
 *
 * For production, replace the demo style with OpenMapTiles, OpenFreeMap, or another
 * OpenStreetMap-based vector tile provider. Public demo tiles are not for production scale.
 *
 * The map style controls which road layers are visible. A production Anderoute logistics
 * style should emphasize highways, interstates, industrial roads, warehouses, ports,
 * airports, and truck routes.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus, Compass, Maximize2, Wifi, WifiOff, Loader2, Building2 } from "lucide-react";

import { useLiveDriverLocations } from "@/hooks/useLiveDriverLocations";
import { useLogisticsMapPois } from "@/hooks/useLogisticsMapPois";
import { useMapLayerPreferences } from "@/hooks/useMapLayerPreferences";
import { useMapSavedViews } from "@/hooks/useMapSavedViews";
import { useMapGeofences } from "@/hooks/useMapGeofences";

import { MapLayerControlPanel } from "./MapLayerControlPanel";
import { MapPoiPanel } from "./MapPoiPanel";
import { MapSearchPanel } from "./MapSearchPanel";
import { MapSavedViewsPanel } from "./MapSavedViewsPanel";
import { MapGeofencePanel } from "./MapGeofencePanel";
import { SelectedMapObjectCard } from "./SelectedMapObjectCard";
import { driverMarkerSvg, poiMarkerSvg } from "./poiHelpers";
import {
  getMapStyleUrl,
  build3dBuildingsLayer,
  build3dBuildingsLayerAlt,
} from "@/services/mapStyleService";

import type {
  LayerKey,
  LiveDriverLocation,
  MapGeofence,
  MapPoi,
  MapSavedView,
  MapSearchResult,
  PoiCategory,
  SelectedObjectType,
} from "@/types/map";

// ─── Status color map ─────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  driving: "#14b8a6",
  idle: "#f59e0b",
  loading: "#3b82f6",
  unloading: "#8b5cf6",
  break: "#f97316",
  offline: "#6b7280",
};

// ─── MapLibre dynamic import helper ───────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MapLibreMap = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MapLibreMarker = any;

let maplibrePromise: Promise<typeof import("maplibre-gl")> | null = null;

function loadMapLibre() {
  if (typeof window === "undefined") return null;
  if (!maplibrePromise) {
    maplibrePromise = import("maplibre-gl");
  }
  return maplibrePromise;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  className?: string;
  compact?: boolean;
  onSelectDriver?: (driver: LiveDriverLocation) => void;
}

export function Anderoute3DDispatchMap({ className, compact = false }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap>(null);
  const driverMarkersRef = useRef<Map<string, MapLibreMarker>>(new Map());
  const poiMarkersRef = useRef<Map<string, MapLibreMarker>>(new Map());
  const buildings3dAddedRef = useRef(false);
  const geofencesAddedRef = useRef(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [buildings3dSupported, setBuildings3dSupported] = useState<boolean | null>(null);
  const [currentViewId, setCurrentViewId] = useState<string | null>("usa");

  const [selectedObj, setSelectedObj] = useState<{
    type: SelectedObjectType;
    data: LiveDriverLocation | MapPoi | MapGeofence | null;
  }>({ type: null, data: null });

  const [activePoiCategories, setActivePoiCategories] = useState<Set<PoiCategory>>(
    new Set<PoiCategory>(["depot", "warehouse", "truck_stop", "airport", "fuel"]),
  );

  // ─── Hooks ────────────────────────────────────────────────────────────────

  const { drivers, loading: driversLoading, realtimeStatus } = useLiveDriverLocations();
  const { pois, loading: poisLoading } = useLogisticsMapPois();
  const { layers, toggleLayer, isEnabled, applyViewLayerSettings } = useMapLayerPreferences();
  const { views, loading: viewsLoading } = useMapSavedViews();
  const { geofences, loading: geofencesLoading } = useMapGeofences();

  // ─── Init map ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;
    let cancelled = false;

    const styleUrl = getMapStyleUrl();

    loadMapLibre()
      ?.then((maplibre) => {
        if (cancelled || !mapContainerRef.current) return;

        const map = new maplibre.Map({
          container: mapContainerRef.current,
          style: styleUrl,
          center: [-98.5795, 39.8283],
          zoom: 3.5,
          pitch: 35,
          bearing: 0,
          attributionControl: false,
        });

        mapRef.current = map;

        map.on("load", () => {
          if (cancelled) return;
          setMapReady(true);
          geofencesAddedRef.current = false;
          buildings3dAddedRef.current = false;
        });

        map.on("error", (e: { error?: { message?: string } }) => {
          // Non-fatal tile errors are common with demo tiles — swallow them
          if (e?.error?.message?.includes("tiles")) return;
          console.warn("[Anderoute Map]", e?.error?.message);
        });
      })
      .catch((e) => {
        setMapError(e?.message ?? "Failed to initialize map.");
      });

    const driverMarkers = driverMarkersRef.current;
    const poiMarkers = poiMarkersRef.current;
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setMapReady(false);
        buildings3dAddedRef.current = false;
        geofencesAddedRef.current = false;
        driverMarkers.clear();
        poiMarkers.clear();
      }
    };
  }, []);

  // ─── 3D buildings layer ───────────────────────────────────────────────────

  const toggle3dBuildings = useCallback(
    (enabled: boolean) => {
      const map = mapRef.current;
      if (!map || !mapReady) return;

      const layerId = "anderoute-3d-buildings";
      const layerIdAlt = "anderoute-3d-buildings-alt";

      if (!enabled) {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getLayer(layerIdAlt)) map.removeLayer(layerIdAlt);
        buildings3dAddedRef.current = false;
        return;
      }

      if (buildings3dAddedRef.current) return;

      try {
        const style = map.getStyle();
        const sources = style?.sources ?? {};

        // Try to find a building source layer
        let sourceWithBuildings: string | null = null;
        for (const srcId of Object.keys(sources)) {
          const src = sources[srcId] as { type?: string };
          if (src.type === "vector") {
            sourceWithBuildings = srcId;
            break;
          }
        }

        if (!sourceWithBuildings) {
          setBuildings3dSupported(false);
          return;
        }

        const buildingLayer = build3dBuildingsLayer();
        const buildingLayerAlt = build3dBuildingsLayerAlt();

        // Patch source to match the actual source id
        const layerSpec = { ...buildingLayer, source: sourceWithBuildings };
        const altSpec = { ...buildingLayerAlt, source: sourceWithBuildings };

        try {
          map.addLayer(layerSpec as Parameters<typeof map.addLayer>[0]);
          setBuildings3dSupported(true);
          buildings3dAddedRef.current = true;
        } catch {
          try {
            map.addLayer(altSpec as Parameters<typeof map.addLayer>[0]);
            setBuildings3dSupported(true);
            buildings3dAddedRef.current = true;
          } catch {
            setBuildings3dSupported(false);
          }
        }
      } catch {
        setBuildings3dSupported(false);
      }
    },
    [mapReady],
  );

  useEffect(() => {
    if (!mapReady) return;
    toggle3dBuildings(isEnabled("buildings_3d"));
  }, [mapReady, isEnabled, toggle3dBuildings]);

  // ─── Geofence layers ──────────────────────────────────────────────────────

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || geofences.length === 0) return;
    if (geofencesAddedRef.current) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const geoFeatures: any[] = geofences
        .filter((g) => g.geometry?.type === "Polygon")
        .map((g) => ({
          type: "Feature",
          id: g.id,
          properties: {
            id: g.id,
            name: g.name,
            color: g.color,
            is_active: g.is_active,
          },
          geometry: g.geometry,
        }));

      if (geoFeatures.length === 0) return;

      if (!map.getSource("anderoute-geofences")) {
        map.addSource("anderoute-geofences", {
          type: "geojson",
          data: { type: "FeatureCollection", features: geoFeatures },
        });

        map.addLayer({
          id: "anderoute-geofences-fill",
          type: "fill",
          source: "anderoute-geofences",
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.12,
          },
        });

        map.addLayer({
          id: "anderoute-geofences-outline",
          type: "line",
          source: "anderoute-geofences",
          paint: {
            "line-color": ["get", "color"],
            "line-width": 2,
            "line-opacity": 0.7,
            "line-dasharray": [3, 2],
          },
        });

        // Click on geofence
        map.on(
          "click",
          "anderoute-geofences-fill",
          (e: { features?: { properties?: { id: string } }[] }) => {
            const id = e.features?.[0]?.properties?.id;
            if (!id) return;
            const found = geofences.find((g) => g.id === id);
            if (found) setSelectedObj({ type: "geofence", data: found });
          },
        );

        map.on("mouseenter", "anderoute-geofences-fill", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "anderoute-geofences-fill", () => {
          map.getCanvas().style.cursor = "";
        });
      }

      geofencesAddedRef.current = true;
    } catch (e) {
      console.warn("[Anderoute] Geofences failed to render:", e);
    }
  }, [mapReady, geofences]);

  // Toggle geofences visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const visible = isEnabled("geofences") ? "visible" : "none";
    if (map.getLayer("anderoute-geofences-fill")) {
      map.setLayoutProperty("anderoute-geofences-fill", "visibility", visible);
    }
    if (map.getLayer("anderoute-geofences-outline")) {
      map.setLayoutProperty("anderoute-geofences-outline", "visibility", visible);
    }
  }, [mapReady, isEnabled]);

  // ─── Driver markers ───────────────────────────────────────────────────────

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || typeof window === "undefined") return;

    loadMapLibre()?.then((maplibre) => {
      const showDrivers = isEnabled("drivers");
      const existing = driverMarkersRef.current;
      const keepIds = new Set(showDrivers ? drivers.map((d) => d.driver_id) : []);

      // Remove markers not in current driver list or hidden
      for (const [id, marker] of existing) {
        if (!keepIds.has(id)) {
          marker.remove();
          existing.delete(id);
        }
      }

      if (!showDrivers) return;

      for (const driver of drivers) {
        const color = STATUS_COLORS[driver.status] ?? "#6b7280";
        const isSelected =
          selectedObj.type === "driver" &&
          (selectedObj.data as LiveDriverLocation)?.driver_id === driver.driver_id;

        const imgUrl = driverMarkerSvg(color, isSelected, driver.heading, driver.is_stale ?? false);

        const existing_marker = existing.get(driver.driver_id);

        if (existing_marker) {
          existing_marker.setLngLat([driver.longitude, driver.latitude]);
          const el = existing_marker.getElement() as HTMLImageElement;
          if (el) el.src = imgUrl;
        } else {
          const el = document.createElement("img");
          el.src = imgUrl;
          el.style.width = isSelected ? "36px" : "26px";
          el.style.height = isSelected ? "36px" : "26px";
          el.style.cursor = "pointer";
          el.title = driver.driver_name ?? `Driver ${driver.driver_id}`;

          const marker = new maplibre.Marker({ element: el })
            .setLngLat([driver.longitude, driver.latitude])
            .addTo(map);

          el.addEventListener("click", (e) => {
            e.stopPropagation();
            setSelectedObj({ type: "driver", data: driver });
          });

          existing.set(driver.driver_id, marker);
        }
      }
    });
  }, [mapReady, drivers, isEnabled, selectedObj]);

  // ─── POI markers ──────────────────────────────────────────────────────────

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || typeof window === "undefined") return;

    loadMapLibre()?.then((maplibre) => {
      const existing = poiMarkersRef.current;

      // Determine which categories should show
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

      const visibleCategories = new Set<string>(
        (Object.entries(categoryLayerMap) as [PoiCategory, LayerKey][])
          .filter(([, layerKey]) => isEnabled(layerKey))
          .map(([cat]) => cat),
      );

      const keepIds = new Set(
        pois
          .filter((p) => activePoiCategories.has(p.category) && visibleCategories.has(p.category))
          .map((p) => p.id),
      );

      // Remove markers no longer visible
      for (const [id, marker] of existing) {
        if (!keepIds.has(id)) {
          marker.remove();
          existing.delete(id);
        }
      }

      // Add/update markers
      for (const poi of pois) {
        if (!keepIds.has(poi.id)) continue;

        const isSelected =
          selectedObj.type === "poi" && (selectedObj.data as MapPoi)?.id === poi.id;

        const imgUrl = poiMarkerSvg(poi.category, isSelected);

        const existing_marker = existing.get(poi.id);
        if (existing_marker) {
          existing_marker.setLngLat([poi.longitude, poi.latitude]);
        } else {
          const el = document.createElement("img");
          el.src = imgUrl;
          el.style.width = isSelected ? "36px" : "28px";
          el.style.height = isSelected ? "44px" : "36px";
          el.style.cursor = "pointer";
          el.title = `${poi.name} (${poi.category})`;

          const marker = new maplibre.Marker({ element: el, anchor: "bottom" })
            .setLngLat([poi.longitude, poi.latitude])
            .addTo(map);

          el.addEventListener("click", (e) => {
            e.stopPropagation();
            setSelectedObj({ type: "poi", data: poi });
          });

          existing.set(poi.id, marker);
        }
      }
    });
  }, [mapReady, pois, isEnabled, activePoiCategories, selectedObj]);

  // ─── Layer visibility syncing for 3D buildings ────────────────────────────

  useEffect(() => {
    if (!mapReady) return;
    const enabled = isEnabled("buildings_3d");
    if (enabled && !buildings3dAddedRef.current) {
      toggle3dBuildings(true);
    } else if (!enabled) {
      toggle3dBuildings(false);
    }
  }, [isEnabled, mapReady, toggle3dBuildings]);

  // ─── Map controls ─────────────────────────────────────────────────────────

  const zoom = (delta: number) => {
    mapRef.current?.zoomTo((mapRef.current.getZoom() ?? 3.5) + delta, { duration: 200 });
  };

  const resetNorth = () => {
    mapRef.current?.easeTo({ bearing: 0, pitch: 35, duration: 500 });
  };

  const fitAll = () => {
    if (!mapRef.current || drivers.length === 0) return;
    const lngs = drivers.map((d) => d.longitude);
    const lats = drivers.map((d) => d.latitude);
    mapRef.current.fitBounds(
      [
        [Math.min(...lngs) - 1, Math.min(...lats) - 1],
        [Math.max(...lngs) + 1, Math.max(...lats) + 1],
      ],
      { padding: 60, duration: 800, maxZoom: 12 },
    );
  };

  // ─── Saved view handler ───────────────────────────────────────────────────

  const handleSelectView = useCallback(
    (view: MapSavedView) => {
      setCurrentViewId(view.id);
      mapRef.current?.flyTo({
        center: [view.center_lng, view.center_lat],
        zoom: view.zoom,
        pitch: view.pitch,
        bearing: view.bearing,
        duration: 1200,
        essential: true,
      });
      if (Object.keys(view.layer_settings).length > 0) {
        applyViewLayerSettings(view.layer_settings);
      }
    },
    [applyViewLayerSettings],
  );

  // ─── Search handler ───────────────────────────────────────────────────────

  const handleSearchResult = useCallback(
    (result: MapSearchResult) => {
      if (result.lat != null && result.lng != null) {
        mapRef.current?.flyTo({
          center: [result.lng, result.lat],
          zoom: 12,
          duration: 800,
        });
      }

      if (result.type === "driver") {
        const driverId = result.id.replace("driver-", "");
        const found = drivers.find((d) => d.driver_id === driverId);
        if (found) setSelectedObj({ type: "driver", data: found });
      } else if (result.type === "poi") {
        const poiId = result.id.replace("poi-", "");
        const found = pois.find((p) => p.id === poiId);
        if (found) setSelectedObj({ type: "poi", data: found });
      }
    },
    [drivers, pois],
  );

  // ─── POI category toggle ──────────────────────────────────────────────────

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

  // ─── Loading state ────────────────────────────────────────────────────────

  const isLoading = !mapReady && !mapError;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden border border-[#1e3a5f] shadow-2xl bg-[#0b1526]",
        className,
      )}
      style={{ boxShadow: "0 0 0 1px rgba(20,184,166,0.08), 0 20px 60px rgba(0,0,0,0.5)" }}
    >
      {/* MapLibre container */}
      <div ref={mapContainerRef} className="absolute inset-0" />

      {/* Import MapLibre CSS (inline style tag for SSR safety) */}
      <style>{`
        .maplibregl-canvas { border-radius: 1rem; }
        .maplibregl-ctrl-attrib { display: none !important; }
      `}</style>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0b1526]/90 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="size-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <Loader2 className="size-7 text-teal-400 animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-slate-200">Loading Map Intelligence</div>
              <div className="text-xs text-slate-500 mt-1">Connecting to Anderoute systems…</div>
            </div>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {mapError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-[#0b1526]/95">
          <div className="max-w-sm w-full rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <div className="text-sm font-bold text-red-400 mb-2">Map failed to load</div>
            <div className="text-xs text-slate-500">{mapError}</div>
          </div>
        </div>
      )}

      {/* ── Overlaid Controls (only when map is ready) ── */}
      {mapReady && (
        <>
          {/* Search Panel */}
          {!compact && (
            <MapSearchPanel drivers={drivers} pois={pois} onSelectResult={handleSearchResult} />
          )}

          {/* Saved Views Panel */}
          {!compact && (
            <MapSavedViewsPanel
              views={views}
              currentViewId={currentViewId}
              onSelectView={handleSelectView}
              loading={viewsLoading}
            />
          )}

          {/* Layer Control Panel */}
          <MapLayerControlPanel layers={layers} onToggle={toggleLayer} />

          {/* POI Panel */}
          {!compact && (
            <MapPoiPanel
              pois={pois}
              onSelectPoi={(poi) => {
                setSelectedObj({ type: "poi", data: poi });
                mapRef.current?.flyTo({
                  center: [poi.longitude, poi.latitude],
                  zoom: 14,
                  duration: 800,
                });
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
              onSelectGeofence={(g) => {
                setSelectedObj({ type: "geofence", data: g });
                // Fly to geofence center
                if (g.geometry?.type === "Polygon") {
                  const coords = g.geometry.coordinates[0];
                  const lngs = coords.map((c) => c[0]);
                  const lats = coords.map((c) => c[1]);
                  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
                  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
                  mapRef.current?.flyTo({
                    center: [centerLng, centerLat],
                    zoom: 10,
                    duration: 800,
                  });
                } else if (g.latitude != null && g.longitude != null) {
                  mapRef.current?.flyTo({
                    center: [g.longitude, g.latitude],
                    zoom: 12,
                    duration: 800,
                  });
                }
              }}
              loading={geofencesLoading}
            />
          )}

          {/* Map Controls — right side */}
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
              onClick={resetNorth}
              className="size-8 grid place-items-center rounded-xl border border-[#1e3a5f] bg-[#0f1a2e]/90 backdrop-blur-md shadow-lg hover:bg-white/5 transition-colors"
              title="Reset north"
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

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-3 py-2 bg-[#080f1d]/80 backdrop-blur-md border-t border-[#1e3a5f]">
            {/* Left — realtime status */}
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

            {/* Center — driver count */}
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

            {/* Right — 3D buildings note */}
            {buildings3dSupported === false && isEnabled("buildings_3d") && (
              <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
                <Building2 className="size-3" />
                <span>3D building data depends on the active vector tile style.</span>
              </div>
            )}

            {buildings3dSupported === true && isEnabled("buildings_3d") && (
              <div className="flex items-center gap-1.5 text-[9px] text-teal-600">
                <Building2 className="size-3" />
                <span>3D buildings active</span>
              </div>
            )}
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

          {/* Dismiss on map click */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            onClick={() => setSelectedObj({ type: null, data: null })}
          />
        </>
      )}

      {/* Top-left branding pill */}
      <div className="absolute top-3 left-3 z-30">
        <div className="flex items-center gap-1.5 rounded-xl border border-[#1e3a5f] bg-[#0f1a2e]/90 px-2.5 py-1.5 text-[10px] font-bold tracking-widest text-teal-400 backdrop-blur-md shadow-lg uppercase">
          <span className="size-1.5 rounded-full bg-teal-400 animate-pulse" />
          Anderoute
        </div>
      </div>
    </div>
  );
}
