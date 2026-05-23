// V17.5 — Governed Enterprise Automation Scale (mock-only, Phase 48)

const score = (n: number) => `${n}%`;

export const V175_SCOPE = {
  version: "V17.5",
  posture: "Governed enterprise automation scale — human-approved, explainable, auditable",
  included: [
    "Governed Enterprise Automation Scale Center",
    "Predictive Board Execution Maturity Center",
    "Revenue Automation Optimization Center",
    "Marketplace Automation Governance Center",
    "Strategic Intelligence Operating Excellence Center",
    "Executive Automation Oversight Center",
    "Automation Control Maturity Center",
    "Board Automation Evidence Center",
    "Approval Orchestration Scale Center",
    "Evidence Automation Scale Center",
    "Outcome Learning Maturity Center",
    "Recommendation Quality Improvement Center",
    "Predictive Risk Operations Scale Center",
    "Capital Intelligence Automation Center",
    "Strategic Account Automation Maturity Center",
    "Partner Automation Maturity Center",
    "Product-Line Automation Maturity Center",
    "Category Leadership Automation Maturity Center",
    "Governed Automation Audit Center",
    "Board Automation Scale Reporting",
    "Long-Term Automation Scale Roadmap",
    "V17.5 Reports Dashboard",
  ],
  deferred: [
    "Fully autonomous dispatch",
    "Fully autonomous pricing / billing",
    "Fully autonomous marketplace mutations",
    "Autonomous customer / carrier actions",
    "Autonomous compliance / legal actions",
    "Autonomous board / capital decisions",
    "Final IPO / acquisition claims",
    "Final audited financial claims",
    "Final certification claims without evidence",
    "Customs production workflows",
    "International tax automation",
    "Insurance underwriting automation",
    "Autonomous vehicle workflows",
    "Final Android Auto / CarPlay claims",
  ],
};

export const V175_FEATURE_MATRIX = [
  { feature: "Governed Enterprise Automation Scale",        status: "live" },
  { feature: "Predictive Board Execution Maturity",         status: "live" },
  { feature: "Revenue Automation Optimization",             status: "live" },
  { feature: "Marketplace Automation Governance",           status: "live" },
  { feature: "Strategic Intelligence Operating Excellence", status: "live" },
  { feature: "Executive Automation Oversight",              status: "live" },
  { feature: "Automation Control Maturity",                 status: "live" },
  { feature: "Board Automation Evidence",                   status: "live" },
  { feature: "Approval Orchestration Scale",                status: "live" },
  { feature: "Evidence Automation Scale",                   status: "live" },
  { feature: "Outcome Learning Maturity",                   status: "live" },
  { feature: "Recommendation Quality Improvement",          status: "live" },
  { feature: "Predictive Risk Operations Scale",            status: "live" },
  { feature: "Capital / Account / Partner / Product / Category Automation Maturity", status: "live" },
  { feature: "Governed Automation Audit",                   status: "live" },
  { feature: "Board Automation Scale Reporting",            status: "live" },
  { feature: "Long-Term Automation Scale Roadmap",          status: "live" },
  { feature: "Autonomous dispatch / pricing / billing",     status: "deferred" },
];

export const V175_HEADLINE = {
  headline: "V17.5 — governed automation scale 96% · approval orchestration scale 93% · evidence automation scale 89%",
  highlights: [
    "18 governed automation requests routed across 9 owners; 0 self-approvals",
    "Board automation evidence reaches 89% with 2 gaps tracked for remediation",
    "Outcome learning maturity 87% — calibration drift detected on 2 policies",
    "Marketplace Southeast carrier density flagged; preferred-carrier expansion awaiting approval",
  ],
};

const kpis = (xs: [string, string][]) => xs.map(([label, value]) => ({ label, value }));

export const V175_GOVERNED_SCALE = {
  score: score(96),
  kpis: kpis([
    ["Automation policy compliance", "98%"],
    ["Human approval health",        "93%"],
    ["Automation volume (7d)",       "1,284"],
    ["Automation success rate",      "97%"],
    ["Automation exception rate",    "1.8%"],
    ["Recommendation quality",       "87%"],
    ["Evidence automation coverage", "89%"],
    ["Approval routing coverage",    "94%"],
    ["Board automation coverage",    "90%"],
    ["Revenue automation coverage",  "88%"],
    ["MP automation coverage",       "86%"],
    ["Capital automation coverage",  "85%"],
    ["Account automation coverage",  "87%"],
    ["Partner automation coverage",  "84%"],
    ["Product-line auto coverage",   "86%"],
    ["Category automation coverage", "83%"],
    ["Audit completeness",           "91%"],
    ["Self-approval attempts",       "0"],
  ]),
  health_map: [
    { domain: "Revenue",    health: "88%" },
    { domain: "Marketplace", health: "86%" },
    { domain: "Capital",    health: "85%" },
    { domain: "Accounts",   health: "87%" },
    { domain: "Partners",   health: "84%" },
    { domain: "Product",    health: "86%" },
    { domain: "Category",   health: "83%" },
    { domain: "Board",      health: "90%" },
    { domain: "Audit",      health: "91%" },
  ],
  coverage_matrix: [
    { area: "Renewals",            coverage: "92%", owner: "CRO",   evidence: "fresh" },
    { area: "Expansion",           coverage: "85%", owner: "CRO",   evidence: "fresh" },
    { area: "Churn prevention",    coverage: "81%", owner: "CRO",   evidence: "1 stale" },
    { area: "MP lane routing",     coverage: "87%", owner: "MP GM", evidence: "fresh" },
    { area: "Carrier density",     coverage: "82%", owner: "MP GM", evidence: "1 stale" },
    { area: "Capital evidence",    coverage: "85%", owner: "CFO",   evidence: "fresh" },
    { area: "Account expansion",   coverage: "87%", owner: "CS",    evidence: "fresh" },
    { area: "Partner enablement",  coverage: "84%", owner: "Partner Lead", evidence: "1 stale" },
    { area: "Product adoption",    coverage: "86%", owner: "PM Lead", evidence: "fresh" },
    { area: "Category proof",      coverage: "83%", owner: "CMO",    evidence: "fresh" },
    { area: "Board packets",       coverage: "90%", owner: "Board Admin", evidence: "fresh" },
  ],
  gaps: [
    { area: "Category automation",      gap: "Proof-asset publishing approval pipeline below 85%",  owner: "CMO" },
    { area: "Partner automation",       gap: "Joint-customer signal coverage uneven across regions", owner: "Partner Lead" },
    { area: "Capital automation",       gap: "Investor-evidence freshness drifts past 14d in 2 categories", owner: "CFO" },
    { area: "Outcome learning",         gap: "Confidence calibration drift on 2 policies",          owner: "Risk Lead" },
  ],
  action_plan: [
    { item: "Approve preferred-carrier expansion (Southeast)", owner: "CEO",   due: "Today" },
    { item: "Close 2 capital evidence gaps before board",      owner: "CFO",   due: "+3d" },
    { item: "Refresh 2 stale revenue evidence items",          owner: "CRO",   due: "+5d" },
    { item: "Remediate marketplace automation control gap",    owner: "MP GM", due: "+5d" },
    { item: "Tune 2 calibration-drift policies (dual-approve)", owner: "Risk Lead", due: "+7d" },
  ],
};

export const V175_BOARD_EXEC_MATURITY = {
  score: score(91),
  kpis: kpis([
    ["Agenda automation readiness", "92%"],
    ["Packet automation readiness", "90%"],
    ["KPI appendix completeness",   "94%"],
    ["Evidence completeness",       "86%"],
    ["Decision routing accuracy",   "93%"],
    ["Risk review completeness",    "89%"],
    ["Action follow-up health",     "91%"],
    ["Approval workflow health",    "94%"],
    ["Evidence freshness",          "88%"],
    ["Explainability completeness", "90%"],
    ["Outcome tracking",            "87%"],
    ["Open exceptions",             "2"],
    ["Readiness blockers",          "1"],
  ]),
  agenda: [
    { item: "Governed automation scale report",  status: "auto-drafted", owner: "Board Admin" },
    { item: "Revenue automation optimization",   status: "auto-drafted", owner: "CRO" },
    { item: "Marketplace automation governance", status: "auto-drafted", owner: "MP GM" },
    { item: "Capital intelligence automation",   status: "manual review", owner: "CFO" },
    { item: "Predictive risk operations scale",  status: "auto-drafted", owner: "Risk Lead" },
    { item: "Outcome learning maturity",         status: "auto-drafted", owner: "Risk Lead" },
  ],
  packet: [
    { section: "Executive summary",        status: "auto", owner: "CEO" },
    { section: "Governed automation scale", status: "auto", owner: "CEO" },
    { section: "Revenue automation",        status: "auto", owner: "CRO" },
    { section: "Marketplace governance",    status: "auto", owner: "MP GM" },
    { section: "Capital evidence",          status: "manual: 2 gaps", owner: "CFO" },
    { section: "Risk operations",           status: "auto", owner: "Risk Lead" },
    { section: "Audit + exceptions",        status: "auto", owner: "Compliance" },
  ],
  decision_routing: [
    { decision: "Approve preferred-carrier expansion (Southeast)", tier: "CEO",   sla: "24h", status: "pending" },
    { decision: "Approve 2 capital evidence remediations",         tier: "CFO",   sla: "24h", status: "in review" },
    { decision: "Approve category proof-asset publishing",         tier: "CMO",   sla: "48h", status: "pending" },
  ],
  follow_up: [
    { action: "Renewal automation expansion",       owner: "CRO",     status: "on track" },
    { action: "Marketplace control remediation",    owner: "MP GM",   status: "in progress" },
    { action: "Partner enablement automation gap",  owner: "Partner Lead", status: "scheduled" },
  ],
  blockers: ["1 capital evidence category requires 3rd-party source refresh"],
};

const matrix = (areas: { area: string; score: string; note: string }[]) => areas;

export const V175_REVENUE_OPT = {
  score: score(88),
  kpis: kpis([
    ["Renewal automation",         "92%"],
    ["Expansion automation",       "85%"],
    ["Churn prevention",           "81%"],
    ["Revenue evidence automation","87%"],
    ["Payment health automation",  "90%"],
    ["Billing dispute automation", "78%"],
    ["Customer concentration auto","82%"],
    ["Product-line concentration", "84%"],
    ["MP revenue automation",      "86%"],
    ["API/EDI revenue automation", "83%"],
    ["Partner revenue automation", "80%"],
    ["Approval routing quality",   "94%"],
    ["Outcome learning quality",   "87%"],
    ["Revenue automation excpns",  "3"],
  ]),
  matrix: matrix([
    { area: "Renewal",        score: "92%", note: "Strong; 3 high-value renewals awaiting CRO sign-off" },
    { area: "Expansion",      score: "85%", note: "Improving; expansion playbook coverage at 87% of accounts" },
    { area: "Churn prevention", score: "81%", note: "1 strategic account at risk; CS owns intervention" },
    { area: "Customer concentration", score: "82%", note: "1 exception: top-1 customer >18% MRR" },
    { area: "Revenue evidence", score: "87%", note: "2 stale items: ARR cohort retention, gross margin by lane" },
  ]),
  exceptions: [
    { id: "REV-X-018", area: "Customer concentration", desc: "Top customer crossed 18% MRR threshold", owner: "CRO" },
    { id: "REV-X-019", area: "Billing dispute",        desc: "Aging > 60d on 2 strategic accounts",     owner: "CFO" },
    { id: "REV-X-020", area: "Evidence freshness",     desc: "2 ARR evidence items > 14d old",          owner: "CRO" },
  ],
  plan: [
    { item: "Refresh ARR cohort retention evidence", owner: "CRO", due: "+3d" },
    { item: "CRO to approve top-3 high-value renewals", owner: "CRO", due: "Today" },
    { item: "CFO to route aged disputes to deal desk", owner: "CFO", due: "+2d" },
  ],
};

export const V175_MP_GOVERNANCE = {
  score: score(86),
  kpis: kpis([
    ["Carrier density signal auto", "84%"],
    ["Equipment coverage auto",     "87%"],
    ["Load coverage auto",          "89%"],
    ["Bid density auto",            "82%"],
    ["Time-to-award auto",          "88%"],
    ["Regional liquidity auto",     "83%"],
    ["Lane liquidity auto",         "85%"],
    ["Carrier quality auto",        "90%"],
    ["Carrier compliance auto",     "92%"],
    ["Dispute trend auto",          "86%"],
    ["MP revenue auto",             "86%"],
    ["Approval routing health",     "94%"],
    ["Outcome tracking health",     "88%"],
    ["MP automation exceptions",    "2"],
  ]),
  signals: matrix([
    { area: "Carrier density",   score: "84%", note: "Southeast flagged: density below regional target" },
    { area: "Equipment coverage", score: "87%", note: "Reefer coverage soft in PNW" },
    { area: "Bid density",       score: "82%", note: "Lane bid density below 4 bids on 6% of loads" },
    { area: "Time-to-award",     score: "88%", note: "Within SLA on 88% of loads" },
    { area: "Carrier quality",   score: "90%", note: "On-time delivery 96.4%" },
    { area: "Carrier compliance", score: "92%", note: "Insurance + auth attestations current" },
  ]),
  regional: [
    { region: "Texas",     health: "92%", note: "Strong" },
    { region: "Midwest",   health: "90%", note: "Strong" },
    { region: "Southeast", health: "78%", note: "Density risk — expansion routed for approval" },
    { region: "PNW",       health: "85%", note: "Reefer coverage soft" },
    { region: "Northeast", health: "88%", note: "Healthy" },
  ],
  lane_liquidity: [
    { lane: "TX→FL",  liquidity: "82%", note: "Watch — backhaul soft" },
    { lane: "IL→TX",  liquidity: "94%", note: "Strong" },
    { lane: "CA→NV",  liquidity: "91%", note: "Strong" },
    { lane: "GA→NC",  liquidity: "76%", note: "Density risk (Southeast)" },
  ],
  exceptions: [
    { id: "MP-X-041", area: "Carrier density",   desc: "Southeast carrier density below floor for 7d",  owner: "MP GM" },
    { id: "MP-X-042", area: "Marketplace control", desc: "Control test failed on routing-policy audit", owner: "MP GM" },
  ],
  plan: [
    { item: "Approve preferred-carrier expansion (Southeast)",      owner: "CEO",   due: "Today" },
    { item: "Remediate routing-policy control test",                owner: "MP GM", due: "+5d" },
    { item: "Lane review — TX→FL and GA→NC backhaul",               owner: "MP GM", due: "+7d" },
  ],
};

export const V175_STRAT_INTEL_OPS = {
  score: score(90),
  kpis: kpis([
    ["Signal quality",            "92%"],
    ["Signal coverage",           "89%"],
    ["Recommendation quality",    "87%"],
    ["Explainability quality",    "91%"],
    ["Evidence completeness",     "89%"],
    ["Approval workflow health",  "94%"],
    ["Outcome tracking maturity", "87%"],
    ["Risk routing maturity",     "92%"],
    ["Executive workflow maturity","90%"],
    ["Board workflow maturity",   "91%"],
    ["Policy tuning maturity",    "85%"],
    ["Human override readiness",  "96%"],
    ["Audit trail completeness",  "93%"],
    ["Control exceptions",        "3"],
  ]),
  health_map: [
    { workflow: "Recommendation generation", health: "92%" },
    { workflow: "Evidence collection",       health: "89%" },
    { workflow: "Approval orchestration",    health: "94%" },
    { workflow: "Risk routing",              health: "92%" },
    { workflow: "Outcome tracking",          health: "87%" },
    { workflow: "Policy tuning",             health: "85%" },
    { workflow: "Audit trail",               health: "93%" },
  ],
  gaps: [
    { area: "Policy tuning",     gap: "Dual-approval coverage uneven across domains",  owner: "Risk Lead" },
    { area: "Outcome tracking",  gap: "Marketplace outcome lag 9d (target 7d)",        owner: "MP GM" },
    { area: "Evidence",          gap: "Diligence evidence coverage 84%",                owner: "CFO" },
  ],
  plan: [
    { item: "Roll out dual-approval to remaining policy domains", owner: "Risk Lead", due: "+10d" },
    { item: "Cut MP outcome lag to 7d",                            owner: "MP GM",     due: "+7d" },
    { item: "Close diligence evidence gap",                        owner: "CFO",       due: "+14d" },
  ],
};

export const V175_EXEC_OVERSIGHT = {
  score: score(92),
  queues: [
    { exec: "CEO",            pending: 3, overdue: 0, high_risk: 2, escalated: 1, completion: "97%" },
    { exec: "CFO",            pending: 2, overdue: 0, high_risk: 1, escalated: 0, completion: "100%" },
    { exec: "COO",            pending: 1, overdue: 0, high_risk: 0, escalated: 0, completion: "100%" },
    { exec: "CRO",            pending: 4, overdue: 1, high_risk: 2, escalated: 1, completion: "94%" },
    { exec: "MP GM",          pending: 2, overdue: 0, high_risk: 1, escalated: 0, completion: "96%" },
    { exec: "Product Lead",   pending: 1, overdue: 0, high_risk: 0, escalated: 0, completion: "100%" },
    { exec: "Customer Success", pending: 2, overdue: 0, high_risk: 1, escalated: 0, completion: "98%" },
    { exec: "Partner Lead",   pending: 1, overdue: 0, high_risk: 0, escalated: 0, completion: "100%" },
    { exec: "Security/Trust", pending: 0, overdue: 0, high_risk: 0, escalated: 0, completion: "100%" },
  ],
  high_risk: [
    { id: "HR-01", area: "Marketplace",  desc: "Southeast preferred-carrier expansion",  owner: "CEO" },
    { id: "HR-02", area: "Revenue",      desc: "Customer concentration mitigation",     owner: "CRO" },
    { id: "HR-03", area: "Capital",      desc: "Capital evidence refresh (2 categories)", owner: "CFO" },
    { id: "HR-04", area: "Category",     desc: "Proof-asset publishing approval",       owner: "CMO" },
  ],
  escalations: [
    { id: "ESC-01", from: "CRO",   to: "CEO", reason: "Concentration > 18% MRR threshold",     sla: "24h" },
    { id: "ESC-02", from: "MP GM", to: "CEO", reason: "Cross-tier marketplace expansion approval", sla: "24h" },
  ],
  outcomes: [
    { week: "W-1", approved: 42, rejected: 4, outcome_quality: "89%" },
    { week: "W-2", approved: 48, rejected: 3, outcome_quality: "91%" },
    { week: "W-3", approved: 51, rejected: 5, outcome_quality: "88%" },
    { week: "W-4", approved: 47, rejected: 2, outcome_quality: "92%" },
  ],
};

export const V175_CONTROL_MATURITY = {
  score: score(91),
  matrix: [
    { control: "Human approval controls",     status: "passing",   exceptions: 0, owner: "Compliance" },
    { control: "Recommendation controls",     status: "passing",   exceptions: 0, owner: "CoPilot Ops" },
    { control: "Evidence controls",           status: "exception", exceptions: 1, owner: "Compliance" },
    { control: "Explainability controls",     status: "passing",   exceptions: 0, owner: "CoPilot Ops" },
    { control: "Audit logging controls",      status: "passing",   exceptions: 0, owner: "Security" },
    { control: "Risk threshold controls",     status: "passing",   exceptions: 0, owner: "Risk Lead" },
    { control: "Confidence threshold controls", status: "passing", exceptions: 0, owner: "Risk Lead" },
    { control: "Revenue automation controls", status: "passing",   exceptions: 0, owner: "CRO" },
    { control: "Marketplace automation controls", status: "remediation", exceptions: 1, owner: "MP GM" },
    { control: "Capital automation controls", status: "passing",   exceptions: 0, owner: "CFO" },
    { control: "Account automation controls", status: "passing",   exceptions: 0, owner: "CS" },
    { control: "Partner automation controls", status: "passing",   exceptions: 0, owner: "Partner Lead" },
    { control: "Product-line auto controls",  status: "passing",   exceptions: 0, owner: "PM Lead" },
    { control: "Category automation controls", status: "passing",  exceptions: 0, owner: "CMO" },
    { control: "Board automation controls",   status: "passing",   exceptions: 0, owner: "Board Admin" },
  ],
  calendar: [
    { control: "Marketplace automation",  test_date: "+2d", owner: "MP GM" },
    { control: "Evidence controls",       test_date: "+4d", owner: "Compliance" },
    { control: "Board automation",        test_date: "+7d", owner: "Board Admin" },
    { control: "Audit logging",           test_date: "+14d", owner: "Security" },
  ],
  exceptions: [
    { id: "CTL-X-007", control: "Evidence controls",        desc: "1 evidence category > 14d freshness",     owner: "Compliance" },
    { id: "CTL-X-008", control: "Marketplace automation",   desc: "Routing-policy audit failed",             owner: "MP GM" },
  ],
  remediation: [
    { id: "CTL-X-007", action: "Refresh evidence + add freshness alert", owner: "Compliance", due: "+5d", status: "in progress" },
    { id: "CTL-X-008", action: "Rebuild routing policy + retest control", owner: "MP GM",     due: "+5d", status: "in progress" },
  ],
};

export const V175_BOARD_EVIDENCE = {
  score: score(89),
  queue: [
    { id: "BE-01", category: "Revenue durability",   source: "Finance OS",   owner: "CFO",    freshness: "fresh", approval: "approved",  board_ready: true,  ext_use: true,  data_room: true,  packet: "Q4'26" },
    { id: "BE-02", category: "Marketplace economics", source: "MP Analytics", owner: "MP GM",  freshness: "fresh", approval: "approved",  board_ready: true,  ext_use: false, data_room: true,  packet: "Q4'26" },
    { id: "BE-03", category: "Capital evidence",     source: "Capital OS",   owner: "CFO",    freshness: "stale", approval: "pending",   board_ready: false, ext_use: false, data_room: false, packet: "Q4'26" },
    { id: "BE-04", category: "Strategic accounts",   source: "Accounts OS",  owner: "CRO",    freshness: "fresh", approval: "approved",  board_ready: true,  ext_use: false, data_room: false, packet: "Q4'26" },
    { id: "BE-05", category: "Partner performance",  source: "Partner OS",   owner: "Partner Lead", freshness: "fresh", approval: "approved", board_ready: true, ext_use: false, data_room: false, packet: "Q4'26" },
    { id: "BE-06", category: "Product-line P&L",     source: "PM OS",        owner: "PM Lead", freshness: "fresh", approval: "approved",  board_ready: true,  ext_use: false, data_room: false, packet: "Q4'26" },
    { id: "BE-07", category: "Category leadership",  source: "Category OS",  owner: "CMO",    freshness: "fresh", approval: "approved",  board_ready: true,  ext_use: true,  data_room: false, packet: "Q4'26" },
    { id: "BE-08", category: "Risk register",        source: "Risk OS",      owner: "Risk Lead", freshness: "fresh", approval: "approved", board_ready: true, ext_use: false, data_room: false, packet: "Q4'26" },
    { id: "BE-09", category: "Control attestations", source: "Controls OS",  owner: "Compliance", freshness: "fresh", approval: "approved", board_ready: true, ext_use: false, data_room: true,  packet: "Q4'26" },
    { id: "BE-10", category: "Rec outcomes",         source: "CoPilot Ops",  owner: "CoPilot Ops", freshness: "fresh", approval: "approved", board_ready: true, ext_use: false, data_room: false, packet: "Q4'26" },
    { id: "BE-11", category: "Diligence packs",      source: "Capital OS",   owner: "CFO",    freshness: "stale", approval: "pending",   board_ready: false, ext_use: true,  data_room: true,  packet: "Q4'26" },
  ],
  missing: [
    { category: "Capital evidence", remediation_owner: "CFO", due: "+3d" },
    { category: "Diligence packs",  remediation_owner: "CFO", due: "+7d" },
  ],
  category_matrix: [
    { category: "Revenue durability",   coverage: "96%", board_ready: "98%" },
    { category: "Marketplace economics",coverage: "92%", board_ready: "94%" },
    { category: "Capital evidence",     coverage: "82%", board_ready: "78%" },
    { category: "Strategic accounts",   coverage: "94%", board_ready: "95%" },
    { category: "Partner performance",  coverage: "88%", board_ready: "90%" },
    { category: "Product-line P&L",     coverage: "90%", board_ready: "92%" },
    { category: "Category leadership",  coverage: "87%", board_ready: "89%" },
    { category: "Risk register",        coverage: "96%", board_ready: "97%" },
  ],
  approval_workflow: [
    { stage: "Owner attest",      sla: "24h", status: "passing" },
    { stage: "Compliance review", sla: "24h", status: "passing" },
    { stage: "Board admin pack",  sla: "48h", status: "passing" },
    { stage: "CEO sign-off",      sla: "24h", status: "1 pending" },
  ],
  audit_trail: [
    { ts: "T-3d", actor: "Compliance", action: "Approved BE-09", evidence: "controls attestations" },
    { ts: "T-2d", actor: "CFO",        action: "Flagged BE-03 stale", evidence: "capital pack" },
    { ts: "T-1d", actor: "Board Admin", action: "Drafted Q4'26 packet", evidence: "11 items" },
  ],
};

export const V175_APPROVAL_SCALE = {
  score: score(93),
  kpis: kpis([
    ["Routing accuracy",        "96%"],
    ["Approval volume (7d)",    "187"],
    ["Approval SLA",            "94%"],
    ["Backup approver coverage","92%"],
    ["Escalation accuracy",     "95%"],
    ["High-risk handling",      "97%"],
    ["Evidence completeness",   "89%"],
    ["Explanation completeness","91%"],
    ["Overdue approvals",       "1"],
    ["Rejection reason quality","88%"],
    ["Outcome tracking quality","87%"],
    ["Audit completeness",      "93%"],
  ]),
  routing: [
    { tier: "Tier 1 (operator)", routed: 96, accuracy: "98%", sla: "100%" },
    { tier: "Tier 2 (manager)",  routed: 54, accuracy: "96%", sla: "94%" },
    { tier: "Tier 3 (exec)",     routed: 28, accuracy: "94%", sla: "92%" },
    { tier: "Tier 4 (CEO)",      routed: 9,  accuracy: "100%", sla: "89%" },
  ],
  sla_health: [
    { tier: "Tier 1", target: "4h",  actual: "2.1h" },
    { tier: "Tier 2", target: "12h", actual: "8.4h" },
    { tier: "Tier 3", target: "24h", actual: "18.7h" },
    { tier: "Tier 4", target: "24h", actual: "21.2h" },
  ],
  backup_coverage: [
    { owner: "CEO",   primary: "CEO",   backup: "COO",   coverage: "100%" },
    { owner: "CFO",   primary: "CFO",   backup: "VP Finance", coverage: "100%" },
    { owner: "CRO",   primary: "CRO",   backup: "VP Sales", coverage: "100%" },
    { owner: "MP GM", primary: "MP GM", backup: "MP Director", coverage: "100%" },
    { owner: "CMO",   primary: "CMO",   backup: "VP Marketing", coverage: "67% (gap)" },
    { owner: "Partner Lead", primary: "Partner Lead", backup: "Sr Partner Mgr", coverage: "100%" },
  ],
  escalations: [
    { id: "ESC-A-01", from: "CRO",   to: "CEO",  reason: "Concentration breach", sla: "24h" },
    { id: "ESC-A-02", from: "MP GM", to: "CEO",  reason: "Cross-tier expansion", sla: "24h" },
  ],
  plan: [
    { item: "Close CMO backup-approver gap", owner: "CMO", due: "+5d" },
    { item: "Tighten Tier 4 SLA tracking",   owner: "COO", due: "+7d" },
  ],
};

export const V175_EVIDENCE_SCALE = {
  score: score(89),
  domain_coverage: [
    { domain: "Revenue",     coverage: "94%", fresh: "91%", owner: "CRO",    missing: 1 },
    { domain: "Marketplace", coverage: "89%", fresh: "87%", owner: "MP GM",  missing: 2 },
    { domain: "Capital",     coverage: "82%", fresh: "78%", owner: "CFO",    missing: 3 },
    { domain: "Accounts",    coverage: "92%", fresh: "90%", owner: "CS",     missing: 1 },
    { domain: "Partners",    coverage: "87%", fresh: "85%", owner: "Partner Lead", missing: 2 },
    { domain: "Product",     coverage: "90%", fresh: "88%", owner: "PM Lead", missing: 1 },
    { domain: "Category",    coverage: "88%", fresh: "86%", owner: "CMO",    missing: 2 },
    { domain: "Risk",        coverage: "95%", fresh: "94%", owner: "Risk Lead", missing: 0 },
    { domain: "Controls",    coverage: "93%", fresh: "91%", owner: "Compliance", missing: 1 },
  ],
  owner_coverage: [
    { owner: "CFO",      assigned: 24, attested: 22, gap: 2 },
    { owner: "CRO",      assigned: 18, attested: 17, gap: 1 },
    { owner: "MP GM",    assigned: 16, attested: 14, gap: 2 },
    { owner: "CS",       assigned: 14, attested: 13, gap: 1 },
    { owner: "Partner Lead", assigned: 12, attested: 10, gap: 2 },
    { owner: "PM Lead",  assigned: 10, attested: 9,  gap: 1 },
    { owner: "CMO",      assigned: 12, attested: 10, gap: 2 },
    { owner: "Compliance", assigned: 22, attested: 21, gap: 1 },
  ],
  approval_coverage: [
    { stage: "Owner attest",      coverage: "94%" },
    { stage: "Compliance review", coverage: "92%" },
    { stage: "Board-ready",       coverage: "90%" },
    { stage: "Data-room-ready",   coverage: "85%" },
    { stage: "External-use",      coverage: "78%" },
  ],
  missing_queue: [
    { id: "EV-M-01", domain: "Capital",  category: "Investor evidence",   owner: "CFO", due: "+3d" },
    { id: "EV-M-02", domain: "Capital",  category: "Data room category-3", owner: "CFO", due: "+5d" },
    { id: "EV-M-03", domain: "Marketplace", category: "Carrier density - SE", owner: "MP GM", due: "+5d" },
    { id: "EV-M-04", domain: "Partner",  category: "Joint customer signals", owner: "Partner Lead", due: "+7d" },
  ],
  exceptions: [
    { id: "EV-X-01", domain: "Capital",  desc: "3 missing investor evidence items",   owner: "CFO" },
    { id: "EV-X-02", domain: "Category", desc: "Proof-asset publishing approval lag", owner: "CMO" },
  ],
  plan: [
    { item: "Refresh 3 capital evidence items",        owner: "CFO", due: "+5d" },
    { item: "Speed proof-asset publishing approvals",  owner: "CMO", due: "+7d" },
  ],
};

export const V175_OUTCOME_LEARNING = {
  score: score(87),
  rec_outcomes: [
    { domain: "Revenue",      approved_lift: "+9%",  rejected_avoid: "-3%", calibration: "+0.04" },
    { domain: "Marketplace",  approved_lift: "+7%",  rejected_avoid: "-2%", calibration: "+0.03" },
    { domain: "Capital",      approved_lift: "+5%",  rejected_avoid: "-1%", calibration: "+0.02" },
    { domain: "Accounts",     approved_lift: "+8%",  rejected_avoid: "-2%", calibration: "+0.03" },
    { domain: "Partners",     approved_lift: "+6%",  rejected_avoid: "-2%", calibration: "+0.02" },
    { domain: "Product",      approved_lift: "+5%",  rejected_avoid: "-1%", calibration: "+0.02" },
    { domain: "Category",     approved_lift: "+4%",  rejected_avoid: "-2%", calibration: "+0.01" },
  ],
  automation_outcomes: [
    { type: "Evidence collection", success: "97%", exceptions: 4 },
    { type: "Approval routing",    success: "96%", exceptions: 7 },
    { type: "Reminder dispatch",   success: "99%", exceptions: 1 },
    { type: "Board packet draft",  success: "92%", exceptions: 3 },
    { type: "Outcome tracking",    success: "94%", exceptions: 5 },
  ],
  confidence_calibration: {
    fp_pct: "4.2%", fn_pct: "3.1%", within_10: "84%", within_20: "94%", brier: "0.082",
  },
  policy_tuning_suggestions: [
    { policy: "Revenue routing threshold", current: "$50k MRR", suggested: "$45k MRR", basis: "12-wk lift +8%", owner: "CRO" },
    { policy: "MP lane re-routing trigger", current: "margin <4%", suggested: "margin <5%", basis: "Drift on 3 lanes", owner: "MP GM" },
  ],
  lessons: [
    { id: "LL-01", area: "Marketplace",  lesson: "SE density signal lags by 5d — add real-time feed", owner: "MP GM" },
    { id: "LL-02", area: "Capital",      lesson: "Investor evidence needs 14d freshness target",      owner: "CFO" },
    { id: "LL-03", area: "Approvals",    lesson: "Dual-approval reduces rework by 18%",                owner: "Risk Lead" },
  ],
  plan: [
    { item: "Implement real-time SE density feed", owner: "MP GM",     due: "+10d" },
    { item: "Tune 2 policies with dual-approval",  owner: "Risk Lead", due: "+7d" },
  ],
};

export const V175_REC_QUALITY = {
  score: score(87),
  kpis: kpis([
    ["Source signal quality",       "92%"],
    ["Evidence completeness",       "89%"],
    ["Explainability completeness", "91%"],
    ["Confidence calibration",      "88%"],
    ["Risk scoring accuracy",       "placeholder"],
    ["Approval rate",               "82%"],
    ["Rejection rate",              "11%"],
    ["Outcome quality",             "87%"],
    ["Repeat rate",                 "6%"],
    ["Duplicate rate",              "2%"],
    ["No-action impact accuracy",   "placeholder"],
    ["Alternative option quality",  "84%"],
  ]),
  dashboard: [
    { domain: "Revenue",     quality: "89%", evidence: "92%", explainability: "93%" },
    { domain: "Marketplace", quality: "86%", evidence: "88%", explainability: "90%" },
    { domain: "Capital",     quality: "84%", evidence: "82%", explainability: "89%" },
    { domain: "Accounts",    quality: "88%", evidence: "90%", explainability: "92%" },
    { domain: "Partners",    quality: "85%", evidence: "85%", explainability: "89%" },
    { domain: "Product",     quality: "87%", evidence: "88%", explainability: "91%" },
    { domain: "Category",    quality: "84%", evidence: "86%", explainability: "88%" },
  ],
  signals: [
    { signal: "Customer concentration", quality: "94%", source: "Finance OS" },
    { signal: "Carrier density",        quality: "88%", source: "MP OS" },
    { signal: "Renewal risk",           quality: "92%", source: "CS OS" },
    { signal: "Partner pipeline",       quality: "85%", source: "Partner OS" },
    { signal: "Category proof gap",     quality: "82%", source: "Category OS" },
  ],
  explainability: [
    { domain: "Revenue",     evidence_links: "94%", reason_strings: "96%", alt_options: "88%" },
    { domain: "Marketplace", evidence_links: "90%", reason_strings: "93%", alt_options: "85%" },
    { domain: "Capital",     evidence_links: "85%", reason_strings: "92%", alt_options: "82%" },
    { domain: "Category",    evidence_links: "86%", reason_strings: "90%", alt_options: "81%" },
  ],
  duplicates: [
    { rec_id: "REC-1042", domain: "Revenue",  duplicate_of: "REC-1038", reason: "Same account, 4d apart" },
    { rec_id: "REC-1119", domain: "MP",       duplicate_of: "REC-1117", reason: "Same lane, same signal" },
  ],
  plan: [
    { item: "Dedupe within 7d window for revenue recs",        owner: "CoPilot Ops", due: "+5d" },
    { item: "Lift category-domain evidence links to 90%",      owner: "CMO",         due: "+10d" },
  ],
};

export const V175_RISK_OPS = {
  score: score(89),
  categories: [
    { category: "Revenue durability",         signals: 14, sla: "94%", routing_accuracy: "96%", owner_coverage: "100%", mitigation: "on track" },
    { category: "Customer concentration",     signals: 6,  sla: "92%", routing_accuracy: "95%", owner_coverage: "100%", mitigation: "1 open" },
    { category: "Renewal risk",               signals: 11, sla: "96%", routing_accuracy: "97%", owner_coverage: "100%", mitigation: "on track" },
    { category: "Expansion risk",             signals: 8,  sla: "93%", routing_accuracy: "94%", owner_coverage: "100%", mitigation: "on track" },
    { category: "MP liquidity",               signals: 9,  sla: "90%", routing_accuracy: "92%", owner_coverage: "100%", mitigation: "1 open" },
    { category: "Carrier density",            signals: 7,  sla: "88%", routing_accuracy: "91%", owner_coverage: "100%", mitigation: "SE open" },
    { category: "Partner dependency",         signals: 5,  sla: "94%", routing_accuracy: "93%", owner_coverage: "100%", mitigation: "on track" },
    { category: "Product support burden",     signals: 6,  sla: "92%", routing_accuracy: "94%", owner_coverage: "100%", mitigation: "on track" },
    { category: "Capital evidence",           signals: 8,  sla: "85%", routing_accuracy: "90%", owner_coverage: "100%", mitigation: "2 open" },
    { category: "Commercial diligence",       signals: 5,  sla: "88%", routing_accuracy: "91%", owner_coverage: "100%", mitigation: "1 open" },
    { category: "Category proof",             signals: 7,  sla: "86%", routing_accuracy: "89%", owner_coverage: "100%", mitigation: "1 open" },
    { category: "Board action",               signals: 4,  sla: "94%", routing_accuracy: "96%", owner_coverage: "100%", mitigation: "on track" },
    { category: "Compliance / control",       signals: 9,  sla: "94%", routing_accuracy: "96%", owner_coverage: "100%", mitigation: "1 open" },
    { category: "AI governance",              signals: 8,  sla: "96%", routing_accuracy: "97%", owner_coverage: "100%", mitigation: "on track" },
    { category: "Operational scalability",    signals: 7,  sla: "91%", routing_accuracy: "93%", owner_coverage: "100%", mitigation: "on track" },
  ],
  owners: [
    { owner: "CFO",          assigned: 16, sla: "92%" },
    { owner: "CRO",          assigned: 19, sla: "94%" },
    { owner: "MP GM",        assigned: 14, sla: "90%" },
    { owner: "CS",           assigned: 12, sla: "96%" },
    { owner: "Partner Lead", assigned: 8,  sla: "94%" },
    { owner: "PM Lead",      assigned: 7,  sla: "92%" },
    { owner: "Risk Lead",    assigned: 22, sla: "97%" },
    { owner: "Compliance",   assigned: 16, sla: "96%" },
  ],
  escalations: [
    { id: "RISK-E-01", category: "Customer concentration", route: "CRO→CEO", sla: "24h", status: "in review" },
    { id: "RISK-E-02", category: "Carrier density",        route: "MP GM→CEO", sla: "24h", status: "in review" },
    { id: "RISK-E-03", category: "Capital evidence",       route: "CFO→Board", sla: "48h", status: "scheduled" },
  ],
  outcome_summary: [
    { week: "W-1", mitigated: 21, recurrence: 2 },
    { week: "W-2", mitigated: 24, recurrence: 1 },
    { week: "W-3", mitigated: 19, recurrence: 3 },
    { week: "W-4", mitigated: 26, recurrence: 1 },
  ],
};

export const V175_CAPITAL_AUTO = {
  score: score(85),
  evidence_matrix: [
    { category: "Revenue durability",      coverage: "92%", freshness: "fresh", approval: "approved" },
    { category: "MP economics",            coverage: "88%", freshness: "fresh", approval: "approved" },
    { category: "Customer concentration",  coverage: "82%", freshness: "stale", approval: "pending" },
    { category: "Strategic risk",          coverage: "86%", freshness: "fresh", approval: "approved" },
    { category: "Board capital packet",    coverage: "84%", freshness: "fresh", approval: "approved" },
    { category: "External-use approvals",  coverage: "78%", freshness: "stale", approval: "pending" },
  ],
  data_room: [
    { section: "Financial",      auto: "92%", manual: "8%",  status: "current" },
    { section: "Marketplace",    auto: "88%", manual: "12%", status: "current" },
    { section: "Operational",    auto: "85%", manual: "15%", status: "current" },
    { section: "Legal",          auto: "62%", manual: "38%", status: "draft" },
    { section: "AI governance",  auto: "84%", manual: "16%", status: "current" },
  ],
  approval_queue: [
    { id: "CAP-A-01", item: "Investor evidence — concentration",    owner: "CFO", sla: "24h", status: "pending" },
    { id: "CAP-A-02", item: "Data-room legal pack refresh",         owner: "CFO+GC", sla: "72h", status: "pending" },
    { id: "CAP-A-03", item: "External-use marketing proof asset",   owner: "CMO+CFO", sla: "48h", status: "pending" },
  ],
  exceptions: [
    { id: "CAP-X-01", area: "Investor evidence", desc: "2 categories > 14d stale", owner: "CFO" },
    { id: "CAP-X-02", area: "External use",       desc: "1 proof asset awaiting approval", owner: "CFO" },
  ],
  outcomes: [
    { week: "W-1", approved: 4, rejected: 0, board_use: 3 },
    { week: "W-2", approved: 5, rejected: 1, board_use: 4 },
    { week: "W-3", approved: 6, rejected: 0, board_use: 5 },
    { week: "W-4", approved: 4, rejected: 1, board_use: 3 },
  ],
};

export const V175_ACCOUNT_AUTO = {
  score: score(87),
  signal_matrix: [
    { signal: "Expansion",            coverage: "89%", quality: "92%" },
    { signal: "Renewal risk",         coverage: "94%", quality: "94%" },
    { signal: "Churn risk",           coverage: "87%", quality: "90%" },
    { signal: "Adoption",             coverage: "92%", quality: "91%" },
    { signal: "Customer trust",       coverage: "85%", quality: "88%" },
    { signal: "Support burden",       coverage: "90%", quality: "92%" },
    { signal: "Exec sponsor engage",  coverage: "82%", quality: "86%" },
  ],
  rec_quality: [
    { type: "Expansion play",   quality: "89%", evidence: "92%" },
    { type: "Renewal save",     quality: "92%", evidence: "94%" },
    { type: "Churn save",       quality: "85%", evidence: "88%" },
    { type: "Adoption nudge",   quality: "90%", evidence: "91%" },
  ],
  approval_routing: [
    { tier: "CSM",   accuracy: "96%", sla: "98%" },
    { tier: "CS Lead", accuracy: "94%", sla: "96%" },
    { tier: "CRO",   accuracy: "98%", sla: "94%" },
  ],
  outcomes: [
    { week: "W-1", approved: 18, lift: "+7%" },
    { week: "W-2", approved: 22, lift: "+9%" },
    { week: "W-3", approved: 19, lift: "+8%" },
    { week: "W-4", approved: 24, lift: "+10%" },
  ],
  exceptions: [
    { id: "ACC-X-01", account: "ACME Logistics", desc: "Concentration breach signal", owner: "CRO" },
  ],
  plan: [
    { item: "Lift exec-sponsor engagement coverage to 90%", owner: "CS Lead", due: "+14d" },
  ],
};

export const V175_PARTNER_AUTO = {
  score: score(84),
  signal_matrix: [
    { signal: "Performance",       coverage: "86%", quality: "88%" },
    { signal: "Pipeline",          coverage: "82%", quality: "86%" },
    { signal: "Enablement",        coverage: "88%", quality: "90%" },
    { signal: "Support burden",    coverage: "84%", quality: "87%" },
    { signal: "Integration health",coverage: "90%", quality: "92%" },
    { signal: "Partner revenue (placeholder)", coverage: "—", quality: "—" },
    { signal: "Joint customer",    coverage: "78%", quality: "82%" },
  ],
  rec_quality: [
    { type: "Enablement nudge", quality: "87%", evidence: "85%" },
    { type: "Pipeline review",  quality: "85%", evidence: "82%" },
    { type: "Joint customer expansion", quality: "82%", evidence: "80%" },
  ],
  approval_routing: [
    { tier: "Partner mgr",  accuracy: "95%", sla: "96%" },
    { tier: "Partner Lead", accuracy: "94%", sla: "94%" },
    { tier: "CRO",          accuracy: "96%", sla: "92%" },
  ],
  outcomes: [
    { week: "W-1", approved: 10, lift: "+5%" },
    { week: "W-2", approved: 12, lift: "+6%" },
    { week: "W-3", approved: 9,  lift: "+4%" },
    { week: "W-4", approved: 13, lift: "+7%" },
  ],
  exceptions: [
    { id: "PRT-X-01", partner: "Regional 3PL",  desc: "Joint customer signal lag",  owner: "Partner Lead" },
  ],
  plan: [
    { item: "Improve joint-customer signal coverage to 85%", owner: "Partner Lead", due: "+14d" },
  ],
};

export const V175_PRODUCT_AUTO = {
  score: score(86),
  product_lines: [
    "Dispatch Command Center", "EliteNav", "Driver Mobile", "Customer Portal",
    "CoPilot AI", "Carrier Marketplace", "API Platform", "EDI Platform",
    "Telematics", "Partner Marketplace", "Reports/Analytics", "Enterprise Governance",
  ],
  signal_matrix: [
    { line: "Dispatch Command", adoption: "92%", support: "low",  reliability: "99.7%", expansion: "+8%" },
    { line: "EliteNav",         adoption: "88%", support: "low",  reliability: "99.5%", expansion: "+7%" },
    { line: "Driver Mobile",    adoption: "90%", support: "med",  reliability: "99.4%", expansion: "+6%" },
    { line: "Customer Portal",  adoption: "84%", support: "med",  reliability: "99.6%", expansion: "+5%" },
    { line: "CoPilot AI",       adoption: "86%", support: "med",  reliability: "99.3%", expansion: "+12%" },
    { line: "Carrier Marketplace", adoption: "82%", support: "med", reliability: "99.4%", expansion: "+9%" },
    { line: "API Platform",     adoption: "78%", support: "low",  reliability: "99.8%", expansion: "+6%" },
    { line: "EDI Platform",     adoption: "76%", support: "med",  reliability: "99.5%", expansion: "+4%" },
    { line: "Telematics",       adoption: "80%", support: "low",  reliability: "99.6%", expansion: "+5%" },
    { line: "Partner Marketplace", adoption: "72%", support: "med", reliability: "99.4%", expansion: "+8%" },
    { line: "Reports/Analytics", adoption: "88%", support: "low",  reliability: "99.7%", expansion: "+7%" },
    { line: "Enterprise Governance", adoption: "70%", support: "low", reliability: "99.7%", expansion: "+11%" },
  ],
  rec_quality: [
    { type: "Adoption nudge",       quality: "88%" },
    { type: "Support deflection",   quality: "86%" },
    { type: "Reliability watch",    quality: "92%" },
    { type: "Expansion play",       quality: "85%" },
  ],
  approval_routing: [
    { tier: "PM",      accuracy: "96%", sla: "97%" },
    { tier: "PM Lead", accuracy: "94%", sla: "95%" },
    { tier: "CPO",     accuracy: "96%", sla: "92%" },
  ],
  outcomes: [
    { week: "W-1", approved: 14 }, { week: "W-2", approved: 17 },
    { week: "W-3", approved: 12 }, { week: "W-4", approved: 19 },
  ],
  plan: [
    { item: "Lift Partner Marketplace adoption to 78%",    owner: "PM Lead", due: "+14d" },
    { item: "Lift Enterprise Governance adoption to 75%",  owner: "PM Lead", due: "+21d" },
  ],
};

export const V175_CATEGORY_AUTO = {
  score: score(83),
  signal_matrix: [
    { signal: "Narrative",              coverage: "86%", quality: "88%" },
    { signal: "Proof assets",           coverage: "82%", quality: "85%" },
    { signal: "Market education",       coverage: "78%", quality: "82%" },
    { signal: "Competitive positioning",coverage: "84%", quality: "86%" },
    { signal: "Differentiation",        coverage: "88%", quality: "90%" },
    { signal: "Sales narrative adoption",coverage:"80%", quality: "84%" },
    { signal: "Website/demo narrative", coverage: "85%", quality: "87%" },
    { signal: "Board narrative",        coverage: "92%", quality: "94%" },
  ],
  rec_quality: [
    { type: "Proof publishing",   quality: "82%", evidence: "84%" },
    { type: "Sales narrative",    quality: "85%", evidence: "86%" },
    { type: "Board narrative",    quality: "92%", evidence: "94%" },
  ],
  proof_approval: [
    { stage: "Draft",      sla: "48h", actual: "32h" },
    { stage: "CMO review", sla: "48h", actual: "40h" },
    { stage: "Legal review", sla: "72h", actual: "68h" },
    { stage: "CEO sign-off", sla: "24h", actual: "22h" },
  ],
  outcomes: [
    { week: "W-1", approved: 5,  published: 4 },
    { week: "W-2", approved: 7,  published: 6 },
    { week: "W-3", approved: 4,  published: 3 },
    { week: "W-4", approved: 8,  published: 7 },
  ],
  exceptions: [
    { id: "CAT-X-01", area: "Proof publishing", desc: "Legal review backlog at 4 items", owner: "CMO+GC" },
  ],
  plan: [
    { item: "Cut legal review backlog to 0",     owner: "GC",  due: "+7d" },
    { item: "Lift proof coverage to 88%",        owner: "CMO", due: "+14d" },
  ],
};

export const V175_AUDIT = {
  score: score(91),
  trail: [
    { id: "AU-1042", action: "Approve preferred-carrier expansion", type: "high-risk MP",      trigger: "density signal",  evidence: true, explanation: true, approver: "CEO",   decision: "pending", reason: "—",                  exec_status: "—",          outcome: "—",         audit: "complete", policy: "ok", exception: false },
    { id: "AU-1041", action: "Refresh capital evidence (concentration)", type: "capital",      trigger: "freshness alert", evidence: true, explanation: true, approver: "CFO",   decision: "approved", reason: "matches policy",    exec_status: "executed", outcome: "tracked",  audit: "complete", policy: "ok", exception: false },
    { id: "AU-1040", action: "Tune renewal routing threshold",     type: "policy tuning",     trigger: "outcome lift",    evidence: true, explanation: true, approver: "Risk+CFO", decision: "approved", reason: "dual-approved",  exec_status: "scheduled",outcome: "—",         audit: "complete", policy: "ok", exception: false },
    { id: "AU-1039", action: "Route lane re-balance proposal",    type: "marketplace",       trigger: "margin drift",    evidence: true, explanation: true, approver: "MP GM", decision: "rejected", reason: "alt option better",  exec_status: "—",          outcome: "—",         audit: "complete", policy: "ok", exception: false },
    { id: "AU-1038", action: "Publish category proof asset",      type: "category",          trigger: "narrative gap",   evidence: true, explanation: true, approver: "CMO",   decision: "pending",  reason: "—",                  exec_status: "—",          outcome: "—",         audit: "complete", policy: "ok", exception: false },
    { id: "AU-1037", action: "Auto-draft board packet",           type: "board automation",  trigger: "schedule",        evidence: true, explanation: true, approver: "Board Admin", decision: "approved", reason: "review complete", exec_status: "executed", outcome: "tracked", audit: "complete", policy: "ok", exception: false },
  ],
  policy_compliance: [
    { policy: "automation_no_self_approve",    rate: "100%", violations: 0 },
    { policy: "automation_evidence_required",  rate: "98%",  violations: 2 },
    { policy: "policy_tuning_dual_approval",   rate: "100%", violations: 0 },
    { policy: "board_packet_owner_only",       rate: "100%", violations: 0 },
    { policy: "evidence_freshness_window",     rate: "94%",  violations: 4 },
    { policy: "risk_routing_audit_only_read",  rate: "100%", violations: 0 },
  ],
  exception_queue: [
    { id: "AU-X-01", policy: "evidence_freshness_window", desc: "4 evidence items > 14d", owner: "CFO+MP GM" },
    { id: "AU-X-02", policy: "automation_evidence_required", desc: "2 recs missing evidence link", owner: "CoPilot Ops" },
  ],
  outcomes: [
    { week: "W-1", actions: 1284, approved: 1098, rejected: 89, exceptions: 12 },
    { week: "W-2", actions: 1352, approved: 1167, rejected: 94, exceptions: 9 },
    { week: "W-3", actions: 1287, approved: 1111, rejected: 88, exceptions: 11 },
    { week: "W-4", actions: 1396, approved: 1218, rejected: 92, exceptions: 8 },
  ],
  export_note: "Audit export (CSV/PDF) — placeholder. Surfaces signed evidence chain + approver identity.",
};

export const V175_BOARD_REPORT = {
  sections: [
    { section: "Governed automation scale",        owner: "CEO",         status: "ready" },
    { section: "Predictive board exec maturity",   owner: "Board Admin", status: "ready" },
    { section: "Revenue automation optimization",  owner: "CRO",         status: "ready" },
    { section: "Marketplace automation governance",owner: "MP GM",       status: "ready" },
    { section: "Strategic intelligence ops",       owner: "CoPilot Ops", status: "ready" },
    { section: "Executive automation oversight",   owner: "COO",         status: "ready" },
    { section: "Approval orchestration scale",     owner: "COO",         status: "ready" },
    { section: "Evidence automation scale",        owner: "Compliance",  status: "ready" },
    { section: "Outcome learning maturity",        owner: "Risk Lead",   status: "ready" },
    { section: "Recommendation quality",           owner: "CoPilot Ops", status: "ready" },
    { section: "Predictive risk ops scale",        owner: "Risk Lead",   status: "ready" },
    { section: "Automation audit results",         owner: "Compliance",  status: "ready" },
    { section: "Exceptions",                       owner: "Compliance",  status: "ready" },
    { section: "Decisions needed",                 owner: "CEO",         status: "3 items" },
    { section: "Next quarter priorities",          owner: "CEO",         status: "draft" },
  ],
  kpi_appendix: [
    { kpi: "Governed automation scale", value: "96%" },
    { kpi: "Approval orchestration",    value: "93%" },
    { kpi: "Evidence automation",       value: "89%" },
    { kpi: "Outcome learning",          value: "87%" },
    { kpi: "Audit completeness",        value: "91%" },
  ],
  exceptions: [
    { id: "BX-01", area: "Capital evidence",     desc: "2 categories stale", owner: "CFO" },
    { id: "BX-02", area: "Marketplace control",  desc: "Routing policy test failed", owner: "MP GM" },
  ],
  decisions: [
    { id: "DEC-01", decision: "Approve preferred-carrier expansion (Southeast)", owner: "CEO", sla: "Today" },
    { id: "DEC-02", decision: "Approve capital evidence refresh plan",            owner: "CFO", sla: "+3d" },
    { id: "DEC-03", decision: "Approve category proof publishing pipeline",       owner: "CMO", sla: "+7d" },
  ],
  action_tracker: [
    { item: "Refresh capital evidence (2 categories)", owner: "CFO",  due: "+5d",  status: "in progress" },
    { item: "Remediate MP routing control",            owner: "MP GM", due: "+5d",  status: "in progress" },
    { item: "Close CMO backup-approver gap",           owner: "CMO",  due: "+5d",  status: "scheduled" },
  ],
  outcome_summary: { approvals_quarter: 4128, approved_pct: "86%", exceptions: 38, mitigation_rate: "92%" },
};

export const V175_ROADMAP = {
  horizons: [
    { horizon: "Current quarter", focus: "Stabilize V17.5 — close 4 evidence gaps, 1 MP control",        owner: "CEO" },
    { horizon: "Next quarter",    focus: "Lift evidence automation scale 89→93%, MP gov 86→90%",           owner: "Compliance + MP GM" },
    { horizon: "6 months",        focus: "Approval orchestration scale 93→96%, outcome learning 87→91%",   owner: "COO + Risk Lead" },
    { horizon: "12 months",       focus: "V18 autonomous-assist scale governance scaffolding",              owner: "CEO" },
    { horizon: "24 months",       focus: "Predictive operating excellence — multi-domain orchestration",    owner: "COO" },
    { horizon: "36 months",       focus: "Enterprise predictive operating system at full scale",            owner: "CEO" },
  ],
  initiatives: [
    { initiative: "Evidence automation lift",            track: "Evidence automation scale", horizon: "Next quarter" },
    { initiative: "Marketplace governance lift",         track: "MP automation governance",  horizon: "Next quarter" },
    { initiative: "Dual-approval rollout",               track: "Approval orch scale",       horizon: "Next quarter" },
    { initiative: "Calibration drift detection",         track: "Outcome learning",          horizon: "6 months" },
    { initiative: "Category proof publishing pipeline",  track: "Category automation",       horizon: "6 months" },
    { initiative: "V18 governance scaffolding",          track: "Governed automation scale", horizon: "12 months" },
  ],
  dependencies: [
    { from: "Evidence automation lift", to: "Board automation scale",       type: "feeds" },
    { from: "Dual-approval rollout",    to: "Approval orchestration scale", type: "feeds" },
    { from: "Calibration drift",        to: "Recommendation quality",      type: "feeds" },
  ],
  decision_log: [
    { id: "DL-01", decision: "Adopt dual-approval as default for policy tuning",  approver: "CEO+CFO", ts: "T-7d" },
    { id: "DL-02", decision: "Set evidence freshness window to 14d (board-use)",  approver: "Board",   ts: "T-14d" },
    { id: "DL-03", decision: "Adopt SE preferred-carrier expansion plan (pending)", approver: "CEO",   ts: "today" },
  ],
};

export const V175_REPORTS = [
  { id: "R-01", name: "Governed enterprise automation scale",        owner: "CEO" },
  { id: "R-02", name: "Predictive board execution maturity",         owner: "Board Admin" },
  { id: "R-03", name: "Revenue automation optimization",             owner: "CRO" },
  { id: "R-04", name: "Marketplace automation governance",           owner: "MP GM" },
  { id: "R-05", name: "Strategic intelligence operating excellence", owner: "CoPilot Ops" },
  { id: "R-06", name: "Executive automation oversight",              owner: "COO" },
  { id: "R-07", name: "Automation control maturity",                 owner: "Compliance" },
  { id: "R-08", name: "Board automation evidence",                   owner: "Board Admin" },
  { id: "R-09", name: "Approval orchestration scale",                owner: "COO" },
  { id: "R-10", name: "Evidence automation scale",                   owner: "Compliance" },
  { id: "R-11", name: "Outcome learning maturity",                   owner: "Risk Lead" },
  { id: "R-12", name: "Recommendation quality improvement",          owner: "CoPilot Ops" },
  { id: "R-13", name: "Predictive risk operations scale",            owner: "Risk Lead" },
  { id: "R-14", name: "Capital intelligence automation",             owner: "CFO" },
  { id: "R-15", name: "Strategic account automation maturity",       owner: "CS Lead" },
  { id: "R-16", name: "Partner automation maturity",                 owner: "Partner Lead" },
  { id: "R-17", name: "Product-line automation maturity",            owner: "PM Lead" },
  { id: "R-18", name: "Category leadership automation maturity",     owner: "CMO" },
  { id: "R-19", name: "Governed automation audit",                   owner: "Compliance" },
  { id: "R-20", name: "Board automation scale reporting",            owner: "CEO+Board" },
];

export const V175_RLS = [
  { name: "v175_company_automation_read",   target: "*_automation_*",          sql: "FOR SELECT USING (company_id = current_company() AND has_role('admin'))" },
  { name: "v175_platform_scale_read",       target: "v175_governed_automation_scale_scores", sql: "FOR SELECT USING (is_platform_owner(auth.uid()))" },
  { name: "v175_exec_oversight_read",       target: "executive_automation_oversight_records", sql: "FOR SELECT USING (has_role('exec') OR has_role('ceo') OR has_role('cfo'))" },
  { name: "v175_board_report_approved_only", target: "board_automation_scale_reports", sql: "FOR SELECT USING (has_role('board') AND status = 'approved')" },
  { name: "v175_security_admin_manage",     target: "automation_control_maturity_records", sql: "FOR ALL USING (has_role('security_admin'))" },
  { name: "v175_revenue_ops_manage",        target: "revenue_automation_optimization_records", sql: "FOR ALL USING (has_role('revenue_ops') AND company_id = current_company())" },
  { name: "v175_mp_leader_manage",          target: "marketplace_automation_governance_records", sql: "FOR ALL USING (has_role('mp_leader') AND company_id = current_company())" },
  { name: "v175_cs_manage_assigned",        target: "strategic_account_automation_maturity_records", sql: "FOR ALL USING (assigned_to = auth.uid())" },
  { name: "v175_partner_mgr_manage",        target: "partner_automation_maturity_records", sql: "FOR ALL USING (has_role('partner_mgr'))" },
  { name: "v175_product_lead_manage",       target: "product_line_automation_maturity_records", sql: "FOR ALL USING (has_role('product_lead'))" },
  { name: "v175_category_lead_manage",      target: "category_leadership_automation_maturity_records", sql: "FOR ALL USING (has_role('category_lead') OR has_role('cmo'))" },
  { name: "v175_high_impact_human_approval", target: "governed_automation_audit_records", sql: "CHECK (high_impact = false OR (approver_id IS NOT NULL AND approver_id <> recommender_id))" },
  { name: "v175_customer_no_internal_read", target: "governed_automation_audit_records", sql: "FOR SELECT TO authenticated USING (NOT is_customer_user(auth.uid(), customer_id))" },
  { name: "v175_carrier_no_mp_internal",    target: "marketplace_automation_governance_records", sql: "FOR SELECT USING (NOT has_role('carrier_user'))" },
  { name: "v175_partner_view_approved_only", target: "partner_automation_maturity_records", sql: "FOR SELECT USING (NOT has_role('partner_user') OR external_status = 'approved')" },
];

export const V175_EDGE_BOUNDARY = [
  { layer: "createServerFn",  concern: "Approval submit, evidence attach, policy tuning request, board packet finalize", auth: "Authenticated + RLS", returns: "Typed DTO" },
  { layer: "createServerFn",  concern: "Board automation scale report assemble, exec decision route",                    auth: "Authenticated + RLS", returns: "Typed DTO" },
  { layer: "/api/public/*",   concern: "Signal ingestion webhooks (HMAC-verified), cron-triggered scoring entry",        auth: "HMAC signature",      returns: "Raw Response" },
  { layer: "Edge Function",   concern: "Batch scoring, evidence collection jobs, calibration drift detection, audit aggregation", auth: "Service role", returns: "Async / queue" },
  { layer: "Edge Function",   concern: "Long-running roadmap aggregation, KPI rollup snapshots",                          auth: "Service role",        returns: "Persisted metrics" },
  { layer: "Client",          concern: "Display predictions, evidence, queue, audit — NEVER mutate high-impact actions",  auth: "Session",             returns: "Read-only" },
];

export const V175_EDGE_FUNCTIONS = [
  // Automation scale
  { fn: "calculate-v175-governed-automation-scale-score", trigger: "cron 15m" },
  { fn: "generate-automation-scale-summary",              trigger: "on-demand + cron 1h" },
  { fn: "generate-automation-scale-action-plan",          trigger: "on-demand" },
  // Board execution
  { fn: "calculate-predictive-board-execution-maturity",  trigger: "cron 1h" },
  { fn: "generate-board-automation-evidence-summary",     trigger: "on-demand" },
  { fn: "generate-board-automation-scale-report",         trigger: "on-demand (HITL approve)" },
  // Revenue automation
  { fn: "calculate-revenue-automation-optimization",      trigger: "cron 15m" },
  { fn: "detect-revenue-automation-optimization-gaps",    trigger: "cron 1h" },
  { fn: "generate-revenue-automation-optimization-plan",  trigger: "on-demand" },
  // MP automation
  { fn: "calculate-marketplace-automation-governance-score", trigger: "cron 15m" },
  { fn: "detect-marketplace-automation-exceptions",       trigger: "cron 30m" },
  { fn: "generate-marketplace-automation-governance-plan",trigger: "on-demand" },
  // Strategic intel
  { fn: "calculate-strategic-intelligence-operating-excellence", trigger: "cron 1h" },
  { fn: "calculate-automation-control-maturity",          trigger: "cron 1h" },
  { fn: "calculate-predictive-risk-operations-scale",     trigger: "cron 30m" },
  // Approval/evidence/outcomes
  { fn: "calculate-approval-orchestration-scale",         trigger: "cron 30m" },
  { fn: "calculate-evidence-automation-scale",            trigger: "cron 30m" },
  { fn: "calculate-outcome-learning-maturity",            trigger: "cron 1h" },
  { fn: "calculate-recommendation-quality-improvement",   trigger: "cron 1h" },
  { fn: "generate-policy-tuning-summary",                 trigger: "on-demand" },
  // Domain automation
  { fn: "calculate-capital-intelligence-automation",      trigger: "cron 1h" },
  { fn: "calculate-account-automation-maturity",          trigger: "cron 1h" },
  { fn: "calculate-partner-automation-maturity",          trigger: "cron 1h" },
  { fn: "calculate-product-line-automation-maturity",     trigger: "cron 1h" },
  { fn: "calculate-category-automation-maturity",         trigger: "cron 1h" },
  // Audit / roadmap
  { fn: "generate-governed-automation-audit-report",      trigger: "on-demand (HITL approve)" },
  { fn: "detect-governed-automation-audit-exceptions",    trigger: "cron 30m" },
  { fn: "generate-long-term-automation-scale-roadmap",    trigger: "on-demand" },
];

export const V175_DEMO = [
  { step: 1,  actor: "CEO",        surface: "/v175/overview",         action: "Reviews V17.5 headline + governed-scale score 96%",  outcome: "Aligns leadership on V17.5 maturity" },
  { step: 2,  actor: "CEO",        surface: "/v175/command",          action: "Opens Governed Automation Scale Center, sees coverage matrix", outcome: "Confirms HITL on all high-impact actions" },
  { step: 3,  actor: "Board Admin", surface: "/v175/board-exec",      action: "Opens Predictive Board Execution Maturity, sees 2 evidence gaps + 1 CEO decision pending", outcome: "Routes gaps + decision" },
  { step: 4,  actor: "CRO",        surface: "/v175/revenue-opt",      action: "Renewal strong, expansion improving, 1 concentration exception, 2 stale evidence items", outcome: "Approves 3 renewals, refreshes 2 evidence" },
  { step: 5,  actor: "MP GM",      surface: "/v175/mp-gov",           action: "TX/Midwest strong; Southeast carrier density flagged; expansion routed", outcome: "Routes preferred-carrier expansion to CEO" },
  { step: 6,  actor: "Security/Admin", surface: "/v175/control-maturity", action: "Human approval controls passing; evidence has 1 exception; MP automation needs remediation", outcome: "Schedules control remediation in 5d" },
  { step: 7,  actor: "CEO",        surface: "/v175/exec-oversight",   action: "Reviews 4 high-risk requests: SE MP expansion, concentration, capital evidence, category proof", outcome: "Routes/approves accordingly" },
  { step: 8,  actor: "CFO",        surface: "/v175/capital-auto",     action: "Reviews capital evidence automation matrix and approval queue",  outcome: "Approves 1, sends 1 back" },
  { step: 9,  actor: "Risk Lead",  surface: "/v175/outcome-learning", action: "Reviews calibration drift on 2 policies",                       outcome: "Routes for dual-approval" },
  { step: 10, actor: "CMO",        surface: "/v175/category-auto",    action: "Reviews proof publishing approval pipeline and legal backlog", outcome: "Coordinates with GC to clear backlog" },
  { step: 11, actor: "Compliance", surface: "/v175/audit",            action: "Reviews 6 audit trail items + policy compliance + exceptions", outcome: "Confirms 0 self-approvals; closes 2 exceptions" },
  { step: 12, actor: "Board Admin", surface: "/v175/board-report",    action: "Generates Board Automation Scale Report w/ 15 sections",       outcome: "Sends to board with 3 decisions needed" },
  { step: 13, actor: "CEO",        surface: "/v175/roadmap",          action: "Reviews long-term automation scale roadmap (6 horizons)",      outcome: "Confirms V18 scaffolding next quarter" },
];

export const V175_PHASE49_TEASER =
  "Phase 49 (V18) teaser — enterprise autonomous-assist scale governance, predictive operating excellence, board automation maturity, durable revenue intelligence automation, and marketplace optimization scale controls. Still no autonomous dispatch, pricing, billing, marketplace, customer, carrier, compliance, capital, legal, or safety-impacting actions.";
