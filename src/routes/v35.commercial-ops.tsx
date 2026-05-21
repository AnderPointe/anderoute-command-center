import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { COMMERCIAL_OPS, COMMERCIAL_OPS_TRENDS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/commercial-ops")({
  head: () => ({ meta: [{ title: "Commercial Operations · Anderoute V3.5" }] }),
  component: () => {
    const o = COMMERCIAL_OPS;
    const cards = [
      ["Active subscriptions", o.active_subscriptions], ["Carrier subscriptions", o.carrier_subscriptions],
      ["Marketplace revenue", `$${o.marketplace_rev}`], ["API revenue", `$${o.api_rev}`],
      ["Implementation fees", `$${o.implementation_fees}`], ["Trial conversions", `${Math.round(o.trial_conversions * 100)}%`],
      ["Paid customers", o.paid_customers], ["Enterprise pipeline", o.enterprise_pipeline],
      ["Expansion revenue", `$${o.expansion_rev}`], ["Churn risk accts", o.churn_risk],
      ["Support cost (mo)", `$${o.support_cost}`],
    ] as const;
    const maxMrr = Math.max(...COMMERCIAL_OPS_TRENDS.map((t) => t.mrr));
    return (
      <V35Page icon={<Activity className="size-6 text-amber-300" />} title="Commercial Operations Dashboard"
        blurb="Aggregate SaaS, marketplace, API, implementation, and customer health into one operating view.">
        <div className="grid gap-3 md:grid-cols-4">
          {cards.map(([l, v]) => (
            <Card key={l} className="border-white/10 bg-white/[0.02] p-3">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{l}</div>
              <div className="mt-1 text-xl font-semibold">{v as any}</div>
            </Card>
          ))}
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">MRR trend (4 wks)</h3>
          <div className="mt-2 space-y-1.5">{COMMERCIAL_OPS_TRENDS.map((t) => (
            <div key={t.week} className="rounded border border-white/10 bg-black/20 p-2">
              <div className="flex items-center justify-between text-sm"><span>{t.week}</span><span className="font-mono text-amber-300">${t.mrr.toLocaleString()}</span></div>
              <div className="mt-1 h-1.5 overflow-hidden rounded bg-white/5"><div className="h-full bg-amber-400/60" style={{ width: `${(t.mrr / maxMrr) * 100}%` }} /></div>
              <div className="mt-1 text-xs text-muted-foreground">Churn {t.churn} · Expansion ${t.expansion}</div>
            </div>
          ))}</div>
        </Card>
      </V35Page>
    );
  },
});
