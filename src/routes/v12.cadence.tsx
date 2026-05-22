import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useGlobalCommercialCadence();
  const weekly = rows.filter((r) => r.cadence.toLowerCase().startsWith("weekly")).length;
  const monthly = rows.filter((r) => r.cadence.toLowerCase().startsWith("monthly")).length;
  const owners = new Set(rows.map((r) => r.owner)).size;
  return (
    <V12Page icon={<CalendarClock className="size-6 text-cyan-300" />} title="Global Commercial Operating Cadence" blurb="10 recurring commercial cadences with owners and attendees. Forms the executive heartbeat of V12.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Cadences" value={String(rows.length)} tone="sky" />
        <ScoreCard label="Weekly"   value={String(weekly)}      tone="emerald" />
        <ScoreCard label="Monthly"  value={String(monthly)}     tone="violet" />
        <ScoreCard label="Owners"   value={String(owners)}      tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "cadence", label: "Cadence" }, { key: "owner", label: "Owner" }, { key: "attendees", label: "Attendees" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/cadence")({
  head: () => ({ meta: [{ title: "Commercial Cadence · V12" }] }),
  component: Page,
});
