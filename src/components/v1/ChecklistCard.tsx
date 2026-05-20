import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { ChecklistGroup } from "@/v1/data/mockPhase14";

export function ChecklistCard({ group, hint }: { group: ChecklistGroup; hint?: string }) {
  const done = group.items.filter((i) => i.done).length;
  const pct = Math.round((done / group.items.length) * 100);
  const blockers = group.items.filter((i) => !i.done);
  return (
    <Card className="border-white/10 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">{group.title}</h2>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={
              pct === 100
                ? "border-emerald-500/30 text-emerald-300"
                : pct >= 70
                ? "border-sky-500/30 text-sky-300"
                : "border-amber-500/30 text-amber-300"
            }
          >
            {pct}%
          </Badge>
          <Badge variant="outline" className="border-white/15 text-muted-foreground">
            {done}/{group.items.length}
          </Badge>
        </div>
      </div>
      <Progress value={pct} className="mt-3 h-1.5" />
      {blockers.length > 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          {blockers.length} open · next: <span className="text-amber-300">{blockers[0].label}</span>
        </div>
      )}
      <div className="mt-3 space-y-2">
        {group.items.map((i) => (
          <div
            key={i.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${i.done ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span>{i.label}</span>
              {i.note && <span className="text-xs text-muted-foreground">· {i.note}</span>}
            </div>
            <Badge
              variant="outline"
              className={
                i.done
                  ? "border-emerald-500/30 text-emerald-300"
                  : "border-amber-500/30 text-amber-300"
              }
            >
              {i.done ? "done" : "open"}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
