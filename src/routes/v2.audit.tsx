import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AUDIT_LOG } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/audit")({
  head: () => ({ meta: [{ title: "Audit · Anderoute" }] }),
  component: Page,
});

function tone(action: string) {
  if (action.startsWith("support.")) return "border-sky-500/30 text-sky-300";
  if (action.startsWith("billing.")) return "border-amber-500/30 text-amber-300";
  if (action.startsWith("api_key.")) return "border-violet-500/30 text-violet-300";
  if (action.startsWith("feature_flag.")) return "border-emerald-500/30 text-emerald-300";
  return "border-white/15 text-muted-foreground";
}

function Page() {
  return (
    <V2Page
      icon={<ScrollText className="size-6 text-violet-300" />}
      title="Audit Log"
      blurb="API keys, webhooks, billing changes, integration changes, feature flag changes, and support access — all with actor, target, and timestamp."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Recent events</h2>
        <div className="mt-3 space-y-1.5 text-sm">
          {AUDIT_LOG.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div className="text-xs text-muted-foreground">{r.at} · {r.actor}</div>
                <div className="font-mono text-xs">{r.target}</div>
              </div>
              <Badge variant="outline" className={tone(r.action)}>{r.action}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </V2Page>
  );
}
