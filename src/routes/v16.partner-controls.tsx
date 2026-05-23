import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ControlDomainPage } from "@/components/v16/ControlDomainPage";
import * as H from "@/v16/hooks";

function Page() {
  return <ControlDomainPage icon={<Network className="size-6 text-cyan-300" />}
    title="Partner Intelligence Control Center"
    blurb="Controls over partner action, campaign, enablement, revenue, risk recommendations, communication, partner-facing evidence — approval and audit."
    rows={H.usePartnerIntelligenceControls()} />;
}
export const Route = createFileRoute("/v16/partner-controls")({ component: Page });
