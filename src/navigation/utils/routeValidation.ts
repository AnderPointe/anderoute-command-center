/**
 * Phase 3 polish — route validation guard helpers.
 * Reusable predicates used by EliteNav, dispatcher panel, and CoPilot brain.
 */
import { CDL_REQUIRED_PROFILES, type TruckRouteProfile, type TruckRouteValidationResult } from "../types/truckRouting";

export function isTruckProfileCdl(profile: TruckRouteProfile): boolean {
  return profile.requires_cdl || CDL_REQUIRED_PROFILES.includes(profile.vehicle_type);
}

export function summarizeValidation(v: TruckRouteValidationResult | null): {
  badge: "validated" | "warning" | "blocked" | "pending";
  text: string;
} {
  if (!v) return { badge: "pending", text: "Validation pending" };
  if (!v.is_valid) return { badge: "blocked", text: v.recommended_action ?? "Route blocked for vehicle profile" };
  if (v.warnings.length > 0) return { badge: "warning", text: `Validated with ${v.warnings.length} warning${v.warnings.length === 1 ? "" : "s"}` };
  return { badge: "validated", text: "Truck route approved" };
}

export function highestSeverity(
  v: TruckRouteValidationResult | null,
): "info" | "warning" | "critical" {
  if (!v) return "info";
  if (v.warnings.some((w) => w.severity === "critical")) return "critical";
  if (v.warnings.some((w) => w.severity === "warning")) return "warning";
  return "info";
}
