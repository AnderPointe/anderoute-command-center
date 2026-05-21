import { createFileRoute } from "@tanstack/react-router";
import { Coins } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { PARTNER_REVENUE } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/partner-revenue")({
  head: () => ({ meta: [{ title: "Partner Revenue · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Coins className="size-6 text-sky-300" />} title="Partner Revenue Operations"
      blurb="Partner revenue share, API/carrier/integration partner revenue, billing events and partner payout placeholders.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground"><tr>
              {["Partner","Type","Share","Last period"].map(h => <th key={h} className="px-2 py-1 text-left">{h}</th>)}
            </tr></thead>
            <tbody>{PARTNER_REVENUE.map(p => (
              <tr key={p.partner} className="border-t border-white/10">
                <td className="px-2 py-1 font-medium">{p.partner}</td>
                <td className="px-2 py-1">{p.type}</td>
                <td className="px-2 py-1">{(p.share*100).toFixed(2)}%</td>
                <td className="px-2 py-1 font-mono">${p.last_period.toLocaleString()}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </Card>
    </V4Page>
  ),
});
