import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const r = H.useLongTermCapitalStrategy();
  const horizons = Array.from(new Set(r.map((x) => x.horizon)));
  return (
    <V13Page icon={<Map className="size-6 text-indigo-300" />} title="Long-Term Capital Strategy Roadmap" blurb="6 horizons × 12 tracks with milestones and owners.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Items" value={r.length} tone="emerald" />
        <ScoreCard label="Horizons" value={horizons.length} tone="sky" />
        <ScoreCard label="Tracks" value={new Set(r.map((x) => x.track)).size} tone="violet" />
        <ScoreCard label="Owners" value={new Set(r.map((x) => x.owner)).size} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Roadmap</h3>
        <SimpleTable rows={r as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "track", label: "Track" },
          { key: "milestone", label: "Milestone" }, { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/roadmap")({
  head: () => ({ meta: [{ title: "Capital Strategy · Phase 39" }] }),
  component: Page,
});
