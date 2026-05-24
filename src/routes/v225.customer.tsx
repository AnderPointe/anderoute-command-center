import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ControlPage } from "@/components/v225/ControlPage";
import * as H from "@/v225/hooks";
function Page() { return <ControlPage icon={<Users className="size-6 text-emerald-300" />} title="Customer Lifecycle Trust Maturity Center" blurb="Prospect → onboarding → adoption → support → comms → proof → renewal → expansion → risk → offboarding. Lifecycle maturity with boundary assurance." data={H.useCustomerLifecycleTrustMaturity()} />; }
export const Route = createFileRoute("/v225/customer")({ component: Page });
