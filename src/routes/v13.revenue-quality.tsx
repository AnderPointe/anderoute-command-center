import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const ev = H.useRevenueQualityEvidence();
  const avg = Math.round(ev.reduce((a, b) => a + b.score, 0) / ev.length);
  const stale = ev.filter((e) => e.freshness_days > 20).length;
  return (
    <V13Page icon={<Activity className="size-6 text-indigo-300" />} title="Revenue Quality Evidence Center" blurb="Per-category evidence scores, freshness, and owners. Export placeholder.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Categories" value={ev.length} tone="emerald" />
        <ScoreCard label="Avg score" value={avg} tone="sky" />
        <ScoreCard label="Stale (>20d)" value={stale} tone="amber" />
        <ScoreCard label="Owners" value={new Set(ev.map((e) => e.owner)).size} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Evidence categories</h3>
        <SimpleTable rows={ev as any} columns={[
          { key: "category", label: "Category" }, { key: "score", label: "Score" },
          { key: "owner", label: "Owner" }, { key: "freshness_days", label: "Fresh (d)" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/revenue-quality")({
  head: () => ({ meta: [{ title: "Revenue Quality Evidence · Phase 39" }] }),
  component: Page,
});
