import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlPage } from "@/components/v21/ControlPage";
import * as H from "@/v21/hooks";
function Page() {
  const d = H.useCapitalTrustIntelligence();
  return <ControlPage icon={<Wallet className="size-6 text-cyan-300" />} title="Capital Trust Intelligence Center"
    blurb="Data room, investor/acquirer, board capital, revenue durability, MP, strategic risk evidence; external-use approval; >$25k two-person sign-off." data={d} />;
}
export const Route = createFileRoute("/v21/capital")({ component: Page });
