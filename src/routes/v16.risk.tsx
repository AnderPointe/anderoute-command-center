import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const r = H.usePredictiveRiskSignals();
  return (
    <V16Page icon={<AlertTriangle className="size-6 text-cyan-300" />} title="Predictive Risk Signal Center"
      blurb="Risk heatmap across 15 categories with trend, queued mitigations, and required approvers. Trend predictions are placeholder, evidence-tracked.">
      <ScoreCard label="Risk signal score" value={r.score} tone="rose" />
      <Section title="Risk signal heatmap">
        <SimpleTable rows={r.heatmap as any} columns={[
          { key: "category", label: "Category" },
          { key: "level", label: "Level", render: (x: any) => <StatusPill status={x.level === "high" ? "blocked" : x.level === "medium" ? "watchlist" : "healthy"} /> },
          { key: "trend", label: "Trend" },
        ]} />
      </Section>
      <Section title="Queued risk recommendations (require human approval)">
        <SimpleTable rows={r.queued_recs as any} columns={[
          { key: "rec", label: "Recommendation" },
          { key: "risk", label: "Risk source" },
          { key: "approver", label: "Required approver" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/risk")({ component: Page });
