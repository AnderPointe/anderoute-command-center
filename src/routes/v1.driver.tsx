import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, ClipboardCheck, Globe } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DRIVER_STABILIZATION, type ChecklistGroup } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/driver")({
  head: () => ({ meta: [{ title: "Driver Stabilization · Anderoute" }] }),
  component: Page,
});

export function ChecklistCard({ group }: { group: ChecklistGroup }) {
  const done = group.items.filter((i) => i.done).length;
  return (
    <Card className="border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">{group.title}</h2>
        <Badge variant="outline" className="border-white/15 text-muted-foreground">{done}/{group.items.length}</Badge>
      </div>
      <div className="mt-3 space-y-2">
        {group.items.map((i) => (
          <div key={i.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${i.done ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span>{i.label}</span>
              {i.note && <span className="text-xs text-muted-foreground">· {i.note}</span>}
            </div>
            <Badge variant="outline" className={i.done ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
              {i.done ? "done" : "open"}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Page() {
  return (
    <V1Page
      icon={<Smartphone className="size-6 text-indigo-300" />}
      title="Driver App Stabilization"
      blurb="Focused UX, GPS, and POD polish tasks distilled from pilot driver feedback."
    >
      <ChecklistCard group={DRIVER_STABILIZATION} />
    </V1Page>
  );
}

export { Smartphone, ClipboardCheck, Globe };
