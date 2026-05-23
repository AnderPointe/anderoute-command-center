import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const b = H.useBoardStrategicExecution();
  return (
    <V14Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="Board-Level Strategic Execution Center" blurb="Board agenda, decision queue, strategic risk review.">
      <ScoreCard label="Board execution" value={b.score} tone="sky" />
      <Section title="Agenda">
        <SimpleTable rows={b.agenda as any} columns={[
          { key: "item", label: "Item" }, { key: "owner", label: "Owner" },
          { key: "decision_needed", label: "Decision?", render: (r: any) => <StatusPill status={r.decision_needed ? "pending" : "tracking"} /> },
        ]} />
      </Section>
      <Section title="Decision queue">
        <SimpleTable rows={b.decision_queue as any} columns={[
          { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Risk review">
        <SimpleTable rows={b.risk_review as any} columns={[
          { key: "risk", label: "Risk" },
          { key: "level", label: "Level", render: (r: any) => <StatusPill status={r.level} /> },
          { key: "trend", label: "Trend" },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/board-exec")({
  head: () => ({ meta: [{ title: "Board Execution · V14" }] }),
  component: Page,
});
