import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, ShieldAlert, Server } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_FLOW, RLS_POLICY_EXAMPLES, EDGE_FUNCTION_BOUNDARY } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/demo")({
  head: () => ({ meta: [{ title: "V3.5 Demo Flow · Anderoute" }] }),
  component: () => (
    <V35Page icon={<ListChecks className="size-6 text-amber-300" />} title="V3.5 Demo Flow"
      blurb="End-to-end commercial demo: monetization → verification → marketplace → settlement → telematics → certification → procurement → API → multi-region.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-1.5 text-sm">
          {DEMO_FLOW.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span className="font-mono text-xs text-amber-300">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold"><ShieldAlert className="size-4 text-amber-300" />RLS policy examples</h3>
        <ul className="mt-2 space-y-1 text-sm">{RLS_POLICY_EXAMPLES.map((r) => (
          <li key={r.table} className="rounded border border-white/10 bg-black/20 px-2 py-1.5">
            <div className="font-mono text-xs text-amber-300">{r.table}</div>
            <div className="font-mono text-xs text-muted-foreground">{r.policy}</div>
          </li>
        ))}</ul>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold"><Server className="size-4 text-amber-300" />Edge Function separation</h3>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Function</th><th className="p-1">Runtime</th><th className="p-1">Reason</th></tr></thead>
          <tbody>{EDGE_FUNCTION_BOUNDARY.map((f) => (
            <tr key={f.fn} className="border-t border-white/10">
              <td className="p-1 font-mono text-xs">{f.fn}</td>
              <td className="p-1"><Badge variant="outline" className={f.runtime.includes("TanStack") ? "border-sky-500/40 text-sky-300" : "border-amber-500/40 text-amber-300"}>{f.runtime}</Badge></td>
              <td className="p-1 text-xs text-muted-foreground">{f.reason}</td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
