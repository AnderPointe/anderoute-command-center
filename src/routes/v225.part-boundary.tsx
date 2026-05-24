import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Partner Lifecycle Boundary Maturity Center" blurb="Data boundary · portal · comms · proof · joint customer · integration boundary · tenant isolation · external-use approval — at maturity." data={H.usePartnerLifecycleBoundaryMaturity()} />; }
export const Route = createFileRoute("/v225/part-boundary")({ component: Page });
