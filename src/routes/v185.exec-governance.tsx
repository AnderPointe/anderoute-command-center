import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const e = H.useExecutiveGovernanceAssurance();
  return (
    <V185Page icon={<Briefcase className="size-6 text-cyan-300" />} title="Executive Governance Assurance Center"
      blurb="Per-role queues, high-risk visibility, escalations, outcome visibility — every executive sees what is HITL-gated for them.">
      <ScoreCard label="Exec governance assurance" value={e.score} tone="violet" />
      <KpiGrid cols={4} items={e.kpis} />
      <Section title="Executive governance queue board">
        <SimpleTable rows={e.queues as any} columns={[
          { key: "role", label: "Role" }, { key: "pending", label: "Pending" },
          { key: "high_risk", label: "High-risk" }, { key: "backup", label: "Backup" },
        ]} />
      </Section>
      <Section title="High-risk visibility">
        <SimpleTable rows={e.high_risk as any} columns={[{ key: "item", label: "Item" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Escalations">
        <SimpleTable rows={e.escalations as any} columns={[
          { key: "id", label: "ID" }, { key: "item", label: "Item" }, { key: "from", label: "From" }, { key: "to", label: "To" },
        ]} />
      </Section>
      <Section title="Outcome visibility">
        <SimpleTable rows={e.outcomes as any} columns={[
          { key: "item", label: "Item" }, { key: "outcome", label: "Outcome" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Executive brief">
        <ul className="text-sm text-muted-foreground">{e.brief.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/exec-governance")({ component: Page });
