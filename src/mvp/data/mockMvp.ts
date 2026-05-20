// Phase 11 — MVP cutline, sprints, backlog, pilot, risks. Mock/demo data.

export type Status = "build" | "mock" | "defer";
export type Priority = "P0" | "P1" | "P2" | "P3";

export const CUTLINE: { area: string; build: string[]; mock: string[]; defer: string[] }[] = [
  {
    area: "Dispatch & loads",
    build: ["Login & company scoping", "Load create / board / detail", "Offer → accept/deny", "Dispatch assignments", "Audit log"],
    mock: ["Basic alerts panel", "Reports v0", "ETA placeholder"],
    defer: ["Optimization engine", "Rate engine", "Advanced analytics"],
  },
  {
    area: "Driver mobile",
    build: ["Login + permissions", "Load offer screen", "Active load + status", "Live GPS upload", "POD placeholder"],
    mock: ["CoPilot mock assistant", "Issue report form"],
    defer: ["Real turn-by-turn SDK", "Android Auto", "CarPlay"],
  },
  {
    area: "Customer portal",
    build: ["Shipment list", "Tracking page", "POD view"],
    mock: ["Magic-link login placeholder", "Support contact form"],
    defer: ["Custom domain white-label", "Customer billing UI"],
  },
  {
    area: "Platform",
    build: ["RLS tenant isolation", "Roles (owner/admin/dispatcher/driver/customer)", "Audit log writer", "Driver GPS consent"],
    mock: ["Notification preferences UI", "Feature-flag stub"],
    defer: ["SSO/SAML", "SCIM", "SOC 2 automation", "EDI/API marketplace", "Stripe billing automation"],
  },
];

export const FEATURE_MATRIX: {
  category: string;
  feature: string;
  status: Status;
  priority: Priority;
  owner: string;
  complexity: "S" | "M" | "L" | "XL";
  pilot: boolean;
  notes: string;
}[] = [
  { category: "Auth",            feature: "Email/password login",            status: "build", priority: "P0", owner: "Platform", complexity: "S",  pilot: true,  notes: "Supabase Auth" },
  { category: "Auth",            feature: "Password reset",                   status: "build", priority: "P0", owner: "Platform", complexity: "S",  pilot: true,  notes: "" },
  { category: "Company setup",   feature: "Company profile + branding",       status: "build", priority: "P0", owner: "Admin",    complexity: "M",  pilot: true,  notes: "logo, timezone" },
  { category: "Company setup",   feature: "User invites + roles",             status: "build", priority: "P0", owner: "Admin",    complexity: "M",  pilot: true,  notes: "" },
  { category: "Dispatcher",      feature: "Command Center dashboard",         status: "build", priority: "P0", owner: "Dispatch", complexity: "L",  pilot: true,  notes: "" },
  { category: "Dispatcher",      feature: "Live map",                         status: "build", priority: "P0", owner: "Dispatch", complexity: "L",  pilot: true,  notes: "Mapbox/MapLibre" },
  { category: "Dispatcher",      feature: "Load board",                       status: "build", priority: "P0", owner: "Dispatch", complexity: "M",  pilot: true,  notes: "" },
  { category: "Driver app",      feature: "Login + permission flow",          status: "build", priority: "P0", owner: "Mobile",   complexity: "M",  pilot: true,  notes: "consent screen" },
  { category: "Driver app",      feature: "Load offer + accept/deny",         status: "build", priority: "P0", owner: "Mobile",   complexity: "M",  pilot: true,  notes: "" },
  { category: "Driver app",      feature: "Status updates",                   status: "build", priority: "P0", owner: "Mobile",   complexity: "S",  pilot: true,  notes: "" },
  { category: "GPS",             feature: "Live location upload",             status: "build", priority: "P0", owner: "Mobile",   complexity: "L",  pilot: true,  notes: "background loc" },
  { category: "GPS",             feature: "Stale GPS alert",                  status: "build", priority: "P1", owner: "Dispatch", complexity: "S",  pilot: true,  notes: "" },
  { category: "Loads",           feature: "Create / edit / cancel load",      status: "build", priority: "P0", owner: "Dispatch", complexity: "M",  pilot: true,  notes: "" },
  { category: "Shipments",       feature: "Shipment detail + history",        status: "build", priority: "P0", owner: "Dispatch", complexity: "M",  pilot: true,  notes: "" },
  { category: "Customer portal", feature: "Tracking page",                    status: "build", priority: "P0", owner: "Portal",   complexity: "M",  pilot: true,  notes: "" },
  { category: "Customer portal", feature: "POD view",                         status: "build", priority: "P1", owner: "Portal",   complexity: "S",  pilot: true,  notes: "" },
  { category: "Notifications",   feature: "Push (Expo)",                      status: "build", priority: "P0", owner: "Mobile",   complexity: "M",  pilot: true,  notes: "" },
  { category: "Notifications",   feature: "Email digests",                    status: "mock",  priority: "P2", owner: "Platform", complexity: "M",  pilot: false, notes: "" },
  { category: "CoPilot",         feature: "Rules-based assistant",            status: "mock",  priority: "P1", owner: "AI",       complexity: "M",  pilot: true,  notes: "real model post-pilot" },
  { category: "CoPilot",         feature: "Realtime voice",                   status: "defer", priority: "P3", owner: "AI",       complexity: "XL", pilot: false, notes: "" },
  { category: "Maps/nav",        feature: "Dispatcher live map",              status: "build", priority: "P0", owner: "Dispatch", complexity: "L",  pilot: true,  notes: "" },
  { category: "Maps/nav",        feature: "Native turn-by-turn SDK",          status: "defer", priority: "P2", owner: "Mobile",   complexity: "XL", pilot: false, notes: "post-MVP" },
  { category: "Admin",           feature: "Drivers / vehicles / customers",   status: "build", priority: "P0", owner: "Admin",    complexity: "M",  pilot: true,  notes: "" },
  { category: "Admin",           feature: "Audit log viewer",                 status: "build", priority: "P1", owner: "Admin",    complexity: "S",  pilot: true,  notes: "" },
  { category: "Reports",         feature: "Basic operational report",         status: "build", priority: "P1", owner: "Dispatch", complexity: "M",  pilot: true,  notes: "" },
  { category: "Reports",         feature: "Advanced analytics",               status: "defer", priority: "P3", owner: "Data",     complexity: "L",  pilot: false, notes: "" },
  { category: "Security",        feature: "RLS company scoping",              status: "build", priority: "P0", owner: "Platform", complexity: "L",  pilot: true,  notes: "non-negotiable" },
  { category: "Security",        feature: "SSO/SAML",                         status: "defer", priority: "P3", owner: "Platform", complexity: "L",  pilot: false, notes: "" },
  { category: "Billing",         feature: "Stripe automation",                status: "defer", priority: "P2", owner: "Platform", complexity: "L",  pilot: false, notes: "manual invoice in pilot" },
  { category: "Integrations",    feature: "EDI",                              status: "defer", priority: "P3", owner: "Integ",    complexity: "XL", pilot: false, notes: "" },
  { category: "Integrations",    feature: "API marketplace",                  status: "defer", priority: "P3", owner: "Integ",    complexity: "XL", pilot: false, notes: "" },
  { category: "Docs",            feature: "Admin / dispatch / driver guide",  status: "build", priority: "P1", owner: "Docs",     complexity: "M",  pilot: true,  notes: "" },
  { category: "Support",         feature: "Ticketing placeholder",            status: "mock",  priority: "P1", owner: "CS",       complexity: "S",  pilot: true,  notes: "email-first" },
];

export const SPRINTS = [
  { id: 0, name: "Foundation",            goal: "Repo, design system, Supabase, auth, RLS baseline.",      stories: 6,  risks: ["RLS gaps"] },
  { id: 1, name: "Core data & admin",     goal: "Companies, users, drivers, vehicles, customers, admin UI.",stories: 9,  risks: ["Importer scope"] },
  { id: 2, name: "Load management",       goal: "Create load, load board, detail, assignment, status flow.",stories: 8,  risks: ["Status enum drift"] },
  { id: 3, name: "Driver app MVP",        goal: "Login, permissions, offer, accept/deny, active load.",     stories: 9,  risks: ["Permissions"] },
  { id: 4, name: "Live GPS & map",        goal: "Location upload, live state, dispatcher map, stale alert.",stories: 7,  risks: ["Battery drain"] },
  { id: 5, name: "Customer portal & POD", goal: "Tracking, POD, completion, customer notifications.",       stories: 6,  risks: ["Public RLS"] },
  { id: 6, name: "Notify, alerts, audit", goal: "Push service, alert rules, audit logs, basic reports.",    stories: 7,  risks: ["Push delivery"] },
  { id: 7, name: "Pilot hardening",       goal: "QA, RLS tests, perf, demo mode, docs, onboarding.",        stories: 8,  risks: ["Scope creep"] },
];

export const USER_STORIES = [
  { id: "US-001", role: "Dispatcher",      story: "Create a load and assign it to a driver",       priority: "P0", sprint: 2 },
  { id: "US-002", role: "Driver",          story: "Accept or deny a load offer",                   priority: "P0", sprint: 3 },
  { id: "US-003", role: "Driver",          story: "Update my status on an active load",            priority: "P0", sprint: 3 },
  { id: "US-004", role: "Dispatcher",      story: "See live driver locations on a map",            priority: "P0", sprint: 4 },
  { id: "US-005", role: "Customer",        story: "Track my shipment without calling dispatch",    priority: "P0", sprint: 5 },
  { id: "US-006", role: "Driver",          story: "Submit proof of delivery",                      priority: "P1", sprint: 5 },
  { id: "US-007", role: "Admin",           story: "Add drivers and vehicles to my company",        priority: "P0", sprint: 1 },
  { id: "US-008", role: "Platform owner",  story: "Be certain tenant data is isolated",            priority: "P0", sprint: 0 },
  { id: "US-009", role: "Dispatcher",      story: "Receive alerts for stale GPS or late ETA",      priority: "P1", sprint: 6 },
  { id: "US-010", role: "Admin",           story: "View audit log for key actions",                priority: "P1", sprint: 6 },
];

export const BACKLOG = [
  { id: "AR-001", area: "Foundation",     title: "Repo + CI/CD baseline",            priority: "P0", estimate: "S" },
  { id: "AR-002", area: "Auth",           title: "Email/password + reset flows",     priority: "P0", estimate: "M" },
  { id: "AR-003", area: "RBAC",           title: "user_roles + has_role helper",     priority: "P0", estimate: "M" },
  { id: "AR-004", area: "Database",       title: "MVP schema migration",             priority: "P0", estimate: "L" },
  { id: "AR-005", area: "RLS",            title: "Tenant-scoped policies",           priority: "P0", estimate: "L" },
  { id: "AR-006", area: "Realtime",       title: "Subscriptions for live state",     priority: "P0", estimate: "M" },
  { id: "AR-007", area: "Dispatcher web", title: "Command Center shell",             priority: "P0", estimate: "L" },
  { id: "AR-008", area: "Dispatcher web", title: "Load board + create-load form",    priority: "P0", estimate: "L" },
  { id: "AR-009", area: "Driver mobile",  title: "Permission setup screen",          priority: "P0", estimate: "M" },
  { id: "AR-010", area: "Driver mobile",  title: "Load offer + accept/deny",         priority: "P0", estimate: "M" },
  { id: "AR-011", area: "GPS",            title: "Background location uploader",     priority: "P0", estimate: "L" },
  { id: "AR-012", area: "Maps",           title: "Dispatcher live map",              priority: "P0", estimate: "L" },
  { id: "AR-013", area: "Loads",          title: "Load status state machine",        priority: "P0", estimate: "M" },
  { id: "AR-014", area: "POD",            title: "Photo + signature capture",        priority: "P1", estimate: "M" },
  { id: "AR-015", area: "Notifications",  title: "Expo push registration",           priority: "P0", estimate: "M" },
  { id: "AR-016", area: "Alerts",         title: "Stale GPS + late ETA rules",       priority: "P1", estimate: "M" },
  { id: "AR-017", area: "Audit",          title: "Audit log writer + viewer",        priority: "P1", estimate: "M" },
  { id: "AR-018", area: "Reports",        title: "Operational summary report",       priority: "P1", estimate: "M" },
  { id: "AR-019", area: "Customer portal",title: "Tracking page + POD view",         priority: "P0", estimate: "M" },
  { id: "AR-020", area: "Demo mode",      title: "Seeded pilot company + reset",     priority: "P1", estimate: "M" },
  { id: "AR-021", area: "Docs",           title: "Admin/dispatch/driver guides",     priority: "P1", estimate: "M" },
  { id: "AR-022", area: "QA",             title: "RLS + workflow test plan",         priority: "P0", estimate: "L" },
  { id: "AR-023", area: "Deployment",     title: "Staging + pilot prod envs",        priority: "P0", estimate: "M" },
];

export const TECH_DEBT = [
  { id: "TD-01", area: "Components",  item: "Split overly large dashboard files",                priority: "P1", effort: "M" },
  { id: "TD-02", area: "Types",       item: "Unify status enums (load / driver / shipment)",     priority: "P0", effort: "M" },
  { id: "TD-03", area: "Data",        item: "Separate mock services from production services",   priority: "P0", effort: "L" },
  { id: "TD-04", area: "Design",      item: "Replace hardcoded colors with semantic tokens",     priority: "P1", effort: "M" },
  { id: "TD-05", area: "Providers",   item: "Lock map/nav provider abstraction boundary",        priority: "P1", effort: "M" },
  { id: "TD-06", area: "UX",          item: "Add loading + empty + error states everywhere",     priority: "P1", effort: "L" },
  { id: "TD-07", area: "Security",    item: "Add permission gates on every screen",              priority: "P0", effort: "M" },
  { id: "TD-08", area: "Tests",       item: "Add RLS + workflow tests",                          priority: "P0", effort: "L" },
  { id: "TD-09", area: "Structure",   item: "Clarify folder boundaries by domain",               priority: "P2", effort: "M" },
  { id: "TD-10", area: "UI",          item: "Remove deferred-feature placeholders from MVP UI",  priority: "P1", effort: "S" },
];

export const ADRS = [
  { id: "ADR-001", title: "Use Supabase as backend platform",        decision: "Adopt", consequences: "Faster build; vendor coupling acceptable for MVP." },
  { id: "ADR-002", title: "React Native (Expo) for driver app",      decision: "Adopt", consequences: "Single mobile codebase; native modules limited." },
  { id: "ADR-003", title: "React web for dispatcher dashboard",      decision: "Adopt", consequences: "Reuses design system + auth." },
  { id: "ADR-004", title: "Provider abstraction for maps/navigation",decision: "Adopt", consequences: "Defer SDK choice; easier swap later." },
  { id: "ADR-005", title: "Mock CoPilot before real AI",             decision: "Adopt", consequences: "Demo-able now; real model post-pilot." },
  { id: "ADR-006", title: "RLS for tenant isolation",                decision: "Adopt", consequences: "Strong default; every table needs review." },
  { id: "ADR-007", title: "Edge Fns / server fns for trusted logic", decision: "Adopt", consequences: "No service-role key in clients." },
  { id: "ADR-008", title: "Defer EDI / API marketplace from MVP",    decision: "Defer", consequences: "Manual integrations during pilot." },
  { id: "ADR-009", title: "Defer native turn-by-turn from MVP",      decision: "Defer", consequences: "Use map + route placeholder." },
  { id: "ADR-010", title: "Defer billing automation from MVP",       decision: "Defer", consequences: "Manual invoicing during pilot." },
];

export const QA_TESTS = [
  { id: "QA-01", scenario: "Tenant isolation: dispatcher A cannot read company B loads", priority: "P0", type: "automated" },
  { id: "QA-02", scenario: "Driver accept moves load to In Transit",                     priority: "P0", type: "automated" },
  { id: "QA-03", scenario: "GPS upload appears on dispatcher map within 5s",              priority: "P0", type: "manual"    },
  { id: "QA-04", scenario: "Customer portal shows only their shipments",                 priority: "P0", type: "automated" },
  { id: "QA-05", scenario: "POD upload + view on customer portal",                       priority: "P1", type: "manual"    },
  { id: "QA-06", scenario: "Stale GPS alert fires after threshold",                       priority: "P1", type: "automated" },
  { id: "QA-07", scenario: "Audit log records role + entity for key actions",            priority: "P1", type: "automated" },
  { id: "QA-08", scenario: "Push notification delivered on load offer",                  priority: "P0", type: "manual"    },
  { id: "QA-09", scenario: "Role gate blocks non-admin from user management",            priority: "P0", type: "automated" },
  { id: "QA-10", scenario: "Driver consent required before background location",         priority: "P0", type: "manual"    },
];

export const RELEASE_GATES = [
  { gate: "RLS tests pass",              owner: "Platform", status: "pending" },
  { gate: "Load workflow E2E",            owner: "QA",       status: "pending" },
  { gate: "GPS workflow E2E",             owner: "QA",       status: "pending" },
  { gate: "Driver app smoke test",        owner: "Mobile",   status: "pending" },
  { gate: "Customer portal smoke test",   owner: "Portal",   status: "pending" },
  { gate: "Audit logs verified",          owner: "Platform", status: "pending" },
  { gate: "No critical bugs",             owner: "QA",       status: "pending" },
  { gate: "Pilot company seeded",         owner: "CS",       status: "pending" },
  { gate: "Backup plan confirmed",        owner: "Platform", status: "pending" },
  { gate: "Support process ready",        owner: "CS",       status: "pending" },
];

export const PILOT_CHECKLIST = [
  { id: "PL-01", item: "Pilot customer signed pilot agreement",         done: false },
  { id: "PL-02", item: "Company + dispatchers + drivers provisioned",   done: false },
  { id: "PL-03", item: "Vehicles + customers imported",                  done: false },
  { id: "PL-04", item: "Driver consent + training complete",             done: false },
  { id: "PL-05", item: "Dispatcher training complete",                   done: false },
  { id: "PL-06", item: "Customer portal access shared",                  done: false },
  { id: "PL-07", item: "Support escalation path agreed",                 done: false },
  { id: "PL-08", item: "Success metrics baseline captured",              done: false },
  { id: "PL-09", item: "Weekly check-in scheduled",                      done: false },
  { id: "PL-10", item: "Exit / conversion criteria documented",          done: false },
];

export const PILOT_METRICS = [
  { name: "Driver app adoption",          target: "≥ 80%" },
  { name: "Load status accuracy",         target: "≥ 90%" },
  { name: "GPS sync reliability",         target: "≥ 90%" },
  { name: "Reduced customer status calls",target: "≥ 50%" },
  { name: "POD captured per delivery",    target: "≥ 85%" },
  { name: "Cross-company data leaks",     target: "0" },
  { name: "Critical security incidents",  target: "0" },
];

export const PILOT_RISKS = [
  { risk: "Driver app non-adoption",       likelihood: "M", impact: "H", mitigation: "On-site training + driver champion" },
  { risk: "Battery drain from GPS",         likelihood: "M", impact: "M", mitigation: "Tune interval + foreground service" },
  { risk: "Map provider cost spike",        likelihood: "L", impact: "M", mitigation: "Provider abstraction + quota alerts" },
  { risk: "RLS misconfiguration",           likelihood: "L", impact: "H", mitigation: "Automated RLS test suite" },
  { risk: "Scope creep mid-pilot",          likelihood: "H", impact: "M", mitigation: "Lock backlog, change-control" },
];

export const PRODUCT_RISKS = [
  { risk: "Driver adoption",                like: "M", imp: "H", mit: "Champion + 1-page guide" },
  { risk: "GPS reliability",                 like: "M", imp: "H", mit: "Provider abstraction + retry queue" },
  { risk: "Mobile battery",                  like: "M", imp: "M", mit: "Adaptive cadence" },
  { risk: "Push reliability",                like: "M", imp: "M", mit: "Fallback SMS/email" },
  { risk: "Map cost",                        like: "L", imp: "M", mit: "Quota + MapLibre fallback" },
  { risk: "Realtime scaling",                like: "L", imp: "M", mit: "Channel sharding plan" },
  { risk: "RLS mistakes",                    like: "L", imp: "H", mit: "Test suite + reviews" },
  { risk: "Scope creep",                     like: "H", imp: "H", mit: "MVP cutline lock" },
  { risk: "AI overbuild",                    like: "M", imp: "M", mit: "Rules-based first" },
  { risk: "App store background location",   like: "M", imp: "H", mit: "Consent + clear copy" },
  { risk: "CDL nav liability",               like: "L", imp: "H", mit: "Defer turn-by-turn" },
  { risk: "Data retention concerns",         like: "L", imp: "M", mit: "Retention policy doc" },
];

export const ROADMAP = [
  { phase: "MVP Pilot",      items: ["Core dispatch", "Driver app", "Live GPS", "Customer portal", "POD", "Notifications"] },
  { phase: "Post-Pilot V1",  items: ["Better ETA", "Mobile offline", "Basic CoPilot", "Better alerts", "Driver import", "Reports", "Billing placeholder"] },
  { phase: "V1.5",           items: ["Real nav SDK", "Advanced portal", "Basic integrations", "Stripe billing", "Optimization v0"] },
  { phase: "V2",             items: ["AI Ops Intelligence", "EDI / API marketplace", "White-label", "Advanced reports", "Compliance center"] },
  { phase: "Enterprise",     items: ["SSO/SAML", "SOC 2 automation", "EDI prod", "Optimization+", "Android Auto / CarPlay"] },
];

export const BUILD_VS_BUY = [
  { capability: "Maps",                  recommend: "Buy",   provider: "Mapbox or MapLibre",   reason: "Avoid map rendering investment" },
  { capability: "Turn-by-turn nav",      recommend: "Defer", provider: "—",                     reason: "Out of MVP scope" },
  { capability: "Push notifications",    recommend: "Buy",   provider: "Expo Push",            reason: "Fast cross-platform" },
  { capability: "Billing",               recommend: "Defer", provider: "Stripe later",          reason: "Manual invoice in pilot" },
  { capability: "Authentication",        recommend: "Buy",   provider: "Supabase Auth",         reason: "Bundled" },
  { capability: "File storage",          recommend: "Buy",   provider: "Supabase Storage",      reason: "Bundled" },
  { capability: "Email",                 recommend: "Buy",   provider: "Resend / Postmark",     reason: "Transactional" },
  { capability: "SMS",                   recommend: "Defer", provider: "Twilio later",          reason: "Push covers MVP" },
  { capability: "AI voice",              recommend: "Defer", provider: "OpenAI later",          reason: "Mock CoPilot first" },
  { capability: "EDI",                   recommend: "Defer", provider: "Cleo / SPS",            reason: "Enterprise phase" },
  { capability: "Customer support",      recommend: "Buy",   provider: "Email + simple inbox",  reason: "Lightweight in pilot" },
  { capability: "Analytics",             recommend: "Buy",   provider: "PostHog",               reason: "Product analytics" },
  { capability: "Crash reporting",       recommend: "Buy",   provider: "Sentry",                reason: "Mobile + web" },
];

export const COST_ITEMS = [
  { item: "Supabase database",     monthly: "$25–$150",  notes: "Scales with rows + connections" },
  { item: "Supabase realtime",     monthly: "Included",  notes: "Watch concurrent channels" },
  { item: "Supabase storage",      monthly: "$5–$50",    notes: "POD photos" },
  { item: "Map API",               monthly: "$50–$500",  notes: "Per dispatcher session" },
  { item: "Push notifications",    monthly: "Free",      notes: "Expo Push free tier" },
  { item: "AI gateway (mock)",     monthly: "$0",        notes: "Rules-only in MVP" },
  { item: "Email (Resend)",        monthly: "$20–$50",   notes: "Transactional" },
  { item: "Sentry",                monthly: "$26+",      notes: "Errors + perf" },
  { item: "Mobile build (EAS)",    monthly: "$0–$99",    notes: "Expo EAS" },
  { item: "Apple + Google fees",   monthly: "Annual",    notes: "$99 + $25 one-time" },
];

export const DEMO_STEPS = [
  "Dispatcher logs in to Command Center",
  "Creates a new load (origin → destination)",
  "Offers load to driver Maria",
  "Driver Maria accepts on mobile",
  "Live GPS appears on dispatcher map",
  "Driver updates status: En route → Arrived → Delivered",
  "Driver captures POD (placeholder)",
  "Customer opens tracking page and sees status",
  "Stale-GPS alert demo on a second driver",
  "Admin reviews audit log of the workflow",
];
