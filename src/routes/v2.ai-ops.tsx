import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { OPS_ISSUES, opsHealthScore, v2Stats } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/ai-ops")({
  head: () => ({ meta: [{ title: "AI Operations · Anderoute" }] }),
  component: Page,
});

const levelTone: Record<string, string> = {
  low: "border-white/15 text-muted-foreground",
  moderate: "border-sky-500/30 text-sky-300",
  high: "border-amber-500/30 text-amber-300",
  critical: "border-rose-500/30 text-rose-300",
};

function Page() {
  const s = v2Stats();
  const health = opsHealthScore();
  const cats = Array.from(new Set(OPS_ISSUES.map((i) => i.category)));
  return (
    <V2Page
      icon={<Brain className="size-6 text-violet-300" />}
      title="AI Operations Intelligence"
      blurb="One dashboard for dispatchers and managers — at-risk loads, drivers needing attention, customers needing updates, GPS, route, integration, webhook, EDI, and billing issues."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Operations health" value={`${health}`} hint="100 = clean" tone={health >= 80 ? "good" : health >= 60 ? "warn" : "bad"} />
        <StatTile label="Critical risks" value={s.risksCritical} tone={s.risksCritical ? "bad" : "good"} />
        <StatTile label="Approvals pending" value={s.approvalsPending} tone={s.approvalsPending ? "warn" : "good"} />
        <StatTile label="Integrations failing" value={s.webhookFailing + s.ediErrors} hint={`${s.webhookFailing} webhooks · ${s.ediErrors} EDI`} tone={s.webhookFailing + s.ediErrors ? "warn" : "good"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Dispatch focus queue</h2>
        <div className="mt-2 space-y-1.5 text-sm">
          {OPS_ISSUES.slice().sort((a, b) => {
            const o = { critical: 0, high: 1, moderate: 2, low: 3 } as const;
            return o[a.level] - o[b.level];
          }).map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{i.category} · {i.at}</div>
                <div>{i.title}</div>
                <div className="text-xs text-muted-foreground">{i.detail}</div>
              </div>
              <Badge variant="outline" className={levelTone[i.level]}>{i.level}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        Categories tracked: {cats.join(" · ")}
      </Card>
    </V2Page>
  );
}
