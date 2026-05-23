// V19.5 Phase 52 Polish — mock-only, no business logic.
// Adds optimization depth across the 20 assurance centers, RLS examples,
// ServerFn/Edge separation, persona SLAs, guardrails, and a polished demo.

export const V195P_HEADLINES = {
  headline: "V19.5 enterprise assurance maturity optimized to 98.6% — board-ready, HITL on every high-impact action.",
  score: "98.6%",
  highlights: [
    "Resilience optimization 96.4% · drift halved vs Phase 51",
    "Board intelligence 95.1% · 0 unapproved board-bound items",
    "Audit optimization 97.7% · evidence freshness median 18m",
    "Maturity exceptions burn-down: 41 open · 12 due ≤7d · 0 SLA breached",
  ],
};

export const V195P_AREA_DEPTH = [
  { area: "Maturity command",     kpi: "Maturity score",        target: "≥97%",   actual: "98.6%", sla: "Weekly",  status: "Optimized" },
  { area: "Resilience opt",       kpi: "Drift rate",            target: "≤2%",    actual: "1.1%",  sla: "Daily",   status: "Optimized" },
  { area: "Board intelligence",   kpi: "Approval freshness",    target: "≤24h",   actual: "11h",   sla: "Daily",   status: "Optimized" },
  { area: "Revenue assurance",    kpi: "Forecast deviation",    target: "≤3%",    actual: "1.6%",  sla: "Weekly",  status: "Optimized" },
  { area: "Marketplace governance", kpi: "Policy violations",   target: "0/wk",   actual: "0",     sla: "Daily",   status: "Optimized" },
  { area: "Executive intel",      kpi: "Briefing freshness",    target: "≤8h",    actual: "3h",    sla: "Daily",   status: "Optimized" },
  { area: "Control opt",          kpi: "Control coverage",      target: "≥99%",   actual: "99.4%", sla: "Weekly",  status: "Optimized" },
  { area: "Evidence intel",       kpi: "Evidence freshness",    target: "≤60m",   actual: "18m",   sla: "Hourly",  status: "Optimized" },
  { area: "Audit opt",            kpi: "Audit pass rate",       target: "≥98%",   actual: "99.1%", sla: "Monthly", status: "Optimized" },
  { area: "Approval opt",         kpi: "approver≠recommender",  target: "100%",   actual: "100%",  sla: "Per-act", status: "Enforced" },
  { area: "Recommendation opt",   kpi: "Acceptance quality",    target: "≥92%",   actual: "94.2%", sla: "Weekly",  status: "Optimized" },
  { area: "Outcome opt",          kpi: "Outcome match",         target: "≥90%",   actual: "93.8%", sla: "Weekly",  status: "Optimized" },
  { area: "Risk opt",             kpi: "Predictive precision",  target: "≥0.85",  actual: "0.91",  sla: "Daily",   status: "Optimized" },
  { area: "Capital intel",        kpi: "2-person sign-off",     target: "100% >$25k", actual: "100%", sla: "Per-act", status: "Enforced" },
  { area: "Account intel",        kpi: "Top-50 coverage",       target: "100%",   actual: "100%",  sla: "Weekly",  status: "Optimized" },
  { area: "Partner intel",        kpi: "Partner SLA",           target: "≥97%",   actual: "98.2%", sla: "Weekly",  status: "Optimized" },
  { area: "Product-line intel",   kpi: "Line margin guard",     target: "≥target",actual: "+0.7pp",sla: "Weekly",  status: "Optimized" },
  { area: "Category intel",       kpi: "Category drift",        target: "≤2%",    actual: "0.9%",  sla: "Weekly",  status: "Optimized" },
  { area: "Exception center",     kpi: "SLA breach",            target: "0",      actual: "0",     sla: "Daily",   status: "Clean" },
  { area: "Board reporting",      kpi: "On-time publish",       target: "100%",   actual: "100%",  sla: "Monthly", status: "Optimized" },
];

export const V195P_OWNER_HEATMAP = [
  { owner: "CEO",        load: "Low",    open: 2,  due7d: 1, breached: 0 },
  { owner: "CFO",        load: "Medium", open: 6,  due7d: 2, breached: 0 },
  { owner: "COO",        load: "Medium", open: 7,  due7d: 2, breached: 0 },
  { owner: "Board admin",load: "Low",    open: 3,  due7d: 1, breached: 0 },
  { owner: "Sec/Admin",  load: "High",   open: 11, due7d: 4, breached: 0 },
  { owner: "RevOps",     load: "Medium", open: 5,  due7d: 1, breached: 0 },
  { owner: "MP ops",     load: "Low",    open: 4,  due7d: 1, breached: 0 },
  { owner: "Audit",      load: "Low",    open: 3,  due7d: 0, breached: 0 },
];

export const V195P_NEXT_BEST_HITL = [
  { id: "HITL-9011", area: "Capital",      action: "Approve $42k capex (2-person)", risk: "Med", due: "≤24h", owners: "CFO+COO" },
  { id: "HITL-9012", area: "Revenue",      action: "Approve forecast lock Q3",       risk: "Low", due: "≤24h", owners: "CFO" },
  { id: "HITL-9013", area: "Marketplace",  action: "Approve category policy change", risk: "Med", due: "≤48h", owners: "COO" },
  { id: "HITL-9014", area: "Board",        action: "Approve board pack v3",          risk: "Low", due: "≤24h", owners: "Board admin" },
  { id: "HITL-9015", area: "Partner",      action: "Approve partner SLA waiver",     risk: "Med", due: "≤48h", owners: "COO" },
  { id: "HITL-9016", area: "Exception",    action: "Approve exception closure pack", risk: "Low", due: "≤24h", owners: "Sec/Admin" },
];

export const V195P_EVIDENCE_FRESHNESS = [
  { source: "Approvals ledger",  freshness: "8m",  sla: "≤30m", status: "OK" },
  { source: "Audit append-only", freshness: "12m", sla: "≤30m", status: "OK" },
  { source: "Board pack store",  freshness: "22m", sla: "≤60m", status: "OK" },
  { source: "Capital sign-offs", freshness: "5m",  sla: "≤15m", status: "OK" },
  { source: "MP policy log",     freshness: "18m", sla: "≤60m", status: "OK" },
  { source: "Outcome telemetry", freshness: "31m", sla: "≤60m", status: "OK" },
];

export const V195P_INVARIANTS = [
  "Every high-impact action requires HITL approval (approver_id <> recommender_id).",
  "Capital actions > $25k require 2-person sign-off in distinct roles.",
  "Audit log is append-only — no UPDATE / no DELETE.",
  "Board-bound artifacts require board_admin co-sign before publish.",
  "No autonomous dispatch — V19.5 is assist-only with assured controls.",
];

export const V195P_RLS_EXAMPLES = [
  { name: "v195_high_impact_hitl",   target: "public.actions",        sql: "USING (impact='low' OR EXISTS (SELECT 1 FROM approvals a WHERE a.action_id=actions.id AND a.approver_id<>actions.recommender_id))" },
  { name: "v195_two_person_capital", target: "public.capital_actions",sql: "USING (amount<=25000 OR (SELECT count(DISTINCT approver_id) FROM capital_signoffs s WHERE s.action_id=capital_actions.id)>=2)" },
  { name: "v195_audit_append_only",  target: "public.audit_log",      sql: "USING (true); REVOKE UPDATE, DELETE ON public.audit_log FROM PUBLIC;" },
  { name: "v195_board_cosign",       target: "public.board_artifacts",sql: "USING (status<>'published' OR EXISTS (SELECT 1 FROM board_signoffs b WHERE b.artifact_id=board_artifacts.id AND b.role='board_admin'))" },
  { name: "v195_evidence_tenant",    target: "public.evidence",       sql: "USING (company_id = public.current_company())" },
];

export const V195P_EDGE_BOUNDARY = [
  { layer: "ServerFn",      concern: "App-internal reads/writes, HITL queues", auth: "Supabase auth (RLS)", returns: "DTO" },
  { layer: "Edge function", concern: "Heavy compute, AI scoring, batch eval",  auth: "Service role + signed",returns: "DTO" },
  { layer: "/api/public/*", concern: "Webhooks, cron, signed callbacks",       auth: "HMAC verify",          returns: "200/4xx" },
];

export const V195P_PERSONA_SLAS = [
  { persona: "CEO",         sla: "Brief ≤8h",  channel: "Exec center" },
  { persona: "CFO",         sla: "Capital ≤24h", channel: "Capital intel" },
  { persona: "COO",         sla: "Ops ≤24h",   channel: "Resilience/MP" },
  { persona: "Board admin", sla: "Board ≤24h", channel: "Board intel" },
  { persona: "Sec/Admin",   sla: "Exception ≤24h", channel: "Exception center" },
];

export const V195P_GUARDRAILS = [
  "No autonomous dispatch · no autonomous billing · no autonomous capital.",
  "All approver_id must differ from recommender_id (DB-enforced).",
  "Capital >$25k requires 2 distinct approvers in distinct roles.",
  "Append-only audit log; tampering blocked at policy level.",
  "Tenant isolation via company_id on every assurance table.",
];

export const V195P_DEMO = [
  { who: "Sec/Admin",  step: "1 · Open Maturity Command",           outcome: "98.6% maturity · 41 open exceptions triaged" },
  { who: "COO",        step: "2 · Review Resilience Optimization",  outcome: "Drift 1.1% · 3 optimizations queued (HITL)" },
  { who: "Board admin",step: "3 · Review Board Intelligence",        outcome: "Pack v3 ready · awaits co-sign" },
  { who: "CFO",        step: "4 · Approve Capital $42k (2-person)", outcome: "CFO+COO co-sign · audit row appended" },
  { who: "RevOps",     step: "5 · Lock Q3 revenue forecast",         outcome: "Deviation 1.6% · HITL approved by CFO" },
  { who: "MP ops",     step: "6 · Approve category policy change",   outcome: "0 violations · COO approved" },
  { who: "Sec/Admin",  step: "7 · Close exception pack",             outcome: "12 closed · 0 SLA breached" },
  { who: "Audit",      step: "8 · Run audit optimization sweep",     outcome: "Pass 99.1% · evidence 18m median" },
  { who: "Board admin",step: "9 · Publish board intelligence report",outcome: "On-time · co-signed · append-only" },
  { who: "CEO",        step: "10 · Review executive brief",          outcome: "3h freshness · top-5 risks acknowledged" },
  { who: "COO",        step: "11 · Approve partner SLA waiver",      outcome: "Partner SLA 98.2% maintained" },
  { who: "Sec/Admin",  step: "12 · Confirm roadmap horizons",        outcome: "Phase 53 (V20 Trust OS) teaser noted" },
];
