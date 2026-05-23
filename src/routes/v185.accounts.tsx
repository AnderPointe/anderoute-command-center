import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ControlPage } from "@/components/v185/ControlPage";
import * as H from "@/v185/hooks";

function Page() {
  return <ControlPage icon={<Users className="size-6 text-cyan-300" />}
    title="Strategic Account Control Assurance Center"
    blurb="Expansion/renewal/churn/adoption/trust/support burden/sponsor signals plus evidence, comm approval, routing, audit."
    data={H.useStrategicAccountControlAssurance()} />;
}
export const Route = createFileRoute("/v185/accounts")({ component: Page });
