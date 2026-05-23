import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const c = H.useCapitalExecutionMaturity();
  return (
    <V14Page icon={<Wallet className="size-6 text-cyan-300" />} title="Capital Execution Maturity Center" blurb="Capital execution actions with owner, due, status, evidence.">
      <ScoreCard label="Capital execution score" value={c.score} tone="amber" />
      <Section title="Action board">
        <SimpleTable rows={c.actions as any} columns={[
          { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <Section title="Blockers">
        <SimpleTable rows={c.blockers as any} columns={[
          { key: "area", label: "Area" },
          { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
          { key: "note", label: "Note" },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/capital-exec")({
  head: () => ({ meta: [{ title: "Capital Execution · V14" }] }),
  component: Page,
});
