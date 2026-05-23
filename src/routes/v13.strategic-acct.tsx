import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const accts = H.useStrategicAccountValueCreation();
  const avg = Math.round(accts.reduce((a, b) => a + b.value_score, 0) / accts.length);
  return (
    <V13Page icon={<Users className="size-6 text-indigo-300" />} title="Strategic Account Value Creation" blurb="Per-account value scores, expansion potential, sponsor health, and next actions.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Accounts" value={accts.length} tone="emerald" />
        <ScoreCard label="Avg value score" value={avg} tone="sky" />
        <ScoreCard label="Strong sponsors" value={accts.filter((a) => a.sponsor === "strong").length} tone="violet" />
        <ScoreCard label="High risk" value={accts.filter((a) => a.renewal_risk === "high").length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Account value map</h3>
        <SimpleTable rows={accts as any} columns={[
          { key: "account", label: "Account" }, { key: "value_score", label: "Value" },
          { key: "adoption", label: "Adopt" }, { key: "expansion_potential", label: "Expansion" },
          { key: "renewal_risk", label: "Renewal" }, { key: "sponsor", label: "Sponsor" },
          { key: "next_action", label: "Next action" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/strategic-acct")({
  head: () => ({ meta: [{ title: "Strategic Account Value · Phase 39" }] }),
  component: Page,
});
