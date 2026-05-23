import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const a = H.useAssistResilienceAudit();
  return (
    <V185Page icon={<FileSearch className="size-6 text-cyan-300" />} title="Autonomous-Assist Resilience Audit Center"
      blurb="Every automation action: workflow, policy, signal, recommendation, evidence, explanation, risk, confidence, approver, decision, execution, outcome, retry, fallback, exception, remediation, completeness.">
      <ScoreCard label="Resilience audit" value={a.score} tone="violet" />
      <Section title="Audit trail explorer">
        <SimpleTable rows={a.rows as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "workflow", label: "Workflow" },
          { key: "policy", label: "Policy" }, { key: "approver", label: "Approver" }, { key: "decision", label: "Decision" },
          { key: "execution", label: "Execution" }, { key: "exception", label: "Exception" }, { key: "complete", label: "Complete" },
        ]} />
      </Section>
      <Section title="Exception audit queue">
        <SimpleTable rows={a.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">{a.export_placeholder}</p>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/audit")({ component: Page });
