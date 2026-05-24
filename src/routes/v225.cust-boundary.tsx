import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Customer Lifecycle Boundary Maturity Center" blurb="Data boundary · portal exposure · comms/proof approval · support data · account visibility · tenant isolation · external-use approval — at maturity." data={H.useCustomerLifecycleBoundaryMaturity()} />; }
export const Route = createFileRoute("/v225/cust-boundary")({ component: Page });
