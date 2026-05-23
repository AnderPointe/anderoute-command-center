import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, KpiGrid, Section, SimpleTable, StatusPill } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const g = H.useAutonomousAssistGovernance();
  return (
    <V16Page icon={<Gauge className="size-6 text-cyan-300" />} title="Enterprise Autonomous-Assist Governance Command Center"
      blurb="Single pane for assist-only governance: rec volume, approval SLA, explainability, evidence completeness, outcomes, audit, policy compliance, and AI cost governance.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Assist governance score" value={g.score} tone="violet" />
        <ScoreCard label="Approval SLA" value="91%" tone="emerald" />
        <ScoreCard label="Explainability" value="89%" tone="amber" />
        <ScoreCard label="Outcome tracking" value="82%" tone="sky" />
      </div>
      <KpiGrid cols={4} items={g.kpis} />
      <Section title="Policy compliance">
        <SimpleTable rows={g.policy_compliance as any} columns={[
          { key: "policy", label: "Policy" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "passing" ? "healthy" : "watchlist"} /> },
          { key: "last_tested", label: "Last tested" },
        ]} />
      </Section>
      <Section title="Assist governance risks">
        <SimpleTable rows={g.risks as any} columns={[
          { key: "area", label: "Area" },
          { key: "risk", label: "Risk" },
          { key: "severity", label: "Severity" },
        ]} />
      </Section>
      <Section title="Executive summary">
        <p className="text-sm text-muted-foreground">Assist governance is healthy. Approval SLA strong. Watch: marketplace pricing rec confidence (4 lanes below floor) and capital evidence freshness (2 artifacts &gt; 60d).</p>
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/command")({ component: Page });
