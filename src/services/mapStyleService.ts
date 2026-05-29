/**
 * mapStyleService — resolves the MapLibre GL style URL.
 *
 * For production, replace the demo style with OpenMapTiles, OpenFreeMap,
 * or another OpenStreetMap-based vector tile provider.
 * Public demo tiles are not for production scale.
 */

export function getMapStyleUrl(): string {
  // VITE_MAP_STYLE_URL can point to a self-hosted or licensed vector tile style.
  // Examples:
  //   OpenFreeMap:  https://tiles.openfreemap.org/styles/liberty
  //   OpenMapTiles: https://your-server/styles/basic/style.json
  //   Maptiler:     https://api.maptiler.com/maps/basic/style.json?key=<KEY>
  const custom = import.meta.env.VITE_MAP_STYLE_URL as string | undefined;
  if (custom) return custom;

  // Fallback: MapLibre demo tiles (not for production scale).
  return "https://demotiles.maplibre.org/style.json";
}

/**
 * Returns a MapLibre-compatible 3D buildings layer spec.
 * Attempts common source-layer names used by OpenMapTiles / MapTiler / OpenFreeMap.
 */
export function build3dBuildingsLayer() {
  return {
    id: "anderoute-3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"] as unknown[],
    type: "fill-extrusion" as const,
    minzoom: 14,
    paint: {
      "fill-extrusion-color": "#94a3b8",
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        14,
        0,
        14.5,
        ["coalesce", ["get", "render_height"], ["get", "height"], 5],
      ] as unknown[],
      "fill-extrusion-base": [
        "coalesce",
        ["get", "render_min_height"],
        ["get", "min_height"],
        0,
      ] as unknown[],
      "fill-extrusion-opacity": 0.72,
    },
  };
}

/**
 * Alternative 3D buildings layer for styles that use different property names.
 */
export function build3dBuildingsLayerAlt() {
  return {
    id: "anderoute-3d-buildings-alt",
    source: "openmaptiles",
    "source-layer": "building",
    type: "fill-extrusion" as const,
    minzoom: 14,
    paint: {
      "fill-extrusion-color": "#94a3b8",
      "fill-extrusion-height": [
        "coalesce",
        ["get", "render_height"],
        ["get", "height"],
        5,
      ] as unknown[],
      "fill-extrusion-base": [
        "coalesce",
        ["get", "render_min_height"],
        ["get", "min_height"],
        0,
      ] as unknown[],
      "fill-extrusion-opacity": 0.72,
    },
  };
}
