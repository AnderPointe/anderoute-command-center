import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlDomainPage } from "@/components/v16/ControlDomainPage";
import * as H from "@/v16/hooks";

function Page() {
  return <ControlDomainPage icon={<Wallet className="size-6 text-cyan-300" />}
    title="Capital Intelligence Control Center"
    blurb="Controls over capital recommendations, data room + investor/acquirer + board + durability + MP + concentration + risk evidence, external-use approval, audit."
    rows={H.useCapitalIntelligenceControls()} />;
}
export const Route = createFileRoute("/v16/cap-controls")({ component: Page });
