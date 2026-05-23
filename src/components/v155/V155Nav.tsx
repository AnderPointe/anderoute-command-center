import { Link, useLocation } from "@tanstack/react-router";
import {
  Brain, Layers, Gauge, Wallet, TrendingUp, Lightbulb, Megaphone, Radar,
  ShieldCheck, CheckCircle2, FileSearch, Activity, Briefcase, FileBarChart,
  AlertTriangle, Users, Network, Boxes, Star, Lock, Stamp, Map, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v155/overview",          label: "V15.5 Overview",        icon: Brain },
  { to: "/v155/scope",             label: "Scope",                 icon: Layers },
  { to: "/v155/command",           label: "Maturity Center",       icon: Gauge },
  { to: "/v155/capital-intel",     label: "Capital Intel",         icon: Wallet },
  { to: "/v155/revenue-opt",       label: "Revenue Optimization",  icon: TrendingUp },
  { to: "/v155/rev-rec-engine",    label: "Revenue Rec Engine",    icon: Lightbulb },
  { to: "/v155/mp-intel",          label: "MP Intel",              icon: Radar },
  { to: "/v155/mp-rec-engine",     label: "MP Rec Engine",         icon: Megaphone },
  { to: "/v155/autonomy-gov",      label: "Autonomy Governance",   icon: ShieldCheck },
  { to: "/v155/approvals",         label: "Approvals",             icon: CheckCircle2 },
  { to: "/v155/explainability",    label: "Explainability",        icon: FileSearch },
  { to: "/v155/outcomes",          label: "Outcome Tracking",      icon: Activity },
  { to: "/v155/intel",             label: "Strategic Intel",       icon: Brain },
  { to: "/v155/exec-intel",        label: "Exec Intel",            icon: Briefcase },
  { to: "/v155/board-intel",       label: "Board Intel",           icon: FileBarChart },
  { to: "/v155/risk-intel",        label: "Risk Intel",            icon: AlertTriangle },
  { to: "/v155/accounts-intel",    label: "Accounts Intel",        icon: Users },
  { to: "/v155/partners-intel",    label: "Partners Intel",        icon: Network },
  { to: "/v155/product-intel",     label: "Product Intel",         icon: Boxes },
  { to: "/v155/category-intel",    label: "Category Intel",        icon: Star },
  { to: "/v155/cap-evidence-intel",label: "Cap Evidence",          icon: Lock },
  { to: "/v155/diligence-intel",   label: "Diligence Intel",       icon: Stamp },
  { to: "/v155/controls",          label: "Intel Controls",        icon: ShieldCheck },
  { to: "/v155/roadmap",           label: "Roadmap",               icon: Map },
  { to: "/v155/demo",              label: "Demo Flow",             icon: ListChecks },
];

export function V155Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 44 V15.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-fuchsia-400/50 bg-fuchsia-500/10 text-fuchsia-200"
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
