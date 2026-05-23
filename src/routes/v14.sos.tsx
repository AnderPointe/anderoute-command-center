import { createFileRoute } from "@tanstack/react-router";
import { Command } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, KpiGrid } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const sos = H.useEnterpriseStrategicOperatingSystem();
  return (
    <V14Page icon={<Command className="size-6 text-cyan-300" />} title="Enterprise Strategic Operating System" blurb="14 dimensions scored. Gap panel + top-5 executive actions.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Strategic operating score" value={sos.score} tone="violet" />
        <ScoreCard label="QoQ" value={`+${sos.trend_qoq}`} tone="emerald" />
        <ScoreCard label="Open gaps" value={sos.gaps.length} tone="amber" />
      </div>
      <KpiGrid cols={4} items={sos.dims.slice(0, 8).map((d) => ({ label: d.dim, value: `${d.pct}%` }))} />
      <Section title="All dimensions">
        <SimpleTable rows={sos.dims as any} columns={[
          { key: "dim", label: "Dimension" }, { key: "pct", label: "%" },
        ]} />
      </Section>
      <Section title="Active gaps">
        <ul className="list-disc space-y-1 pl-5 text-xs text-amber-200/90">{sos.gaps.map((g) => <li key={g}>{g}</li>)}</ul>
      </Section>
      <Section title="Executive action plan">
        <ol className="list-decimal space-y-1 pl-5 text-xs">{sos.exec_actions.map((a) => <li key={a}>{a}</li>)}</ol>
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/sos")({
  head: () => ({ meta: [{ title: "Strategic OS · V14" }] }),
  component: Page,
});
