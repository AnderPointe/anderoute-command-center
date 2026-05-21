import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V2_SCOPE } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/scope")({
  head: () => ({ meta: [{ title: "V2 Scope · Anderoute" }] }),
  component: Page,
});

const tone: Record<string, string> = {
  ready:       "border-emerald-500/30 text-emerald-300",
  beta:        "border-sky-500/30 text-sky-300",
  placeholder: "border-amber-500/30 text-amber-300",
  deferred:    "border-white/15 text-muted-foreground",
};

function Page() {
  const areas = Array.from(new Set(V2_SCOPE.map((s) => s.area)));
  return (
    <V2Page
      icon={<Layers className="size-6 text-violet-300" />}
      title="V2 Scope Board"
      blurb="What ships in V2, what's beta, and what's explicitly deferred to V2.5 or later. Keeps the team honest about scope creep into Android Auto, CarPlay, full SOC 2, or carrier marketplace work."
    >
      {areas.map((a) => (
        <Card key={a} className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">{a}</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {V2_SCOPE.filter((s) => s.area === a).map((s) => (
              <div key={s.id} className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                <div>
                  <div className="font-medium">{s.feature}</div>
                  {s.notes && <div className="text-xs text-muted-foreground">{s.notes}</div>}
                </div>
                <Badge variant="outline" className={tone[s.status]}>{s.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </V2Page>
  );
}
