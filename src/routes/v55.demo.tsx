import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { Card } from "@/components/ui/card";

const STEPS = [
  { actor: "CEO",              action: "Open Market Leadership",          to: "/v55/leadership",      hit: "Leadership 88% · Defensibility 82%" },
  { actor: "CEO",              action: "Open Defensibility",              to: "/v55/defensibility",   hit: "Workflow + enterprise highest" },
  { actor: "COO",              action: "Open Marketplace Economics",      to: "/v55/marketplace-econ",hit: "Take 4.6% · TTA 38m · SE gap" },
  { actor: "VP Partnerships",  action: "Open National Partnerships",      to: "/v55/partnerships",    hit: "2 launch-ready, 1 blocked" },
  { actor: "CRO",              action: "Open Retention & Expansion",      to: "/v55/retention",       hit: "3 expansion-ready, 1 churn risk" },
  { actor: "Security lead",    action: "Open Cert Evidence Maturity",     to: "/v55/evidence",        hit: "91% fresh · 78% export-ready" },
  { actor: "Executive",        action: "Open Board / Investor",           to: "/v55/board",           hit: "ARR, NRR, risks, decisions" },
  { actor: "Strategy lead",    action: "Open Category Narrative",         to: "/v55/narrative",       hit: "Operations command layer POV" },
  { actor: "Executive",        action: "Open Strategic Risks",            to: "/v55/risks",           hit: "8 risks · 2 high" },
];

export const Route = createFileRoute("/v55/demo")({
  head: () => ({ meta: [{ title: "V5.5 Demo Flow · Anderoute" }] }),
  component: () => (
    <V55Page icon={<ListChecks className="size-6 text-amber-300" />} title="V5.5 Demo Flow"
      blurb="End-to-end walkthrough connecting every V5.5 module: executive, ops, partnerships, revenue, security and strategy.">
      <ol className="space-y-2">
        {STEPS.map((s, i) => (
          <li key={i}>
            <Card className="border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between text-sm">
                <div><span className="text-amber-300">{i + 1}. {s.actor}</span> → {s.action}</div>
                <Link to={s.to} className="text-xs text-amber-300 hover:underline">Open →</Link>
              </div>
              <div className="text-[11px] text-muted-foreground">{s.hit}</div>
            </Card>
          </li>
        ))}
      </ol>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
          <h3 className="text-sm font-semibold">RLS policy stance</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>· Platform-owner-only: leadership, defensibility, board, data room.</li>
            <li>· Company-scoped: account plans, retention, monetization (company_id).</li>
            <li>· Security-lead scoped: cert evidence, exceptions.</li>
            <li>· Internal-only: competitive intelligence + strategic risks.</li>
            <li>· Customer/carrier/partner users never see internal leadership tables.</li>
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
          <h3 className="text-sm font-semibold">Server boundary</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>· Internal logic → <strong>TanStack server functions</strong> + <code>requireSupabaseAuth</code>.</li>
            <li>· External webhooks (Stripe, Samsara, App Store, EDI, partner) → signature-verified server routes under <code>/api/public/*</code>.</li>
            <li>· No fully autonomous dispatch — human approval required.</li>
            <li>· No certification/Auto/CarPlay approval claims without tracked evidence.</li>
          </ul>
        </Card>
      </div>
    </V55Page>
  ),
});
