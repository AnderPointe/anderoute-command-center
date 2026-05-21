import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NATIONAL_COVERAGE, COVERAGE_GAPS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/network")({
  head: () => ({ meta: [{ title: "National Network · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Network className="size-6 text-sky-300" />} title="National Carrier Network Readiness"
      blurb="Regional coverage and equipment density across hotshot, box truck, cargo van, freight, flatbed and reefer.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground"><tr>
              {["Region","Hotshot","Box","Van","Freight","Flatbed","Reefer","Gap"].map(h => <th key={h} className="px-2 py-1 text-left">{h}</th>)}
            </tr></thead>
            <tbody>{NATIONAL_COVERAGE.map(r => (
              <tr key={r.region} className="border-t border-white/10">
                <td className="px-2 py-1 font-medium">{r.region}</td>
                <td className="px-2 py-1">{r.hotshot}</td><td className="px-2 py-1">{r.box}</td>
                <td className="px-2 py-1">{r.van}</td><td className="px-2 py-1">{r.freight}</td>
                <td className="px-2 py-1">{r.flatbed}</td><td className="px-2 py-1">{r.reefer}</td>
                <td className="px-2 py-1">{r.gap ? <Badge variant="outline" className="border-amber-400/40 text-amber-300">gap</Badge> : "—"}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Recommendations</h3>
        <ul className="mt-2 space-y-1 text-sm">{COVERAGE_GAPS.map((g,i) => (
          <li key={i} className="rounded border border-white/10 bg-black/20 p-2">
            <div className="font-medium">{g.region} · {g.priority}</div>
            <div className="text-xs text-muted-foreground">{g.recommendation}</div>
          </li>))}
        </ul>
      </Card>
    </V4Page>
  ),
});
