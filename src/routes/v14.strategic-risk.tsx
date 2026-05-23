import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const r = H.useStrategicRiskControl();
  return (
    <V14Page icon={<AlertTriangle className="size-6 text-cyan-300" />} title="Enterprise Strategic Risk Control Center" blurb="15 risk categories with owner, level, mitigation. Exceptions tracked.">
      <ScoreCard label="Risk control" value={r.score} tone="amber" />
      <Section title="Risk register">
        <SimpleTable rows={r.risks as any} columns={[
          { key: "risk", label: "Risk" },
          { key: "level", label: "Level", render: (x: any) => <StatusPill status={x.level} /> },
          { key: "owner", label: "Owner" }, { key: "mitigation", label: "Mitigation" },
        ]} />
      </Section>
      <Section title="Exception queue">
        <SimpleTable rows={r.exceptions as any} columns={[
          { key: "exception", label: "Exception" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (x: any) => <StatusPill status={x.status} /> },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/strategic-risk")({
  head: () => ({ meta: [{ title: "Strategic Risk · V14" }] }),
  component: Page,
});
