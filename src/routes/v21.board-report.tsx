import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V21Page } from "@/components/v21/V21Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v21/ui-bits";
import * as H from "@/v21/hooks";

function Page() {
  const d = H.useBoardTrustIntelligenceReporting();
  return (
    <V21Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="Board Trust Intelligence Reporting Center"
      blurb="Mock board report: network + scale + execution + systems + optimization + evidence + audit + exceptions + decisions + priorities.">
      <ScoreCard label="Board report readiness" value={d.score} tone="violet" />
      <KpiGrid cols={4} items={d.kpis} />
      <Section title="Report sections">
        <SimpleTable rows={d.matrix as any} columns={[
          { key: "section", label: "Section" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V21Page>
  );
}
export const Route = createFileRoute("/v21/board-report")({ component: Page });
