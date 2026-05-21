// V8.5 mock dataset — Phase 30 (global enterprise operating discipline).
// Mock-only; no live SLA / compliance / financial / audit / SOC 2 / ISO claims.

export const V85_FEATURE_MATRIX = [
  { area: "Global enterprise operating discipline", status: "shipped",     notes: "Score + 14 sub-domains" },
  { area: "International control maturity center",  status: "shipped",     notes: "14 control domains" },
  { area: "Country accountability dashboard",       status: "shipped",     notes: "Per-country owner + score" },
  { area: "Global control ownership matrix",        status: "shipped",     notes: "Owner + cadence + evidence" },
  { area: "Marketplace financial optimization",     status: "shipped",     notes: "Economics scoreboard" },
  { area: "Marketplace economics optimization",     status: "shipped",     notes: "10 optimization goals" },
  { area: "Financial control testing center",       status: "shipped",     notes: "Test runner + exception queue" },
  { area: "Revenue control maturity",               status: "placeholder", notes: "Tracker only — not GAAP" },
  { area: "Advanced board governance center",       status: "shipped",     notes: "Calendar + packet + decisions" },
  { area: "Executive stewardship dashboard",        status: "shipped",     notes: "Cross-functional priorities" },
  { area: "Long-term platform stewardship model",   status: "shipped",     notes: "12 stewardship domains" },
  { area: "Global operating cadence control",       status: "shipped",     notes: "Calendar + completion" },
  { area: "Country performance review system",      status: "shipped",     notes: "Quarterly review structure" },
  { area: "Compliance execution maturity",          status: "shipped",     notes: "Owners + evidence + remediation" },
  { area: "International support discipline",       status: "shipped",     notes: "Coverage map + SLA + KB" },
  { area: "Global customer success discipline",     status: "shipped",     notes: "Renewal + expansion + adoption" },
  { area: "Partner operating discipline",           status: "shipped",     notes: "Launch + revenue + risk" },
  { area: "Strategic risk ownership",               status: "shipped",     notes: "Owner + mitigation + residual" },
  { area: "Product-line stewardship",               status: "shipped",     notes: "12 product lines" },
  { area: "AI governance stewardship",              status: "shipped",     notes: "Policy + thresholds + evidence" },
  { area: "Platform reliability stewardship",       status: "shipped",     notes: "Service health + postmortems" },
];

export const V85_DEFERRED = [
  "Fully autonomous dispatch without human approval",
  "Final certification claims without tracked evidence",
  "Final financial audit / SOC 2 / ISO without evidence",
  "Full customs production workflows",
  "Full international tax automation",
  "Insurance underwriting automation",
  "Autonomous vehicle workflows",
  "Final IPO / acquisition claims",
  "Final Android Auto / CarPlay claims",
];

// ---- Operating discipline -------------------------------------------------
export const V85_OPERATING_DISCIPLINE = {
  score: 82,
  level: "Disciplined",
  trend_pts: +3,
};

export const V85_DISCIPLINE_DOMAINS = [
  { domain: "Country operating",     score: 80, trend: +2, owner: "COO" },
  { domain: "Marketplace",           score: 84, trend: +3, owner: "Marketplace lead" },
  { domain: "Financial controls",    score: 77, trend: +1, owner: "CFO" },
  { domain: "Compliance",            score: 79, trend: +2, owner: "CCO" },
  { domain: "Customer success",      score: 83, trend: +2, owner: "CS lead" },
  { domain: "Support",               score: 81, trend: +1, owner: "Support lead" },
  { domain: "Partner",               score: 78, trend: +1, owner: "Partner lead" },
  { domain: "Product",               score: 80, trend: +2, owner: "CPO" },
  { domain: "AI governance",         score: 82, trend: +3, owner: "AI lead" },
  { domain: "Security",              score: 84, trend: +1, owner: "CISO placeholder" },
  { domain: "Board governance",      score: 86, trend: +2, owner: "Board chair" },
  { domain: "Strategic risk",        score: 74, trend: +1, owner: "Risk" },
  { domain: "Platform reliability",  score: 85, trend: +2, owner: "SRE" },
  { domain: "Data stewardship",      score: 78, trend: +2, owner: "Privacy" },
];

export const V85_DISCIPLINE_TREND = [
  { week: "W-5", score: 75 },
  { week: "W-4", score: 77 },
  { week: "W-3", score: 78 },
  { week: "W-2", score: 80 },
  { week: "W-1", score: 81 },
  { week: "W-0", score: 82 },
];

export const V85_DISCIPLINE_GAPS = [
  { gap: "API overage billing control gap",        domain: "Financial controls", owner: "Billing ops",  due: "this week" },
  { gap: "Data residency exception (Canada)",      domain: "Compliance",         owner: "Engineering",  due: "this week" },
  { gap: "Reefer carrier concentration (ON)",      domain: "Marketplace",        owner: "Carrier ops",  due: "+2 weeks" },
  { gap: "Bilingual support coverage placeholder", domain: "Support",            owner: "Support lead", due: "+30 days" },
];

export const V85_DISCIPLINE_ACTION_PLAN = [
  { action: "Approve API overage control fix + re-test",     owner: "CFO + Billing ops", status: "open"        },
  { action: "Sign off Canada region storage approval",       owner: "CTO",               status: "in-review"   },
  { action: "Recruit 2 reefer carriers in ON corridor",      owner: "Marketplace lead",  status: "open"        },
  { action: "Confirm bilingual support placeholder framing", owner: "Support lead",      status: "scoped"      },
  { action: "Close 3 oldest executive decisions",            owner: "Exec team",         status: "scheduled"   },
];

// ---- International control maturity ---------------------------------------
export const V85_CONTROL_MATURITY = {
  score: 78,
  controls_total: 84,
  controls_designed: 84,
  controls_implemented: 76,
  controls_tested: 64,
  evidence_completeness: 71,
  exceptions_open: 9,
  remediations_overdue: 2,
};

export const V85_CONTROL_DOMAINS = [
  { domain: "Country launch controls",       score: 78, status: "in-test",     owner: "COO",         exception: 1 },
  { domain: "Data residency controls",       score: 64, status: "needs-test",  owner: "Engineering", exception: 1 },
  { domain: "Billing controls",              score: 82, status: "passing",     owner: "Billing ops", exception: 0 },
  { domain: "Financial controls",            score: 77, status: "in-test",     owner: "CFO",         exception: 1 },
  { domain: "Compliance controls",           score: 81, status: "passing",     owner: "CCO",         exception: 1 },
  { domain: "Marketplace controls",          score: 84, status: "passing",     owner: "Marketplace", exception: 0 },
  { domain: "Carrier controls",              score: 79, status: "in-test",     owner: "Carrier ops", exception: 1 },
  { domain: "API/EDI controls",              score: 86, status: "passing",     owner: "Engineering", exception: 0 },
  { domain: "Support access controls",       score: 80, status: "remediation", owner: "Support",     exception: 1 },
  { domain: "Customer data controls",        score: 83, status: "passing",     owner: "Privacy",     exception: 0 },
  { domain: "Driver privacy controls",       score: 85, status: "passing",     owner: "Privacy",     exception: 0 },
  { domain: "AI governance controls",        score: 82, status: "passing",     owner: "AI",          exception: 0 },
  { domain: "Partner controls",              score: 76, status: "in-test",     owner: "Partner",     exception: 1 },
  { domain: "Incident response controls",    score: 74, status: "in-test",     owner: "SRE",         exception: 2 },
];

export const V85_CONTROL_EXCEPTIONS = [
  { id: "EX-501", domain: "Data residency",      severity: "high",   owner: "Engineering", due: "2026-06-04", status: "open" },
  { id: "EX-502", domain: "Financial controls",  severity: "medium", owner: "Billing ops", due: "2026-06-08", status: "open" },
  { id: "EX-503", domain: "Support access",      severity: "medium", owner: "Support",     due: "2026-06-12", status: "remediating" },
  { id: "EX-504", domain: "Incident response",   severity: "medium", owner: "SRE",         due: "2026-06-15", status: "open" },
];

// ---- Country accountability -----------------------------------------------
export const V85_COUNTRY_ACCOUNTABILITY = [
  { country: "USA",    owner: "COO-USA",      sponsor: "CEO",  phase: "Active",            operating: 84, marketplace: 81, financial: 82, compliance: 78, success: 83, support: 86, partner: 78, residency_risk: "low",    blockers: 1, exceptions: 1, revenue_placeholder: "tracked",     expansion_rec: "scale" },
  { country: "Canada", owner: "COO-CA",       sponsor: "COO",  phase: "Controlled Pilot",  operating: 78, marketplace: 72, financial: 74, compliance: 68, success: 76, support: 74, partner: 70, residency_risk: "medium", blockers: 3, exceptions: 2, revenue_placeholder: "pilot",       expansion_rec: "continue pilot" },
  { country: "Mexico", owner: "Strategy-MX",  sponsor: "CEO",  phase: "Planning",          operating: 63, marketplace: 41, financial: 52, compliance: 48, success: 50, support: 0,  partner: 38, residency_risk: "medium", blockers: 6, exceptions: 2, revenue_placeholder: "n/a",         expansion_rec: "continue planning" },
  { country: "EU",     owner: "Strategy-EU",  sponsor: "CEO",  phase: "Research",          operating: 41, marketplace: 18, financial: 28, compliance: 22, success: 24, support: 0,  partner: 12, residency_risk: "high",   blockers: 9, exceptions: 1, revenue_placeholder: "n/a",         expansion_rec: "defer" },
  { country: "UK",     owner: "Strategy-UK",  sponsor: "CEO",  phase: "Research",          operating: 44, marketplace: 22, financial: 34, compliance: 28, success: 28, support: 0,  partner: 18, residency_risk: "medium", blockers: 7, exceptions: 0, revenue_placeholder: "n/a",         expansion_rec: "defer" },
];

// ---- Global control ownership matrix --------------------------------------
export const V85_CONTROL_OWNERSHIP = [
  { control: "Country launch playbook",      owner: "COO",         country: "Global",  sponsor: "CEO",  cadence: "Quarterly", evidence: "playbook+sign-off", last_tested: "2026-04-15", result: "pass",   exception: "none",  remediation: "n/a",          due: "n/a",        escalation: "none" },
  { control: "Data residency boundary",      owner: "Engineering", country: "Canada",  sponsor: "CTO",  cadence: "Monthly",   evidence: "infra report",      last_tested: "2026-05-02", result: "review", exception: "open",  remediation: "Engineering",  due: "2026-06-04", escalation: "exec" },
  { control: "Marketplace fee calc",         owner: "Finance",     country: "Global",  sponsor: "CFO",  cadence: "Monthly",   evidence: "ledger sample",     last_tested: "2026-05-08", result: "pass",   exception: "none",  remediation: "n/a",          due: "n/a",        escalation: "none" },
  { control: "API overage billing",          owner: "Billing ops", country: "Global",  sponsor: "CFO",  cadence: "Monthly",   evidence: "replay log",        last_tested: "2026-05-08", result: "review", exception: "open",  remediation: "Billing ops",  due: "2026-06-08", escalation: "ops" },
  { control: "Manual adjustment approval",   owner: "Finance",     country: "Global",  sponsor: "CFO",  cadence: "Weekly",    evidence: "approval log",      last_tested: "2026-05-15", result: "review", exception: "open",  remediation: "Finance",      due: "2026-06-01", escalation: "exec" },
  { control: "Carrier eligibility (CA)",     owner: "Carrier ops", country: "Canada",  sponsor: "COO",  cadence: "Weekly",    evidence: "intake form",       last_tested: "2026-05-15", result: "pass",   exception: "none",  remediation: "n/a",          due: "n/a",        escalation: "none" },
  { control: "Support access RBAC",          owner: "Support",     country: "Global",  sponsor: "CCO",  cadence: "Quarterly", evidence: "access review",     last_tested: "2026-04-30", result: "review", exception: "open",  remediation: "Support",      due: "2026-06-12", escalation: "ops" },
  { control: "AI governance review",         owner: "AI",          country: "Global",  sponsor: "CCO",  cadence: "Monthly",   evidence: "policy + thresholds", last_tested: "2026-05-09", result: "pass", exception: "none",  remediation: "n/a",          due: "n/a",        escalation: "none" },
  { control: "Incident response runbook",    owner: "SRE",         country: "Global",  sponsor: "CTO",  cadence: "Quarterly", evidence: "tabletop notes",    last_tested: "2026-04-21", result: "review", exception: "open",  remediation: "SRE",          due: "2026-06-15", escalation: "exec" },
  { control: "Partner security review",      owner: "Security",    country: "Global",  sponsor: "CISO", cadence: "Quarterly", evidence: "review log",        last_tested: "2026-04-12", result: "pass",   exception: "none",  remediation: "n/a",          due: "n/a",        escalation: "none" },
];

// ---- Marketplace financial optimization -----------------------------------
export const V85_MARKETPLACE_ECONOMICS = {
  score: 78,
  revenue_placeholder: "tracked",
  fees_placeholder: "tracked",
  take_rate_placeholder: "n/a — not modeled",
  avg_fee_per_load: 28,
  avg_load_value_placeholder: "n/a",
  carrier_acq_cost_placeholder: "n/a",
  carrier_retention: 82,
  customer_adoption: 64,
  load_coverage_rate: 86,
  ttfb_min: 6,
  ttaward_min: 24,
  uncovered_rate: 14,
  dispute_cost_placeholder: "tracked",
  settlement_hold_placeholder: "n/a",
  margin_placeholder: "n/a — not modeled",
};

export const V85_MARKETPLACE_FEE_PANEL = [
  { lane_class: "Dry van — short",   capture: 92, opportunity: "Maintain" },
  { lane_class: "Dry van — long",    capture: 88, opportunity: "Tune tier" },
  { lane_class: "Reefer — short",    capture: 78, opportunity: "Review schedule" },
  { lane_class: "Reefer — long",     capture: 71, opportunity: "Review schedule" },
  { lane_class: "Flatbed — special", capture: 74, opportunity: "Add surcharge logic" },
];

export const V85_MARKETPLACE_FIN_RISK = [
  { risk: "Dispute cost rising in USA-W",       severity: "medium" },
  { risk: "Settlement hold not modeled yet",    severity: "low"    },
  { risk: "Carrier concentration risk (ON)",    severity: "medium" },
  { risk: "Margin model not built",             severity: "low"    },
];

// ---- Marketplace economics optimization -----------------------------------
export const V85_ECON_GOALS = [
  { goal: "Improve load coverage",            current: 86, target: 92, owner: "Marketplace" },
  { goal: "Increase qualified bids",          current: 4.3, target: 5.5, owner: "Marketplace" },
  { goal: "Reduce time to award",             current: 24, target: 18, owner: "Marketplace" },
  { goal: "Reduce uncovered loads",           current: 14, target: 8,  owner: "Marketplace" },
  { goal: "Improve carrier quality",          current: 82, target: 88, owner: "Carrier ops" },
  { goal: "Reduce dispute rate",              current: 2.1, target: 1.4, owner: "Marketplace" },
  { goal: "Improve fee capture",              current: 81, target: 88, owner: "Finance" },
  { goal: "Improve regional liquidity (ON)",  current: 58, target: 70, owner: "Marketplace" },
  { goal: "Reduce carrier concentration",     current: 28, target: 20, owner: "Strategy" },
  { goal: "Improve customer adoption",        current: 64, target: 78, owner: "CS" },
];

export const V85_ECON_LIQUIDITY_PANELS = [
  { region: "USA · NE",     liquidity: 82, action: "Maintain" },
  { region: "USA · MW",     liquidity: 74, action: "Boost lane density" },
  { region: "USA · W",      liquidity: 69, action: "Add reefer capacity" },
  { region: "Canada · ON",  liquidity: 58, action: "Recruit 2 reefer carriers" },
];

export const V85_ECON_BID_DENSITY = [
  { lane_class: "Dry van — short",   bids: 5.2, target: 5.5 },
  { lane_class: "Dry van — long",    bids: 4.7, target: 5.0 },
  { lane_class: "Reefer — short",    bids: 3.4, target: 4.5 },
  { lane_class: "Reefer — long",     bids: 2.8, target: 4.0 },
  { lane_class: "Flatbed — special", bids: 2.6, target: 3.5 },
];

// ---- Financial control testing --------------------------------------------
export const V85_FIN_TESTS = [
  { test: "Subscription change audit",          owner: "Billing ops", status: "pass",    last_run: "2026-05-18", evidence: "diff log" },
  { test: "Usage billing completeness",         owner: "Billing eng", status: "pass",    last_run: "2026-05-18", evidence: "replay" },
  { test: "Marketplace fee calculation",        owner: "Finance",     status: "pass",    last_run: "2026-05-16", evidence: "ledger" },
  { test: "API overage calculation",            owner: "Billing ops", status: "review",  last_run: "2026-05-15", evidence: "missing" },
  { test: "Partner revenue share (placeholder)", owner: "Finance",    status: "review",  last_run: "2026-05-10", evidence: "needs approval" },
  { test: "Carrier settlement (placeholder)",   owner: "Ops",         status: "deferred", last_run: "n/a",       evidence: "n/a" },
  { test: "Manual adjustment approval",         owner: "Finance",     status: "exception", last_run: "2026-05-19", evidence: "1 unapproved" },
  { test: "Invoice audit trail",                owner: "Finance",     status: "pass",    last_run: "2026-05-19", evidence: "trail" },
  { test: "Failed payment handling",            owner: "Billing ops", status: "pass",    last_run: "2026-05-18", evidence: "retry log" },
  { test: "Billing webhook evidence",           owner: "Billing eng", status: "pass",    last_run: "2026-05-18", evidence: "signed log" },
  { test: "Revenue event reconciliation",       owner: "Finance",     status: "review",  last_run: "2026-05-17", evidence: "26 unmatched" },
];

export const V85_FIN_TEST_SUMMARY = { total: 11, passing: 6, review: 3, exception: 1, deferred: 1 };

export const V85_FIN_EVIDENCE_REQUESTS = [
  { request: "API overage replay sample",         owner: "Billing ops", due: "2026-06-08", status: "open" },
  { request: "Partner revshare approval log",     owner: "Finance",     due: "2026-06-10", status: "open" },
  { request: "Manual adjustment approval (Apr)",  owner: "Finance",     due: "2026-06-01", status: "open" },
];

// ---- Revenue control maturity ---------------------------------------------
export const V85_REVENUE_CONTROL = {
  score: 73,
  event_completeness: 92,
  classification_accuracy: 88,
  recon_exception_rate: 2.1,
  manual_adjustment_rate: 1.4,
  evidence_freshness: 78,
};

export const V85_REVENUE_EVENT_COMPLETENESS = [
  { source: "Subscription",     completeness: 99 },
  { source: "Usage",            completeness: 96 },
  { source: "Marketplace fee",  completeness: 94 },
  { source: "API overage",      completeness: 84 },
  { source: "Partner revshare", completeness: 78 },
  { source: "Invoices",         completeness: 99 },
  { source: "Payments",         completeness: 98 },
];

export const V85_REVENUE_RECON_TREND = [
  { week: "W-5", exceptions: 11 },
  { week: "W-4", exceptions: 9  },
  { week: "W-3", exceptions: 8  },
  { week: "W-2", exceptions: 7  },
  { week: "W-1", exceptions: 6  },
  { week: "W-0", exceptions: 6  },
];

// ---- Advanced board governance --------------------------------------------
export const V85_BOARD_CALENDAR = [
  { date: "2026-06-03", event: "Board prep — operating + financial",   owner: "CEO" },
  { date: "2026-06-10", event: "Board prep — risk + compliance",       owner: "CCO" },
  { date: "2026-06-17", event: "Board prep — marketplace + product",   owner: "CPO + Marketplace" },
  { date: "2026-06-24", event: "Quarterly board review",               owner: "CEO + Board chair" },
];

export const V85_BOARD_PACKET_SECTIONS = [
  { section: "Operating discipline",       owner: "COO",       status: "draft" },
  { section: "Financial controls",         owner: "CFO",       status: "draft" },
  { section: "Country performance",        owner: "COO",       status: "draft" },
  { section: "Marketplace economics",      owner: "Marketplace", status: "draft" },
  { section: "Strategic risks",            owner: "Risk",      status: "draft" },
  { section: "Executive decisions needed", owner: "CEO",       status: "draft" },
  { section: "AI governance",              owner: "AI",        status: "draft" },
  { section: "Platform reliability",       owner: "SRE",       status: "draft" },
  { section: "Customer + partner",         owner: "CS + Partner", status: "draft" },
  { section: "KPI appendix",               owner: "Analytics", status: "draft" },
];

export const V85_BOARD_DECISIONS = [
  { id: "BD-301", subject: "Approve Canada controlled pilot extension",        owner: "Board", status: "pending",  due: "2026-06-24" },
  { id: "BD-302", subject: "Approve Mexico planning continuation",             owner: "Board", status: "pending",  due: "2026-06-24" },
  { id: "BD-303", subject: "Approve API overage control remediation",          owner: "Board", status: "pending",  due: "2026-06-24" },
  { id: "BD-304", subject: "Accept ON carrier concentration risk",             owner: "Board", status: "pending",  due: "2026-06-24" },
  { id: "BD-305", subject: "Approve product investment in CoPilot + MP",       owner: "Board", status: "pending",  due: "2026-06-24" },
];

export const V85_BOARD_ACTIONS = [
  { id: "BA-201", action: "Document Mexico defer rationale",        owner: "Strategy", due: "2026-06-12", status: "in-progress" },
  { id: "BA-202", action: "Publish API overage remediation plan",   owner: "CFO",      due: "2026-06-05", status: "open" },
  { id: "BA-203", action: "Sign off CA region storage approval",    owner: "CTO",      due: "2026-06-10", status: "in-review" },
];

export const V85_BOARD_KPI_APPENDIX = [
  { kpi: "Operating discipline",   value: "82" },
  { kpi: "Control maturity",       value: "78" },
  { kpi: "Marketplace economics",  value: "78" },
  { kpi: "Financial controls",     value: "77" },
  { kpi: "Revenue control",        value: "73" },
  { kpi: "Compliance execution",   value: "79" },
  { kpi: "Customer success",       value: "81" },
  { kpi: "Support",                value: "81" },
  { kpi: "Partner",                value: "78" },
  { kpi: "AI governance",          value: "82" },
  { kpi: "Reliability",            value: "85" },
  { kpi: "Strategic risk",         value: "74" },
];

// ---- Executive stewardship ------------------------------------------------
export const V85_EXEC_PRIORITIES = [
  { exec: "CEO",  priority: "Hold operating discipline > 80 through Canada pilot",      blocker: "None"               },
  { exec: "COO",  priority: "Close Canada exceptions + recruit reefer carriers",        blocker: "Carrier intake"     },
  { exec: "CFO",  priority: "Approve API overage control fix + re-test in 7d",          blocker: "Replay evidence"    },
  { exec: "CTO",  priority: "Sign off CA region storage approval",                      blocker: "Privacy review"     },
  { exec: "CCO",  priority: "Resolve critical compliance exceptions",                   blocker: "None"               },
  { exec: "CISO", priority: "Quarterly partner security review",                        blocker: "None (placeholder)" },
  { exec: "CS",   priority: "Save play on Cross-Pac Shipping before renewal",           blocker: "Exec sponsor time"  },
  { exec: "Marketplace", priority: "Boost ON corridor liquidity",                       blocker: "Carrier supply"     },
  { exec: "Partner", priority: "Greenlight CA telematics verified state",               blocker: "Compliance review"  },
  { exec: "CPO",  priority: "Add Canada-specific enablement plan",                      blocker: "Localization"       },
  { exec: "Compliance", priority: "Schedule mobile evidence capture",                   blocker: "Mobile sprint"      },
];

export const V85_EXEC_CROSS_BLOCKERS = [
  { blocker: "CA region storage approval",        owners: "CTO + Privacy + CCO",   age_days: 6 },
  { blocker: "API overage remediation",           owners: "CFO + Billing ops + Eng", age_days: 9 },
  { blocker: "ON reefer carrier supply",          owners: "Marketplace + Carrier ops", age_days: 4 },
];

export const V85_STRATEGIC_INITIATIVES = [
  { initiative: "Canada controlled pilot graduation",  status: "on-track", sponsor: "CEO" },
  { initiative: "Marketplace economics optimization",  status: "on-track", sponsor: "Marketplace" },
  { initiative: "Financial control maturity",          status: "at-risk",  sponsor: "CFO" },
  { initiative: "Long-term platform stewardship",      status: "on-track", sponsor: "COO" },
  { initiative: "AI governance stewardship",           status: "on-track", sponsor: "AI" },
];

// ---- Long-term platform stewardship ---------------------------------------
export const V85_STEWARDSHIP_DOMAINS = [
  { domain: "Product stewardship",         owner: "CPO",         health: 80, risk: "low",    action: "Quarterly roadmap review" },
  { domain: "Customer stewardship",        owner: "CS lead",     health: 82, risk: "low",    action: "Save play on at-risk accounts" },
  { domain: "Marketplace stewardship",     owner: "Marketplace", health: 78, risk: "medium", action: "Boost ON liquidity" },
  { domain: "Carrier network stewardship", owner: "Carrier ops", health: 76, risk: "medium", action: "Diversify reefer supply" },
  { domain: "Partner ecosystem",           owner: "Partner",     health: 74, risk: "medium", action: "CA telematics certification" },
  { domain: "AI governance",               owner: "AI",          health: 82, risk: "low",    action: "Threshold tuning review" },
  { domain: "Security stewardship",        owner: "CISO",        health: 84, risk: "low",    action: "Tabletop drill" },
  { domain: "Compliance stewardship",      owner: "CCO",         health: 79, risk: "medium", action: "CA evidence capture" },
  { domain: "Financial stewardship",       owner: "CFO",         health: 77, risk: "medium", action: "API overage fix" },
  { domain: "Data stewardship",            owner: "Privacy",     health: 78, risk: "medium", action: "Residency boundary" },
  { domain: "Reliability stewardship",     owner: "SRE",         health: 85, risk: "low",    action: "Postmortem closure" },
  { domain: "Brand / category",            owner: "Marketing",   health: 76, risk: "low",    action: "Category narrative refresh" },
];

export const V85_STEWARDSHIP_SCORE = { score: 79, owners: 12, action_items: 12, top_risks: 5 };

// ---- Global operating cadence ---------------------------------------------
export const V85_CADENCE = [
  { cadence: "Daily ops review",            frequency: "Daily",    owner: "COO",         completion: 96, last: "2026-05-19" },
  { cadence: "Weekly country review",       frequency: "Weekly",   owner: "COO",         completion: 100, last: "2026-05-19" },
  { cadence: "Weekly marketplace review",   frequency: "Weekly",   owner: "Marketplace", completion: 100, last: "2026-05-18" },
  { cadence: "Weekly fin controls review",  frequency: "Weekly",   owner: "CFO",         completion: 92,  last: "2026-05-17" },
  { cadence: "Weekly support review",       frequency: "Weekly",   owner: "Support",     completion: 96,  last: "2026-05-19" },
  { cadence: "Weekly CS review",            frequency: "Weekly",   owner: "CS",          completion: 100, last: "2026-05-18" },
  { cadence: "Weekly partner review",       frequency: "Weekly",   owner: "Partner",     completion: 88,  last: "2026-05-15" },
  { cadence: "Monthly compliance review",   frequency: "Monthly",  owner: "CCO",         completion: 100, last: "2026-05-08" },
  { cadence: "Monthly board prep",          frequency: "Monthly",  owner: "CEO",         completion: 100, last: "2026-05-12" },
  { cadence: "Quarterly board review",      frequency: "Quarterly", owner: "Board",      completion: 100, last: "2026-03-25" },
  { cadence: "Quarterly expansion review",  frequency: "Quarterly", owner: "Strategy",   completion: 100, last: "2026-03-30" },
  { cadence: "Annual strategic planning",   frequency: "Annual",   owner: "CEO",         completion: 0,   last: "placeholder" },
];

export const V85_CADENCE_HEALTH = { score: 92, on_track: 10, at_risk: 1, planned: 1 };

// ---- Country performance review -------------------------------------------
export const V85_COUNTRY_REVIEWS = [
  { country: "USA",    operating: 84, liquidity: 78, adoption: 80, driver: 82, carrier: 90, partner: 78, financial: 82, compliance: 78, support: 86, revenue_placeholder: "tracked", risk: "low",    decision: "scale" },
  { country: "Canada", operating: 78, liquidity: 58, adoption: 66, driver: 70, carrier: 64, partner: 70, financial: 74, compliance: 68, support: 74, revenue_placeholder: "pilot",   risk: "medium", decision: "continue pilot" },
  { country: "Mexico", operating: 63, liquidity: 0,  adoption: 0,  driver: 0,  carrier: 28, partner: 38, financial: 52, compliance: 48, support: 0,  revenue_placeholder: "n/a",     risk: "medium", decision: "continue planning" },
  { country: "EU",     operating: 41, liquidity: 0,  adoption: 0,  driver: 0,  carrier: 0,  partner: 12, financial: 28, compliance: 22, support: 0,  revenue_placeholder: "n/a",     risk: "high",   decision: "defer" },
];

export const V85_COUNTRY_REVIEW_NOTES = [
  { country: "Canada", note: "Reefer carrier recruitment is the gating action. Compliance evidence in progress." },
  { country: "Mexico", note: "Hold until partner readiness improves. Financial controls in planning." },
  { country: "EU",     note: "Defer — residency + compliance scope not modeled." },
];

// ---- Compliance execution maturity ----------------------------------------
export const V85_COMPLIANCE_MATURITY = {
  score: 79,
  controls_designed: 84,
  controls_implemented: 76,
  controls_tested: 64,
  evidence_collected: 71,
  exceptions_open: 7,
  remediations_overdue: 2,
  policy_acks_pct: 92,
  access_reviews_pct: 88,
  vendor_reviews_pct: 76,
  customer_security_requests_open: 3,
};

export const V85_COMPLIANCE_EXECUTION_TREND = [
  { week: "W-5", controls_tested: 52 },
  { week: "W-4", controls_tested: 56 },
  { week: "W-3", controls_tested: 58 },
  { week: "W-2", controls_tested: 60 },
  { week: "W-1", controls_tested: 62 },
  { week: "W-0", controls_tested: 64 },
];

export const V85_COMPLIANCE_REMEDIATION = [
  { item: "CA residency boundary",     owner: "Engineering", due: "2026-06-04", overdue: false },
  { item: "Mobile evidence capture",   owner: "Mobile",      due: "2026-05-30", overdue: true  },
  { item: "Support access review",     owner: "Support",     due: "2026-06-12", overdue: false },
  { item: "Incident response drill",   owner: "SRE",         due: "2026-06-15", overdue: false },
];

// ---- International support discipline -------------------------------------
export const V85_SUPPORT_DISCIPLINE = [
  { country: "USA",    hours: "24x7",  timezones: 4, language: "EN",                 sla: 96, critical: 0, escalations: 2, kb: "current",    burden_driver: 28, burden_customer: 22, burden_marketplace: 14, burden_api: 12, burden_partner: 8 },
  { country: "Canada", hours: "16x5",  timezones: 1, language: "EN/FR placeholder", sla: 88, critical: 1, escalations: 4, kb: "in-progress", burden_driver: 14, burden_customer: 10, burden_marketplace: 6,  burden_api: 4,  burden_partner: 2 },
  { country: "Mexico", hours: "n/a",   timezones: 0, language: "ES research",        sla: 0,  critical: 0, escalations: 0, kb: "research",   burden_driver: 0,  burden_customer: 0,  burden_marketplace: 0,  burden_api: 0,  burden_partner: 0 },
];

export const V85_SUPPORT_DISCIPLINE_SCORE = { score: 81, regions: 3, kb_coverage: 78, escalation_health: 84 };

// ---- Global customer success discipline -----------------------------------
export const V85_CS_DISCIPLINE = {
  score: 83,
  accounts: 6,
  at_risk: 1,
  expansion_open: 4,
  exec_sponsors_engaged: 5,
  qbr_status_placeholder: "tracked",
  success_plans_complete: 4,
};

export const V85_CS_HEALTH_MATRIX = [
  { account: "Acme Carriers",      country: "USA",    health: 88, adoption: 84, renewal: "low",    expansion: "high", sponsor: "COO", success_plan: "complete"   },
  { account: "BlueRail Logistics", country: "USA",    health: 76, adoption: 72, renewal: "low",    expansion: "med",  sponsor: "CCO", success_plan: "complete"   },
  { account: "Maple Freight",      country: "Canada", health: 74, adoption: 68, renewal: "low",    expansion: "med",  sponsor: "CCO", success_plan: "complete"   },
  { account: "Northern Star",      country: "Canada", health: 62, adoption: 58, renewal: "medium", expansion: "low",  sponsor: "COO", success_plan: "in-progress" },
  { account: "Cross-Pac Shipping", country: "USA",    health: 54, adoption: 51, renewal: "high",   expansion: "low",  sponsor: "COO", success_plan: "missing"    },
  { account: "Gulf Carriers",      country: "USA",    health: 82, adoption: 78, renewal: "low",    expansion: "high", sponsor: "COO", success_plan: "complete"   },
];

// ---- Partner operating discipline -----------------------------------------
export const V85_PARTNER_DISCIPLINE = [
  { partner: "FuelCard Co",      launch: "complete",  revenue_placeholder: "tracked", security: "pass",   compliance: "pass",  integration: 92, docs: "complete", support_burden: "low", risk: "low",    issues: 0, opportunity: "high" },
  { partner: "ELDPartner",       launch: "complete",  revenue_placeholder: "tracked", security: "pass",   compliance: "pass",  integration: 88, docs: "complete", support_burden: "med", risk: "low",    issues: 1, opportunity: "high" },
  { partner: "FactorFlow",       launch: "complete",  revenue_placeholder: "tracked", security: "pass",   compliance: "pass",  integration: 84, docs: "complete", support_burden: "low", risk: "low",    issues: 0, opportunity: "med"  },
  { partner: "CA Telematics Co", launch: "in-pilot",  revenue_placeholder: "tracked", security: "review", compliance: "review", integration: 62, docs: "draft",   support_burden: "med", risk: "med",    issues: 2, opportunity: "med"  },
  { partner: "Quebec Fuel",      launch: "planning",  revenue_placeholder: "n/a",     security: "tbd",    compliance: "tbd",   integration: 0,  docs: "tbd",      support_burden: "n/a", risk: "med",    issues: 0, opportunity: "med"  },
];

export const V85_PARTNER_DISCIPLINE_SCORE = { score: 78, live: 3, pilot: 1, planning: 1, issues_open: 3 };

// ---- Strategic risk ownership ---------------------------------------------
export const V85_STRATEGIC_RISKS = [
  { id: "R-401", category: "Country launch",  severity: "high",   probability: "medium", impact: "high",   owner: "COO",         sponsor: "CEO",  mitigation: "Phased pilot graduation",     due: "2026-06-24", review: "Weekly",  escalation: "exec", board: true,  residual: "medium" },
  { id: "R-402", category: "Data residency",  severity: "high",   probability: "low",    impact: "high",   owner: "Engineering", sponsor: "CTO",  mitigation: "CA region storage approval",  due: "2026-06-10", review: "Weekly",  escalation: "exec", board: true,  residual: "low"    },
  { id: "R-403", category: "Financial control", severity: "medium", probability: "medium", impact: "high", owner: "Billing ops", sponsor: "CFO",  mitigation: "API overage control fix",     due: "2026-06-08", review: "Weekly",  escalation: "exec", board: true,  residual: "medium" },
  { id: "R-404", category: "Marketplace concentration", severity: "medium", probability: "medium", impact: "medium", owner: "Marketplace", sponsor: "COO", mitigation: "Diversify reefer supply", due: "2026-06-30", review: "Monthly", escalation: "ops",  board: true,  residual: "medium" },
  { id: "R-405", category: "Compliance evidence", severity: "medium", probability: "low",    impact: "medium", owner: "CCO",         sponsor: "CCO",  mitigation: "Mobile evidence capture",     due: "2026-06-12", review: "Monthly", escalation: "ops",  board: false, residual: "low"    },
  { id: "R-406", category: "AI governance",    severity: "low",    probability: "low",    impact: "medium", owner: "AI",          sponsor: "CCO",  mitigation: "Threshold tuning review",     due: "2026-06-30", review: "Monthly", escalation: "ops",  board: false, residual: "low"    },
  { id: "R-407", category: "Partner risk",    severity: "medium", probability: "medium", impact: "medium", owner: "Partner",     sponsor: "COO",  mitigation: "CA telematics certification", due: "2026-06-20", review: "Monthly", escalation: "ops",  board: false, residual: "medium" },
  { id: "R-408", category: "Reliability",     severity: "medium", probability: "low",    impact: "high",   owner: "SRE",         sponsor: "CTO",  mitigation: "Incident response drill",     due: "2026-06-15", review: "Monthly", escalation: "ops",  board: true,  residual: "medium" },
];

export const V85_RESIDUAL_RISK_TREND = [
  { week: "W-5", residual: 38 },
  { week: "W-4", residual: 36 },
  { week: "W-3", residual: 34 },
  { week: "W-2", residual: 32 },
  { week: "W-1", residual: 31 },
  { week: "W-0", residual: 30 },
];

// ---- Product-line stewardship ---------------------------------------------
export const V85_PRODUCT_LINES = [
  { line: "Dispatch Command Center",  owner: "PM-Dispatch", adoption: 92, revenue_placeholder: "core",   value: "high",   support: "med",  reliability: 96, debt_placeholder: "tracked", roadmap: "healthy", competitive: "strong",     investment: "maintain" },
  { line: "EliteNav (GPS)",           owner: "PM-Driver",   adoption: 78, revenue_placeholder: "tracked", value: "high",  support: "med",  reliability: 94, debt_placeholder: "tracked", roadmap: "healthy", competitive: "strong",     investment: "maintain" },
  { line: "Driver Mobile",            owner: "PM-Driver",   adoption: 88, revenue_placeholder: "core",   value: "high",   support: "med",  reliability: 95, debt_placeholder: "tracked", roadmap: "healthy", competitive: "strong",     investment: "maintain" },
  { line: "Customer Portal",          owner: "PM-Portal",   adoption: 64, revenue_placeholder: "tracked", value: "med",   support: "low",  reliability: 96, debt_placeholder: "tracked", roadmap: "healthy", competitive: "differentiated", investment: "expand" },
  { line: "CoPilot AI",               owner: "PM-AI",       adoption: 72, revenue_placeholder: "tracked", value: "high",  support: "low",  reliability: 92, debt_placeholder: "tracked", roadmap: "healthy", competitive: "leading",    investment: "expand" },
  { line: "Carrier Marketplace",      owner: "PM-MP",       adoption: 68, revenue_placeholder: "tracked", value: "high",  support: "med",  reliability: 94, debt_placeholder: "tracked", roadmap: "healthy", competitive: "leading",    investment: "expand" },
  { line: "API Platform",             owner: "PM-API",      adoption: 82, revenue_placeholder: "tracked", value: "med",   support: "med",  reliability: 97, debt_placeholder: "tracked", roadmap: "healthy", competitive: "parity",     investment: "maintain" },
  { line: "EDI Platform",             owner: "PM-EDI",      adoption: 64, revenue_placeholder: "tracked", value: "med",   support: "high", reliability: 93, debt_placeholder: "tracked", roadmap: "healthy", competitive: "parity",     investment: "maintain" },
  { line: "Telematics",               owner: "PM-Telematics", adoption: 74, revenue_placeholder: "tracked", value: "med", support: "med",  reliability: 94, debt_placeholder: "tracked", roadmap: "healthy", competitive: "parity",     investment: "maintain" },
  { line: "Partner Marketplace",      owner: "PM-Partner",  adoption: 56, revenue_placeholder: "tracked", value: "med",   support: "low",  reliability: 95, debt_placeholder: "tracked", roadmap: "healthy", competitive: "emerging",   investment: "expand" },
  { line: "Reporting / Analytics",    owner: "PM-Reports",  adoption: 78, revenue_placeholder: "tracked", value: "med",   support: "low",  reliability: 96, debt_placeholder: "tracked", roadmap: "healthy", competitive: "parity",     investment: "maintain" },
  { line: "Enterprise Governance",    owner: "PM-Gov",      adoption: 48, revenue_placeholder: "tracked", value: "high",  support: "low",  reliability: 96, debt_placeholder: "tracked", roadmap: "healthy", competitive: "differentiated", investment: "expand" },
];

export const V85_PRODUCT_LINE_SCORE = { score: 80, expand: 5, maintain: 7, divest: 0 };

// ---- AI governance stewardship --------------------------------------------
export const V85_AI_GOVERNANCE = {
  score: 82,
  policy_owner: "AI lead",
  approval_rules: 14,
  threshold_high_pct: 78,
  acceptance_rate: 74,
  rejection_rate: 12,
  explainability_pct: 86,
  data_freshness_pct: 92,
  audit_evidence_pct: 84,
  customer_comms_review_pct: 88,
  dispatch_review_pct: 90,
  cost_ceiling_usage_pct: 64,
  safety_incidents_placeholder: 0,
};

export const V85_AI_POLICY_AREAS = [
  { area: "Dispatch recommendation",  owner: "AI",  rule: "Auto if conf ≥ 0.85 else human approval" },
  { area: "Customer communication",   owner: "AI",  rule: "Human approval before send" },
  { area: "Pricing suggestion",       owner: "Finance", rule: "Reviewed weekly" },
  { area: "Marketplace match",        owner: "Marketplace", rule: "Top-K with explainability" },
  { area: "Compliance Q&A",           owner: "CCO", rule: "Cite source + human review" },
];

// ---- Platform reliability stewardship -------------------------------------
export const V85_RELIABILITY = {
  score: 85,
  incidents_30d: 6,
  critical_30d: 1,
  uptime_placeholder: "tracked",
  api_latency_p95_ms: 240,
  realtime_latency_p95_ms: 180,
  gps_reliability_pct: 96,
  route_provider_pct: 95,
  notification_pct: 97,
  webhook_pct: 98,
  edi_pct: 96,
  billing_provider_pct: 97,
  error_budget_placeholder: "tracked",
  postmortems_complete_pct: 84,
};

export const V85_RELIABILITY_INCIDENTS = [
  { id: "INC-901", service: "Webhooks",      severity: "high",   resolved: true,  postmortem: "complete"  },
  { id: "INC-902", service: "Notifications", severity: "medium", resolved: true,  postmortem: "in-progress" },
  { id: "INC-903", service: "Route provider", severity: "medium", resolved: true, postmortem: "complete"  },
  { id: "INC-904", service: "Billing API",   severity: "low",    resolved: true,  postmortem: "complete"  },
  { id: "INC-905", service: "GPS pipeline",  severity: "medium", resolved: true,  postmortem: "in-progress" },
  { id: "INC-906", service: "EDI",           severity: "low",    resolved: true,  postmortem: "complete"  },
];

export const V85_RELIABILITY_ACTIONS = [
  { action: "Close 2 in-progress postmortems",      owner: "SRE",   due: "2026-06-05" },
  { action: "Tabletop incident response drill",     owner: "SRE",   due: "2026-06-15" },
  { action: "Webhook retry budget review",          owner: "SRE",   due: "2026-06-20" },
];

// ---- Reports --------------------------------------------------------------
export const V85_REPORTS = [
  { name: "Global enterprise operating discipline", owner: "COO" },
  { name: "International control maturity",         owner: "CCO" },
  { name: "Country accountability",                 owner: "COO" },
  { name: "Marketplace financial optimization",     owner: "Marketplace + CFO" },
  { name: "Marketplace economics optimization",     owner: "Marketplace" },
  { name: "Financial control testing",              owner: "CFO" },
  { name: "Revenue control maturity",               owner: "CFO" },
  { name: "Board governance",                       owner: "Board chair" },
  { name: "Executive stewardship",                  owner: "CEO" },
  { name: "Platform stewardship",                   owner: "COO" },
  { name: "Global operating cadence",               owner: "COO" },
  { name: "Country performance",                    owner: "COO" },
  { name: "Compliance execution maturity",          owner: "CCO" },
  { name: "International support discipline",       owner: "Support" },
  { name: "Customer success discipline",            owner: "CS" },
  { name: "Partner operating discipline",           owner: "Partner" },
  { name: "Strategic risk ownership",               owner: "Risk" },
  { name: "Product-line stewardship",               owner: "CPO" },
  { name: "AI governance stewardship",              owner: "AI" },
  { name: "Platform reliability stewardship",       owner: "SRE" },
];

// ---- Executive headline ---------------------------------------------------
export const V85_EXEC_HEADLINE = {
  status: "amber" as const,
  headline: "Operating discipline holding at 82 — three executive blockers gating board sign-off.",
  detail:
    "Global enterprise discipline is improving (+3) with marketplace + reliability strong. Three gating items for the board: API overage control fix, CA region storage approval, ON reefer carrier recruitment. No autonomous-dispatch or final-certification claims.",
  signals: [
    { label: "Operating discipline", value: "82", tone: "good" as const },
    { label: "Control maturity",     value: "78", tone: "warn" as const },
    { label: "Board decisions open", value: 5,    tone: "warn" as const },
    { label: "Open exceptions",      value: 9,    tone: "warn" as const },
  ],
  next_decision: { who: "Board", what: "Sign off API overage remediation + CA pilot extension + ON reefer plan", due: "2026-06-24" },
};

// ---- Executive overlays per module ----------------------------------------
export const V85_EXECUTION_OVERLAYS = [
  { area: "Global Enterprise Operating Discipline", role: "CEO",   focus: "Hold discipline > 80 through Canada pilot graduation",    decision: "Sign off action plan at Friday exec review" },
  { area: "International Control Maturity",         role: "CCO",   focus: "9 exceptions open · 2 remediations overdue",              decision: "Close 2 overdue remediations this week" },
  { area: "Country Accountability",                 role: "COO",   focus: "Canada 78 · close 3 blockers · 2 exceptions",             decision: "Approve Canada pilot extension memo" },
  { area: "Global Control Ownership",               role: "CCO",   focus: "10 controls mapped · 5 in review · ownership locked",     decision: "Confirm escalation tier for 2 exec-level" },
  { area: "Marketplace Financial Optimization",     role: "CFO",   focus: "Economics 78 · take rate not modeled · margin placeholder", decision: "Approve fee schedule review for reefer lanes" },
  { area: "Marketplace Economics Optimization",     role: "Marketplace", focus: "Top goal: lift ON liquidity 58→70 in 30d",         decision: "Fund 2 reefer carriers + lane density push" },
  { area: "Financial Control Testing",              role: "CFO",   focus: "11 tests · 6 pass · 3 review · 1 exception",              decision: "Re-test API overage in 7d" },
  { area: "Revenue Control Maturity",               role: "Finance", focus: "Score 73 — placeholder, not GAAP",                      decision: "Confirm board pack framing" },
  { area: "Advanced Board Governance",              role: "Board chair", focus: "10 packet sections drafted · 5 decisions pending",  decision: "Lock packet by 2026-06-17" },
  { area: "Executive Stewardship",                  role: "CEO",   focus: "11 exec priorities · 3 cross-functional blockers",        decision: "Resolve CA storage approval this week" },
  { area: "Long-Term Platform Stewardship",         role: "COO",   focus: "12 domains · score 79 · 5 top risks",                     decision: "Re-baseline after Q close" },
  { area: "Global Operating Cadence",               role: "COO",   focus: "Cadence health 92 · 1 at-risk (partner review)",          decision: "Catch up partner review this week" },
  { area: "Country Performance Review",             role: "COO",   focus: "USA scale · Canada continue · Mexico plan · EU defer",    decision: "Document defer rationale for EU/UK" },
  { area: "Compliance Execution Maturity",          role: "CCO",   focus: "Score 79 · evidence 71% · 2 remediations overdue",        decision: "Close mobile evidence + access review" },
  { area: "International Support Discipline",       role: "Support", focus: "Score 81 · CA bilingual placeholder · 1 critical CA",   decision: "Escalation review + KB updates" },
  { area: "Global Customer Success Discipline",     role: "CS",    focus: "Score 83 · Cross-Pac high renewal risk · 4 expansion",    decision: "Save play on Cross-Pac" },
  { area: "Partner Operating Discipline",           role: "Partner", focus: "Score 78 · 3 live · 1 pilot · 3 issues open",           decision: "Greenlight CA telematics verified" },
  { area: "Strategic Risk Ownership",               role: "Risk",  focus: "8 risks · 5 board-visible · residual trending down",      decision: "Board sign-off on top 4 mitigations" },
  { area: "Product-Line Stewardship",               role: "CPO",   focus: "12 lines · expand: 5 · maintain: 7 · divest: 0",          decision: "Approve expand on CoPilot + MP + Portal + Partner MP + Gov" },
  { area: "AI Governance Stewardship",              role: "AI",    focus: "Score 82 · 14 approval rules · explainability 86%",       decision: "Quarterly threshold tuning review" },
  { area: "Platform Reliability Stewardship",       role: "SRE",   focus: "Score 85 · 1 critical incident 30d · 2 PMs in progress",  decision: "Close 2 postmortems + tabletop drill" },
];

// ---- Phase 30 polish: RLS examples for V8.5 enterprise tables -------------
export const V85_RLS_EXAMPLES = [
  {
    table: "v85_discipline_scores",
    policy: "tenant read; admin / platform-owner write",
    sql: `create policy v85_disc_read on public.v85_discipline_scores
  for select to authenticated
  using (company_id = public.current_company());`,
  },
  {
    table: "v85_control_tests",
    policy: "tenant admin read; writes only via server fn (service role)",
    sql: `create policy v85_tests_read on public.v85_control_tests
  for select to authenticated
  using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'admin')
  );`,
  },
  {
    table: "v85_country_accountability",
    policy: "platform-owner only (cross-tenant aggregate)",
    sql: `create policy v85_country_read on public.v85_country_accountability
  for select to authenticated
  using (public.is_platform_owner(auth.uid()));`,
  },
  {
    table: "v85_board_packet_sections",
    policy: "platform-owner only — board pack is not tenant data",
    sql: `create policy v85_board_all on public.v85_board_packet_sections
  for all to authenticated
  using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));`,
  },
];

// ---- Phase 30 polish: server fn vs server route vs edge function -----------
export const V85_BACKEND_BOUNDARY = [
  { kind: "createServerFn",  name: "getOperatingDiscipline",            caller: "V8.5 UI",        auth: "requireSupabaseAuth" },
  { kind: "createServerFn",  name: "recordControlTest",                 caller: "V8.5 UI",        auth: "requireSupabaseAuth + admin" },
  { kind: "createServerFn",  name: "getCountryAccountability",          caller: "V8.5 UI",        auth: "platform-owner" },
  { kind: "createServerFn",  name: "lockBoardPacket",                   caller: "V8.5 UI",        auth: "platform-owner" },
  { kind: "createServerFn",  name: "getMarketplaceEconomics",           caller: "V8.5 UI",        auth: "requireSupabaseAuth" },
  { kind: "createServerFn",  name: "getAIGovernanceStewardship",        caller: "V8.5 UI",        auth: "requireSupabaseAuth + admin" },
  { kind: "server route",    name: "/api/public/webhooks/stripe-billing-incident", caller: "Stripe",         auth: "HMAC signature" },
  { kind: "server route",    name: "/api/public/webhooks/security-evidence-vendor", caller: "Evidence vendor", auth: "HMAC signature" },
  { kind: "server route",    name: "/api/public/hooks/board-packet-reminder",      caller: "pg_cron",         auth: "apikey header" },
  { kind: "edge function",   name: "(none new in V8.5)",                caller: "—",              auth: "—" },
];

// ---- Phase 30 polish: per-role demo guidance -----------------------------
export const V85_ROLE_GUIDANCE = [
  { role: "CEO",        tone: "violet",  focus: "Hold discipline > 80; resolve CA storage approval; lock board packet by 2026-06-17." },
  { role: "COO",        tone: "sky",     focus: "Canada pilot extension memo; close 3 country blockers; cadence catch-up on partner review." },
  { role: "CFO",        tone: "amber",   focus: "Approve fee schedule review for reefer; re-test API overage in 7d; sign off revenue control framing." },
  { role: "CCO",        tone: "emerald", focus: "Close 2 overdue remediations; lock control ownership; confirm escalation tier for 2 exec-level." },
  { role: "Board chair",tone: "rose",    focus: "Sign off API overage + CA pilot + ON reefer in 2026-06-24 review." },
];
