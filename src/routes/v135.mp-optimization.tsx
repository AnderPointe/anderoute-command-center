import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const mp = H.useV135MpOptimization();
  const ue = H.useV135MpUnitEconomics();
  return (
    <V135Page icon={<Megaphone className="size-6 text-fuchsia-300" />} title="Marketplace Economics Optimization" blurb="Optimization signals + placeholder marketplace unit economics (illustrative).">
      <ScoreCard label="MP optimization score" value={mp.score} tone="violet" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Optimization signals</h3>
        <SimpleTable rows={mp.metrics as any} columns={[
          { key: "metric", label: "Metric" }, { key: "value", label: "Value" }, { key: "trend", label: "Trend" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Marketplace unit economics (placeholder)</h3>
        <p className="mt-1 text-xs text-muted-foreground">{ue.note}</p>
        <SimpleTable rows={ue.rows as any} columns={[
          { key: "metric", label: "Metric" }, { key: "value", label: "Value" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/mp-optimization")({
  head: () => ({ meta: [{ title: "MP Optimization · V13.5" }] }),
  component: Page,
});
