import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const a = H.useEnterpriseControlAssurance();
  return (
    <V185Page icon={<Gauge className="size-6 text-cyan-300" />} title="Enterprise Control Assurance Command Center"
      blurb="Single pane: assurance, resilience, board, revenue, MP, exec, approval, evidence, audit, learning, risk, isolation.">
      <ScoreCard label="Enterprise control assurance" value={a.score} tone="violet" />
      <KpiGrid cols={4} items={a.kpis} />
      <Section title="Assurance health map">
        <SimpleTable rows={a.health_map as any} columns={[{ key: "domain", label: "Domain" }, { key: "health", label: "Health" }]} />
      </Section>
      <Section title="Control exceptions">
        <SimpleTable rows={a.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Remediation">
        <SimpleTable rows={a.remediation as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={a.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
      <Section title="Executive assurance summary">
        <ul className="text-sm text-muted-foreground">{a.exec_summary.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/command")({ component: Page });
