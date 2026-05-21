import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, Layers, Network, Users2, Map as MapIcon, KeyRound, BarChart3,
  Cpu, GitBranch, Sparkles, MessageSquare, Palette, Globe2, Gauge,
  MapPinned, Building2, ShieldCheck, Archive, Activity, ScrollText,
  Eye, ListChecks, FileBarChart, ServerCog,
} from "lucide-react";

const ITEMS = [
  { to: "/v25/overview",               label: "V2.5 Overview",         icon: Rocket },
  { to: "/v25/scope",                  label: "Scope",                 icon: Layers },
  { to: "/v25/edi",                    label: "Production EDI",        icon: Network },
  { to: "/v25/edi-partners",           label: "EDI Partners",          icon: Users2 },
  { to: "/v25/edi-mappings",           label: "EDI Mappings",          icon: GitBranch },
  { to: "/v25/edi-monitor",            label: "EDI Monitor",           icon: Activity },
  { to: "/v25/api-monetization",       label: "API Monetization",      icon: KeyRound },
  { to: "/v25/api-products",           label: "API Products",          icon: KeyRound },
  { to: "/v25/api-gateway",            label: "API Gateway",           icon: ServerCog },
  { to: "/v25/optimization",           label: "Advanced Optimization", icon: Cpu },
  { to: "/v25/scenarios",              label: "Scenarios",             icon: GitBranch },
  { to: "/v25/copilot",                label: "CoPilot V2.5",          icon: Sparkles },
  { to: "/v25/communication",          label: "Customer Comm",         icon: MessageSquare },
  { to: "/v25/white-label",            label: "White-label",           icon: Palette },
  { to: "/v25/custom-domain",          label: "Custom Domain",         icon: Globe2 },
  { to: "/v25/fleet-scaling",          label: "Fleet Scaling",         icon: Gauge },
  { to: "/v25/map-clustering",         label: "Map Clustering",        icon: MapIcon },
  { to: "/v25/locations",              label: "Locations",             icon: MapPinned },
  { to: "/v25/security",               label: "Security V2.5",         icon: ShieldCheck },
  { to: "/v25/retention",              label: "Retention",             icon: Archive },
  { to: "/v25/integration-reliability",label: "Reliability",           icon: Activity },
  { to: "/v25/audit",                  label: "Audit + Export",        icon: ScrollText },
  { to: "/v25/portal-insights",        label: "Portal Insights",       icon: Eye },
  { to: "/v25/onboarding",             label: "Onboarding",            icon: Building2 },
  { to: "/v25/reports",                label: "Enterprise Reports",    icon: FileBarChart },
  { to: "/v25/demo",                   label: "Demo Flow",             icon: ListChecks },
  { to: "/v25/overview",               label: "Stats",                 icon: BarChart3, hidden: true },
] as const;

export function V25Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 18 V2.5 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.filter((i) => !("hidden" in i && i.hidden)).map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to + label}
            to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
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
