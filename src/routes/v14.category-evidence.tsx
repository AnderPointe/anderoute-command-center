import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import * as H from "@/v14/hooks";

function Page() {
  const e = H.useCategoryLeadershipEvidence();
  return (
    <V14Page icon={<BookOpen className="size-6 text-cyan-300" />} title="Category Leadership Evidence Center" blurb="Evidence library with freshness, approval, and usage.">
      <ScoreCard label="Evidence maturity" value={e.score} tone="sky" />
      <Section title="Evidence library">
        <SimpleTable rows={e.items as any} columns={[
          { key: "evidence", label: "Evidence" },
          { key: "freshness", label: "Freshness", render: (r: any) => <StatusPill status={r.freshness} /> },
          { key: "approved", label: "Approved", render: (r: any) => <StatusPill status={r.approved ? "approved" : "pending"} /> },
          { key: "owner", label: "Owner" },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/category-evidence")({
  head: () => ({ meta: [{ title: "Category Evidence · V14" }] }),
  component: Page,
});
