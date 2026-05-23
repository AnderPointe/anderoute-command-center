import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { Section } from "@/components/v14/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v14/hooks";

function Page() {
  const r = H.useEnterpriseValueCreationReporting();
  return (
    <V14Page icon={<Activity className="size-6 text-cyan-300" />} title="Enterprise Value Creation Reporting" blurb="Available report builders + next quarter strategic priorities.">
      <Section title="Reports">
        <div className="grid gap-2 md:grid-cols-2">
          {r.reports.map((x) => <Card key={x} className="border-white/10 bg-white/[0.02] p-2 text-xs">{x}</Card>)}
        </div>
      </Section>
      <Section title="Next-quarter strategic priorities">
        <ol className="list-decimal space-y-1 pl-5 text-xs">{r.next_priorities.map((x) => <li key={x}>{x}</li>)}</ol>
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/reporting")({
  head: () => ({ meta: [{ title: "Value Reporting · V14" }] }),
  component: Page,
});
