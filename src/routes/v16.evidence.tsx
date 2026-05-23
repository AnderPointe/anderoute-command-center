import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const e = H.useRecommendationEvidenceMaturity();
  return (
    <V16Page icon={<Lock className="size-6 text-cyan-300" />} title="Recommendation Evidence Maturity Center"
      blurb="Evidence attached to every recommendation, by type and freshness, with a vault, gap panel, and approval workflow for external use.">
      <ScoreCard label="Evidence score" value={e.score} tone="violet" />
      <Section title="Evidence by type">
        <SimpleTable rows={e.by_type as any} columns={[
          { key: "type", label: "Type" },
          { key: "count", label: "Count" },
          { key: "fresh_pct", label: "Fresh %" },
        ]} />
      </Section>
      <Section title="Evidence gaps">
        <SimpleTable rows={e.gaps as any} columns={[
          { key: "rec", label: "Rec" },
          { key: "missing", label: "Missing" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/evidence")({ component: Page });
