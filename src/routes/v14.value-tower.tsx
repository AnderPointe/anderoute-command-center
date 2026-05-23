import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill, ExecHeadline } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const t = H.useExecutiveValueCreationControl();
  return (
    <V14Page icon={<Compass className="size-6 text-cyan-300" />} title="Executive Value Creation Control Tower" blurb="Value drivers, top-5 executive actions, board decisions needed.">
      <ScoreCard label="Value tower" value={t.score} tone="violet" />
      <ExecHeadline tag="Brief" headline={t.brief} />
      <Section title="Value drivers">
        <SimpleTable rows={t.drivers as any} columns={[
          { key: "driver", label: "Driver" }, { key: "value", label: "Value" }, { key: "trend", label: "Trend" },
        ]} />
      </Section>
      <Section title="Top executive actions">
        <SimpleTable rows={t.actions as any} columns={[
          { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Decisions needed">
        <SimpleTable rows={t.decisions as any} columns={[
          { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/value-tower")({
  head: () => ({ meta: [{ title: "Value Tower · V14" }] }),
  component: Page,
});
