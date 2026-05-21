import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { ScoreCard, SimpleTable } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useEcosystemMonetization, useMonetizationTrend } from "@/v55/hooks";

export const Route = createFileRoute("/v55/monetization")({
  head: () => ({ meta: [{ title: "Ecosystem Monetization · Anderoute V5.5" }] }),
  component: () => {
    const { lines, score } = useEcosystemMonetization();
    const { trend } = useMonetizationTrend();
    const totalArr = lines.reduce((s, l) => s + l.arr, 0);
    const topLines = [...lines].sort((a, b) => b.arr - a.arr).slice(0, 6);
    const maxArr = Math.max(...lines.map(l => l.arr));
    const maxTrend = Math.max(...trend.map(t => t.arr_m));
    return (
      <V55Page icon={<DollarSign className="size-6 text-amber-300" />} title="Ecosystem Monetization Dashboard"
        blurb="Every revenue line tracked: SaaS, usage, seats, marketplace fees, carrier subs, API, EDI, partner share, enterprise services, premium analytics and add-ons. ARR figures are placeholders.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Monetization score" value={score} tone="emerald" />
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-[10px] uppercase text-muted-foreground">Total ARR (placeholder $M)</div>
            <div className="mt-1 text-2xl font-semibold">${totalArr.toFixed(2)}M</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{lines.length} revenue lines</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-[10px] uppercase text-muted-foreground">Mature lines</div>
            <div className="mt-1 text-2xl font-semibold">{lines.filter(l => l.maturity === "mature").length}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">growing: {lines.filter(l => l.maturity === "growing").length} · early: {lines.filter(l => l.maturity === "early").length}</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-[10px] uppercase text-muted-foreground">Latest growth</div>
            <div className="mt-1 text-2xl font-semibold">+{trend[trend.length - 1].growth}%</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">QoQ ARR</div>
          </Card>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Top revenue lines by ARR</h3>
            <div className="mt-3 space-y-2 text-xs">
              {topLines.map(l => (
                <div key={l.line} className="grid grid-cols-[1fr_60px_50px] items-center gap-2">
                  <div className="text-muted-foreground truncate">{l.line}</div>
                  <div className="relative h-2 rounded bg-white/5">
                    <div className="absolute inset-y-0 left-0 rounded bg-emerald-400/70" style={{ width: `${(l.arr / maxArr) * 100}%` }} />
                  </div>
                  <span className="text-right text-emerald-300">${l.arr}M</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">ARR trend (QoQ)</h3>
            <div className="mt-3 flex items-end gap-3 h-32">
              {trend.map(t => (
                <div key={t.q} className="flex flex-1 flex-col items-center gap-1">
                  <div className="text-[10px] text-emerald-200">${t.arr_m}M</div>
                  <div className="w-full rounded-t bg-emerald-400/60" style={{ height: `${(t.arr_m / maxTrend) * 100}%` }} />
                  <div className="text-[10px] text-muted-foreground">{t.q}</div>
                  <div className="text-[10px] text-muted-foreground">+{t.growth}%</div>
                </div>
              ))}
            </div>
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
