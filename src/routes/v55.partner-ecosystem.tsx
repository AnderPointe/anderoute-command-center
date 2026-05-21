import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { KpiGrid } from "@/components/v55/ui-bits";
import { usePartnerEcosystemScale } from "@/v55/hooks";

export const Route = createFileRoute("/v55/partner-ecosystem")({
  head: () => ({ meta: [{ title: "Partner Ecosystem · Anderoute V5.5" }] }),
  component: () => {
    const { scale } = usePartnerEcosystemScale();
    return (
      <V55Page icon={<Network className="size-6 text-amber-300" />} title="Partner Ecosystem Scale Dashboard"
        blurb="Active, strategic, revenue, integration and marketplace partners, plus pipeline, health and partner-driven revenue (placeholder).">
        <KpiGrid cols={4} items={[
          { label: "Active partners",      value: scale.active },
          { label: "Strategic",            value: scale.strategic },
          { label: "Revenue partners",     value: scale.revenue },
          { label: "Integration partners", value: scale.integration },
          { label: "Marketplace partners", value: scale.marketplace },
          { label: "Pipeline",             value: scale.pipeline },
          { label: "Healthy",              value: scale.healthy },
          { label: "At risk",              value: scale.at_risk },
          { label: "Partner revenue (placeholder)", value: `$${scale.partner_revenue_m}M` },
          { label: "Joint customers",      value: scale.joint_customers },
          { label: "Partner leads / Q",    value: scale.partner_leads_q },
        ]} />
      </V55Page>
    );
  },
});
