/**
 * mapSearchService — search helpers for drivers, POIs, and Google Places.
 *
 * Google Places Autocomplete is attached directly to the search input via
 * google.maps.places.Autocomplete in the map component. This service handles
 * local data search (drivers, POIs) as a complement.
 */

import type { MapSearchResult, LiveDriverLocation, MapPoi } from "@/types/map";

/**
 * Search local drivers and POIs.
 * Returns matches ranked by relevance.
 */
export function searchLocal(
  query: string,
  drivers: LiveDriverLocation[],
  pois: MapPoi[],
): MapSearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: MapSearchResult[] = [];

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

  return results;
}

// Re-export type for convenience
export type { MapSearchResult };
