import { createFileRoute } from "@tanstack/react-router";
import { Siren } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Siren className="size-6 text-emerald-300" />} title="Enterprise Lifecycle Exception Operations Center" blurb="18 exception categories across automation scale, board, revenue, MP, customer/partner maturity, evidence, boundaries, approval, rec, outcome, audit, risk, capital, product, category, tenant." data={H.useEnterpriseLifecycleExceptionOperations()} />; }
export const Route = createFileRoute("/v225/exception")({ component: Page });
