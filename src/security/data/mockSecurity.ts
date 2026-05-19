/** Phase 8 — Security, compliance, ops mock catalog.
 *  Pure data. Hooks in `useSecurityData.ts` consume this. */

export type Severity = "critical" | "high" | "medium" | "low" | "info";
export type ControlStatus =
  | "not_started" | "designed" | "implemented" | "operating"
  | "needs_remediation" | "ready_for_audit";
export type TscCategory =
  | "security" | "availability" | "processing_integrity"
  | "confidentiality" | "privacy";

export interface PostureCard {
  key: string; label: string; score: number; status: "pass" | "warn" | "fail";
  owner: string; note: string;
}

export const POSTURE_CARDS: PostureCard[] = [
  { key: "auth",          label: "Authentication",     score: 86, status: "pass", owner: "Platform admin", note: "MFA enforced for owners; SSO/SAML placeholder." },
  { key: "authz",         label: "Authorization",      score: 92, status: "pass", owner: "Company admin",  note: "RBAC enforced; least-privilege reviewed quarterly." },
  { key: "tenant",        label: "Tenant Isolation",   score: 78, status: "warn", owner: "Platform admin", note: "1 RLS gap on `documents` cross-company list — remediation in flight." },
  { key: "api",           label: "API Security",       score: 81, status: "pass", owner: "Integrations",   note: "Hashed keys, HMAC webhooks, replay-protection 5m." },
  { key: "mobile",        label: "Mobile Security",    score: 74, status: "warn", owner: "Mobile lead",    note: "Cert pinning + root detection placeholders pending." },
  { key: "data",          label: "Data Protection",    score: 88, status: "pass", owner: "Privacy officer",note: "PII inventory current; raw audio hard-locked off." },
  { key: "audit",         label: "Audit Logging",      score: 95, status: "pass", owner: "Compliance",     note: "100% coverage on writes; 90d hot, 1y cold." },
  { key: "backup",        label: "Backup & Recovery",  score: 83, status: "pass", owner: "SRE",            note: "PITR 7d, last restore drill passed." },
  { key: "incident",      label: "Incident Response",  score: 70, status: "warn", owner: "On-call",        note: "Runbooks 9/12; postmortem template adopted." },
  { key: "vendor",        label: "Vendor Risk",        score: 68, status: "warn", owner: "Compliance",     note: "3 vendors awaiting DPA renewal." },
  { key: "evidence",      label: "Compliance Evidence",score: 64, status: "warn", owner: "Compliance",     note: "Evidence vault 64% complete for SOC 2 Type II." },
];

export interface ComplianceControl {
  id: string; code: string; name: string; tsc: TscCategory;
  status: ControlStatus; owner: string; evidence: number; required: number;
  last_tested: string | null;
}

export const CONTROLS: ComplianceControl[] = [
  { id: "c1",  code: "CC6.1", name: "Logical access controls",     tsc: "security",            status: "operating",         owner: "Platform admin", evidence: 4, required: 4, last_tested: "2026-04-12" },
  { id: "c2",  code: "CC6.2", name: "User access provisioning",    tsc: "security",            status: "implemented",       owner: "Company admin",  evidence: 2, required: 3, last_tested: "2026-04-02" },
  { id: "c3",  code: "CC6.3", name: "MFA enforcement",             tsc: "security",            status: "operating",         owner: "Platform admin", evidence: 3, required: 3, last_tested: "2026-05-01" },
  { id: "c4",  code: "CC7.2", name: "Vulnerability management",    tsc: "security",            status: "needs_remediation", owner: "SRE",            evidence: 1, required: 3, last_tested: "2026-03-20" },
  { id: "c5",  code: "CC8.1", name: "Change management",           tsc: "security",            status: "implemented",       owner: "Engineering",    evidence: 2, required: 3, last_tested: "2026-04-18" },
  { id: "a1",  code: "A1.2",  name: "Backup & restore",            tsc: "availability",        status: "operating",         owner: "SRE",            evidence: 3, required: 3, last_tested: "2026-05-05" },
  { id: "a2",  code: "A1.3",  name: "Disaster recovery",           tsc: "availability",        status: "designed",          owner: "SRE",            evidence: 1, required: 3, last_tested: null },
  { id: "pi1", code: "PI1.1", name: "Webhook delivery integrity",  tsc: "processing_integrity",status: "operating",         owner: "Integrations",   evidence: 3, required: 3, last_tested: "2026-05-10" },
  { id: "pi2", code: "PI1.2", name: "EDI ack reconciliation",      tsc: "processing_integrity",status: "implemented",       owner: "Integrations",   evidence: 2, required: 3, last_tested: "2026-04-22" },
  { id: "co1", code: "C1.1",  name: "Document access control",     tsc: "confidentiality",     status: "operating",         owner: "Privacy",        evidence: 3, required: 3, last_tested: "2026-05-08" },
  { id: "pr1", code: "P3.1",  name: "Driver consent management",   tsc: "privacy",             status: "operating",         owner: "Privacy",        evidence: 4, required: 4, last_tested: "2026-05-12" },
  { id: "pr2", code: "P4.1",  name: "Data deletion workflow",      tsc: "privacy",             status: "designed",          owner: "Privacy",        evidence: 1, required: 3, last_tested: null },
];

export interface SecurityFinding {
  id: string; severity: Severity; title: string; category: string;
  status: "open" | "triaged" | "in_progress" | "resolved" | "accepted_risk";
  owner: string; due: string | null;
}

export const FINDINGS: SecurityFinding[] = [
  { id: "f1", severity: "high",     title: "RLS gap on documents list across companies", category: "Tenant Isolation", status: "in_progress", owner: "platform",   due: "2026-05-25" },
  { id: "f2", severity: "medium",   title: "API key without expiration (legacy partner)", category: "API Security",    status: "triaged",     owner: "integrations", due: "2026-06-01" },
  { id: "f3", severity: "low",      title: "Crash log includes truncated email",          category: "Mobile Security", status: "open",        owner: "mobile",     due: "2026-06-10" },
  { id: "f4", severity: "critical", title: "Webhook secret older than rotation policy",   category: "API Security",    status: "resolved",    owner: "integrations", due: null },
  { id: "f5", severity: "info",     title: "CSP header in report-only mode",              category: "Web Security",    status: "open",        owner: "platform",   due: "2026-06-20" },
];

export interface PolicyDoc {
  id: string; title: string; version: string; effective: string; owner: string; acks: number; total: number;
}
export const POLICIES: PolicyDoc[] = [
  { id: "p1",  title: "Information Security Policy",       version: "2.1", effective: "2026-01-15", owner: "CISO",     acks: 38, total: 42 },
  { id: "p2",  title: "Access Control Policy",             version: "1.4", effective: "2026-03-01", owner: "Platform", acks: 40, total: 42 },
  { id: "p3",  title: "Acceptable Use Policy",             version: "1.2", effective: "2026-02-10", owner: "HR",       acks: 42, total: 42 },
  { id: "p4",  title: "Incident Response Policy",          version: "1.3", effective: "2026-04-01", owner: "SRE",      acks: 30, total: 42 },
  { id: "p5",  title: "Change Management Policy",          version: "1.1", effective: "2026-02-20", owner: "Eng",      acks: 35, total: 42 },
  { id: "p6",  title: "Vendor Risk Management Policy",     version: "1.0", effective: "2026-01-20", owner: "Compliance", acks: 28, total: 42 },
  { id: "p7",  title: "Data Retention Policy",             version: "1.2", effective: "2026-03-15", owner: "Privacy",  acks: 36, total: 42 },
  { id: "p8",  title: "Backup & Recovery Policy",          version: "1.1", effective: "2026-02-25", owner: "SRE",      acks: 32, total: 42 },
  { id: "p9",  title: "Disaster Recovery Policy",          version: "1.0", effective: "2026-04-05", owner: "SRE",      acks: 25, total: 42 },
  { id: "p10", title: "Business Continuity Policy",        version: "1.0", effective: "2026-04-05", owner: "Ops",      acks: 24, total: 42 },
  { id: "p11", title: "Secure Development Policy",         version: "1.3", effective: "2026-03-10", owner: "Eng",      acks: 41, total: 42 },
  { id: "p12", title: "Vulnerability Management Policy",   version: "1.1", effective: "2026-03-22", owner: "SRE",      acks: 33, total: 42 },
  { id: "p13", title: "Privacy Policy",                    version: "2.0", effective: "2026-01-01", owner: "Legal",    acks: 42, total: 42 },
  { id: "p14", title: "Driver Location Tracking Policy",   version: "1.2", effective: "2026-02-01", owner: "Privacy",  acks: 18, total: 22 },
  { id: "p15", title: "AI Usage Policy",                   version: "1.0", effective: "2026-04-20", owner: "CTO",      acks: 30, total: 42 },
  { id: "p16", title: "Mobile Device Security Policy",     version: "1.1", effective: "2026-03-05", owner: "IT",       acks: 39, total: 42 },
];

export interface EvidenceItem {
  id: string; control: string; title: string; type: string; status: "pending" | "approved" | "rejected";
  uploaded_by: string; uploaded_at: string;
}
export const EVIDENCE: EvidenceItem[] = [
  { id: "e1", control: "CC6.1", title: "Quarterly access review Q1 2026",    type: "CSV export",      status: "approved", uploaded_by: "C. Ortega", uploaded_at: "2026-04-12" },
  { id: "e2", control: "CC6.3", title: "MFA enrollment report",              type: "Screenshot",      status: "approved", uploaded_by: "Platform",  uploaded_at: "2026-05-01" },
  { id: "e3", control: "CC7.2", title: "April dependency scan output",       type: "PDF",             status: "pending",  uploaded_by: "SRE bot",   uploaded_at: "2026-05-14" },
  { id: "e4", control: "A1.2",  title: "Restore drill 2026-05-05",           type: "Test result",     status: "approved", uploaded_by: "SRE",       uploaded_at: "2026-05-05" },
  { id: "e5", control: "PI1.1", title: "Webhook delivery SLO report (May)",  type: "Audit export",    status: "pending",  uploaded_by: "Integrations", uploaded_at: "2026-05-15" },
  { id: "e6", control: "C1.1",  title: "Document signed-URL audit",          type: "CSV export",      status: "approved", uploaded_by: "Privacy",   uploaded_at: "2026-05-08" },
];

export interface ChangeRequest {
  id: string; title: string; risk: "low" | "medium" | "high"; status: string; owner: string; eta: string;
}
export const CHANGES: ChangeRequest[] = [
  { id: "ch-204", title: "Add CSP header (enforce mode)",                risk: "medium", status: "review",    owner: "platform", eta: "2026-05-22" },
  { id: "ch-205", title: "Rotate Stripe webhook signing secret",         risk: "low",    status: "approved",  owner: "billing",  eta: "2026-05-20" },
  { id: "ch-206", title: "Index optimization on driver_locations",       risk: "medium", status: "scheduled", owner: "SRE",      eta: "2026-05-21" },
  { id: "ch-207", title: "RLS hardening: documents cross-company",       risk: "high",   status: "draft",     owner: "platform", eta: "2026-05-25" },
  { id: "ch-208", title: "Force-update minimum mobile version 4.2",      risk: "low",    status: "deployed",  owner: "mobile",   eta: "2026-05-18" },
];

export interface Incident {
  id: string; severity: "sev1" | "sev2" | "sev3" | "sev4"; title: string; type: string;
  status: string; detected: string; resolved: string | null; owner: string;
}
export const INCIDENTS: Incident[] = [
  { id: "INC-204", severity: "sev2", title: "Mapbox tile latency spike",        type: "Provider outage",   status: "resolved",   detected: "2026-05-12 14:02", resolved: "2026-05-12 14:48", owner: "on-call" },
  { id: "INC-205", severity: "sev3", title: "Notification delivery lag (FCM)",  type: "Notification",      status: "monitoring", detected: "2026-05-14 09:11", resolved: null, owner: "platform" },
  { id: "INC-206", severity: "sev1", title: "GPS event ingestion stalled (sim)",type: "GPS outage",        status: "investigating", detected: "2026-05-19 10:21", resolved: null, owner: "on-call" },
];

export interface Vendor {
  id: string; name: string; category: string; data: string; risk: "low" | "medium" | "high" | "critical";
  dpa: "signed" | "pending" | "n/a"; last_reviewed: string;
}
export const VENDORS: Vendor[] = [
  { id: "v1",  name: "Supabase",          category: "Database / Auth / Storage", data: "PII, ops data", risk: "medium",   dpa: "signed",  last_reviewed: "2026-03-15" },
  { id: "v2",  name: "Stripe",            category: "Billing",                   data: "Payment, billing PII", risk: "medium", dpa: "signed",  last_reviewed: "2026-02-20" },
  { id: "v3",  name: "Mapbox",            category: "Maps / Routing",            data: "Location",       risk: "medium",   dpa: "signed",  last_reviewed: "2026-01-30" },
  { id: "v4",  name: "Google Maps",       category: "Maps / Geocoding",          data: "Location",       risk: "medium",   dpa: "pending", last_reviewed: "2026-01-12" },
  { id: "v5",  name: "HERE",              category: "Truck routing",             data: "Location",       risk: "low",      dpa: "signed",  last_reviewed: "2026-02-08" },
  { id: "v6",  name: "Trimble",           category: "Truck routing",             data: "Location, vehicle", risk: "medium", dpa: "pending", last_reviewed: "2026-02-15" },
  { id: "v7",  name: "OpenAI (via Lovable)", category: "AI",                     data: "Transcripts (opt-in)", risk: "high", dpa: "signed", last_reviewed: "2026-04-01" },
  { id: "v8",  name: "Twilio",            category: "SMS / Voice",               data: "Phone, message", risk: "medium",   dpa: "signed",  last_reviewed: "2026-03-01" },
  { id: "v9",  name: "SendGrid",          category: "Email",                     data: "Email, content", risk: "low",      dpa: "signed",  last_reviewed: "2026-03-10" },
  { id: "v10", name: "EDI VAN (TBD)",     category: "EDI",                       data: "Shipment, partner ID", risk: "medium", dpa: "pending", last_reviewed: "2026-04-20" },
  { id: "v11", name: "Cloudflare",        category: "Hosting / CDN",             data: "Request logs",   risk: "low",      dpa: "signed",  last_reviewed: "2026-03-25" },
  { id: "v12", name: "Sentry",            category: "Crash reporting",           data: "Stack traces (scrubbed)", risk: "low", dpa: "signed", last_reviewed: "2026-04-08" },
];

export interface Vulnerability {
  id: string; severity: Severity; component: string; cve: string | null; status: string; due: string;
}
export const VULNS: Vulnerability[] = [
  { id: "vu1", severity: "high",    component: "node-fetch@2.6.7",       cve: "CVE-2024-21490", status: "in_progress", due: "2026-05-25" },
  { id: "vu2", severity: "medium",  component: "lodash@4.17.20",          cve: "CVE-2021-23337", status: "open",        due: "2026-06-01" },
  { id: "vu3", severity: "low",     component: "Mobile cert pinning gap", cve: null,             status: "open",        due: "2026-06-30" },
  { id: "vu4", severity: "critical",component: "image-converter-lib@1.0", cve: "CVE-2025-00001", status: "resolved",    due: "2026-05-10" },
];

export interface BackupRecord {
  id: string; target: string; status: "ok" | "warn" | "fail"; size_gb: number; ts: string;
}
export const BACKUPS: BackupRecord[] = [
  { id: "b1", target: "Database (PITR)",         status: "ok",   size_gb: 184.2, ts: "2026-05-19 02:00" },
  { id: "b2", target: "Storage: proof-of-delivery", status: "ok", size_gb: 412.7, ts: "2026-05-19 02:15" },
  { id: "b3", target: "Storage: evidence (proposed)", status: "warn", size_gb: 0,  ts: "—" },
];

export interface RetentionRule {
  id: string; data_type: string; days: number; action: "delete" | "anonymize" | "aggregate"; enabled: boolean;
}
export const RETENTION: RetentionRule[] = [
  { id: "r1", data_type: "Raw GPS location events",  days: 30,  action: "aggregate", enabled: true },
  { id: "r2", data_type: "Navigation events",        days: 365, action: "delete",    enabled: true },
  { id: "r3", data_type: "Voice transcripts (opt-in)", days: 90, action: "delete",   enabled: true },
  { id: "r4", data_type: "CoPilot messages",         days: 180, action: "anonymize", enabled: true },
  { id: "r5", data_type: "API request logs",         days: 90,  action: "delete",    enabled: true },
  { id: "r6", data_type: "Webhook delivery logs",    days: 90,  action: "delete",    enabled: true },
  { id: "r7", data_type: "EDI transactions",         days: 2555, action: "delete",   enabled: true }, // 7y
  { id: "r8", data_type: "Notification logs",        days: 60,  action: "delete",    enabled: true },
  { id: "r9", data_type: "Audit logs",               days: 2555, action: "delete",   enabled: true }, // 7y
  { id: "r10",data_type: "Documents (POD/BOL)",      days: 2555, action: "delete",   enabled: true },
  { id: "r11",data_type: "Billing records",          days: 2555, action: "delete",   enabled: true },
];

export interface TestRow {
  id: string; suite: string; name: string; status: "passed" | "failed" | "skipped" | "flaky"; duration_ms: number;
}
export const TESTS: TestRow[] = [
  { id: "t1", suite: "Tenant Isolation", name: "Customer portal blocks cross-customer documents", status: "passed", duration_ms: 412 },
  { id: "t2", suite: "Tenant Isolation", name: "Dispatcher cannot read other company drivers",     status: "passed", duration_ms: 380 },
  { id: "t3", suite: "Tenant Isolation", name: "Documents.list filters by company_id",              status: "failed", duration_ms: 521 },
  { id: "t4", suite: "RBAC",             name: "Billing admin cannot reach security center",        status: "passed", duration_ms: 198 },
  { id: "t5", suite: "API",              name: "API key cannot exceed declared scopes",             status: "passed", duration_ms: 245 },
  { id: "t6", suite: "Webhook",          name: "Failed webhook retries with exponential backoff",   status: "passed", duration_ms: 1102 },
  { id: "t7", suite: "EDI",              name: "204 inbound creates shipment request",              status: "passed", duration_ms: 814 },
  { id: "t8", suite: "Realtime",         name: "Dispatcher sees driver GPS within 3s",              status: "flaky",  duration_ms: 3120 },
  { id: "t9", suite: "Mobile",           name: "Offline POD submission syncs on reconnect",         status: "passed", duration_ms: 2410 },
  { id: "t10",suite: "CoPilot",          name: "ETA intent parsing accuracy ≥ 95%",                 status: "passed", duration_ms: 198 },
];

export interface DeploymentRow {
  id: string; surface: string; env: string; version: string; status: "running" | "ok" | "fail" | "pending"; ts: string;
}
export const DEPLOYMENTS: DeploymentRow[] = [
  { id: "d1", surface: "Dispatcher web",  env: "production", version: "v7.4.2", status: "ok",      ts: "2026-05-19 09:14" },
  { id: "d2", surface: "Customer portal", env: "production", version: "v7.4.2", status: "ok",      ts: "2026-05-19 09:14" },
  { id: "d3", surface: "Driver mobile",   env: "production", version: "4.2.0",  status: "ok",      ts: "2026-05-18 17:02" },
  { id: "d4", surface: "Edge functions",  env: "production", version: "—",      status: "ok",      ts: "2026-05-19 09:14" },
  { id: "d5", surface: "Dispatcher web",  env: "staging",    version: "v7.5.0-rc.1", status: "running", ts: "2026-05-19 14:20" },
];

export interface ObservabilityMetric {
  key: string; label: string; value: string; trend: "up" | "down" | "flat"; status: "ok" | "warn" | "fail";
}
export const METRICS: ObservabilityMetric[] = [
  { key: "uptime",       label: "API uptime (30d)",         value: "99.97%", trend: "flat", status: "ok"   },
  { key: "p95",          label: "API p95 latency",          value: "212 ms", trend: "down", status: "ok"   },
  { key: "err",          label: "Error rate (1h)",          value: "0.12%",  trend: "flat", status: "ok"   },
  { key: "rt",           label: "Realtime push p95",        value: "1.4 s",  trend: "up",   status: "warn" },
  { key: "gps",          label: "GPS events / min",         value: "12,481", trend: "up",   status: "ok"   },
  { key: "stale",        label: "GPS stale rate",           value: "1.8%",   trend: "flat", status: "ok"   },
  { key: "push",         label: "Push delivery rate",       value: "97.4%",  trend: "down", status: "warn" },
  { key: "webhook",      label: "Webhook failure rate",     value: "0.4%",   trend: "flat", status: "ok"   },
  { key: "edi",          label: "EDI failure rate",         value: "0.9%",   trend: "down", status: "ok"   },
  { key: "ai_lat",       label: "AI provider p95",          value: "1.9 s",  trend: "flat", status: "ok"   },
  { key: "ai_cost",      label: "AI cost (24h)",            value: "$42.18", trend: "up",   status: "ok"   },
  { key: "crash",        label: "Mobile crash-free users",  value: "99.6%",  trend: "flat", status: "ok"   },
];

/** Compliance readiness composite score (0-100). */
export function readinessScore(): number {
  const total = CONTROLS.length;
  const weight: Record<ControlStatus, number> = {
    not_started: 0, designed: 0.2, implemented: 0.5,
    operating: 0.9, needs_remediation: 0.4, ready_for_audit: 1,
  };
  const sum = CONTROLS.reduce((acc, c) => acc + weight[c.status], 0);
  return Math.round((sum / total) * 100);
}
