import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ControlDomainPage } from "@/components/v16/ControlDomainPage";
import * as H from "@/v16/hooks";

function Page() {
  return <ControlDomainPage icon={<Users className="size-6 text-cyan-300" />}
    title="Strategic Account Intelligence Control Center"
    blurb="Controls over account expansion, renewal, churn prevention, customer communication, procurement actions, trust assets, executive sponsorship, customer proof — approval and audit."
    rows={H.useStrategicAccountIntelligenceControls()} />;
}
export const Route = createFileRoute("/v16/acct-controls")({ component: Page });
