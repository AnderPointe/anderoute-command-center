import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const s = H.useStrategicAccountValueGovernance();
  return (
    <V14Page icon={<Users className="size-6 text-cyan-300" />} title="Strategic Account Value Governance" blurb="Account expansion value, trust, risk, next executive action.">
      <ScoreCard label="Strategic acct value" value={s.score} tone="violet" />
      <Section title="Accounts">
        <SimpleTable rows={s.accounts as any} columns={[
          { key: "account", label: "Account" }, { key: "owner", label: "CSM" }, { key: "sponsor", label: "Sponsor" },
          { key: "adoption", label: "Adoption" }, { key: "expansion", label: "Expansion" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "trust", label: "Trust" }, { key: "next", label: "Next" },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/strategic-acct")({
  head: () => ({ meta: [{ title: "Strategic Accts · V14" }] }),
  component: Page,
});
