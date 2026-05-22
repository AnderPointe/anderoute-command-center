import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const r = H.useRenewalExpansionDiscipline();
  const latest = r.rows[r.rows.length - 1];
  return (
    <V115Page icon={<CalendarClock className="size-6 text-emerald-300" />} title="Renewal & Expansion Discipline" blurb="Quarterly renewal funnel with GRR / NRR. Mock-only.">
      <div className="grid gap-3 md:grid-cols-5">
        <ScoreCard label="Renewals due" value={String(latest.renewals_due)} tone="emerald" />
        <ScoreCard label="On track" value={String(latest.on_track)} tone="sky" />
        <ScoreCard label="At risk" value={String(latest.at_risk)} tone="amber" />
        <ScoreCard label="GRR" value={latest.grr_pct} tone="violet" />
        <ScoreCard label="NRR" value={latest.nrr_pct} tone="emerald" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r.rows as any} columns={[
          { key: "quarter",      label: "Quarter" },
          { key: "renewals_due", label: "Due" },
          { key: "on_track",     label: "On track" },
          { key: "at_risk",      label: "At risk" },
          { key: "churned",      label: "Churned" },
          { key: "grr_pct",      label: "GRR", render: (r: any) => `${r.grr_pct}%` },
          { key: "nrr_pct",      label: "NRR", render: (r: any) => `${r.nrr_pct}%` },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Renewal posture</h3>
        <p className="mt-2 text-sm text-muted-foreground">Renewal discipline is framed as a governed expansion motion: on-track coverage, at-risk intervention, GRR protection, and NRR lift are presented together so leadership can trade off protection and growth deliberately.</p>
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/renewal")({
  head: () => ({ meta: [{ title: "Renewal Discipline · V11.5" }] }),
  component: Page,
});
