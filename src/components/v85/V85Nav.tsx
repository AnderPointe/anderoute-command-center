import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, Activity, ShieldCheck, Flag, ListChecks, TrendingUp, Sparkles,
  Receipt, Wallet, FileCheck2, Crown, Star, Calendar, BookCheck, FileBarChart,
  LifeBuoy, Users, Plug, AlertTriangle, Boxes, Bot, ServerCog, ClipboardCheck,
} from "lucide-react";

const ITEMS = [
  { to: "/v85/overview",                 label: "V8.5 Overview",        icon: Gauge },
  { to: "/v85/scope",                    label: "Scope",                icon: Layers },
  { to: "/v85/discipline",               label: "Operating Discipline", icon: Activity },
  { to: "/v85/control-maturity",         label: "Control Maturity",     icon: ShieldCheck },
  { to: "/v85/country-accountability",   label: "Country Accountability", icon: Flag },
  { to: "/v85/control-ownership",        label: "Control Ownership",    icon: ClipboardCheck },
  { to: "/v85/mp-financial",             label: "MP Financial Opt",     icon: TrendingUp },
  { to: "/v85/mp-economics",             label: "MP Economics",         icon: Sparkles },
  { to: "/v85/fin-testing",              label: "Fin Control Tests",    icon: Receipt },
  { to: "/v85/revenue-control",          label: "Revenue Control",      icon: Wallet },
  { to: "/v85/board",                    label: "Board Governance",     icon: FileCheck2 },
  { to: "/v85/stewardship-exec",         label: "Exec Stewardship",     icon: Crown },
  { to: "/v85/stewardship",              label: "Platform Stewardship", icon: Star },
  { to: "/v85/cadence",                  label: "Operating Cadence",    icon: Calendar },
  { to: "/v85/country-performance",      label: "Country Performance",  icon: BookCheck },
  { to: "/v85/compliance",               label: "Compliance Maturity",  icon: FileBarChart },
  { to: "/v85/support",                  label: "Support Discipline",   icon: LifeBuoy },
  { to: "/v85/customer-success",         label: "CS Discipline",        icon: Users },
  { to: "/v85/partner",                  label: "Partner Discipline",   icon: Plug },
  { to: "/v85/risk",                     label: "Strategic Risk",       icon: AlertTriangle },
  { to: "/v85/product-lines",            label: "Product Lines",        icon: Boxes },
  { to: "/v85/ai-governance",            label: "AI Governance",        icon: Bot },
  { to: "/v85/reliability",              label: "Reliability",          icon: ServerCog },
  { to: "/v85/reports",                  label: "V8.5 Reports",         icon: FileBarChart },
  { to: "/v85/demo",                     label: "Demo Flow",            icon: ListChecks },
];

export function V85Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 30 V8.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
