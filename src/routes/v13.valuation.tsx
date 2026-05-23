import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const d = H.useValuationDriverPlaceholder();
  const avg = Math.round(d.reduce((a, b) => a + b.score, 0) / d.length);
  return (
    <V13Page icon={<ShieldCheck className="size-6 text-indigo-300" />} title="Enterprise Valuation Driver Dashboard (Placeholder)" blurb="Value driver scores only. No valuation is calculated or claimed.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Drivers" value={d.length} tone="emerald" />
        <ScoreCard label="Avg score" value={avg} tone="sky" />
        <ScoreCard label="Strong (≥80)" value={d.filter((x) => x.score >= 80).length} tone="violet" />
        <ScoreCard label="Weak (<70)" value={d.filter((x) => x.score < 70).length} tone="amber" />
      </div>
      <Card className="border-amber-400/20 bg-amber-400/5 p-4">
        <p className="text-xs text-amber-100">Placeholder only. Not a valuation. Not investor guidance.</p>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Value driver scores</h3>
        <SimpleTable rows={d as any} columns={[
          { key: "driver", label: "Driver" }, { key: "score", label: "Score" }, { key: "note", label: "Note" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/valuation")({
  head: () => ({ meta: [{ title: "Valuation Drivers · Phase 39" }] }),
  component: Page,
});
