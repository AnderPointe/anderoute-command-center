import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const p = H.usePackagingOptimization();
  return (
    <V115Page icon={<Boxes className="size-6 text-emerald-300" />} title="Packaging Optimization Center" blurb="SKU attach + ARR share with QoQ trend steering. Mock-only.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Premium mix" value={p.summary.premium_mix_pct} tone="emerald" />
        <ScoreCard label="Attach growth" value={p.summary.attach_growth_qoq} tone="sky" />
        <ScoreCard label="SKU rationalization" value={p.summary.sku_rationalization_score} tone="violet" />
        <ScoreCard label="Monetization depth" value={p.summary.monetization_depth_pct} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={p.skus as any} columns={[
          { key: "sku",            label: "SKU" },
          { key: "attach_pct",     label: "Attach", render: (r: any) => `${r.attach_pct}%` },
          { key: "arr_share_pct",  label: "ARR share", render: (r: any) => `${r.arr_share_pct}%` },
          { key: "trend",          label: "QoQ" },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/packaging")({
  head: () => ({ meta: [{ title: "Packaging · V11.5" }] }),
  component: Page,
});
