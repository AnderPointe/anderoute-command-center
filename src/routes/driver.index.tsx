import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DriverMobileLoadRequest } from "@/components/mobile/DriverMobileLoadRequest";

export const Route = createFileRoute("/driver/")({
  head: () => ({
    meta: [
      { title: "Driver Load Offer — Anderoute" },
      { name: "description", content: "Driver-facing mobile flow for accepting or denying dispatched loads." },
    ],
  }),
  component: () => (
    <AppShell>
      <DriverMobileLoadRequest />
    </AppShell>
  ),
});
