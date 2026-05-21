import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { ScoreCard, KpiGrid } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useMarketLeadership, usePlatformDefensibility, useEcosystemMonetization, useMarketplaceEconomics } from "@/v55/hooks";

export const Route = createFileRoute("/v55/overview")({
  head: () => ({ meta: [{ title: "V5.5 Overview · Anderoute" }] }),
  component: () => {
    const { leadership } = useMarketLeadership();
    const { defensibility } = usePlatformDefensibility();
    const { score: mon } = useEcosystemMonetization();
    const { kpis } = useMarketplaceEconomics();
    return (
      <V55Page icon={<Gauge className="size-6 text-amber-300" />} title="Anderoute V5.5 Market Leadership"
        blurb="Defensible national platform with multiple revenue lines, mature marketplace strategy, strategic partnerships, board-ready operating metrics and acquisition readiness.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Leadership" value={leadership.overall} tone="amber" />
          <ScoreCard label="Defensibility" value={defensibility.overall} tone="violet" />
          <ScoreCard label="Monetization" value={mon} tone="emerald" />
          <ScoreCard label="Category" value={leadership.category} tone="sky" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Marketplace coverage", value: `${kpis.coverage_rate}%`, sub: "Last 7d" },
          { label: "Take rate", value: `${kpis.take_rate_pct}%`, sub: "placeholder" },
          { label: "Bids / load", value: kpis.bids_per_load, sub: "avg" },
          { label: "Time to award", value: `${kpis.time_to_award_min}m`, sub: "median" },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <h2 className="font-semibold">Jump in</h2>
          <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-3">
            <li>· <Link to="/v55/leadership" className="text-amber-300 hover:underline">Market Leadership</Link></li>
            <li>· <Link to="/v55/defensibility" className="text-amber-300 hover:underline">Defensibility</Link></li>
            <li>· <Link to="/v55/marketplace-econ" className="text-amber-300 hover:underline">Marketplace Economics</Link></li>
            <li>· <Link to="/v55/board" className="text-amber-300 hover:underline">Board Reporting</Link></li>
            <li>· <Link to="/v55/narrative" className="text-amber-300 hover:underline">Category Narrative</Link></li>
            <li>· <Link to="/v55/demo" className="text-amber-300 hover:underline">Demo Flow</Link></li>
          </ul>
        </Card>
      </V55Page>
    );
  },
});
