// Phase 50 — V18.5 enterprise control assurance (mock-only).
// No autonomous dispatch. Every high-impact action HITL-gated with
// approver_id <> recommender_id enforced at the RLS layer.

type KPI = { label: string; value: string | number; sub?: string };
const k = (label: string, value: string | number, sub?: string): KPI => ({ label, value, sub });

export const V185_SCOPE = {
  score: { overall: 97 },
  matrix: [
    { area: "Enterprise Control Assurance Command Center", status: "shipped", notes: "97% assurance" },
    { area: "Autonomous-Assist Operating Resilience",      status: "shipped", notes: "93% resilience" },
    { area: "Board Intelligence Assurance",                status: "shipped", notes: "92% assurance" },
    { area: "Revenue Automation Control Maturity",         status: "shipped", notes: "Renewal/expansion mature" },
    { area: "Marketplace Control Optimization",            status: "shipped", notes: "Southeast density flagged" },
    { area: "Executive Governance Assurance",              status: "shipped", notes: "5 high-risk visible" },
    { area: "Automation Resilience Controls",              status: "shipped", notes: "14 control domains" },
    { area: "Human Approval Assurance",                    status: "shipped", notes: "96% coverage" },
    { area: "Recommendation Control Assurance",            status: "shipped", notes: "Quality 91%" },
    { area: "Outcome Learning Assurance",                  status: "shipped", notes: "Loop 90%" },
    { area: "Evidence Assurance",                          status: "shipped", notes: "15 domains" },
    { area: "Predictive Risk Control Assurance",           status: "shipped", notes: "15 categories" },
    { area: "Capital Control Assurance",                   status: "shipped", notes: "Refresh pending" },
    { area: "Strategic Account Control Assurance",         status: "shipped", notes: "1 concentration exception" },
    { area: "Partner Control Assurance",                   status: "shipped", notes: "Partner-facing approved-only" },
    { area: "Product-Line Control Assurance",              status: "shipped", notes: "12 product lines" },
    { area: "Category Control Assurance",                  status: "shipped", notes: "Proof pending" },
    { area: "Autonomous-Assist Resilience Audit",          status: "shipped", notes: "Audit 95%" },
    { area: "Board Assurance Reporting",                   status: "shipped", notes: "16 sections" },
    { area: "Long-Term Control Assurance Roadmap",         status: "shipped", notes: "6 horizons" },
    { area: "V18.5 Reports",                               status: "shipped", notes: "20 reports" },
    { area: "Fully autonomous dispatch",                   status: "placeholder", notes: "Deferred — HITL required" },
    { area: "IPO / SOC 2 / Android Auto claims",           status: "placeholder", notes: "Evidence-backed only" },
  ],
  deferred: [
    "Fully autonomous dispatch / pricing / billing / marketplace / capital / board",
    "IPO / acquisition / audited financial / SOC 2 / ISO claims without evidence",
    "Android Auto / CarPlay / autonomous vehicle / customs / insurance underwriting",
  ],
};

export const V185_HEADLINE = {
  headline: "V18.5 enterprise control assurance live · 97% · resilience 93% · HITL on every high-impact",
  highlights: [
    "Human approval assurance 96% · Recommendation control assurance 91% · Evidence 91% · Audit 95%",
    "Board intelligence assurance 92% · 2 board-use evidence approvals pending",
    "Southeast carrier density risk still flagged · preferred-carrier optimization routed to MP leader",
    "Customer concentration mitigation, capital evidence refresh, proof publishing routed for approval",
    "One evidence-automation workflow failed → retry queue · manual fallback available · no high-impact auto-executed",
  ],
};

// ─── Standard control center shape ─────────────────────────────────────────
type Area = {
  score: string;
  kpis: KPI[];
  matrix: { control: string; status: string; owner: string }[];
  exceptions: { id: string; control: string; desc: string; owner: string }[];
  remediation: { id: string; action: string; owner: string; due: string; status: string }[];
};

const area = (
  score: string,
  kpis: KPI[],
  matrix: Area["matrix"],
  exceptions: Area["exceptions"] = [],
  remediation: Area["remediation"] = [],
): Area => ({ score, kpis, matrix, exceptions, remediation });

// ─── 2. Enterprise Control Assurance Command Center ───────────────────────
export const V185_ASSURANCE = {
  score: "97%",
  kpis: [
    k("Enterprise control assurance", "97%", "+2 (6w)"),
    k("Autonomous-assist resilience", "93%"),
    k("Board intelligence assurance", "92%"),
    k("Revenue control maturity", "94%"),
    k("MP control optimization", "89%"),
    k("Exec governance assurance", "95%"),
    k("Human approval assurance", "96%"),
    k("Policy enforcement assurance", "98%"),
    k("Evidence assurance", "91%"),
    k("Audit completeness", "95%"),
    k("Outcome learning assurance", "90%"),
    k("Control exception rate", "3.1%"),
    k("Remediation health", "92%"),
    k("Predictive risk control", "91%"),
    k("Tenant isolation assurance", "100%"),
    k("High-impact protection", "100%", "HITL enforced"),
  ],
  health_map: [
    { domain: "Revenue maturity",       health: "strong" },
    { domain: "MP optimization",        health: "watch · SE density" },
    { domain: "Board intelligence",     health: "strong" },
    { domain: "Capital controls",       health: "evidence refresh pending" },
    { domain: "Account controls",       health: "1 concentration exception" },
    { domain: "Partner controls",       health: "strong" },
    { domain: "Product controls",       health: "strong" },
    { domain: "Category controls",      health: "proof publishing pending" },
    { domain: "Risk control",           health: "strong" },
    { domain: "Resilience",             health: "1 evidence workflow in retry" },
  ],
  exceptions: [
    { id: "EX-9001", area: "MP optimization",   desc: "Southeast carrier density below target",            owner: "VP MP" },
    { id: "EX-9002", area: "Capital evidence",  desc: "Investor packet section 4 evidence stale",          owner: "CFO" },
    { id: "EX-9003", area: "Account control",   desc: "Customer concentration in food vertical",           owner: "CRO" },
    { id: "EX-9004", area: "Category proof",    desc: "Proof asset 12 awaiting external-use approval",     owner: "CMO" },
    { id: "EX-9005", area: "Resilience",        desc: "evidence-attach worker failed at 02:14 UTC (retry)",owner: "Sec/Admin" },
  ],
  remediation: [
    { id: "RM-9001", action: "Activate SE preferred-carrier optimization (HITL)", owner: "VP MP", due: "+7d",  status: "pending approval" },
    { id: "RM-9002", action: "Refresh investor packet § 4 evidence",              owner: "CFO",   due: "+5d",  status: "in progress" },
    { id: "RM-9003", action: "Open food-vertical concentration mitigation plan",  owner: "CRO",   due: "+10d", status: "in progress" },
    { id: "RM-9004", action: "Route proof asset 12 for external-use approval",    owner: "CMO",   due: "+3d",  status: "queued" },
    { id: "RM-9005", action: "Replay evidence-attach worker after fix",           owner: "Sec",   due: "+1d",  status: "scheduled" },
  ],
  action_plan: [
    { item: "Approve preferred-carrier SE expansion", owner: "VP MP", due: "+7d" },
    { item: "Approve investor packet evidence refresh", owner: "CFO", due: "+5d" },
    { item: "Approve concentration mitigation plan", owner: "CRO", due: "+10d" },
    { item: "Approve proof publishing", owner: "CEO", due: "+3d" },
    { item: "Sign off resilience post-mortem", owner: "Sec/Admin", due: "+2d" },
  ],
  exec_summary: [
    "Assurance 97% · Resilience 93% · Approval 96% · Evidence 91% · Audit 95%",
    "5 high-risk items in executive visibility · all HITL-gated",
    "No high-impact action executed automatically in last 30d",
  ],
};

// ─── 3. Autonomous-Assist Operating Resilience Center ─────────────────────
export const V185_RESILIENCE = {
  score: "93%",
  kpis: [
    k("Operating resilience", "93%"),
    k("Recommendation workflow uptime", "99.7%"),
    k("Approval workflow uptime", "99.9%"),
    k("Evidence automation resilience", "97%"),
    k("Audit logging resilience", "100%"),
    k("Policy enforcement resilience", "99%"),
    k("Human override readiness", "ready"),
    k("Fallback workflow status", "available"),
    k("Manual fallback status", "documented"),
    k("Retry queue depth", 4),
    k("Exception recovery", "92%"),
  ],
  health_map: [
    { domain: "Recommendation workflows", health: "healthy" },
    { domain: "Approval workflows",        health: "healthy" },
    { domain: "Evidence automation",       health: "degraded · 1 worker retry" },
    { domain: "Audit logging",             health: "healthy" },
    { domain: "Policy enforcement",        health: "healthy" },
    { domain: "Notifications",             health: "healthy" },
  ],
  failure_queue: [
    { id: "WF-2207", workflow: "evidence-attach-worker", failed_at: "02:14 UTC", reason: "downstream 503", retry: "scheduled" },
    { id: "WF-2208", workflow: "outcome-loop-aggregator", failed_at: "05:01 UTC", reason: "timeout",        retry: "succeeded on 2nd" },
  ],
  fallback: [
    { workflow: "evidence-attach",  manual: "ops team attaches via console", owner: "Sec/Admin" },
    { workflow: "outcome-loop",     manual: "nightly batch fallback",        owner: "Chief AI"  },
    { workflow: "policy-sweep",     manual: "weekly checklist",              owner: "CCO"       },
  ],
  retry_queue: [
    { id: "RT-001", workflow: "evidence-attach-worker", attempts: 2, next_at: "+15m" },
    { id: "RT-002", workflow: "audit-log-flush",         attempts: 1, next_at: "+5m"  },
    { id: "RT-003", workflow: "approval-router",         attempts: 1, next_at: "+10m" },
    { id: "RT-004", workflow: "rec-quality-scorer",      attempts: 1, next_at: "+30m" },
  ],
  incidents: [
    { id: "INC-PLC-01", severity: "low", title: "Placeholder incident slot — no production incidents tracked yet" },
  ],
  action_plan: [
    { item: "Patch evidence-attach 503 handler", owner: "Eng/Sec", due: "+2d" },
    { item: "Run resilience tabletop drill",     owner: "CCO",     due: "+14d" },
    { item: "Document manual fallback runbook v2", owner: "Sec/Admin", due: "+7d" },
  ],
};

// ─── 4. Board Intelligence Assurance Center ───────────────────────────────
export const V185_BOARD_ASSURANCE = {
  score: "92%",
  kpis: [
    k("Board intelligence assurance", "92%"),
    k("Packet evidence assurance", "93%"),
    k("KPI assurance", "94%"),
    k("Decision evidence assurance", "91%"),
    k("Risk review assurance", "92%"),
    k("Explainability assurance", "95%"),
    k("Approval assurance", "97%"),
    k("Action follow-up assurance", "89%"),
    k("Audit trail assurance", "100%"),
    k("Evidence freshness", "93%"),
    k("Board exceptions", 2),
    k("Board-use approval status", "2 pending"),
  ],
  packet: [
    { section: "Strategy",      assurance: "97%", owner: "CEO",         status: "ready" },
    { section: "Financials",    assurance: "94%", owner: "CFO",         status: "ready" },
    { section: "Operations",    assurance: "92%", owner: "COO",         status: "ready" },
    { section: "Revenue",       assurance: "94%", owner: "CRO",         status: "ready" },
    { section: "Marketplace",   assurance: "89%", owner: "VP MP",       status: "watch" },
    { section: "Capital",       assurance: "90%", owner: "CFO",         status: "pending evidence" },
    { section: "Risk",          assurance: "92%", owner: "CCO",         status: "ready" },
    { section: "AI Governance", assurance: "95%", owner: "Chief AI",    status: "ready" },
  ],
  decision_evidence: [
    { decision: "Approve SE optimization", evidence: "fresh 93%", owner: "VP MP" },
    { decision: "Approve capital evidence refresh", evidence: "pending", owner: "CFO" },
    { decision: "Approve proof publishing", evidence: "fresh", owner: "CMO" },
  ],
  audit_trail: [
    { id: "BAT-001", event: "Board decision logged",     ts: "T-3d", complete: "yes" },
    { id: "BAT-002", event: "Evidence attached",         ts: "T-2d", complete: "yes" },
    { id: "BAT-003", event: "Action follow-up assigned", ts: "T-1d", complete: "yes" },
  ],
  exceptions: [
    { id: "BEX-01", control: "Board-use evidence approval", desc: "2 items pending", owner: "Board Admin" },
    { id: "BEX-02", control: "Action follow-up",            desc: "1 item 5d overdue", owner: "Board Admin" },
  ],
  action_plan: [
    { item: "Approve 2 board-use evidence items", owner: "CEO",         due: "+3d" },
    { item: "Close overdue action follow-up",     owner: "Board Admin", due: "+2d" },
  ],
};

// ─── 5. Revenue Automation Control Maturity Center ────────────────────────
export const V185_REVENUE = area("94%",
  [
    k("Revenue control maturity", "94%"),
    k("Renewal", "95%"), k("Expansion", "93%"), k("Churn prevention", "92%"),
    k("Customer concentration", "watch"), k("Product concentration", "92%"),
    k("Payment health", "96%"), k("Billing dispute", "94%"),
    k("MP revenue", "91%"), k("API/EDI revenue", "93%"),
    k("Partner revenue", "92%"), k("Evidence assurance", "93%"),
    k("Approval assurance", "97%"), k("Audit", "95%"),
    k("Exception rate", "2.4%"), k("Remediation health", "94%"),
  ],
  [
    { control: "Renewal control",                status: "mature",  owner: "CRO" },
    { control: "Expansion control",              status: "mature",  owner: "CRO" },
    { control: "Churn prevention",               status: "mature",  owner: "CRO" },
    { control: "Customer concentration",         status: "watch",   owner: "CRO" },
    { control: "Product concentration",          status: "mature",  owner: "VP Product" },
    { control: "Payment health",                 status: "mature",  owner: "CFO" },
    { control: "Billing dispute",                status: "mature",  owner: "CFO" },
    { control: "MP revenue",                     status: "mature",  owner: "VP MP" },
    { control: "API/EDI revenue",                status: "mature",  owner: "VP Product" },
    { control: "Partner revenue",                status: "mature",  owner: "VP Partners" },
  ],
  [
    { id: "REX-01", control: "Customer concentration", desc: "Food vertical share above policy band", owner: "CRO" },
  ],
  [
    { id: "RRM-01", action: "Open concentration mitigation plan", owner: "CRO", due: "+10d", status: "in progress" },
    { id: "RRM-02", action: "Refresh 2 stale revenue evidence",   owner: "RevOps", due: "+5d", status: "queued" },
  ],
);

// ─── 6. Marketplace Control Optimization Center ───────────────────────────
export const V185_MP = area("89%",
  [
    k("MP control optimization", "89%"),
    k("Carrier density", "watch · SE"), k("Equipment coverage", "92%"),
    k("Load coverage", "91%"), k("Bid density", "88%"),
    k("Time-to-award", "P50 14m"), k("Regional liquidity", "88%"),
    k("Lane liquidity", "87%"), k("Carrier quality", "94%"),
    k("Carrier compliance", "95%"), k("Dispute control", "94%"),
    k("MP revenue control", "91%"), k("Preferred carrier", "pending approval"),
    k("Human approval health", "93%"), k("Exception rate", "4.2%"),
    k("Remediation health", "90%"),
  ],
  [
    { control: "Carrier density · Texas",     status: "healthy", owner: "VP MP" },
    { control: "Carrier density · Midwest",   status: "healthy", owner: "VP MP" },
    { control: "Carrier density · Southeast", status: "watch",   owner: "VP MP" },
    { control: "Load coverage",                status: "healthy", owner: "VP MP" },
    { control: "Bid density",                  status: "healthy", owner: "VP MP" },
    { control: "Time-to-award",                status: "healthy", owner: "VP MP" },
    { control: "Lane liquidity",               status: "healthy", owner: "VP MP" },
    { control: "Carrier compliance",           status: "healthy", owner: "VP MP" },
    { control: "Dispute control",              status: "healthy", owner: "VP MP" },
    { control: "Preferred carrier expansion",  status: "pending approval", owner: "VP MP" },
  ],
  [
    { id: "MEX-01", control: "Carrier density · Southeast", desc: "Density 12% below target", owner: "VP MP" },
  ],
  [
    { id: "MRM-01", action: "Approve SE preferred-carrier optimization", owner: "VP MP", due: "+7d", status: "pending approval" },
  ],
);

// ─── 7. Executive Governance Assurance Center ─────────────────────────────
export const V185_EXEC = {
  score: "95%",
  kpis: [
    k("Exec governance assurance", "95%"),
    k("High-risk visibility", "100%"),
    k("Overdue approval visibility", "100%"),
    k("Escalation visibility", "100%"),
    k("Control exception visibility", "100%"),
    k("Board decision visibility", "100%"),
    k("Outcome visibility", "94%"),
  ],
  queues: [
    { role: "CEO",         pending: 3, high_risk: 2, backup: "COO" },
    { role: "CFO",         pending: 6, high_risk: 3, backup: "VP Finance" },
    { role: "COO",         pending: 5, high_risk: 1, backup: "CEO" },
    { role: "CRO",         pending: 8, high_risk: 2, backup: "VP Sales" },
    { role: "VP MP",       pending: 7, high_risk: 2, backup: "COO" },
    { role: "VP Product",  pending: 5, high_risk: 1, backup: "Chief AI" },
    { role: "VP CS",       pending: 4, high_risk: 1, backup: "CRO" },
    { role: "VP Partners", pending: 4, high_risk: 1, backup: "CRO" },
    { role: "Sec/Trust",   pending: 3, high_risk: 1, backup: "CCO" },
  ],
  high_risk: [
    { item: "Southeast marketplace optimization", owner: "VP MP" },
    { item: "Customer concentration remediation", owner: "CRO" },
    { item: "Capital evidence approval",          owner: "CFO" },
    { item: "Board evidence approval",            owner: "CEO" },
    { item: "Category proof publishing",          owner: "CMO" },
  ],
  escalations: [
    { id: "ESC-01", item: "Capital evidence overdue 2d", from: "CFO", to: "CEO" },
  ],
  outcomes: [
    { item: "Last SE optimization",  outcome: "+1.8pp density",   owner: "VP MP" },
    { item: "Last concentration mit", outcome: "share -3pp",       owner: "CRO" },
  ],
  brief: [
    "All 5 high-risk visible · all HITL · no auto-execution",
    "1 escalation active · 0 SLA breaches > 48h",
    "Outcome visibility 94% · learning loop closing within 1 cycle",
  ],
};

// ─── 8. Automation Resilience Controls Center ─────────────────────────────
export const V185_AUTO_RESILIENCE = area("94%",
  [
    k("Resilience control score", "94%"),
    k("Test coverage", "92%"), k("Last drill", "T-9d"),
    k("Open exceptions", 2), k("Avg remediation", "5d"),
  ],
  [
    { control: "Recommendation workflow resilience", status: "tested", owner: "Eng" },
    { control: "Approval workflow resilience",        status: "tested", owner: "Eng" },
    { control: "Evidence automation resilience",      status: "watch",  owner: "Eng" },
    { control: "Audit logging resilience",            status: "tested", owner: "Sec" },
    { control: "Policy enforcement resilience",       status: "tested", owner: "CCO" },
    { control: "Human override resilience",           status: "tested", owner: "CCO" },
    { control: "Notification resilience",             status: "tested", owner: "Eng" },
    { control: "Retry logic",                          status: "tested", owner: "Eng" },
    { control: "Manual fallback",                      status: "documented", owner: "Sec/Admin" },
    { control: "Exception recovery",                   status: "tested", owner: "Eng" },
    { control: "Tenant boundary",                      status: "tested", owner: "Sec" },
    { control: "Data freshness",                       status: "tested", owner: "Chief AI" },
    { control: "Model/provider fallback",              status: "placeholder", owner: "Chief AI" },
    { control: "Cost control resilience",              status: "tested", owner: "CFO" },
  ],
  [
    { id: "AEX-01", control: "Evidence automation",    desc: "Worker 503 spike", owner: "Eng" },
    { id: "AEX-02", control: "Model/provider fallback", desc: "Fallback path mocked only", owner: "Chief AI" },
  ],
  [
    { id: "ARM-01", action: "Patch evidence-attach 503", owner: "Eng", due: "+2d", status: "in progress" },
    { id: "ARM-02", action: "Document provider-fallback policy", owner: "Chief AI", due: "+14d", status: "queued" },
  ],
);
export const V185_AUTO_RESILIENCE_CALENDAR = [
  { drill: "Recommendation failover",  date: "T-9d",  result: "pass" },
  { drill: "Approval router failover", date: "T-21d", result: "pass" },
  { drill: "Evidence-attach failover", date: "T-2d",  result: "partial · retry path verified" },
  { drill: "Policy enforcement sweep", date: "T-7d",  result: "pass" },
];

// ─── 9. Human Approval Assurance ──────────────────────────────────────────
export const V185_HUMAN_APPROVAL = {
  score: "96%",
  kpis: [
    k("Approval assurance", "96%"),
    k("Approval coverage", "97%"), k("Approval SLA", "94%"),
    k("Backup coverage", "96%"), k("Escalation coverage", "98%"),
    k("High-risk approval coverage", "100%"),
    k("Approval evidence completeness", "94%"),
    k("Explanation completeness", "95%"),
    k("Decision reason completeness", "93%"),
    k("Approval audit completeness", "100%"),
    k("Rejection reason quality", "91%"),
    k("Outcome linkage", "89%"),
    k("Human override readiness", "ready"),
    k("Approval exceptions", 3),
  ],
  coverage: [
    { domain: "Revenue",      coverage: "97%", backup: "VP Sales" },
    { domain: "Marketplace",  coverage: "95%", backup: "COO" },
    { domain: "Capital",      coverage: "99%", backup: "VP Finance" },
    { domain: "Board",        coverage: "100%", backup: "CEO" },
    { domain: "Risk",         coverage: "96%", backup: "CCO" },
    { domain: "Accounts",     coverage: "94%", backup: "CRO" },
    { domain: "Partners",     coverage: "95%", backup: "CRO" },
    { domain: "Product",      coverage: "94%", backup: "Chief AI" },
    { domain: "Category",     coverage: "92%", backup: "CMO" },
  ],
};

// ─── 10. Recommendation Control Assurance ─────────────────────────────────
export const V185_REC = {
  score: "91%",
  kpis: [
    k("Rec control assurance", "91%"),
    k("Source signal assurance", "93%"),
    k("Evidence completeness", "92%"),
    k("Explainability", "95%"),
    k("Confidence scoring", "92%"),
    k("Risk scoring", "91%"),
    k("Alternative options", "88%"),
    k("No-action impact", "87%"),
    k("Duplicate detection", "96%"),
    k("Policy compliance", "98%"),
    k("Routing compliance", "97%"),
    k("Audit completeness", "100%"),
    k("Outcome tracking", "90%"),
    k("Exception rate", "3.7%"),
  ],
  exceptions: [
    { id: "RCX-01", domain: "Capital",   desc: "Alt-option missing on 2 recs", owner: "Chief AI" },
    { id: "RCX-02", domain: "Category",  desc: "No-action impact missing on 1 rec", owner: "Chief AI" },
  ],
};

// ─── 11. Outcome Learning Assurance ───────────────────────────────────────
export const V185_OUTCOME = {
  score: "90%",
  kpis: [
    k("Outcome learning assurance", "90%"),
    k("Approved-rec outcome coverage", "92%"),
    k("Rejected-rec outcome coverage", "85%"),
    k("Automation outcome coverage", "88%"),
    k("Revenue outcome", "92%"), k("MP outcome", "89%"),
    k("Capital outcome", "94%"), k("Account outcome", "89%"),
    k("Partner outcome", "88%"), k("Product outcome", "87%"),
    k("Category outcome", "85%"), k("Confidence calibration", "0.03 drift"),
    k("Policy tuning evidence", "complete"),
    k("Lessons learned", "32 entries"),
    k("Board visibility", "100%"),
  ],
};

// ─── 12. Evidence Assurance ───────────────────────────────────────────────
export const V185_EVIDENCE = {
  score: "91%",
  kpis: [
    k("Evidence assurance", "91%"),
    k("Freshness", "92%"), k("Owner coverage", "97%"),
    k("Approval status", "94%"), k("Completeness", "93%"),
    k("External-use status", "approval-gated"),
    k("Board-use status", "approval-gated"),
    k("Data-room status", "approval-gated"),
    k("Exceptions", 4), k("Remediation", "92%"),
    k("Audit", "100%"),
  ],
  matrix: [
    { domain: "Revenue",          fresh: "94%", owner: "RevOps",    status: "ok" },
    { domain: "Marketplace",      fresh: "90%", owner: "VP MP",     status: "ok" },
    { domain: "Capital",          fresh: "87%", owner: "CFO",       status: "refresh pending" },
    { domain: "Board",            fresh: "93%", owner: "Board Admin", status: "2 approvals pending" },
    { domain: "Account",          fresh: "92%", owner: "CRO",       status: "ok" },
    { domain: "Partner",          fresh: "94%", owner: "VP Partners", status: "ok" },
    { domain: "Product",          fresh: "91%", owner: "VP Product",  status: "ok" },
    { domain: "Category proof",   fresh: "88%", owner: "CMO",       status: "publishing approval pending" },
    { domain: "Risk mitigation",  fresh: "93%", owner: "CCO",       status: "ok" },
    { domain: "Recommendation",   fresh: "95%", owner: "Chief AI",  status: "ok" },
    { domain: "Approval",         fresh: "97%", owner: "CCO",       status: "ok" },
    { domain: "Outcome",          fresh: "90%", owner: "Chief AI",  status: "ok" },
    { domain: "Audit",            fresh: "99%", owner: "Sec",       status: "ok" },
    { domain: "External-use",     fresh: "approval-gated", owner: "CEO", status: "1 pending" },
    { domain: "Data-room",        fresh: "approval-gated", owner: "CFO", status: "1 pending" },
  ],
  exceptions: [
    { id: "EVX-01", domain: "Capital",  desc: "Investor packet § 4 stale", owner: "CFO" },
    { id: "EVX-02", domain: "Board",    desc: "2 board-use items pending", owner: "Board Admin" },
    { id: "EVX-03", domain: "Category", desc: "Proof publishing approval pending", owner: "CMO" },
    { id: "EVX-04", domain: "External", desc: "External-use approval pending", owner: "CEO" },
  ],
  action_plan: [
    { item: "Refresh capital § 4", owner: "CFO",         due: "+5d" },
    { item: "Approve board-use 2 items", owner: "CEO",   due: "+3d" },
    { item: "Approve proof publishing", owner: "CEO",    due: "+3d" },
  ],
};

// ─── 13. Predictive Risk Control Assurance ────────────────────────────────
export const V185_RISK = {
  score: "91%",
  kpis: [
    k("Risk control assurance", "91%"),
    k("Owner coverage", "97%"),
    k("Evidence completeness", "92%"),
    k("Escalation assurance", "94%"),
    k("Mitigation assurance", "91%"),
    k("Recurrence tracking", "yes"),
    k("Approval routing", "100%"),
    k("Board visibility", "100%"),
    k("Outcome tracking", "89%"),
    k("Exceptions", 2),
  ],
  matrix: [
    { category: "Revenue durability",          owner: "CRO",        evidence: "94%", coverage: "high" },
    { category: "Customer concentration",       owner: "CRO",        evidence: "93%", coverage: "watch" },
    { category: "Renewal",                      owner: "CRO",        evidence: "95%", coverage: "high" },
    { category: "Expansion",                    owner: "CRO",        evidence: "92%", coverage: "high" },
    { category: "MP liquidity",                 owner: "VP MP",      evidence: "89%", coverage: "watch" },
    { category: "Carrier density",              owner: "VP MP",      evidence: "88%", coverage: "watch" },
    { category: "Partner dependency",           owner: "VP Partners",evidence: "92%", coverage: "high" },
    { category: "Product support burden",       owner: "VP Product", evidence: "90%", coverage: "high" },
    { category: "Capital evidence",             owner: "CFO",        evidence: "87%", coverage: "refresh" },
    { category: "Commercial diligence",         owner: "CFO",        evidence: "91%", coverage: "high" },
    { category: "Category proof",               owner: "CMO",        evidence: "88%", coverage: "approval pending" },
    { category: "Board action",                 owner: "Board Admin",evidence: "94%", coverage: "high" },
    { category: "Compliance/control",           owner: "CCO",        evidence: "95%", coverage: "high" },
    { category: "AI governance",                owner: "Chief AI",   evidence: "95%", coverage: "high" },
    { category: "Operational scalability",      owner: "COO",        evidence: "92%", coverage: "high" },
  ],
};

// ─── 14–18. Domain control centers (Capital, Account, Partner, Product, Category) ─
export const V185_CAPITAL = area("92%",
  [k("Capital control assurance", "92%"), k("Evidence freshness", "87%"),
   k("Evidence approval", "pending § 4"), k("External-use", "approval-gated"),
   k("Data-room readiness", "94%"), k("Board-use readiness", "92%"),
   k("Exceptions", 1), k("Remediation", "in progress"), k("Audit", "100%")],
  [
    { control: "Capital evidence",            status: "watch · § 4 stale", owner: "CFO" },
    { control: "Data room evidence",          status: "ready",             owner: "CFO" },
    { control: "Investor/acquirer evidence",  status: "ready",             owner: "CEO" },
    { control: "Board capital evidence",      status: "ready",             owner: "Board Admin" },
    { control: "Revenue durability evidence", status: "ready",             owner: "CRO" },
    { control: "MP evidence",                 status: "ready",             owner: "VP MP" },
    { control: "Strategic risk evidence",     status: "ready",             owner: "CCO" },
    { control: "External-use approval",       status: "pending",           owner: "CEO" },
    { control: "Capital recommendation",      status: "tracked",           owner: "Chief AI" },
    { control: "Approval routing",            status: "tracked",           owner: "CCO" },
    { control: "Audit logging",               status: "append-only",       owner: "Sec" },
  ],
  [{ id: "CEX-01", control: "Capital evidence", desc: "Investor § 4 stale", owner: "CFO" }],
  [{ id: "CRM-01", action: "Refresh § 4 evidence", owner: "CFO", due: "+5d", status: "in progress" }],
);

export const V185_ACCOUNT = area("90%",
  [k("Account control assurance", "90%"), k("Expansion signal", "92%"),
   k("Renewal signal", "94%"), k("Churn signal", "91%"),
   k("Adoption signal", "89%"), k("Trust signal", "92%"),
   k("Support burden", "watch"), k("Exec sponsor", "94%"),
   k("Evidence", "92%"), k("Comm approval", "approval-gated"),
   k("Recommendation", "tracked"), k("Routing", "100%"), k("Audit", "100%")],
  [
    { control: "Expansion signal",       status: "healthy",  owner: "CRO" },
    { control: "Renewal signal",         status: "healthy",  owner: "CRO" },
    { control: "Churn risk signal",      status: "healthy",  owner: "CRO" },
    { control: "Adoption signal",        status: "watch · 1 acct", owner: "CRO" },
    { control: "Customer trust signal",  status: "healthy",  owner: "CRO" },
    { control: "Support burden signal",  status: "watch",    owner: "VP CS" },
    { control: "Exec sponsor signal",    status: "healthy",  owner: "CRO" },
    { control: "Account evidence",       status: "fresh",    owner: "CRO" },
    { control: "Customer comm approval", status: "gated",    owner: "CRO" },
    { control: "Account recommendation", status: "tracked",  owner: "Chief AI" },
    { control: "Approval routing",       status: "tracked",  owner: "CCO" },
    { control: "Audit logging",          status: "append-only", owner: "Sec" },
  ],
  [{ id: "AEX-01", control: "Customer concentration", desc: "Food vertical above band", owner: "CRO" }],
  [{ id: "ARM-01", action: "Concentration mitigation plan", owner: "CRO", due: "+10d", status: "in progress" }],
);

export const V185_PARTNER = area("93%",
  [k("Partner control assurance", "93%"), k("Performance", "92%"),
   k("Enablement", "91%"), k("Support burden", "94%"),
   k("Pipeline", "88%"), k("Joint customers", "90%"),
   k("Risk", "stable"), k("Evidence", "94%"),
   k("Comm (partner-facing)", "approved-only"),
   k("Recommendation", "tracked"), k("Routing", "100%"), k("Audit", "100%")],
  [
    { control: "Partner performance",      status: "healthy", owner: "VP Partners" },
    { control: "Partner enablement",       status: "healthy", owner: "VP Partners" },
    { control: "Partner support burden",   status: "healthy", owner: "VP Partners" },
    { control: "Partner pipeline",         status: "watch",   owner: "VP Partners" },
    { control: "Joint customer signal",    status: "healthy", owner: "CRO" },
    { control: "Partner risk",             status: "stable",  owner: "CCO" },
    { control: "Partner evidence",         status: "fresh",   owner: "VP Partners" },
    { control: "Partner-facing comm",      status: "approved-only", owner: "VP Partners" },
    { control: "Partner recommendation",   status: "tracked", owner: "Chief AI" },
    { control: "Approval routing",         status: "tracked", owner: "CCO" },
    { control: "Audit logging",            status: "append-only", owner: "Sec" },
  ],
);

export const V185_PRODUCT = area("91%",
  [k("Product control assurance", "91%"), k("Adoption", "89%"),
   k("Support burden", "92%"), k("Reliability", "99.8%"),
   k("Tech debt", "tracked · placeholder"),
   k("Evidence", "91%"), k("Recommendation", "tracked"),
   k("Investment approval", "gated"), k("Audit", "100%")],
  [
    { control: "Dispatch CC adoption",     status: "healthy", owner: "VP Product" },
    { control: "EliteNav adoption",        status: "healthy", owner: "VP Product" },
    { control: "Driver Mobile adoption",   status: "healthy", owner: "VP Product" },
    { control: "Customer Portal adoption", status: "healthy", owner: "VP Product" },
    { control: "CoPilot AI adoption",      status: "healthy", owner: "Chief AI" },
    { control: "Carrier Marketplace",      status: "watch · SE", owner: "VP MP" },
    { control: "API Platform",             status: "healthy", owner: "VP Product" },
    { control: "EDI Platform",             status: "healthy", owner: "VP Product" },
    { control: "Telematics",               status: "healthy", owner: "VP Product" },
    { control: "Partner Marketplace",      status: "healthy", owner: "VP Partners" },
    { control: "Reports/Analytics",        status: "healthy", owner: "VP Product" },
    { control: "Enterprise Governance",    status: "healthy", owner: "CCO" },
  ],
);

export const V185_CATEGORY = area("88%",
  [k("Category control assurance", "88%"), k("Narrative signal", "89%"),
   k("Proof assets", "publishing approval pending"),
   k("Market education", "88%"), k("Positioning", "90%"),
   k("Differentiation", "89%"), k("Sales narrative", "92%"),
   k("Website/demo narrative", "91%"), k("Board narrative", "94%"),
   k("Publishing approval", "gated"), k("External-use approval", "gated"),
   k("Recommendation", "tracked"), k("Audit", "100%")],
  [
    { control: "Category narrative",         status: "healthy", owner: "CMO" },
    { control: "Proof asset",                status: "publishing pending", owner: "CMO" },
    { control: "Market education",           status: "healthy", owner: "CMO" },
    { control: "Competitive positioning",    status: "healthy", owner: "CMO" },
    { control: "Differentiation",            status: "healthy", owner: "CMO" },
    { control: "Sales narrative",            status: "healthy", owner: "CRO" },
    { control: "Website/demo narrative",     status: "healthy", owner: "CMO" },
    { control: "Board narrative",            status: "healthy", owner: "CEO" },
    { control: "Proof publishing approval",  status: "pending", owner: "CEO" },
    { control: "External-use approval",      status: "pending", owner: "CEO" },
    { control: "Category recommendation",    status: "tracked", owner: "Chief AI" },
    { control: "Audit logging",              status: "append-only", owner: "Sec" },
  ],
  [{ id: "CTX-01", control: "Proof publishing", desc: "Asset 12 awaiting external approval", owner: "CMO" }],
  [{ id: "CTRM-01", action: "Approve proof publishing", owner: "CEO", due: "+3d", status: "queued" }],
);

// ─── 19. Resilience Audit ─────────────────────────────────────────────────
export const V185_AUDIT = {
  score: "95%",
  rows: [
    { id: "AR-001", action: "Approve SE optimization", workflow: "approval", policy: "v185_high_impact_hitl",
      source: "MP signal", signal: "density 12% below target", recommendation: "SE preferred-carrier expansion",
      evidence: "attached", explanation: "attached", risk: "med", confidence: "0.82",
      approver: "VP MP", decision: "pending", reason: "—", execution: "blocked-until-approved",
      outcome: "—", retry: "—", fallback: "manual MP runbook", exception: "—", remediation: "—", complete: "yes" },
    { id: "AR-002", action: "Refresh capital § 4", workflow: "evidence", policy: "v185_evidence_append_only",
      source: "CFO request", signal: "freshness 87%", recommendation: "refresh § 4", evidence: "draft",
      explanation: "attached", risk: "low", confidence: "0.95", approver: "CFO", decision: "approved",
      reason: "due-diligence prep", execution: "in progress", outcome: "—", retry: "—", fallback: "—",
      exception: "—", remediation: "—", complete: "yes" },
    { id: "AR-003", action: "Evidence-attach worker", workflow: "automation", policy: "v185_audit_append_only",
      source: "cron", signal: "—", recommendation: "—", evidence: "—", explanation: "—",
      risk: "low", confidence: "—", approver: "—", decision: "n/a", reason: "—",
      execution: "failed", outcome: "—", retry: "scheduled", fallback: "manual attach", exception: "WF-2207",
      remediation: "patch 503", complete: "yes" },
  ],
  exceptions: [
    { id: "AUX-01", area: "evidence-attach", desc: "downstream 503", owner: "Eng" },
  ],
  export_placeholder: "CSV/PDF export gated by CCO approval (mock)",
};

// ─── 20. Board Assurance Reporting ────────────────────────────────────────
export const V185_BOARD_REPORT = {
  sections: [
    { section: "Enterprise control assurance",        status: "ready",   approver: "CEO" },
    { section: "Autonomous-assist operating resilience", status: "ready",approver: "Sec/Admin" },
    { section: "Board intelligence assurance",         status: "ready",   approver: "Board Admin" },
    { section: "Revenue automation control maturity",   status: "ready",  approver: "CRO" },
    { section: "Marketplace control optimization",      status: "watch",  approver: "VP MP" },
    { section: "Executive governance assurance",        status: "ready",  approver: "CEO" },
    { section: "Automation resilience controls",        status: "ready",  approver: "CCO" },
    { section: "Human approval assurance",              status: "ready",  approver: "CCO" },
    { section: "Recommendation control assurance",      status: "ready",  approver: "Chief AI" },
    { section: "Outcome learning assurance",            status: "ready",  approver: "Chief AI" },
    { section: "Evidence assurance",                    status: "watch",  approver: "CCO" },
    { section: "Predictive risk control assurance",     status: "ready",  approver: "CCO" },
    { section: "Control exceptions",                    status: "ready",  approver: "CCO" },
    { section: "Audit results",                         status: "ready",  approver: "Sec" },
    { section: "Decisions needed",                      status: "ready",  approver: "CEO" },
    { section: "Next quarter assurance priorities",     status: "draft",  approver: "CEO" },
  ],
  decisions_needed: [
    "Approve SE preferred-carrier optimization",
    "Approve capital evidence refresh (§ 4)",
    "Approve customer concentration mitigation",
    "Approve proof publishing (Asset 12)",
    "Sign off resilience post-mortem",
    "Approve next-quarter assurance priorities",
  ],
};

// ─── 21. Roadmap ──────────────────────────────────────────────────────────
export const V185_ROADMAP = [
  { horizon: "Current quarter", focus: "Stabilize assurance · close 5 high-risk · ship resilience patch" },
  { horizon: "Next quarter",    focus: "Maturity for evidence/external-use · resilience drills cadence" },
  { horizon: "6 months",        focus: "Outcome-learning assurance · model/provider fallback policy" },
  { horizon: "12 months",       focus: "Assurance operating system · board assurance execution" },
  { horizon: "24 months",       focus: "Durable revenue control assurance · marketplace optimization assurance" },
  { horizon: "36 months",       focus: "Long-term resilience maturity (still HITL on high-impact)" },
];

// ─── 22. Reports ──────────────────────────────────────────────────────────
export const V185_REPORTS = [
  { name: "Enterprise control assurance",        status: "ready", owner: "CEO" },
  { name: "Autonomous-assist operating resilience", status: "ready", owner: "Sec/Admin" },
  { name: "Board intelligence assurance",         status: "ready", owner: "Board Admin" },
  { name: "Revenue automation control maturity",  status: "ready", owner: "CRO" },
  { name: "Marketplace control optimization",     status: "ready", owner: "VP MP" },
  { name: "Executive governance assurance",       status: "ready", owner: "CEO" },
  { name: "Automation resilience controls",       status: "ready", owner: "CCO" },
  { name: "Human approval assurance",             status: "ready", owner: "CCO" },
  { name: "Recommendation control assurance",     status: "ready", owner: "Chief AI" },
  { name: "Outcome learning assurance",           status: "ready", owner: "Chief AI" },
  { name: "Evidence assurance",                   status: "ready", owner: "CCO" },
  { name: "Predictive risk control assurance",    status: "ready", owner: "CCO" },
  { name: "Capital control assurance",            status: "ready", owner: "CFO" },
  { name: "Strategic account control assurance",  status: "ready", owner: "CRO" },
  { name: "Partner control assurance",            status: "ready", owner: "VP Partners" },
  { name: "Product-line control assurance",       status: "ready", owner: "VP Product" },
  { name: "Category control assurance",           status: "ready", owner: "CMO" },
  { name: "Autonomous-assist resilience audit",   status: "ready", owner: "Sec" },
  { name: "Board assurance report",               status: "ready", owner: "Board Admin" },
  { name: "Long-term control assurance roadmap",  status: "ready", owner: "CEO" },
];

// ─── RLS / Edge / Demo / Teaser ──────────────────────────────────────────
export const V185_RLS = [
  { name: "v185_company_scope",              target: "all tenant-owned tables", sql: "USING (company_id = public.current_company())" },
  { name: "v185_platform_assurance_owner",   target: "platform-wide assurance",  sql: "USING (public.is_platform_owner(auth.uid()))" },
  { name: "v185_exec_assurance_visibility",  target: "executive assurance",       sql: "USING (public.has_role(auth.uid(), company_id, 'owner') OR public.has_role(auth.uid(), company_id, 'admin'))" },
  { name: "v185_board_report_approved_only", target: "board_assurance_reports",   sql: "USING (audience='board' AND status='approved')" },
  { name: "v185_security_admin_manage",      target: "resilience/approval/audit", sql: "FOR ALL USING (public.has_role(auth.uid(), company_id, 'admin'))" },
  { name: "v185_no_self_approve",            target: "approvals",                  sql: "WITH CHECK (approver_id <> recommender_id)" },
  { name: "v185_high_impact_hitl",           target: "any high-impact action",     sql: "USING (impact_tier <> 'high' OR EXISTS (SELECT 1 FROM approvals a WHERE a.action_id = id AND a.approver_id <> recommender_id AND a.status='approved'))" },
  { name: "v185_customer_excluded_internal", target: "internal assurance records", sql: "USING (NOT public.is_customer_user(auth.uid(), company_id))" },
  { name: "v185_carrier_blocked_mp",         target: "marketplace control rows",   sql: "USING (NOT public.has_role(auth.uid(), company_id, 'carrier'))" },
  { name: "v185_partner_facing_approved",    target: "partner_control_records",    sql: "USING (audience='partner' AND status='approved')" },
  { name: "v185_audit_append_only",          target: "assist_resilience_audit_records", sql: "FOR UPDATE USING (false); FOR DELETE USING (false)" },
  { name: "v185_evidence_append_only",       target: "evidence_assurance_records", sql: "FOR UPDATE USING (false)" },
];

export const V185_EDGE_BOUNDARY = [
  { layer: "createServerFn", concern: "Assurance approvals",           auth: "User + RLS",         returns: "approval id" },
  { layer: "createServerFn", concern: "Evidence attach",               auth: "User + RLS",         returns: "evidence id" },
  { layer: "createServerFn", concern: "Exception remediation",         auth: "User + RLS",         returns: "remediation id" },
  { layer: "createServerFn", concern: "Read assurance dashboard",      auth: "User + RLS",         returns: "DTO" },
  { layer: "Edge Function",  concern: "calculate-v185-control-assurance-score", auth: "Cron + service role", returns: "score upsert" },
  { layer: "Edge Function",  concern: "calculate-assist-operating-resilience",  auth: "Cron + service role", returns: "resilience upsert" },
  { layer: "Edge Function",  concern: "detect-control-assurance-exceptions",    auth: "Cron + service role", returns: "exception batch" },
  { layer: "Edge Function",  concern: "generate-board-assurance-report",        auth: "Cron + service role", returns: "report draft" },
  { layer: "Edge Function",  concern: "create-resilience-audit-log",            auth: "Cron + service role", returns: "audit append" },
  { layer: "Edge Function",  concern: "generate-long-term-control-assurance-roadmap", auth: "Cron + service role", returns: "horizon snapshot" },
  { layer: "/api/public/*",  concern: "Signed external evidence ingest",        auth: "HMAC signature",      returns: "ingest receipt" },
  { layer: "/api/public/*",  concern: "Cron trigger: nightly recalc",           auth: "Bearer + signature",  returns: "job id" },
];

export const V185_EDGE_FUNCTIONS = [
  "calculate-v185-control-assurance-score", "generate-control-assurance-summary",
  "detect-control-assurance-exceptions", "generate-control-assurance-action-plan",
  "calculate-assist-operating-resilience", "detect-assist-workflow-failures",
  "generate-resilience-remediation-plan", "create-resilience-audit-log",
  "calculate-board-intelligence-assurance", "generate-board-assurance-report",
  "detect-board-assurance-gaps", "calculate-revenue-control-maturity",
  "detect-revenue-control-exceptions", "generate-revenue-control-maturity-plan",
  "calculate-marketplace-control-optimization", "detect-marketplace-control-optimization-gaps",
  "generate-marketplace-control-optimization-plan", "calculate-executive-governance-assurance",
  "calculate-human-approval-assurance", "calculate-recommendation-control-assurance",
  "calculate-outcome-learning-assurance", "calculate-evidence-assurance",
  "calculate-predictive-risk-control-assurance", "calculate-capital-control-assurance",
  "calculate-account-control-assurance", "calculate-partner-control-assurance",
  "calculate-product-line-control-assurance", "calculate-category-control-assurance",
  "generate-assist-resilience-audit-report", "detect-resilience-audit-exceptions",
  "generate-long-term-control-assurance-roadmap",
];

export const V185_DEMO = [
  { who: "CEO",         step: "Open Assurance Command Center",    outcome: "Assurance 97% · Resilience 93% · Approval 96% · Evidence 91% · Audit 95%" },
  { who: "Sec/Admin",   step: "Open Operating Resilience",        outcome: "Recs/approvals healthy · 1 evidence worker in retry · manual fallback ready · no auto high-impact" },
  { who: "Board Admin", step: "Open Board Intelligence Assurance",outcome: "92% · packet evidence strong · 2 board-use approvals pending · audit trail complete" },
  { who: "RevOps",      step: "Open Revenue Control Maturity",    outcome: "Renewal/expansion mature · 1 concentration exception · refresh 2 stale" },
  { who: "VP MP",       step: "Open MP Control Optimization",     outcome: "TX/Midwest healthy · SE density flagged · preferred-carrier pending VP MP approval" },
  { who: "CEO",         step: "Open Exec Governance Assurance",   outcome: "5 high-risk visible: SE MP, concentration, capital evidence, board evidence, proof publishing" },
  { who: "CCO",         step: "Open Human Approval Assurance",    outcome: "Coverage 97% · SLA 94% · backup 96% · high-risk 100%" },
  { who: "Chief AI",    step: "Open Recommendation Assurance",    outcome: "91% · explainability 95% · 2 exceptions queued" },
  { who: "CCO",         step: "Open Evidence Assurance",          outcome: "91% · 15 domains · 4 exceptions in remediation" },
  { who: "CCO",         step: "Open Risk Control Assurance",      outcome: "91% · 15 categories · all owners covered" },
  { who: "Sec",         step: "Open Resilience Audit",            outcome: "95% · 3 audit rows incl. WF-2207 failure with retry/fallback logged" },
  { who: "Board Admin", step: "Generate Board Assurance Report",  outcome: "16 sections · 6 decisions needed · ready for board after CEO sign-off" },
];

export const V185_PHASE51_TEASER = "Phase 51 (V19): enterprise assurance operating system · autonomous-assist resilience maturity · board assurance execution · durable revenue control assurance · marketplace optimization assurance. All high-impact still HITL.";

export const V185_GUARDRAILS = [
  "approver_id <> recommender_id enforced at RLS",
  "All high-impact actions HITL — no autonomous dispatch",
  "Evidence and audit logs are append-only",
  "Carrier role blocked from marketplace internals; customer role blocked from internal assurance",
  "Board-use, external-use, and data-room evidence require explicit approval",
  "No IPO / SOC 2 / Android Auto / CarPlay claims without tracked evidence",
];
