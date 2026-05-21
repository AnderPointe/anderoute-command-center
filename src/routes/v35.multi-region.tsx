import { createFileRoute } from "@tanstack/react-router";
import { MapPinned } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REGIONAL_METRICS, REGION_RECOMMENDATIONS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/multi-region")({
  head: () => ({ meta: [{ title: "Multi-Region Operations · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<MapPinned className="size-6 text-amber-300" />} title="Multi-Region Operations"
      blurb="Drivers, loads, carriers, and on-time performance per region, with coverage-gap recommendations.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Region</th><th className="p-1">Drivers</th><th className="p-1">Loads</th><th className="p-1">Carriers</th><th className="p-1">On-time</th><th className="p-1">Coverage</th></tr></thead>
          <tbody>{REGIONAL_METRICS.map((r) => (
            <tr key={r.region} className="border-t border-white/10">
              <td className="p-1">{r.region}</td><td className="p-1 font-mono">{r.drivers}</td><td className="p-1 font-mono">{r.loads}</td>
              <td className="p-1 font-mono">{r.carriers}</td><td className="p-1 font-mono">{r.on_time}%</td>
              <td className="p-1"><Badge variant="outline" className={r.gap ? "border-amber-500/40 text-amber-300" : "border-emerald-500/40 text-emerald-300"}>{r.gap ? "gap" : "ok"}</Badge></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Recommendations</h3>
        <ul className="mt-2 space-y-1 text-sm">{REGION_RECOMMENDATIONS.map((r) => (
          <li key={r.region} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
            <span><span className="font-mono text-xs text-amber-300 mr-2">{r.region}</span>{r.rec}</span>
            <Badge variant="outline" className="border-sky-500/40 text-sky-300">{r.owner}</Badge>
          </li>
        ))}</ul>
      </Card>
    </V35Page>
  ),
});
