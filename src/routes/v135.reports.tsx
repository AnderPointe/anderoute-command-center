import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, ScoreCard, StatusPill } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135Reports();
  const real = H.useV135ValueRealization();
  return (
    <V135Page icon={<ShieldCheck className="size-6 text-fuchsia-300" />} title="Enterprise Value Realization Reporting" blurb="Board-grade reports plus enterprise value realization tracking across programs.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Realized %"   value={real.realized_pct} tone="emerald" />
        <ScoreCard label="In flight %"  value={real.in_flight_pct} tone="amber" />
        <ScoreCard label="At risk %"    value={real.at_risk_pct}   tone="rose" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Value realization programs</h3>
        <SimpleTable rows={real.programs as any} columns={[
          { key: "program", label: "Program" }, { key: "target", label: "Target" },
          { key: "realized", label: "Realized" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Report cadence</h3>
        <SimpleTable rows={rows as any} columns={[
          { key: "report", label: "Report" }, { key: "owner", label: "Owner" }, { key: "cadence", label: "Cadence" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/reports")({
  head: () => ({ meta: [{ title: "Reports · V13.5" }] }),
  component: Page,
});
