import type {
  CoPilotMessage,
  DispatchSyncEvent,
  ETAUpdate,
  RouteRisk,
  TrafficAlert,
  VoiceCommand,
} from "@/types/elitenav";

export const mockCoPilotFeed: CoPilotMessage[] = [
  { id: "c1", role: "copilot", tone: "info", text: "You are 18 minutes from pickup.", at: "now" },
  { id: "c2", role: "copilot", tone: "warning", text: "Traffic has increased your ETA by 6 minutes.", at: "1m" },
  { id: "c3", role: "copilot", tone: "success", text: "You are still inside the delivery window.", at: "2m" },
  { id: "c4", role: "copilot", tone: "warning", text: "Route deviation detected. Recalculating safest route.", at: "3m" },
  { id: "c5", role: "copilot", tone: "info", text: "Driver break window approaching in 22 minutes.", at: "5m" },
  { id: "c6", role: "copilot", tone: "warning", text: "Low-clearance warning placeholder for CDL route — verified safe.", at: "6m" },
  { id: "c7", role: "dispatch", text: "Gate 4 is open. Ask for Marcus at receiving.", at: "7m" },
  { id: "c8", role: "copilot", tone: "info", text: "Dispatch has been notified of the delay.", at: "8m" },
];

export const mockVoiceCommands: VoiceCommand[] = [
  { id: "v1", label: "What is my ETA?", utterance: "eta" },
  { id: "v2", label: "Repeat next turn", utterance: "repeat next turn" },
  { id: "v3", label: "Contact dispatch", utterance: "call dispatch" },
  { id: "v4", label: "Report delay", utterance: "report delay" },
  { id: "v5", label: "Mark arrived", utterance: "arrived" },
  { id: "v6", label: "Mark loaded", utterance: "loaded" },
  { id: "v7", label: "Mark delivered", utterance: "delivered" },
  { id: "v8", label: "Read shipment details", utterance: "shipment" },
  { id: "v9", label: "Find fuel nearby", utterance: "fuel" },
  { id: "v10", label: "Show alternate route", utterance: "alt route" },
];

export const mockDispatchSync: DispatchSyncEvent[] = [
  { id: "d1", type: "gps", message: "GPS ping sent · 32.781, -96.802", at: "2s" },
  { id: "d2", type: "speed", message: "Speed update · 58 mph", at: "5s" },
  { id: "d3", type: "eta", message: "ETA recalculated · 1h 18m", at: "12s" },
  { id: "d4", type: "progress", message: "Route progress · 22%", at: "18s" },
  { id: "d5", type: "status", message: "Status → En route to pickup", at: "32s" },
  { id: "d6", type: "delay", message: "Delay reason → Traffic on US-287", at: "47s" },
];

export const mockRouteRisks: RouteRisk[] = [
  { id: "r1", kind: "deviation", severity: "info", message: "Route deviation tolerance · 250 m" },
  { id: "r2", kind: "low_bridge", severity: "warning", message: "Low clearance 13'9\" near Exit 42 · CDL-safe" },
  { id: "r3", kind: "weight", severity: "info", message: "Weight-restricted road bypass armed" },
  { id: "r4", kind: "hazmat", severity: "info", message: "Hazmat route check · not required for this load" },
  { id: "r5", kind: "weather", severity: "warning", message: "Light rain expected after Exit 42" },
  { id: "r6", kind: "closure", severity: "info", message: "No active closures on planned route" },
];

export const mockETAUpdates: ETAUpdate[] = [
  { id: "e1", etaMinutes: 78, delta: 0, reason: "tick", at: "now" },
  { id: "e2", etaMinutes: 80, delta: 2, reason: "traffic", at: "30s" },
  { id: "e3", etaMinutes: 76, delta: -4, reason: "reroute", at: "1m" },
  { id: "e4", etaMinutes: 77, delta: 1, reason: "tick", at: "1m 30s" },
  { id: "e5", etaMinutes: 75, delta: -2, reason: "traffic", at: "2m" },
];

export const mockTrafficAlerts: TrafficAlert[] = [
  { id: "t1", level: "light", segment: "I-20 E · MM 421 → 425", delayMin: 2 },
  { id: "t2", level: "moderate", segment: "US-287 N · MM 12 → 18", delayMin: 6 },
];

export const denyReasons = [
  "Vehicle unavailable",
  "Too far",
  "Break required",
  "Equipment mismatch",
  "Driver off duty",
  "Load details issue",
  "Other",
] as const;
