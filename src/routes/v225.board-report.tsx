import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V225Page } from "@/components/v225/V225Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v225/ui-bits";
import * as H from "@/v225/hooks";
function Page() {
  const b = H.useBoardLifecycleTrustReporting();
  return (
    <V225Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="Board Lifecycle Trust Reporting Center" blurb="Automation scale · board assurance · revenue · MP · customer/partner · evidence · boundaries · approval/rec/outcome · audit · risk · capital/product/category · exceptions · decisions · next-Q priorities.">
      <ScoreCard label="Board report readiness" value={b.score} tone="emerald" />
      <KpiGrid cols={4} items={b.kpis} />
      <Section title="Report sections">
        <SimpleTable rows={b.matrix as any} columns={[
          { key: "section", label: "Section" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V225Page>
  );
}
export const Route = createFileRoute("/v225/board-report")({ component: Page });
