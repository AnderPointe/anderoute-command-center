import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const b = H.useBoardIntelligenceAssurance();
  return (
    <V185Page icon={<Brain className="size-6 text-cyan-300" />} title="Board Intelligence Assurance Center"
      blurb="Packet, KPI, decision, risk, explainability, approval, follow-up, audit, freshness — all gated to approved board audience.">
      <ScoreCard label="Board intelligence assurance" value={b.score} tone="violet" />
      <KpiGrid cols={4} items={b.kpis} />
      <Section title="Board packet assurance">
        <SimpleTable rows={b.packet as any} columns={[
          { key: "section", label: "Section" }, { key: "assurance", label: "Assurance" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Decision evidence assurance">
        <SimpleTable rows={b.decision_evidence as any} columns={[
          { key: "decision", label: "Decision" }, { key: "evidence", label: "Evidence" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Board audit trail">
        <SimpleTable rows={b.audit_trail as any} columns={[
          { key: "id", label: "ID" }, { key: "event", label: "Event" }, { key: "ts", label: "When" }, { key: "complete", label: "Complete" },
        ]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={b.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "control", label: "Control" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={b.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/board-assurance")({ component: Page });
