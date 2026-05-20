import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, FlaskConical, Bug, Ban, ShieldCheck, Users, ListChecks,
  GraduationCap, LifeBuoy, CalendarRange, Stethoscope, Truck, Gauge,
  MessageSquare, CalendarDays, CalendarCheck, ClipboardList, AlertTriangle,
  Undo2, BookOpen, Wrench, PackageCheck, Server, Lock, CheckCircle2,
} from "lucide-react";

/** Phase 13 — Pilot Readiness sub-navigation. */
const ITEMS = [
  { to: "/pilot/phase13-overview",   label: "Overview",          icon: Rocket },
  { to: "/pilot/tests",              label: "Tests",             icon: FlaskConical },
  { to: "/pilot/bugs",               label: "Bugs",              icon: Bug },
  { to: "/pilot/blockers",           label: "Blockers",          icon: Ban },
  { to: "/pilot/rls",                label: "RLS / Security",    icon: ShieldCheck },
  { to: "/pilot/company-setup",      label: "Company Setup",     icon: Users },
  { to: "/pilot/data-checklist",     label: "Data Checklist",    icon: ListChecks },
  { to: "/pilot/training",           label: "Training",          icon: GraduationCap },
  { to: "/pilot/support",            label: "Support",           icon: LifeBuoy },
  { to: "/pilot/go-live",            label: "Go-Live Plan",      icon: CalendarRange },
  { to: "/pilot/smoke-test",         label: "Smoke Test",        icon: Stethoscope },
  { to: "/pilot/first-live-load",    label: "First Live Load",   icon: Truck },
  { to: "/pilot/metrics",            label: "Metrics",           icon: Gauge },
  { to: "/pilot/feedback",           label: "Feedback",          icon: MessageSquare },
  { to: "/pilot/daily-review",       label: "Daily Review",      icon: CalendarDays },
  { to: "/pilot/weekly-review",      label: "Weekly Review",     icon: CalendarCheck },
  { to: "/pilot/surveys",            label: "Surveys",           icon: ClipboardList },
  { to: "/pilot/escalation",         label: "Escalation",        icon: AlertTriangle },
  { to: "/pilot/rollback",           label: "Rollback",          icon: Undo2 },
  { to: "/pilot/docs",               label: "Docs",              icon: BookOpen },
  { to: "/pilot/bug-fix-sprint",     label: "Bug Fix Sprint",    icon: Wrench },
  { to: "/pilot/release-candidate",  label: "Release Candidate", icon: PackageCheck },
  { to: "/pilot/environment",        label: "Environment",       icon: Server },
  { to: "/pilot/data-protection",    label: "Data Protection",   icon: Lock },
  { to: "/pilot/acceptance",         label: "Acceptance",        icon: CheckCircle2 },
] as const;

export function PilotNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Phase 13 pilot readiness sections"
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
