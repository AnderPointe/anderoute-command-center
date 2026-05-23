import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const f = H.useCommercialForecastEvidence();
  return (
    <V13Page icon={<CalendarClock className="size-6 text-indigo-300" />} title="Commercial Forecast Evidence (Placeholder)" blurb="Forecast lines, assumptions, evidence completeness, and risks. Accuracy is not claimed.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Owner" value={f.owner} tone="emerald" />
        <ScoreCard label="Period" value={f.period} tone="sky" />
        <ScoreCard label="Lines" value={f.lines.length} tone="violet" />
        <ScoreCard label="Risks" value={f.risks.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Forecast lines (placeholders)</h3>
        <SimpleTable rows={f.lines as any} columns={[
          { key: "line", label: "Line" }, { key: "value", label: "Value" }, { key: "confidence", label: "Confidence" },
        ]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Assumptions</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm">{f.assumptions.map((a) => <li key={a}>{a}</li>)}</ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Evidence completeness</h3>
          <SimpleTable rows={f.evidence as any} columns={[{ key: "area", label: "Area" }, { key: "completeness", label: "%" }]} />
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Forecast risks</h3>
        <SimpleTable rows={f.risks as any} columns={[{ key: "risk", label: "Risk" }, { key: "severity", label: "Sev." }, { key: "owner", label: "Owner" }]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/forecast")({
  head: () => ({ meta: [{ title: "Forecast Evidence · Phase 39" }] }),
  component: Page,
});
