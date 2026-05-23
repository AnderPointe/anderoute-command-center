import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Activity, Brain, TrendingUp, Megaphone,
  Briefcase, Settings2, ListChecks, CheckCircle2, Radar, Lock, AlertTriangle,
  Wallet, Users, Network, Boxes, FileSearch, FileBarChart, Map, FileText, Siren,
} from "lucide-react";

const ITEMS = [
  { to: "/v195/overview",   label: "V19.5 Overview",   icon: ShieldCheck },
  { to: "/v195/scope",      label: "Scope",            icon: Layers },
  { to: "/v195/maturity",   label: "Maturity Cmd",     icon: Gauge },
  { to: "/v195/resilience", label: "Resilience Opt",   icon: Activity },
  { to: "/v195/board",      label: "Board Intel",      icon: Brain },
  { to: "/v195/revenue",    label: "Revenue Opt",      icon: TrendingUp },
  { to: "/v195/mp",         label: "MP Governance",    icon: Megaphone },
  { to: "/v195/exec",       label: "Exec Intel",       icon: Briefcase },
  { to: "/v195/control",    label: "Control Opt",      icon: Settings2 },
  { to: "/v195/evidence",   label: "Evidence Intel",   icon: Lock },
  { to: "/v195/audit",      label: "Audit Opt",        icon: FileSearch },
  { to: "/v195/approval",   label: "Approval Opt",     icon: ListChecks },
  { to: "/v195/rec",        label: "Rec Opt",          icon: CheckCircle2 },
  { to: "/v195/outcome",    label: "Outcome Opt",      icon: Radar },
  { to: "/v195/risk",       label: "Risk Opt",         icon: AlertTriangle },
  { to: "/v195/capital",    label: "Capital Intel",    icon: Wallet },
  { to: "/v195/accounts",   label: "Accounts Intel",   icon: Users },
  { to: "/v195/partners",   label: "Partners Intel",   icon: Network },
  { to: "/v195/products",   label: "Products Intel",   icon: Boxes },
  { to: "/v195/category",   label: "Category Intel",   icon: Megaphone },
  { to: "/v195/exception",  label: "Exception Mat",    icon: Siren },
  { to: "/v195/board-report",label: "Board Report",    icon: FileBarChart },
  { to: "/v195/roadmap",    label: "Roadmap",          icon: Map },
  { to: "/v195/reports",    label: "Reports",          icon: FileText },
  { to: "/v195/demo",       label: "Demo Flow",        icon: ListChecks },
];

export function V195Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 52 V19.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-violet-400/50 bg-violet-500/10 text-violet-200"
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
