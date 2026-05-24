import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Boxes className="size-6 text-emerald-300" />} title="Product Lifecycle Trust Scale Center" blurb="12 product lines — adoption, reliability, support burden, tech-debt placeholder, evidence, recommendation, investment approval, audit completeness, exceptions." data={H.useProductLifecycleTrustScale()} />; }
export const Route = createFileRoute("/v225/products")({ component: Page });
