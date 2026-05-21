import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useV55Scope } from "@/v55/hooks";

export const Route = createFileRoute("/v55/scope")({
  head: () => ({ meta: [{ title: "V5.5 Scope · Anderoute" }] }),
  component: () => {
    const { matrix, deferred, score } = useV55Scope();
    return (
      <V55Page icon={<Layers className="size-6 text-amber-300" />} title="V5.5 Scope Board"
        blurb="Feature matrix, deferred items, and leadership readiness score for Phase 24.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="V5.5 Leadership Readiness" value={score} tone="amber" />
          <Card className="border-white/10 bg-white/[0.02] p-4 text-xs md:col-span-2">
            <h3 className="text-sm font-semibold">Still deferred</h3>
            <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-2">
              {deferred.map(d => <li key={d}>· {d}</li>)}
            </ul>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Feature matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={matrix as any} columns={[
              { key: "area", label: "Area" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V55Page>
    );
  },
});
