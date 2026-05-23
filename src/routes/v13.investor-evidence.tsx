import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const items = H.useInvestorAcquirerEvidence();
  const inv = items.filter((i) => i.audience === "Investor" || i.audience === "Both").length;
  const acq = items.filter((i) => i.audience === "Acquirer" || i.audience === "Both").length;
  const stale = items.filter((i) => i.freshness_days > 30).length;
  return (
    <V13Page icon={<BookOpen className="size-6 text-indigo-300" />} title="Investor / Acquirer Evidence Center" blurb="Narrative + evidence items per audience with freshness and approval status.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Items" value={items.length} tone="emerald" />
        <ScoreCard label="Investor items" value={inv} tone="sky" />
        <ScoreCard label="Acquirer items" value={acq} tone="violet" />
        <ScoreCard label="Stale (>30d)" value={stale} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Evidence board</h3>
        <SimpleTable rows={items as any} columns={[
          { key: "item", label: "Item" }, { key: "audience", label: "Audience" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "freshness_days", label: "Fresh (d)" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/investor-evidence")({
  head: () => ({ meta: [{ title: "Investor/Acquirer · Phase 39" }] }),
  component: Page,
});
