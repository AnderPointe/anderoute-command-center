/**
 * mapStyleService — Google Maps style and configuration helpers.
 *
 * The logistics dark style emphasises highways, interstates, industrial roads,
 * warehouses, ports, airports, and truck routes over residential areas.
 */

/**
 * Returns a Google Maps Map ID from env or falls back to DEMO_MAP_ID.
 * AdvancedMarkerElement requires a Map ID registered in Google Cloud Console.
 * DEMO_MAP_ID works for development but does not support custom marker styling.
 */
export function getGoogleMapId(): string {
  return (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined) ?? "DEMO_MAP_ID";
}

/**
 * Returns a tilt value for "3D perspective" mode.
 * Google Maps supports tilt up to 67.5° for satellite/hybrid and 45° for roadmap.
 */
export function get3DTilt(): number {
  return 45;
}

/**
 * Logistics-optimised Google Maps dark style.
 * Interstates and highways are highlighted in teal for truck route visibility.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DARK_LOGISTICS_STYLE: any[] = [
  { elementType: "geometry", stylers: [{ color: "#0b1526" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b1526" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b8099" }] },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1e3a5f" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#0f1e33" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1a2d48" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#20364f" }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#162540" }],
  },
  // Highways prominently teal — for truck route navigation
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2a4a6e" }],
  },
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
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#0f1e33" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#060e1c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#1e4068" }],
  },
];
