import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { ScoreCard } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePlatformDefensibility, useDefensibilityTrend } from "@/v55/hooks";

export const Route = createFileRoute("/v55/defensibility")({
  head: () => ({ meta: [{ title: "Defensibility · Anderoute V5.5" }] }),
  component: () => {
    const { defensibility } = usePlatformDefensibility();
    const { trend } = useDefensibilityTrend();
    const items = Object.entries(defensibility).filter(([k]) => k !== "overall") as [string, number][];
    const ranked = [...items].sort((a, b) => b[1] - a[1]);
    return (
      <V55Page icon={<Shield className="size-6 text-amber-300" />} title="Platform Defensibility Dashboard"
        blurb="Workflow, data, marketplace, integration, compliance, brand, enterprise, partner, mobile, portal and AI ops moats with strength, evidence and competitor risk.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Overall defensibility" value={defensibility.overall} tone="violet" />
          {items.slice(0, 7).map(([k, v]) => <ScoreCard key={k} label={k.replace(/_/g, " ")} value={v} tone="sky" />)}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.02] p-4 md:col-span-2">
            <h3 className="text-sm font-semibold">Defensibility ranking</h3>
            <div className="mt-3 space-y-2">
              {ranked.map(([k, v]) => (
                <div key={k}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="capitalize text-muted-foreground">{k.replace(/_/g, " ")}</span>
                    <span className={v >= 85 ? "text-emerald-300" : v >= 78 ? "text-sky-300" : "text-amber-300"}>{v}</span>
                  </div>
                  <Progress value={v} className="mt-1 h-1.5" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Trend (4 quarters)</h3>
            <div className="mt-3 flex items-end gap-2 h-40">
              {trend.map(p => (
                <div key={p.q} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-violet-400/60" style={{ height: `${p.score}%` }} />
                  <div className="text-[10px] text-muted-foreground">{p.q}</div>
                  <div className="text-[10px] text-violet-200">{p.score}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">Strongest moats are enterprise workflows, switching costs and EDI/API. Weakest is brand maturity.</p>
          </Card>
        </div>
      </V55Page>
    );
  },
});
