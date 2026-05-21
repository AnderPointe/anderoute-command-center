import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DRIVER_BEHAVIOR, DRIVER_COACHING_PLAN } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/driver-behavior")({
  head: () => ({ meta: [{ title: "Driver Behavior · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Gauge className="size-6 text-amber-300" />} title="Driver Behavior (placeholder)"
      blurb="Composite behavior score from speeding, harsh braking/acceleration, and idle time. Coaching plans require human review.">
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Placeholder</Badge>{" "}
        Behavior scoring is illustrative and is never used for automated discipline.
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Driver</th><th className="p-1">Speed</th><th className="p-1">H-Brake</th><th className="p-1">H-Accel</th><th className="p-1">Idle</th><th className="p-1">Score</th><th className="p-1">Coaching</th></tr></thead>
          <tbody>{DRIVER_BEHAVIOR.map((d) => (
            <tr key={d.driver} className="border-t border-white/10">
              <td className="p-1">{d.driver}</td><td className="p-1 font-mono">{d.speeding}</td><td className="p-1 font-mono">{d.harsh_brake}</td><td className="p-1 font-mono">{d.harsh_accel}</td><td className="p-1 font-mono">{d.idle}m</td><td className="p-1 font-mono text-amber-300">{d.score}</td>
              <td className="p-1">{d.coaching ? <Badge variant="outline" className="border-amber-500/40 text-amber-300">opportunity</Badge> : <span className="text-xs text-muted-foreground">—</span>}</td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Coaching plan (human-reviewed)</h3>
        <ul className="mt-2 space-y-1 text-sm">{DRIVER_COACHING_PLAN.map((c) => (
          <li key={c.driver} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
            <span>{c.driver} — <span className="text-xs text-muted-foreground">{c.focus}</span></span>
            <span className="font-mono text-xs">{c.sessions} sessions · <span className="text-amber-300">{c.status}</span></span>
          </li>
        ))}</ul>
      </Card>
    </V35Page>
  ),
});
