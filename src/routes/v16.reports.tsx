import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { Section, SimpleTable, StatusPill } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const reports = H.useReportsV16();
  const rls = H.useV16Rls();
  const edge = H.useV16EdgeFunctions();
  return (
    <V16Page icon={<FileText className="size-6 text-cyan-300" />} title="V16 Advanced Reporting"
      blurb="All V16 reports plus RLS policy sketches and Edge Function plan for the underlying schema.">
      <Section title="V16 reports">
        <SimpleTable rows={reports as any} columns={[
          { key: "name", label: "Report" },
          { key: "owner", label: "Owner" },
          { key: "cadence", label: "Cadence" },
          { key: "last_run", label: "Last run" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "passing" ? "healthy" : "watchlist"} /> },
        ]} />
      </Section>
      <Section title="RLS policy sketches (mock)">
        <SimpleTable rows={rls as any} columns={[
          { key: "policy", label: "Policy" },
          { key: "scope", label: "Scope" },
          { key: "note", label: "Note" },
        ]} />
      </Section>
      <Section title="Edge function plan">
        <ul className="grid gap-1 text-xs text-muted-foreground md:grid-cols-2">
          {edge.map((e) => <li key={e}><code>{e}</code></li>)}
        </ul>
      </Section>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/reports")({ component: Page });
