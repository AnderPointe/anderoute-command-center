import { createFileRoute } from "@tanstack/react-router";
import { Wallet, Users, Network, Boxes, Megaphone } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

export function ControlPage({ icon, title, blurb, data }: any) {
  const depth = H.useV18AreaDepth();
  const nba = H.useV18NextBestActions();
  return (
    <V18Page icon={icon} title={title} blurb={blurb}>
      <ScoreCard label="Control score" value={data.score} tone="violet" />
      <Section title="Control matrix">
        <SimpleTable rows={data.matrix as any} columns={[
          { key: "control", label: "Control" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Area depth (cross-V18 KPI snapshot)">
        <SimpleTable rows={depth as any} columns={[
          { key: "area", label: "Area" }, { key: "kpi1", label: "KPI 1" },
          { key: "kpi2", label: "KPI 2" }, { key: "kpi3", label: "KPI 3" },
          { key: "kpi4", label: "KPI 4" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Next best HITL actions">
        <SimpleTable rows={nba as any} columns={[
          { key: "rank", label: "#" }, { key: "action", label: "Action" },
          { key: "owner", label: "Owner" }, { key: "impact", label: "Impact" }, { key: "hitl", label: "HITL" },
        ]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={data.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "control", label: "Control" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Remediation">
        <SimpleTable rows={data.remediation as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V18Page>
  );
}

export const Icons = { Wallet, Users, Network, Boxes, Megaphone };
export { H };
