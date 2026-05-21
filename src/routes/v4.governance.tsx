import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GOVERNANCE_CAMPAIGNS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/governance")({
  head: () => ({ meta: [{ title: "Governance · Anderoute" }] }),
  component: () => (
    <V4Page icon={<Scale className="size-6 text-sky-300" />} title="Advanced Governance Controls"
      blurb="Role, permission, API key, EDI partner, integration, support access, retention, customer portal and AI action review campaigns.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ul className="space-y-1 text-sm">{GOVERNANCE_CAMPAIGNS.map(c => (
          <li key={c.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
            <div><div className="font-medium">{c.title}</div><div className="text-xs text-muted-foreground">{c.scope} · due {c.due}</div></div>
            <Badge variant="outline" className="border-white/15">{c.status}</Badge>
          </li>))}
        </ul>
      </Card>
    </V4Page>
  ),
});
