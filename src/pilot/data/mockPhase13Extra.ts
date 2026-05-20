/**
 * Phase 13 — extended mock data for pilot launch sub-modules.
 * Read-only mocks used by the Pilot Readiness sub-pages.
 */
import type { ReadinessStatus } from "./mockPhase13";

export interface TrainingModule {
  id: string;
  role: "admin" | "dispatcher" | "driver" | "customer";
  title: string;
  duration: string;
  status: "not_started" | "in_progress" | "complete";
  completion: number; // 0..100
}

export const TRAINING_MODULES: TrainingModule[] = [
  { id: "TR-A1", role: "admin",      title: "Company setup + users",          duration: "20m", status: "complete",     completion: 100 },
  { id: "TR-A2", role: "admin",      title: "Drivers, vehicles, customers",   duration: "20m", status: "in_progress",  completion: 60  },
  { id: "TR-A3", role: "admin",      title: "Audit logs + support process",   duration: "15m", status: "not_started",  completion: 0   },
  { id: "TR-D1", role: "dispatcher", title: "Dashboard + load board",         duration: "15m", status: "complete",     completion: 100 },
  { id: "TR-D2", role: "dispatcher", title: "Create + offer + assign load",   duration: "20m", status: "complete",     completion: 100 },
  { id: "TR-D3", role: "dispatcher", title: "Track driver + resolve alert",   duration: "15m", status: "in_progress",  completion: 70  },
  { id: "TR-D4", role: "dispatcher", title: "Customer shipment + audit",      duration: "10m", status: "not_started",  completion: 0   },
  { id: "TR-V1", role: "driver",     title: "Login + privacy consent",        duration: "5m",  status: "complete",     completion: 100 },
  { id: "TR-V2", role: "driver",     title: "Accept / deny offer",            duration: "5m",  status: "in_progress",  completion: 50  },
  { id: "TR-V3", role: "driver",     title: "Status updates + GPS",           duration: "10m", status: "in_progress",  completion: 40  },
  { id: "TR-V4", role: "driver",     title: "POD submission + report issue",  duration: "10m", status: "not_started",  completion: 0   },
  { id: "TR-C1", role: "customer",   title: "Login + shipment list",          duration: "5m",  status: "not_started",  completion: 0   },
  { id: "TR-C2", role: "customer",   title: "Track shipment + view POD",      duration: "5m",  status: "not_started",  completion: 0   },
];

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  role: "admin" | "dispatcher" | "driver" | "customer";
  priority: "P0" | "P1" | "P2" | "P3";
  status: "open" | "in_progress" | "waiting" | "resolved";
  owner?: string;
  createdAt: string;
}

export const SUPPORT_TICKETS: SupportTicket[] = [
  { id: "SUP-101", subject: "Driver cannot see offered load",    category: "Driver app",  role: "driver",     priority: "P0", status: "in_progress", owner: "platform", createdAt: "2026-05-19 09:14" },
  { id: "SUP-102", subject: "Customer sees wrong shipment",      category: "Permissions", role: "customer",   priority: "P0", status: "open",        owner: "security", createdAt: "2026-05-19 10:02" },
  { id: "SUP-103", subject: "POD upload spinner stuck",          category: "POD",         role: "driver",     priority: "P1", status: "waiting",     owner: "platform", createdAt: "2026-05-18 17:50" },
  { id: "SUP-104", subject: "Cannot reset password",             category: "Login",       role: "dispatcher", priority: "P2", status: "resolved",    owner: "cs",       createdAt: "2026-05-18 11:30" },
  { id: "SUP-105", subject: "Map driver pin overlaps tooltip",   category: "Dispatcher",  role: "dispatcher", priority: "P2", status: "open",                                createdAt: "2026-05-19 12:18" },
];

export const SUPPORT_CATEGORIES = [
  "Login", "Driver app", "GPS tracking", "Load workflow", "Dispatcher",
  "Customer portal", "Notifications", "POD", "Permissions", "Data issue", "Other",
];

export interface PilotCompanySetupStep {
  id: string;
  step: string;
  status: "done" | "in_progress" | "todo";
  detail?: string;
}

export const PILOT_COMPANY_SETUP: PilotCompanySetupStep[] = [
  { id: "CS-1",  step: "Create company",                  status: "done",         detail: "Acme Freight LLC" },
  { id: "CS-2",  step: "Company profile complete",        status: "done" },
  { id: "CS-3",  step: "Add company admin",               status: "done",         detail: "1 admin" },
  { id: "CS-4",  step: "Add dispatchers",                 status: "done",         detail: "2 dispatchers" },
  { id: "CS-5",  step: "Add drivers",                     status: "in_progress",  detail: "6 / 8 drivers" },
  { id: "CS-6",  step: "Add vehicles",                    status: "in_progress",  detail: "8 / 10 vehicles" },
  { id: "CS-7",  step: "Add customers",                   status: "done",         detail: "2 customers" },
  { id: "CS-8",  step: "Assign drivers ↔ vehicles",       status: "in_progress",  detail: "6 / 8 assigned" },
  { id: "CS-9",  step: "Enter first loads",               status: "in_progress",  detail: "3 / 5 test loads" },
  { id: "CS-10", step: "Configure notifications",         status: "todo" },
  { id: "CS-11", step: "Enable customer portal",          status: "todo" },
  { id: "CS-12", step: "Enable support / demo mode",      status: "todo" },
  { id: "CS-13", step: "Confirm go-live date",            status: "todo" },
];

export const PILOT_DATA_CHECKLIST: { id: string; item: string; required: number; current: number }[] = [
  { id: "D-1",  item: "Company admin",         required: 1,  current: 1 },
  { id: "D-2",  item: "Dispatchers",           required: 2,  current: 2 },
  { id: "D-3",  item: "Drivers (5–15)",        required: 5,  current: 6 },
  { id: "D-4",  item: "Vehicles (5–20)",       required: 5,  current: 8 },
  { id: "D-5",  item: "Customers (1–3)",       required: 1,  current: 2 },
  { id: "D-6",  item: "Test loads",            required: 5,  current: 3 },
  { id: "D-7",  item: "Driver phone/email",    required: 6,  current: 5 },
  { id: "D-8",  item: "Vehicle type complete", required: 8,  current: 8 },
  { id: "D-9",  item: "Customer contact",      required: 2,  current: 2 },
];

export const SMOKE_TESTS: { id: string; test: string; status: "pass" | "fail" | "pending" }[] = [
  { id: "S-1",  test: "Login works",                                 status: "pass" },
  { id: "S-2",  test: "Company dashboard loads",                     status: "pass" },
  { id: "S-3",  test: "Load board loads",                            status: "pass" },
  { id: "S-4",  test: "Create load works",                           status: "pass" },
  { id: "S-5",  test: "Driver can view offer",                       status: "fail" },
  { id: "S-6",  test: "Accept load works",                           status: "pass" },
  { id: "S-7",  test: "Deny load works",                             status: "pass" },
  { id: "S-8",  test: "Driver status update works",                  status: "pass" },
  { id: "S-9",  test: "Driver live state appears",                   status: "pass" },
  { id: "S-10", test: "Dispatcher map loads",                        status: "pass" },
  { id: "S-11", test: "Customer portal loads",                       status: "pending" },
  { id: "S-12", test: "Shipment detail loads",                       status: "pending" },
  { id: "S-13", test: "POD submit works",                            status: "pending" },
  { id: "S-14", test: "Alerts page loads",                           status: "pass" },
  { id: "S-15", test: "Audit logs page loads",                       status: "pass" },
  { id: "S-16", test: "Notifications appear",                        status: "pending" },
  { id: "S-17", test: "No console errors",                           status: "pass" },
  { id: "S-18", test: "No TypeScript / build errors",                status: "pass" },
];

export const RLS_TESTS: { id: string; test: string; result: "pass" | "fail" | "pending" }[] = [
  { id: "R-1",  test: "Cross-company SELECT blocked",                result: "pass" },
  { id: "R-2",  test: "Driver sees only own assigned loads",         result: "pass" },
  { id: "R-3",  test: "Customer sees only own shipments",            result: "fail" },
  { id: "R-4",  test: "Dispatcher scoped to company data",           result: "pass" },
  { id: "R-5",  test: "Company admin scoped to company",             result: "pass" },
  { id: "R-6",  test: "Storage bucket POD scoped to company",        result: "pending" },
  { id: "R-7",  test: "Edge Function requires auth header",          result: "pass" },
  { id: "R-8",  test: "Service role not exposed to client bundle",   result: "pass" },
  { id: "R-9",  test: "Audit log captures sensitive actions",        result: "pass" },
];

export const ENV_CHECKS: { id: string; check: string; status: ReadinessStatus }[] = [
  { id: "E-1",  check: "Supabase project ready",          status: "passed" },
  { id: "E-2",  check: "Environment variables configured", status: "passed" },
  { id: "E-3",  check: "Auth settings configured",        status: "passed" },
  { id: "E-4",  check: "Storage buckets configured",      status: "ready" },
  { id: "E-5",  check: "RLS enabled on all MVP tables",   status: "needs_review" },
  { id: "E-6",  check: "Seed / pilot data loaded",        status: "ready" },
  { id: "E-7",  check: "Realtime enabled for loads/GPS",  status: "ready" },
  { id: "E-8",  check: "Edge Functions deployed",         status: "in_progress" },
  { id: "E-9",  check: "Notification placeholders wired", status: "in_progress" },
  { id: "E-10", check: "Domain placeholder configured",   status: "not_started" },
  { id: "E-11", check: "Error logging placeholder ready", status: "in_progress" },
];

export const DATA_PROTECTION_CHECKS: { id: string; item: string; ok: boolean }[] = [
  { id: "DP-1",  item: "Driver consent language reviewed",          ok: true  },
  { id: "DP-2",  item: "Location tracking disclosure visible",      ok: true  },
  { id: "DP-3",  item: "Customer portal access scoped",             ok: false },
  { id: "DP-4",  item: "POD storage access scoped",                 ok: true  },
  { id: "DP-5",  item: "Audit logs cover sensitive actions",        ok: true  },
  { id: "DP-6",  item: "Data retention policy placeholder",         ok: false },
  { id: "DP-7",  item: "Support access audited",                    ok: false },
  { id: "DP-8",  item: "No cross-company data leakage",             ok: false },
  { id: "DP-9",  item: "No raw audio captured",                     ok: true  },
  { id: "DP-10", item: "No unnecessary sensitive data collected",   ok: true  },
  { id: "DP-11", item: "Access reviewed before go-live",            ok: false },
];

export const FEEDBACK_THEMES: { id: string; theme: string; role: string; count: number; sentiment: "positive" | "neutral" | "negative" }[] = [
  { id: "FB-1", theme: "Load offer notifications unreliable",      role: "driver",     count: 4, sentiment: "negative" },
  { id: "FB-2", theme: "Map view is fast and clear",               role: "dispatcher", count: 3, sentiment: "positive" },
  { id: "FB-3", theme: "Customer portal is much better than email", role: "customer",  count: 2, sentiment: "positive" },
  { id: "FB-4", theme: "POD submission step is confusing",         role: "driver",     count: 2, sentiment: "negative" },
  { id: "FB-5", theme: "Want more granular alerts",                role: "dispatcher", count: 2, sentiment: "neutral"  },
];

export const ESCALATIONS: { id: string; level: 1 | 2 | 3 | 4 | 5; issue: string; status: "open" | "resolved" }[] = [
  { id: "ES-1", level: 1, issue: "Dispatcher login MFA confusion",      status: "resolved" },
  { id: "ES-2", level: 2, issue: "Driver offer notification not firing", status: "open"    },
  { id: "ES-3", level: 3, issue: "Customer portal RLS leak",            status: "open"     },
  { id: "ES-4", level: 4, issue: "POD storage policy gap",              status: "resolved" },
];

export const ROLLBACK_ACTIONS: { id: string; trigger: string; action: string }[] = [
  { id: "RB-1", trigger: "RLS isolation failure",            action: "Disable pilot company access + revoke tokens" },
  { id: "RB-2", trigger: "Driver app unusable",              action: "Switch dispatchers to manual radio + record incident" },
  { id: "RB-3", trigger: "Customer portal exposes wrong data", action: "Disable customer portal globally + notify pilot customer" },
  { id: "RB-4", trigger: "GPS streams cause confusion",      action: "Disable driver GPS updates + show last-known only" },
  { id: "RB-5", trigger: "Failed deployment",                action: "Restore previous build + replay migrations" },
  { id: "RB-6", trigger: "Critical production bug",          action: "Halt new offers + export active loads + open incident" },
];

export const PILOT_DOCS: { id: string; title: string; audience: string }[] = [
  { id: "DOC-1",  title: "Pilot overview",                 audience: "All"        },
  { id: "DOC-2",  title: "Admin setup guide",              audience: "Admin"      },
  { id: "DOC-3",  title: "Dispatcher quick start",         audience: "Dispatcher" },
  { id: "DOC-4",  title: "Driver quick start",             audience: "Driver"     },
  { id: "DOC-5",  title: "Customer portal quick start",    audience: "Customer"   },
  { id: "DOC-6",  title: "First load guide",               audience: "Dispatch"   },
  { id: "DOC-7",  title: "POD guide",                      audience: "Driver"     },
  { id: "DOC-8",  title: "GPS / privacy guide",            audience: "Driver"     },
  { id: "DOC-9",  title: "Support process",                audience: "All"        },
  { id: "DOC-10", title: "Known issues",                   audience: "All"        },
  { id: "DOC-11", title: "Feedback process",               audience: "All"        },
  { id: "DOC-12", title: "Escalation process",             audience: "Admin"      },
  { id: "DOC-13", title: "Rollback plan",                  audience: "Platform"   },
];

export const BUG_FIX_SPRINT: { id: string; bucket: string; count: number; eta: string }[] = [
  { id: "SP-1", bucket: "P0 launch blockers",     count: 3, eta: "2 days" },
  { id: "SP-2", bucket: "P1 pilot quality",       count: 4, eta: "4 days" },
  { id: "SP-3", bucket: "P2 pilot improvements",  count: 6, eta: "1 week" },
  { id: "SP-4", bucket: "UI polish",              count: 5, eta: "1 week" },
  { id: "SP-5", bucket: "Mobile fixes",           count: 2, eta: "3 days" },
  { id: "SP-6", bucket: "GPS fixes",              count: 2, eta: "3 days" },
  { id: "SP-7", bucket: "RLS / security fixes",   count: 1, eta: "1 day"  },
  { id: "SP-8", bucket: "Customer portal fixes", count: 2, eta: "3 days" },
  { id: "SP-9", bucket: "POD fixes",              count: 1, eta: "2 days" },
];

export const RC_STEPS: { id: string; step: string; status: ReadinessStatus }[] = [
  { id: "RC-1",  step: "Build created",                     status: "passed" },
  { id: "RC-2",  step: "Migration tested",                  status: "passed" },
  { id: "RC-3",  step: "Seed data tested",                  status: "passed" },
  { id: "RC-4",  step: "Smoke test passed",                 status: "in_progress" },
  { id: "RC-5",  step: "RLS tests passed",                  status: "needs_review" },
  { id: "RC-6",  step: "Load workflow passed",              status: "ready" },
  { id: "RC-7",  step: "Driver workflow passed",            status: "ready" },
  { id: "RC-8",  step: "Customer portal passed",            status: "in_progress" },
  { id: "RC-9",  step: "Critical bugs fixed",               status: "in_progress" },
  { id: "RC-10", step: "Support docs ready",                status: "in_progress" },
  { id: "RC-11", step: "Training complete",                 status: "in_progress" },
  { id: "RC-12", step: "Go-live approved",                  status: "not_started" },
];

export const DAILY_REVIEW = {
  date: "2026-05-19",
  loadsCompleted: 4,
  openLoads: 6,
  gpsIssues: 1,
  driverIssues: 2,
  dispatcherIssues: 1,
  portalIssues: 1,
  supportTickets: 3,
  bugsOpened: 2,
  bugsClosed: 1,
  feedbackReceived: 4,
  nextActions: [
    "Fix BUG-019 offer notification",
    "Retest T-RLS-04 customer portal isolation",
    "Walk Driver group B through POD flow",
    "Confirm customer go-live training slot",
  ],
};

export const WEEKLY_REVIEW = {
  week: "Week of 2026-05-18",
  adoption: { driver: "68%", dispatcher: "100%", customer: "50%" },
  loadsCompleted: 19,
  gpsReliability: "92%",
  podCompletion: "78%",
  supportVolume: 11,
  bugsOpened: 7,
  bugsClosed: 4,
  themes: [
    "Driver offer notifications most-reported issue",
    "Map and load board well received",
    "Customer portal needs onboarding nudges",
  ],
  recommendations: [
    "Block go-live until BUG-019 + BUG-021 verified",
    "Add inline help on POD submit step",
    "Schedule second driver training session",
  ],
};

export const EDGE_FUNCTIONS: { id: string; name: string; purpose: string }[] = [
  { id: "EF-1",  name: "create-pilot-company",         purpose: "Seed a new pilot company with admin user" },
  { id: "EF-2",  name: "seed-pilot-data",              purpose: "Seed drivers, vehicles, customers, test loads" },
  { id: "EF-3",  name: "run-pilot-smoke-test",         purpose: "Run smoke test suite and record results" },
  { id: "EF-4",  name: "run-rls-validation",           purpose: "Run RLS matrix as different test users" },
  { id: "EF-5",  name: "calculate-pilot-readiness-score", purpose: "Recompute readiness percentage" },
  { id: "EF-6",  name: "create-bug-from-failed-test",  purpose: "Auto-open bug from failed test case" },
  { id: "EF-7",  name: "submit-pilot-feedback",        purpose: "Persist structured pilot feedback" },
  { id: "EF-8",  name: "summarize-pilot-feedback",     purpose: "Cluster feedback into themes" },
  { id: "EF-9",  name: "calculate-pilot-metrics",      purpose: "Aggregate daily pilot KPIs" },
  { id: "EF-10", name: "generate-daily-pilot-review",  purpose: "Emit daily review summary" },
  { id: "EF-11", name: "generate-weekly-pilot-review", purpose: "Emit weekly review summary" },
  { id: "EF-12", name: "create-pilot-incident",        purpose: "Open an incident with rollback context" },
  { id: "EF-13", name: "approve-pilot-launch",         purpose: "Record go/no-go decision + approver" },
  { id: "EF-14", name: "trigger-rollback-plan",        purpose: "Execute rollback actions atomically" },
  { id: "EF-15", name: "generate-pilot-final-report",  purpose: "Compile final pilot report for V1" },
];
