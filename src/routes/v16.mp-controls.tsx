import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlDomainPage } from "@/components/v16/ControlDomainPage";
import * as H from "@/v16/hooks";

function Page() {
  return <ControlDomainPage icon={<Megaphone className="size-6 text-cyan-300" />}
    title="Marketplace Intelligence Control Center"
    blurb="Controls over MP recommendations, carrier/customer/revenue/fee/dispute/settlement impact, carrier quality + compliance, regional + lane liquidity, approval and audit."
    rows={H.useMarketplaceIntelligenceControls()} />;
}
export const Route = createFileRoute("/v16/mp-controls")({ component: Page });
