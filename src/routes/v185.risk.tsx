import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const r = H.usePredictiveRiskControlAssurance();
  return (
    <V185Page icon={<AlertTriangle className="size-6 text-cyan-300" />} title="Predictive Risk Control Assurance Center"
      blurb="15 risk categories with owner, evidence, coverage. All mitigation HITL.">
      <ScoreCard label="Risk control assurance" value={r.score} tone="violet" />
      <KpiGrid cols={4} items={r.kpis} />
      <Section title="Risk matrix">
        <SimpleTable rows={r.matrix as any} columns={[
          { key: "category", label: "Category" }, { key: "owner", label: "Owner" },
          { key: "evidence", label: "Evidence" }, { key: "coverage", label: "Coverage" },
        ]} />
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/risk")({ component: Page });
