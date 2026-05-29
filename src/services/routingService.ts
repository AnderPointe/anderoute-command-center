/**
 * routingService — placeholder for future routing integration.
 *
 * Anderoute routing roadmap:
 *   1. Integrate Valhalla (self-hosted, truck routing profiles)
 *   2. OSRM (open-source, fast routing)
 *   3. GraphHopper (commercial, truck-safe routing profiles)
 *
 * Truck-safe routing should use:
 *   - Truck weight/height/length restrictions
 *   - Hazmat route exclusions
 *   - Preferred highway and interstate routing
 *   - Avoid residential roads
 */

export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface RouteLeg {
  distance_m: number;
  duration_s: number;
  steps: RouteStep[];
}

export interface RouteStep {
  instruction: string;
  distance_m: number;
  lat: number;
  lng: number;
}

export interface RouteResult {
  distance_m: number;
  duration_s: number;
  geometry: RoutePoint[];
  legs: RouteLeg[];
  provider: string;
}

/**
 * Calculate a route between two points.
 * Currently a placeholder — returns a straight-line path.
 */
export async function calculateRoute(
  origin: RoutePoint,
  destination: RoutePoint,
): Promise<RouteResult> {
  // TODO: integrate Valhalla/OSRM/GraphHopper
  const dx = destination.lng - origin.lng;
  const dy = destination.lat - origin.lat;
  const distanceDeg = Math.sqrt(dx * dx + dy * dy);
  const distance_m = distanceDeg * 111_000;

  return {
    distance_m,
    duration_s: distance_m / 25,
    geometry: [origin, destination],
    legs: [
      {
        distance_m,
        duration_s: distance_m / 25,
        steps: [
          { instruction: "Depart", distance_m: 0, lat: origin.lat, lng: origin.lng },
          { instruction: "Arrive", distance_m, lat: destination.lat, lng: destination.lng },
        ],
      },
    ],
    provider: "placeholder",
  };
}
