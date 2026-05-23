import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { Section } from "@/components/v14/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v14/hooks";

function Page() {
  const r = H.useLongTermStrategicOperatingRoadmap();
  return (
    <V14Page icon={<Map className="size-6 text-cyan-300" />} title="Long-Term Strategic Operating Roadmap" blurb="6 horizons: current Q → 36 months.">
      <div className="grid gap-3 md:grid-cols-2">
        {r.map((h) => (
          <Card key={h.horizon} className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-semibold">{h.horizon}</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
              {h.initiatives.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </Card>
        ))}
      </div>
      <Section title="Note">
        <p className="text-xs text-muted-foreground">Roadmap is mock-only. No IPO/acquisition/audit certification timelines are committed.</p>
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/roadmap")({
  head: () => ({ meta: [{ title: "LT Roadmap · V14" }] }),
  component: Page,
});
