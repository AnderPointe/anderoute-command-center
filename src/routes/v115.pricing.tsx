import { createFileRoute } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const p = H.usePricingOptimization();
  return (
    <V115Page icon={<Tag className="size-6 text-emerald-300" />} title="Pricing Optimization Governance" blurb="Discount caps, multi-year uplift floors, and take-rate floors with 30d breach tracking.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Governed deals" value={p.summary.governed_deals_pct} tone="emerald" />
        <ScoreCard label="Exception rate" value={p.summary.exception_rate_pct} tone="amber" />
        <ScoreCard label="Breach recovery" value={p.summary.breach_recovery_pct} tone="sky" />
        <ScoreCard label="Avg approved disc." value={`${p.summary.avg_approved_discount_pct}%`} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={p.policies as any} columns={[
          { key: "policy",     label: "Policy" },
          { key: "limit_pct",  label: "Limit", render: (r: any) => `${r.limit_pct}%` },
          { key: "breach_30d", label: "Breaches 30d" },
          { key: "owner",      label: "Owner" },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/pricing")({
  head: () => ({ meta: [{ title: "Pricing Optimization · V11.5" }] }),
  component: Page,
});
