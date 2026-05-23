import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ScoreCard, KpiGrid } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const o = H.useOutcomeLearningAssurance();
  return (
    <V185Page icon={<Radar className="size-6 text-cyan-300" />} title="Outcome Learning Assurance Center"
      blurb="Coverage across approved/rejected/automation outcomes per domain · confidence calibration · lessons learned · board visibility.">
      <ScoreCard label="Outcome learning assurance" value={o.score} tone="violet" />
      <KpiGrid cols={4} items={o.kpis} />
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/outcome")({ component: Page });
