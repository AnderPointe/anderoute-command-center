import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REVENUE_BY_LINE, RENEWALS, EXPANSIONS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/enterprise-revenue")({
  head: () => ({ meta: [{ title: "Enterprise Revenue · Anderoute" }] }),
  component: () => (
    <V4Page icon={<DollarSign className="size-6 text-sky-300" />} title="Enterprise Revenue Operations"
      blurb="MRR by product line, renewals, expansion pipeline, churn risk and net revenue retention placeholders.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue by line</h3>
        <ul className="mt-2 space-y-1 text-sm">{REVENUE_BY_LINE.map(r => (
          <li key={r.line} className="flex justify-between rounded border border-white/10 bg-black/20 p-2">
            <span>{r.line}</span><span className="font-mono">${r.mrr.toLocaleString()}</span>
          </li>))}
        </ul>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Renewals</h3>
          <ul className="mt-2 space-y-1 text-sm">{RENEWALS.map(r => (
            <li key={r.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
              <div><div>{r.customer}</div><div className="text-xs text-muted-foreground">${r.arr.toLocaleString()} · {r.renewal}</div></div>
              <Badge variant="outline" className={r.status === "at_risk" ? "border-amber-400/40 text-amber-300" : "border-white/15"}>{r.status}</Badge>
            </li>))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Expansion</h3>
          <ul className="mt-2 space-y-1 text-sm">{EXPANSIONS.map(x => (
            <li key={x.id} className="flex justify-between rounded border border-white/10 bg-black/20 p-2">
              <span>{x.customer} · {x.opp}</span><span className="font-mono">${x.amount.toLocaleString()}</span>
            </li>))}
          </ul>
        </Card>
      </div>
    </V4Page>
  ),
});
