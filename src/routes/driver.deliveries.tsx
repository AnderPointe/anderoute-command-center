import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DeliveriesPanel } from "@/components/driver/DeliveriesPanel";

export const Route = createFileRoute("/driver/deliveries")({
  head: () => ({
    meta: [
      { title: "Deliveries — Anderoute" },
      {
        name: "description",
        content:
          "Driver-facing list of submitted Proof of Delivery records with live dispatch confirmation status.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <DeliveriesPanel />
    </AppShell>
  ),
});
