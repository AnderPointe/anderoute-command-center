import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARTNER_LAUNCHES } from "@/v4/data/mockPhase21";

const STAGES = ["Identified","Contacted","Discovery","Technical Review","Security Review","Commercial Review","Pilot","Launch Ready","Live","Expansion"];

export const Route = createFileRoute("/v4/partners")({
  head: () => ({ meta: [{ title: "Partner Launches · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Handshake className="size-6 text-sky-300" />} title="Strategic Partner Launch Tracker"
      blurb="Pipeline view of carrier, telematics, broker, shipper, API, EDI, billing, support and hardware partners.">
      <div className="grid gap-2 md:grid-cols-5">
        {STAGES.map(s => (
          <Card key={s} className="border-white/10 bg-white/[0.02] p-3">
            <div className="text-xs uppercase text-muted-foreground">{s}</div>
            <div className="mt-2 space-y-1 text-sm">
              {PARTNER_LAUNCHES.filter(p => p.stage === s).map(p => (
                <div key={p.id} className="rounded border border-white/10 bg-black/20 p-2">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.type} · {p.owner}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">All partners</h3>
        <div className="mt-2 grid gap-1 text-sm">
          {PARTNER_LAUNCHES.map(p => (
            <div key={p.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
              <span>{p.name} <span className="text-xs text-muted-foreground">({p.type})</span></span>
              <Badge variant="outline" className="border-white/15">{p.stage}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V4Page>
  ),
});
