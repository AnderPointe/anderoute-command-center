import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ControlPage } from "@/components/v185/ControlPage";
import * as H from "@/v185/hooks";

function Page() {
  return <ControlPage icon={<Boxes className="size-6 text-cyan-300" />}
    title="Product-Line Control Assurance Center"
    blurb="12 product lines · adoption, support, reliability, tech debt placeholder, evidence, recommendation, investment-approval, audit."
    data={H.useProductLineControlAssurance()} />;
}
export const Route = createFileRoute("/v185/products")({ component: Page });
