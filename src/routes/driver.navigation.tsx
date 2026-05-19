import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DriverMobileNavigation } from "@/components/mobile/DriverMobileNavigation";

export const Route = createFileRoute("/driver/navigation")({
  head: () => ({
    meta: [
      { title: "Driver Navigation — Anderoute" },
      { name: "description", content: "Turn-by-turn driver navigation, status updates, and dispatch communication." },
    ],
  }),
  component: () => (
    <AppShell>
      <DriverMobileNavigation />
    </AppShell>
  ),
});
