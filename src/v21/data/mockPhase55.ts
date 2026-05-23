// Mock data for V21 enterprise trust intelligence network. Numbers are illustrative.

const matrix = (label: string) => [
  { control: `${label} signal quality`, status: "Passing", owner: "Trust eng" },
  { control: `${label} owner coverage`, status: "Passing", owner: "Trust ops" },
  { control: `${label} evidence freshness`, status: "Watch",   owner: "Evidence" },
  { control: `${label} approval routing`,   status: "Passing", owner: "Security" },
  { control: `${label} audit completeness`, status: "Passing", owner: "Audit" },
  { control: `${label} exception remediation`, status: "Watch", owner: "Remediation" },
];
const exc = (prefix: string, area: string) => [
  { id: `${prefix}-1`, control: area, desc: `${area} exception requires human approval`, owner: "Security", risk: "High",   sla: "24h" },
  { id: `${prefix}-2`, control: area, desc: `${area} evidence refresh overdue`,           owner: "Evidence", risk: "Medium", sla: "72h" },
];
const rem = (prefix: string) => [
  { id: `${prefix}R-1`, action: "Refresh stale evidence", owner: "Evidence", due: "7d", status: "In progress" },
  { id: `${prefix}R-2`, action: "Close exception with HITL approval", owner: "Security", due: "3d", status: "Open" },
];
const pack = (label: string, score: number, kpis: { label: string; value: string | number }[]) => ({
  score, kpis, matrix: matrix(label), exceptions: exc(label.replace(/\s+/g, "").slice(0, 3).toUpperCase(), label), remediation: rem(label.slice(0,3).toUpperCase()),
});

export const V21_SCOPE = {
  version: "V21",
  in_scope: [
    "Enterprise Trust Intelligence Network", "Customer Trust Scale", "Partner Trust Scale",
    "Board Trust Execution", "Durable Revenue Trust Systems", "Marketplace Trust Optimization",
    "Executive Trust Intelligence Command", "Trust Evidence Network", "Customer/Partner Trust Boundary",
    "Trust Risk Network", "Trust Audit Network", "Human Approval Trust Network Controls",
    "Recommendation Trust Network", "Outcome Trust Network", "Capital Trust Intelligence",
    "Product Trust Intelligence", "Category Trust Leadership Execution",
    "Enterprise Trust Exception Network", "Board Trust Intelligence Reporting",
    "Long-Term Trust Intelligence Network Roadmap",
  ],
  deferred: [
    "Fully autonomous dispatch / pricing / billing / marketplace",
    "Fully autonomous customer / carrier / compliance / legal / capital / board actions",
    "Final IPO / acquisition / audited-financial claims",
    "Final SOC 2 / ISO / Android Auto / CarPlay claims without evidence",
    "Customs production, international tax, insurance underwriting, autonomous vehicles",
  ],
};

export const V21_HEADLINE = {
  headline: "V21 trust intelligence network at 98% with HITL on every high-impact assist",
  highlights: [
    "Customer trust scale 94% · Partner trust scale 92%",
    "Board trust execution 95% · Revenue trust systems 94%",
    "Marketplace trust optimization 91% · Evidence network 96%",
    "0 autonomous high-impact actions · all routed through approval",
  ],
};

export const V21_NETWORK              = pack("Trust intelligence network", 98, [
  { label: "Network score", value: "98%" }, { label: "Domain coverage", value: "20/20" },
  { label: "HITL coverage", value: "100%" }, { label: "Open exceptions", value: 7 },
]);
export const V21_CUSTOMER             = pack("Customer trust scale", 94, [
  { label: "Adoption trust", value: "95%" }, { label: "Renewal trust", value: "93%" },
  { label: "Expansion trust", value: "90%" }, { label: "Boundary assurance", value: "Passing" },
]);
export const V21_PARTNER              = pack("Partner trust scale", 92, [
  { label: "Performance trust", value: "93%" }, { label: "Enablement trust", value: "88%" },
  { label: "Pipeline trust", value: "91%" }, { label: "Boundary assurance", value: "Passing" },
]);
export const V21_BOARD                = pack("Board trust execution", 95, [
  { label: "Packet execution", value: "96%" }, { label: "KPI execution", value: "97%" },
  { label: "Decision evidence", value: "94%" }, { label: "Open approvals", value: 2 },
]);
export const V21_REVENUE              = pack("Revenue trust systems", 94, [
  { label: "Renewal", value: "95%" }, { label: "Expansion", value: "92%" },
  { label: "Concentration", value: "1 exc" }, { label: "Evidence freshness", value: "Refresh 2" },
]);
export const V21_MP                   = pack("Marketplace trust optimization", 91, [
  { label: "Carrier density", value: "89%" }, { label: "Lane liquidity", value: "92%" },
  { label: "Regional liquidity", value: "Southeast weak" }, { label: "Approval health", value: "Passing" },
]);
export const V21_EXEC                 = pack("Executive trust intelligence", 96, [
  { label: "CEO queue", value: 3 }, { label: "CFO queue", value: 2 },
  { label: "Overdue approvals", value: 1 }, { label: "Escalations", value: 0 },
]);
export const V21_EVIDENCE             = pack("Trust evidence network", 96, [
  { label: "Freshness", value: "Refresh 4" }, { label: "Completeness", value: "97%" },
  { label: "Owner coverage", value: "100%" }, { label: "Board-use ready", value: "Yes" },
]);
export const V21_BOUNDARY             = pack("Trust boundary controls", 97, [
  { label: "Customer data", value: "Passing" }, { label: "Partner data", value: "Passing" },
  { label: "External-use approvals", value: "1 overdue" }, { label: "Tenant isolation", value: "Passing" },
]);
export const V21_RISK                 = pack("Trust risk network", 93, [
  { label: "Signal quality", value: "95%" }, { label: "Mitigation", value: "94%" },
  { label: "Board visibility", value: "Yes" }, { label: "Recurrence tracking", value: "On" },
]);
export const V21_AUDIT                = pack("Trust audit network", 95, [
  { label: "Schedule maturity", value: "96%" }, { label: "Owner coverage", value: "100%" },
  { label: "Findings reduction", value: "-22%" }, { label: "Export ready", value: "Yes" },
]);
export const V21_APPROVAL             = pack("Human approval trust network", 97, [
  { label: "Coverage", value: "100%" }, { label: "SLA health", value: "98%" },
  { label: "Backup approver", value: "100%" }, { label: "Override audited", value: "Yes" },
]);
export const V21_REC                  = pack("Recommendation trust network", 94, [
  { label: "Explainability", value: "96%" }, { label: "Confidence calibration", value: "On" },
  { label: "Policy compliance", value: "100%" }, { label: "Outcome linkage", value: "94%" },
]);
export const V21_OUTCOME              = pack("Outcome trust network", 94, [
  { label: "Approved outcomes", value: "94%" }, { label: "Lessons captured", value: "Yes" },
  { label: "Calibration evidence", value: "On" }, { label: "Board visible", value: "Yes" },
]);
export const V21_CAPITAL              = pack("Capital trust intelligence", 93, [
  { label: "Data room readiness", value: "94%" }, { label: "External-use approvals", value: "On" },
  { label: "Two-person sign-off >$25k", value: "Enforced" }, { label: "Audit completeness", value: "96%" },
]);
export const V21_PRODUCT              = pack("Product trust intelligence", 92, [
  { label: "Adoption", value: "93%" }, { label: "Reliability", value: "95%" },
  { label: "Support burden", value: "Watch" }, { label: "Audit completeness", value: "94%" },
]);
export const V21_CATEGORY             = pack("Category trust leadership execution", 91, [
  { label: "Narrative", value: "92%" }, { label: "Proof assets", value: "90%" },
  { label: "Publishing approvals", value: "HITL" }, { label: "External-use approvals", value: "On" },
]);
export const V21_EXCEPTION            = pack("Enterprise trust exception network", 90, [
  { label: "Open exceptions", value: 7 }, { label: "High risk", value: 4 },
  { label: "Remediation in flight", value: 5 }, { label: "Board visible", value: 3 },
]);

export const V21_BOARD_REPORT = {
  score: 95,
  kpis: [
    { label: "Network score", value: "98%" }, { label: "Customer scale", value: "94%" },
    { label: "Partner scale", value: "92%" }, { label: "Revenue systems", value: "94%" },
    { label: "MP optimization", value: "91%" }, { label: "Evidence network", value: "96%" },
    { label: "Risk network", value: "93%" }, { label: "Audit network", value: "95%" },
  ],
  matrix: [
    { section: "Enterprise trust intelligence network", status: "Strong", owner: "CEO" },
    { section: "Customer trust scale",                  status: "Strong", owner: "CS lead" },
    { section: "Partner trust scale",                   status: "Watch",  owner: "Partner lead" },
    { section: "Board trust execution",                 status: "Strong", owner: "Board admin" },
    { section: "Revenue trust systems",                 status: "Strong", owner: "CRO" },
    { section: "Marketplace trust optimization",        status: "Watch",  owner: "MP leader" },
    { section: "Trust evidence network",                status: "Strong", owner: "Evidence" },
    { section: "Trust audit network",                   status: "Strong", owner: "Audit" },
    { section: "Trust exception network",               status: "Watch",  owner: "Security" },
    { section: "Decisions needed",                      status: "2 open", owner: "CEO/CFO" },
    { section: "Next-quarter priorities",               status: "Drafted", owner: "ELT" },
  ],
};

export const V21_ROADMAP = {
  score: 92,
  horizons: [
    { horizon: "Current Q", focus: "Close 7 trust exceptions; refresh 4 evidence items" },
    { horizon: "Next Q",    focus: "Customer + partner lifecycle trust intelligence (V21.5 entry)" },
    { horizon: "6 months",  focus: "Revenue trust optimization + MP network governance" },
    { horizon: "12 months", focus: "Board trust intelligence maturity + capital trust intelligence scale" },
    { horizon: "24 months", focus: "Trust network scale across products + categories" },
    { horizon: "36 months", focus: "Trust-led category leadership; HITL preserved" },
  ],
};

export const V21_REPORTS = [
  "Enterprise trust intelligence network", "Customer trust scale", "Partner trust scale",
  "Board trust execution", "Revenue trust systems", "Marketplace trust optimization",
  "Executive trust intelligence", "Trust evidence network", "Boundary controls",
  "Trust risk network", "Trust audit network", "Human approval trust network",
  "Recommendation trust network", "Outcome trust network", "Capital trust intelligence",
  "Product trust intelligence", "Category trust execution", "Exception network",
  "Board trust intelligence reporting", "Long-term roadmap",
].map((name, i) => ({ id: `RPT-${i+1}`, name, owner: "Trust ops", status: "Ready" }));

export const V21_RLS = [
  { policy: "v21_company_trust_records_view", rule: "company admins read for their company_id",       surface: "all tenant records" },
  { policy: "v21_platform_network_view",      rule: "is_platform_owner(auth.uid())",                  surface: "network / audit" },
  { policy: "v21_board_report_view",          rule: "board role reads only approved reports",         surface: "board_trust_intelligence_reports" },
  { policy: "v21_security_admin_manage",      rule: "security/admin manage boundary/audit/exception", surface: "trust controls" },
  { policy: "v21_revops_revenue_manage",      rule: "revops manage revenue trust systems",            surface: "revenue trust" },
  { policy: "v21_mp_leader_manage",           rule: "mp leaders manage MP optimization",              surface: "marketplace trust" },
  { policy: "v21_cs_assigned_customers",      rule: "CS manages assigned customer trust records",     surface: "customer trust" },
  { policy: "v21_partner_mgr_manage",         rule: "partner mgrs manage partner trust records",      surface: "partner trust" },
  { policy: "v21_product_lead_manage",        rule: "product leaders manage product trust",           surface: "product trust" },
  { policy: "v21_category_lead_manage",       rule: "category leaders manage category execution",     surface: "category trust" },
  { policy: "v21_hitl_required",              rule: "approver_id <> recommender_id; row required",    surface: "all high-impact" },
  { policy: "v21_customer_user_block",        rule: "customers blocked from internal/audit/capital",  surface: "internal records" },
  { policy: "v21_carrier_user_block_mp",      rule: "carriers blocked from MP internals",             surface: "marketplace internals" },
  { policy: "v21_partner_user_approved_only", rule: "partners see only approved partner-facing",      surface: "partner-facing" },
];

export const V21_EDGE = {
  serverfn: [
    { name: "calculate-v21-trust-intelligence-network-score", kind: "internal", auth: "requireSupabaseAuth" },
    { name: "generate-trust-intelligence-network-summary",     kind: "internal", auth: "requireSupabaseAuth" },
    { name: "detect-trust-intelligence-network-gaps",          kind: "internal", auth: "requireSupabaseAuth" },
    { name: "generate-trust-intelligence-network-action-plan", kind: "internal", auth: "requireSupabaseAuth" },
    { name: "calculate-customer-trust-scale",                  kind: "internal", auth: "requireSupabaseAuth" },
    { name: "calculate-partner-trust-scale",                   kind: "internal", auth: "requireSupabaseAuth" },
    { name: "calculate-board-trust-execution",                 kind: "internal", auth: "requireSupabaseAuth" },
    { name: "generate-board-trust-intelligence-report",        kind: "internal", auth: "requireSupabaseAuth + board" },
    { name: "calculate-durable-revenue-trust-systems",         kind: "internal", auth: "requireSupabaseAuth + revops" },
    { name: "calculate-marketplace-trust-optimization",        kind: "internal", auth: "requireSupabaseAuth + mp" },
    { name: "calculate-trust-evidence-network",                kind: "internal", auth: "requireSupabaseAuth" },
    { name: "calculate-trust-boundary-score",                  kind: "internal", auth: "requireSupabaseAuth + security" },
    { name: "calculate-trust-risk-network",                    kind: "internal", auth: "requireSupabaseAuth" },
    { name: "calculate-trust-audit-network",                   kind: "internal", auth: "requireSupabaseAuth + audit" },
    { name: "calculate-human-approval-trust-network",          kind: "internal", auth: "requireSupabaseAuth" },
    { name: "calculate-recommendation-trust-network",          kind: "internal", auth: "requireSupabaseAuth" },
    { name: "calculate-outcome-trust-network",                 kind: "internal", auth: "requireSupabaseAuth" },
    { name: "calculate-capital-trust-intelligence",            kind: "internal", auth: "requireSupabaseAuth + capital" },
    { name: "calculate-product-trust-intelligence",            kind: "internal", auth: "requireSupabaseAuth + product" },
    { name: "calculate-category-trust-leadership-execution",   kind: "internal", auth: "requireSupabaseAuth + category" },
    { name: "route-enterprise-trust-exception-network",        kind: "internal", auth: "requireSupabaseAuth + security" },
    { name: "calculate-trust-exception-network-score",         kind: "internal", auth: "requireSupabaseAuth" },
    { name: "generate-long-term-trust-intelligence-roadmap",   kind: "internal", auth: "requireSupabaseAuth + ELT" },
  ],
  edge_routes: [
    { path: "/api/public/webhooks/stripe",           purpose: "Signed Stripe billing events" },
    { path: "/api/public/webhooks/partner-billing",  purpose: "Signed partner billing events" },
    { path: "/api/public/webhooks/telematics",       purpose: "Signed telematics events" },
    { path: "/api/public/cron/evidence-refresh",     purpose: "Cron to refresh evidence freshness" },
  ],
};

export const V21_GUARDRAILS = [
  "No fully autonomous dispatch, pricing, billing, marketplace, capital, board.",
  "Every high-impact assist requires human approval (approver_id ≠ recommender_id).",
  "Capital actions >$25k require two-person sign-off.",
  "Append-only audit log; no in-place mutation.",
  "RBAC + RLS + tenant isolation enforced across all trust records.",
  "Customer / carrier / partner users blocked from internal intelligence, audit, capital, board, exception records.",
];

export const V21_DEMO = [
  { id: 1,  actor: "CEO",            step: "Opens Enterprise Trust Intelligence Network — network score 98%" },
  { id: 2,  actor: "CEO",            step: "Reviews customer scale 94%, partner scale 92%, board execution 95%" },
  { id: 3,  actor: "CS lead",        step: "Opens Customer Trust Scale — 1 proof asset awaiting external-use approval" },
  { id: 4,  actor: "Partner lead",   step: "Opens Partner Trust Scale — API partner has enablement trust gap" },
  { id: 5,  actor: "Board admin",    step: "Opens Board Trust Execution — 2 board-use evidence items pending approval" },
  { id: 6,  actor: "RevOps",         step: "Opens Durable Revenue Trust Systems — 1 concentration exception" },
  { id: 7,  actor: "MP leader",      step: "Opens Marketplace Trust Optimization — Southeast density weak; preferred-carrier approval pending" },
  { id: 8,  actor: "CISO",           step: "Opens Trust Boundary Center — 1 external-use approval overdue" },
  { id: 9,  actor: "CEO",            step: "Opens Enterprise Trust Exception Network — 4 high-risk exceptions" },
  { id: 10, actor: "Board admin",    step: "Generates Board Trust Intelligence Report (network + scale + exceptions + decisions)" },
  { id: 11, actor: "ELT",            step: "Reviews Long-Term Trust Intelligence Roadmap (Q+1 → 36 months)" },
  { id: 12, actor: "CEO",            step: "Approves remediation plan — HITL preserved end-to-end" },
];

export const V21_PHASE56_TEASER = {
  version: "V21.5",
  themes: [
    "Enterprise trust network scale",
    "Customer trust lifecycle intelligence",
    "Partner trust lifecycle intelligence",
    "Board trust intelligence maturity",
    "Durable revenue trust optimization",
    "Marketplace trust network governance",
  ],
};
