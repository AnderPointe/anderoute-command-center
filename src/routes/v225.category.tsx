import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Megaphone className="size-6 text-emerald-300" />} title="Category Lifecycle Trust Maturity Center" blurb="Narrative · proof · market education · positioning · differentiation · sales/website/board narrative · publishing + external-use approval · audit." data={H.useCategoryLifecycleTrustMaturity()} />; }
export const Route = createFileRoute("/v225/category")({ component: Page });
