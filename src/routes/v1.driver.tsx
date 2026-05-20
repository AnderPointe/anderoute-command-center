import { createFileRoute } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { ChecklistCard } from "@/components/v1/ChecklistCard";
import { DRIVER_STABILIZATION } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/driver")({
  head: () => ({ meta: [{ title: "Driver Stabilization · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<Smartphone className="size-6 text-indigo-300" />}
      title="Driver App Stabilization"
      blurb="Focused UX, GPS, and POD polish distilled from pilot driver feedback. Items linked to pilot feedback IDs map directly to /v1/feedback."
    >
      <ChecklistCard group={DRIVER_STABILIZATION} hint="Close every open item before V1 GA. Notes reference pilot feedback / bug IDs." />
    </V1Page>
  );
}
