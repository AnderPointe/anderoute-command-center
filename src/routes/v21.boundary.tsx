import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useCustomerPartnerTrustBoundary();
  return <ControlPage icon={<ShieldCheck className="size-6 text-cyan-300" />} title="Customer/Partner Trust Boundary Center"
    blurb="Customer, partner, carrier data boundaries; external-use approvals; portal exposure; tenant isolation." data={d} />;
}
export const Route = createFileRoute("/v21/boundary")({ component: Page });
