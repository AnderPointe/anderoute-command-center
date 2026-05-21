/**
 * Phase 16 — V1.5 mock data.
 *
 * Drives every /v15/* route. Pure client-side mock data — no Supabase or
 * real provider calls. Represents the post-V1.1 push into real navigation
 * provider readiness, production billing, basic webhook integrations, and
 * smarter rules-based CoPilot.
 */

export type Tone = "good" | "warn" | "bad" | "info" | "default";

// ---------------- 1. V1.5 Scope ----------------
export interface ScopeItem15 {
  id: string;
  area: string;
  title: string;
  status: "in_v15" | "deferred";
  value: number;
  effort: number;
  note?: string;
}

export const V15_SCOPE: ScopeItem15[] = [
  { id: "nav-prov",  area: "Navigation", title: "Real navigation provider abstraction", status: "in_v15", value: 5, effort: 4 },
  { id: "mapbox",    area: "Navigation", title: "Mapbox provider boundary",             status: "in_v15", value: 5, effort: 3 },
  { id: "google",    area: "Navigation", title: "Google provider boundary",             status: "in_v15", value: 4, effort: 3 },
  { id: "sessions",  area: "Navigation", title: "Route session tracking",               status: "in_v15", value: 5, effort: 3 },
  { id: "render",    area: "Navigation", title: "Route line rendering",                 status: "in_v15", value: 5, effort: 3 },
  { id: "eta-sync",  area: "Navigation", title: "ETA sync from provider",               status: "in_v15", value: 5, effort: 3 },
  { id: "reroute",   area: "Navigation", title: "Reroute / off-route placeholder",      status: "in_v15", value: 4, effort: 3 },
  { id: "prov-h",    area: "Navigation", title: "Provider health dashboard",            status: "in_v15", value: 4, effort: 2 },
  { id: "bill-prod", area: "Billing",    title: "Billing production launch",            status: "in_v15", value: 5, effort: 4 },
  { id: "stripe",    area: "Billing",    title: "Stripe checkout + portal sessions",    status: "in_v15", value: 5, effort: 3 },
  { id: "plan-lim",  area: "Billing",    title: "Plan limits + feature gates",          status: "in_v15", value: 4, effort: 3 },
  { id: "integ",     area: "Integrations", title: "Basic integrations starter",         status: "in_v15", value: 4, effort: 3 },
  { id: "webhooks",  area: "Integrations", title: "Webhook starter system",             status: "in_v15", value: 5, effort: 3 },
  { id: "copilot",   area: "CoPilot",    title: "CoPilot V1.5 operational rules",       status: "in_v15", value: 4, effort: 3 },
  { id: "drv-nav",   area: "Driver",     title: "Driver navigation V1.5 UI",            status: "in_v15", value: 5, effort: 3 },
  { id: "disp-rt",   area: "Dispatcher", title: "Dispatcher route visibility",          status: "in_v15", value: 5, effort: 3 },
  { id: "portal",    area: "Portal",     title: "Customer tracking V1.5",               status: "in_v15", value: 4, effort: 2 },
  { id: "paid",      area: "Customers",  title: "Paid customer operations",             status: "in_v15", value: 4, effort: 3 },
  { id: "reports",   area: "Reports",    title: "V1.5 reports",                         status: "in_v15", value: 3, effort: 2 },
  { id: "sec",       area: "Security",   title: "V1.5 security review",                 status: "in_v15", value: 5, effort: 2 },

  { id: "tbt",       area: "Deferred",   title: "Full turn-by-turn native voice",       status: "deferred", value: 5, effort: 5, note: "V2" },
  { id: "bg-nav",    area: "Deferred",   title: "Background native navigation",         status: "deferred", value: 5, effort: 5, note: "V2" },
  { id: "android",   area: "Deferred",   title: "Android Auto",                         status: "deferred", value: 3, effort: 4, note: "V2" },
  { id: "carplay",   area: "Deferred",   title: "CarPlay",                              status: "deferred", value: 3, effort: 4, note: "V2" },
  { id: "edi",       area: "Deferred",   title: "Full EDI",                             status: "deferred", value: 5, effort: 5, note: "V2" },
  { id: "marketp",   area: "Deferred",   title: "API marketplace",                      status: "deferred", value: 4, effort: 5, note: "V2" },
  { id: "ai-pred",   area: "Deferred",   title: "Advanced predictive AI",               status: "deferred", value: 5, effort: 5, note: "V2" },
  { id: "soc2",      area: "Deferred",   title: "SOC 2 automation",                     status: "deferred", value: 4, effort: 5, note: "V2" },
];

// ---------------- 2. Navigation providers ----------------
export type ProviderId = "mock" | "mapbox" | "google" | "here" | "trimble";

export interface ProviderRow {
  id: ProviderId;
  name: string;
  status: "ready" | "boundary" | "placeholder" | "fallback";
  tokenConfigured: boolean;
  routeRequests: boolean;
  routeRender: boolean;
  etaParsing: boolean;
  rerouteSupport: boolean;
  truckRouting: boolean;
  notes: string;
}

export const NAV_PROVIDERS: ProviderRow[] = [
  { id: "mock",    name: "Mock",     status: "ready",       tokenConfigured: true,  routeRequests: true,  routeRender: true,  etaParsing: true,  rerouteSupport: true,  truckRouting: false, notes: "Used as fallback when real provider fails" },
  { id: "mapbox",  name: "Mapbox",   status: "boundary",    tokenConfigured: true,  routeRequests: true,  routeRender: true,  etaParsing: true,  rerouteSupport: false, truckRouting: false, notes: "Directions API + GL JS line rendering" },
  { id: "google",  name: "Google",   status: "boundary",    tokenConfigured: false, routeRequests: true,  routeRender: false, etaParsing: true,  rerouteSupport: false, truckRouting: false, notes: "Web Directions only — Nav SDK lands native side" },
  { id: "here",    name: "HERE",     status: "placeholder", tokenConfigured: false, routeRequests: false, routeRender: false, etaParsing: false, rerouteSupport: false, truckRouting: true,  notes: "Truck routing optional — placeholder only" },
  { id: "trimble", name: "Trimble",  status: "placeholder", tokenConfigured: false, routeRequests: false, routeRender: false, etaParsing: false, rerouteSupport: false, truckRouting: true,  notes: "Truck-specific routing — placeholder only" },
];

export interface ProviderHealth {
  id: ProviderId;
  configured: boolean;
  lastSuccessAt: string;
  successRate: number;
  avgResponseMs: number;
  failures24h: number;
  rateLimitHits24h: number;
  fallbackUses24h: number;
  costEstimate: string;
  errors: string[];
}

export const PROVIDER_HEALTH: ProviderHealth[] = [
  { id: "mapbox", configured: true,  lastSuccessAt: "2m ago",  successRate: 0.987, avgResponseMs: 412, failures24h: 4,  rateLimitHits24h: 0, fallbackUses24h: 1, costEstimate: "$0.42 (est.)",  errors: ["422 invalid coordinates × 2", "504 upstream timeout × 2"] },
  { id: "google", configured: false, lastSuccessAt: "—",       successRate: 0,     avgResponseMs: 0,   failures24h: 0,  rateLimitHits24h: 0, fallbackUses24h: 0, costEstimate: "—",            errors: ["API key not configured"] },
  { id: "mock",   configured: true,  lastSuccessAt: "12s ago", successRate: 1,     avgResponseMs: 18,  failures24h: 0,  rateLimitHits24h: 0, fallbackUses24h: 0, costEstimate: "$0.00",         errors: [] },
];

export interface RouteRequestLog {
  id: string;
  provider: ProviderId;
  load: string;
  status: "success" | "failed" | "fallback";
  responseMs: number;
  at: string;
  error?: string;
}

export const ROUTE_REQUEST_LOG: RouteRequestLog[] = [
  { id: "rr-101", provider: "mapbox", load: "L-2041", status: "success",  responseMs: 388, at: "2m ago" },
  { id: "rr-102", provider: "mapbox", load: "L-2042", status: "success",  responseMs: 421, at: "4m ago" },
  { id: "rr-103", provider: "mapbox", load: "L-2043", status: "failed",   responseMs: 502, at: "8m ago", error: "422 invalid waypoint" },
  { id: "rr-104", provider: "mapbox", load: "L-2044", status: "fallback", responseMs: 612, at: "11m ago", error: "Upstream 504 — used mock" },
  { id: "rr-105", provider: "mapbox", load: "L-2045", status: "success",  responseMs: 401, at: "14m ago" },
];

// ---------------- 3. Route sessions ----------------
export type NavSessionStatus =
  | "route_requested" | "route_ready" | "navigation_started" | "paused"
  | "active" | "rerouting" | "off_route" | "arrived_pickup" | "arrived_dropoff"
  | "completed" | "cancelled" | "failed";

export interface NavSession {
  id: string;
  load: string;
  driver: string;
  provider: ProviderId;
  status: NavSessionStatus;
  distanceMi: number;
  durationMin: number;
  etaAt: string;
  progressPct: number;
  remainingMi: number;
  warnings: string[];
}

export const NAV_SESSIONS: NavSession[] = [
  { id: "ns-501", load: "L-2041", driver: "Maya R.",  provider: "mapbox", status: "active",    distanceMi: 318, durationMin: 348, etaAt: "5:42 PM", progressPct: 62, remainingMi: 121, warnings: [] },
  { id: "ns-502", load: "L-2042", driver: "Jordan T.",provider: "mapbox", status: "off_route", distanceMi: 412, durationMin: 462, etaAt: "7:11 PM", progressPct: 38, remainingMi: 255, warnings: ["Off-route 0.4 mi"] },
  { id: "ns-503", load: "L-2043", driver: "Sam K.",   provider: "mock",   status: "route_ready", distanceMi: 92,  durationMin: 118, etaAt: "3:18 PM", progressPct: 0,  remainingMi: 92,  warnings: ["Mapbox failed — using mock"] },
  { id: "ns-504", load: "L-2044", driver: "Alex P.",  provider: "mapbox", status: "rerouting", distanceMi: 254, durationMin: 294, etaAt: "6:30 PM", progressPct: 41, remainingMi: 150, warnings: ["Recalculating"] },
  { id: "ns-505", load: "L-2045", driver: "Riley M.", provider: "mapbox", status: "completed", distanceMi: 188, durationMin: 212, etaAt: "delivered", progressPct: 100, remainingMi: 0,   warnings: [] },
];

export type NavEventType =
  | "route_requested" | "route_ready" | "navigation_started" | "route_progress"
  | "eta_updated" | "location_updated" | "off_route_detected" | "reroute_requested"
  | "reroute_completed" | "arrived" | "completed" | "failed";

export interface NavEvent {
  id: string;
  sessionId: string;
  type: NavEventType;
  at: string;
  detail: string;
  tone: Tone;
}

export const NAV_EVENTS: NavEvent[] = [
  { id: "ev-1",  sessionId: "ns-501", type: "route_requested",   at: "5h ago",   detail: "Mapbox · 318 mi planned",      tone: "info" },
  { id: "ev-2",  sessionId: "ns-501", type: "route_ready",       at: "5h ago",   detail: "Geometry parsed, 47 steps",    tone: "good" },
  { id: "ev-3",  sessionId: "ns-501", type: "navigation_started",at: "4h 58m",   detail: "Driver started session",       tone: "info" },
  { id: "ev-4",  sessionId: "ns-501", type: "eta_updated",       at: "1h ago",   detail: "ETA pushed back 8 min",        tone: "warn" },
  { id: "ev-5",  sessionId: "ns-502", type: "off_route_detected",at: "12m ago",  detail: "0.4 mi off planned line",      tone: "warn" },
  { id: "ev-6",  sessionId: "ns-504", type: "reroute_requested", at: "6m ago",   detail: "Dispatcher initiated reroute", tone: "warn" },
  { id: "ev-7",  sessionId: "ns-504", type: "reroute_completed", at: "4m ago",   detail: "New geometry · +12 mi",        tone: "good" },
  { id: "ev-8",  sessionId: "ns-503", type: "failed",            at: "10m ago",  detail: "Mapbox 504 — fallback to mock",tone: "bad"  },
  { id: "ev-9",  sessionId: "ns-505", type: "arrived",           at: "1h ago",   detail: "Arrived dropoff",              tone: "good" },
  { id: "ev-10", sessionId: "ns-505", type: "completed",         at: "55m ago",  detail: "POD submitted",                tone: "good" },
];

// ---------------- 4. ETA sync ----------------
export interface ETASyncRow {
  id: string;
  load: string;
  shipmentEta: string;
  providerEta: string;
  driftMin: number;
  thresholdMin: number;
  notified: boolean;
  reason: string;
}

export const ETA_SYNC_ROWS: ETASyncRow[] = [
  { id: "es-1", load: "L-2041", shipmentEta: "5:34 PM", providerEta: "5:42 PM", driftMin: 8,  thresholdMin: 10, notified: false, reason: "Traffic slowdown I-80" },
  { id: "es-2", load: "L-2042", shipmentEta: "6:42 PM", providerEta: "7:11 PM", driftMin: 29, thresholdMin: 10, notified: true,  reason: "Off-route detour" },
  { id: "es-3", load: "L-2044", shipmentEta: "6:18 PM", providerEta: "6:30 PM", driftMin: 12, thresholdMin: 10, notified: true,  reason: "Reroute added 12 mi" },
];

// ---------------- 5. Billing ----------------
export type SubStatus = "trialing" | "active" | "past_due" | "unpaid" | "cancelled" | "incomplete" | "paused";

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceMonthly: number;
  drivers: number;
  vehicles: number;
  loadsPerMonth: number;
  copilotUsage: number;
  navSessions: number;
  portalUsers: number;
  features: string[];
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  { id: "starter",      name: "Starter",      priceMonthly: 199, drivers: 5,  vehicles: 5,  loadsPerMonth: 100,  copilotUsage: 200,  navSessions: 200,  portalUsers: 5,  features: ["portal", "csv-import", "basic-reports"] },
  { id: "growth",       name: "Growth",       priceMonthly: 499, drivers: 25, vehicles: 25, loadsPerMonth: 500,  copilotUsage: 1000, navSessions: 1000, portalUsers: 25, features: ["portal", "csv-import", "advanced-reports", "copilot", "webhooks"] },
  { id: "professional", name: "Professional", priceMonthly: 999, drivers: 75, vehicles: 75, loadsPerMonth: 2000, copilotUsage: 5000, navSessions: 5000, portalUsers: 75, features: ["portal", "csv-import", "advanced-reports", "copilot", "webhooks", "nav-provider", "priority-support"] },
];

export interface CompanySubscription {
  id: string;
  company: string;
  plan: string;
  status: SubStatus;
  trialEnds?: string;
  renewsAt?: string;
  pastDueDays?: number;
  amount: number;
  stripeCustomerId: string;
}

export const COMPANY_SUBSCRIPTIONS: CompanySubscription[] = [
  { id: "sub-1", company: "Anderoute Demo",   plan: "growth",       status: "active",    renewsAt: "Jul 14", amount: 499, stripeCustomerId: "cus_demo_001" },
  { id: "sub-2", company: "Northstar Freight",plan: "starter",      status: "trialing",  trialEnds: "in 4 days", amount: 0, stripeCustomerId: "cus_demo_002" },
  { id: "sub-3", company: "Pacific Haul Co.", plan: "professional", status: "active",    renewsAt: "Aug 02", amount: 999, stripeCustomerId: "cus_demo_003" },
  { id: "sub-4", company: "Sierra Logistics", plan: "growth",       status: "past_due",  pastDueDays: 3,    amount: 499, stripeCustomerId: "cus_demo_004" },
  { id: "sub-5", company: "Big Sky Carriers", plan: "starter",      status: "cancelled", amount: 0,         stripeCustomerId: "cus_demo_005" },
];

export interface BillingInvoice {
  id: string;
  company: string;
  amount: number;
  status: "paid" | "open" | "failed" | "void";
  issuedAt: string;
  paidAt?: string;
}

export const BILLING_INVOICES: BillingInvoice[] = [
  { id: "in_001", company: "Anderoute Demo",    amount: 499, status: "paid",   issuedAt: "Jun 14", paidAt: "Jun 14" },
  { id: "in_002", company: "Pacific Haul Co.",  amount: 999, status: "paid",   issuedAt: "Jun 02", paidAt: "Jun 02" },
  { id: "in_003", company: "Sierra Logistics",  amount: 499, status: "failed", issuedAt: "Jun 18" },
  { id: "in_004", company: "Sierra Logistics",  amount: 499, status: "open",   issuedAt: "Jun 21" },
];

export interface UsageMeter {
  label: string;
  used: number;
  limit: number;
  unit: string;
}

export const USAGE_METERS: UsageMeter[] = [
  { label: "Active drivers",         used: 18,  limit: 25,   unit: "drivers" },
  { label: "Loads this month",       used: 327, limit: 500,  unit: "loads" },
  { label: "Navigation sessions",    used: 412, limit: 1000, unit: "sessions" },
  { label: "CoPilot queries",        used: 612, limit: 1000, unit: "queries" },
  { label: "Customer portal users",  used: 14,  limit: 25,   unit: "users" },
];

// ---------------- 6. Plan limits + feature gates ----------------
export interface FeatureGate {
  id: string;
  label: string;
  starter: boolean;
  growth: boolean;
  professional: boolean;
}

export const FEATURE_GATES: FeatureGate[] = [
  { id: "portal",        label: "Customer portal",        starter: true,  growth: true,  professional: true  },
  { id: "csv-import",    label: "CSV imports",            starter: true,  growth: true,  professional: true  },
  { id: "basic-reports", label: "Basic reports",          starter: true,  growth: true,  professional: true  },
  { id: "adv-reports",   label: "Advanced reports",       starter: false, growth: true,  professional: true  },
  { id: "copilot",       label: "CoPilot assistant",      starter: false, growth: true,  professional: true  },
  { id: "webhooks",      label: "Webhook integrations",   starter: false, growth: true,  professional: true  },
  { id: "nav-provider",  label: "Navigation provider routing", starter: false, growth: false, professional: true  },
  { id: "priority",      label: "Priority support",       starter: false, growth: false, professional: true  },
];

// ---------------- 7. Integrations + webhooks ----------------
export interface IntegrationRow {
  id: string;
  type: "webhook" | "email" | "sms" | "map" | "billing";
  provider: string;
  status: "connected" | "needs_config" | "disabled";
  lastSync: string;
}

export const INTEGRATIONS: IntegrationRow[] = [
  { id: "i-wh",  type: "webhook", provider: "Generic webhook",  status: "connected",   lastSync: "2m ago"  },
  { id: "i-em",  type: "email",   provider: "Resend (placeholder)", status: "needs_config", lastSync: "—"  },
  { id: "i-sms", type: "sms",     provider: "Twilio (placeholder)", status: "needs_config", lastSync: "—"  },
  { id: "i-map", type: "map",     provider: "Mapbox",           status: "connected",   lastSync: "5m ago"  },
  { id: "i-bil", type: "billing", provider: "Stripe",           status: "connected",   lastSync: "1m ago"  },
];

export interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  enabled: boolean;
  lastDeliveryAt: string;
  successRate: number;
}

export const WEBHOOK_ENDPOINTS: WebhookEndpoint[] = [
  { id: "wh-1", name: "Customer ERP", url: "https://erp.example.com/hooks/anderoute", events: ["load.created", "shipment.status_updated", "shipment.delivered", "eta.updated"], enabled: true,  lastDeliveryAt: "3m ago", successRate: 0.98 },
  { id: "wh-2", name: "Slack ops",    url: "https://hooks.slack.com/services/...",     events: ["alert.created", "shipment.delivered"], enabled: true,  lastDeliveryAt: "7m ago", successRate: 1.0 },
  { id: "wh-3", name: "Test sink",    url: "https://webhook.site/...",                  events: ["pod.submitted"], enabled: false, lastDeliveryAt: "—",     successRate: 0 },
];

export interface WebhookDelivery {
  id: string;
  endpoint: string;
  event: string;
  status: "delivered" | "failed" | "retrying";
  responseCode: number;
  attempts: number;
  at: string;
}

export const WEBHOOK_DELIVERIES: WebhookDelivery[] = [
  { id: "wd-1", endpoint: "Customer ERP", event: "shipment.status_updated", status: "delivered", responseCode: 200, attempts: 1, at: "3m ago" },
  { id: "wd-2", endpoint: "Customer ERP", event: "eta.updated",             status: "delivered", responseCode: 200, attempts: 1, at: "8m ago" },
  { id: "wd-3", endpoint: "Customer ERP", event: "shipment.delivered",      status: "failed",    responseCode: 502, attempts: 3, at: "22m ago" },
  { id: "wd-4", endpoint: "Slack ops",    event: "alert.created",           status: "delivered", responseCode: 200, attempts: 1, at: "12m ago" },
  { id: "wd-5", endpoint: "Customer ERP", event: "load.created",            status: "retrying",  responseCode: 504, attempts: 2, at: "1m ago" },
];

export const WEBHOOK_EVENT_TYPES = [
  "load.created", "load.offered", "load.accepted", "load.denied",
  "shipment.status_updated", "shipment.delivered", "eta.updated",
  "pod.submitted", "alert.created",
];

// ---------------- 8. CoPilot V1.5 ----------------
export interface CopilotInsight {
  id: string;
  category: "loads" | "drivers" | "gps" | "notifications" | "shipments" | "customers" | "providers" | "billing" | "changes" | "actions";
  question: string;
  answer: string;
  tone: Tone;
  count?: number;
}

export const COPILOT_INSIGHTS: CopilotInsight[] = [
  { id: "ci-1",  category: "loads",         question: "Which loads need attention?",            answer: "3 loads have ETA drift > 15 min and 1 is off-route.",         tone: "warn", count: 3 },
  { id: "ci-2",  category: "drivers",       question: "Which drivers are delayed?",             answer: "Jordan T. (L-2042) running 29 min late.",                     tone: "warn", count: 1 },
  { id: "ci-3",  category: "gps",           question: "Which GPS signals are stale?",           answer: "Sam K. — last fix 7m ago (>5m threshold).",                   tone: "warn", count: 1 },
  { id: "ci-4",  category: "notifications", question: "Which notifications failed?",            answer: "1 push to customer ERP webhook failed × 3 (delivery.502).",   tone: "bad",  count: 1 },
  { id: "ci-5",  category: "shipments",     question: "Which are close to delivery window?",    answer: "5 shipments within the next 90 min.",                         tone: "info", count: 5 },
  { id: "ci-6",  category: "customers",     question: "Which customers need updates?",          answer: "2 customers have shipments delayed > 20 min.",                 tone: "warn", count: 2 },
  { id: "ci-7",  category: "providers",     question: "Which route provider errors happened?",  answer: "Mapbox 504 × 2 in last hour; 1 fallback to mock.",            tone: "warn", count: 2 },
  { id: "ci-8",  category: "billing",       question: "Which billing issues need attention?",   answer: "Sierra Logistics 3 days past due.",                           tone: "bad",  count: 1 },
  { id: "ci-9",  category: "changes",       question: "What changed since my last login?",      answer: "12 new loads, 5 deliveries, 2 reroutes, 1 webhook failure.",  tone: "info" },
  { id: "ci-10", category: "actions",       question: "What should dispatch do next?",          answer: "Acknowledge off-route on L-2042; retry webhook for L-2045.",  tone: "info" },
];

export interface CopilotAction {
  id: string;
  label: string;
  why: string;
  severity: "low" | "med" | "high";
  done: boolean;
}

export const COPILOT_ACTIONS: CopilotAction[] = [
  { id: "ca-1", label: "Acknowledge off-route — L-2042", why: "Jordan T. drifted 0.4 mi from plan",       severity: "high", done: false },
  { id: "ca-2", label: "Retry webhook — Customer ERP",   why: "shipment.delivered failed 3 attempts",     severity: "high", done: false },
  { id: "ca-3", label: "Contact Sierra Logistics A/R",   why: "Subscription past due 3 days",             severity: "med",  done: false },
  { id: "ca-4", label: "Notify customer of ETA shift",   why: "L-2042 ETA pushed back 29 min",            severity: "med",  done: false },
  { id: "ca-5", label: "Review Mapbox 504 spike",        why: "2 upstream timeouts in last hour",         severity: "low",  done: false },
];

// ---------------- 9. Driver navigation V1.5 ----------------
export interface DriverNavState {
  driver: string;
  load: string;
  provider: ProviderId;
  routeReady: boolean;
  remainingMi: number;
  etaAt: string;
  etaConfidence: "high" | "medium" | "low" | "stale";
  nextManeuver: string;
  status: NavSessionStatus;
  warnings: string[];
}

export const DRIVER_NAV: DriverNavState = {
  driver: "Maya R.",
  load: "L-2041",
  provider: "mapbox",
  routeReady: true,
  remainingMi: 121,
  etaAt: "5:42 PM",
  etaConfidence: "high",
  nextManeuver: "In 0.8 mi, continue on I-80 W",
  status: "active",
  warnings: [],
};

// ---------------- 10. Dispatcher route visibility ----------------
export interface DispatcherRouteCard {
  load: string;
  driver: string;
  provider: ProviderId;
  status: NavSessionStatus;
  progressPct: number;
  etaAt: string;
  driftMin: number;
  warnings: string[];
}

export const DISPATCHER_ROUTES: DispatcherRouteCard[] = NAV_SESSIONS.map((s) => ({
  load: s.load,
  driver: s.driver,
  provider: s.provider,
  status: s.status,
  progressPct: s.progressPct,
  etaAt: s.etaAt,
  driftMin: ETA_SYNC_ROWS.find((e) => e.load === s.load)?.driftMin ?? 0,
  warnings: s.warnings,
}));

// ---------------- 11. Customer tracking V1.5 ----------------
export interface CustomerShipment {
  id: string;
  customer: string;
  status: "scheduled" | "in_transit" | "delayed" | "delivered";
  windowStatus: "on_track" | "watch" | "at_risk" | "late";
  etaAt: string;
  driftMin: number;
  podReady: boolean;
}

export const CUSTOMER_SHIPMENTS: CustomerShipment[] = [
  { id: "sh-1", customer: "Acme Foods",   status: "in_transit", windowStatus: "on_track", etaAt: "5:42 PM", driftMin: 8,  podReady: false },
  { id: "sh-2", customer: "Hudson Bev.",  status: "delayed",    windowStatus: "at_risk",  etaAt: "7:11 PM", driftMin: 29, podReady: false },
  { id: "sh-3", customer: "Prime Parts",  status: "delivered",  windowStatus: "on_track", etaAt: "delivered", driftMin: 0, podReady: true },
  { id: "sh-4", customer: "Acme Foods",   status: "in_transit", windowStatus: "watch",    etaAt: "6:30 PM", driftMin: 12, podReady: false },
];

// ---------------- 12. Paid customer operations ----------------
export interface PaidCustomer {
  id: string;
  company: string;
  plan: string;
  status: SubStatus;
  driversActive: number;
  loadsMonth: number;
  health: number;
  onboardingPct: number;
  renewalIn?: string;
  expansion?: string;
}

export const PAID_CUSTOMERS: PaidCustomer[] = [
  { id: "pc-1", company: "Anderoute Demo",    plan: "growth",       status: "active",   driversActive: 18, loadsMonth: 327, health: 88, onboardingPct: 100, renewalIn: "24 days", expansion: "+5 drivers" },
  { id: "pc-2", company: "Northstar Freight", plan: "starter",      status: "trialing", driversActive: 4,  loadsMonth: 41,  health: 72, onboardingPct: 65 },
  { id: "pc-3", company: "Pacific Haul Co.",  plan: "professional", status: "active",   driversActive: 51, loadsMonth: 1245, health: 92, onboardingPct: 100, renewalIn: "42 days", expansion: "+CoPilot tier" },
  { id: "pc-4", company: "Sierra Logistics",  plan: "growth",       status: "past_due", driversActive: 12, loadsMonth: 198, health: 41, onboardingPct: 90 },
];

// ---------------- 13. V1.5 Reports ----------------
export interface ReportRow15 {
  id: string;
  category: string;
  name: string;
  sample: string;
}

export const REPORTS_V15: ReportRow15[] = [
  { id: "r1", category: "Navigation", name: "Navigation session report",   sample: "5 sessions · 1 off-route · 1 reroute" },
  { id: "r2", category: "Navigation", name: "ETA accuracy report",          sample: "Mean drift 12 min · 80% within 15 min" },
  { id: "r3", category: "Navigation", name: "Route provider error report",  sample: "Mapbox: 4 errors · 1 fallback" },
  { id: "r4", category: "Billing",    name: "Billing usage report",         sample: "$2,196 MRR · 412 nav sessions" },
  { id: "r5", category: "Integrations", name: "Webhook delivery report",    sample: "98% delivered · 1 retrying" },
  { id: "r6", category: "Customers",  name: "Customer tracking usage",      sample: "14 portal users · 96 sessions" },
  { id: "r7", category: "Mobile",     name: "Driver offline sync report",   sample: "3 queued events · 0 failures" },
  { id: "r8", category: "Operations", name: "Load lifecycle report",        sample: "Avg load → delivered: 14h 22m" },
];

// ---------------- 14. V1.5 Security ----------------
export interface SecurityCheck15 {
  id: string;
  area: string;
  label: string;
  ok: boolean;
  note?: string;
}

export const V15_SECURITY: SecurityCheck15[] = [
  { id: "s1",  area: "Navigation", label: "Mapbox token frontend-only public scope",        ok: true,  note: "VITE_MAPBOX_PUBLIC_TOKEN" },
  { id: "s2",  area: "Navigation", label: "Provider secret keys server-side only",          ok: true },
  { id: "s3",  area: "Navigation", label: "Route session RLS scoped to company_id",         ok: true },
  { id: "s4",  area: "Navigation", label: "Navigation event RLS scoped to driver/company",  ok: true },
  { id: "s5",  area: "Billing",    label: "Stripe secret key only in Edge Functions",       ok: true },
  { id: "s6",  area: "Billing",    label: "Stripe webhook signature verified",              ok: true },
  { id: "s7",  area: "Billing",    label: "Billing access restricted to admin role",        ok: true },
  { id: "s8",  area: "Webhooks",   label: "Webhook payloads HMAC signed",                   ok: true },
  { id: "s9",  area: "Webhooks",   label: "Webhook payload data minimization",              ok: false, note: "Include only required fields" },
  { id: "s10", area: "Webhooks",   label: "Webhook secret rotation flow",                   ok: false, note: "Manual rotation only — automate later" },
  { id: "s11", area: "Integrations", label: "Integration config admin-only",                ok: true },
  { id: "s12", area: "Plan",       label: "Plan limit enforcement server-side",             ok: true },
  { id: "s13", area: "Audit",      label: "Billing change audit logs",                      ok: true },
  { id: "s14", area: "Audit",      label: "Provider config change audit logs",              ok: true },
];

// ---------------- 15. Demo flow ----------------
export interface DemoStep {
  step: number;
  actor: "Admin" | "Dispatcher" | "Driver" | "Customer" | "System" | "CoPilot";
  action: string;
  result: string;
}

export const DEMO_STEPS: DemoStep[] = [
  { step: 1,  actor: "Admin",      action: "Opens V1.5 dashboard",                  result: "Navigation provider: Mapbox · configured" },
  { step: 2,  actor: "Dispatcher", action: "Creates load L-2041",                   result: "System requests route from Mapbox" },
  { step: 3,  actor: "System",     action: "Receives route geometry + 47 steps",    result: "Route ready · ETA 5:42 PM" },
  { step: 4,  actor: "Dispatcher", action: "Sees route line on map",                result: "Provider badge: Mapbox · status: route_ready" },
  { step: 5,  actor: "Driver",     action: "Accepts load and starts navigation",    result: "Real Mapbox geometry rendered on driver map" },
  { step: 6,  actor: "System",     action: "Syncs ETA to shipment + customer portal", result: "Customer sees ETA + delivery window" },
  { step: 7,  actor: "Driver",     action: "Drifts 0.4 mi off route (L-2042)",      result: "off_route_detected event logged" },
  { step: 8,  actor: "Dispatcher", action: "Reviews off-route warning",             result: "Requests reroute" },
  { step: 9,  actor: "System",     action: "Calls provider.requestRoute() again",   result: "reroute_completed · session updated" },
  { step: 10, actor: "System",     action: "Records nav session + driver count",    result: "Billing usage meters tick up" },
  { step: 11, actor: "Admin",      action: "Opens billing dashboard",               result: "Subscription active · within plan limits" },
  { step: 12, actor: "System",     action: "Dispatches webhook shipment.status_updated", result: "Customer ERP returns 200" },
  { step: 13, actor: "CoPilot",    action: "Summarizes operational state",          result: "1 off-route · 2 watch · 1 webhook failed · billing OK" },
];

// ---------------- Derived helpers ----------------
export function v15ReadinessBreakdown() {
  const inScope = V15_SCOPE.filter((s) => s.status === "in_v15");
  const byArea = (area: string) => inScope.filter((s) => s.area === area);
  const score = (items: ScopeItem15[]) => {
    if (!items.length) return 0;
    // Mock completion heuristic: items with effort <= 3 are 90%, else 65%
    const sum = items.reduce((a, i) => a + (i.effort <= 3 ? 90 : 65), 0);
    return Math.round(sum / items.length);
  };
  return [
    { id: "nav", label: "Navigation",   pct: score(byArea("Navigation")),   weight: 35 },
    { id: "bil", label: "Billing",      pct: score(byArea("Billing")),      weight: 25 },
    { id: "int", label: "Integrations", pct: score(byArea("Integrations")), weight: 15 },
    { id: "ops", label: "CoPilot + Ops",pct: score([...byArea("CoPilot"), ...byArea("Driver"), ...byArea("Dispatcher")]), weight: 15 },
    { id: "sec", label: "Security",     pct: score(byArea("Security")),     weight: 10 },
  ];
}

export function v15ReadinessScore(): number {
  const bd = v15ReadinessBreakdown();
  const total = bd.reduce((a, b) => a + b.weight, 0);
  const weighted = bd.reduce((a, b) => a + b.pct * b.weight, 0);
  return Math.round(weighted / total);
}

export function v15Stats() {
  return {
    inScope: V15_SCOPE.filter((s) => s.status === "in_v15").length,
    deferred: V15_SCOPE.filter((s) => s.status === "deferred").length,
    providers: NAV_PROVIDERS.length,
    sessionsActive: NAV_SESSIONS.filter((s) => ["active", "rerouting", "off_route", "navigation_started"].includes(s.status)).length,
    offRoute: NAV_SESSIONS.filter((s) => s.status === "off_route").length,
    subActive: COMPANY_SUBSCRIPTIONS.filter((s) => s.status === "active").length,
    subTrialing: COMPANY_SUBSCRIPTIONS.filter((s) => s.status === "trialing").length,
    subPastDue: COMPANY_SUBSCRIPTIONS.filter((s) => s.status === "past_due").length,
    webhooksEnabled: WEBHOOK_ENDPOINTS.filter((w) => w.enabled).length,
    webhookFailures: WEBHOOK_DELIVERIES.filter((d) => d.status === "failed").length,
    securityOk: V15_SECURITY.filter((s) => s.ok).length,
    securityTotal: V15_SECURITY.length,
  };
}

// ============================================================================
// POLISH (Phase 16.5) — Deeper structures for V1.5 production readiness.
// ============================================================================

// ---------------- Cleaner nav provider interface ----------------
export interface NavInterfaceMethod {
  group: "lifecycle" | "routing" | "session" | "telemetry" | "rendering" | "diagnostics";
  signature: string;
  purpose: string;
}

export const NAV_INTERFACE_METHODS: NavInterfaceMethod[] = [
  { group: "lifecycle",   signature: "initialize(config)",                  purpose: "Validate token + warm SDK; throws on bad config" },
  { group: "lifecycle",   signature: "dispose()",                           purpose: "Release map handles + subscriptions" },
  { group: "routing",     signature: "requestRoute(req)",                   purpose: "Returns RouteResponse (geometry, steps, ETA)" },
  { group: "routing",     signature: "reroute(sessionId, from)",            purpose: "Recompute from current driver position" },
  { group: "session",     signature: "startSession(routeId, driverId)",     purpose: "Create navigation_session row + emit events" },
  { group: "session",     signature: "stopSession(sessionId)",              purpose: "Finalize + flush remaining events" },
  { group: "session",     signature: "pauseSession / resumeSession",        purpose: "Driver break handling" },
  { group: "telemetry",   signature: "getETA(sessionId)",                   purpose: "Provider-derived ETA in ISO + minutes" },
  { group: "telemetry",   signature: "getRemainingDistance(sessionId)",     purpose: "In miles, rounded to 0.1 mi" },
  { group: "telemetry",   signature: "subscribeNavigationEvents(handler)",  purpose: "off_route, eta_updated, arrived, etc." },
  { group: "rendering",   signature: "renderRoute(map, route)",             purpose: "Draw line layer + waypoint markers" },
  { group: "rendering",   signature: "clearRoute(map)",                     purpose: "Remove all route layers cleanly" },
  { group: "diagnostics", signature: "validateProviderConfig()",            purpose: "Pre-flight check for required env vars" },
  { group: "diagnostics", signature: "testProviderConnection()",            purpose: "Round-trip health probe for the dashboard" },
];

// ---------------- Mapbox / Google boundary layers ----------------
export interface BoundaryLayer {
  layer: string;
  scope: "client" | "server" | "shared";
  detail: string;
  ok: boolean;
}

export const MAPBOX_BOUNDARY: BoundaryLayer[] = [
  { layer: "Public token (GL JS)",        scope: "client", detail: "VITE_MAPBOX_PUBLIC_TOKEN · URL-restricted",       ok: true  },
  { layer: "Directions API",              scope: "server", detail: "Server fn proxy · no secret in browser",          ok: true  },
  { layer: "Matrix API (optional)",       scope: "server", detail: "Used by ETA recompute · same proxy",              ok: true  },
  { layer: "Polyline parser",             scope: "shared", detail: "Pure TS · safe both sides",                       ok: true  },
  { layer: "Mobile SDK token",            scope: "client", detail: "EXPO_PUBLIC_MAPBOX_TOKEN · mobile only",          ok: true  },
  { layer: "Usage telemetry",             scope: "server", detail: "Per-company request counter · audited",            ok: true  },
];

export const GOOGLE_BOUNDARY: BoundaryLayer[] = [
  { layer: "Directions API key",          scope: "server", detail: "Restricted to server IPs · not configured yet",   ok: false },
  { layer: "Polyline decoder",            scope: "shared", detail: "Pure TS · safe both sides",                       ok: true  },
  { layer: "Web Maps JS (optional)",      scope: "client", detail: "Only when Google is the active provider",         ok: true  },
  { layer: "Nav SDK handoff (native)",    scope: "client", detail: "Deferred to V2 native bridge",                    ok: false },
  { layer: "Usage caps",                  scope: "server", detail: "Daily quota guard before request",                ok: true  },
];

// ---------------- Route render layers ----------------
export interface RenderLayer {
  id: string;
  label: string;
  source: "provider" | "mock" | "telemetry";
  zIndex: number;
  notes: string;
}

export const ROUTE_RENDER_LAYERS: RenderLayer[] = [
  { id: "rl-1", label: "Planned route line",       source: "provider",  zIndex: 10, notes: "Solid · provider color · width 5" },
  { id: "rl-2", label: "Driven trail",             source: "telemetry", zIndex: 11, notes: "Faded provider color · width 3" },
  { id: "rl-3", label: "Off-route segment",        source: "telemetry", zIndex: 12, notes: "Amber dashed · width 4" },
  { id: "rl-4", label: "Reroute preview",          source: "provider",  zIndex: 13, notes: "Cyan dashed · width 4 · while rerouting" },
  { id: "rl-5", label: "Origin / destination pin", source: "provider",  zIndex: 14, notes: "Marker layer · clickable" },
  { id: "rl-6", label: "Mock fallback line",       source: "mock",      zIndex: 9,  notes: "Hatched style · clearly distinct from real route" },
];

// ---------------- Reroute policy ----------------
export interface ReroutePolicyRule {
  id: string;
  trigger: string;
  threshold: string;
  action: string;
  manual: boolean;
}

export const REROUTE_POLICY: ReroutePolicyRule[] = [
  { id: "rp-1", trigger: "Off-route distance", threshold: "> 0.25 mi for 30s", action: "Flag off_route; show banner",         manual: false },
  { id: "rp-2", trigger: "Off-route distance", threshold: "> 0.50 mi",         action: "Suggest reroute to dispatcher",        manual: false },
  { id: "rp-3", trigger: "Dispatcher click",   threshold: "—",                  action: "Call provider.reroute(); log event",   manual: true  },
  { id: "rp-4", trigger: "Driver click",       threshold: "—",                  action: "Call provider.reroute(); log event",   manual: true  },
  { id: "rp-5", trigger: "Provider failure",   threshold: "2 consecutive fails", action: "Fall back to mock; alert ops",        manual: false },
];

// ---------------- Provider health 24h trend ----------------
export interface ProviderTrendPoint { hour: number; successPct: number; latencyMs: number; }
export const PROVIDER_TREND_MAPBOX: ProviderTrendPoint[] = [
  { hour: 0, successPct: 99, latencyMs: 380 }, { hour: 4, successPct: 100, latencyMs: 360 },
  { hour: 8, successPct: 97, latencyMs: 420 }, { hour: 12, successPct: 96, latencyMs: 460 },
  { hour: 16, successPct: 98, latencyMs: 410 }, { hour: 20, successPct: 99, latencyMs: 395 },
];

// ---------------- Billing / Stripe trust boundary ----------------
export interface TrustBoundaryLayer {
  layer: string;
  zone: "Browser" | "Server fn" | "Stripe" | "Webhook route" | "Database";
  carries: string;
  rule: string;
}

export const STRIPE_TRUST_BOUNDARY: TrustBoundaryLayer[] = [
  { layer: "Plan picker",            zone: "Browser",       carries: "Publishable key + plan id",  rule: "No secret values; no totals trust" },
  { layer: "Create checkout",        zone: "Server fn",     carries: "Secret key",                  rule: "Server-only env; never returned to client" },
  { layer: "Stripe Checkout",        zone: "Stripe",        carries: "Card data",                   rule: "Anderoute never sees PAN" },
  { layer: "stripe-webhook",         zone: "Webhook route", carries: "Signed payload",              rule: "Verify Stripe-Signature before any DB write" },
  { layer: "subscriptions / invoices", zone: "Database",    carries: "Synced state",                rule: "RLS scoped to company_id · admin only" },
];

// ---------------- Plan limit enforcement events ----------------
export interface PlanLimitEvent {
  id: string;
  company: string;
  meter: string;
  used: number;
  limit: number;
  outcome: "warn_80" | "warn_95" | "block" | "upgrade_prompted";
  at: string;
}

export const PLAN_LIMIT_EVENTS: PlanLimitEvent[] = [
  { id: "ple-1", company: "Northstar Freight", meter: "Drivers",            used: 4,   limit: 5,    outcome: "warn_80",        at: "1h ago" },
  { id: "ple-2", company: "Anderoute Demo",    meter: "CoPilot queries",    used: 612, limit: 1000, outcome: "warn_80",        at: "30m ago" },
  { id: "ple-3", company: "Sierra Logistics",  meter: "Navigation sessions",used: 990, limit: 1000, outcome: "warn_95",        at: "12m ago" },
  { id: "ple-4", company: "Pacific Haul Co.",  meter: "Loads / month",      used: 1245,limit: 2000, outcome: "upgrade_prompted",at: "yesterday" },
];

// ---------------- Webhook retry policy + signature ----------------
export interface RetryStep { attempt: number; delaySec: number; }
export const WEBHOOK_RETRY_POLICY: RetryStep[] = [
  { attempt: 1, delaySec: 0   },
  { attempt: 2, delaySec: 15  },
  { attempt: 3, delaySec: 60  },
  { attempt: 4, delaySec: 300 },
  { attempt: 5, delaySec: 1800 },
];

export const WEBHOOK_SIGNATURE_SPEC = {
  header: "X-Anderoute-Signature",
  algorithm: "HMAC-SHA256",
  format: "t=<unix>,v1=<hex>",
  toleranceSec: 300,
  secretRotation: "Per-endpoint; manual rotation; old secret valid for 24h grace",
};

// ---------------- Dispatcher saved filters ----------------
export interface DispatcherFilter { id: string; label: string; predicate: string; count: number; }
export const DISPATCHER_SAVED_FILTERS: DispatcherFilter[] = [
  { id: "df-1", label: "Off-route now",         predicate: "status = off_route",                count: 1 },
  { id: "df-2", label: "Drift > 15m",           predicate: "driftMin > 15",                     count: 2 },
  { id: "df-3", label: "Active Mapbox sessions",predicate: "provider = mapbox AND active",      count: 3 },
  { id: "df-4", label: "Rerouting",             predicate: "status = rerouting",                count: 1 },
  { id: "df-5", label: "Completed today",       predicate: "status = completed AND today()",    count: 1 },
];

// ---------------- Customer portal V1.5 timeline ----------------
export interface PortalTimelineEvent {
  id: string;
  shipment: string;
  at: string;
  label: string;
  tone: Tone;
}
export const PORTAL_TIMELINE: PortalTimelineEvent[] = [
  { id: "pt-1", shipment: "sh-1", at: "8:12 AM",  label: "Picked up · Acme Foods DC-3",  tone: "info" },
  { id: "pt-2", shipment: "sh-1", at: "10:40 AM", label: "Departed origin",              tone: "info" },
  { id: "pt-3", shipment: "sh-1", at: "2:05 PM",  label: "ETA pushed back 8 min",        tone: "warn" },
  { id: "pt-4", shipment: "sh-1", at: "5:42 PM",  label: "Approaching destination",     tone: "good" },
  { id: "pt-5", shipment: "sh-2", at: "3:20 PM",  label: "Off-route detected",           tone: "warn" },
  { id: "pt-6", shipment: "sh-2", at: "3:34 PM",  label: "Reroute completed (+12 mi)",   tone: "info" },
];

// ---------------- Driver maneuvers ----------------
export interface Maneuver { idx: number; instruction: string; distanceMi: number; }
export const DRIVER_NEXT_MANEUVERS: Maneuver[] = [
  { idx: 1, instruction: "Continue on I-80 W",                distanceMi: 0.8  },
  { idx: 2, instruction: "Take exit 92B toward Reno",         distanceMi: 14.2 },
  { idx: 3, instruction: "Merge onto US-395 S",                distanceMi: 0.5  },
  { idx: 4, instruction: "Continue for 47 miles",              distanceMi: 47.0 },
  { idx: 5, instruction: "Arrive at dropoff · Bay 3",          distanceMi: 0.1  },
];

// ---------------- Paid customer health factors ----------------
export interface HealthFactor { label: string; weight: number; pct: number; note?: string; }
export function paidCustomerHealthFactors(companyId: string): HealthFactor[] {
  const c = PAID_CUSTOMERS.find((p) => p.id === companyId);
  if (!c) return [];
  return [
    { label: "Plan utilization",   weight: 25, pct: Math.min(100, Math.round((c.loadsMonth / 500) * 100)), note: `${c.loadsMonth} loads / mo` },
    { label: "Driver engagement",  weight: 20, pct: Math.min(100, c.driversActive * 5),                    note: `${c.driversActive} active` },
    { label: "Onboarding",         weight: 15, pct: c.onboardingPct },
    { label: "Billing status",     weight: 20, pct: c.status === "active" ? 100 : c.status === "trialing" ? 80 : 25, note: c.status },
    { label: "Support sentiment",  weight: 10, pct: 78 },
    { label: "Feature adoption",   weight: 10, pct: c.plan === "professional" ? 92 : c.plan === "growth" ? 74 : 55 },
  ];
}

// ---------------- V1.5 report KPI tiles ----------------
export interface ReportKpi { label: string; value: string; tone: Tone; }
export const REPORT_KPIS: ReportKpi[] = [
  { label: "ETA accuracy (within 15m)", value: "80%",   tone: "good" },
  { label: "Mean ETA drift",            value: "12 min",tone: "info" },
  { label: "Provider success",          value: "98.7%", tone: "good" },
  { label: "Fallback uses (24h)",       value: "1",     tone: "warn" },
  { label: "Webhook delivery",          value: "98%",   tone: "good" },
  { label: "MRR",                       value: "$2,196",tone: "info" },
  { label: "Trial → paid",              value: "—",     tone: "info" },
  { label: "Avg load → delivered",      value: "14h 22m", tone: "info" },
];

// ---------------- V1.5 security findings detail ----------------
export interface SecurityFinding {
  id: string;
  area: string;
  severity: "low" | "med" | "high";
  status: "open" | "mitigated" | "accepted";
  description: string;
  owner: string;
  eta: string;
}

export const V15_SECURITY_FINDINGS: SecurityFinding[] = [
  { id: "f-1", area: "Webhooks", severity: "med",  status: "open",      description: "Webhook payloads include some fields not strictly required by consumers", owner: "Integrations", eta: "this week" },
  { id: "f-2", area: "Webhooks", severity: "low",  status: "open",      description: "Manual secret rotation only; automate post-V1.5",                          owner: "Integrations", eta: "V1.6" },
  { id: "f-3", area: "Billing",  severity: "high", status: "mitigated", description: "Stripe secret confined to server fn + webhook route",                      owner: "Platform",     eta: "—" },
  { id: "f-4", area: "Navigation", severity: "med", status: "mitigated", description: "Mapbox token URL-restricted to first-party origins",                      owner: "Platform",     eta: "—" },
  { id: "f-5", area: "Audit",    severity: "low",  status: "accepted",  description: "Provider config audit retained 90 days (regulatory min)",                  owner: "Security",     eta: "—" },
];

// ---------------- Polish summary ----------------
export function v15PolishStats() {
  return {
    interfaceMethods: NAV_INTERFACE_METHODS.length,
    mapboxLayers: MAPBOX_BOUNDARY.length,
    googleLayers: GOOGLE_BOUNDARY.length,
    renderLayers: ROUTE_RENDER_LAYERS.length,
    reroutePolicy: REROUTE_POLICY.length,
    planLimitEvents: PLAN_LIMIT_EVENTS.length,
    retrySteps: WEBHOOK_RETRY_POLICY.length,
    savedFilters: DISPATCHER_SAVED_FILTERS.length,
    securityFindingsOpen: V15_SECURITY_FINDINGS.filter((f) => f.status === "open").length,
  };
}
