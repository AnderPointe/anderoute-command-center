import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { CARRIER_PERFORMANCE, PERFORMANCE_SCORE_WEIGHTS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/carrier-performance")({
  head: () => ({ meta: [{ title: "Carrier Performance · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Trophy className="size-6 text-amber-300" />} title="Carrier Performance Score"
      blurb="On-time pickup/delivery, acceptance, cancellation, POD completion, and composite score with transparent weights.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Score weights</h3>
        <div className="mt-2 grid gap-1.5 text-sm md:grid-cols-3">{PERFORMANCE_SCORE_WEIGHTS.map((w) => (
          <div key={w.factor} className="flex justify-between rounded border border-white/10 bg-black/20 px-2 py-1"><span>{w.factor}</span><span className="font-mono text-xs text-amber-300">{Math.round(w.weight * 100)}%</span></div>
        ))}</div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-1">Carrier</th><th className="p-1">OT Pickup</th><th className="p-1">OT Del</th><th className="p-1">Accept</th><th className="p-1">Cancel</th><th className="p-1">POD</th><th className="p-1">Score</th></tr>
          </thead>
          <tbody>{CARRIER_PERFORMANCE.map((c) => (
            <tr key={c.carrier} className="border-t border-white/10">
              <td className="p-1">{c.carrier}</td><td className="p-1 font-mono">{c.on_time_pu}%</td><td className="p-1 font-mono">{c.on_time_del}%</td>
              <td className="p-1 font-mono">{c.acceptance}%</td><td className="p-1 font-mono">{c.cancel}%</td><td className="p-1 font-mono">{c.pod}%</td>
              <td className="p-1 font-mono text-amber-300">{c.score}</td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
