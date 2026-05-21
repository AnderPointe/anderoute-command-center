import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APPROVAL_QUEUE, APPROVAL_POLICIES } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/approvals")({
  head: () => ({ meta: [{ title: "AI Approvals · Anderoute" }] }),
  component: Page,
});

const levelTone: Record<string, string> = {
  low: "border-white/15 text-muted-foreground",
  moderate: "border-sky-500/30 text-sky-300",
  high: "border-amber-500/30 text-amber-300",
  critical: "border-rose-500/30 text-rose-300",
};

function Page() {
  return (
    <V2Page
      icon={<ShieldCheck className="size-6 text-violet-300" />}
      title="Human Approval Workflow"
      blurb="Every high-impact AI action — reassignment, mass notification, CDL override, billing changes, customer portal access — flows through this queue before it can execute."
    >
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Governance</Badge>{" "}
        AI never executes these actions directly. An admin or owner must approve. All decisions are written to <span className="font-mono">ai_approval_history</span>.
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Pending approvals ({APPROVAL_QUEUE.length})</h2>
        <div className="mt-3 space-y-2 text-sm">
          {APPROVAL_QUEUE.map((a) => (
            <div key={a.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{a.action.replace(/_/g, " ")} · {a.requestedBy} · {a.ageMin}m ago</div>
                  <div className="font-medium">{a.subject}</div>
                </div>
                <Badge variant="outline" className={levelTone[a.level]}>{a.level}</Badge>
              </div>
              <div className="mt-2 rounded-md border border-white/10 bg-black/30 px-2 py-1.5 text-xs text-muted-foreground">{a.preview}</div>
              <div className="mt-2 flex gap-2">
                <Button size="sm" className="h-8 bg-emerald-600 text-xs hover:bg-emerald-500">Approve</Button>
                <Button size="sm" variant="outline" className="h-8 text-xs">Reject</Button>
                <Button size="sm" variant="ghost" className="h-8 text-xs">View context</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Approval policy matrix</h2>
        <p className="mt-1 text-xs text-muted-foreground">Defines who can approve each action, the SLA before escalation, and whether a written reason is required.</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="p-2">Action</th><th className="p-2">Approvers</th><th className="p-2">SLA</th><th className="p-2">Reason</th></tr>
            </thead>
            <tbody>
              {APPROVAL_POLICIES.map((p) => (
                <tr key={p.action} className="border-t border-white/10">
                  <td className="p-2">{p.action.replace(/_/g, " ")}</td>
                  <td className="p-2 text-xs">{p.approvers.join(", ")}</td>
                  <td className="p-2 text-xs">{p.slaMin}m</td>
                  <td className="p-2 text-xs">{p.reasonRequired ? "required" : "optional"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </V2Page>
  );
}
