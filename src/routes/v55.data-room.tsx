import { createFileRoute } from "@tanstack/react-router";
import { FolderArchive } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useAdvancedDataRoom } from "@/v55/hooks";

export const Route = createFileRoute("/v55/data-room")({
  head: () => ({ meta: [{ title: "Data Room · Anderoute V5.5" }] }),
  component: () => {
    const { items, requests } = useAdvancedDataRoom();
    const complete = items.filter(i => i.status === "complete").length;
    const inProg   = items.filter(i => i.status === "in_progress").length;
    const placeholder = items.filter(i => i.status === "placeholder").length;
    return (
      <V55Page icon={<FolderArchive className="size-6 text-amber-300" />} title="Advanced Data Room & Due Diligence"
        blurb="Product, architecture, security, compliance, customers, revenue, marketplace, partners, roadmap, support, legal (placeholder), financial (placeholder), risks, metrics, references, technical docs.">
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <Card className="border-emerald-400/30 bg-white/[0.02] p-4"><div className="text-xs uppercase text-muted-foreground">Complete</div><div className="text-2xl">{complete}</div></Card>
          <Card className="border-sky-400/30 bg-white/[0.02] p-4"><div className="text-xs uppercase text-muted-foreground">In progress</div><div className="text-2xl">{inProg}</div></Card>
          <Card className="border-amber-400/30 bg-white/[0.02] p-4"><div className="text-xs uppercase text-muted-foreground">Placeholder</div><div className="text-2xl">{placeholder}</div></Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Section status</h3>
          <div className="mt-2">
            <SimpleTable rows={items} columns={[
              { key: "section", label: "Section" },
              { key: "status",  label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Due diligence requests</h3>
          <div className="mt-2">
            <SimpleTable rows={requests} columns={[
              { key: "id",     label: "ID" },
              { key: "from",   label: "From" },
              { key: "topic",  label: "Topic" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V55Page>
    );
  },
});
