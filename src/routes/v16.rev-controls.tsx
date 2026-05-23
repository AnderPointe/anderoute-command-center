import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ControlDomainPage } from "@/components/v16/ControlDomainPage";
import * as H from "@/v16/hooks";

function Page() {
  return <ControlDomainPage icon={<TrendingUp className="size-6 text-cyan-300" />}
    title="Revenue Intelligence Control Center"
    blurb="Controls over renewal, expansion, churn prevention, concentration, product expansion, MP/API/EDI/partner revenue, billing disputes, payment health, approval and audit."
    rows={H.useRevenueIntelligenceControls()} />;
}
export const Route = createFileRoute("/v16/rev-controls")({ component: Page });
