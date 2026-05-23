import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const c = H.useMarketplaceEconomicsControls();
  return (
    <V14Page icon={<ShieldCheck className="size-6 text-cyan-300" />} title="Marketplace Economics Control Framework" blurb="Marketplace control matrix, owners, testing, exceptions.">
      <ScoreCard label="MP control score" value={c.score} tone="rose" />
      <Section title="Controls">
        <SimpleTable rows={c.controls as any} columns={[
          { key: "control", label: "Control" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Exception queue">
        <SimpleTable rows={c.exceptions as any} columns={[
          { key: "exception", label: "Exception" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/mp-controls")({
  head: () => ({ meta: [{ title: "MP Controls · V14" }] }),
  component: Page,
});
