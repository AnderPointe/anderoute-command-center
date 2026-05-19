import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — Anderoute" },
      { name: "description", content: "Open exceptions: delays, route deviations, fuel anomalies, and driver issues." },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Alerts & Exceptions</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Open issues that require dispatcher attention.</p>
        </div>
        <AlertsPanel />
      </div>
    </AppShell>
  );
}
