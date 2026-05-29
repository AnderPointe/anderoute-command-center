/**
 * mapSearchService — local and future geocoding search.
 *
 * Production geocoding should use self-hosted Nominatim, Pelias, Photon,
 * or a proper geocoding provider.
 */

import type { MapSearchResult, LiveDriverLocation, MapPoi } from "@/types/map";

/**
 * Search drivers and POIs locally.
 * If no match is found, returns a placeholder indicating geocoding is not connected.
 */
export async function searchMapLocation(
  query: string,
  drivers: LiveDriverLocation[],
  pois: MapPoi[],
): Promise<MapSearchResult[]> {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const results: MapSearchResult[] = [];

  // Search drivers
  for (const d of drivers) {
    if (
      d.driver_name?.toLowerCase().includes(q) ||
      d.unit_number?.toLowerCase().includes(q) ||
      d.current_load_number?.toLowerCase().includes(q) ||
      d.vehicle_type?.toLowerCase().includes(q)
    ) {
      results.push({
        id: `driver-${d.driver_id}`,
        label: d.driver_name ?? `Unit ${d.unit_number ?? d.driver_id}`,
        type: "driver",
        lat: d.latitude,
        lng: d.longitude,
        meta: `${d.vehicle_type ?? ""} · ${d.status}`,
      });
    }
  }

  // Search POIs
  for (const p of pois) {
    if (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.city?.toLowerCase().includes(q) ||
      p.state?.toLowerCase().includes(q) ||
      p.address?.toLowerCase().includes(q)
    ) {
      results.push({
        id: `poi-${p.id}`,
        label: p.name,
        type: "poi",
        lat: p.latitude,
        lng: p.longitude,
        meta: `${p.category} · ${p.city ?? ""} ${p.state ?? ""}`.trim(),
      });
    }
  }

  if (results.length === 0) {
    // Placeholder — real geocoding not connected yet
    results.push({
      id: "geocode-placeholder",
      label: "Geocoding provider not connected yet.",
      type: "location",
      meta: "Connect Nominatim, Pelias, or Photon for address search.",
    });
  }

  return results;
}
