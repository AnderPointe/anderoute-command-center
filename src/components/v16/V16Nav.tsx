import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Activity, AlertTriangle, ListChecks, CheckCircle2,
  FileSearch, FileBarChart, Briefcase, Brain, Radar, Megaphone, TrendingUp, Wallet,
  Users, Network, Boxes, Star, Lock, Map, FileText,
} from "lucide-react";

const ITEMS = [
  { to: "/v16/overview",         label: "V16 Overview",         icon: ShieldCheck },
  { to: "/v16/scope",            label: "Scope",                icon: Layers },
  { to: "/v16/command",          label: "Assist Gov Command",   icon: Gauge },
  { to: "/v16/predictive",       label: "Predictive Perf",      icon: Activity },
  { to: "/v16/risk",             label: "Risk Signals",         icon: AlertTriangle },
  { to: "/v16/rec-gov",          label: "Rec Governance",       icon: ListChecks },
  { to: "/v16/hitl",             label: "HITL Approvals",       icon: CheckCircle2 },
  { to: "/v16/explainability",   label: "Explainability",       icon: FileSearch },
  { to: "/v16/evidence",         label: "Evidence",             icon: Lock },
  { to: "/v16/outcomes",         label: "Outcome Learning",     icon: Activity },
  { to: "/v16/capital-board",    label: "Capital-Grade Board",  icon: FileBarChart },
  { to: "/v16/exec-decision",    label: "Exec Decision",        icon: Briefcase },
  { to: "/v16/board-decision",   label: "Board Decision",       icon: Brain },
  { to: "/v16/mp-opt",           label: "MP Optimization",      icon: Radar },
  { to: "/v16/mp-controls",      label: "MP Controls",          icon: Megaphone },
  { to: "/v16/rev-controls",     label: "Revenue Controls",     icon: TrendingUp },
  { to: "/v16/cap-controls",     label: "Capital Controls",     icon: Wallet },
  { to: "/v16/acct-controls",    label: "Account Controls",     icon: Users },
  { to: "/v16/partner-controls", label: "Partner Controls",     icon: Network },
  { to: "/v16/product-controls", label: "Product Controls",     icon: Boxes },
  { to: "/v16/category-controls",label: "Category Controls",    icon: Star },
  { to: "/v16/control-maturity", label: "Control Maturity",     icon: ShieldCheck },
  { to: "/v16/roadmap",          label: "Roadmap",              icon: Map },
  { to: "/v16/reports",          label: "Reports",              icon: FileText },
  { to: "/v16/demo",             label: "Demo Flow",            icon: ListChecks },
];

export function V16Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 45 V16 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-200"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
            }`}>
            <Icon className="size-3.5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
