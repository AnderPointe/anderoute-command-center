import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Network, Users, Briefcase, TrendingUp, Megaphone, Brain,
  Lock, FileSearch, Settings2, ListChecks, CheckCircle2, Radar, AlertTriangle,
  Wallet, Boxes, Siren, FileBarChart, Map, FileText, GitBranch,
} from "lucide-react";

const ITEMS = [
  { to: "/v21/overview",     label: "V21 Overview",      icon: ShieldCheck },
  { to: "/v21/scope",        label: "Scope",             icon: Layers },
  { to: "/v21/network",      label: "Trust Network",     icon: Network },
  { to: "/v21/customer",     label: "Customer Scale",    icon: Users },
  { to: "/v21/partner",      label: "Partner Scale",     icon: GitBranch },
  { to: "/v21/board",        label: "Board Execution",   icon: Brain },
  { to: "/v21/revenue",      label: "Revenue Systems",   icon: TrendingUp },
  { to: "/v21/mp",           label: "MP Optimization",   icon: Megaphone },
  { to: "/v21/exec",         label: "Exec Intel",        icon: Briefcase },
  { to: "/v21/evidence",     label: "Evidence Network",  icon: Lock },
  { to: "/v21/boundary",     label: "Trust Boundary",    icon: ShieldCheck },
  { to: "/v21/risk",         label: "Risk Network",      icon: AlertTriangle },
  { to: "/v21/audit",        label: "Audit Network",     icon: FileSearch },
  { to: "/v21/approval",     label: "Approval Net",      icon: ListChecks },
  { to: "/v21/rec",          label: "Rec Network",       icon: CheckCircle2 },
  { to: "/v21/outcome",      label: "Outcome Net",       icon: Radar },
  { to: "/v21/capital",      label: "Capital Intel",     icon: Wallet },
  { to: "/v21/products",     label: "Product Intel",     icon: Boxes },
  { to: "/v21/category",     label: "Category Exec",     icon: Megaphone },
  { to: "/v21/exception",    label: "Exception Net",     icon: Siren },
  { to: "/v21/board-report", label: "Board Report",      icon: FileBarChart },
  { to: "/v21/roadmap",      label: "Roadmap",           icon: Map },
  { to: "/v21/reports",      label: "Reports",           icon: FileText },
  { to: "/v21/demo",         label: "Demo Flow",         icon: ListChecks },
];

export function V21Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 55 V21 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
