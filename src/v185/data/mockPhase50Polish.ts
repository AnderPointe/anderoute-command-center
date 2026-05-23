// Phase 50 polish — V18.5 Enterprise Control Assurance (mock only)

export const V185_POLISH_HEADLINES = [
  { area: "Control Assurance Command", headline: "97% enterprise assurance, 0 unmitigated exceptions", kpi: "97%" },
  { area: "Autonomous-Assist Resilience", headline: "MTTR 14m, 0 P1 incidents in last 30d", kpi: "14m" },
  { area: "Board Intelligence Assurance", headline: "100% board packets evidence-backed", kpi: "100%" },
  { area: "Revenue Control Maturity", headline: "Margin guard 99.4% adherence, 0 leak events", kpi: "99.4%" },
  { area: "Marketplace Control Optimization", headline: "Carrier mix within policy bands 98%", kpi: "98%" },
  { area: "Executive Governance Assurance", headline: "All exec approvals SLA-met, 0 stale", kpi: "0 stale" },
  { area: "Automation Resilience Controls", headline: "Retry success 99.1%, dead-letter 0.02%", kpi: "99.1%" },
  { area: "Human Approval Assurance", headline: "Approver≠recommender enforced 100%", kpi: "100%" },
  { area: "Recommendation Control Assurance", headline: "Rec quality 4.7/5, drift 0.6%", kpi: "4.7/5" },
  { area: "Outcome Learning Assurance", headline: "Closed-loop coverage 96%", kpi: "96%" },
  { area: "Evidence Assurance", headline: "Evidence freshness median 9m", kpi: "9m" },
  { area: "Predictive Risk Control Assurance", headline: "Top-10 risk signals owner-assigned 100%", kpi: "100%" },
  { area: "Capital Control Assurance", headline: "Threshold approvals 2-person 100%", kpi: "2-person" },
  { area: "Strategic Account Control", headline: "Tier-1 account guardrails 100% on", kpi: "100%" },
  { area: "Partner Control Assurance", headline: "Partner data redaction 100%", kpi: "100%" },
  { area: "Product-Line Control", headline: "Product controls drift 0.4%", kpi: "0.4%" },
  { area: "Category Control", headline: "Category bands respected 99%", kpi: "99%" },
  { area: "Resilience Audit", headline: "Append-only audit 100%, signed 100%", kpi: "100%" },
  { area: "Board Assurance Reporting", headline: "Weekly packet auto-built, exec-signed", kpi: "weekly" },
  { area: "Long-term Roadmap", headline: "5 horizons, 0 conflicts with V19 teaser", kpi: "5" },
];

export const V185_OWNER_HEATMAP = [
  { owner: "CEO",        load: "Med",  approvals_24h: 6,  sla: "30m review · 4h approval" },
  { owner: "CFO",        load: "High", approvals_24h: 11, sla: "45m · 6h" },
  { owner: "CRO",        load: "Med",  approvals_24h: 8,  sla: "60m · 6h" },
  { owner: "CCO",        load: "Low",  approvals_24h: 3,  sla: "30m · 8h" },
  { owner: "Chief AI",   load: "Med",  approvals_24h: 7,  sla: "30m · 12h" },
  { owner: "VP Marketplace", load: "High", approvals_24h: 12, sla: "45m · 8h" },
  { owner: "VP Partners",load: "Low",  approvals_24h: 4,  sla: "30m · 12h" },
  { owner: "VP Product", load: "Med",  approvals_24h: 5,  sla: "30m · 12h" },
  { owner: "Board Admin",load: "Low",  approvals_24h: 1,  sla: "90m · weekly" },
  { owner: "Sec/Admin",  load: "Med",  approvals_24h: 9,  sla: "20m · 4h" },
];

export const V185_EVIDENCE_FRESHNESS = [
  { category: "Board packets", median_age: "9m",  stale_pct: "0.0%" },
  { category: "Revenue control", median_age: "6m",  stale_pct: "0.1%" },
  { category: "Marketplace bands", median_age: "11m", stale_pct: "0.4%" },
  { category: "Capital thresholds", median_age: "5m",  stale_pct: "0.0%" },
  { category: "Carrier data (redacted)", median_age: "14m", stale_pct: "0.6%" },
  { category: "Risk signals", median_age: "8m",  stale_pct: "0.2%" },
  { category: "Audit log", median_age: "1m",  stale_pct: "0.0%" },
];

export const V185_POLICY_CALIBRATION_DRIFT = [
  { policy: "Margin guard band", drift: "0.2%", action: "Hold" },
  { policy: "Carrier mix band",  drift: "0.7%", action: "Recalibrate Q+1" },
  { policy: "Capital threshold", drift: "0.0%", action: "Hold" },
  { policy: "Approval ≠ recommender", drift: "0.0%", action: "Hold" },
  { policy: "Evidence freshness SLA", drift: "0.3%", action: "Hold" },
  { policy: "Audience-gated packets", drift: "0.0%", action: "Hold" },
];

export const V185_RLS_EXAMPLES_2 = [
  { name: "v185_assurance_company_member", target: "assurance_scores", sql: "USING (is_company_member(auth.uid(), company_id))" },
  { name: "v185_audit_append_only", target: "audit_events", sql: "FOR INSERT WITH CHECK (true); no UPDATE/DELETE policy" },
  { name: "v185_audit_no_delete", target: "audit_events", sql: "REVOKE DELETE ON audit_events FROM authenticated" },
  { name: "v185_high_impact_hitl", target: "recommendations", sql: "WITH CHECK (impact < 50000 OR approver_id IS NOT NULL)" },
  { name: "v185_approver_not_recommender", target: "approvals", sql: "WITH CHECK (approver_id <> recommender_id)" },
  { name: "v185_two_person_capital", target: "capital_actions", sql: "WITH CHECK (approver_1_id IS NOT NULL AND approver_2_id IS NOT NULL AND approver_1_id <> approver_2_id)" },
  { name: "v185_carrier_redacted_revenue", target: "carrier_revenue_v", sql: "USING (has_role(auth.uid(), company_id, 'cfo'))" },
  { name: "v185_customer_blocked_admin", target: "admin_ops", sql: "USING (NOT is_customer_user(auth.uid(), company_id))" },
  { name: "v185_board_packet_audience", target: "board_packets", sql: "USING (audience @> ARRAY[(current_setting('app.audience'))::text])" },
  { name: "v185_evidence_insert_only", target: "evidence_items", sql: "FOR INSERT WITH CHECK (auth.uid() = recorded_by)" },
  { name: "v185_policy_change_two_person", target: "policy_versions", sql: "WITH CHECK (proposer_id <> approver_id)" },
  { name: "v185_marketplace_band_owner", target: "mp_bands", sql: "USING (has_role(auth.uid(), company_id, 'vp_marketplace'))" },
];

export const V185_EDGE_BOUNDARY_2 = [
  { layer: "ServerFn", concern: "Score recompute (assurance)", auth: "session+role", returns: "DTO score" },
  { layer: "ServerFn", concern: "HITL queue read",            auth: "session",      returns: "DTO list" },
  { layer: "ServerFn", concern: "Approval submit (2-person)", auth: "session+role", returns: "DTO ack" },
  { layer: "Edge",     concern: "Board packet PDF render",    auth: "service",      returns: "binary URL" },
  { layer: "Edge",     concern: "Evidence signing/sealing",   auth: "service",      returns: "signature" },
  { layer: "Edge",     concern: "Audit batch export",         auth: "service",      returns: "signed bundle" },
  { layer: "/api/public", concern: "Carrier webhook (HMAC)",  auth: "HMAC",         returns: "ok / 401" },
  { layer: "/api/public", concern: "Cron: nightly assurance recompute", auth: "shared secret", returns: "ok" },
  { layer: "/api/public", concern: "Health probe",            auth: "open",         returns: "ok (no PII)" },
];

export const V185_PERSONA_SLAS = [
  { persona: "CEO", review: "30m", approval: "4h", channel: "Command Center" },
  { persona: "CFO", review: "45m", approval: "6h", channel: "Revenue / Capital" },
  { persona: "CRO", review: "60m", approval: "6h", channel: "Revenue Maturity" },
  { persona: "CCO", review: "30m", approval: "8h", channel: "Policy / Approval" },
  { persona: "Chief AI", review: "30m", approval: "12h", channel: "Recommendation Assurance" },
  { persona: "VP MP", review: "45m", approval: "8h", channel: "MP Optimization" },
  { persona: "VP Partners", review: "30m", approval: "12h", channel: "Partner Assurance" },
  { persona: "VP Product", review: "30m", approval: "12h", channel: "Product Assurance" },
  { persona: "Board Admin", review: "90m", approval: "weekly", channel: "Board Reporting" },
  { persona: "Sec/Admin", review: "20m", approval: "4h", channel: "Audit / Resilience" },
];

export const V185_INVARIANTS = [
  "approver_id ≠ recommender_id (enforced in RLS + UI)",
  "evidence_items: INSERT-only, never UPDATE/DELETE",
  "audit_events: append-only, signed, no DELETE grant",
  "carrier_revenue exposed only via redacted view",
  "customer users excluded from admin ops",
  "board packets audience-gated by app.audience setting",
  "capital actions require 2-person approval (distinct ids)",
  "high-impact recs (≥ $50k) require human approval",
  "policy changes require proposer ≠ approver",
  "no fully autonomous dispatch — all material actions HITL",
];

export const V185_NEXT_BEST_ACTIONS = [
  { rank: 1, action: "Approve carrier mix band recalibration",       owner: "VP Marketplace", impact: "Margin +0.4 pt", hitl: true },
  { rank: 2, action: "Sign Q3 board assurance packet",                owner: "CEO + Board Admin", impact: "Board-ready", hitl: true },
  { rank: 3, action: "Re-attest top-10 risk signal owners",           owner: "CCO", impact: "Risk coverage 100%", hitl: true },
  { rank: 4, action: "Approve $120k strategic-account credit (2-of)", owner: "CFO + CRO", impact: "Renewal", hitl: true },
  { rank: 5, action: "Roll evidence-freshness SLA from 15m → 10m",    owner: "Chief AI", impact: "Assurance +1 pt", hitl: true },
  { rank: 6, action: "Close 3 resilience audit findings",             owner: "Sec/Admin", impact: "Audit 100%", hitl: true },
];

export const V185_DEMO_FLOW_2 = [
  { who: "CEO",         step: "Open Command Center, review 97% assurance score", outcome: "Sees 0 unmitigated exceptions" },
  { who: "CEO",         step: "Drill into Operating Resilience",                  outcome: "Confirms MTTR 14m, 0 P1" },
  { who: "CFO",         step: "Review Revenue Control Maturity",                  outcome: "Margin guard 99.4%, signs off" },
  { who: "CRO",         step: "Approve strategic-account credit (2-person)",      outcome: "Logged, evidence sealed" },
  { who: "VP MP",       step: "Recalibrate carrier mix band",                     outcome: "Proposed, awaits CCO approval" },
  { who: "CCO",         step: "Approve MP band change (≠ proposer)",              outcome: "Policy version bumped, audited" },
  { who: "Chief AI",    step: "Open Recommendation Control Assurance",            outcome: "Drift 0.6%, no action" },
  { who: "Chief AI",    step: "Tighten evidence-freshness SLA to 10m",            outcome: "HITL approval requested" },
  { who: "CCO",         step: "Approve SLA tightening",                           outcome: "Rolled, audited" },
  { who: "VP Partners", step: "Verify partner data redaction",                    outcome: "100%, no exceptions" },
  { who: "VP Product",  step: "Check product-line control drift",                 outcome: "0.4%, hold" },
  { who: "Sec/Admin",   step: "Close 3 audit findings, re-sign bundle",           outcome: "Audit 100%, signed" },
  { who: "Board Admin", step: "Auto-build weekly board assurance packet",         outcome: "Evidence-backed, audience-gated" },
  { who: "CEO",         step: "Sign and publish packet",                          outcome: "Board notified, archived" },
  { who: "CEO",         step: "Review long-term roadmap horizons",                outcome: "5 horizons, V19 teaser noted" },
];

export const V185_AREA_DEPTH = [
  { area: "Control Assurance Command", kpis: ["Assurance 97%", "Exceptions 0", "Coverage 100%", "Signed 100%"], sla: "Live" },
  { area: "Operating Resilience",      kpis: ["MTTR 14m", "P1 0", "Retry 99.1%", "DLQ 0.02%"], sla: "5m alert" },
  { area: "Board Intelligence",        kpis: ["Packets 100% evidence", "Signed 100%", "Audience-gated 100%", "Weekly cadence"], sla: "weekly" },
  { area: "Revenue Maturity",          kpis: ["Margin guard 99.4%", "Leak 0", "Forecast err 1.8%", "Approvals SLA 100%"], sla: "6h approval" },
  { area: "Marketplace Optimization",  kpis: ["Mix in band 98%", "Drift 0.7%", "Carriers gov'd 100%", "Reprice HITL"], sla: "8h approval" },
  { area: "Executive Governance",      kpis: ["Approvals SLA 100%", "Stale 0", "2-person 100%", "Audit 100%"], sla: "per persona" },
  { area: "Automation Resilience",     kpis: ["Retry 99.1%", "DLQ 0.02%", "Idempotent 100%", "Replay tested"], sla: "5m alert" },
  { area: "Human Approval",            kpis: ["Approver≠Rec 100%", "Two-person on capital 100%", "HITL high-impact 100%", "Audit trail 100%"], sla: "per persona" },
  { area: "Recommendation Assurance",  kpis: ["Quality 4.7/5", "Drift 0.6%", "Coverage 96%", "Owner-tagged 100%"], sla: "12h approval" },
  { area: "Outcome Learning",          kpis: ["Closed-loop 96%", "Win-rate Δ +2.1pt", "Regret 1.3%", "Replay 100%"], sla: "weekly" },
  { area: "Evidence",                  kpis: ["Median age 9m", "Stale 0.2%", "Signed 100%", "Insert-only 100%"], sla: "10m" },
  { area: "Predictive Risk",           kpis: ["Top-10 owned 100%", "Open >7d 0", "Coverage 100%", "Audit 100%"], sla: "24h triage" },
  { area: "Capital Controls",          kpis: ["2-person 100%", "Threshold drift 0%", "Stale 0", "Audit 100%"], sla: "6h approval" },
  { area: "Account Controls",          kpis: ["Tier-1 guards 100%", "Drift 0.3%", "Owner 100%", "Audit 100%"], sla: "6h approval" },
  { area: "Partner Controls",          kpis: ["Redaction 100%", "Drift 0.5%", "Owner 100%", "Audit 100%"], sla: "12h approval" },
  { area: "Product Controls",          kpis: ["Drift 0.4%", "Owner 100%", "Bands 100%", "Audit 100%"], sla: "12h approval" },
  { area: "Category Controls",         kpis: ["Bands 99%", "Drift 0.6%", "Owner 100%", "Audit 100%"], sla: "12h approval" },
  { area: "Resilience Audit",          kpis: ["Append-only 100%", "Signed 100%", "Findings closed 100%", "Bundle exported"], sla: "4h" },
  { area: "Board Reporting",           kpis: ["Auto-built", "Evidence 100%", "Audience-gated", "Exec-signed"], sla: "weekly" },
  { area: "Roadmap",                   kpis: ["5 horizons", "0 conflicts", "Owner-tagged", "Reviewed Q+1"], sla: "quarterly" },
];

export const V185_GUARDRAILS_2 = [
  "No fully autonomous dispatch — all material actions HITL.",
  "approver_id ≠ recommender_id enforced at DB and UI.",
  "All capital actions require 2 distinct approvers.",
  "Evidence and audit are insert-only/append-only.",
  "Carrier revenue available only via redacted view to CFO+.",
  "Customers excluded from admin operations.",
  "Board packets audience-gated; no leaks across boards.",
  "Public endpoints are HMAC-verified and never return PII.",
];
