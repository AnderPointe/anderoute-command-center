import { createFileRoute } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  V1_FEATURES, PRIORITY_LABEL, PRIORITY_TONE, cutlineStats, type V1Priority,
} from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/cutline")({
  head: () => ({ meta: [{ title: "V1 Cutline · Anderoute" }] }),
  component: Page,
});

const ORDER: V1Priority[] = ["must", "should", "nice", "post_v1", "enterprise_later"];

const STATUS_TONE: Record<string, string> = {
  shipped:     "border-emerald-500/30 text-emerald-300",
  ready:       "border-teal-500/30 text-teal-300",
  in_progress: "border-indigo-500/30 text-indigo-300",
  planned:     "border-sky-500/30 text-sky-300",
};

function Page() {
  const stats = cutlineStats();
  const mustStats = stats.find((s) => s.priority === "must")!;
  return (
    <V1Page
      icon={<Scissors className="size-6 text-indigo-300" />}
      title="V1 Cutline"
      blurb="Sharp line between V1, V1.5, V2, and Enterprise. Must-haves are non-negotiable; everything else slots after pilot stabilization."
    >
      <div className="grid gap-3 md:grid-cols-5">
        {stats.map((s) => (
          <StatTile
            key={s.priority}
            label={PRIORITY_LABEL[s.priority]}
            value={s.count}
            hint={s.priority === "must" || s.priority === "should" ? `${s.ready}/${s.count} ready` : "deferred"}
            tone={s.priority === "must" ? (s.ready === s.count ? "good" : "warn") : s.priority === "should" ? "info" : "default"}
          />
        ))}
      </div>
      {mustStats.ready < mustStats.count && (
        <Card className="border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-200">
          {mustStats.count - mustStats.ready} V1 must-have feature(s) still in progress. V1 cannot ship until these are <span className="font-semibold">ready</span> or <span className="font-semibold">shipped</span>.
        </Card>
      )}
      {ORDER.map((p) => {
        const items = V1_FEATURES.filter((f) => f.priority === p);
        return (
          <Card key={p} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{PRIORITY_LABEL[p]}</h2>
              <Badge variant="outline" className={PRIORITY_TONE[p]}>{items.length}</Badge>
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {items.map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                  <div>
                    <div>{f.name}</div>
                    <div className="text-[11px] text-muted-foreground">{f.area} · value {f.value} / effort {f.effort}</div>
                  </div>
                  <Badge variant="outline" className={STATUS_TONE[f.status] ?? "border-white/15 text-muted-foreground"}>
                    {f.status.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </V1Page>
  );
}
