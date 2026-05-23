import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const { matrix, deferred } = H.useV13Scope();
  return (
    <V13Page icon={<Layers className="size-6 text-indigo-300" />} title="V13 Scope" blurb="Feature matrix and explicitly deferred items.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">V13 feature matrix</h3>
        <SimpleTable rows={matrix as any} columns={[
          { key: "area", label: "Area" },
          { key: "ga", label: "GA", render: (r: any) => <StatusPill status={r.ga === "ready" ? "ready" : r.ga === "beta" ? "review" : "placeholder"} /> },
          { key: "notes", label: "Notes" },
        ]} />
      </Card>
      <Card className="border-amber-400/20 bg-amber-400/5 p-4">
        <h3 className="text-sm font-semibold text-amber-100">Explicitly deferred</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {deferred.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/scope")({
  head: () => ({ meta: [{ title: "V13 Scope · Phase 39" }] }),
  component: Page,
});
