import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Megaphone className="size-6 text-emerald-300" />} title="Marketplace Lifecycle Governance Center" blurb="Carrier · onboarding · quality · compliance · load/bid/lane/regional/equipment · dispute · preferred-carrier — HITL on award + dispute + preferred." data={H.useMarketplaceLifecycleGovernance()} />; }
export const Route = createFileRoute("/v225/mp")({ component: Page });
