import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Activity, Brain, TrendingUp, Megaphone,
  Briefcase, Settings2, ListChecks, CheckCircle2, Radar, Lock, AlertTriangle,
  Wallet, Users, Network, Boxes, FileSearch, FileBarChart, Map, FileText,
} from "lucide-react";

const ITEMS = [
  { to: "/v185/overview",         label: "V18.5 Overview",     icon: ShieldCheck },
  { to: "/v185/scope",            label: "Scope",              icon: Layers },
  { to: "/v185/command",          label: "Assurance Command",  icon: Gauge },
  { to: "/v185/resilience",       label: "Op Resilience",      icon: Activity },
  { to: "/v185/board-assurance",  label: "Board Assurance",    icon: Brain },
  { to: "/v185/revenue-maturity", label: "Revenue Maturity",   icon: TrendingUp },
  { to: "/v185/mp-optimization",  label: "MP Optimization",    icon: Megaphone },
  { to: "/v185/exec-governance",  label: "Exec Governance",    icon: Briefcase },
  { to: "/v185/auto-resilience",  label: "Auto Resilience",    icon: Settings2 },
  { to: "/v185/human-approval",   label: "Human Approval",     icon: ListChecks },
  { to: "/v185/rec-assurance",    label: "Rec Assurance",      icon: CheckCircle2 },
  { to: "/v185/outcome",          label: "Outcome Assurance",  icon: Radar },
  { to: "/v185/evidence",         label: "Evidence",           icon: Lock },
  { to: "/v185/risk",             label: "Risk Assurance",     icon: AlertTriangle },
  { to: "/v185/capital",          label: "Capital",            icon: Wallet },
  { to: "/v185/accounts",         label: "Accounts",           icon: Users },
  { to: "/v185/partners",         label: "Partners",           icon: Network },
  { to: "/v185/products",         label: "Products",           icon: Boxes },
  { to: "/v185/category",         label: "Category",           icon: Megaphone },
  { to: "/v185/audit",            label: "Resilience Audit",   icon: FileSearch },
  { to: "/v185/board-report",     label: "Board Report",       icon: FileBarChart },
  { to: "/v185/roadmap",          label: "Roadmap",            icon: Map },
  { to: "/v185/reports",          label: "Reports",            icon: FileText },
  { to: "/v185/demo",             label: "Demo Flow",          icon: ListChecks },
];

export function V185Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 50 V18.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
