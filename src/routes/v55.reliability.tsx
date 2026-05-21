import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { KpiGrid } from "@/components/v55/ui-bits";
import { usePlatformReliabilityLeadership } from "@/v55/hooks";

export const Route = createFileRoute("/v55/reliability")({
  head: () => ({ meta: [{ title: "Reliability · Anderoute V5.5" }] }),
  component: () => {
    const { metrics } = usePlatformReliabilityLeadership();
    return (
      <V55Page icon={<Activity className="size-6 text-amber-300" />} title="Platform Reliability Leadership View"
        blurb="Uptime, latency, GPS, webhook, EDI, mobile crash-free, notification delivery, route/billing provider reliability and incident metrics. Uptime is placeholder.">
        <KpiGrid cols={4} items={[
          { label: "Uptime (placeholder)",   value: `${metrics.uptime_pct}%` },
          { label: "API p95",                value: `${metrics.api_p95_ms}ms` },
          { label: "Realtime p95",           value: `${metrics.realtime_p95_ms}ms` },
          { label: "GPS reliability",        value: `${metrics.gps_reliability_pct}%` },
          { label: "Webhook delivery",       value: `${metrics.webhook_pct}%` },
          { label: "EDI delivery",           value: `${metrics.edi_pct}%` },
          { label: "Mobile crash-free (ph)", value: `${metrics.mobile_crash_free_pct}%` },
          { label: "Notification delivery",  value: `${metrics.notification_pct}%` },
          { label: "Route provider",         value: `${metrics.route_provider_pct}%` },
          { label: "Billing provider",       value: `${metrics.billing_provider_pct}%` },
          { label: "Support incident rate",  value: metrics.support_incident_rate },
          { label: "Critical incidents",     value: metrics.critical_incidents },
        ]} />
      </V55Page>
    );
  },
});
