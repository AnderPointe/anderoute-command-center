import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, Layers, Command, Plug, Handshake, Store, Network, MapPinned,
  Gauge, Factory, Users2, ShieldCheck, Smartphone, Car, Apple,
  Headphones, Scale, Activity, DollarSign, Coins, Bot, FileBarChart, ListChecks,
} from "lucide-react";

const ITEMS = [
  { to: "/v4/overview",               label: "V4 Overview",          icon: Rocket },
  { to: "/v4/scope",                  label: "Scope",                icon: Layers },
  { to: "/v4/launch",                 label: "Launch Center",        icon: Command },
  { to: "/v4/integrations",           label: "Strategic Integrations", icon: Plug },
  { to: "/v4/partners",               label: "Partner Launches",     icon: Handshake },
  { to: "/v4/marketplace",            label: "Marketplace Scale",    icon: Store },
  { to: "/v4/network",                label: "National Network",     icon: Network },
  { to: "/v4/multi-region",           label: "Multi-Region",         icon: MapPinned },
  { to: "/v4/fleet-performance",      label: "Large Fleet Perf",     icon: Gauge },
  { to: "/v4/onboarding",             label: "Onboarding Factory",   icon: Factory },
  { to: "/v4/lifecycle",              label: "Customer Lifecycle",   icon: Users2 },
  { to: "/v4/compliance",             label: "Compliance Ops",       icon: ShieldCheck },
  { to: "/v4/mobile-cert",            label: "Mobile Cert",          icon: Smartphone },
  { to: "/v4/android-auto",           label: "Android Auto",         icon: Car },
  { to: "/v4/carplay",                label: "CarPlay",              icon: Apple },
  { to: "/v4/support",                label: "Enterprise Support",   icon: Headphones },
  { to: "/v4/governance",             label: "Governance",           icon: Scale },
  { to: "/v4/national-ops",           label: "National Ops Intel",   icon: Activity },
  { to: "/v4/enterprise-revenue",     label: "Enterprise Revenue",   icon: DollarSign },
  { to: "/v4/partner-revenue",        label: "Partner Revenue",      icon: Coins },
  { to: "/v4/ai-governance",          label: "AI Governance V4",     icon: Bot },
  { to: "/v4/reports",                label: "V4 Reports",           icon: FileBarChart },
  { to: "/v4/demo",                   label: "Demo Flow",            icon: ListChecks },
];

export function V4Nav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Phase 21 V4 sections" className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-sky-400/50 bg-sky-500/10 text-sky-200"
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
