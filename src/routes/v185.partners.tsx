import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ControlPage } from "@/components/v185/ControlPage";
import * as H from "@/v185/hooks";

function Page() {
  return <ControlPage icon={<Network className="size-6 text-cyan-300" />}
    title="Partner Control Assurance Center"
    blurb="Performance, enablement, support, pipeline, joint customers, risk, evidence, partner-facing comm (approved-only), routing, audit."
    data={H.usePartnerControlAssurance()} />;
}
export const Route = createFileRoute("/v185/partners")({ component: Page });
