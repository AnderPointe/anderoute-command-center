import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useProductTrustIntelligence();
  return <ControlPage icon={<Boxes className="size-6 text-cyan-300" />} title="Product Trust Intelligence Center"
    blurb="Dispatch, EliteNav, Driver Mobile, Customer Portal, CoPilot, Carrier MP, API, EDI, Telematics, Partner MP, Reports, Governance." data={d} />;
}
export const Route = createFileRoute("/v21/products")({ component: Page });
