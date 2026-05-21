import { Link, useLocation } from "@tanstack/react-router";
import {
  Crown, Layers, Shield, Trophy, DollarSign, Store, Handshake, Network,
  Briefcase, CalendarClock, FileBarChart, Boxes, Users, BookOpen, Swords,
  FileCheck2, Lock, AlertTriangle, Map, FolderArchive, Activity, ListChecks, Gauge,
} from "lucide-react";

const ITEMS = [
  { to: "/v55/overview",        label: "V5.5 Overview",         icon: Gauge },
  { to: "/v55/scope",           label: "Scope",                 icon: Layers },
  { to: "/v55/leadership",      label: "Market Leadership",     icon: Crown },
  { to: "/v55/defensibility",   label: "Defensibility",         icon: Shield },
  { to: "/v55/moats",           label: "Strategic Moats",       icon: Trophy },
  { to: "/v55/monetization",    label: "Monetization",          icon: DollarSign },
  { to: "/v55/marketplace-econ",label: "Marketplace Econ",      icon: Store },
  { to: "/v55/partnerships",    label: "Partnerships",          icon: Handshake },
  { to: "/v55/partner-ecosystem", label: "Partner Ecosystem",   icon: Network },
  { to: "/v55/operating-model", label: "Operating Model",       icon: Briefcase },
  { to: "/v55/cadence",         label: "Exec Cadence",          icon: CalendarClock },
  { to: "/v55/board",           label: "Board / Investor",      icon: FileBarChart },
  { to: "/v55/product-lines",   label: "Product Lines",         icon: Boxes },
  { to: "/v55/retention",       label: "Retention & Expansion", icon: Users },
  { to: "/v55/accounts",        label: "Account Plans",         icon: Users },
  { to: "/v55/narrative",       label: "Category Narrative",    icon: BookOpen },
  { to: "/v55/competitive",     label: "Competitive",           icon: Swords },
  { to: "/v55/evidence",        label: "Cert Evidence",         icon: FileCheck2 },
  { to: "/v55/security-exec",   label: "Security/Compl.",       icon: Lock },
  { to: "/v55/risks",           label: "Strategic Risks",       icon: AlertTriangle },
  { to: "/v55/roadmap",         label: "Roadmap Gov",           icon: Map },
  { to: "/v55/data-room",       label: "Data Room",             icon: FolderArchive },
  { to: "/v55/reliability",     label: "Reliability",           icon: Activity },
  { to: "/v55/reports",         label: "V5.5 Reports",          icon: FileBarChart },
  { to: "/v55/demo",            label: "Demo Flow",             icon: ListChecks },
];

export function V55Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 24 V5.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-amber-400/50 bg-amber-500/10 text-amber-200"
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
