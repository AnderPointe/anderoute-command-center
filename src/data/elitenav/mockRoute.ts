import type { Route, RouteStep } from "@/types/elitenav";

export const mockSteps: RouteStep[] = [
  { id: "s1", maneuver: "depart", instruction: "Head north on Industrial Blvd", distance: "0.4 mi", duration: "1 min", street: "S Industrial Blvd" },
  { id: "s2", maneuver: "turn-right", instruction: "Turn right onto I-20 East", street: "I-20 E", distance: "1.2 mi", duration: "3 min" },
  { id: "s3", maneuver: "keep-left", instruction: "Keep left to merge onto US-287 N", street: "US-287 N", distance: "14 mi", duration: "16 min", alert: "Construction · reduced to 2 lanes" },
  { id: "s4", maneuver: "straight", instruction: "Continue on US-287 N", street: "US-287 N", distance: "48 mi", duration: "46 min" },
  { id: "s5", maneuver: "exit", instruction: "Take Exit 42 toward Logistics Parkway", street: "Exit 42", distance: "0.6 mi", duration: "1 min" },
  { id: "s6", maneuver: "keep-right", instruction: "Keep right on Logistics Parkway", street: "Logistics Pkwy", distance: "2.1 mi", duration: "4 min" },
  { id: "s7", maneuver: "turn-left", instruction: "Turn left at Distribution Center Drive", street: "Distribution Ctr Dr", distance: "0.6 mi", duration: "2 min", alert: "Low clearance ahead · 13'9\" verified CDL-safe" },
  { id: "s8", maneuver: "arrive", instruction: "Arrive at delivery gate on the right", street: "Gate 4 · Dock 12", distance: "0.1 mi", duration: "1 min" },
];

export const mockRoute: Route = {
  id: "rt_55021",
  loadId: "LD-29481",
  driverId: "drv_001",
  totalMiles: 86,
  remainingMiles: 67,
  etaMinutes: 78,
  currentStep: 0,
  steps: mockSteps,
};
