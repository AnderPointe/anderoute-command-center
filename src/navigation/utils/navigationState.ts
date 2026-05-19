/**
 * Phase 3 polish — NavigationStateMachine.
 *
 * Replaces ad-hoc string stages in EliteNav components with a single typed
 * state machine that mirrors the real-world flow:
 *
 *   idle → requesting → routed → validating → ready/blocked → active
 *        → (off_route ↔ rerouting) → arriving → completed | cancelled
 *
 * Transitions are pure and validated, so the UI never lands in an
 * impossible state (e.g. "active" without a route, or "ready" while a CDL
 * validation is still pending).
 */
import type { NavigationMode } from "../types/navigation";
import type { TruckRouteValidationResult } from "../types/truckRouting";

export type NavigationStage =
  | "idle"
  | "requesting"
  | "routed"
  | "validating"
  | "ready"
  | "blocked"
  | "active"
  | "off_route"
  | "rerouting"
  | "arriving"
  | "completed"
  | "cancelled";

export type NavigationStageEvent =
  | { type: "REQUEST_ROUTE" }
  | { type: "ROUTE_LOADED" }
  | { type: "ROUTE_FAILED"; reason?: string }
  | { type: "VALIDATE" }
  | { type: "VALIDATED"; result: TruckRouteValidationResult }
  | { type: "VALIDATION_SKIPPED" }
  | { type: "START" }
  | { type: "OFF_ROUTE"; distance_m: number }
  | { type: "REROUTE_STARTED" }
  | { type: "REROUTE_COMPLETED" }
  | { type: "REROUTE_FAILED" }
  | { type: "APPROACHING_DESTINATION" }
  | { type: "ARRIVED" }
  | { type: "STOP" }
  | { type: "RESET" };

export interface NavigationStateSnapshot {
  stage: NavigationStage;
  mode: NavigationMode;
  blocked_reason: string | null;
  off_route_distance_m: number | null;
  last_transition_at: string;
}

export const INITIAL_NAV_STATE: NavigationStateSnapshot = {
  stage: "idle",
  mode: "to_pickup",
  blocked_reason: null,
  off_route_distance_m: null,
  last_transition_at: new Date(0).toISOString(),
};

/** Pure reducer. Returns the same snapshot if a transition is illegal. */
export function navigationStateReducer(
  state: NavigationStateSnapshot,
  event: NavigationStageEvent,
): NavigationStateSnapshot {
  const now = new Date().toISOString();
  const stamp = (next: Partial<NavigationStateSnapshot>): NavigationStateSnapshot => ({
    ...state,
    ...next,
    last_transition_at: now,
  });

  switch (event.type) {
    case "RESET":
      return { ...INITIAL_NAV_STATE, last_transition_at: now };

    case "REQUEST_ROUTE":
      if (state.stage === "active" || state.stage === "rerouting") return state;
      return stamp({ stage: "requesting", blocked_reason: null });

    case "ROUTE_LOADED":
      if (state.stage !== "requesting") return state;
      return stamp({ stage: "routed" });

    case "ROUTE_FAILED":
      if (state.stage !== "requesting") return state;
      return stamp({ stage: "blocked", blocked_reason: event.reason ?? "Route request failed" });

    case "VALIDATE":
      if (state.stage !== "routed") return state;
      return stamp({ stage: "validating" });

    case "VALIDATED":
      if (state.stage !== "validating") return state;
      return stamp({
        stage: event.result.is_valid ? "ready" : "blocked",
        blocked_reason: event.result.is_valid
          ? null
          : event.result.recommended_action ?? "CDL truck route validation failed",
      });

    case "VALIDATION_SKIPPED":
      if (state.stage !== "routed") return state;
      return stamp({ stage: "ready" });

    case "START":
      if (state.stage !== "ready") return state;
      return stamp({ stage: "active", mode: "to_pickup", off_route_distance_m: null });

    case "OFF_ROUTE":
      if (state.stage !== "active" && state.stage !== "rerouting") return state;
      return stamp({ stage: "off_route", off_route_distance_m: event.distance_m });

    case "REROUTE_STARTED":
      if (state.stage !== "off_route" && state.stage !== "active") return state;
      return stamp({ stage: "rerouting", mode: "rerouting" });

    case "REROUTE_COMPLETED":
      if (state.stage !== "rerouting") return state;
      return stamp({ stage: "active", mode: "to_pickup", off_route_distance_m: null });

    case "REROUTE_FAILED":
      if (state.stage !== "rerouting") return state;
      return stamp({
        stage: "blocked",
        blocked_reason: "Reroute failed — hold position and contact dispatch.",
      });

    case "APPROACHING_DESTINATION":
      if (state.stage !== "active") return state;
      return stamp({ stage: "arriving" });

    case "ARRIVED":
      if (state.stage === "completed") return state;
      return stamp({ stage: "completed", mode: "completed" });

    case "STOP":
      if (state.stage === "idle" || state.stage === "completed") return state;
      return stamp({ stage: "cancelled", mode: "cancelled" });

    default:
      return state;
  }
}

export const NAV_STAGE_LABEL: Record<NavigationStage, string> = {
  idle: "Idle",
  requesting: "Loading route…",
  routed: "Route ready",
  validating: "Validating CDL truck route…",
  ready: "Ready to start",
  blocked: "Blocked",
  active: "Navigation active",
  off_route: "Off route",
  rerouting: "Rerouting…",
  arriving: "Arriving soon",
  completed: "Trip complete",
  cancelled: "Cancelled",
};

export function canStartNavigation(
  stage: NavigationStage,
  cdlRequired: boolean,
  validation: TruckRouteValidationResult | null,
): { allowed: boolean; reason: string | null } {
  if (stage !== "ready") return { allowed: false, reason: "Route not ready" };
  if (!cdlRequired) return { allowed: true, reason: null };
  if (!validation) return { allowed: false, reason: "CDL validation required" };
  if (!validation.is_valid) {
    return {
      allowed: false,
      reason: validation.recommended_action ?? "Truck route not valid for vehicle profile",
    };
  }
  return { allowed: true, reason: null };
}
