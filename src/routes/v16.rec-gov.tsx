import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const g = H.useRecommendationGovernanceMaturity();
  return (
    <V16Page icon={<ListChecks className="size-6 text-cyan-300" />} title="Recommendation Governance Maturity Center"
      blurb="Per-category thresholds, required approvers, evidence requirements, exceptions, and escalations for every recommendation produced by CoPilot.">
      <ScoreCard label="Rec governance score" value={g.score} tone="violet" />
      <Section title="Recommendation policy matrix">
        <SimpleTable rows={g.policy_matrix as any} columns={[
          { key: "category", label: "Category" },
          { key: "confidence_min", label: "Conf ≥" },
          { key: "risk_max", label: "Risk ≤" },
          { key: "approver", label: "Approver" },
          { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <Section title="Exception queue">
        <SimpleTable rows={g.exceptions as any} columns={[
          { key: "rec", label: "Recommendation" },
          { key: "reason", label: "Reason" },
          { key: "status", label: "Status", render: (x: any) => <StatusPill status={x.status === "blocked" ? "blocked" : "watchlist"} /> },
        ]} />
      </Section>
      <Section title="Escalations">
        <SimpleTable rows={g.escalations as any} columns={[
          { key: "rec", label: "Recommendation" },
          { key: "to", label: "Escalated to" },
          { key: "reason", label: "Reason" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/rec-gov")({ component: Page });
