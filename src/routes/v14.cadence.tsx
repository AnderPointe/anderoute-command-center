import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const c = H.useStrategicOperatingCadence();
  return (
    <V14Page icon={<CalendarClock className="size-6 text-cyan-300" />} title="Strategic Operating Cadence System" blurb="Weekly, monthly, quarterly, annual cadences with completion.">
      <ScoreCard label="Cadence health" value={c.score} tone="sky" />
      <Section title="Cadences">
        <SimpleTable rows={c.cadences as any} columns={[
          { key: "cadence", label: "Cadence" }, { key: "frequency", label: "Frequency" },
          { key: "owner", label: "Owner" }, { key: "completion", label: "Completion %" },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/cadence")({
  head: () => ({ meta: [{ title: "Cadence · V14" }] }),
  component: Page,
});
