import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const p = H.usePartnerValueGovernance();
  const sourced = p.partners.reduce((a, b) => a + b.sourced_usd, 0);
  const infl = p.partners.reduce((a, b) => a + b.influenced_usd, 0);
  return (
    <V13Page icon={<Network className="size-6 text-indigo-300" />} title="Partner Value Governance Center" blurb="Partner value score, sourced/influenced revenue placeholders, enablement maturity, and actions.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Partner value" value={p.score} tone="emerald" />
        <ScoreCard label="Partners" value={p.partners.length} tone="sky" />
        <ScoreCard label="Sourced $" value={`${(sourced/1000).toFixed(0)}k`} tone="violet" />
        <ScoreCard label="Influenced $" value={`${(infl/1_000_000).toFixed(1)}M`} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Partner value matrix</h3>
        <SimpleTable rows={p.partners as any} columns={[
          { key: "partner", label: "Partner" }, { key: "sourced_usd", label: "Sourced $" },
          { key: "influenced_usd", label: "Infl. $" }, { key: "joint_customers", label: "Joint" },
          { key: "integ_health", label: "Integ" }, { key: "enable", label: "Enable" }, { key: "expansion", label: "Expansion" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Attribution trend (last 4Q)</h3>
        <SimpleTable rows={p.attribution as any} columns={[
          { key: "quarter", label: "Quarter" }, { key: "sourced_usd", label: "Sourced $" },
          { key: "influenced_usd", label: "Infl. $" }, { key: "conv_pct", label: "Conv %" },
        ]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Risks</h3>
          <SimpleTable rows={p.risks as any} columns={[{ key: "risk", label: "Risk" }, { key: "severity", label: "Sev." }, { key: "owner", label: "Owner" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Action plan</h3>
          <SimpleTable rows={p.actions as any} columns={[{ key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
        </Card>
      </div>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/partner-value")({
  head: () => ({ meta: [{ title: "Partner Value · Phase 39" }] }),
  component: Page,
});
