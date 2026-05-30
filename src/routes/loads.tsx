import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LoadBoard } from "@/components/loads/LoadBoard";

export const Route = createFileRoute("/loads")({
  head: () => ({
    meta: [
      { title: "Load Board — Anderoute" },
      {
        name: "description",
        content:
          "Logistics command center — create, assign, track, and deliver loads with live Realtime updates.",
      },
    ],
  }),
  component: LoadsPage,
});

function LoadsPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6">
        <LoadBoard />
      </div>
    </AppShell>
  );
}
