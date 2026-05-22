import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useCommercialOperatingModel();
  const avg = Math.round(rows.reduce((s, r) => s + r.maturity, 0) / rows.length);
  const top = rows.filter((r) => r.maturity >= 85).length;
  const lag = rows.filter((r) => r.maturity < 70).length;
  return (
    <V12Page icon={<Map className="size-6 text-cyan-300" />} title="Long-Term Commercial Operating Model" blurb="12 commercial functions with owner, maturity, and core KPI. Anchors the durable operating model across V12 and forward.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Functions"      value={String(rows.length)} tone="sky" />
        <ScoreCard label="Avg maturity"   value={`${avg}%`}           tone="emerald" />
        <ScoreCard label="Top performers" value={String(top)}         tone="violet" />
        <ScoreCard label="Below 70%"      value={String(lag)}         tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "fn", label: "Function" }, { key: "owner", label: "Owner" },
          { key: "maturity", label: "Maturity", render: (r: any) => `${r.maturity}%` },
          { key: "kpi", label: "KPI" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/operating-model")({
  head: () => ({ meta: [{ title: "Operating Model · V12" }] }),
  component: Page,
});
