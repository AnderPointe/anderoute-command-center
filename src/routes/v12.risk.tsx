import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useCommercialRiskControl();
  const high = rows.filter((r) => r.impact === "high").length;
  const highLikely = rows.filter((r) => r.likelihood === "high").length;
  const owned = new Set(rows.map((r) => r.owner)).size;
  return (
    <V12Page icon={<AlertTriangle className="size-6 text-cyan-300" />} title="Commercial Risk Control Center" blurb="16 commercial risk categories, with likelihood, impact, owner, and mitigation. No certainty claims on revenue projections.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Risks tracked"     value={String(rows.length)} tone="sky" />
        <ScoreCard label="High impact"       value={String(high)}        tone="amber" />
        <ScoreCard label="High likelihood"   value={String(highLikely)}  tone="rose" />
        <ScoreCard label="Owners assigned"   value={String(owned)}       tone="emerald" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "risk", label: "Risk" }, { key: "likelihood", label: "Likelihood" },
          { key: "impact", label: "Impact" }, { key: "owner", label: "Owner" }, { key: "mitigation", label: "Mitigation" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/risk")({
  head: () => ({ meta: [{ title: "Commercial Risk · V12" }] }),
  component: Page,
});
