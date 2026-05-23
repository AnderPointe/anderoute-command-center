// Phase 51 polish data for V19 Enterprise Assurance Operating System.
// Mock only. No autonomous dispatch. High-impact actions are HITL-gated.

export const V19P_HEADLINES = {
  headline: "V19 polished: enterprise assurance OS deepened across 20 domains",
  highlights: [
    "Enterprise assurance score 98.4% (+0.4 vs base) · 0 unresolved high-impact exceptions",
    "Autonomous-assist resilience maturity 94.6% · MTTR 9m · 0 silent-fail incidents (30d)",
    "Board assurance execution: 12/12 packets shipped on time · approver_id <> recommender_id verified",
    "Revenue control assurance: carrier rate drift 0.4% · margin invariants held across 9 segments",
    "Marketplace optimization assurance: band drift 0.6% · 100% bands have human owner",
    "Capital assurance: 2-person approval enforced on 100% of >$25k allocations",
    "Audit log append-only · 0 reverse-write attempts · evidence freshness ≥97% across 7 categories",
  ],
};

export const V19P_AREA_DEPTH = [
  { area: "Enterprise Assurance OS",        kpi: "Composite score",       value: "98.4%", sla: "≥97%", status: "ok" },
  { area: "Resilience maturity",            kpi: "MTTR / silent-fails",   value: "9m / 0", sla: "≤15m / 0", status: "ok" },
  { area: "Board execution",                kpi: "On-time packet ship",   value: "12/12", sla: "12/12", status: "ok" },
  { area: "Revenue control",                kpi: "Rate drift",            value: "0.4%",  sla: "≤1%",   status: "ok" },
  { area: "Marketplace optimization",       kpi: "Band drift / owners",   value: "0.6% / 100%", sla: "≤1% / 100%", status: "ok" },
  { area: "Executive assurance",            kpi: "Briefing freshness",    value: "≤24h",  sla: "≤48h",  status: "ok" },
  { area: "Evidence maturity",              kpi: "Insert-only integrity", value: "100%",  sla: "100%",  status: "ok" },
  { area: "Audit execution",                kpi: "Reverse-write attempts",value: "0",     sla: "0",     status: "ok" },
  { area: "Human approval maturity",        kpi: "Separation enforced",   value: "100%",  sla: "100%",  status: "ok" },
  { area: "Recommendation assurance",       kpi: "Backtested precision",  value: "0.91",  sla: "≥0.85", status: "ok" },
  { area: "Outcome assurance",              kpi: "Closed-loop attribution",value: "96%",  sla: "≥90%",  status: "ok" },
  { area: "Predictive risk",                kpi: "Top-decile lift",       value: "3.8x",  sla: "≥3x",   status: "ok" },
  { area: "Capital assurance",              kpi: "2-person on >$25k",     value: "100%",  sla: "100%",  status: "ok" },
  { area: "Strategic accounts",             kpi: "Tier-1 review SLA",     value: "5d",    sla: "≤7d",   status: "ok" },
  { area: "Partner assurance",              kpi: "Carrier scorecard age", value: "4d",    sla: "≤7d",   status: "ok" },
  { area: "Product-line assurance",         kpi: "Margin invariant",      value: "held",  sla: "held",  status: "ok" },
  { area: "Category assurance",             kpi: "Mix drift watch",       value: "0.7%",  sla: "≤2%",   status: "ok" },
  { area: "Exception command",              kpi: "High-impact open",      value: "0",     sla: "0",     status: "ok" },
  { area: "Board reporting",                kpi: "Audience-scoped redact",value: "100%",  sla: "100%",  status: "ok" },
  { area: "Roadmap",                        kpi: "Horizon coverage",      value: "H1/H2/H3", sla: "3 horizons", status: "ok" },
];

export const V19P_OWNER_HEATMAP = [
  { owner: "CEO",          load: "med",  open: 2, sla: "on-track" },
  { owner: "CFO",          load: "high", open: 4, sla: "on-track" },
  { owner: "COO",          load: "med",  open: 3, sla: "on-track" },
  { owner: "VP Revenue",   load: "high", open: 5, sla: "on-track" },
  { owner: "VP Marketplace",load: "med", open: 3, sla: "on-track" },
  { owner: "Head of Risk", load: "med",  open: 2, sla: "on-track" },
  { owner: "Sec/Admin",    load: "low",  open: 1, sla: "on-track" },
  { owner: "Board Admin",  load: "low",  open: 1, sla: "on-track" },
  { owner: "Controller",   load: "med",  open: 2, sla: "on-track" },
  { owner: "Data Lead",    load: "low",  open: 1, sla: "on-track" },
];

export const V19P_NEXT_BEST_HITL = [
  { id: "NB-1", action: "Approve Q3 board packet (audience-scoped redaction)", owner: "Board Admin → CEO", impact: "high" },
  { id: "NB-2", action: "Re-approve carrier ZX-7 rate band (drift 0.9%)",      owner: "VP Marketplace → COO", impact: "med" },
  { id: "NB-3", action: "2-person sign-off capital reallocation $48k",         owner: "Controller → CFO", impact: "high" },
  { id: "NB-4", action: "Confirm strategic account A-12 tier downgrade",       owner: "VP Revenue → COO", impact: "med" },
  { id: "NB-5", action: "Acknowledge risk model drift > threshold (segment 4)",owner: "Head of Risk → CEO", impact: "med" },
  { id: "NB-6", action: "Sign off Q3 enterprise assurance attestation",        owner: "CEO", impact: "high" },
];

export const V19P_EVIDENCE_FRESHNESS = [
  { kind: "Board packets",        freshness: "100%", oldest: "0d" },
  { kind: "Capital approvals",    freshness: "100%", oldest: "1d" },
  { kind: "Carrier scorecards",   freshness: "98%",  oldest: "4d" },
  { kind: "Account reviews",      freshness: "97%",  oldest: "5d" },
  { kind: "Risk model snapshots", freshness: "99%",  oldest: "2d" },
  { kind: "Marketplace bands",    freshness: "99%",  oldest: "1d" },
  { kind: "Audit log diffs",      freshness: "100%", oldest: "0d" },
];

export const V19P_INVARIANTS = [
  "approver_id <> recommender_id on every high-impact action",
  "2-person sign-off enforced on capital > $25k",
  "Audit log is append-only; reverse-writes blocked at DB",
  "PII / carrier rate fields redacted in board-audience packets",
  "Customer-blocked admin actions cannot be silently overridden",
  "Marketplace bands must have a human owner before activation",
  "Evidence rows are insert-only; no in-place edits",
  "Policy changes require two-person approval and audit row",
  "Recommendation publishing requires QA pass + owner ack",
  "Cron-driven snapshots write to /api/public via signed webhook only",
];

export const V19P_RLS_EXAMPLES = [
  { name: "v19_assurance_company_member",  target: "v19_assurance_*",       sql: "USING (is_company_member(auth.uid(), company_id))" },
  { name: "v19_audit_append_only",         target: "v19_audit_log",         sql: "FOR UPDATE/DELETE TO authenticated USING (false)" },
  { name: "v19_high_impact_hitl",          target: "v19_actions",           sql: "WITH CHECK (impact <> 'high' OR approver_id IS NOT NULL)" },
  { name: "v19_approver_not_recommender",  target: "v19_actions",           sql: "WITH CHECK (approver_id IS NULL OR approver_id <> recommender_id)" },
  { name: "v19_two_person_capital",        target: "v19_capital_approvals", sql: "WITH CHECK (amount <= 25000 OR (approver_a <> approver_b AND approver_a IS NOT NULL AND approver_b IS NOT NULL))" },
  { name: "v19_carrier_rate_redacted",     target: "v19_board_packet_view", sql: "USING (audience <> 'board' OR carrier_rate IS NULL)" },
  { name: "v19_evidence_insert_only",      target: "v19_evidence",          sql: "FOR UPDATE/DELETE USING (false)" },
  { name: "v19_policy_two_person",         target: "v19_policy_changes",    sql: "WITH CHECK (approver_a <> approver_b)" },
  { name: "v19_mp_band_owner_required",    target: "v19_mp_bands",          sql: "WITH CHECK (owner_id IS NOT NULL)" },
  { name: "v19_customer_block_admin",      target: "v19_admin_actions",     sql: "WITH CHECK (NOT EXISTS (SELECT 1 FROM v19_customer_blocks b WHERE b.target_id = target_id))" },
  { name: "v19_rec_qa_required",           target: "v19_recommendations",   sql: "WITH CHECK (status <> 'published' OR qa_passed_at IS NOT NULL)" },
  { name: "v19_board_audience_scope",      target: "v19_board_packets",     sql: "USING (audience = ANY (current_audiences(auth.uid())))" },
];

export const V19P_EDGE_BOUNDARY = [
  { layer: "ServerFn (TanStack)",       concern: "Assurance score calc, snapshot reads, HITL queue",           auth: "requireSupabaseAuth + RLS",        returns: "DTO" },
  { layer: "ServerFn (TanStack)",       concern: "Board packet assembly (audience-scoped redaction)",          auth: "requireSupabaseAuth + role",       returns: "DTO" },
  { layer: "Edge / Worker cron",        concern: "Daily evidence freshness + drift sweep",                     auth: "internal cron token",              returns: "writes evidence rows" },
  { layer: "/api/public webhook",       concern: "External signed snapshot push (insert-only evidence)",       auth: "HMAC signature verify",            returns: "200 ack only" },
  { layer: "/api/public webhook",       concern: "Carrier scorecard ingestion (rate redacted at write)",       auth: "HMAC + allowlist",                 returns: "200 ack only" },
  { layer: "ServerFn (TanStack)",       concern: "Capital 2-person approval transition (state machine)",       auth: "requireSupabaseAuth + role",       returns: "DTO + audit row" },
  { layer: "ServerFn (TanStack)",       concern: "Recommendation publish (QA gate)",                           auth: "requireSupabaseAuth + role",       returns: "DTO" },
  { layer: "Edge / Worker cron",        concern: "Policy drift recalibration snapshot (read-only DTO)",        auth: "internal cron token",              returns: "writes snapshot rows" },
];

export const V19P_PERSONA_SLAS = [
  { persona: "CEO",          surface: "/v19/exec",         sla: "Daily briefing ≤24h fresh" },
  { persona: "CFO",          surface: "/v19/capital",      sla: "Capital queue ≤1 business day" },
  { persona: "COO",          surface: "/v19/os",           sla: "Health map refreshed hourly" },
  { persona: "VP Revenue",   surface: "/v19/revenue",      sla: "Rate drift alert ≤4h" },
  { persona: "VP Marketplace",surface: "/v19/mp",          sla: "Band drift alert ≤4h" },
  { persona: "Head of Risk", surface: "/v19/risk",         sla: "Model drift weekly review" },
  { persona: "Board Admin",  surface: "/v19/board-report", sla: "Packet ship monthly + ad-hoc" },
  { persona: "Sec/Admin",    surface: "/v19/audit",        sla: "Audit anomaly ack ≤1d" },
  { persona: "Controller",   surface: "/v19/capital",      sla: "2-person sign-off ≤1d" },
  { persona: "Data Lead",    surface: "/v19/evidence",     sla: "Evidence freshness ≥97%" },
];

export const V19P_GUARDRAILS_POLISH = [
  "No fully autonomous dispatch in V19 — all high-impact actions HITL-gated",
  "approver_id <> recommender_id is enforced at the policy layer, not the UI",
  "Audit log writes are append-only; restore-from-snapshot only via signed cron",
  "All board-audience surfaces redact carrier-rate + customer PII at read time",
  "Capital >$25k requires two distinct approvers and an audit row",
  "Phase 52 (V19.5 maturity & optimization) is teased only, not built",
];

export const V19P_DEMO = [
  { who: "CEO",         step: "Open /v19/overview · review polished headlines (score 98.4%)",       outcome: "Sees board-ready enterprise assurance snapshot" },
  { who: "CEO",         step: "Drill /v19/os → assurance health map + exec summary",               outcome: "Confirms 0 unresolved high-impact exceptions" },
  { who: "CEO",         step: "Approve NB-6 Q3 enterprise assurance attestation",                  outcome: "HITL sign-off recorded with audit row" },
  { who: "Board Admin", step: "/v19/board-report → audience-scoped redaction preview",             outcome: "Verifies carrier-rate + PII redaction" },
  { who: "Board Admin", step: "Ship Q3 board packet (12/12 on-time)",                              outcome: "Append-only evidence row created" },
  { who: "COO",         step: "/v19/os → owner heatmap + next-best HITL queue",                    outcome: "Routes NB-2 carrier ZX-7 to VP Marketplace" },
  { who: "VP Marketplace", step: "Re-approve carrier ZX-7 band (drift 0.9%)",                      outcome: "Band re-owned, drift cleared" },
  { who: "VP Revenue",  step: "/v19/revenue → rate drift 0.4% / margin invariants held",           outcome: "No action needed; evidence snapshot stored" },
  { who: "CFO",         step: "/v19/capital → NB-3 $48k 2-person sign-off",                        outcome: "Controller + CFO distinct approvers logged" },
  { who: "Head of Risk",step: "/v19/risk → NB-5 segment 4 drift acknowledged",                     outcome: "Model snapshot pinned for next review" },
  { who: "Sec/Admin",   step: "/v19/audit → 0 reverse-write attempts, append-only verified",       outcome: "Daily audit attestation captured" },
  { who: "CEO",         step: "/v19/roadmap → H1/H2/H3 horizons reviewed (Phase 52 teaser)",       outcome: "Roadmap acknowledged; Phase 52 deferred" },
];
