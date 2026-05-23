// Phase 40 — V13.5 revenue durability & board strategic OS. Mock-only.
// No autonomous dispatch. No final IPO/acquisition/audit/SOC2/ISO claims.

export const V135_FEATURE_MATRIX = [
  { area: "Revenue Durability Governance Center", ga: "ready", notes: "Durability OS" },
  { area: "Board Strategic Operating System",     ga: "ready", notes: "Cadence + decision log" },
  { area: "Long-Horizon Revenue Intelligence",    ga: "ready", notes: "8Q outlook placeholders" },
  { area: "Capital Diligence Continuity",         ga: "ready", notes: "Always-on diligence" },
  { area: "Marketplace Economics Optimization",   ga: "beta",  notes: "Durability lens" },
  { area: "Partner Channel Durability",           ga: "ready", notes: "Attribution + risk" },
  { area: "Customer Concentration Durability",    ga: "ready", notes: "Top-N over time" },
  { area: "Strategic Account Durability",         ga: "ready", notes: "Value plan durability" },
  { area: "Retention & Expansion Durability",     ga: "ready", notes: "NRR/GRR trajectory" },
  { area: "API/EDI Revenue Durability",           ga: "beta",  notes: "Metered + EDI" },
  { area: "Exec Value Stewardship",               ga: "ready", notes: "Stewardship log" },
  { area: "Board Capital Stewardship",            ga: "ready", notes: "Audit log + minutes" },
  { area: "Long-Term Durability Roadmap",         ga: "ready", notes: "8 horizons" },
  { area: "Strategic Risk Durability Register",   ga: "ready", notes: "16 risk categories" },
  { area: "Durability Evidence Vault",            ga: "beta",  notes: "Pointers + freshness" },
  { area: "Reports — V13.5",                      ga: "ready", notes: "Board-grade exports" },
];

export const V135_DEFERRED = [
  "Fully autonomous dispatch",
  "Final IPO / acquisition readiness claims",
  "Final audited financial claims",
  "Final SOC 2 / ISO certification claims",
  "Autonomous board decision-making",
];

export const V135_DURABILITY = {
  score: 80, trend_qoq: +3,
  kpis: [
    { kpi: "Revenue durability",          pct: 82 },
    { kpi: "Customer durability",         pct: 78 },
    { kpi: "Channel durability",          pct: 76 },
    { kpi: "Marketplace durability",      pct: 70 },
    { kpi: "API/EDI durability",          pct: 66 },
    { kpi: "Partner durability",          pct: 79 },
    { kpi: "Strategic acct durability",   pct: 84 },
    { kpi: "Retention durability",        pct: 85 },
    { kpi: "Concentration durability",    pct: 68 },
    { kpi: "Evidence freshness",          pct: 81 },
    { kpi: "Board decision auditability", pct: 88 },
    { kpi: "Strategic risk durability",   pct: 74 },
  ],
  gaps: [
    { gap: "Top-10 concentration still 36%",       owner: "CRO",     severity: "med" },
    { gap: "API/EDI metered evidence thin",        owner: "RevOps",  severity: "med" },
    { gap: "MP take-rate confidence placeholder",  owner: "MP Ops",  severity: "low" },
  ],
  actions: [
    { action: "Diversify Top-10 with 4 strategic logos", owner: "CRO",    impact: "concentration", due: "this Q" },
    { action: "Stand up metered evidence pipeline",      owner: "RevOps", impact: "API/EDI",       due: "30d" },
    { action: "Lock board decision audit log",           owner: "BoardOps", impact: "board",       due: "this Q" },
  ],
};

export const V135_EXEC_HEADLINE = {
  headline: "Durability 80% (QoQ +3). Strongest: retention + board auditability. Weakest: API/EDI and concentration.",
  highlights: [
    "Board decision auditability at 88%",
    "Retention durability at 85%",
    "Concentration risk still elevated",
  ],
};

export const V135_DURABILITY_TRENDS = [
  { q: "Q-3", score: 71, evidence: 70, board: 78 },
  { q: "Q-2", score: 74, evidence: 74, board: 82 },
  { q: "Q-1", score: 77, evidence: 78, board: 85 },
  { q: "Q-0", score: 80, evidence: 81, board: 88 },
];

export const V135_REV_OUTLOOK_8Q = Array.from({ length: 8 }, (_, i) => ({
  q: `Q+${i + 1}`,
  base_usd_m: 18 + i * 0.6,
  upside_usd_m: 22 + i * 0.8,
  downside_usd_m: 15 + i * 0.4,
  confidence: ["med", "med", "med", "low", "low", "low", "low", "low"][i],
}));

export const V135_BOARD_STRATEGIC_OS = {
  cadence: [
    { ritual: "Monthly board ops digest", owner: "CFO",       cadence: "monthly" },
    { ritual: "Quarterly capital review", owner: "CFO+CEO",   cadence: "quarterly" },
    { ritual: "Durability deep-dive",     owner: "CRO+CFO",   cadence: "quarterly" },
    { ritual: "Strategic risk review",    owner: "BoardChair", cadence: "quarterly" },
  ],
  decisions_log: [
    { decision: "Hold MP take-rate at 12%",             owner: "Board", status: "logged" },
    { decision: "Approve 4 strategic logo program",     owner: "Board", status: "logged" },
    { decision: "Defer IPO readiness milestones to V14", owner: "Board", status: "logged" },
  ],
};

export const V135_DILIGENCE_CONTINUITY = [
  { area: "Revenue evidence",       status: "fresh",       owner: "RevOps" },
  { area: "Customer evidence",      status: "fresh",       owner: "CS Ops" },
  { area: "Partner evidence",       status: "fresh",       owner: "PartnerOps" },
  { area: "Marketplace evidence",   status: "placeholder", owner: "MP Ops" },
  { area: "API/EDI evidence",       status: "placeholder", owner: "RevOps" },
  { area: "Legal evidence",         status: "placeholder", owner: "Legal" },
  { area: "Security evidence",      status: "fresh",       owner: "Security" },
];

export const V135_MP_OPTIMIZATION = {
  score: 70,
  metrics: [
    { metric: "Top-lane take rate",        value: "12.0%", trend: "flat" },
    { metric: "Carrier density (top 5)",   value: "high",  trend: "up" },
    { metric: "Lane GM%",                  value: "18.4%", trend: "up" },
    { metric: "Marketplace NPS",           value: "47",    trend: "up" },
    { metric: "Disputes per 1k loads",     value: "3.2",   trend: "down" },
    { metric: "Cycle time (offer→accept)", value: "9 min", trend: "down" },
  ],
};

export const V135_PARTNER_DURABILITY = [
  { partner: "Partner A", sourced_pct: 22, attribution: "strong",   risk: "low" },
  { partner: "Partner B", sourced_pct: 14, attribution: "moderate", risk: "med" },
  { partner: "Partner C", sourced_pct: 9,  attribution: "moderate", risk: "low" },
  { partner: "Partner D", sourced_pct: 6,  attribution: "weak",     risk: "med" },
];

export const V135_CONCENTRATION = {
  top10_pct: 36, top5_pct: 22, top1_pct: 8,
  trend: [
    { q: "Q-3", top10: 41 }, { q: "Q-2", top10: 39 },
    { q: "Q-1", top10: 37 }, { q: "Q-0", top10: 36 },
  ],
};

export const V135_STRATEGIC_ACCTS = [
  { account: "Acme",       value_plan: "expansion-led", durability: 86 },
  { account: "Globex",     value_plan: "renewal-led",   durability: 78 },
  { account: "Initech",    value_plan: "co-innovation", durability: 82 },
  { account: "Soylent",    value_plan: "expansion-led", durability: 74 },
];

export const V135_RETENTION = {
  nrr_pct: 118, grr_pct: 94,
  trend: [
    { q: "Q-3", nrr: 112, grr: 92 }, { q: "Q-2", nrr: 114, grr: 93 },
    { q: "Q-1", nrr: 116, grr: 93 }, { q: "Q-0", nrr: 118, grr: 94 },
  ],
};

export const V135_API_EDI = {
  score: 66,
  signals: [
    { signal: "Metered consumption variance", value: "±9%",  health: "med" },
    { signal: "EDI 990 acceptance rate",       value: "98.4%", health: "good" },
    { signal: "API key churn",                 value: "2.1%", health: "good" },
    { signal: "Webhook replay rate",           value: "0.7%", health: "good" },
  ],
};

export const V135_EXEC_STEWARDSHIP = {
  score: 84,
  log: [
    { entry: "Stewardship review filed Q-0",   owner: "CEO", status: "logged" },
    { entry: "Durability commitments locked",   owner: "CFO", status: "logged" },
    { entry: "Risk durability acks captured",   owner: "CRO", status: "logged" },
  ],
};

export const V135_BOARD_STEWARDSHIP = {
  score: 88,
  log: [
    { entry: "Board minutes logged",                 owner: "BoardOps", status: "logged" },
    { entry: "Capital stewardship review filed",     owner: "CFO",      status: "logged" },
    { entry: "Decision audit log reconciled",        owner: "BoardOps", status: "logged" },
  ],
};

export const V135_ROADMAP = Array.from({ length: 8 }, (_, i) => ({
  horizon: `H${i + 1}`,
  theme: [
    "Concentration diversification", "MP economics maturity", "API/EDI maturity",
    "Partner durability", "Evidence continuity", "Board strategic OS maturity",
    "Long-horizon revenue intelligence", "Capital diligence continuity",
  ][i],
  owner: ["CRO","MPOps","RevOps","PartnerOps","Security","BoardOps","CFO","CFO"][i],
}));

export const V135_RISK_REGISTER = [
  { risk: "Concentration shock",            owner: "CRO",      severity: "med" },
  { risk: "MP take-rate compression",       owner: "MP Ops",   severity: "med" },
  { risk: "API/EDI metered drift",          owner: "RevOps",   severity: "med" },
  { risk: "Partner attribution dispute",    owner: "PartnerOps", severity: "low" },
  { risk: "Evidence freshness decay",       owner: "Security", severity: "low" },
  { risk: "Board cadence slippage",         owner: "BoardOps", severity: "low" },
  { risk: "Strategic acct churn",           owner: "CRO",      severity: "med" },
  { risk: "Retention slope flattening",     owner: "CS Ops",   severity: "low" },
  { risk: "Marketplace dispute spike",      owner: "MP Ops",   severity: "low" },
  { risk: "Capital diligence gap reopens",  owner: "CFO",      severity: "med" },
  { risk: "Investor narrative drift",       owner: "CFO",      severity: "low" },
  { risk: "Acquirer narrative drift",       owner: "CFO",      severity: "low" },
  { risk: "Legal placeholder persistence",  owner: "Legal",    severity: "med" },
  { risk: "Cert evidence placeholders",     owner: "Security", severity: "med" },
  { risk: "Roadmap horizon slip",           owner: "PMO",      severity: "low" },
  { risk: "Decision auditability gap",      owner: "BoardOps", severity: "low" },
];

export const V135_EVIDENCE_VAULT = [
  { evidence: "Revenue quality packet",   freshness_d: 12, owner: "RevOps" },
  { evidence: "Customer durability pack", freshness_d: 18, owner: "CS Ops" },
  { evidence: "Partner attribution pack", freshness_d: 22, owner: "PartnerOps" },
  { evidence: "MP economics pack",        freshness_d: 30, owner: "MP Ops" },
  { evidence: "API/EDI metered pack",     freshness_d: 41, owner: "RevOps" },
  { evidence: "Board decision log",       freshness_d: 7,  owner: "BoardOps" },
  { evidence: "Trust evidence packet",    freshness_d: 14, owner: "Security" },
];

export const V135_REPORTS = [
  { report: "Board durability digest",        owner: "BoardOps", cadence: "monthly" },
  { report: "Capital diligence continuity",   owner: "CFO",      cadence: "quarterly" },
  { report: "Revenue durability brief",       owner: "CRO",      cadence: "monthly" },
  { report: "Marketplace optimization brief", owner: "MP Ops",   cadence: "monthly" },
  { report: "Partner durability brief",       owner: "PartnerOps", cadence: "quarterly" },
];

export const V135_BACKEND_BOUNDARY = [
  { kind: "ServerFn", name: "durabilityScore",         auth: "user (RLS)" },
  { kind: "ServerFn", name: "boardStrategicCadence",   auth: "user (RLS)" },
  { kind: "ServerFn", name: "evidenceVaultReader",     auth: "user (RLS)" },
  { kind: "ServerFn", name: "concentrationDurability", auth: "user (RLS)" },
  { kind: "ServerFn", name: "partnerDurability",       auth: "user (RLS)" },
  { kind: "Public",   name: "/api/public/v135/investor-durability-digest", auth: "HMAC" },
  { kind: "Public",   name: "/api/public/v135/board-portal-digest",         auth: "HMAC" },
];

export const V135_EDGE_VS_SERVERFN = [
  { kind: "ServerFn", surface: "app-internal RPC",
    example: "durabilityScore(orgId)", why: "type-safe, RLS-scoped" },
  { kind: "Public TSS", surface: "/api/public/v135/*",
    example: "POST investor-durability-digest", why: "external HMAC webhooks" },
  { kind: "Inherited Edge Fn", surface: "supabase/functions/*",
    example: "(none required for V13.5)", why: "kept only for legacy webhooks" },
];

export const V135_RLS_EXAMPLES = [
  { table: "v135_durability_scores",         policy: "org_id = auth.org_id() AND has_role('viewer')" },
  { table: "v135_board_strategy_log",        policy: "has_role('board_admin') OR has_role('cfo')" },
  { table: "v135_durability_evidence_vault", policy: "org_id = auth.org_id()" },
  { table: "v135_strategic_risk_durability", policy: "has_role('cro') OR has_role('cfo')" },
  { table: "v135_capital_diligence_continuity", policy: "has_role('cfo')" },
];

export const V135_RLS_SQL_SNIPPETS = [
  { table: "v135_durability_scores", sql:
`CREATE POLICY "v135_durability_read_by_org"
ON public.v135_durability_scores
FOR SELECT TO authenticated
USING (org_id = (SELECT org_id FROM profiles WHERE id = auth.uid()));` },
  { table: "v135_board_strategy_log", sql:
`CREATE POLICY "v135_board_log_admin_only"
ON public.v135_board_strategy_log
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'board_admin')
    OR public.has_role(auth.uid(), 'cfo'));` },
];

export const V135_ROLE_GUIDANCE = [
  { role: "CEO",        guidance: "Open Durability + Exec Stewardship; review headline + roadmap." },
  { role: "CFO",        guidance: "Capital Diligence Continuity + Board Stewardship; check evidence freshness." },
  { role: "CRO",        guidance: "Concentration Durability + Strategic Account Durability + Risk." },
  { role: "Board Admin", guidance: "Board Strategic OS + decision audit log." },
  { role: "MP Leader",  guidance: "MP Economics Optimization + outlook." },
  { role: "Partner Lead", guidance: "Partner Durability + attribution." },
];

export const V135_DEMO = [
  { role: "CEO",        step: "Open V13.5 Overview",          expect: "Durability headline + 4-card score" },
  { role: "CEO",        step: "Open Roadmap",                 expect: "8 horizons with owners" },
  { role: "CFO",        step: "Open Capital Diligence Cont.", expect: "Always-on diligence freshness" },
  { role: "CFO",        step: "Open Board Stewardship",       expect: "Audit log + minutes" },
  { role: "CRO",        step: "Open Concentration Durability", expect: "Top-N trend + mitigations" },
  { role: "CRO",        step: "Open Strategic Acct Durability", expect: "Per-account durability" },
  { role: "Board Admin", step: "Open Board Strategic OS",      expect: "Cadence + decision log" },
  { role: "MP Leader",  step: "Open MP Optimization",          expect: "Take rate / GM / NPS" },
  { role: "Partner Lead", step: "Open Partner Durability",     expect: "Attribution + risk" },
];

export const V135_DEMO_CLOSEOUT = [
  "No autonomous dispatch enabled",
  "No final IPO / audit / SOC 2 / ISO certification claims",
  "Mock-only durability scoring; evidence is illustrative",
  "Phase 41 (V14) not yet started",
];

export const V135_PHASE41_TEASER = [
  "V14 enterprise durability + capital execution",
  "Long-horizon revenue execution discipline",
  "Capital execution control tower",
  "Board strategic decision execution audit",
];
