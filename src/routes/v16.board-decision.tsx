import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const b = H.useBoardDecisionIntelligence();
  return (
    <V16Page icon={<Brain className="size-6 text-cyan-300" />} title="Board Decision Intelligence Center"
      blurb="Board decision queue with evidence completeness, confidence, risk, and outcome tracking. Board approvals required for capital, growth, MP scale, risk acceptance, and governance policies.">
      <ScoreCard label="Board decision score" value={b.score} tone="sky" />
      <Section title="Board decision request queue">
        <SimpleTable rows={b.queue as any} columns={[
          { key: "id", label: "ID" },
          { key: "type", label: "Type" },
          { key: "confidence", label: "Confidence" },
          { key: "risk", label: "Risk" },
          { key: "evidence_pct", label: "Evidence %" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/board-decision")({ component: Page });
