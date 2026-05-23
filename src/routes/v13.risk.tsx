import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const r = H.useStrategicCapitalRisk();
  const high = r.filter((x) => x.severity === "high").length;
  const med = r.filter((x) => x.severity === "med").length;
  return (
    <V13Page icon={<AlertTriangle className="size-6 text-indigo-300" />} title="Strategic Capital Risk Register" blurb="14 capital-risk categories with severity, trend, and owner.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Risks" value={r.length} tone="emerald" />
        <ScoreCard label="High" value={high} tone="amber" />
        <ScoreCard label="Medium" value={med} tone="sky" />
        <ScoreCard label="Owners" value={new Set(r.map((x) => x.owner)).size} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Capital risk heatmap</h3>
        <SimpleTable rows={r as any} columns={[
          { key: "risk", label: "Risk" }, { key: "severity", label: "Sev." }, { key: "trend", label: "Trend" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/risk")({
  head: () => ({ meta: [{ title: "Capital Risk · Phase 39" }] }),
  component: Page,
});
