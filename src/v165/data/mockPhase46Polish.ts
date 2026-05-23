// V16.5 Polish — Phase 46 polish layer (mock-only)
// Adds richer per-area headlines, owner approval heatmap, evidence freshness,
// policy tuning calibration, RLS examples, edge boundary, demo flow.

export const V165_POLISH_HEADLINES = [
  { area: "Predictive Governance Command", headline: "95% maturity · 12 recs awaiting approval · 3 high-impact",   owner: "CEO" },
  { area: "AI Board Operating System",     headline: "94% packet readiness · 2 evidence gaps · 1 narrative draft", owner: "Board Admin" },
  { area: "Board Packet Intelligence",     headline: "11 evidence categories · 88% auto-assembled · 2 manual",     owner: "Board Admin" },
  { area: "Durable Revenue Automation",    headline: "86% coverage · 9 signals routed · 4 awaiting approval",      owner: "CRO" },
  { area: "Revenue Automation Governance", headline: "92% policy adherence · 0 self-approvals · 1 drift alert",    owner: "CFO" },
  { area: "Marketplace Intelligence Mat.", headline: "89% maturity · 6 routing recs · 2 lane-level optimizations", owner: "MP GM" },
  { area: "Marketplace Auto Governance",   headline: "93% policy adherence · 0 autonomous mutations · HITL on",    owner: "MP GM" },
  { area: "Strategic Approval Orchestr.",  headline: "92% routed correctly · 1 escalation · 0 SLA breaches",       owner: "COO" },
  { area: "Executive Decision Routing",    headline: "90% routed within tier · 2 cross-tier escalations",          owner: "COO" },
  { area: "Predictive Control Monitoring", headline: "37 signals · 91% within 24h SLA · 3 stale",                  owner: "Controls Lead" },
  { area: "Governance Evidence Auto",      headline: "88% auto-assembled · 2 gaps · 0 stale > 7d",                 owner: "Compliance" },
  { area: "Outcome-Based Policy Tuning",   headline: "1 tuning suggestion · 87% calibration · awaiting approval",  owner: "Risk Lead" },
];

export const V165_OWNER_HEATMAP = [
  { owner: "CEO",           pending: 3, approved7d: 12, rejected7d: 1, sla: "98%" },
  { owner: "CFO",           pending: 2, approved7d: 9,  rejected7d: 0, sla: "100%" },
  { owner: "CRO",           pending: 4, approved7d: 14, rejected7d: 2, sla: "94%" },
  { owner: "COO",           pending: 1, approved7d: 7,  rejected7d: 0, sla: "100%" },
  { owner: "MP GM",         pending: 2, approved7d: 11, rejected7d: 1, sla: "96%" },
  { owner: "Board Admin",   pending: 0, approved7d: 4,  rejected7d: 0, sla: "100%" },
  { owner: "Compliance",    pending: 0, approved7d: 6,  rejected7d: 0, sla: "100%" },
  { owner: "Risk Lead",     pending: 1, approved7d: 5,  rejected7d: 0, sla: "100%" },
  { owner: "Controls Lead", pending: 0, approved7d: 3,  rejected7d: 0, sla: "100%" },
];

export const V165_EVIDENCE_FRESHNESS = [
  { category: "Capital execution",      fresh: "94%", stale: 1, owner: "CFO" },
  { category: "Revenue outcomes",       fresh: "91%", stale: 2, owner: "CRO" },
  { category: "Marketplace economics",  fresh: "89%", stale: 1, owner: "MP GM" },
  { category: "Strategic accounts",     fresh: "92%", stale: 1, owner: "CRO" },
  { category: "Partner performance",    fresh: "87%", stale: 2, owner: "Partner Lead" },
  { category: "Product-line P&L",       fresh: "90%", stale: 1, owner: "PM Lead" },
  { category: "Category leadership",    fresh: "88%", stale: 1, owner: "CMO" },
  { category: "Risk register",          fresh: "95%", stale: 0, owner: "Risk Lead" },
  { category: "Control attestations",   fresh: "93%", stale: 1, owner: "Controls Lead" },
  { category: "Recommendation outcomes",fresh: "86%", stale: 2, owner: "CoPilot Ops" },
  { category: "Diligence packs",        fresh: "84%", stale: 2, owner: "CFO" },
];

export const V165_POLICY_CALIBRATION = [
  { policy: "Revenue routing threshold",      current: "$50k MRR",  suggested: "$45k MRR",  basis: "12-wk outcome lift +8%",    owner: "CRO" },
  { policy: "MP lane re-routing trigger",     current: "margin <4%", suggested: "margin <5%", basis: "Drift on 3 lanes",          owner: "MP GM" },
  { policy: "Approval SLA — high-impact",     current: "24h",       suggested: "12h",       basis: "92% approved <12h anyway",   owner: "COO" },
  { policy: "Evidence freshness — board",     current: "30d",       suggested: "14d",       basis: "Board meeting cadence",      owner: "Board Admin" },
  { policy: "Capital deployment ceiling",     current: "$2M",       suggested: "$2M",       basis: "Hold — no calibration drift", owner: "CFO" },
];

export const V165_RLS_POLISH = [
  { name: "automation_no_self_approve",       target: "automation_queue", sql: "USING (approver_id <> recommender_id)" },
  { name: "automation_evidence_required",     target: "automation_queue", sql: "USING (evidence_id IS NOT NULL)" },
  { name: "board_packet_owner_only",          target: "board_packets",    sql: "USING (owner_id = auth.uid() OR has_role('board_admin'))" },
  { name: "policy_tuning_dual_approval",      target: "policy_tunings",   sql: "USING (approver_a IS NOT NULL AND approver_b IS NOT NULL AND approver_a <> approver_b)" },
  { name: "evidence_freshness_window",        target: "evidence_items",   sql: "USING (collected_at > now() - interval '30 days')" },
  { name: "risk_routing_audit_only_read",     target: "risk_routing_log", sql: "FOR SELECT USING (has_role('risk_lead') OR has_role('compliance'))" },
  { name: "exec_routing_tier_scoped",         target: "exec_decisions",   sql: "USING (tier <= user_tier(auth.uid()))" },
];

export const V165_EDGE_BOUNDARY_POLISH = [
  { layer: "createServerFn",     concern: "Approval submit, evidence attach, policy tuning request", auth: "Authenticated + RLS", returns: "Typed DTO" },
  { layer: "createServerFn",     concern: "Board packet assemble, exec decision route",              auth: "Authenticated + RLS", returns: "Typed DTO" },
  { layer: "/api/public/*",      concern: "Signal ingestion webhooks, cron-triggered scoring",       auth: "HMAC signature",      returns: "Raw Response" },
  { layer: "Edge Function",      concern: "Batch predictive scoring, evidence collection jobs",      auth: "Service role",        returns: "Async / queue" },
  { layer: "Edge Function",      concern: "Outcome aggregation, calibration drift detection",        auth: "Service role",        returns: "Persisted metrics" },
  { layer: "Client",             concern: "Display predictions, evidence, queue · NEVER mutate",     auth: "Session",             returns: "Read-only" },
];

export const V165_DEMO_POLISH = [
  { step: 1,  actor: "CEO",         surface: "/v165/overview",        action: "Reviews V16.5 headline + 4 maturity scores",   outcome: "Aligns leadership on governance posture" },
  { step: 2,  actor: "CEO",         surface: "/v165/command",         action: "Opens command center, 12 recs across 8 owners", outcome: "Confirms HITL gating on every high-impact rec" },
  { step: 3,  actor: "CFO",         surface: "/v165/capital-auto",    action: "Reviews 2 capital routing recommendations",     outcome: "Approves 1, sends 1 back for evidence" },
  { step: 4,  actor: "CRO",         surface: "/v165/revenue-auto",    action: "Sees 4 revenue automation recs + evidence",     outcome: "Approves 2, escalates 1 to CEO, holds 1" },
  { step: 5,  actor: "CRO",         surface: "/v165/revenue-gov",     action: "Confirms 92% policy adherence, 0 self-approvals", outcome: "Signs off weekly governance attestation" },
  { step: 6,  actor: "MP GM",       surface: "/v165/mp-maturity",     action: "Reviews 6 routing recs at lane granularity",    outcome: "Approves 3 lane optimizations" },
  { step: 7,  actor: "MP GM",       surface: "/v165/mp-gov",          action: "Confirms zero autonomous mutations, HITL on",   outcome: "Validates marketplace governance posture" },
  { step: 8,  actor: "COO",         surface: "/v165/exec-routing",    action: "Reviews 2 cross-tier escalations + SLAs",       outcome: "Routes 1 to CEO, owns 1 directly" },
  { step: 9,  actor: "Risk Lead",   surface: "/v165/policy-tuning",   action: "Reviews 1 outcome-based tuning suggestion",     outcome: "Approves with dual-approval (CFO co-sign)" },
  { step: 10, actor: "Compliance",  surface: "/v165/evidence-auto",   action: "Closes 2 evidence gaps flagged by CoPilot",     outcome: "Board packet evidence reaches 100%" },
  { step: 11, actor: "Board Admin", surface: "/v165/board-packet",    action: "Finalizes packet, narrative draft attached",    outcome: "Sends to board with full evidence chain" },
  { step: 12, actor: "CEO",         surface: "/v165/board-report",    action: "Reviews predictive intelligence board report",  outcome: "Confirms V16.5 ready for next board meeting" },
];

export const V165_ROADMAP_POLISH = [
  { horizon: "Now (V16.5)",   focus: "Predictive governance maturity · HITL on every high-impact action",         signal: "Approval orchestration 92%, evidence automation 88%" },
  { horizon: "Next (V17)",    focus: "Predictive board operations + cross-domain orchestration",                   signal: "Multi-owner routing, board narrative AI-drafted" },
  { horizon: "Later (V17.5)", focus: "Autonomous-assist policy tuning with dual-approval default",                 signal: "Calibration drift auto-detected and routed" },
  { horizon: "Long (V18)",    focus: "Enterprise predictive operating system — read-only autonomy in safe domains", signal: "Selective autonomy with audit + reversibility" },
];

export const V165_PHASE47_TEASER_POLISH =
  "Phase 47 (V17) teaser — predictive board operations, cross-domain orchestration, AI-drafted board narrative, and broader recommendation evidence coverage. Still HITL on every high-impact action.";
