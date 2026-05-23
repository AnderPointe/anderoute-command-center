import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const r = H.useRetentionExpansionValue();
  const total = r.pipeline.reduce((a, b) => a + b.value_usd, 0);
  return (
    <V13Page icon={<TrendingUp className="size-6 text-indigo-300" />} title="Retention &amp; Expansion Value Center" blurb="Retention, renewal, churn, and expansion pipeline with evidence completeness.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Retention" value={r.retention_score} tone="emerald" />
        <ScoreCard label="Expansion" value={r.expansion_score} tone="sky" />
        <ScoreCard label="Renewal ready" value={r.renewal_readiness} tone="violet" />
        <ScoreCard label="Churn risk %" value={r.churn_risk} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Expansion value pipeline (${(total/1_000_000).toFixed(1)}M)</h3>
        <SimpleTable rows={r.pipeline as any} columns={[
          { key: "account", label: "Account" }, { key: "motion", label: "Motion" },
          { key: "value_usd", label: "Value $" }, { key: "stage", label: "Stage" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Card>
      <p className="text-xs text-muted-foreground">Evidence completeness: {r.evidence_completeness}%</p>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/retention")({
  head: () => ({ meta: [{ title: "Retention & Expansion · Phase 39" }] }),
  component: Page,
});
