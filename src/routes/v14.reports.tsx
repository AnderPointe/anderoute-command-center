import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V14Page } from "@/components/v14/V14Page";
import { Section, SimpleTable } from "@/components/v14/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v14/hooks";

function Page() {
  const r = H.useReportsV14();
  const b = H.useV14BackendBoundary();
  const rls = H.useV14RlsExamples();
  const sql = H.useV14RlsSqlSnippets();
  return (
    <V14Page icon={<ShieldCheck className="size-6 text-cyan-300" />} title="V14 Reports & Governance" blurb="V14 reports dashboard, backend boundary, RLS examples.">
      <Section title="Available V14 reports">
        <div className="grid gap-2 md:grid-cols-2">
          {r.reports.map((x) => <Card key={x} className="border-white/10 bg-white/[0.02] p-2 text-xs">{x}</Card>)}
        </div>
      </Section>
      <Section title="Backend boundary — server fns">
        <ul className="list-disc space-y-1 pl-5 text-[11px] text-muted-foreground">
          {b.server_fns.map((f) => <li key={f}><code>{f}</code></li>)}
        </ul>
      </Section>
      <Section title="Backend boundary — public webhooks (HMAC, no PII)">
        <ul className="list-disc space-y-1 pl-5 text-[11px] text-muted-foreground">
          {b.public_webhooks.map((w) => <li key={w}><code>{w}</code></li>)}
        </ul>
      </Section>
      <Section title="RLS examples (sketch)">
        <ul className="list-disc space-y-1 pl-5 text-xs">{rls.map((x) => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section title="RLS SQL snippets (representative)">
        <SimpleTable rows={sql as any} columns={[
          { key: "table", label: "Table" },
          { key: "sql", label: "Policy", render: (r: any) => <pre className="whitespace-pre-wrap text-[10px]">{r.sql}</pre> },
        ]} />
      </Section>
    </V14Page>
  );
}

export const Route = createFileRoute("/v14/reports")({
  head: () => ({ meta: [{ title: "V14 Reports & Governance" }] }),
  component: Page,
});
