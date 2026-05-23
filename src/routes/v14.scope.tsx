import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { Section, SimpleTable, StatusPill } from "@/components/v14/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v14/hooks";

function Page() {
  const s = H.useV14Scope();
  return (
    <V14Page icon={<Layers className="size-6 text-cyan-300" />} title="V14 Scope" blurb="V14 scope board, feature matrix, and explicitly deferred items.">
      <Section title="In scope (20 capabilities)">
        <div className="grid gap-2 md:grid-cols-2">
          {s.scope.map((x) => <Card key={x} className="border-white/10 bg-white/[0.02] p-2 text-xs">{x}</Card>)}
        </div>
      </Section>
      <Section title="Feature matrix">
        <SimpleTable rows={s.matrix as any} columns={[
          { key: "area", label: "Area" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "note", label: "Note" },
        ]} />
      </Section>
      <Section title="Deferred">
        <ul className="list-disc space-y-1 pl-5 text-xs text-amber-200/90">
          {s.deferred.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/scope")({
  head: () => ({ meta: [{ title: "V14 Scope" }] }),
  component: Page,
});
