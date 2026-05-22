import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, TrendingUp, Activity, Users, ClipboardList, Tag, Boxes,
  ShieldCheck, Wrench, BookOpen, Network, Wallet, FileBarChart, AlertTriangle,
  Map, CalendarClock, ListChecks, Briefcase, Megaphone,
} from "lucide-react";

const ITEMS = [
  { to: "/v115/overview",       label: "V11.5 Overview",         icon: Gauge },
  { to: "/v115/scope",          label: "Scope",                  icon: Layers },
  { to: "/v115/optimization",   label: "Revenue Optimization",   icon: TrendingUp },
  { to: "/v115/operating",      label: "Operating Maturity",     icon: Activity },
  { to: "/v115/expansion",      label: "Strategic Expansion",    icon: Users },
  { to: "/v115/retention",      label: "Retention Risk",         icon: AlertTriangle },
  { to: "/v115/renewal",        label: "Renewal Discipline",     icon: CalendarClock },
  { to: "/v115/pricing",        label: "Pricing Optimization",   icon: Tag },
  { to: "/v115/packaging",      label: "Packaging",              icon: Boxes },
  { to: "/v115/deal-desk",      label: "Deal Desk",              icon: ClipboardList },
  { to: "/v115/procurement",    label: "Procurement Accel.",     icon: ShieldCheck },
  { to: "/v115/sales-eng",      label: "Sales Engineering",      icon: Wrench },
  { to: "/v115/proof",          label: "Proof Influence",        icon: BookOpen },
  { to: "/v115/marketplace",    label: "MP Monetization",        icon: Megaphone },
  { to: "/v115/api-edi",        label: "API/EDI Monetization",   icon: Briefcase },
  { to: "/v115/partner",        label: "Partner Monetization",   icon: Network },
  { to: "/v115/capital",        label: "Capital-Ready Rev Gov.", icon: Wallet },
  { to: "/v115/board",          label: "Board Commercial",       icon: FileBarChart },
  { to: "/v115/roadmap",        label: "Revenue Roadmap",        icon: Map },
  { to: "/v115/reports",        label: "Reports",                icon: FileBarChart },
  { to: "/v115/demo",           label: "Demo Flow",              icon: ListChecks },
];

export function V115Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 36 V11.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
