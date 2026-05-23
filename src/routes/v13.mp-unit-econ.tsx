import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const u = H.useMarketplaceUnitEconomicsPlaceholder();
  return (
    <V13Page icon={<Megaphone className="size-6 text-indigo-300" />} title="Marketplace Unit Economics (Placeholder)" blurb="Placeholder inputs only. Do not treat values as audited or final unit economics.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Confidence" value={u.confidence} tone="amber" />
        <ScoreCard label="Evidence %" value={u.evidence_completeness} tone="sky" />
        <ScoreCard label="Inputs" value={u.inputs.length} tone="violet" />
        <ScoreCard label="Risks" value={u.risks.length} tone="emerald" />
      </div>
      <Card className="border-amber-400/20 bg-amber-400/5 p-4">
        <p className="text-xs text-amber-100">{u.board_summary}</p>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Unit economics input table (placeholders)</h3>
        <SimpleTable rows={u.inputs as any} columns={[{ key: "input", label: "Input" }, { key: "placeholder", label: "Placeholder" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Risks</h3>
        <SimpleTable rows={u.risks as any} columns={[{ key: "risk", label: "Risk" }, { key: "severity", label: "Sev." }, { key: "owner", label: "Owner" }]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/mp-unit-econ")({
  head: () => ({ meta: [{ title: "MP Unit Economics · Phase 39" }] }),
  component: Page,
});
