import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CARRIER_MARKETPLACE, MARKETPLACE_BIDS, CARRIER_DISPUTES } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace Scale · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Store className="size-6 text-sky-300" />} title="Carrier Marketplace Scale"
      blurb="Search, filter, bid, award, communicate, settle, dispute and suspend across the carrier marketplace.">
      <div className="grid gap-3 md:grid-cols-4">
        {Object.entries(CARRIER_MARKETPLACE).map(([k,v]) => (
          <Card key={k} className="border-white/10 bg-white/[0.02] p-3">
            <div className="text-xs uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
            <div className="mt-1 text-xl font-semibold">{v}</div>
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Bid comparison · LD-9821</h3>
        <div className="mt-2 space-y-1 text-sm">
          {MARKETPLACE_BIDS.map(b => (
            <div key={b.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
              <div>{b.carrier} <span className="text-xs text-muted-foreground">ETA {b.eta} · perf {b.perf} · comp {b.compliance}</span></div>
              <div className="font-mono">${b.rate}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Open disputes</h3>
        <ul className="mt-2 space-y-1 text-sm">{CARRIER_DISPUTES.map(d => (
          <li key={d.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <span>{d.carrier} · {d.load} — {d.reason}</span>
            <Badge variant="outline" className="border-white/15">{d.status}</Badge>
          </li>))}
        </ul>
      </Card>
    </V4Page>
  ),
});
