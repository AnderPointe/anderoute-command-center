import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const m = H.useStrategicControlMaturity();
  return (
    <V16Page icon={<ShieldCheck className="size-6 text-cyan-300" />} title="Strategic Control Maturity Center"
      blurb="Maturity score across 14 control categories with testing calendar, exception dashboard, and remediation tracker.">
      <ScoreCard label="Strategic control maturity" value={m.score} tone="violet" />
      <Section title="Control category scores">
        <SimpleTable rows={m.categories as any} columns={[
          { key: "cat", label: "Category" },
          { key: "score", label: "Score" },
        ]} />
      </Section>
      <Section title="Control testing calendar">
        <SimpleTable rows={m.testing_calendar as any} columns={[
          { key: "control", label: "Control" },
          { key: "next_test", label: "Cadence" },
        ]} />
      </Section>
      <Section title="Open exceptions">
        <SimpleTable rows={m.exceptions as any} columns={[
          { key: "ctrl", label: "Control" },
          { key: "desc", label: "Description" },
          { key: "owner", label: "Owner" },
          { key: "due", label: "Due" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/control-maturity")({ component: Page });
