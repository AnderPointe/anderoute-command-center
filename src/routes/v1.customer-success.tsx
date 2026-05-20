import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CUSTOMER_SUCCESS_ACCOUNTS } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/customer-success")({
  head: () => ({ meta: [{ title: "Customer Success · Anderoute" }] }),
  component: Page,
});

function Page() {
  const avgHealth = Math.round(
    CUSTOMER_SUCCESS_ACCOUNTS.reduce((a, b) => a + b.health, 0) / CUSTOMER_SUCCESS_ACCOUNTS.length,
  );
  const atRisk = CUSTOMER_SUCCESS_ACCOUNTS.filter((a) => a.health < 70).length;
  const openTickets = CUSTOMER_SUCCESS_ACCOUNTS.reduce((a, b) => a + b.openTickets, 0);
  return (
    <V1Page
      icon={<HeartHandshake className="size-6 text-indigo-300" />}
      title="Customer Success Health"
      blurb="Account health blends adoption, ticket load, training progress, and renewal risk. <70 = at risk and triggers CS outreach."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Accounts" value={CUSTOMER_SUCCESS_ACCOUNTS.length} />
        <StatTile label="Avg health" value={avgHealth} tone={avgHealth >= 80 ? "good" : avgHealth >= 60 ? "warn" : "bad"} />
        <StatTile label="At risk (<70)" value={atRisk} tone={atRisk ? "warn" : "good"} />
        <StatTile label="Open tickets" value={openTickets} tone={openTickets ? "warn" : "good"} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {CUSTOMER_SUCCESS_ACCOUNTS.map((a) => {
          const tone = a.health >= 80 ? "emerald" : a.health >= 60 ? "amber" : "rose";
          const toneCls = tone === "emerald" ? "border-emerald-500/30 text-emerald-300" : tone === "amber" ? "border-amber-500/30 text-amber-300" : "border-rose-500/30 text-rose-300";
          return (
            <Card key={a.id} className="border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">{a.name}</h2>
                <Badge variant="outline" className={toneCls}>health {a.health}</Badge>
              </div>
              <Progress value={a.health} className="mt-2 h-1.5" />
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg border border-white/10 bg-black/20 p-2"><div className="text-xs text-muted-foreground">Drivers</div><div className="font-mono">{a.drivers}</div></div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2"><div className="text-xs text-muted-foreground">Dispatchers</div><div className="font-mono">{a.dispatchers}</div></div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2"><div className="text-xs text-muted-foreground">Portal users</div><div className="font-mono">{a.portalUsers}</div></div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2"><div className="text-xs text-muted-foreground">Open tickets</div><div className="font-mono">{a.openTickets}</div></div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2"><div className="text-xs text-muted-foreground">Feature requests</div><div className="font-mono">{a.featureRequests}</div></div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2"><div className="text-xs text-muted-foreground">Training</div><div className="font-mono">{Math.round(a.trainingComplete * 100)}%</div></div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Renewal risk: <span className="text-foreground">{a.renewalRisk}</span> · Expansion: <span className="text-foreground">{a.expansion}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </V1Page>
  );
}
