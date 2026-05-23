import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const e = H.useCapitalEvidenceControl();
  return (
    <V14Page icon={<Lock className="size-6 text-cyan-300" />} title="Capital Evidence Control Center" blurb="Capital evidence categories with freshness, owner, gap flag.">
      <ScoreCard label="Capital evidence" value={e.score} tone="amber" />
      <Section title="Evidence matrix">
        <SimpleTable rows={e.items as any} columns={[
          { key: "category", label: "Category" },
          { key: "freshness", label: "Freshness", render: (r: any) => <StatusPill status={r.freshness} /> },
          { key: "owner", label: "Owner" },
          { key: "gap", label: "Gap", render: (r: any) => <StatusPill status={r.gap ? "high" : "tracking"} /> },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/capital-evidence")({
  head: () => ({ meta: [{ title: "Capital Evidence · V14" }] }),
  component: Page,
});
