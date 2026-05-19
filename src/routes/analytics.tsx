import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { StatCard } from "@/components/dashboard/StatCard";
import { Clock, CheckCircle2, Fuel, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics & Reports — Anderoute" },
      { name: "description", content: "Fleet utilization, delivery performance, MPG by vehicle type and status distribution." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics & Reports</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Operational performance across the fleet.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="On-time Delivery" value="94.3%" delta="+1.2%" trend="up" icon={Clock} accent="success" />
          <StatCard label="Loads Completed" value="186" delta="+12" trend="up" icon={CheckCircle2} accent="teal" />
          <StatCard label="Avg MPG" value="8.4" delta="−0.2" trend="down" icon={Fuel} accent="orange" />
          <StatCard label="Utilization" value="78%" delta="+3%" trend="up" icon={TrendingUp} accent="info" />
        </div>
        <AnalyticsCharts />
      </div>
    </AppShell>
  );
}
