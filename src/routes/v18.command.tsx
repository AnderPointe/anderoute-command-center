import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const g = H.useAutonomousAssistScaleGovernance();
  const headlines = H.useV18PolishHeadlines();
  const heatmap = H.useV18OwnerHeatmap();
  const calibration = H.useV18PolicyCalibration();
  return (
    <V18Page icon={<Gauge className="size-6 text-violet-300" />} title="Enterprise Autonomous-Assist Scale Governance Center"
      blurb="Scale governance score, policy compliance, high-impact protection, approval coverage, recommendation/evidence/audit completeness, outcome learning coverage, and exception health.">
      <ScoreCard label="Assist scale governance" value={g.score} tone="violet" />
      <KpiGrid cols={4} items={g.kpis} />
      <Section title="Polish headlines (20 areas)">
        <SimpleTable rows={headlines as any} columns={[
          { key: "area", label: "Area" }, { key: "headline", label: "Headline" }, { key: "trend", label: "Trend" },
        ]} />
      </Section>
      <Section title="Owner approval heatmap">
        <SimpleTable rows={heatmap as any} columns={[
          { key: "owner", label: "Owner" }, { key: "pending", label: "Pending" },
          { key: "overdue", label: "Overdue" }, { key: "high_risk", label: "High-risk" },
          { key: "completion", label: "Completion" },
        ]} />
      </Section>
      <Section title="Policy calibration drift">
        <SimpleTable rows={calibration as any} columns={[
          { key: "policy", label: "Policy" }, { key: "drift", label: "Drift" },
          { key: "suggestion", label: "Suggestion" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Health map">
        <SimpleTable rows={g.health_map as any} columns={[{ key: "domain", label: "Domain" }, { key: "health", label: "Health" }]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={g.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={g.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
      <Section title="Executive scale summary">
        <ul className="text-sm text-muted-foreground">{g.exec_summary.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/command")({ component: Page });
