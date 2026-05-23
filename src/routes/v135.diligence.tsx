import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135DiligenceContinuity();
  const lines = H.useV135ProductLineValue();
  return (
    <V135Page icon={<BookOpen className="size-6 text-fuchsia-300" />} title="Commercial Diligence Maturity" blurb="Always-on diligence + product-line value governance (ARR / GM / durability per line).">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Diligence continuity</h3>
        <SimpleTable rows={rows as any} columns={[
          { key: "area", label: "Area" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Product-line value governance</h3>
        <SimpleTable rows={lines as any} columns={[
          { key: "line", label: "Line" }, { key: "arr_m", label: "ARR ($M)" },
          { key: "gm_pct", label: "GM %" }, { key: "durability", label: "Durability" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/diligence")({
  head: () => ({ meta: [{ title: "Diligence Continuity · V13.5" }] }),
  component: Page,
});
