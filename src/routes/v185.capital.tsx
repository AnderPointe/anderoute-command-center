import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlPage } from "@/components/v185/ControlPage";
import * as H from "@/v185/hooks";

function Page() {
  return <ControlPage icon={<Wallet className="size-6 text-cyan-300" />}
    title="Capital Control Assurance Center"
    blurb="Capital, data-room, investor/acquirer, board, durability, MP, strategic risk, external-use, recommendation, routing, audit."
    data={H.useCapitalControlAssurance()} />;
}
export const Route = createFileRoute("/v185/capital")({ component: Page });
