import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { ONBOARDING_TASKS } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/onboarding")({
  head: () => ({ meta: [{ title: "V1 Onboarding · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<UserPlus className="size-6 text-indigo-300" />}
      title="V1 Onboarding"
      blurb="Cleaner onboarding flow informed by the pilot: company, users, drivers, vehicles, customers, training, go-live."
    >
      <ChecklistCard group={{ id: "ob", title: "Onboarding playbook", items: ONBOARDING_TASKS }} hint="Run end-to-end per new customer." />
    </V1Page>
  );
}
