import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V21Page } from "@/components/v21/V21Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v21/ui-bits";
import * as H from "@/v21/hooks";

function Page() {
  const d = H.useTrustIntelligenceRoadmap();
  return (
    <V21Page icon={<Map className="size-6 text-cyan-300" />} title="Long-Term Trust Intelligence Network Roadmap"
      blurb="Horizons Q+1 → 36 months across the V21 trust intelligence network — HITL preserved at every horizon.">
      <ScoreCard label="Roadmap maturity" value={d.score} tone="violet" />
      <Section title="Horizons">
        <SimpleTable rows={d.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>
    </V21Page>
  );
}
export const Route = createFileRoute("/v21/roadmap")({ component: Page });
