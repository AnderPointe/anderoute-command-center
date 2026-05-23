import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const o = H.useOutcomeLearningLoops();
  return (
    <V16Page icon={<Activity className="size-6 text-cyan-300" />} title="Outcome Learning Loop Center"
      blurb="Recommendation timeline (created → approved → executed → measured) with predicted vs realized impact, confidence calibration, lessons learned, and policy update queue.">
      <ScoreCard label="Outcome learning score" value={o.score} tone="emerald" />
      <KpiGrid cols={4} items={[
        { label: "Within ±10%", value: `${Math.round(o.calibration.within_10pct * 100)}%` },
        { label: "Within ±20%", value: `${Math.round(o.calibration.within_20pct * 100)}%` },
        { label: "False positive", value: `${Math.round(o.calibration.false_positive_pct * 100)}%` },
        { label: "False negative", value: `${Math.round(o.calibration.false_negative_pct * 100)}%` },
      ]} />
      <Section title="Recommendation outcome timeline">
        <SimpleTable rows={o.timeline as any} columns={[
          { key: "rec", label: "Rec" },
          { key: "created", label: "Created" },
          { key: "approved", label: "Approved" },
          { key: "executed", label: "Executed" },
          { key: "measured", label: "Measured" },
          { key: "predicted", label: "Predicted" },
          { key: "actual", label: "Actual" },
        ]} />
      </Section>
      <Section title="Lessons learned & policy improvements">
        <SimpleTable rows={o.lessons as any} columns={[
          { key: "lesson", label: "Lesson" },
          { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/outcomes")({ component: Page });
