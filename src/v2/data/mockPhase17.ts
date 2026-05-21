// Phase 17 — V2 mock data
// Pure data + tiny helpers. No React, no Supabase calls.

export type Tone = "good" | "warn" | "bad" | "info";

// ===== V2 SCOPE =====
export type ScopeItem = {
  id: string;
  area: string;
  feature: string;
  status: "ready" | "beta" | "placeholder" | "deferred";
  notes?: string;
};
export const V2_SCOPE: ScopeItem[] = [
  { id: "ai-ops",        area: "AI Ops",       feature: "Operations intelligence dashboard", status: "ready" },
  { id: "risk",          area: "AI Ops",       feature: "Predictive risk scoring",            status: "ready" },
  { id: "opt",           area: "AI Ops",       feature: "Optimization engine",                status: "ready", notes: "single-load, scoped" },
  { id: "sugg",          area: "AI Ops",       feature: "Suggested driver assignment",        status: "ready" },
  { id: "approval",      area: "Governance",   feature: "Human approval workflow",            status: "ready" },
  { id: "copilot2",      area: "AI Ops",       feature: "CoPilot V2",                         status: "ready", notes: "rules + context" },
  { id: "cust-impact",   area: "Customer",     feature: "Customer impact intelligence",       status: "ready" },
  { id: "exec",          area: "Exec",         feature: "Executive dashboard",                status: "ready" },
  { id: "reports",       area: "Reports",      feature: "Advanced reports (16)",              status: "ready" },
  { id: "edi",           area: "Integrations", feature: "EDI 204/990/214/210/997",            status: "beta" },
  { id: "api-mkt",       area: "Integrations", feature: "API marketplace",                    status: "beta" },
  { id: "webhooks2",     area: "Integrations", feature: "Expanded webhook system",            status: "ready" },
  { id: "int-health",    area: "Integrations", feature: "Integration health dashboard",       status: "ready" },
  { id: "enterprise",    area: "Enterprise",   feature: "Enterprise controls",                status: "ready" },
  { id: "portal2",       area: "Customer",     feature: "Customer portal V2 insights",        status: "ready" },
  // Deferred
  { id: "auto-disp",     area: "Deferred",     feature: "Fully autonomous dispatch",          status: "deferred" },
  { id: "android-auto",  area: "Deferred",     feature: "Android Auto",                       status: "deferred" },
  { id: "carplay",       area: "Deferred",     feature: "CarPlay",                            status: "deferred" },
  { id: "soc2",          area: "Deferred",     feature: "Full SOC 2 evidence automation",     status: "deferred" },
  { id: "edi-cert",      area: "Deferred",     feature: "Full EDI production certification",  status: "deferred" },
  { id: "white-label",   area: "Deferred",     feature: "White-label custom domains",         status: "deferred" },
  { id: "ml-train",      area: "Deferred",     feature: "Advanced ML model training",         status: "deferred" },
  { id: "multi-opt",     area: "Deferred",     feature: "Multi-constraint route optimization",status: "deferred" },
  { id: "carrier-mkt",   area: "Deferred",     feature: "Carrier marketplace",                status: "deferred" },
];

// ===== READINESS =====
export type ReadinessRow = { id: string; label: string; weight: number; pct: number };
export function v2ReadinessBreakdown(): ReadinessRow[] {
  return [
    { id: "ai-ops",   label: "AI Ops intelligence",     weight: 22, pct: 84 },
    { id: "opt",      label: "Optimization engine",     weight: 14, pct: 78 },
    { id: "gov",      label: "Approval governance",     weight: 14, pct: 90 },
    { id: "edi",      label: "EDI beta",                weight: 10, pct: 62 },
    { id: "api",      label: "API marketplace beta",    weight: 12, pct: 70 },
    { id: "exec",     label: "Executive reporting",     weight: 14, pct: 82 },
    { id: "enterprise", label: "Enterprise controls",   weight: 14, pct: 76 },
  ];
}
export function v2ReadinessScore(): number {
  const rows = v2ReadinessBreakdown();
  const total = rows.reduce((s, r) => s + r.weight, 0);
  const weighted = rows.reduce((s, r) => s + r.weight * r.pct, 0);
  return Math.round(weighted / total);
}

// ===== AI OPS =====
export type OpsIssue = {
  id: string;
  category: "load" | "driver" | "customer" | "gps" | "route" | "integration" | "webhook" | "edi" | "billing";
  title: string;
  detail: string;
  level: "low" | "moderate" | "high" | "critical";
  at: string;
};
export const OPS_ISSUES: OpsIssue[] = [
  { id: "i1", category: "load",        title: "Load LD-4821 at risk",          detail: "ETA drift +28m; customer priority A", level: "critical", at: "10:14" },
  { id: "i2", category: "load",        title: "Load LD-4830 delivery window",  detail: "Window closes in 35m, +12m drift",    level: "high",     at: "10:21" },
  { id: "i3", category: "load",        title: "Load LD-4835 pickup at risk",   detail: "Driver not yet en route",             level: "high",     at: "10:25" },
  { id: "i4", category: "driver",      title: "Driver DRV-118 needs attention",detail: "HOS window ending in 45m",            level: "moderate", at: "10:18" },
  { id: "i5", category: "gps",         title: "GPS stale on DRV-202",          detail: "Last ping 11m ago",                   level: "moderate", at: "10:24" },
  { id: "i6", category: "gps",         title: "GPS stale on DRV-209",          detail: "Last ping 18m ago",                   level: "high",     at: "10:27" },
  { id: "i7", category: "customer",    title: "Customer Acme needs update",    detail: "2 active shipments delayed",          level: "high",     at: "10:20" },
  { id: "i8", category: "route",       title: "Route LD-4828 off-route",       detail: "Driver took alt; reroute pending",    level: "moderate", at: "10:22" },
  { id: "i9", category: "integration", title: "Mapbox provider degraded",      detail: "p95 latency 1.8s",                    level: "moderate", at: "10:00" },
  { id: "i10",category: "webhook",     title: "Webhook delivery failing",      detail: "shipment.delivered → endpoint 502",   level: "high",     at: "10:11" },
  { id: "i11",category: "edi",         title: "EDI 204 parse error",           detail: "Partner Globex segment SE missing",   level: "high",     at: "09:55" },
  { id: "i12",category: "billing",     title: "Trial ending — Northwind",      detail: "3 days left, no card",                level: "moderate", at: "09:30" },
];

export function opsHealthScore(): number {
  const w: Record<string, number> = { low: 1, moderate: 4, high: 9, critical: 16 };
  const penalty = OPS_ISSUES.reduce((s, i) => s + w[i.level], 0);
  return Math.max(0, 100 - Math.min(100, penalty));
}

// ===== RISK =====
export type RiskKind =
  | "delivery_delay" | "pickup_delay" | "gps_stale" | "route_deviation"
  | "driver_unavailable" | "customer_priority" | "delivery_window" | "pod_missing"
  | "load_reassignment" | "billing" | "integration_failure" | "edi_failure" | "webhook_failure";
export type RiskRow = {
  id: string;
  subject: string;
  kind: RiskKind;
  level: "low" | "moderate" | "high" | "critical";
  score: number;
  trend: "up" | "flat" | "down";
  explanation: string;
  recommended: string;
};
export const RISK_ROWS: RiskRow[] = [
  { id: "r1", subject: "LD-4821",  kind: "delivery_delay",     level: "critical", score: 88, trend: "up",   explanation: "ETA drift +28m, traffic on I-880, customer priority A", recommended: "Notify customer; consider reassign" },
  { id: "r2", subject: "LD-4830",  kind: "delivery_window",    level: "high",     score: 76, trend: "up",   explanation: "Window closes 11:30, +12m drift",                       recommended: "Send proactive update" },
  { id: "r3", subject: "LD-4835",  kind: "pickup_delay",       level: "high",     score: 71, trend: "flat", explanation: "Driver still at previous stop",                          recommended: "Reassign or push pickup window" },
  { id: "r4", subject: "DRV-202",  kind: "gps_stale",          level: "moderate", score: 54, trend: "up",   explanation: "11m without ping; airplane mode possible",               recommended: "Call driver" },
  { id: "r5", subject: "Acme",     kind: "customer_priority",  level: "high",     score: 73, trend: "up",   explanation: "Top-10 revenue customer with 2 delays",                   recommended: "Send personalized update" },
  { id: "r6", subject: "Mapbox",   kind: "integration_failure",level: "moderate", score: 48, trend: "flat", explanation: "p95 latency 1.8s vs 600ms baseline",                      recommended: "Failover to mock if >3s" },
  { id: "r7", subject: "Globex",   kind: "edi_failure",        level: "high",     score: 70, trend: "up",   explanation: "204 parse error: SE segment missing",                     recommended: "Reject with 990; alert partner" },
  { id: "r8", subject: "WH-7741",  kind: "webhook_failure",    level: "high",     score: 68, trend: "up",   explanation: "5 retries failing with 502",                              recommended: "Pause endpoint; notify owner" },
  { id: "r9", subject: "Northwind",kind: "billing",            level: "moderate", score: 52, trend: "flat", explanation: "Trial ends in 3 days, no payment method",                 recommended: "Trigger billing reminder" },
  { id: "r10",subject: "LD-4828",  kind: "route_deviation",    level: "moderate", score: 47, trend: "down", explanation: "Driver chose alt; on-time impact +6m",                    recommended: "Allow; monitor" },
];

// ===== OPTIMIZATION =====
export type DriverMatch = {
  driverId: string;
  driver: string;
  vehicleType: string;
  status: "available" | "on_break" | "in_transit";
  distanceMi: number;
  etaMin: number;
  vehicleMatch: number;
  cdlMatch: number;
  availability: number;
  onTime: number;
  gpsFresh: boolean;
  score: number;
  explanation: string;
};
export const OPT_LOAD = {
  id: "LD-4821",
  pickup: "Oakland, CA",
  dropoff: "Sacramento, CA",
  vehicleType: "Reefer 53",
  cdlRequired: "A",
  hazmat: false,
  windowStart: "13:00",
  windowEnd: "15:00",
};
export const OPT_CANDIDATES: DriverMatch[] = [
  { driverId: "DRV-114", driver: "Jordan Lee",   vehicleType: "Reefer 53", status: "available",  distanceMi: 4.2,  etaMin: 12, vehicleMatch: 100, cdlMatch: 100, availability: 95, onTime: 92, gpsFresh: true,  score: 94, explanation: "Closest available reefer; on-time 92%; GPS fresh" },
  { driverId: "DRV-127", driver: "Sam Rivera",   vehicleType: "Reefer 53", status: "on_break",   distanceMi: 9.1,  etaMin: 25, vehicleMatch: 100, cdlMatch: 100, availability: 70, onTime: 88, gpsFresh: true,  score: 82, explanation: "On break for 15m; can roll at start window" },
  { driverId: "DRV-141", driver: "Casey Kim",    vehicleType: "Dry Van 53",status: "available",  distanceMi: 3.8,  etaMin: 10, vehicleMatch: 60,  cdlMatch: 100, availability: 95, onTime: 90, gpsFresh: true,  score: 71, explanation: "Closest, but dry van; reefer required" },
  { driverId: "DRV-158", driver: "Robin Patel",  vehicleType: "Reefer 53", status: "in_transit", distanceMi: 22.5, etaMin: 48, vehicleMatch: 100, cdlMatch: 100, availability: 30, onTime: 95, gpsFresh: true,  score: 60, explanation: "Best on-time but committed to current load" },
];

// ===== APPROVALS =====
export type ApprovalAction =
  | "reassign_active_load" | "cancel_load" | "notify_customer_major_delay"
  | "override_cdl_warning" | "trigger_billing_action" | "send_mass_notification"
  | "mark_shipment_completed" | "disable_driver_tracking"
  | "change_subscription_plan" | "modify_customer_portal_access";
export type ApprovalRow = {
  id: string;
  action: ApprovalAction;
  subject: string;
  preview: string;
  requestedBy: "CoPilot" | "Dispatcher" | "System";
  ageMin: number;
  level: "low" | "moderate" | "high" | "critical";
};
export const APPROVAL_QUEUE: ApprovalRow[] = [
  { id: "ap1", action: "reassign_active_load",      subject: "LD-4821 → DRV-114",   preview: "Reassign from DRV-158 (in transit) to DRV-114 (available, reefer match 100)", requestedBy: "CoPilot", ageMin: 2,  level: "high" },
  { id: "ap2", action: "notify_customer_major_delay",subject: "Acme · LD-4821",     preview: "ETA pushed from 14:15 to 14:43. Draft: 'Hi Acme team, your shipment LD-4821 is running ~28m late due to traffic on I-880…'", requestedBy: "CoPilot", ageMin: 1, level: "high" },
  { id: "ap3", action: "send_mass_notification",    subject: "All Acme contacts",   preview: "Send delay summary to 5 contacts at Acme",                  requestedBy: "Dispatcher", ageMin: 4, level: "moderate" },
  { id: "ap4", action: "override_cdl_warning",      subject: "LD-4840 → DRV-141",   preview: "Override CDL-A required (driver has CDL-B endorsement only)", requestedBy: "Dispatcher", ageMin: 6, level: "critical" },
  { id: "ap5", action: "trigger_billing_action",    subject: "Northwind",           preview: "Trigger trial-ending reminder + create checkout link",       requestedBy: "System", ageMin: 12, level: "moderate" },
];

// ===== COPILOT V2 =====
export type CoPilotInsight = {
  id: string;
  question: string;
  answer: string;
  category: "risk" | "assignment" | "customer" | "gps" | "integration" | "summary";
  tone: Tone;
};
export const COPILOT_V2_INSIGHTS: CoPilotInsight[] = [
  { id: "c1", question: "Which loads are at risk?",             answer: "3 loads: LD-4821 (critical), LD-4830 (high), LD-4835 (high).", category: "risk",        tone: "bad" },
  { id: "c2", question: "Which driver should I assign LD-4821?",answer: "DRV-114 — reefer match, 12m to pickup, on-time 92%.",          category: "assignment",  tone: "good" },
  { id: "c3", question: "Why is LD-4821 delayed?",              answer: "Traffic incident on I-880 + previous stop ran long.",          category: "risk",        tone: "warn" },
  { id: "c4", question: "Which customers need updates?",        answer: "Acme (2 delays), Globex (EDI error), Northwind (trial ending).",category: "customer",   tone: "warn" },
  { id: "c5", question: "Which drivers have stale GPS?",        answer: "DRV-202 (11m), DRV-209 (18m). Call DRV-209.",                  category: "gps",         tone: "warn" },
  { id: "c6", question: "Which integrations failed?",           answer: "Mapbox degraded p95 1.8s; webhook WH-7741 failing.",           category: "integration", tone: "warn" },
  { id: "c7", question: "What should dispatch focus on next?",  answer: "(1) Approve reassign LD-4821 (2) Send Acme update (3) Call DRV-209.", category: "summary", tone: "info" },
];

export const SHIFT_HANDOFF = `Shift handoff — 10:30
- Active: 27 loads, 18 drivers on duty
- At risk: 3 (LD-4821 critical, LD-4830, LD-4835)
- Pending approvals: 5 (1 critical: CDL override LD-4840)
- Integrations: Mapbox degraded; webhook WH-7741 failing
- EDI beta: 1 parse error from Globex (204)
- Recommended first actions: approve LD-4821 reassign, send Acme update, call DRV-209`;

export const EXEC_SUMMARY = `Executive summary — today
- Ops health score: ${opsHealthScore()}
- On-time forecast: 91% (baseline 93%)
- Driver utilization: 78% (baseline 75%)
- Vehicle utilization: 71%
- Revenue at risk: ~$8.4k from 3 priority customers
- Integration health: 1 provider degraded, 0 down
- AI recommendation impact: 14 accepted / 3 rejected this week`;

// ===== CUSTOMER IMPACT =====
export type CustomerImpact = {
  id: string;
  name: string;
  priority: "A" | "B" | "C";
  activeShipments: number;
  atRisk: number;
  needsUpdate: boolean;
  revenueAtRisk: number;
  lastTouch: string;
};
export const CUSTOMER_IMPACT: CustomerImpact[] = [
  { id: "cu1", name: "Acme Industrial", priority: "A", activeShipments: 6, atRisk: 2, needsUpdate: true,  revenueAtRisk: 4200, lastTouch: "3h ago" },
  { id: "cu2", name: "Globex Logistics",priority: "A", activeShipments: 4, atRisk: 1, needsUpdate: true,  revenueAtRisk: 2200, lastTouch: "1h ago" },
  { id: "cu3", name: "Northwind",       priority: "B", activeShipments: 3, atRisk: 1, needsUpdate: false, revenueAtRisk: 1100, lastTouch: "yesterday" },
  { id: "cu4", name: "Initech",         priority: "B", activeShipments: 2, atRisk: 0, needsUpdate: false, revenueAtRisk: 0,    lastTouch: "2 days ago" },
  { id: "cu5", name: "Hooli",           priority: "C", activeShipments: 1, atRisk: 0, needsUpdate: false, revenueAtRisk: 0,    lastTouch: "1 week ago" },
];

// ===== EXEC DASHBOARD =====
export type ExecKpi = { id: string; label: string; value: string; hint?: string; tone: Tone };
export const EXEC_KPIS: ExecKpi[] = [
  { id: "ops",   label: "Ops health score",     value: `${opsHealthScore()}`, hint: "100 = clean", tone: opsHealthScore() >= 80 ? "good" : "warn" },
  { id: "act",   label: "Active loads",         value: "27",  tone: "info" },
  { id: "done",  label: "Completed today",      value: "41",  tone: "good" },
  { id: "risk",  label: "At-risk loads",        value: "3",   tone: "warn" },
  { id: "ot",    label: "On-time forecast",     value: "91%", hint: "baseline 93%", tone: "warn" },
  { id: "drv",   label: "Driver utilization",   value: "78%", tone: "good" },
  { id: "veh",   label: "Vehicle utilization",  value: "71%", tone: "info" },
  { id: "cust",  label: "Customer risk score",  value: "62",  hint: "lower = healthier", tone: "warn" },
  { id: "rev",   label: "Revenue at risk",      value: "$8.4k", tone: "warn" },
  { id: "int",   label: "Integration health",   value: "1 degraded", tone: "warn" },
  { id: "bill",  label: "Billing health",       value: "97%", tone: "good" },
  { id: "ai",    label: "AI rec impact",        value: "14 / 17", hint: "accepted / suggested", tone: "good" },
  { id: "sup",   label: "Support burden",       value: "4 open", tone: "info" },
  { id: "ad",    label: "V2 adoption",          value: "62%", hint: "company-level", tone: "info" },
];

export const TREND_LOADS = [18, 22, 19, 24, 26, 28, 27];
export const TREND_ONTIME = [94, 93, 95, 92, 91, 92, 91];
export const TREND_UTIL = [70, 72, 74, 75, 77, 78, 78];

// ===== REPORTS =====
export const REPORTS = [
  { key: "load_lifecycle",      name: "Load lifecycle",          owner: "Ops" },
  { key: "driver_performance",  name: "Driver performance",      owner: "Ops" },
  { key: "vehicle_util",        name: "Vehicle utilization",     owner: "Fleet" },
  { key: "customer_shipment",   name: "Customer shipment",       owner: "Account mgmt" },
  { key: "on_time",             name: "On-time delivery",        owner: "Ops" },
  { key: "delay_reason",        name: "Delay reason",            owner: "Ops" },
  { key: "gps_reliability",     name: "GPS reliability",         owner: "Tech" },
  { key: "eta_accuracy",        name: "ETA accuracy",            owner: "Tech" },
  { key: "pod_completion",      name: "POD completion",          owner: "Ops" },
  { key: "dispatcher_activity", name: "Dispatcher activity",     owner: "Ops" },
  { key: "billing_usage",       name: "Billing usage",           owner: "Finance" },
  { key: "webhook_delivery",    name: "Webhook delivery",        owner: "Integrations" },
  { key: "edi_beta",            name: "EDI beta transactions",   owner: "Integrations" },
  { key: "integration_health",  name: "Integration health",      owner: "Tech" },
  { key: "copilot_usage",       name: "CoPilot usage",           owner: "Product" },
  { key: "ai_rec_impact",       name: "AI recommendation impact",owner: "Product" },
];

// ===== EDI =====
export type EdiTxn = {
  id: string;
  doc: "204" | "990" | "214" | "210" | "997";
  partner: string;
  direction: "in" | "out";
  status: "received" | "parsed" | "accepted" | "rejected" | "sent" | "ack" | "error";
  at: string;
  note?: string;
};
export const EDI_PARTNERS = [
  { id: "p1", name: "Acme Industrial", isaQualifier: "ZZ", isaId: "ACME-001", enabled: true },
  { id: "p2", name: "Globex Logistics", isaQualifier: "ZZ", isaId: "GLOBEX-014", enabled: true },
  { id: "p3", name: "Northwind",       isaQualifier: "ZZ", isaId: "NWND-220",   enabled: false },
];
export const EDI_TXNS: EdiTxn[] = [
  { id: "e1", doc: "204", partner: "Acme Industrial",  direction: "in",  status: "parsed",   at: "09:12" },
  { id: "e2", doc: "990", partner: "Acme Industrial",  direction: "out", status: "sent",     at: "09:14", note: "accepted" },
  { id: "e3", doc: "214", partner: "Acme Industrial",  direction: "out", status: "sent",     at: "10:02", note: "status A7 in-transit" },
  { id: "e4", doc: "204", partner: "Globex Logistics", direction: "in",  status: "error",    at: "09:55", note: "SE segment missing" },
  { id: "e5", doc: "997", partner: "Globex Logistics", direction: "out", status: "sent",     at: "09:56", note: "functional reject" },
  { id: "e6", doc: "210", partner: "Acme Industrial",  direction: "out", status: "sent",     at: "11:30", note: "invoice $1,420.00" },
];
export const EDI_DOC_FLOW = [
  { doc: "204", label: "Load Tender",                   from: "Partner", to: "Anderoute", action: "Parse into shipment request" },
  { doc: "990", label: "Load Tender Response",          from: "Anderoute", to: "Partner", action: "Accept or reject" },
  { doc: "214", label: "Shipment Status",               from: "Anderoute", to: "Partner", action: "Status updates" },
  { doc: "210", label: "Freight Invoice",               from: "Anderoute", to: "Partner", action: "Invoice placeholder" },
  { doc: "997", label: "Functional Acknowledgment",     from: "Anderoute", to: "Partner", action: "Ack received transactions" },
];

// ===== API MARKETPLACE =====
export type ApiScope =
  | "loads.read" | "loads.write" | "shipments.read" | "shipments.write"
  | "tracking.read" | "pod.read" | "customers.read"
  | "webhooks.manage" | "reports.read";
export const API_SCOPES: { id: ApiScope; risk: "low" | "med" | "high"; desc: string }[] = [
  { id: "loads.read",       risk: "low",  desc: "Read loads metadata" },
  { id: "loads.write",      risk: "high", desc: "Create or modify loads" },
  { id: "shipments.read",   risk: "low",  desc: "Read shipments" },
  { id: "shipments.write",  risk: "high", desc: "Update shipment status" },
  { id: "tracking.read",    risk: "low",  desc: "Read live tracking" },
  { id: "pod.read",         risk: "low",  desc: "Download POD assets" },
  { id: "customers.read",   risk: "med",  desc: "Read customer records" },
  { id: "webhooks.manage",  risk: "high", desc: "Create/rotate webhook subscriptions" },
  { id: "reports.read",     risk: "med",  desc: "Run advanced reports" },
];
export type ApiKeyRow = {
  id: string;
  name: string;
  prefix: string;
  scopes: ApiScope[];
  createdBy: string;
  lastUsedAt: string;
  revoked: boolean;
};
export const API_KEYS: ApiKeyRow[] = [
  { id: "k1", name: "Acme tracking widget", prefix: "ar_live_3f9", scopes: ["tracking.read", "pod.read"],          createdBy: "alex@acme.co",    lastUsedAt: "2m ago",  revoked: false },
  { id: "k2", name: "Globex EDI gateway",   prefix: "ar_live_8a1", scopes: ["shipments.write", "loads.read"],      createdBy: "ops@globex.co",   lastUsedAt: "9m ago",  revoked: false },
  { id: "k3", name: "Northwind reporting",  prefix: "ar_live_22c", scopes: ["reports.read"],                       createdBy: "fin@northwind.co",lastUsedAt: "1h ago",  revoked: false },
  { id: "k4", name: "Initech legacy",       prefix: "ar_live_d40", scopes: ["loads.read"],                         createdBy: "it@initech.co",   lastUsedAt: "5 days ago", revoked: true },
];
export type ApiLog = { id: string; key: string; method: string; path: string; status: number; latencyMs: number; at: string };
export const API_LOGS: ApiLog[] = [
  { id: "l1", key: "ar_live_3f9", method: "GET",  path: "/v1/tracking/SH-9920",     status: 200, latencyMs: 84,  at: "10:28" },
  { id: "l2", key: "ar_live_8a1", method: "PATCH",path: "/v1/shipments/SH-9921",    status: 200, latencyMs: 142, at: "10:27" },
  { id: "l3", key: "ar_live_8a1", method: "POST", path: "/v1/loads",                status: 201, latencyMs: 198, at: "10:25" },
  { id: "l4", key: "ar_live_22c", method: "POST", path: "/v1/reports/on_time",      status: 202, latencyMs: 412, at: "10:18" },
  { id: "l5", key: "ar_live_3f9", method: "GET",  path: "/v1/tracking/SH-9920",     status: 429, latencyMs: 12,  at: "10:14" },
  { id: "l6", key: "ar_live_8a1", method: "PATCH",path: "/v1/shipments/SH-9919",    status: 401, latencyMs: 8,   at: "10:11" },
];

// ===== WEBHOOKS =====
export const WEBHOOK_EVENTS = [
  "load.created", "load.offered", "load.accepted", "load.denied", "load.assigned",
  "shipment.created", "shipment.status_updated", "shipment.delayed", "shipment.delivered",
  "eta.updated", "pod.submitted",
  "alert.created", "alert.resolved",
  "driver.status_changed", "driver.gps_stale",
  "invoice.created", "invoice.paid",
];
export type WebhookSub = {
  id: string;
  endpoint: string;
  events: string[];
  enabled: boolean;
  lastDelivery: string;
  successPct: number;
};
export const WEBHOOK_SUBS: WebhookSub[] = [
  { id: "wh1", endpoint: "https://hooks.acme.co/anderoute",    events: ["shipment.status_updated", "shipment.delivered", "eta.updated"], enabled: true,  lastDelivery: "1m ago",  successPct: 99.4 },
  { id: "wh2", endpoint: "https://api.globex.co/in/anderoute", events: ["load.created", "load.assigned", "pod.submitted"],               enabled: true,  lastDelivery: "4m ago",  successPct: 96.8 },
  { id: "wh3", endpoint: "https://logs.northwind.co/hooks",    events: ["invoice.created", "invoice.paid"],                              enabled: true,  lastDelivery: "1h ago",  successPct: 100.0 },
  { id: "wh4", endpoint: "https://legacy.initech.co/v1/hook",  events: ["shipment.delivered"],                                           enabled: false, lastDelivery: "3 days ago", successPct: 22.0 },
];
export type WebhookDelivery = {
  id: string;
  sub: string;
  event: string;
  status: "ok" | "retry" | "failed";
  attempts: number;
  lastCode: number;
  at: string;
};
export const WEBHOOK_DELIVERIES: WebhookDelivery[] = [
  { id: "d1", sub: "wh1", event: "shipment.status_updated", status: "ok",     attempts: 1, lastCode: 200, at: "10:29" },
  { id: "d2", sub: "wh1", event: "eta.updated",             status: "ok",     attempts: 1, lastCode: 200, at: "10:28" },
  { id: "d3", sub: "wh2", event: "load.assigned",           status: "retry",  attempts: 2, lastCode: 500, at: "10:24" },
  { id: "d4", sub: "wh4", event: "shipment.delivered",      status: "failed", attempts: 5, lastCode: 502, at: "10:11" },
  { id: "d5", sub: "wh3", event: "invoice.paid",            status: "ok",     attempts: 1, lastCode: 200, at: "09:55" },
];

// ===== INTEGRATION HEALTH =====
export type ProviderHealth = {
  id: string;
  name: string;
  category: "navigation" | "billing" | "webhook" | "edi" | "email" | "sms" | "map" | "ai" | "portal";
  status: "ok" | "degraded" | "down";
  p95Ms: number;
  errorPct: number;
  note?: string;
};
export const PROVIDER_HEALTH: ProviderHealth[] = [
  { id: "h1", name: "Mapbox",            category: "navigation", status: "degraded", p95Ms: 1820, errorPct: 1.2, note: "Elevated p95" },
  { id: "h2", name: "Google Maps",       category: "map",        status: "ok",       p95Ms: 540,  errorPct: 0.1 },
  { id: "h3", name: "Stripe",            category: "billing",    status: "ok",       p95Ms: 220,  errorPct: 0.0 },
  { id: "h4", name: "Webhook dispatcher",category: "webhook",    status: "degraded", p95Ms: 410,  errorPct: 3.4, note: "WH-7741 failing" },
  { id: "h5", name: "EDI gateway",       category: "edi",        status: "degraded", p95Ms: 280,  errorPct: 8.0, note: "Globex parse errors" },
  { id: "h6", name: "Email provider",    category: "email",      status: "ok",       p95Ms: 180,  errorPct: 0.0, note: "placeholder" },
  { id: "h7", name: "SMS provider",      category: "sms",        status: "ok",       p95Ms: 240,  errorPct: 0.2, note: "placeholder" },
  { id: "h8", name: "AI / CoPilot",      category: "ai",         status: "ok",       p95Ms: 760,  errorPct: 0.0, note: "placeholder" },
  { id: "h9", name: "Customer portal",   category: "portal",     status: "ok",       p95Ms: 95,   errorPct: 0.0 },
];

// ===== ENTERPRISE CONTROLS =====
export type PermRow = { role: "owner" | "admin" | "dispatcher" | "driver" | "customer"; perm: string; allowed: boolean };
export const PERM_MATRIX: PermRow[] = [
  { role: "owner",      perm: "manage billing",          allowed: true  },
  { role: "owner",      perm: "manage api keys",         allowed: true  },
  { role: "admin",      perm: "manage api keys",         allowed: true  },
  { role: "dispatcher", perm: "manage api keys",         allowed: false },
  { role: "dispatcher", perm: "approve AI actions",      allowed: false },
  { role: "admin",      perm: "approve AI actions",      allowed: true  },
  { role: "owner",      perm: "approve AI actions",      allowed: true  },
  { role: "dispatcher", perm: "view risk scoring",       allowed: true  },
  { role: "driver",     perm: "view risk scoring",       allowed: false },
  { role: "customer",   perm: "view risk scoring",       allowed: false },
  { role: "customer",   perm: "view delay explanation",  allowed: true  },
  { role: "admin",      perm: "view audit logs",         allowed: true  },
  { role: "dispatcher", perm: "view audit logs",         allowed: false },
  { role: "admin",      perm: "manage feature flags",    allowed: true  },
];
export type AuditRow = { id: string; actor: string; action: string; target: string; at: string };
export const AUDIT_LOG: AuditRow[] = [
  { id: "a1", actor: "alex@acme.co",     action: "api_key.created",         target: "ar_live_3f9",     at: "10:24" },
  { id: "a2", actor: "ops@globex.co",    action: "webhook.created",         target: "wh2",             at: "10:18" },
  { id: "a3", actor: "support@anderoute",action: "support.access.opened",   target: "company:acme",    at: "10:12" },
  { id: "a4", actor: "support@anderoute",action: "support.access.closed",   target: "company:acme",    at: "10:30" },
  { id: "a5", actor: "alex@acme.co",     action: "billing.plan.changed",    target: "growth → pro",    at: "09:50" },
  { id: "a6", actor: "ops@globex.co",    action: "integration.edi.updated", target: "partner:globex",  at: "09:32" },
  { id: "a7", actor: "alex@acme.co",     action: "feature_flag.toggled",    target: "ai_auto_drafts",  at: "09:11" },
];
export const FEATURE_FLAGS = [
  { id: "ai_auto_drafts",       label: "AI auto-draft customer updates", enabled: true,  scope: "company" },
  { id: "ai_reassign_suggest",  label: "AI reassignment suggestions",    enabled: true,  scope: "company" },
  { id: "edi_beta",             label: "EDI beta",                       enabled: true,  scope: "company" },
  { id: "api_marketplace_beta", label: "API marketplace beta",           enabled: true,  scope: "company" },
  { id: "exec_dashboard",       label: "Executive dashboard",            enabled: true,  scope: "company" },
  { id: "advanced_reports",     label: "Advanced reports",               enabled: true,  scope: "company" },
];

// ===== CUSTOMER PORTAL V2 =====
export type CustomerShipmentV2 = {
  id: string;
  customer: string;
  status: "scheduled" | "in_transit" | "delayed" | "delivered";
  etaAt: string;
  windowStatus: "on_track" | "watch" | "at_risk" | "late";
  delayExplanation?: string;
  podReady: boolean;
};
export const CUSTOMER_SHIPMENTS_V2: CustomerShipmentV2[] = [
  { id: "SH-9920", customer: "Acme Industrial",  status: "delayed",    etaAt: "14:43", windowStatus: "at_risk", delayExplanation: "Traffic incident on I-880; ETA pushed +28m", podReady: false },
  { id: "SH-9921", customer: "Acme Industrial",  status: "in_transit", etaAt: "16:10", windowStatus: "watch",                                                                  podReady: false },
  { id: "SH-9930", customer: "Globex Logistics", status: "in_transit", etaAt: "15:20", windowStatus: "on_track",                                                                podReady: false },
  { id: "SH-9810", customer: "Acme Industrial",  status: "delivered",  etaAt: "yesterday", windowStatus: "on_track",                                                            podReady: true  },
];

// ===== SECURITY REVIEW =====
export const V2_SECURITY = [
  { id: "s1",  area: "AI",         label: "Approval required for all high-impact actions",            ok: true,  note: "Enforced in ai_approval_requests" },
  { id: "s2",  area: "AI",         label: "Risk scores never returned to customer or driver roles",   ok: true },
  { id: "s3",  area: "AI",         label: "Customer drafts gated on approval before send",            ok: true },
  { id: "s4",  area: "API",        label: "API keys stored as hash; plaintext shown once",            ok: true },
  { id: "s5",  area: "API",        label: "Scoped per company_id; admin-only management",             ok: true },
  { id: "s6",  area: "API",        label: "Rate limiting placeholder",                                ok: false, note: "Wire real limiter in V2.5" },
  { id: "s7",  area: "Webhooks",   label: "HMAC-SHA256 signed payloads",                              ok: true },
  { id: "s8",  area: "Webhooks",   label: "Secret stored as hash only",                               ok: true },
  { id: "s9",  area: "EDI",        label: "Inbound EDI scoped to known trading partners",             ok: true },
  { id: "s10", area: "EDI",        label: "Parse errors never echo raw payload to UI",                ok: true },
  { id: "s11", area: "Enterprise", label: "Support access audited with start/end + reason",           ok: true },
  { id: "s12", area: "Enterprise", label: "Billing/plan changes audited",                             ok: true },
  { id: "s13", area: "Enterprise", label: "Feature flag changes audited",                             ok: true },
  { id: "s14", area: "RLS",        label: "All V2 tables company-scoped",                             ok: true },
  { id: "s15", area: "RLS",        label: "Customer portal queries scoped via customer_users",        ok: true },
];

export function v2Stats() {
  const securityOk = V2_SECURITY.filter((s) => s.ok).length;
  return {
    risksCritical: RISK_ROWS.filter((r) => r.level === "critical").length,
    risksHigh:     RISK_ROWS.filter((r) => r.level === "high").length,
    approvalsPending: APPROVAL_QUEUE.length,
    ediErrors: EDI_TXNS.filter((t) => t.status === "error").length,
    webhookFailing: WEBHOOK_DELIVERIES.filter((d) => d.status !== "ok").length,
    apiKeysActive: API_KEYS.filter((k) => !k.revoked).length,
    securityOk,
    securityTotal: V2_SECURITY.length,
  };
}
