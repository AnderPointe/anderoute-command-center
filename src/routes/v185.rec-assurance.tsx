import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const r = H.useRecommendationControlAssurance();
  return (
    <V185Page icon={<CheckCircle2 className="size-6 text-cyan-300" />} title="Recommendation Control Assurance Center"
      blurb="Source signal, evidence completeness, explainability, confidence/risk scoring, alternatives, no-action impact, dedupe, policy/routing/audit/outcome.">
      <ScoreCard label="Recommendation control assurance" value={r.score} tone="violet" />
      <KpiGrid cols={4} items={r.kpis} />
      <Section title="Exceptions">
        <SimpleTable rows={r.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "domain", label: "Domain" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/rec-assurance")({ component: Page });
