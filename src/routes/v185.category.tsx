import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v185/ControlPage";
import * as H from "@/v185/hooks";

function Page() {
  return <ControlPage icon={<Megaphone className="size-6 text-cyan-300" />}
    title="Category Control Assurance Center"
    blurb="Narrative, proof, market education, positioning, differentiation, sales/website/board narrative, publishing & external-use approval, audit."
    data={H.useCategoryControlAssurance()} />;
}
export const Route = createFileRoute("/v185/category")({ component: Page });
