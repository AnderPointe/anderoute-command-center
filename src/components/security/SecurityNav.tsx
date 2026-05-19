import { Link, useLocation } from "@tanstack/react-router";
import {
  Shield, ShieldCheck, FileCheck2, Wrench, Activity, AlertTriangle, Database,
} from "lucide-react";

/** Phase 8 — Unified sub-navigation across security/compliance/ops surfaces. */
const ITEMS = [
  { to: "/security/overview",   label: "Overview",      icon: Shield },
  { to: "/security/center",     label: "Security Center", icon: ShieldCheck },
  { to: "/compliance/soc2",     label: "SOC 2",         icon: FileCheck2 },
  { to: "/ops/center",          label: "Operations",    icon: Wrench },
  { to: "/ops/observability",   label: "Observability", icon: Activity },
  { to: "/ops/incidents",       label: "Incidents",     icon: AlertTriangle },
  { to: "/ops/database",        label: "Database",      icon: Database },
] as const;

export function SecurityNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Security & operations sections"
      className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin"
    >
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-teal-400/50 bg-teal-500/10 text-teal-200"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
