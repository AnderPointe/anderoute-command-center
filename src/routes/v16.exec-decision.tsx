import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const e = H.useExecutiveDecisionIntelligence();
  return (
    <V16Page icon={<Briefcase className="size-6 text-cyan-300" />} title="Executive Decision Intelligence Center"
      blurb="Executive decision queue with owners, confidence, risk, evidence and outcome tracking. Decisions never auto-execute.">
      <ScoreCard label="Exec decision score" value={e.score} tone="violet" />
      <Section title="Executive decision queue">
        <SimpleTable rows={e.queue as any} columns={[
          { key: "id", label: "ID" },
          { key: "type", label: "Type" },
          { key: "owner", label: "Owner" },
          { key: "confidence", label: "Confidence" },
          { key: "risk", label: "Risk" },
          { key: "deadline", label: "Deadline" },
          { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Source signals">
        <SimpleTable rows={e.signals as any} columns={[
          { key: "decision", label: "Decision" },
          { key: "signal", label: "Signal" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/exec-decision")({ component: Page });
