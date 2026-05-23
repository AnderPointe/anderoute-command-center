import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const h = H.useHumanApprovalAssurance();
  return (
    <V185Page icon={<ListChecks className="size-6 text-cyan-300" />} title="Human Approval Assurance Center"
      blurb="Coverage, SLA, backup, escalation, evidence, explanation, decision reasons, audit, override readiness.">
      <ScoreCard label="Human approval assurance" value={h.score} tone="violet" />
      <KpiGrid cols={4} items={h.kpis} />
      <Section title="Per-domain coverage & backup">
        <SimpleTable rows={h.coverage as any} columns={[
          { key: "domain", label: "Domain" }, { key: "coverage", label: "Coverage" }, { key: "backup", label: "Backup approver" },
        ]} />
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/human-approval")({ component: Page });
