import { createFileRoute } from "@tanstack/react-router";
import { Stamp } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const d = H.useCommercialDiligenceControl();
  return (
    <V14Page icon={<Stamp className="size-6 text-cyan-300" />} title="Commercial Diligence Control Center" blurb="13 diligence domains with owner, status, evidence freshness, exceptions.">
      <ScoreCard label="Diligence control" value={d.score} tone="violet" />
      <Section title="Domains">
        <SimpleTable rows={d.domains as any} columns={[
          { key: "domain", label: "Domain" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "owner", label: "Owner" },
          { key: "evidence", label: "Evidence", render: (r: any) => <StatusPill status={r.evidence} /> },
        ]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={d.exceptions as any} columns={[
          { key: "exception", label: "Exception" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/diligence")({
  head: () => ({ meta: [{ title: "Diligence Control · V14" }] }),
  component: Page,
});
