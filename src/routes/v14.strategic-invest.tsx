import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const i = H.useStrategicInvestmentExecution();
  return (
    <V14Page icon={<Briefcase className="size-6 text-cyan-300" />} title="Strategic Investment Execution Center" blurb="15 investment categories · thesis, impact placeholder, risk, approval, execution status.">
      <ScoreCard label="Investment execution" value={i.score} tone="amber" />
      <Section title="Investments">
        <SimpleTable rows={i.investments as any} columns={[
          { key: "category", label: "Category" }, { key: "owner", label: "Owner" },
          { key: "thesis", label: "Thesis" }, { key: "impact", label: "Impact (ph)" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "approval", label: "Approval", render: (r: any) => <StatusPill status={r.approval} /> },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "next", label: "Next" },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/strategic-invest")({
  head: () => ({ meta: [{ title: "Strategic Invest · V14" }] }),
  component: Page,
});
