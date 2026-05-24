import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Network, Users, Briefcase, TrendingUp, Megaphone, Brain,
  Lock, FileSearch, ListChecks, CheckCircle2, Radar, AlertTriangle,
  Wallet, Boxes, Siren, FileBarChart, Map, FileText, GitBranch,
} from "lucide-react";

const ITEMS = [
  { to: "/v225/overview",      label: "V22.5 Overview",       icon: ShieldCheck },
  { to: "/v225/scope",         label: "Scope",                icon: Layers },
  { to: "/v225/automation",    label: "Automation Scale",     icon: Network },
  { to: "/v225/board",         label: "Board Assurance",      icon: Brain },
  { to: "/v225/revenue",       label: "Revenue Optimization", icon: TrendingUp },
  { to: "/v225/mp",            label: "MP Governance",        icon: Megaphone },
  { to: "/v225/customer",      label: "Customer Maturity",    icon: Users },
  { to: "/v225/partner",       label: "Partner Maturity",     icon: GitBranch },
  { to: "/v225/exec",          label: "Exec Assurance",       icon: Briefcase },
  { to: "/v225/evidence",      label: "Evidence Scale",       icon: Lock },
  { to: "/v225/cust-boundary", label: "Cust Boundary",        icon: ShieldCheck },
  { to: "/v225/part-boundary", label: "Partner Boundary",     icon: ShieldCheck },
  { to: "/v225/approval",      label: "Approval Scale",       icon: ListChecks },
  { to: "/v225/rec",           label: "Rec Automation",       icon: CheckCircle2 },
  { to: "/v225/outcome",       label: "Outcome Optimization", icon: Radar },
  { to: "/v225/audit",         label: "Audit Scale",          icon: FileSearch },
  { to: "/v225/risk",          label: "Risk Intelligence",    icon: AlertTriangle },
  { to: "/v225/capital",       label: "Capital Readiness",    icon: Wallet },
  { to: "/v225/products",      label: "Product Scale",        icon: Boxes },
  { to: "/v225/category",      label: "Category Maturity",    icon: Megaphone },
  { to: "/v225/exception",     label: "Exception Ops",        icon: Siren },
  { to: "/v225/board-report",  label: "Board Report",         icon: FileBarChart },
  { to: "/v225/roadmap",       label: "Roadmap",              icon: Map },
  { to: "/v225/reports",       label: "Reports",              icon: FileText },
  { to: "/v225/demo",          label: "Demo Flow",            icon: ListChecks },
];

export function V225Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 58 V22.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
