import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const r = H.useAssistOperatingResilience();
  return (
    <V185Page icon={<Activity className="size-6 text-cyan-300" />} title="Autonomous-Assist Operating Resilience Center"
      blurb="Workflow uptime, retry queue, manual fallbacks, incidents. No high-impact action executed automatically.">
      <ScoreCard label="Operating resilience" value={r.score} tone="emerald" />
      <KpiGrid cols={4} items={r.kpis} />
      <Section title="Resilience health map">
        <SimpleTable rows={r.health_map as any} columns={[{ key: "domain", label: "Domain" }, { key: "health", label: "Health" }]} />
      </Section>
      <Section title="Workflow failure queue">
        <SimpleTable rows={r.failure_queue as any} columns={[
          { key: "id", label: "ID" }, { key: "workflow", label: "Workflow" },
          { key: "failed_at", label: "Failed at" }, { key: "reason", label: "Reason" }, { key: "retry", label: "Retry" },
        ]} />
      </Section>
      <Section title="Manual fallback status">
        <SimpleTable rows={r.fallback as any} columns={[{ key: "workflow", label: "Workflow" }, { key: "manual", label: "Manual procedure" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Retry queue">
        <SimpleTable rows={r.retry_queue as any} columns={[
          { key: "id", label: "ID" }, { key: "workflow", label: "Workflow" }, { key: "attempts", label: "Attempts" }, { key: "next_at", label: "Next" },
        ]} />
      </Section>
      <Section title="Resilience incidents (placeholder)">
        <SimpleTable rows={r.incidents as any} columns={[{ key: "id", label: "ID" }, { key: "severity", label: "Severity" }, { key: "title", label: "Title" }]} />
      </Section>
      <Section title="Action plan">
        <SimpleTable rows={r.action_plan as any} columns={[{ key: "item", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/resilience")({ component: Page });
