import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V225Page } from "@/components/v225/V225Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v225/ui-bits";
import * as H from "@/v225/hooks";
function Page() {
  const r = H.useLifecycleTrustAutomationRoadmap();
  return (
    <V225Page icon={<Map className="size-6 text-emerald-300" />} title="Long-Term Lifecycle Trust Automation Roadmap" blurb="Current Q → 36 months. HITL preserved across every horizon.">
      <ScoreCard label="Roadmap readiness" value={r.score} tone="emerald" />
      <Section title="Horizons">
        <SimpleTable rows={r.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>
    </V225Page>
  );
}
export const Route = createFileRoute("/v225/roadmap")({ component: Page });
