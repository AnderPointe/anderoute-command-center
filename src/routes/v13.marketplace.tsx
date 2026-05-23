import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const mp = H.useMarketplaceEconomicsGovernance();
  return (
    <V13Page icon={<Megaphone className="size-6 text-indigo-300" />} title="Marketplace Economics Governance" blurb="Marketplace revenue, fees, liquidity, and regional economics. Take rate is placeholder.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="MP econ score" value={mp.score} tone="emerald" />
        <ScoreCard label="Metrics" value={mp.metrics.length} tone="sky" />
        <ScoreCard label="Regions" value={mp.regions.length} tone="violet" />
        <ScoreCard label="Risks" value={mp.risks.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Marketplace metrics</h3>
        <SimpleTable rows={mp.metrics as any} columns={[
          { key: "metric", label: "Metric" }, { key: "value", label: "Value" }, { key: "trend", label: "Trend" },
        ]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Regional economics</h3>
          <SimpleTable rows={mp.regions as any} columns={[
            { key: "region", label: "Region" }, { key: "liquidity", label: "Liquidity" }, { key: "margin", label: "Margin" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Risks</h3>
          <SimpleTable rows={mp.risks as any} columns={[
            { key: "risk", label: "Risk" }, { key: "severity", label: "Sev." }, { key: "owner", label: "Owner" },
          ]} />
        </Card>
      </div>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/marketplace")({
  head: () => ({ meta: [{ title: "MP Economics · Phase 39" }] }),
  component: Page,
});
