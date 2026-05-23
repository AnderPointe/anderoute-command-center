// V16 — Enterprise Autonomous-Assist Operating Governance (mock)

export const V16_SCOPE = [
  { area: "Assist governance command", status: "in_progress", note: "Score, KPIs, policy compliance" },
  { area: "Predictive performance intelligence", status: "in_progress", note: "Signals + confidence + freshness" },
  { area: "Predictive risk signals", status: "in_progress", note: "15 risk categories" },
  { area: "Recommendation governance maturity", status: "in_progress", note: "Policy / thresholds / exceptions" },
  { area: "Human-in-the-loop approvals", status: "in_progress", note: "All high-impact actions" },
  { area: "Explainability + evidence", status: "in_progress", note: "Signal, weights, alternatives, evidence" },
  { area: "Outcome learning loops", status: "in_progress", note: "Predicted vs realized, lessons" },
  { area: "Capital-grade board intel", status: "in_progress", note: "Board KPI + decision queue" },
  { area: "Exec + board decision intel", status: "in_progress", note: "Decision evidence + outcomes" },
  { area: "MP optimization intel + controls", status: "in_progress", note: "Lane/region + approval gates" },
  { area: "Domain intel controls", status: "in_progress", note: "Revenue / capital / account / partner / product / category" },
  { area: "Strategic control maturity", status: "in_progress", note: "Matrix + testing + remediation" },
  { area: "Long-term roadmap", status: "in_progress", note: "6 horizons across 14 tracks" },
  { area: "Autonomous dispatch", status: "deferred", note: "Not in V16" },
  { area: "Autonomous pricing / billing / capital / board actions", status: "deferred", note: "Human-approved only" },
  { area: "IPO / SOC2 / ISO / CarPlay / Android Auto claims", status: "deferred", note: "Evidence-tracked, not certified" },
];

export const V16_FEATURE_MATRIX = [
  { feature: "Assist governance score", maturity: "L4 — measured", owner: "Chief of Staff" },
  { feature: "Predictive performance signals", maturity: "L3 — defined", owner: "Chief Data Officer" },
  { feature: "Predictive risk signals", maturity: "L3 — defined", owner: "Risk" },
  { feature: "Recommendation governance", maturity: "L4 — measured", owner: "Head of Intelligence" },
  { feature: "HITL approval governance", maturity: "L4 — measured", owner: "Chief of Staff" },
  { feature: "Explainability maturity", maturity: "L3 — defined", owner: "Head of Intelligence" },
  { feature: "Evidence maturity", maturity: "L3 — defined", owner: "Strategic Finance" },
  { feature: "Outcome learning loop", maturity: "L3 — defined", owner: "FP&A" },
  { feature: "Capital-grade board intel", maturity: "L3 — defined", owner: "CFO + Corp Sec" },
  { feature: "Exec decision intel", maturity: "L3 — defined", owner: "CEO Office" },
  { feature: "Board decision intel", maturity: "L3 — defined", owner: "Corp Sec" },
  { feature: "MP optimization intel", maturity: "L3 — defined", owner: "MP GM" },
  { feature: "Strategic control maturity", maturity: "L4 — measured", owner: "Security / Risk" },
  { feature: "Long-term roadmap", maturity: "L3 — defined", owner: "Chief of Staff" },
];

export const V16_HEADLINE = {
  headline: "V16 autonomous-assist governance: predict, recommend, explain, approve, learn",
  highlights: [
    "Assist governance score 94 · approval SLA 91% · explainability 89%",
    "126 active recommendations across 8 domains — 0 executed without approval",
    "Outcome learning loop closed on 71 of 94 historical recs (±9% lift vs predicted)",
    "Capital, board, marketplace, pricing, billing actions remain human-approved",
  ],
};

export const V16_ASSIST_GOV = {
  score: 94,
  kpis: [
    { label: "Rec volume (30d)", value: 126, sub: "8 domains" },
    { label: "Approval rate", value: "73%", sub: "of all recs" },
    { label: "Rejection rate", value: "19%", sub: "with reason" },
    { label: "Approval SLA", value: "91%", sub: "< 24h" },
    { label: "High-risk recs", value: 11, sub: "L1/L2 approval" },
    { label: "Overdue approvals", value: 3, sub: "escalated" },
    { label: "Explainability", value: "89%", sub: "complete" },
    { label: "Evidence completeness", value: "84%", sub: "vs target 90%" },
    { label: "Outcome tracking", value: "82%", sub: "of closed recs" },
    { label: "Audit trail", value: "100%", sub: "approvals logged" },
    { label: "Policy compliance", value: "97%", sub: "rolling 30d" },
    { label: "Cost governance", value: "$1,820", sub: "AI spend 30d" },
  ],
  policy_compliance: [
    { policy: "No self-approval", status: "passing", last_tested: "today" },
    { policy: "Evidence required for L1/L2", status: "passing", last_tested: "today" },
    { policy: "Explainability complete before execution", status: "watchlist", last_tested: "today" },
    { policy: "Outcome tracked within 30d", status: "passing", last_tested: "today" },
    { policy: "Model + prompt version recorded", status: "passing", last_tested: "today" },
  ],
  risks: [
    { area: "Marketplace pricing recs", risk: "Confidence < 70% on 4 lanes", severity: "medium" },
    { area: "Capital evidence freshness", risk: "2 evidence artifacts > 60d old", severity: "medium" },
    { area: "Category proof publishing", risk: "External-use approval pending", severity: "low" },
  ],
};

export const V16_PREDICTIVE_PERF = {
  score: 86,
  signals: [
    { area: "Enterprise performance", value: "+4.2% QoQ", confidence: 0.88, fresh: "1d", quality: "A" },
    { area: "Revenue durability", value: "NRR 117%", confidence: 0.91, fresh: "1d", quality: "A" },
    { area: "Marketplace scale", value: "$48M GMV", confidence: 0.84, fresh: "2d", quality: "A" },
    { area: "Strategic accounts", value: "12 expansion", confidence: 0.79, fresh: "3d", quality: "B" },
    { area: "Partner ecosystem", value: "$6.1M ARR", confidence: 0.74, fresh: "4d", quality: "B" },
    { area: "Product line", value: "82% adoption", confidence: 0.81, fresh: "2d", quality: "A" },
    { area: "Capital evidence", value: "84% complete", confidence: 0.86, fresh: "5d", quality: "B" },
    { area: "Commercial diligence", value: "9 open items", confidence: 0.77, fresh: "3d", quality: "B" },
    { area: "Category leadership", value: "#2 share", confidence: 0.72, fresh: "7d", quality: "C" },
    { area: "Strategic risk", value: "3 elevated", confidence: 0.83, fresh: "1d", quality: "A" },
    { area: "Board decisions", value: "4 pending", confidence: 0.95, fresh: "1d", quality: "A" },
  ],
  freshness: { sla_24h: "78%", sla_72h: "94%", stale_signals: 2 },
  recommendation_readiness: 88,
};

export const V16_RISK_SIGNALS = {
  score: 76,
  heatmap: [
    { category: "Revenue durability", level: "low", trend: "stable" },
    { category: "Customer concentration", level: "medium", trend: "rising" },
    { category: "Renewal risk", level: "low", trend: "improving" },
    { category: "Expansion risk", level: "low", trend: "stable" },
    { category: "Marketplace scale", level: "medium", trend: "stable" },
    { category: "Carrier density (SE)", level: "high", trend: "rising" },
    { category: "Equipment coverage", level: "medium", trend: "stable" },
    { category: "Partner dependency", level: "medium", trend: "stable" },
    { category: "Product support burden", level: "low", trend: "improving" },
    { category: "Capital evidence", level: "medium", trend: "stable" },
    { category: "Commercial diligence", level: "low", trend: "stable" },
    { category: "Category proof", level: "medium", trend: "rising" },
    { category: "Board action", level: "low", trend: "stable" },
    { category: "Compliance / controls", level: "low", trend: "stable" },
    { category: "AI governance", level: "low", trend: "stable" },
  ],
  queued_recs: [
    { rec: "Recruit 8 preferred carriers in SE corridor", risk: "carrier density", approver: "MP GM" },
    { rec: "Refresh revenue durability evidence pack", risk: "capital evidence", approver: "CFO" },
    { rec: "Publish category proof case study (3 customers)", risk: "category proof", approver: "CMO" },
  ],
};

export const V16_REC_GOVERNANCE = {
  score: 88,
  policy_matrix: [
    { category: "Marketplace recs", confidence_min: 0.75, risk_max: "medium", approver: "MP GM", evidence: "required" },
    { category: "Pricing recs", confidence_min: 0.85, risk_max: "medium", approver: "CRO + CFO", evidence: "required" },
    { category: "Revenue expansion", confidence_min: 0.7, risk_max: "medium", approver: "CRO", evidence: "required" },
    { category: "Capital actions", confidence_min: 0.9, risk_max: "low", approver: "CFO + Board", evidence: "required" },
    { category: "Board actions", confidence_min: 0.9, risk_max: "low", approver: "Board", evidence: "required" },
    { category: "Strategic risk", confidence_min: 0.8, risk_max: "medium", approver: "Risk + Exec", evidence: "required" },
    { category: "Category proof external-use", confidence_min: 0.8, risk_max: "low", approver: "CMO + Legal", evidence: "required" },
  ],
  exceptions: [
    { rec: "REC-2104 MP lane reprice (Southeast)", reason: "Confidence 0.71 < 0.75 floor", status: "blocked" },
    { rec: "REC-2118 Capital evidence refresh", reason: "Stale source > 60d", status: "remediation" },
  ],
  escalations: [
    { rec: "REC-2091 strategic account churn save", to: "CEO", reason: "Approver SLA breach +6h" },
  ],
};

export const V16_HITL_APPROVALS = {
  areas: [
    { area: "Dispatch rec", approver: "Dispatch lead", sla_h: 4, evidence: "shipment + carrier" },
    { area: "Revenue rec", approver: "CRO", sla_h: 24, evidence: "account + signals" },
    { area: "Marketplace rec", approver: "MP GM", sla_h: 24, evidence: "lane + carrier" },
    { area: "Pricing rec", approver: "CRO + CFO", sla_h: 48, evidence: "deal + margin" },
    { area: "Deal desk rec", approver: "Deal desk + CFO", sla_h: 48, evidence: "deal + risk" },
    { area: "Customer expansion", approver: "CRO", sla_h: 24, evidence: "account + product fit" },
    { area: "Carrier action", approver: "MP GM", sla_h: 24, evidence: "carrier + compliance" },
    { area: "Partner action", approver: "Partner lead", sla_h: 48, evidence: "partner + revenue" },
    { area: "Product investment", approver: "CPO + CFO", sla_h: 72, evidence: "evidence pack" },
    { area: "Capital action", approver: "CFO + Board", sla_h: 96, evidence: "board pack" },
    { area: "Board action", approver: "Board", sla_h: 168, evidence: "board pack" },
    { area: "Strategic risk", approver: "Risk + Exec", sla_h: 48, evidence: "risk register" },
    { area: "Compliance action", approver: "Compliance + Legal", sla_h: 72, evidence: "control + audit" },
    { area: "Evidence publication", approver: "CMO + Legal", sla_h: 72, evidence: "artifact + sign-off" },
  ],
  audit_log: [
    { ts: "T-3h", rec: "REC-2103", action: "approved", actor: "CRO", reason: "Evidence complete; risk acceptable" },
    { ts: "T-7h", rec: "REC-2099", action: "rejected", actor: "CFO", reason: "Confidence 0.68 below pricing floor" },
    { ts: "T-1d", rec: "REC-2087", action: "escalated", actor: "Auto", reason: "SLA breach +6h, routed to CEO" },
    { ts: "T-1d", rec: "REC-2076", action: "approved", actor: "MP GM", reason: "Carrier density risk mitigation" },
  ],
};

export const V16_EXPLAINABILITY = {
  score: 89,
  sample_explanation: {
    rec_id: "REC-2104",
    signal: "Southeast lane spread widening (>14% above 30d median)",
    why_matters: "Pricing erosion on 7 active lanes; expected $180k GP impact next quarter",
    sources: ["lane_quotes_v3", "carrier_density_signals", "win_rate_by_lane"],
    missing_data: ["competitor_quote_index (3d stale)"],
    confidence: 0.71,
    risk: "medium",
    expected_impact: "+$120k GP / quarter (range $60k–$180k)",
    no_action_impact: "-$180k GP / quarter if uncorrected",
    alternatives: [
      { option: "Recruit preferred carriers (SE)", impact: "+$90k GP", risk: "low" },
      { option: "Selective customer reprice", impact: "+$140k GP", risk: "medium" },
      { option: "No action", impact: "-$180k GP", risk: "high" },
    ],
    approver: "MP GM + CRO",
    evidence_attached: true,
    audit_link: "audit://rec/REC-2104",
    outcome_metric: "lane_gp_30d",
  },
  completeness_by_field: [
    { field: "Detected signal", pct: 99 },
    { field: "Why it matters", pct: 96 },
    { field: "Source data", pct: 94 },
    { field: "Missing data flagged", pct: 78 },
    { field: "Confidence + risk", pct: 100 },
    { field: "Expected impact range", pct: 82 },
    { field: "No-action impact", pct: 76 },
    { field: "Alternatives ≥ 2", pct: 71 },
    { field: "Required approver", pct: 99 },
    { field: "Evidence attached", pct: 84 },
    { field: "Audit link", pct: 100 },
    { field: "Outcome metric defined", pct: 88 },
  ],
};

export const V16_EVIDENCE = {
  score: 84,
  by_type: [
    { type: "Source signal", count: 412, fresh_pct: 92 },
    { type: "Customer / account", count: 187, fresh_pct: 88 },
    { type: "Marketplace", count: 246, fresh_pct: 81 },
    { type: "Revenue", count: 173, fresh_pct: 90 },
    { type: "Partner", count: 64, fresh_pct: 76 },
    { type: "Product-line", count: 122, fresh_pct: 84 },
    { type: "Capital", count: 38, fresh_pct: 71 },
    { type: "Board", count: 21, fresh_pct: 95 },
    { type: "Risk", count: 57, fresh_pct: 87 },
    { type: "Approval", count: 318, fresh_pct: 99 },
    { type: "Outcome", count: 94, fresh_pct: 82 },
    { type: "Rejection reason", count: 41, fresh_pct: 100 },
  ],
  gaps: [
    { rec: "REC-2118", missing: "Refreshed AR aging snapshot" },
    { rec: "REC-2104", missing: "Competitor quote index (3d stale)" },
    { rec: "REC-2091", missing: "Customer health note from CSM" },
  ],
};

export const V16_OUTCOMES = {
  score: 82,
  timeline: [
    { rec: "REC-2087", created: "T-21d", approved: "T-19d", executed: "T-17d", measured: "T-2d", predicted: "+$90k", actual: "+$84k" },
    { rec: "REC-2076", created: "T-30d", approved: "T-28d", executed: "T-26d", measured: "T-4d", predicted: "+$140k", actual: "+$158k" },
    { rec: "REC-2061", created: "T-45d", approved: "T-43d", executed: "T-40d", measured: "T-10d", predicted: "+$60k", actual: "+$22k" },
    { rec: "REC-2052", created: "T-52d", approved: "T-50d", executed: "rejected", measured: "n/a", predicted: "-", actual: "-" },
  ],
  calibration: { within_10pct: 0.66, within_20pct: 0.84, false_positive_pct: 0.12, false_negative_pct: 0.08 },
  lessons: [
    { lesson: "Pricing rec confidence < 0.8 underperforms — raise floor to 0.85", owner: "Head of Intelligence" },
    { lesson: "MP lane recs benefit from carrier density overlay", owner: "MP GM" },
    { lesson: "Capital evidence freshness < 60d is the binding constraint", owner: "Strategic Finance" },
  ],
};

export const V16_BOARD_INTEL = {
  score: 90,
  kpis: [
    { label: "Enterprise perf", value: "+4.2%", sub: "QoQ" },
    { label: "Capital exec", value: "84%", sub: "evidence" },
    { label: "Revenue durability", value: "NRR 117%", sub: "TTM" },
    { label: "MP scale", value: "$48M", sub: "GMV TTM" },
    { label: "Category", value: "#2", sub: "share" },
    { label: "Strategic risks", value: 3, sub: "elevated" },
    { label: "Assist gov score", value: 94, sub: "of 100" },
    { label: "Decisions queued", value: 4, sub: "board" },
  ],
  rec_outcomes_summary: { approved: 92, rejected: 24, executed: 71, on_track: 58, off_track: 13 },
  approval_activity: { last_30d: 142, sla_met: 0.91, escalated: 5 },
  signals: [
    { signal: "MP scale +18% YoY", note: "Above plan; ensure carrier density" },
    { signal: "Customer concentration top-3 = 27%", note: "Mitigation rec pending" },
    { signal: "Refi window open 9wk", note: "Capital action prepared, board approval needed" },
  ],
  decisions_queue: [
    { decision: "Approve $5M growth investment in MP SE expansion", owner: "Board", due: "next mtg" },
    { decision: "Accept revenue durability evidence refresh plan", owner: "Audit cmte", due: "next mtg" },
    { decision: "Approve external-use of 3 customer proof studies", owner: "Board + Legal", due: "2wk" },
    { decision: "Ratify autonomous-assist governance policy v3", owner: "Board", due: "next mtg" },
  ],
};

export const V16_EXEC_DECISIONS = {
  score: 86,
  queue: [
    { id: "DEC-301", type: "Revenue durability", owner: "CRO", confidence: 0.84, risk: "medium", deadline: "T+5d", status: "evidence_pending" },
    { id: "DEC-302", type: "MP scale (SE)", owner: "MP GM", confidence: 0.79, risk: "medium", deadline: "T+3d", status: "ready" },
    { id: "DEC-303", type: "Capital evidence", owner: "CFO", confidence: 0.88, risk: "low", deadline: "T+7d", status: "ready" },
    { id: "DEC-304", type: "Strategic account expansion", owner: "CRO", confidence: 0.76, risk: "medium", deadline: "T+4d", status: "ready" },
    { id: "DEC-305", type: "AI governance policy", owner: "CTO + Risk", confidence: 0.92, risk: "low", deadline: "T+10d", status: "ready" },
  ],
  signals: [
    { decision: "DEC-301", signal: "NRR softening on 2 segments" },
    { decision: "DEC-302", signal: "Carrier density gap in SE corridor" },
    { decision: "DEC-303", signal: "Evidence pack 60d+ on 3 artifacts" },
  ],
};

export const V16_BOARD_DECISIONS = {
  score: 89,
  queue: [
    { id: "BD-21", type: "Capital strategy", confidence: 0.88, risk: "low", evidence_pct: 92 },
    { id: "BD-22", type: "Growth investment", confidence: 0.81, risk: "medium", evidence_pct: 84 },
    { id: "BD-23", type: "Strategic risk acceptance", confidence: 0.86, risk: "medium", evidence_pct: 78 },
    { id: "BD-24", type: "Governance policy", confidence: 0.94, risk: "low", evidence_pct: 96 },
  ],
};

export const V16_MP_OPTIMIZATION = {
  score: 83,
  signals: [
    { signal: "Regional liquidity (SE)", value: "0.62", trend: "down" },
    { signal: "Lane liquidity (Atlanta-Dallas)", value: "0.71", trend: "stable" },
    { signal: "Carrier density (SE)", value: "0.58", trend: "down" },
    { signal: "Equipment coverage (reefer)", value: "0.79", trend: "stable" },
    { signal: "Carrier quality", value: "97.1", trend: "up" },
    { signal: "Carrier compliance", value: "99.2%", trend: "stable" },
    { signal: "Load coverage 24h", value: "94%", trend: "up" },
    { signal: "Bid density", value: "5.8 avg", trend: "stable" },
    { signal: "Time-to-award", value: "11m", trend: "down (good)" },
    { signal: "Dispute trend", value: "0.6%", trend: "down (good)" },
  ],
  recommendations: [
    { rec: "Recruit 8 preferred carriers SE", approver: "MP GM", confidence: 0.82 },
    { rec: "Expand reefer coverage in Texas", approver: "MP GM", confidence: 0.78 },
    { rec: "Selective lane reprice (4 lanes)", approver: "MP GM + CRO", confidence: 0.71 },
  ],
};

function controlMatrix(domain: string, items: string[]) {
  return items.map((c, i) => ({
    control: c,
    coverage: 70 + ((i * 7 + domain.length * 3) % 30),
    last_tested: ["today", "1d", "3d", "7d"][i % 4],
    owner: ["Domain lead", "Security", "Risk", "RevOps"][i % 4],
    status: i % 5 === 0 ? "watchlist" : "passing",
  }));
}

export const V16_MP_CONTROLS = controlMatrix("mp", [
  "Marketplace recommendation controls", "Carrier action controls", "Customer impact controls",
  "Revenue impact controls", "Fee change (placeholder) controls", "Dispute review controls",
  "Settlement (placeholder) controls", "Carrier quality controls", "Carrier compliance controls",
  "Regional liquidity controls", "Lane liquidity controls", "Human approval controls", "Audit logging controls",
]);
export const V16_REV_CONTROLS = controlMatrix("rev", [
  "Renewal recommendation controls", "Expansion recommendation controls", "Churn prevention controls",
  "Customer concentration controls", "Product expansion controls", "Marketplace revenue controls",
  "API/EDI revenue controls", "Partner revenue controls", "Billing dispute controls",
  "Payment health controls", "Human approval controls", "Audit logging controls",
]);
export const V16_CAP_CONTROLS = controlMatrix("cap", [
  "Capital recommendation controls", "Data room evidence controls", "Investor/acquirer evidence controls",
  "Board evidence controls", "Revenue durability evidence controls", "Marketplace evidence controls",
  "Customer concentration evidence controls", "Strategic risk evidence controls",
  "External-use controls", "Human approval controls", "Audit logging controls",
]);
export const V16_ACCT_CONTROLS = controlMatrix("acct", [
  "Account expansion recommendation controls", "Renewal recommendation controls", "Churn prevention controls",
  "Customer communication controls", "Procurement action controls", "Trust asset controls",
  "Executive sponsor controls", "Customer proof controls", "Human approval controls", "Audit logging controls",
]);
export const V16_PARTNER_CONTROLS = controlMatrix("partner", [
  "Partner action recommendation controls", "Partner campaign recommendation controls",
  "Partner enablement recommendation controls", "Partner revenue recommendation controls",
  "Partner risk recommendation controls", "Partner communication controls",
  "Partner-facing evidence controls", "Human approval controls", "Audit logging controls",
]);
export const V16_PRODUCT_CONTROLS = controlMatrix("product", [
  "Product investment recommendation controls", "Product roadmap recommendation controls",
  "Product support burden controls", "Product reliability recommendation controls",
  "Product technical debt (placeholder) controls", "Product pricing/package recommendation controls",
  "Product category proof controls", "Human approval controls", "Audit logging controls",
]);
export const V16_CATEGORY_CONTROLS = controlMatrix("cat", [
  "Category narrative recommendation controls", "Market education recommendation controls",
  "Competitive positioning recommendation controls", "Proof publishing controls",
  "Customer proof external-use controls", "Marketplace proof external-use controls",
  "Partner proof external-use controls", "Sales narrative controls",
  "Website/demo narrative controls", "Human approval controls", "Audit logging controls",
]);

export const V16_CONTROL_MATURITY = {
  score: 87,
  categories: [
    { cat: "Autonomous-assist", score: 92 }, { cat: "Recommendation", score: 88 },
    { cat: "Approval", score: 91 }, { cat: "Explainability", score: 89 },
    { cat: "Outcome tracking", score: 82 }, { cat: "Revenue intel", score: 86 },
    { cat: "Marketplace intel", score: 84 }, { cat: "Capital intel", score: 81 },
    { cat: "Account intel", score: 83 }, { cat: "Partner intel", score: 79 },
    { cat: "Product intel", score: 85 }, { cat: "Category intel", score: 78 },
    { cat: "Board intel", score: 90 }, { cat: "Risk intel", score: 88 },
  ],
  testing_calendar: [
    { control: "HITL approval no-self-approval", next_test: "weekly" },
    { control: "Evidence completeness audit", next_test: "monthly" },
    { control: "Outcome calibration review", next_test: "monthly" },
    { control: "AI cost governance", next_test: "weekly" },
    { control: "Drift / bias scan", next_test: "monthly" },
  ],
  exceptions: [
    { ctrl: "Category proof publishing", desc: "External-use approval pending", owner: "CMO + Legal", due: "1wk" },
    { ctrl: "Capital evidence freshness", desc: "Artifact > 60d", owner: "Strategic Finance", due: "2wk" },
  ],
};

export const V16_ROADMAP = {
  horizons: ["Current quarter", "Next quarter", "6 months", "12 months", "24 months", "36 months"],
  tracks: [
    { track: "Assist policy maturity", row: ["v3 ratify", "v4 thresholds", "v5 cost gov", "v6 cross-tenant", "v7 enterprise", "v8 industry"] },
    { track: "HITL workflow maturity", row: ["SLA dashboards", "Smart routing", "Delegation", "Quorum approvals", "Board-grade", "Industry std"] },
    { track: "Explainability maturity", row: ["Field coverage 90%", "Counterfactuals", "What-if sim", "Causal layer", "Audit-grade", "Cert-ready"] },
    { track: "Evidence maturity", row: ["Freshness 90%", "Vault", "Lineage", "Tamper-evident", "External-audit", "Public proofs"] },
    { track: "Outcome learning", row: ["±10% calibration", "Lessons repo", "Policy updates", "Model retrain", "Causal eval", "Continuous"] },
    { track: "Revenue intel controls", row: ["Coverage 85%", "90%", "95%", "Cross-segment", "Audit-grade", "Industry"] },
    { track: "MP intel controls", row: ["Coverage 84%", "90%", "Cross-region", "Global", "Audit-grade", "Industry"] },
    { track: "Capital intel controls", row: ["Coverage 81%", "90%", "Investor-grade", "Audit-grade", "IPO-ready (evidence)", "Public-co"] },
    { track: "Account intel controls", row: ["Coverage 83%", "90%", "Strategic accts", "Global accts", "Audit-grade", "Industry"] },
    { track: "Partner intel controls", row: ["Coverage 79%", "85%", "Tiered partners", "Global partners", "Audit-grade", "Industry"] },
    { track: "Product intel controls", row: ["Coverage 85%", "90%", "Multi-product", "Platform-grade", "Audit-grade", "Industry"] },
    { track: "Category intel controls", row: ["Coverage 78%", "85%", "Cross-category", "Cat-leader", "Audit-grade", "Industry"] },
    { track: "Board intel maturity", row: ["Score 90", "92", "94", "Cap-grade", "Public-co", "Industry"] },
    { track: "Strategic control maturity", row: ["Score 87", "90", "92", "95", "Audit-grade", "Industry"] },
  ],
  decision_log: [
    { date: "T-7d", decision: "Adopt no-self-approve as platform-wide policy", owner: "Risk" },
    { date: "T-14d", decision: "Raise pricing rec confidence floor to 0.85", owner: "Head of Intelligence" },
    { date: "T-30d", decision: "Defer autonomous dispatch — keep HITL", owner: "CEO + Board" },
  ],
};

export const V16_REPORTS = [
  "Autonomous-assist governance", "Predictive performance intelligence", "Predictive risk signals",
  "Recommendation governance maturity", "Human-in-the-loop approval governance", "Recommendation explainability",
  "Recommendation evidence maturity", "Outcome learning loops", "Capital-grade board intelligence",
  "Executive decision intelligence", "Board decision intelligence", "Marketplace optimization intelligence",
  "Marketplace intelligence controls", "Revenue intelligence controls", "Capital intelligence controls",
  "Strategic account intelligence controls", "Partner intelligence controls", "Product-line intelligence controls",
  "Category intelligence controls", "Strategic control maturity",
].map((name, i) => ({
  name, owner: ["Chief of Staff", "CDO", "Risk", "CFO", "CRO", "CMO", "MP GM", "CPO"][i % 8],
  cadence: ["weekly", "monthly", "quarterly"][i % 3],
  last_run: `${(i % 14) + 1}d ago`,
  status: i % 9 === 0 ? "watchlist" : "passing",
}));

export const V16_RLS = [
  { policy: "company_admin_intel_select", scope: "company", note: "Company admins view company intel + recs" },
  { policy: "platform_owner_assist_gov", scope: "platform", note: "Platform owners view assist gov + strategic control" },
  { policy: "exec_decision_intel_select", scope: "company", note: "Exec role views exec/capital/risk/board intel" },
  { policy: "board_role_approved_only", scope: "company", note: "Board role: approved board intel + decisions only" },
  { policy: "admin_manage_assist_policies", scope: "platform", note: "Security/admin manages policies + thresholds" },
  { policy: "revops_manage_rev_controls", scope: "company", note: "RevOps manages revenue intel controls" },
  { policy: "mp_lead_manage_mp_controls", scope: "company", note: "MP leaders manage MP intel controls" },
  { policy: "cs_manage_account_controls", scope: "company", note: "CS manages assigned account intel" },
  { policy: "partner_lead_manage_partner_controls", scope: "company", note: "Partner mgrs manage partner intel" },
  { policy: "product_lead_manage_product_controls", scope: "company", note: "Product leads manage product intel" },
  { policy: "cat_lead_manage_category_controls", scope: "company", note: "Cat/marketing leads manage category intel" },
  { policy: "rec_requires_human_approval", scope: "all", note: "All AI recs require human approval before execution" },
  { policy: "rec_no_self_approve", scope: "all", note: "approver_id ≠ recommender_id" },
  { policy: "customer_no_internal_intel", scope: "customer_users", note: "Customer users blocked from internal intel" },
  { policy: "carrier_no_mp_internals", scope: "carrier_users", note: "Carrier users blocked from MP intel internals" },
  { policy: "partner_view_approved_only", scope: "partner_users", note: "Partner users only see partner-facing approved records" },
];

export const V16_EDGE_BOUNDARY = [
  { layer: "createServerFn", concern: "approve/reject/escalate HITL; compute scores; generate reports", auth: "Supabase JWT + RLS", returns: "JSON DTO" },
  { layer: "/api/public/* (webhook)", concern: "external signal ingestion; cron score recompute", auth: "HMAC signature", returns: "200/401" },
  { layer: "Edge functions (cron)", concern: "cross-tenant batch scoring; nightly board snapshot", auth: "service role + pg_cron", returns: "void" },
  { layer: "Browser (assist UI)", concern: "review/approve/explain; outcome dashboards", auth: "Supabase session", returns: "—" },
];

export const V16_EDGE_FUNCTIONS = [
  // assist governance
  "calculate-v16-autonomous-assist-score", "validate-assist-governance-policy",
  "detect-assist-governance-exceptions", "generate-assist-governance-summary",
  // predictive
  "calculate-predictive-performance-intelligence", "detect-predictive-risk-signals",
  "generate-predictive-performance-summary",
  // rec governance
  "calculate-recommendation-governance-maturity", "calculate-recommendation-explainability-maturity",
  "calculate-recommendation-evidence-maturity", "calculate-outcome-learning-loop-score",
  // approvals
  "create-hitl-approval-request", "approve-hitl-request", "reject-hitl-request",
  "escalate-hitl-request", "generate-approval-audit-log",
  // decisions
  "calculate-executive-decision-intelligence", "calculate-board-decision-intelligence",
  "generate-board-decision-summary",
  // controls
  "calculate-marketplace-intelligence-control-score", "calculate-revenue-intelligence-control-score",
  "calculate-capital-intelligence-control-score", "calculate-account-intelligence-control-score",
  "calculate-partner-intelligence-control-score", "calculate-product-intelligence-control-score",
  "calculate-category-intelligence-control-score", "calculate-strategic-control-maturity",
  // reporting
  "generate-capital-grade-board-intelligence-report", "generate-strategic-control-maturity-report",
  "generate-autonomous-assist-roadmap",
];

export const V16_DEMO = [
  { step: 1, actor: "CEO", surface: "/v16/command", expect: "Assist gov 94 · approval SLA 91 · explainability 89 · outcomes 82 · no auto-execute" },
  { step: 2, actor: "CFO", surface: "/v16/cap-controls", expect: "2 stale evidence signals; rec to refresh revenue durability + MP economics; CEO/CFO approval required" },
  { step: 3, actor: "RevOps", surface: "/v16/rev-controls", expect: "Revenue opt score 87; 3 expansion recs + 1 customer concentration rec — all pending approval" },
  { step: 4, actor: "MP GM", surface: "/v16/mp-opt", expect: "SE carrier density risk; recs: preferred carrier recruit + reefer coverage expansion; MP GM approval required" },
  { step: 5, actor: "Security / admin", surface: "/v16/control-maturity", expect: "Rev controls passing; MP controls 1 exception; category proof publishing needs review" },
  { step: 6, actor: "Board admin", surface: "/v16/capital-board", expect: "Board report: assist gov, predictive signals, rev+MP recs, approval activity, outcomes, risks, 4 decisions queued" },
  { step: 7, actor: "CEO", surface: "/v16/outcomes", expect: "Evidence refresh completed; MP action pending; account expansion approved; category proof rejected w/ reason" },
];

export const V16_PHASE46_TEASER =
  "Phase 46 → V16.5 enterprise predictive governance: AI-assisted board OS, durable revenue control automation, MP intelligence maturity, strategic approval orchestration. Still no autonomous dispatch.";
