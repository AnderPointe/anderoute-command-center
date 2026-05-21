import { Link, useLocation } from "@tanstack/react-router";
import {
  Rocket, Layers, Brain, AlertTriangle, Cpu, Users, ShieldCheck, Sparkles,
  HeartPulse, BarChart3, FileBarChart, Network, KeyRound, Webhook, Activity,
  Lock, ScrollText, Globe, ListChecks, UserCheck, Flag,
} from "lucide-react";

const ITEMS = [
  { to: "/v2/overview",         label: "V2 Overview",         icon: Rocket },
  { to: "/v2/scope",            label: "Scope",               icon: Layers },
  { to: "/v2/ai-ops",           label: "AI Ops",              icon: Brain },
  { to: "/v2/risk",             label: "Risk",                icon: AlertTriangle },
  { to: "/v2/optimization",     label: "Optimization",        icon: Cpu },
  { to: "/v2/suggested-drivers",label: "Suggested Drivers",   icon: Users },
  { to: "/v2/approvals",        label: "Approvals",           icon: ShieldCheck },
  { to: "/v2/copilot",          label: "CoPilot V2",          icon: Sparkles },
  { to: "/v2/customer-impact",  label: "Customer Impact",     icon: HeartPulse },
  { to: "/v2/executive",        label: "Executive",           icon: BarChart3 },
  { to: "/v2/reports",          label: "Advanced Reports",    icon: FileBarChart },
  { to: "/v2/edi",              label: "EDI Beta",            icon: Network },
  { to: "/v2/edi-transactions", label: "EDI Txns",            icon: Network },
  { to: "/v2/api-marketplace",  label: "API Marketplace",     icon: KeyRound },
  { to: "/v2/api-keys",         label: "API Keys",            icon: KeyRound },
  { to: "/v2/webhooks",         label: "Webhooks V2",         icon: Webhook },
  { to: "/v2/integration-health",label:"Integration Health",  icon: Activity },
  { to: "/v2/enterprise",       label: "Enterprise",          icon: Lock },
  { to: "/v2/permissions",      label: "Permissions",         icon: UserCheck },
  { to: "/v2/audit",            label: "Audit",               icon: ScrollText },
  { to: "/v2/feature-flags",    label: "Feature Flags",       icon: Flag },
  { to: "/v2/portal",           label: "Portal V2",           icon: Globe },
  { to: "/v2/security",         label: "Security",            icon: ShieldCheck },
  { to: "/v2/demo",             label: "Demo Flow",           icon: ListChecks },
] as const;

export function V2Nav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Phase 17 V2 sections"
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
                ? "border-violet-400/50 bg-violet-500/10 text-violet-200"
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
