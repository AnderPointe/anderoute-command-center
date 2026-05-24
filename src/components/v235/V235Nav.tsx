import { Link, useLocation } from "@tanstack/react-router";
import {
  ShieldCheck, Layers, Gauge, Users, Briefcase, TrendingUp, Megaphone, Brain,
  Lock, FileSearch, ListChecks, CheckCircle2, Radar, AlertTriangle,
  Wallet, Boxes, Siren, FileBarChart, Map, FileText, GitBranch,
} from "lucide-react";

const ITEMS = [
  { to: "/v235/overview",      label: "V23.5 Overview",        icon: ShieldCheck },
  { to: "/v235/scope",         label: "Scope",                 icon: Layers },
  { to: "/v235/maturity",      label: "Maturity Command",      icon: Gauge },
  { to: "/v235/customer",      label: "Customer Optim",        icon: Users },
  { to: "/v235/partner",       label: "Partner Optim",         icon: GitBranch },
  { to: "/v235/board",         label: "Board Maturity",        icon: Brain },
  { to: "/v235/revenue",       label: "Revenue Optim",         icon: TrendingUp },
  { to: "/v235/mp",            label: "MP Scale",              icon: Megaphone },
  { to: "/v235/exec",          label: "Exec Maturity",         icon: Briefcase },
  { to: "/v235/evidence",      label: "Evidence Maturity",     icon: Lock },
  { to: "/v235/cust-boundary", label: "Cust Boundary",         icon: ShieldCheck },
  { to: "/v235/part-boundary", label: "Partner Boundary",      icon: ShieldCheck },
  { to: "/v235/approval",      label: "Approval Maturity",     icon: ListChecks },
  { to: "/v235/rec",           label: "Rec Maturity",          icon: CheckCircle2 },
  { to: "/v235/outcome",       label: "Outcome Optim",         icon: Radar },
  { to: "/v235/audit",         label: "Audit Maturity",        icon: FileSearch },
  { to: "/v235/risk",          label: "Risk Maturity",         icon: AlertTriangle },
  { to: "/v235/capital",       label: "Capital Maturity",      icon: Wallet },
  { to: "/v235/products",      label: "Product Maturity",      icon: Boxes },
  { to: "/v235/category",      label: "Category Maturity",     icon: Megaphone },
  { to: "/v235/exception",     label: "Exception Optim",       icon: Siren },
  { to: "/v235/board-report",  label: "Board Report",          icon: FileBarChart },
  { to: "/v235/roadmap",       label: "Roadmap",               icon: Map },
  { to: "/v235/reports",       label: "Reports",               icon: FileText },
  { to: "/v235/demo",          label: "Demo Flow",             icon: ListChecks },
];

export function V235Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 60 V23.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
