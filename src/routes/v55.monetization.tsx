import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { ScoreCard, SimpleTable } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useEcosystemMonetization } from "@/v55/hooks";

export const Route = createFileRoute("/v55/monetization")({
  head: () => ({ meta: [{ title: "Ecosystem Monetization · Anderoute V5.5" }] }),
  component: () => {
    const { lines, score } = useEcosystemMonetization();
    const totalArr = lines.reduce((s, l) => s + l.arr, 0);
    return (
      <V55Page icon={<DollarSign className="size-6 text-amber-300" />} title="Ecosystem Monetization Dashboard"
        blurb="Every revenue line tracked: SaaS, usage, seats, marketplace fees, carrier subs, API, EDI, partner share, enterprise services, premium analytics and add-ons. ARR figures are placeholders.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Monetization score" value={score} tone="emerald" />
          <Card className="border-white/10 bg-white/[0.02] p-4 md:col-span-2">
            <div className="text-xs uppercase text-muted-foreground">Total ARR (placeholder $M)</div>
            <div className="mt-1 text-3xl font-semibold">${totalArr.toFixed(2)}M</div>
            <div className="mt-1 text-[11px] text-muted-foreground">Sum across {lines.length} revenue lines</div>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={lines} columns={[
            { key: "line",     label: "Revenue line" },
            { key: "arr",      label: "ARR ($M)" },
            { key: "growth",   label: "Growth" },
            { key: "maturity", label: "Maturity" },
          ]} />
          <p className="mt-2 text-[10px] text-muted-foreground">All revenue numbers are mock placeholders, not audited figures.</p>
        </Card>
      </V55Page>
    );
  },
});
