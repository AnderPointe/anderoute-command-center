import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const r = H.useAutonomousAssistGovernanceRoadmap();
  const cols = [{ key: "track", label: "Track" }, ...r.horizons.map((h, i) => ({ key: `h${i}`, label: h }))];
  const rows = r.tracks.map((t) => {
    const obj: any = { track: t.track };
    t.row.forEach((v, i) => (obj[`h${i}`] = v));
    return obj;
  });
  return (
    <V16Page icon={<Map className="size-6 text-cyan-300" />} title="Long-Term Autonomous-Assist Governance Roadmap"
      blurb="14 tracks across 6 horizons. Decision log keeps the governance roadmap evidence-tracked.">
      <Section title="Roadmap matrix">
        <SimpleTable rows={rows} columns={cols} />
      </Section>
      <Section title="Decision log">
        <SimpleTable rows={r.decision_log as any} columns={[
          { key: "date", label: "When" },
          { key: "decision", label: "Decision" },
          { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/roadmap")({ component: Page });
