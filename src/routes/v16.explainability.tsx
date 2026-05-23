import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const e = H.useRecommendationExplainabilityMaturity();
  const s = e.sample_explanation;
  return (
    <V16Page icon={<FileSearch className="size-6 text-cyan-300" />} title="Recommendation Explainability Maturity"
      blurb="Every CoPilot recommendation ships with detected signal, why it matters, source data, missing data, confidence, risk, expected/no-action impact, alternatives, approver, evidence, audit link, and outcome metric.">
      <ScoreCard label="Explainability score" value={e.score} tone="amber" />
      <Section title={`Sample: ${s.rec_id}`}>
        <div className="space-y-2 text-sm">
          <div><strong>Detected signal:</strong> {s.signal}</div>
          <div><strong>Why it matters:</strong> {s.why_matters}</div>
          <div><strong>Sources:</strong> {s.sources.join(", ")}</div>
          <div><strong>Missing data:</strong> {s.missing_data.join(", ")}</div>
          <div><strong>Confidence:</strong> {s.confidence} · <strong>Risk:</strong> {s.risk}</div>
          <div><strong>Expected impact:</strong> {s.expected_impact}</div>
          <div><strong>No-action impact:</strong> {s.no_action_impact}</div>
          <div><strong>Approver:</strong> {s.approver} · <strong>Evidence attached:</strong> {String(s.evidence_attached)} · <strong>Outcome metric:</strong> {s.outcome_metric}</div>
        </div>
      </Section>
      <Section title="Alternative options">
        <SimpleTable rows={s.alternatives as any} columns={[
          { key: "option", label: "Option" },
          { key: "impact", label: "Impact" },
          { key: "risk", label: "Risk" },
        ]} />
      </Section>
      <Section title="Field completeness">
        <SimpleTable rows={e.completeness_by_field as any} columns={[
          { key: "field", label: "Field" },
          { key: "pct", label: "Complete %" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/explainability")({ component: Page });
