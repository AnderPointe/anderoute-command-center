import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const d = H.useAPIEDIRevenueMaturity();
  return (
    <V13Page icon={<Briefcase className="size-6 text-indigo-300" />} title="API/EDI Revenue Maturity Center" blurb="API and EDI usage, revenue (placeholder), support burden, and expansion plays.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Maturity" value={d.score} tone="emerald" />
        <ScoreCard label="API metrics" value={d.api.length} tone="sky" />
        <ScoreCard label="EDI metrics" value={d.edi.length} tone="violet" />
        <ScoreCard label="Risks" value={d.risks.length} tone="amber" />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">API revenue evidence</h3>
          <SimpleTable rows={d.api as any} columns={[{ key: "metric", label: "Metric" }, { key: "value", label: "Value" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">EDI transaction evidence (placeholder)</h3>
          <SimpleTable rows={d.edi as any} columns={[{ key: "metric", label: "Metric" }, { key: "value", label: "Value" }]} />
        </Card>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Risks</h3>
          <SimpleTable rows={d.risks as any} columns={[{ key: "risk", label: "Risk" }, { key: "severity", label: "Sev." }, { key: "owner", label: "Owner" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Expansion plays</h3>
          <SimpleTable rows={d.expansion as any} columns={[{ key: "play", label: "Play" }, { key: "value_usd", label: "Value $" }, { key: "due", label: "Due" }]} />
        </Card>
      </div>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/api-edi")({
  head: () => ({ meta: [{ title: "API/EDI Maturity · Phase 39" }] }),
  component: Page,
});
