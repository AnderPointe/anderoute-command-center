import { createFileRoute, Link } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_SCOPES, API_RATE_LIMITS } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/api-marketplace")({
  head: () => ({ meta: [{ title: "API Marketplace · Anderoute" }] }),
  component: Page,
});

const riskTone: Record<string, string> = {
  low: "border-emerald-500/30 text-emerald-300",
  med: "border-amber-500/30 text-amber-300",
  high: "border-rose-500/30 text-rose-300",
};

function Page() {
  return (
    <V2Page
      icon={<KeyRound className="size-6 text-violet-300" />}
      title="API Marketplace Beta"
      blurb="Create scoped, audited API keys for integrators. Keys are shown plaintext once, then stored as a hash. Rate limiting is a placeholder for V2.5."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Available scopes</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {API_SCOPES.map((s) => (
            <div key={s.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs">{s.id}</span>
                <Badge variant="outline" className={riskTone[s.risk]}>{s.risk}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">Documentation</h2>
        <div className="mt-2 grid gap-1">
          <div><span className="font-mono text-xs">GET /v1/tracking/:shipmentId</span> — public tracking (tracking.read)</div>
          <div><span className="font-mono text-xs">POST /v1/loads</span> — create load (loads.write)</div>
          <div><span className="font-mono text-xs">PATCH /v1/shipments/:id</span> — update shipment status (shipments.write)</div>
          <div><span className="font-mono text-xs">POST /v1/reports/:key</span> — run advanced report (reports.read)</div>
          <div><span className="font-mono text-xs">POST /v1/webhooks</span> — manage subscriptions (webhooks.manage)</div>
        </div>
        <div className="mt-3 text-xs">
          Manage keys → <Link to="/v2/api-keys" className="text-violet-300 hover:underline">API Keys</Link>
        </div>
      </Card>
    </V2Page>
  );
}
