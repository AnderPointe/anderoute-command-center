import { createFileRoute } from "@tanstack/react-router";
import { ListOrdered } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V1_FEATURES, PRIORITY_LABEL, PRIORITY_TONE } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/prioritization")({
  head: () => ({ meta: [{ title: "V1 Prioritization · Anderoute" }] }),
  component: Page,
});

function Page() {
  const scored = V1_FEATURES
    .map((f) => ({ ...f, score: f.value * 2 - f.effort }))
    .sort((a, b) => b.score - a.score);
  const top = scored.filter((f) => f.priority === "must" || f.priority === "should").slice(0, 3);
  return (
    <V1Page
      icon={<ListOrdered className="size-6 text-indigo-300" />}
      title="V1 Prioritization Matrix"
      blurb="Score = value × 2 − effort. Higher score = stronger V1 candidate. Cutline (must/should) is applied independently."
    >
      <Card className="border-emerald-500/20 bg-emerald-500/5 p-4">
        <h2 className="text-sm font-semibold text-emerald-200">Top 3 V1 bets</h2>
        <div className="mt-2 grid gap-2 md:grid-cols-3">
          {top.map((f) => (
            <div key={f.id} className="rounded-lg border border-emerald-500/20 bg-black/20 p-3 text-sm">
              <div className="font-semibold">{f.name}</div>
              <div className="text-xs text-muted-foreground">{f.area} · score {f.score}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase text-muted-foreground">
                <th className="px-2 py-1 text-left">Feature</th>
                <th className="px-2 py-1 text-left">Area</th>
                <th className="px-2 py-1">Value</th>
                <th className="px-2 py-1">Effort</th>
                <th className="px-2 py-1">Score</th>
                <th className="px-2 py-1 text-right">Priority</th>
              </tr>
            </thead>
            <tbody>
              {scored.map((f) => (
                <tr key={f.id} className="border-t border-white/10">
                  <td className="px-2 py-1.5">{f.name}</td>
                  <td className="px-2 py-1.5 text-xs text-muted-foreground">{f.area}</td>
                  <td className="px-2 py-1.5 text-center font-mono">{f.value}</td>
                  <td className="px-2 py-1.5 text-center font-mono">{f.effort}</td>
                  <td className={`px-2 py-1.5 text-center font-mono ${f.score >= 7 ? "text-emerald-300" : f.score >= 4 ? "text-sky-300" : "text-muted-foreground"}`}>{f.score}</td>
                  <td className="px-2 py-1.5 text-right">
                    <Badge variant="outline" className={PRIORITY_TONE[f.priority]}>{PRIORITY_LABEL[f.priority]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </V1Page>
  );
}
