import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COPILOT_V2_INSIGHTS, SHIFT_HANDOFF, EXEC_SUMMARY } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/copilot")({
  head: () => ({ meta: [{ title: "CoPilot V2 · Anderoute" }] }),
  component: Page,
});

const tone: Record<string, string> = {
  good: "border-emerald-500/30 text-emerald-300",
  warn: "border-amber-500/30 text-amber-300",
  bad: "border-rose-500/30 text-rose-300",
  info: "border-sky-500/30 text-sky-300",
};

function Page() {
  return (
    <V2Page
      icon={<Sparkles className="size-6 text-violet-300" />}
      title="Anderoute CoPilot V2"
      blurb="Context-aware operational intelligence. Rules engine plus live state (loads, drivers, GPS, integrations, billing, EDI). Drafts customer updates, shift handoffs, and executive summaries — all gated by approval before send."
    >
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Rules + context</Badge>{" "}
        Drafts and recommendations only. Sending or assigning requires explicit human approval. Full LLM intelligence lands in V2.5.
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">CoPilot insights</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {COPILOT_V2_INSIGHTS.map((i) => (
            <div key={i.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium">{i.question}</div>
                <Badge variant="outline" className={tone[i.tone]}>{i.tone}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{i.answer}</div>
              <div className="mt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">{i.category}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Shift handoff (draft)</h2>
          <pre className="mt-2 whitespace-pre-wrap rounded-md border border-white/10 bg-black/30 p-3 text-xs text-muted-foreground">{SHIFT_HANDOFF}</pre>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Executive summary (draft)</h2>
          <pre className="mt-2 whitespace-pre-wrap rounded-md border border-white/10 bg-black/30 p-3 text-xs text-muted-foreground">{EXEC_SUMMARY}</pre>
        </Card>
      </div>
    </V2Page>
  );
}
