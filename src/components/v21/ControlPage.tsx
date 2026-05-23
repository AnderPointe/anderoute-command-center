import { ReactNode } from "react";
import { V21Page } from "./V21Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "./ui-bits";

export function ControlPage({ icon, title, blurb, data, scoreLabel = "Trust network score" }: {
  icon: ReactNode; title: string; blurb: string; data: any; scoreLabel?: string;
}) {
  return (
    <V21Page icon={icon} title={title} blurb={blurb}>
      <ScoreCard label={scoreLabel} value={data.score} tone="violet" />
      {data.kpis && <KpiGrid cols={4} items={data.kpis} />}
      {data.matrix && (
        <Section title="Trust network matrix">
          <SimpleTable rows={data.matrix as any} columns={[
            { key: "control", label: "Surface" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
          ]} />
        </Section>
      )}
      {data.exceptions?.length ? (
        <Section title="Exceptions">
          <SimpleTable rows={data.exceptions as any} columns={[
            { key: "id", label: "ID" }, { key: "control", label: "Area" }, { key: "desc", label: "Description" },
            { key: "owner", label: "Owner" }, { key: "risk", label: "Risk" }, { key: "sla", label: "SLA" },
          ]} />
        </Section>
      ) : null}
      {data.remediation?.length ? (
        <Section title="Remediation">
          <SimpleTable rows={data.remediation as any} columns={[
            { key: "id", label: "ID" }, { key: "action", label: "Action" },
            { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
          ]} />
        </Section>
      ) : null}
    </V21Page>
  );
}
