import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const c = H.useCustomerConcentrationGovernance();
  return (
    <V13Page icon={<Users className="size-6 text-indigo-300" />} title="Customer Concentration Governance" blurb="Top-N concentration, product/region splits, account dependency, and mitigation.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Top customer %" value={c.top_customer_pct} tone="amber" />
        <ScoreCard label="Top-5 %" value={c.top5_pct} tone="amber" />
        <ScoreCard label="Top-10 %" value={c.top10_pct} tone="amber" />
        <ScoreCard label="Mitigations" value={c.mitigation.length} tone="emerald" />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">By product line</h3>
          <SimpleTable rows={c.by_product as any} columns={[{ key: "line", label: "Line" }, { key: "pct", label: "%" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">By region</h3>
          <SimpleTable rows={c.by_region as any} columns={[{ key: "region", label: "Region" }, { key: "pct", label: "%" }]} />
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Strategic account dependency</h3>
        <SimpleTable rows={c.accounts as any} columns={[
          { key: "account", label: "Account" }, { key: "arr_pct", label: "ARR %" },
          { key: "renewal_risk", label: "Renewal" }, { key: "expansion_dep", label: "Expansion" },
          { key: "support_load", label: "Support" }, { key: "mp_dep", label: "MP" }, { key: "api_dep", label: "API" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Mitigation plan</h3>
        <SimpleTable rows={c.mitigation as any} columns={[{ key: "plan", label: "Plan" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/concentration")({
  head: () => ({ meta: [{ title: "Concentration Governance · Phase 39" }] }),
  component: Page,
});
