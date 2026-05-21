import { createFileRoute } from "@tanstack/react-router";
import { FileQuestion } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QUESTIONNAIRE_LIBRARY, QUESTIONNAIRE_QUEUE, QUESTIONNAIRE_AUTOMATION_STATS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/questionnaire")({
  head: () => ({ meta: [{ title: "Security Questionnaire Automation · Anderoute V3.5" }] }),
  component: () => {
    const s = QUESTIONNAIRE_AUTOMATION_STATS;
    return (
      <V35Page icon={<FileQuestion className="size-6 text-amber-300" />} title="Security Questionnaire Automation"
        blurb="Answer library with control mapping + evidence links. AI-assisted drafting is gated by human review.">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            ["Library coverage", `${Math.round(s.library_coverage * 100)}%`],
            ["AI drafted", `${Math.round(s.ai_drafted * 100)}%`],
            ["Human reviewed", `${Math.round(s.human_reviewed * 100)}%`],
            ["Avg turnaround", `${s.avg_turnaround_days}d`],
          ].map(([l, v]) => (
            <Card key={String(l)} className="border-white/10 bg-white/[0.02] p-3"><div className="text-xs uppercase text-muted-foreground">{l}</div><div className="text-lg font-semibold">{v as any}</div></Card>
          ))}
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Answer library</h3>
          <div className="mt-2 space-y-2 text-sm">{QUESTIONNAIRE_LIBRARY.map((a) => (
            <div key={a.key} className="rounded border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between"><div className="font-mono text-xs text-amber-300">{a.key}</div><Badge variant="outline" className="border-white/15 text-xs text-muted-foreground">{a.control}</Badge></div>
              <div className="mt-1">{a.answer}</div>
              <div className="mt-1 text-xs text-muted-foreground">Evidence: {a.evidence}</div>
            </div>
          ))}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Review queue</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Customer</th><th className="p-1">Answered</th><th className="p-1">Status</th></tr></thead>
            <tbody>{QUESTIONNAIRE_QUEUE.map((q) => (
              <tr key={q.id} className="border-t border-white/10"><td className="p-1">{q.customer}</td><td className="p-1 font-mono">{q.answered}/{q.questions}</td><td className="p-1"><Badge variant="outline" className="border-sky-500/40 text-sky-300">{q.status}</Badge></td></tr>
            ))}</tbody>
          </table>
        </Card>
      </V35Page>
    );
  },
});
