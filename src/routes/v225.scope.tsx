import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V225Page } from "@/components/v225/V225Page";
import { Section, SimpleTable } from "@/components/v225/ui-bits";
import * as H from "@/v225/hooks";
function Page() {
  const s = H.useV225Scope();
  return (
    <V225Page icon={<Layers className="size-6 text-emerald-300" />} title="V22.5 Scope" blurb="20 lifecycle automation centers + roadmap + reports. Autonomous high-impact actions remain deferred.">
      <Section title="In scope">
        <ul className="grid gap-1 text-sm md:grid-cols-2">{s.in_scope.map((x, i) => <li key={i}>• {x}</li>)}</ul>
      </Section>
      <Section title="Deferred">
        <ul className="space-y-1 text-sm text-muted-foreground">{s.deferred.map((x, i) => <li key={i}>• {x}</li>)}</ul>
      </Section>
      <Section title="Feature matrix">
        <SimpleTable rows={H.useV225FeatureMatrix() as any} columns={[
          { key: "feature", label: "Feature" }, { key: "status", label: "Status" }, { key: "hitl", label: "HITL" },
        ]} />
      </Section>
    </V225Page>
  );
}
export const Route = createFileRoute("/v225/scope")({ component: Page });
