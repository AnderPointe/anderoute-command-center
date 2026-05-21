import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V4_SCOPE_IN, V4_SCOPE_OUT, V4_FEATURE_MATRIX } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/scope")({
  head: () => ({ meta: [{ title: "V4 Scope · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Layers className="size-6 text-sky-300" />} title="V4 Scope Board" blurb="What V4 enterprise launch includes and what is explicitly deferred.">
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold text-emerald-300">In scope</h2>
          <ul className="mt-2 space-y-1 text-sm">{V4_SCOPE_IN.map(s => <li key={s}>• {s}</li>)}</ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold text-amber-300">Deferred</h2>
          <ul className="mt-2 space-y-1 text-sm">{V4_SCOPE_OUT.map(s => <li key={s}>• {s}</li>)}</ul>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Feature matrix</h2>
        <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
          {V4_FEATURE_MATRIX.map((f, i) => (
            <div key={i} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
              <div><span className="text-muted-foreground text-xs">{f.area}</span><div>{f.feature}</div></div>
              <Badge variant="outline" className="border-white/15">{f.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V4Page>
  ),
});
