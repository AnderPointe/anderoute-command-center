import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { Section, SimpleTable, ScoreCard } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const s = H.useV185Scope();
  return (
    <V185Page icon={<Layers className="size-6 text-cyan-300" />} title="V18.5 Scope"
      blurb="V18.5 scope board, feature matrix, deferred scope, and control assurance score.">
      <ScoreCard label="Control assurance" value={`${s.score.overall}%`} tone="violet" />
      <Section title="Feature matrix">
        <SimpleTable rows={s.matrix as any} columns={[
          { key: "area", label: "Area" }, { key: "status", label: "Status" }, { key: "notes", label: "Notes" },
        ]} />
      </Section>
      <Section title="Deferred scope">
        <ul className="text-sm text-muted-foreground">{s.deferred.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/scope")({ component: Page });
