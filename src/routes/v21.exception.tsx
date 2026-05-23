import { createFileRoute } from "@tanstack/react-router";
import { Siren } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useEnterpriseTrustExceptionNetwork();
  return <ControlPage icon={<Siren className="size-6 text-cyan-300" />} title="Enterprise Trust Exception Network"
    blurb="Owner, risk tier, SLA, escalation, evidence, remediation, board visibility, outcome, network impact across all domains." data={d} />;
}
export const Route = createFileRoute("/v21/exception")({ component: Page });
