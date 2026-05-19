// Anderoute EliteNav — Phase 1 mock utilities
import type { DriverStatusKey, Route } from "@/types/elitenav";

export function formatMinutes(min: number): string {
  if (min < 60) return `${Math.max(0, Math.round(min))} min`;
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function computeETAClock(minutes: number): string {
  const d = new Date(Date.now() + minutes * 60_000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function progressPct(route: Route): number {
  if (route.totalMiles <= 0) return 0;
  return Math.min(100, Math.max(0, ((route.totalMiles - route.remainingMiles) / route.totalMiles) * 100));
}

export const STATUS_META: Record<DriverStatusKey, { label: string; tone: "neutral" | "info" | "warn" | "success" | "alert" }> = {
  available: { label: "Available", tone: "neutral" },
  load_accepted: { label: "Load Accepted", tone: "info" },
  en_route_pickup: { label: "En Route to Pickup", tone: "info" },
  arrived_pickup: { label: "Arrived at Pickup", tone: "info" },
  loading: { label: "Loading", tone: "warn" },
  loaded: { label: "Loaded", tone: "info" },
  en_route_dropoff: { label: "En Route to Drop-off", tone: "info" },
  arrived_dropoff: { label: "Arrived at Drop-off", tone: "info" },
  delivered: { label: "Delivered", tone: "success" },
  break: { label: "On Break", tone: "warn" },
  off_duty: { label: "Off Duty", tone: "neutral" },
  delayed: { label: "Delayed", tone: "alert" },
  issue_reported: { label: "Issue Reported", tone: "alert" },
};

export const STATUS_ORDER: DriverStatusKey[] = [
  "available",
  "load_accepted",
  "en_route_pickup",
  "arrived_pickup",
  "loading",
  "loaded",
  "en_route_dropoff",
  "arrived_dropoff",
  "delivered",
  "break",
  "off_duty",
  "delayed",
  "issue_reported",
];

export function maneuverGlyph(kind: string): string {
  switch (kind) {
    case "depart": return "↑";
    case "turn-left": return "↰";
    case "turn-right": return "↱";
    case "keep-left": return "↖";
    case "keep-right": return "↗";
    case "straight": return "↑";
    case "merge": return "⇗";
    case "exit": return "⤴";
    case "arrive": return "◉";
    default: return "•";
  }
}
