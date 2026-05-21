import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { V2_SECURITY, V2_RLS_EXAMPLES, V2_EDGE_FN_SEPARATION } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/security")({
  head: () => ({ meta: [{ title: "V2 Security · Anderoute" }] }),
  component: Page,
});

function Page() {
  const ok = V2_SECURITY.filter((s) => s.ok).length;
  const total = V2_SECURITY.length;
  const pct = Math.round((ok / total) * 100);
  const areas = Array.from(new Set(V2_SECURITY.map((s) => s.area)));
  return (
    <V2Page
      icon={<ShieldCheck className="size-6 text-violet-300" />}
      title="V2 Security Review"
      blurb="Approval gates on AI, scoped API keys, HMAC webhook signing, EDI partner scoping, audited enterprise changes, and full company-scoped RLS."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Controls cleared" value={`${ok}/${total}`} tone={pct >= 90 ? "good" : "warn"} />
        <StatTile label="Coverage" value={`${pct}%`} tone={pct >= 90 ? "good" : "warn"} />
        <StatTile label="Open items" value={total - ok} tone={total - ok ? "warn" : "good"} />
      </div>

      {areas.map((a) => (
        <Card key={a} className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">{a}</h2>
          <div className="mt-3 space-y-2 text-sm">
            {V2_SECURITY.filter((s) => s.area === a).map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <div>
                  <div>{s.label}</div>
                  {s.note && <div className="text-xs text-muted-foreground">{s.note}</div>}
                </div>
                <Badge variant="outline" className={s.ok ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                  {s.ok ? "OK" : "Open"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </V2Page>
  );
}
