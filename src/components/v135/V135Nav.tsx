import { Link, useLocation } from "@tanstack/react-router";
import {
  Gauge, Layers, ShieldCheck, Activity, TrendingUp, Megaphone, Network,
  FileBarChart, AlertTriangle, Map, ListChecks, Stamp, Command, CalendarClock,
  Users, BookOpen, Briefcase, Lock, Wallet,
} from "lucide-react";

const ITEMS = [
  { to: "/v135/overview",        label: "V13.5 Overview",         icon: Gauge },
  { to: "/v135/scope",           label: "Scope",                  icon: Layers },
  { to: "/v135/durability",      label: "Durability Center",      icon: Command },
  { to: "/v135/outlook",         label: "8Q Revenue Outlook",     icon: TrendingUp },
  { to: "/v135/board-os",        label: "Board Strategic OS",     icon: CalendarClock },
  { to: "/v135/diligence",       label: "Diligence Continuity",   icon: BookOpen },
  { to: "/v135/mp-optimization", label: "MP Optimization",        icon: Megaphone },
  { to: "/v135/partner",         label: "Partner Durability",     icon: Network },
  { to: "/v135/concentration",   label: "Concentration Dur.",     icon: Users },
  { to: "/v135/strategic-acct",  label: "Strategic Acct Dur.",    icon: Users },
  { to: "/v135/retention",       label: "Retention Durability",   icon: Activity },
  { to: "/v135/api-edi",         label: "API/EDI Durability",     icon: Briefcase },
  { to: "/v135/exec-steward",    label: "Exec Stewardship",       icon: Stamp },
  { to: "/v135/board-steward",   label: "Board Stewardship",      icon: FileBarChart },
  { to: "/v135/evidence-vault",  label: "Evidence Vault",         icon: Lock },
  { to: "/v135/risk",            label: "Risk Durability",        icon: AlertTriangle },
  { to: "/v135/roadmap",         label: "Durability Roadmap",     icon: Map },
  { to: "/v135/capital-watch",   label: "Capital Watch",          icon: Wallet },
  { to: "/v135/reports",         label: "Reports",                icon: ShieldCheck },
  { to: "/v135/demo",            label: "Demo Flow",              icon: ListChecks },
];

export function V135Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 40 V13.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
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
