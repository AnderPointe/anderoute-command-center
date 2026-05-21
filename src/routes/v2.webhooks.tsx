import { createFileRoute } from "@tanstack/react-router";
import { Webhook } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WEBHOOK_EVENTS, WEBHOOK_SUBS, WEBHOOK_DELIVERIES, WEBHOOK_SIGNING_SPEC, WEBHOOK_RETRY_POLICY } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/webhooks")({
  head: () => ({ meta: [{ title: "Webhooks V2 · Anderoute" }] }),
  component: Page,
});

const stTone: Record<string, string> = {
  ok: "border-emerald-500/30 text-emerald-300",
  retry: "border-amber-500/30 text-amber-300",
  failed: "border-rose-500/30 text-rose-300",
};

function Page() {
  return (
    <V2Page
      icon={<Webhook className="size-6 text-violet-300" />}
      title="Webhook Manager V2"
      blurb="17 event types, per-endpoint subscriptions, HMAC-signed payloads, delivery log, retry queue, and a payload preview drawer."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Supported events ({WEBHOOK_EVENTS.length})</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {WEBHOOK_EVENTS.map((e) => (
            <Badge key={e} variant="outline" className="border-white/15 text-xs font-mono">{e}</Badge>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Subscriptions</h2>
        <div className="mt-3 space-y-2 text-sm">
          {WEBHOOK_SUBS.map((s) => (
            <div key={s.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-mono text-xs">{s.endpoint}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {s.events.map((e) => (
                      <Badge key={e} variant="outline" className="border-white/15 text-[10px] font-mono">{e}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={s.enabled ? "border-emerald-500/30 text-emerald-300" : "border-white/15 text-muted-foreground"}>
                    {s.enabled ? "enabled" : "disabled"}
                  </Badge>
                  <div className="mt-1 text-xs text-muted-foreground">{s.successPct}% · {s.lastDelivery}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent deliveries</h2>
          <Button size="sm" variant="outline" className="h-8 text-xs">Retry failed</Button>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="p-2">Sub</th><th className="p-2">Event</th><th className="p-2">Status</th><th className="p-2">Attempts</th><th className="p-2">Last code</th><th className="p-2">At</th></tr>
            </thead>
            <tbody>
              {WEBHOOK_DELIVERIES.map((d) => (
                <tr key={d.id} className="border-t border-white/10">
                  <td className="p-2 font-mono text-xs">{d.sub}</td>
                  <td className="p-2 font-mono text-xs">{d.event}</td>
                  <td className="p-2"><Badge variant="outline" className={stTone[d.status]}>{d.status}</Badge></td>
                  <td className="p-2">{d.attempts}</td>
                  <td className="p-2">{d.lastCode}</td>
                  <td className="p-2 text-xs text-muted-foreground">{d.at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </V2Page>
  );
}
