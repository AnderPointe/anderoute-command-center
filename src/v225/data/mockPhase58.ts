// V22.5 Enterprise Lifecycle Trust Automation Scale — mock data. Illustrative only.

const matrix = (label: string) => [
  { control: `${label} signal scale`,            status: "Passing", owner: "Trust eng" },
  { control: `${label} owner coverage at scale`, status: "Passing", owner: "Trust ops" },
  { control: `${label} evidence lifecycle scale`,status: "Watch",   owner: "Evidence" },
  { control: `${label} approval routing scale`,  status: "HITL",    owner: "Governance" },
  { control: `${label} boundary maturity`,       status: "Passing", owner: "Security" },
  { control: `${label} audit scale`,             status: "Passing", owner: "Audit" },
  { control: `${label} exception operations`,    status: "Watch",   owner: "Remediation" },
  { control: `${label} outcome optimization`,    status: "Passing", owner: "Ops excellence" },
];
const exc = (prefix: string, area: string) => [
  { id: `${prefix}-1`, control: area, desc: `${area} lifecycle-scale exception requires HITL`, owner: "Security", risk: "High",   sla: "24h" },
  { id: `${prefix}-2`, control: area, desc: `${area} evidence refresh overdue at scale`,        owner: "Evidence", risk: "Medium", sla: "72h" },
];
const rem = (prefix: string) => [
  { id: `${prefix}R-1`, action: "Refresh stale lifecycle evidence at scale", owner: "Evidence", due: "7d",  status: "In progress" },
  { id: `${prefix}R-2`, action: "Close exception with HITL approval",        owner: "Security", due: "3d",  status: "Open" },
  { id: `${prefix}R-3`, action: "Tune policy from lifecycle-scale lesson",   owner: "AI Gov.",  due: "14d", status: "Open" },
];
const pack = (label: string, score: number, kpis: { label: string; value: string | number }[]) => ({
  score, kpis, matrix: matrix(label),
  exceptions: exc(label.replace(/\s+/g, "").slice(0, 3).toUpperCase(), label),
  remediation: rem(label.slice(0, 3).toUpperCase()),
});

export const V225_SCOPE = {
  version: "V22.5",
  in_scope: [
    "Enterprise Lifecycle Trust Automation Scale",
    "Board Lifecycle Assurance Intelligence",
    "Revenue Lifecycle Trust Optimization",
    "Marketplace Lifecycle Governance",
    "Customer Lifecycle Trust Maturity", "Partner Lifecycle Trust Maturity",
    "Executive Lifecycle Assurance Command",
    "Lifecycle Evidence Scale Governance",
    "Customer Lifecycle Boundary Maturity", "Partner Lifecycle Boundary Maturity",
    "Human Approval Lifecycle Scale",
    "Recommendation Lifecycle Automation Governance",
    "Outcome Lifecycle Trust Optimization",
    "Trust Audit Lifecycle Scale", "Trust Risk Lifecycle Intelligence",
    "Capital Lifecycle Trust Readiness",
    "Product Lifecycle Trust Scale", "Category Lifecycle Trust Maturity",
    "Enterprise Lifecycle Exception Operations",
    "Board Lifecycle Trust Reporting", "Long-Term Lifecycle Trust Automation Roadmap",
  ],
  deferred: [
    "Fully autonomous dispatch / pricing / billing / marketplace / capital / board",
    "Final IPO / acquisition / audited-financial claims",
    "Final SOC 2 / ISO / Android Auto / CarPlay without evidence",
    "Customs production, international tax, insurance underwriting, autonomous vehicles",
  ],
};

export const V225_FEATURE_MATRIX = [
  { feature: "Lifecycle Trust Automation Scale Score", status: "Live", hitl: "n/a" },
  { feature: "Board Lifecycle Assurance Intelligence", status: "Live", hitl: "Approval + redaction" },
  { feature: "Revenue Lifecycle Trust Optimization",   status: "Live", hitl: "Concentration + churn" },
  { feature: "Marketplace Lifecycle Governance",       status: "Live", hitl: "Award + dispute + preferred" },
  { feature: "Customer Lifecycle Trust Maturity",      status: "Live", hitl: "Publishing + comms" },
  { feature: "Partner Lifecycle Trust Maturity",       status: "Live", hitl: "Publishing + comms" },
  { feature: "Evidence Lifecycle Scale Governance",    status: "Live", hitl: "External + board use" },
  { feature: "Human Approval Lifecycle Scale",         status: "Live", hitl: "All high-impact" },
  { feature: "Capital Lifecycle Trust Readiness",      status: "Live", hitl: ">$25k two-person" },
  { feature: "Autonomous high-impact actions",         status: "Deferred", hitl: "Always HITL" },
];

export const V225_HEADLINE = {
  headline: "V22.5 lifecycle trust automation scale live — 98% scale score, all high-impact actions HITL-gated at scale.",
  highlights: [
    "Board assurance intelligence 95% · Revenue optimization 94% · MP governance 93%",
    "Customer maturity 95% · Partner maturity 94% · Evidence scale 96%",
    "Approval scale 97% · Recommendation automation 95% · Outcome optimization 95%",
    "Audit scale 95% · Risk intelligence 93% · Capital readiness 94%",
    "0 autonomous high-impact actions · 100% lifecycle audit coverage at scale",
  ],
};

export const V225_AUTOMATION    = pack("Enterprise lifecycle trust automation scale", 98, [
  { label: "Scale score", value: "98%" }, { label: "Domain coverage", value: "20/20" },
  { label: "HITL coverage", value: "100%" }, { label: "Open exceptions", value: 7 },
]);
export const V225_BOARD_ASSURE  = pack("Board lifecycle assurance intelligence", 95, [
  { label: "Packet assurance", value: "96%" }, { label: "Decision evidence", value: "95%" },
  { label: "Board-use approvals", value: "2 open" }, { label: "Readiness blockers", value: 1 },
]);
export const V225_REVENUE       = pack("Revenue lifecycle trust optimization", 94, [
  { label: "Renewal opt.", value: "95%" }, { label: "Expansion opt.", value: "93%" },
  { label: "Concentration", value: "1 exc" }, { label: "Evidence refresh", value: 2 },
]);
export const V225_MP            = pack("Marketplace lifecycle governance", 93, [
  { label: "Carrier density", value: "91%" }, { label: "Lane liquidity", value: "94%" },
  { label: "Southeast", value: "Weak" }, { label: "Award latency", value: "-20%" },
]);
export const V225_CUSTOMER      = pack("Customer lifecycle trust maturity", 95, [
  { label: "Onboarding", value: "96%" }, { label: "Adoption", value: "95%" },
  { label: "External-use proof", value: "1 pending" }, { label: "Boundary", value: "Passing" },
]);
export const V225_PARTNER       = pack("Partner lifecycle trust maturity", 94, [
  { label: "Onboarding", value: "95%" }, { label: "Integration", value: "94%" },
  { label: "Enablement", value: "1 gap" }, { label: "Boundary", value: "Passing" },
]);
export const V225_EXEC          = pack("Executive lifecycle assurance command", 96, [
  { label: "CEO queue", value: 3 }, { label: "CFO queue", value: 2 },
  { label: "Overdue approvals", value: 1 }, { label: "Escalations", value: 0 },
]);
export const V225_EVIDENCE      = pack("Lifecycle evidence scale governance", 96, [
  { label: "Freshness", value: "Refresh 3" }, { label: "Completeness", value: "97%" },
  { label: "External-use", value: "1 overdue" }, { label: "Board-use ready", value: "Yes" },
]);
export const V225_CUST_BOUNDARY = pack("Customer lifecycle boundary maturity", 97, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Comms approvals", value: "HITL" }, { label: "Tenant isolation", value: "Current" },
]);
export const V225_PART_BOUNDARY = pack("Partner lifecycle boundary maturity", 96, [
  { label: "Data boundary", value: "Passing" }, { label: "Portal exposure", value: "Passing" },
  { label: "Joint-customer", value: "Consented" }, { label: "Integration boundary", value: "Passing" },
]);
export const V225_APPROVAL      = pack("Human approval lifecycle scale", 97, [
  { label: "Coverage at scale", value: "100%" }, { label: "SLA health", value: "98%" },
  { label: "Backup approver", value: "100%" }, { label: "Override audited", value: "Yes" },
]);
export const V225_REC           = pack("Recommendation lifecycle automation governance", 95, [
  { label: "Explainability", value: "96%" }, { label: "Confidence calibration", value: "On" },
  { label: "Policy compliance", value: "100%" }, { label: "Outcome linkage", value: "95%" },
]);
export const V225_OUTCOME       = pack("Outcome lifecycle trust optimization", 95, [
  { label: "Approved outcomes", value: "95%" }, { label: "Lessons captured", value: "Yes" },
  { label: "Calibration drift", value: "<3%" }, { label: "Board visible", value: "Monthly" },
]);
export const V225_AUDIT         = pack("Trust audit lifecycle scale", 95, [
  { label: "Schedule", value: "96%" }, { label: "Owner coverage", value: "100%" },
  { label: "Findings", value: "-26%" }, { label: "Retest", value: "On track" },
]);
export const V225_RISK          = pack("Trust risk lifecycle intelligence", 93, [
  { label: "Signal quality", value: "95%" }, { label: "Mitigation", value: "94%" },
  { label: "Recurrence tracking", value: "On" }, { label: "Board visibility", value: "Yes" },
]);
export const V225_CAPITAL       = pack("Capital lifecycle trust readiness", 94, [
  { label: "Data room", value: "95%" }, { label: "External-use approvals", value: "On" },
  { label: "Two-person sign-off >$25k", value: "Enforced" }, { label: "Audit", value: "96%" },
]);
export const V225_PRODUCT       = pack("Product lifecycle trust scale", 93, [
  { label: "Adoption", value: "94%" }, { label: "Reliability", value: "95%" },
  { label: "Support burden", value: "Watch" }, { label: "Audit", value: "94%" },
]);
export const V225_CATEGORY      = pack("Category lifecycle trust maturity", 92, [
  { label: "Narrative", value: "93%" }, { label: "Proof assets", value: "91%" },
  { label: "Publishing approvals", value: "HITL" }, { label: "External-use approvals", value: "On" },
]);
export const V225_EXCEPTION     = pack("Enterprise lifecycle exception operations", 91, [
  { label: "Open exceptions", value: 7 }, { label: "High risk", value: 4 },
  { label: "Remediation in flight", value: 5 }, { label: "Board visible", value: 3 },
]);

export const V225_BOARD_REPORT = {
  score: 95,
  kpis: [
    { label: "Automation scale", value: "98%" }, { label: "Board assurance", value: "95%" },
    { label: "Revenue opt.", value: "94%" }, { label: "MP governance", value: "93%" },
    { label: "Customer maturity", value: "95%" }, { label: "Partner maturity", value: "94%" },
    { label: "Evidence scale", value: "96%" }, { label: "Approval scale", value: "97%" },
  ],
  matrix: [
    { section: "Enterprise lifecycle trust automation scale", status: "Strong", owner: "CEO" },
    { section: "Board lifecycle assurance intelligence",      status: "Strong", owner: "Board Office" },
    { section: "Revenue lifecycle trust optimization",        status: "Strong", owner: "CFO/CRO" },
    { section: "Marketplace lifecycle governance",            status: "Watch",  owner: "MP leader" },
    { section: "Customer lifecycle trust maturity",           status: "Strong", owner: "CCO" },
    { section: "Partner lifecycle trust maturity",            status: "Watch",  owner: "Partner Ops" },
    { section: "Evidence lifecycle scale governance",         status: "Strong", owner: "CISO" },
    { section: "Boundary lifecycle maturity",                 status: "Strong", owner: "CISO" },
    { section: "Approval / Rec / Outcome lifecycle scale",    status: "Strong", owner: "Governance" },
    { section: "Audit lifecycle scale",                       status: "Strong", owner: "Audit" },
    { section: "Risk lifecycle intelligence",                 status: "Watch",  owner: "Risk" },
    { section: "Capital / Product / Category lifecycle",      status: "Strong", owner: "ELT" },
    { section: "Lifecycle exceptions",                        status: "Watch",  owner: "Risk" },
    { section: "Decisions needed",                            status: "2 open", owner: "CEO/CFO" },
    { section: "Next-quarter priorities",                     status: "Drafted",owner: "ELT" },
  ],
};

export const V225_ROADMAP = {
  score: 93,
  horizons: [
    { horizon: "Current Q", focus: "Close 7 lifecycle exceptions; refresh 3 evidence items at scale" },
    { horizon: "Next Q",    focus: "Deepen recommendation + outcome lifecycle automation governance" },
    { horizon: "6 months",  focus: "Revenue + MP lifecycle automation expansion (HITL preserved)" },
    { horizon: "12 months", focus: "Board lifecycle assurance + capital lifecycle readiness scale" },
    { horizon: "24 months", focus: "Product + category lifecycle automation scale" },
    { horizon: "36 months", focus: "Trust-led category leadership at lifecycle automation scale" },
  ],
};

export const V225_REPORTS = [
  "Enterprise lifecycle trust automation scale", "Board lifecycle assurance intelligence",
  "Revenue lifecycle trust optimization", "Marketplace lifecycle governance",
  "Customer lifecycle trust maturity", "Partner lifecycle trust maturity",
  "Executive lifecycle assurance command", "Lifecycle evidence scale governance",
  "Customer lifecycle boundary maturity", "Partner lifecycle boundary maturity",
  "Human approval lifecycle scale", "Recommendation lifecycle automation governance",
  "Outcome lifecycle trust optimization", "Trust audit lifecycle scale",
  "Trust risk lifecycle intelligence", "Capital lifecycle trust readiness",
  "Product lifecycle trust scale", "Category lifecycle trust maturity",
  "Enterprise lifecycle exception operations", "Board lifecycle trust reporting",
  "Long-term lifecycle trust automation roadmap",
].map((name, i) => ({ id: `RPT225-${i + 1}`, name, owner: "Trust ops", status: "Ready" }));

export const V225_RLS = [
  { policy: "v225_company_lifecycle_view",     rule: "company_id = current_company() AND has_role(auth.uid(), company_id, 'admin')", surface: "tenant lifecycle records" },
  { policy: "v225_platform_scale_view",        rule: "is_platform_owner(auth.uid())",                                                  surface: "automation scale / audit / exception platform tables" },
  { policy: "v225_executive_view",             rule: "has_role(auth.uid(), company_id, 'admin') OR has_role(...,'owner')",            surface: "executive command / capital / risk / exceptions" },
  { policy: "v225_board_report_view",          rule: "has_role(auth.uid(), company_id, 'board_viewer') AND report.approved = true",   surface: "board_lifecycle_trust_reports" },
  { policy: "v225_security_admin_manage",      rule: "has_role(auth.uid(), company_id, 'security_admin')",                            surface: "boundary maturity / audit scale / exception ops / approval scale" },
  { policy: "v225_revops_manage",              rule: "has_role(auth.uid(), company_id, 'revops')",                                    surface: "revenue lifecycle trust optimization" },
  { policy: "v225_mp_leader_manage",           rule: "has_role(auth.uid(), company_id, 'mp_leader')",                                 surface: "marketplace lifecycle governance" },
  { policy: "v225_cs_assigned_customers",      rule: "customer_id IN (SELECT customer_id FROM customer_users WHERE user_id = auth.uid())", surface: "customer lifecycle trust maturity" },
  { policy: "v225_partner_mgr_manage",         rule: "has_role(auth.uid(), company_id, 'partner_manager')",                           surface: "partner lifecycle trust maturity" },
  { policy: "v225_product_lead_manage",        rule: "has_role(auth.uid(), company_id, 'product_lead')",                              surface: "product lifecycle trust scale" },
  { policy: "v225_category_lead_manage",       rule: "has_role(auth.uid(), company_id, 'category_lead')",                             surface: "category lifecycle trust maturity" },
  { policy: "v225_hitl_required",              rule: "high_impact = true REQUIRES approver_id <> recommender_id",                     surface: "all HITL flows" },
  { policy: "v225_capital_two_person",         rule: "capital_action AND amount_usd > 25000 REQUIRES two distinct approver_ids",     surface: "capital lifecycle readiness" },
  { policy: "v225_evidence_append_only",       rule: "UPDATE/DELETE DENIED on evidence; append-only via versions",                    surface: "evidence lifecycle scale" },
  { policy: "v225_customer_user_block",        rule: "customer users blocked from internal automation / audit / capital / board / exception", surface: "internal lifecycle" },
  { policy: "v225_carrier_user_block_mp",      rule: "carrier users blocked from MP internals unless explicitly exposed",             surface: "marketplace internals" },
  { policy: "v225_partner_user_approved_only", rule: "partner users see only approved partner-facing lifecycle records",              surface: "partner-facing lifecycle" },
];

export const V225_EDGE = {
  rule: "App-internal lifecycle logic = TanStack createServerFn (requireSupabaseAuth + role). External callers = /api/public/v225/* with HMAC-verified signatures. No autonomous dispatch/pricing/billing.",
  serverfn: [
    "calculate-v225-lifecycle-trust-automation-score","generate-lifecycle-trust-automation-summary",
    "detect-lifecycle-trust-automation-gaps","generate-lifecycle-trust-automation-action-plan",
    "calculate-board-lifecycle-assurance-intelligence","detect-board-lifecycle-assurance-exceptions",
    "generate-board-lifecycle-trust-report","calculate-revenue-lifecycle-trust-optimization",
    "detect-revenue-lifecycle-trust-exceptions","generate-revenue-lifecycle-optimization-plan",
    "calculate-marketplace-lifecycle-governance","detect-marketplace-lifecycle-governance-exceptions",
    "generate-marketplace-lifecycle-governance-plan","calculate-customer-lifecycle-trust-maturity",
    "calculate-partner-lifecycle-trust-maturity","detect-customer-lifecycle-trust-exceptions",
    "detect-partner-lifecycle-trust-exceptions","calculate-lifecycle-evidence-scale-governance",
    "calculate-customer-lifecycle-boundary-maturity","calculate-partner-lifecycle-boundary-maturity",
    "calculate-human-approval-lifecycle-scale","calculate-recommendation-lifecycle-automation-governance",
    "calculate-outcome-lifecycle-trust-optimization","calculate-trust-audit-lifecycle-scale",
    "calculate-trust-risk-lifecycle-intelligence","calculate-capital-lifecycle-trust-readiness",
    "calculate-product-lifecycle-trust-scale","calculate-category-lifecycle-trust-maturity",
    "route-enterprise-lifecycle-exception","calculate-enterprise-lifecycle-exception-score",
    "generate-long-term-lifecycle-trust-automation-roadmap",
  ].map(name => ({ name, kind: "ServerFn", auth: "requireSupabaseAuth + role" })),
  edge_routes: [
    { path: "/api/public/v225/health",            purpose: "Liveness probe (no PII)" },
    { path: "/api/public/v225/trust-webhook",     purpose: "External trust signal ingest (HMAC-verified)" },
    { path: "/api/public/v225/board-distribute",  purpose: "Approved-only board packet distribution (signed link)" },
    { path: "/api/public/v225/partner-callback",  purpose: "Partner system callback (HMAC-verified)" },
  ],
};

export const V225_GUARDRAILS = [
  "No fully autonomous dispatch, pricing, billing, marketplace, capital, board.",
  "Every high-impact assist requires human approval (approver_id ≠ recommender_id).",
  "Capital actions > $25k require two-person sign-off.",
  "Append-only evidence; no in-place mutation.",
  "RBAC + RLS + tenant isolation enforced across all lifecycle scale records.",
  "Customer / carrier / partner users blocked from internal lifecycle, audit, capital, board, exception records.",
];

export const V225_DEMO = [
  { id: 1,  actor: "CEO",          step: "Opens Enterprise Lifecycle Trust Automation Scale Center — score 98%" },
  { id: 2,  actor: "CEO",          step: "Board assurance 95%, revenue 94%, MP 93%, customer 95%, partner 94%" },
  { id: 3,  actor: "Board admin",  step: "Board Lifecycle Assurance Intelligence — 2 board-use evidence approvals pending; 1 readiness blocker → CFO" },
  { id: 4,  actor: "RevOps",       step: "Revenue Lifecycle Trust Optimization — 1 concentration exception; 2 stale evidence to refresh" },
  { id: 5,  actor: "MP leader",    step: "Marketplace Lifecycle Governance — Southeast weak; preferred-carrier rec pending approval" },
  { id: 6,  actor: "CCO",          step: "Customer Lifecycle Trust Maturity — 1 customer proof asset awaiting external-use approval" },
  { id: 7,  actor: "Partner Ops",  step: "Partner Lifecycle Trust Maturity — API partner enablement maturity gap; partner-facing evidence pending publish approval" },
  { id: 8,  actor: "CISO",         step: "Lifecycle Evidence Scale Governance — 1 stale evidence; 1 external-use overdue; tenant isolation current" },
  { id: 9,  actor: "Governance",   step: "Human Approval Lifecycle Scale — approver_id ≠ recommender_id enforced; backup approver coverage 100%" },
  { id: 10, actor: "Risk",         step: "Enterprise Lifecycle Exception Ops — 4 high-risk exceptions: MP SE, customer proof, partner enablement, board evidence" },
  { id: 11, actor: "Board admin",  step: "Generates Board Lifecycle Trust Report (automation scale + lifecycle KPIs + exceptions + decisions + Q+1 priorities)" },
  { id: 12, actor: "ELT",          step: "Reviews Long-Term Lifecycle Trust Automation Roadmap (Q+1 → 36 months)" },
];

export const V225_PHASE59_TEASER = {
  version: "V23",
  themes: [
    "Enterprise trust automation operating network",
    "Customer/partner lifecycle intelligence scale",
    "Board trust assurance execution",
    "Revenue trust automation systems",
    "Marketplace trust automation governance",
  ],
};
