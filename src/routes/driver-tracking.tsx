import { createFileRoute } from "@tanstack/react-router";
import DriverTrackingDashboard from "@/pages/DriverTrackingDashboard";

export const Route = createFileRoute("/driver-tracking")({
  head: () => ({
    meta: [
      { title: "Driver Tracking Dashboard — AnderRoute" },
      {
        name: "description",
        content:
          "Premium real-time logistics driver tracking dashboard for AnderRoute dispatch operations.",
      },
    ],
  }),
  component: DriverTrackingDashboard,
});
