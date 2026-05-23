import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V21Page } from "@/components/v21/V21Page";
import { Section } from "@/components/v21/ui-bits";
import * as H from "@/v21/hooks";

function Page() {
  const s = H.useV21Scope();
  return (
    <V21Page icon={<Layers className="size-6 text-cyan-300" />} title="V21 Scope"
      blurb="In-scope V21 trust intelligence network centers and deferred items (still HITL-protected).">
      <Section title="In scope">
        <ul className="grid gap-1 text-sm md:grid-cols-2">{s.in_scope.map((x) => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Deferred">
        <ul className="grid gap-1 text-sm md:grid-cols-2 text-muted-foreground">{s.deferred.map((x) => <li key={x}>· {x}</li>)}</ul>
      </Section>
    </V21Page>
  );
}
export const Route = createFileRoute("/v21/scope")({ component: Page });
