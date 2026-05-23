import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v185/ControlPage";
import * as H from "@/v185/hooks";

function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-cyan-300" />}
    title="Marketplace Control Optimization Center"
    blurb="Carrier density, load coverage, bid density, time-to-award, liquidity, quality, compliance, dispute, preferred-carrier — HITL on optimizations."
    data={H.useMarketplaceControlOptimization()} />;
}
export const Route = createFileRoute("/v185/mp-optimization")({ component: Page });
