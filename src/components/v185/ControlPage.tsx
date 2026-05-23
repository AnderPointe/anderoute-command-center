import { ReactNode } from "react";
import { V185Page } from "./V185Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "./ui-bits";

export function ControlPage({ icon, title, blurb, data }: { icon: ReactNode; title: string; blurb: string; data: any }) {
  return (
    <V185Page icon={icon} title={title} blurb={blurb}>
      <ScoreCard label="Control assurance score" value={data.score} tone="violet" />
      {data.kpis && <KpiGrid cols={4} items={data.kpis} />}
      <Section title="Control matrix">
        <SimpleTable rows={data.matrix as any} columns={[
          { key: "control", label: "Control" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      {data.exceptions?.length ? (
        <Section title="Exceptions">
          <SimpleTable rows={data.exceptions as any} columns={[
            { key: "id", label: "ID" }, { key: "control", label: "Control" },
            { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
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
    </V185Page>
  );
}
