import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const c = H.useCategoryLeadershipStewardship();
  return (
    <V14Page icon={<Star className="size-6 text-cyan-300" />} title="Category Leadership Stewardship Center" blurb="Narrative maturity, competitive position, proof, sales/board narrative.">
      <ScoreCard label="Category leadership" value={c.score} tone="sky" />
      <Section title="Pillars">
        <SimpleTable rows={c.pillars as any} columns={[
          { key: "pillar", label: "Pillar" },
          { key: "maturity", label: "Maturity", render: (r: any) => <StatusPill status={r.maturity} /> },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/category")({
  head: () => ({ meta: [{ title: "Category Leadership · V14" }] }),
  component: Page,
});
