// V15.5 — Enterprise Intelligence Maturity (mock)

export const V155_SCOPE = [
  { area: "Enterprise intelligence", status: "in_progress", note: "Maturity center live (mock)" },
  { area: "Capital intelligence", status: "in_progress", note: "Recs + explainability" },
  { area: "Revenue optimization", status: "in_progress", note: "Rec engine + outcome tracking" },
  { area: "Marketplace intelligence", status: "in_progress", note: "Scale rec engine" },
  { area: "Autonomous-assist gov", status: "in_progress", note: "Human approval required" },
  { area: "Explainability", status: "in_progress", note: "Inputs/weights/confidence" },
  { area: "Outcome tracking", status: "in_progress", note: "Predicted vs realized" },
  { area: "Autonomous dispatch", status: "deferred", note: "NOT in V15.5" },
];

export const V155_HEADLINE = {
  headline: "V15.5 intelligence maturity: assist-only, every recommendation explainable + outcome-tracked",
  highlights: [
    "Maturity score 78 (+6 QoQ)",
    "42 active recs across capital/revenue/MP — all human-approved",
    "Realized lift within ±8% of predicted on 31/42 closed recs",
    "No autonomous dispatch — humans remain in the loop",
  ],
};

export const V155_MATURITY = {
  score: 78,
  qoq: 6,
  dimensions: [
    { dim: "Signal coverage", score: 82, target: 90, owner: "Chief Data Officer" },
    { dim: "Explainability", score: 84, target: 90, owner: "Head of Intelligence" },
    { dim: "Human approval discipline", score: 91, target: 95, owner: "Chief of Staff" },
    { dim: "Outcome calibration", score: 73, target: 85, owner: "FP&A" },
    { dim: "Bias / drift monitoring", score: 68, target: 80, owner: "Risk" },
    { dim: "Rec adoption rate", score: 76, target: 85, owner: "BU GMs" },
  ],
  trends: [
    { q: "Q-3", score: 64 }, { q: "Q-2", score: 68 },
    { q: "Q-1", score: 72 }, { q: "Q0", score: 78 },
  ],
};

export const V155_CAPITAL_INTEL = {
  score: 79,
  signals: [
    { signal: "Cash runway delta", value: "+2.4mo", source: "Treasury", confidence: 0.92 },
    { signal: "Working capital gap", value: "-$3.1M", source: "AR/AP", confidence: 0.86 },
    { signal: "Capex deferral candidates", value: "$5.8M", source: "FP&A", confidence: 0.78 },
    { signal: "Refi window (BBB)", value: "open 9wk", source: "Debt desk", confidence: 0.71 },
  ],
  open_recs: 7,
  approved_recs: 4,
};

export const V155_REVENUE_OPT = {
  score: 81,
  open_recs: 12,
  realized_lift_q: "+1.8%",
  predicted_lift_q: "+2.1%",
  calibration: "tight",
  segments: [
    { segment: "SMB", elasticity: -1.4, action: "Hold price; bundle add-ons", confidence: 0.83 },
    { segment: "Mid-market", elasticity: -0.9, action: "+3% price on renewals", confidence: 0.88 },
    { segment: "Enterprise", elasticity: -0.6, action: "Negotiated +5% on multi-year", confidence: 0.81 },
    { segment: "Public sector", elasticity: -1.1, action: "Hold; expand multi-year", confidence: 0.74 },
  ],
};

export const V155_REV_RECS = [
  { id: "REV-2101", title: "Lift mid-market renewal +3%", segment: "Mid-market", predicted_arr: "$1.2M", confidence: 0.88, status: "awaiting_approval", approver: "CRO", explainability: "Elasticity -0.9, churn risk +0.4pt, comp band B" },
  { id: "REV-2102", title: "Bundle add-ons SMB cohort A", segment: "SMB", predicted_arr: "$0.4M", confidence: 0.83, status: "approved", approver: "CRO", explainability: "Cross-sell propensity 0.62, attach 28%" },
  { id: "REV-2103", title: "Multi-year discount swap Enterprise", segment: "Enterprise", predicted_arr: "$2.1M", confidence: 0.81, status: "in_review", approver: "CFO", explainability: "Multi-year tenure +1.4yr, NPV +$310k" },
  { id: "REV-2104", title: "Re-tier public sector annual", segment: "Public sector", predicted_arr: "$0.6M", confidence: 0.74, status: "deferred", approver: "CFO", explainability: "Procurement cycle Q+2; revisit" },
];

export const V155_MP_INTEL = {
  score: 76,
  liquidity_index: 71,
  fill_rate: 0.93,
  open_recs: 9,
  hotspots: [
    { lane: "TX→CA dry van", signal: "Carrier shortage", confidence: 0.87, action: "Surge incentive +6%" },
    { lane: "GA→NJ reefer", signal: "Excess capacity", confidence: 0.79, action: "Reduce posting cadence" },
    { lane: "WA→IL FTL",   signal: "Price compression", confidence: 0.74, action: "Hold rate floor" },
    { lane: "FL→PA LTL",   signal: "Liquidity OK", confidence: 0.91, action: "No change" },
  ],
};

export const V155_MP_RECS = [
  { id: "MP-3201", title: "Surge incentive TX→CA dry van", predicted_lift: "fill +4pt", confidence: 0.87, status: "approved", approver: "MP GM", explainability: "Carrier app rate -12%, demand +7%" },
  { id: "MP-3202", title: "Throttle GA→NJ reefer posts", predicted_lift: "margin +1.1pt", confidence: 0.79, status: "awaiting_approval", approver: "MP GM", explainability: "Excess capacity 2.3x normal" },
  { id: "MP-3203", title: "Promote alt-lane WA→TX", predicted_lift: "volume +9%", confidence: 0.71, status: "in_review", approver: "MP Ops", explainability: "Spot-rate corridor +3%" },
];

export const V155_AUTONOMY_GOV = {
  posture: "assist-only",
  rules: [
    { rule: "No write action without human approval", status: "enforced" },
    { rule: "Each rec must carry inputs + weights + confidence", status: "enforced" },
    { rule: "Rec >$250k impact escalates to CFO", status: "enforced" },
    { rule: "Rec >$1M impact escalates to CEO + Board chair informed", status: "enforced" },
    { rule: "All approvals logged with reviewer + timestamp", status: "enforced" },
    { rule: "Bias / drift check before approval surfacing", status: "monitored" },
  ],
  guardrails: [
    "Autonomous dispatch is OFF and not buildable in V15.5",
    "Model cannot self-promote a rec's status",
    "Failed-calibration recs auto-deferred for human review",
  ],
};

export const V155_APPROVALS = [
  { id: "APR-401", rec_id: "REV-2101", approver: "CRO", state: "pending", waiting_days: 2, impact: "$1.2M ARR" },
  { id: "APR-402", rec_id: "MP-3201",  approver: "MP GM", state: "approved", waiting_days: 0, impact: "fill +4pt" },
  { id: "APR-403", rec_id: "REV-2103", approver: "CFO", state: "in_review", waiting_days: 4, impact: "$2.1M ARR" },
  { id: "APR-404", rec_id: "MP-3202",  approver: "MP GM", state: "pending", waiting_days: 1, impact: "margin +1.1pt" },
  { id: "APR-405", rec_id: "CAP-1102", approver: "CFO", state: "approved", waiting_days: 0, impact: "$5.8M deferral" },
];

export const V155_EXPLAINABILITY = [
  { rec_id: "REV-2101", input: "Elasticity",        weight: 0.34, value: "-0.9", contribution: "+0.41" },
  { rec_id: "REV-2101", input: "Churn risk",        weight: 0.22, value: "+0.4pt", contribution: "-0.09" },
  { rec_id: "REV-2101", input: "Comp band",         weight: 0.18, value: "B",   contribution: "+0.12" },
  { rec_id: "REV-2101", input: "Tenure",            weight: 0.14, value: "2.1yr", contribution: "+0.06" },
  { rec_id: "REV-2101", input: "Cohort lift prior", weight: 0.12, value: "+2.6%", contribution: "+0.08" },
];

export const V155_OUTCOMES = [
  { rec_id: "REV-2099", predicted: "+1.5% ARR", realized: "+1.6% ARR", delta: "+0.1pt", status: "on_track" },
  { rec_id: "REV-2100", predicted: "+$0.8M ARR", realized: "+$0.6M ARR", delta: "-25%", status: "watchlist" },
  { rec_id: "MP-3198",  predicted: "fill +3pt", realized: "fill +3.4pt", delta: "+0.4pt", status: "on_track" },
  { rec_id: "CAP-1099", predicted: "$2M defer", realized: "$2.1M defer",  delta: "+5%",   status: "on_track" },
  { rec_id: "MP-3199",  predicted: "margin +1pt", realized: "margin +0.3pt", delta: "-70%", status: "underperform" },
];

export const V155_INTEL_AREAS = [
  { area: "Executive intel",  headline: "Single exec briefing pulls capital/revenue/MP recs", bullets: ["12 recs surfaced weekly", "All require human approval"] },
  { area: "Board intel",      headline: "Board pack auto-drafts from approved recs only",      bullets: ["Quarterly cadence", "Includes outcome calibration"] },
  { area: "Risk intel",       headline: "Bias/drift monitoring on every rec",                  bullets: ["Drift score per cohort", "Auto-defer if drift > 0.2"] },
  { area: "Account intel",    headline: "Top 50 accounts get personalized renewal rec",        bullets: ["Owner: CSM", "Explainability mandatory"] },
  { area: "Partner intel",    headline: "Partner ecosystem ranked by realized contribution",   bullets: ["6 tiers", "Outcome-weighted"] },
  { area: "Product intel",    headline: "Product-line P&L recs reviewed monthly",              bullets: ["4 lines", "GM approval required"] },
  { area: "Category intel",   headline: "Category share + leadership index trend",             bullets: ["Win rate +4pt", "Mentions +12%"] },
  { area: "Cap evidence",     headline: "Capital evidence pack auto-bundles supporting recs",  bullets: ["For audit + lender review"] },
  { area: "Diligence intel",  headline: "Commercial diligence draft from approved recs only",  bullets: ["No raw model output exposed"] },
];

export const V155_CONTROLS = [
  { control: "Approval-before-action", coverage: 100, last_tested: "Q0", owner: "Chief of Staff" },
  { control: "Explainability present", coverage: 96,  last_tested: "Q0", owner: "Head of Intelligence" },
  { control: "Outcome tracking",       coverage: 88,  last_tested: "Q0", owner: "FP&A" },
  { control: "Bias / drift monitor",   coverage: 74,  last_tested: "Q-1", owner: "Risk" },
  { control: "Audit log integrity",    coverage: 99,  last_tested: "Q0", owner: "CISO" },
  { control: "Escalation thresholds",  coverage: 100, last_tested: "Q0", owner: "CFO" },
];

export const V155_ROADMAP = [
  { qtr: "Q+1", milestone: "Lift outcome tracking coverage to 95%" },
  { qtr: "Q+1", milestone: "Add counterfactual explainer to top-20 rec types" },
  { qtr: "Q+2", milestone: "Bias monitor coverage 90% + auto-defer on drift>0.15" },
  { qtr: "Q+2", milestone: "Board-level intel report v2 (calibration section)" },
  { qtr: "Q+3", milestone: "Cross-domain rec bundling (capital + revenue)" },
  { qtr: "Q+3", milestone: "Approval SLA tracker + escalation auto-route" },
  { qtr: "Q+4", milestone: "Phase 45 V16 scoping — strategic operating excellence" },
];

export const V155_OWNER_HEATMAP = [
  { owner: "CEO",   recs: 4,  pending: 1, overdue: 0, calibration: "tight" },
  { owner: "CFO",   recs: 11, pending: 3, overdue: 1, calibration: "tight" },
  { owner: "CRO",   recs: 9,  pending: 2, overdue: 0, calibration: "loose" },
  { owner: "MP GM", recs: 7,  pending: 2, overdue: 0, calibration: "tight" },
  { owner: "CSM lead", recs: 6, pending: 1, overdue: 0, calibration: "tight" },
  { owner: "Risk",  recs: 5,  pending: 0, overdue: 0, calibration: "tight" },
];

export const V155_RLS = [
  { table: "v155_recommendations", policy: "rec_read_owner_or_approver", sketch: "for select using (owner_id = auth.uid() or approver_id = auth.uid() or has_role(auth.uid(), 'platform_owner'))" },
  { table: "v155_recommendations", policy: "rec_no_self_approve", sketch: "for update with check (status != 'approved' or approver_id != owner_id)" },
  { table: "v155_approvals", policy: "appr_read_approver_or_exec", sketch: "for select using (approver_id = auth.uid() or has_role(auth.uid(), 'admin'))" },
  { table: "v155_approvals", policy: "appr_write_approver_only", sketch: "for insert with check (approver_id = auth.uid())" },
  { table: "v155_outcomes", policy: "outcome_read_fpna_exec", sketch: "for select using (has_role(auth.uid(), 'finance') or has_role(auth.uid(), 'admin'))" },
  { table: "v155_outcomes", policy: "outcome_write_fpna_only", sketch: "for all using (has_role(auth.uid(), 'finance')) with check (has_role(auth.uid(), 'finance'))" },
  { table: "v155_explainability", policy: "explain_read_approver", sketch: "for select using (exists (select 1 from v155_recommendations r where r.id = rec_id and (r.approver_id = auth.uid() or r.owner_id = auth.uid())))" },
  { table: "v155_audit_log", policy: "audit_read_exec_or_ciso", sketch: "for select using (has_role(auth.uid(), 'admin') or has_role(auth.uid(), 'ciso'))" },
  { table: "v155_audit_log", policy: "audit_no_update_delete", sketch: "no update/delete policy — append-only" },
];

export const V155_EDGE_BOUNDARY = [
  { layer: "createServerFn", concern: "score_recommendation", auth: "requireSupabaseAuth + role:'analyst'", returns: "DTO {rec_id, score, confidence, weights[]}" },
  { layer: "createServerFn", concern: "approve_recommendation", auth: "requireSupabaseAuth + role:'approver' + threshold check", returns: "DTO {approval_id, status}" },
  { layer: "createServerFn", concern: "snapshot_outcome", auth: "requireSupabaseAuth + role:'finance'", returns: "DTO {outcome_id, predicted, realized, delta}" },
  { layer: "createServerFn", concern: "list_explainability", auth: "requireSupabaseAuth", returns: "DTO[] inputs+weights+contribution" },
  { layer: "/api/public/*",  concern: "external signal webhook (price index)", auth: "HMAC signature timingSafeEqual", returns: "200 ok / 401" },
  { layer: "/api/public/*",  concern: "cron snapshot trigger", auth: "HMAC + IP allow-list", returns: "200 ok" },
  { layer: "Edge function",  concern: "NONE new for V15.5", auth: "—", returns: "Legacy/inherited only" },
];

export const V155_DEMO = [
  { step: 1,  actor: "CEO",    surface: "/v155/overview",          action: "Reads maturity headline, sees calibration tight", outcome: "Approves weekly cadence" },
  { step: 2,  actor: "CFO",    surface: "/v155/capital-intel",     action: "Reviews $5.8M capex deferral signal",             outcome: "Routes CAP-1102 to approval" },
  { step: 3,  actor: "CRO",    surface: "/v155/rev-rec-engine",    action: "Opens REV-2101, inspects explainability",         outcome: "Approves +3% mid-market renewal" },
  { step: 4,  actor: "MP GM",  surface: "/v155/mp-rec-engine",     action: "Approves MP-3201 surge TX→CA",                    outcome: "Carrier app rate target +4pt" },
  { step: 5,  actor: "MP GM",  surface: "/v155/mp-intel",          action: "Reviews lane hotspots + confidence",              outcome: "Defers MP-3203 pending more data" },
  { step: 6,  actor: "Risk",   surface: "/v155/explainability",    action: "Audits REV-2101 input weights",                   outcome: "Confirms no protected-attribute leakage" },
  { step: 7,  actor: "FP&A",   surface: "/v155/outcomes",          action: "Reviews predicted vs realized",                   outcome: "Flags REV-2100 / MP-3199 underperform" },
  { step: 8,  actor: "Chief of Staff", surface: "/v155/approvals", action: "Clears 2 pending approvals >5d",                  outcome: "Approval SLA back to green" },
  { step: 9,  actor: "Board",  surface: "/v155/board-intel",       action: "Reads board pack draft",                          outcome: "Endorses Q+1 roadmap" },
  { step: 10, actor: "CEO",    surface: "/v155/autonomy-gov",      action: "Re-confirms assist-only posture",                 outcome: "Autonomous dispatch remains OFF" },
];

export const V155_PHASE45_TEASER =
  "Phase 45 (V16) will move to strategic operating excellence — held until V15.5 calibration ≥85%.";
