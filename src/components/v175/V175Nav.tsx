import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Brain, FileBarChart, TrendingUp, Megaphone,
  Radar, ListChecks, Briefcase, Activity, Lock, FileSearch, AlertTriangle,
  CheckCircle2, Settings2, Wallet, Users, Network, Boxes, Map, FileText, Sparkles,
} from "lucide-react";

const ITEMS = [
  { to: "/v175/overview",          label: "V17.5 Overview",       icon: ShieldCheck },
  { to: "/v175/scope",             label: "Scope",                icon: Layers },
  { to: "/v175/command",           label: "Gov Auto Scale",       icon: Gauge },
  { to: "/v175/board-exec",        label: "Board Exec Maturity",  icon: Brain },
  { to: "/v175/revenue-opt",       label: "Revenue Auto Opt",     icon: TrendingUp },
  { to: "/v175/mp-gov",            label: "MP Auto Gov",          icon: Megaphone },
  { to: "/v175/strat-intel",       label: "Strat Intel Ops",      icon: Sparkles },
  { to: "/v175/exec-oversight",    label: "Exec Auto Oversight",  icon: Briefcase },
  { to: "/v175/control-maturity",  label: "Control Maturity",     icon: Activity },
  { to: "/v175/board-evidence",    label: "Board Evidence",       icon: Lock },
  { to: "/v175/approval-scale",    label: "Approval Scale",       icon: ListChecks },
  { to: "/v175/evidence-scale",    label: "Evidence Scale",       icon: FileSearch },
  { to: "/v175/outcome-learning",  label: "Outcome Learning",     icon: Radar },
  { to: "/v175/rec-quality",       label: "Rec Quality",          icon: CheckCircle2 },
  { to: "/v175/risk-ops",          label: "Risk Ops Scale",       icon: AlertTriangle },
  { to: "/v175/capital-auto",      label: "Capital Auto",         icon: Wallet },
  { to: "/v175/account-auto",      label: "Account Auto",         icon: Users },
  { to: "/v175/partner-auto",      label: "Partner Auto",         icon: Network },
  { to: "/v175/product-auto",      label: "Product Auto",         icon: Boxes },
  { to: "/v175/category-auto",     label: "Category Auto",        icon: Megaphone },
  { to: "/v175/audit",             label: "Governed Audit",       icon: Settings2 },
  { to: "/v175/board-report",      label: "Board Scale Report",   icon: FileBarChart },
  { to: "/v175/roadmap",           label: "Roadmap",              icon: Map },
  { to: "/v175/reports",           label: "Reports",              icon: FileText },
  { to: "/v175/demo",              label: "Demo Flow",            icon: ListChecks },
];

export function V175Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 48 V17.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
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
