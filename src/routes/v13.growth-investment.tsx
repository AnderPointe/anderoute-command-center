import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const inv = H.useGrowthInvestmentGovernance();
  const approved = inv.filter((i) => i.approval === "approved").length;
  return (
    <V13Page icon={<Wallet className="size-6 text-indigo-300" />} title="Growth Investment Governance" blurb="Investment categories with thesis, expected impact (placeholder), evidence, and approval status.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Investments" value={inv.length} tone="emerald" />
        <ScoreCard label="Approved" value={approved} tone="sky" />
        <ScoreCard label="Pending" value={inv.length - approved} tone="amber" />
        <ScoreCard label="High risk" value={inv.filter((i) => i.risk === "high").length} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Investment board</h3>
        <SimpleTable rows={inv as any} columns={[
          { key: "category", label: "Category" }, { key: "owner", label: "Owner" },
          { key: "thesis", label: "Thesis" }, { key: "impact", label: "Impact (placeholder)" },
          { key: "risk", label: "Risk" },
          { key: "approval", label: "Status", render: (r: any) => <StatusPill status={r.approval === "approved" ? "ready" : "review"} /> },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/growth-investment")({
  head: () => ({ meta: [{ title: "Growth Investment · Phase 39" }] }),
  component: Page,
});
