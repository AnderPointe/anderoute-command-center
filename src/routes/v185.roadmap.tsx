import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const r = H.useControlAssuranceRoadmap();
  const teaser = H.useV185Phase51Teaser();
  return (
    <V185Page icon={<Map className="size-6 text-cyan-300" />} title="Long-Term Control Assurance Roadmap"
      blurb="Six horizons (now → 36 months) across 17 assurance tracks. All high-impact remains HITL.">
      <Section title="Horizons">
        <SimpleTable rows={r as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/roadmap")({ component: Page });
