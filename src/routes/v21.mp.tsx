import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useMarketplaceTrustOptimization();
  return <ControlPage icon={<Megaphone className="size-6 text-cyan-300" />} title="Marketplace Trust Optimization"
    blurb="Carrier density, equipment + load coverage, bid density, lane + regional liquidity, quality, compliance, disputes; HITL on changes." data={d} />;
}
export const Route = createFileRoute("/v21/mp")({ component: Page });
