// Phase 55 polish — V21 Enterprise Trust Intelligence Network
// Mock-only. No autonomous dispatch. HITL on every high-impact assist.

export const V21_POLISH_HEADLINES = {
  headline: "V21 trust intelligence network operating at 96% with HITL gates enforced across 19 domains.",
  highlights: [
    "Network trust score 96% · customer 95% · partner 93% · board 96% · revenue 94%",
    "0 autonomous dispatch · 0 autonomous pricing · 0 autonomous billing",
    "100% high-impact actions held at human approval (approver_id ≠ recommender_id)",
    "Two-person sign-off enforced on every capital action > $25k",
    "Evidence freshness ≤ SLA on 18/19 surfaces · 1 surface in remediation",
  ],
};

export const V21_POLISH_DOMAINS = [
  { domain: "Customer trust scale", score: 95, owner: "CS", status: "on-track", open_hitl: 2 },
  { domain: "Partner trust scale", score: 93, owner: "Partner", status: "on-track", open_hitl: 1 },
  { domain: "Board trust execution", score: 96, owner: "CEO", status: "on-track", open_hitl: 0 },
  { domain: "Durable revenue trust", score: 94, owner: "CRO/CFO", status: "on-track", open_hitl: 3 },
  { domain: "Marketplace trust optimization", score: 92, owner: "MP", status: "watch", open_hitl: 4 },
  { domain: "Executive trust command", score: 95, owner: "Exec", status: "on-track", open_hitl: 5 },
  { domain: "Trust evidence network", score: 94, owner: "Compliance", status: "on-track", open_hitl: 1 },
  { domain: "Customer/partner boundary", score: 96, owner: "Security", status: "on-track", open_hitl: 0 },
  { domain: "Trust risk network", score: 91, owner: "Risk", status: "watch", open_hitl: 2 },
  { domain: "Trust audit network", score: 95, owner: "Audit", status: "on-track", open_hitl: 0 },
  { domain: "Human approval network", score: 97, owner: "Ops", status: "on-track", open_hitl: 1 },
  { domain: "Recommendation network", score: 93, owner: "AI", status: "on-track", open_hitl: 6 },
  { domain: "Outcome network", score: 92, owner: "PM", status: "on-track", open_hitl: 2 },
  { domain: "Capital trust", score: 95, owner: "CFO", status: "on-track", open_hitl: 0 },
  { domain: "Product trust", score: 94, owner: "Product", status: "on-track", open_hitl: 1 },
  { domain: "Category leadership", score: 90, owner: "Marketing", status: "watch", open_hitl: 2 },
  { domain: "Exception network", score: 93, owner: "Ops", status: "on-track", open_hitl: 3 },
  { domain: "Board reporting", score: 96, owner: "CoS", status: "on-track", open_hitl: 0 },
  { domain: "Roadmap execution", score: 94, owner: "Strategy", status: "on-track", open_hitl: 1 },
];

export const V21_POLISH_HITL_QUEUE = [
  { id: "HITL-2101", action: "Approve carrier onboarding (lane WA→OR, 12 trucks)", risk: "med", impact: "$48k/mo", approver: "MP Lead", recommender: "MP-Bot", sla: "4h" },
  { id: "HITL-2102", action: "Approve customer renewal pricing change (+3.5%)", risk: "med", impact: "$220k ARR", approver: "CRO", recommender: "Revenue-Bot", sla: "24h" },
  { id: "HITL-2103", action: "Approve partner data-room access (acquirer due-diligence)", risk: "high", impact: "Strategic", approver: "CEO+CFO", recommender: "Capital-Bot", sla: "8h" },
  { id: "HITL-2104", action: "Approve board packet decision register publish", risk: "low", impact: "Governance", approver: "CoS", recommender: "Board-Bot", sla: "2h" },
  { id: "HITL-2105", action: "Approve high-impact recommendation reroute (lane Q4 capacity)", risk: "med", impact: "$31k/mo", approver: "COO", recommender: "Rec-Bot", sla: "6h" },
  { id: "HITL-2106", action: "Approve evidence external-use (customer security review)", risk: "low", impact: "Trust", approver: "Security", recommender: "Evidence-Bot", sla: "12h" },
];

export const V21_POLISH_BOUNDARY = [
  { surface: "Customer data", boundary: "tenant", external_use: "approval required", portal_expose: "scoped", status: "ok" },
  { surface: "Partner data", boundary: "tenant + partner", external_use: "approval required", portal_expose: "scoped", status: "ok" },
  { surface: "Carrier data", boundary: "marketplace", external_use: "aggregated only", portal_expose: "carrier-own", status: "ok" },
  { surface: "Board data", boundary: "board members + officers", external_use: "no", portal_expose: "none", status: "ok" },
  { surface: "Capital data room", boundary: "approved acquirer/investor", external_use: "watermarked, time-boxed", portal_expose: "data-room", status: "ok" },
  { surface: "Evidence", boundary: "owner + approver", external_use: "HITL approved", portal_expose: "scoped", status: "ok" },
];

export const V21_POLISH_RLS = [
  { policy: "v21_network_score_view", rule: "company_id = current_company() AND has_role('board_or_exec')", surface: "Network overview" },
  { policy: "v21_customer_trust_view", rule: "company_id = current_company() AND (has_role('cs') OR has_role('exec'))", surface: "Customer scale" },
  { policy: "v21_partner_trust_view", rule: "company_id = current_company() AND has_role('partner_lead')", surface: "Partner scale" },
  { policy: "v21_board_packet_view", rule: "is_board_member(auth.uid()) OR has_role('officer')", surface: "Board execution" },
  { policy: "v21_capital_dataroom_view", rule: "in_dataroom_access(auth.uid()) AND watermark_active()", surface: "Capital" },
  { policy: "v21_hitl_required", rule: "action_risk IN ('med','high') REQUIRES approver_id <> recommender_id", surface: "All assists" },
  { policy: "v21_capital_two_person", rule: "amount > 25000 REQUIRES two_distinct_approvers()", surface: "Capital actions" },
  { policy: "v21_evidence_external_use", rule: "external_use = true REQUIRES approval_id IS NOT NULL", surface: "Evidence" },
  { policy: "v21_audit_append_only", rule: "INSERT only; UPDATE/DELETE denied", surface: "Audit log" },
  { policy: "v21_mp_change_hitl", rule: "marketplace_param_change REQUIRES hitl_approval", surface: "Marketplace" },
];

export const V21_POLISH_EDGE = {
  serverfn: [
    { name: "calc-v21-network-score", kind: "internal RPC", auth: "session + RLS", note: "Aggregates 19 domain scores" },
    { name: "calc-v21-customer-trust", kind: "internal RPC", auth: "session + RLS", note: "Adoption + renewal + proof" },
    { name: "calc-v21-partner-trust", kind: "internal RPC", auth: "session + RLS", note: "Performance + enablement" },
    { name: "build-v21-board-packet", kind: "internal RPC", auth: "officer/board only", note: "HITL on publish" },
    { name: "submit-v21-hitl-decision", kind: "internal RPC", auth: "approver session", note: "approver ≠ recommender" },
    { name: "calc-v21-capital-readiness", kind: "internal RPC", auth: "CFO/CEO only", note: "two-person on >$25k" },
    { name: "calc-v21-mp-optimization", kind: "internal RPC", auth: "MP role", note: "HITL on param changes" },
    { name: "calc-v21-evidence-freshness", kind: "internal RPC", auth: "compliance role", note: "SLA tracking" },
    { name: "calc-v21-risk-network", kind: "internal RPC", auth: "risk role", note: "Cross-domain risk" },
  ],
  edge_routes: [
    { path: "/api/public/v21/webhook/board-event", purpose: "External calendar/board tool ingress (signature-verified)" },
    { path: "/api/public/v21/webhook/partner-callback", purpose: "Partner platform event ingress (HMAC verified)" },
    { path: "/api/public/v21/webhook/evidence-attest", purpose: "Auditor attestation receipts (signed)" },
    { path: "/api/public/v21/health", purpose: "Public health probe (no PII)" },
  ],
  separation_rule: "App-internal trust logic ⇒ createServerFn (RLS + session). External ingress only ⇒ /api/public/* with signature verification.",
};

export const V21_POLISH_INVARIANTS = [
  "No autonomous dispatch, pricing, or billing — assists only",
  "Every med/high-risk action gated by human approval; approver_id ≠ recommender_id",
  "Capital actions > $25k require two distinct approvers",
  "Audit log is append-only; no in-place edits or deletes",
  "External evidence use requires explicit HITL approval + watermark",
  "Marketplace parameter changes require HITL with rollback plan",
];

export const V21_POLISH_DEMO = [
  { step: 1, persona: "CEO", surface: "/v21/overview", action: "Review network score 96% and 19-domain heatmap" },
  { step: 2, persona: "CEO", surface: "/v21/board", action: "Open board execution; confirm decision register HITL" },
  { step: 3, persona: "CFO", surface: "/v21/capital", action: "Review capital readiness; >$25k action shows two-person gate" },
  { step: 4, persona: "CRO", surface: "/v21/revenue", action: "Inspect durable revenue trust; renewal HITL queued" },
  { step: 5, persona: "CS Lead", surface: "/v21/customer", action: "Approve customer-facing evidence (HITL)" },
  { step: 6, persona: "Partner Lead", surface: "/v21/partner", action: "Review partner scale; partner data-room HITL pending" },
  { step: 7, persona: "MP Lead", surface: "/v21/mp", action: "Approve marketplace param change with rollback plan (HITL)" },
  { step: 8, persona: "Security", surface: "/v21/boundary", action: "Verify customer/partner/carrier boundary, no external leak" },
  { step: 9, persona: "Compliance", surface: "/v21/evidence", action: "Check freshness SLA + external-use approvals" },
  { step: 10, persona: "Risk", surface: "/v21/risk", action: "Review cross-domain risk network; 2 watch items" },
  { step: 11, persona: "Audit", surface: "/v21/audit", action: "Confirm append-only log integrity + attestation" },
  { step: 12, persona: "CEO+CoS", surface: "/v21/board-report", action: "Publish board report (HITL); roadmap horizons reviewed" },
];

export const V21_POLISH_ROADMAP = [
  { horizon: "Q+1", theme: "Tighten HITL SLA across MP + revenue", target: "All med/high actions ≤ 6h" },
  { horizon: "Q+2", theme: "Customer trust scale: portal evidence freshness", target: "≤ 24h freshness on all customer-facing surfaces" },
  { horizon: "Q+3", theme: "Partner trust scale: joint pipeline + boundary", target: "Partner trust ≥ 95%" },
  { horizon: "Q+4", theme: "Capital trust: continuous data room readiness", target: "Readiness ≥ 97% sustained" },
  { horizon: "Y+2 gate", theme: "Phase 56 entry: V21.5 trust network scale", target: "Pre-req: 4 quarters at network ≥ 95%" },
];

export const V21_POLISH_OWNER_HEATMAP = [
  { owner: "CEO", domains: 2, open_hitl: 0, score: 96 },
  { owner: "CFO", domains: 2, open_hitl: 3, score: 95 },
  { owner: "CRO", domains: 1, open_hitl: 3, score: 94 },
  { owner: "COO", domains: 2, open_hitl: 5, score: 93 },
  { owner: "CS", domains: 1, open_hitl: 2, score: 95 },
  { owner: "Partner", domains: 1, open_hitl: 1, score: 93 },
  { owner: "MP", domains: 1, open_hitl: 4, score: 92 },
  { owner: "Security", domains: 1, open_hitl: 0, score: 96 },
  { owner: "Compliance", domains: 1, open_hitl: 1, score: 94 },
  { owner: "Audit", domains: 1, open_hitl: 0, score: 95 },
];
