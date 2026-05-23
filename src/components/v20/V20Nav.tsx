import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Activity, Brain, TrendingUp, Megaphone,
  Briefcase, Settings2, ListChecks, CheckCircle2, Radar, Lock, AlertTriangle,
  Wallet, Users, Network, Boxes, FileSearch, FileBarChart, Map, FileText, Siren,
} from "lucide-react";

const ITEMS = [
  { to: "/v20/overview",     label: "V20 Overview",     icon: ShieldCheck },
  { to: "/v20/scope",        label: "Scope",            icon: Layers },
  { to: "/v20/trust-os",     label: "Trust OS",         icon: Gauge },
  { to: "/v20/assist",       label: "Assist Assurance", icon: Activity },
  { to: "/v20/board-intel",  label: "Board Intel",      icon: Brain },
  { to: "/v20/revenue",      label: "Revenue Systems",  icon: TrendingUp },
  { to: "/v20/mp",           label: "MP Scale",         icon: Megaphone },
  { to: "/v20/exec",         label: "Exec Trust",       icon: Briefcase },
  { to: "/v20/customer",     label: "Customer Trust",   icon: Users },
  { to: "/v20/partner",      label: "Partner Trust",    icon: Network },
  { to: "/v20/evidence",     label: "Evidence Gov",     icon: Lock },
  { to: "/v20/controls",     label: "Op Controls",      icon: Settings2 },
  { to: "/v20/risk",         label: "Risk Gov",         icon: AlertTriangle },
  { to: "/v20/audit",        label: "Audit Ready",      icon: FileSearch },
  { to: "/v20/approval",     label: "Approval Trust",   icon: ListChecks },
  { to: "/v20/rec",          label: "Rec Trust",        icon: CheckCircle2 },
  { to: "/v20/outcome",      label: "Outcome Trust",    icon: Radar },
  { to: "/v20/predictive",   label: "Predictive Risk",  icon: AlertTriangle },
  { to: "/v20/capital",      label: "Capital Trust",    icon: Wallet },
  { to: "/v20/products",     label: "Product Trust",    icon: Boxes },
  { to: "/v20/category",     label: "Category Trust",   icon: Megaphone },
  { to: "/v20/exception",    label: "Trust Exception",  icon: Siren },
  { to: "/v20/board-report", label: "Board Report",     icon: FileBarChart },
  { to: "/v20/roadmap",      label: "Roadmap",          icon: Map },
  { to: "/v20/reports",      label: "Reports",          icon: FileText },
  { to: "/v20/demo",         label: "Demo Flow",        icon: ListChecks },
];

export function V20Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 53 V20 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
