import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { KpiGrid } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useMarketplaceEconomics } from "@/v55/hooks";

export const Route = createFileRoute("/v55/marketplace-econ")({
  head: () => ({ meta: [{ title: "Marketplace Economics · Anderoute V5.5" }] }),
  component: () => {
    const { kpis, trend } = useMarketplaceEconomics();
    return (
      <V55Page icon={<Store className="size-6 text-amber-300" />} title="Marketplace Economics Command Center"
        blurb="GMV, take rate, average fees, coverage, bids per load, time-to-award, carrier acquisition cost, retention, and marketplace margin. All economic figures are placeholders.">
        <KpiGrid cols={4} items={[
          { label: "GMV (placeholder)", value: `$${kpis.gmv_placeholder_usd_m}M`, sub: "trailing 90d" },
          { label: "Take rate",          value: `${kpis.take_rate_pct}%`,         sub: "placeholder" },
          { label: "Avg load value",     value: `$${kpis.avg_load_value}`,        sub: "" },
          { label: "Avg fee",            value: `$${kpis.avg_fee}`,               sub: "" },
          { label: "Coverage",           value: `${kpis.coverage_rate}%`,         sub: "" },
          { label: "Bids/load",          value: kpis.bids_per_load,               sub: "avg" },
          { label: "Time to 1st bid",    value: `${kpis.time_to_first_bid_min}m`, sub: "median" },
          { label: "Time to award",      value: `${kpis.time_to_award_min}m`,     sub: "median" },
          { label: "CAC (placeholder)",  value: `$${kpis.cac_placeholder}`,       sub: "carrier" },
          { label: "Carrier retention",  value: `${kpis.carrier_retention_pct}%`, sub: "" },
          { label: "Customer adoption",  value: `${kpis.customer_adoption_pct}%`, sub: "" },
          { label: "Margin (placeholder)", value: `${kpis.margin_placeholder_pct}%`, sub: "" },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Economics trend</h3>
          <div className="mt-2 grid gap-2 text-xs">
            {trend.map(t => (
              <div key={t.week} className="grid grid-cols-[50px_1fr_60px_60px_60px] items-center gap-2">
                <span className="text-muted-foreground">{t.week}</span>
                <div className="h-2 rounded bg-white/5">
                  <div className="h-full rounded bg-amber-400/60" style={{ width: `${(t.take / 6) * 100}%` }} />
                </div>
                <span>{t.take}% take</span>
                <span>{t.bids} bids</span>
                <span>{t.award}m award</span>
              </div>
            ))}
          </div>
        </Card>
      </V55Page>
    );
  },
});
