import { MapPin, Navigation, Flag, CheckCircle2, PackageCheck, Truck, MapPinned } from "lucide-react";
import type { Shipment } from "@/types/anderroute";

interface Props {
  shipment: Shipment;
}

type State = "done" | "current" | "upcoming";

export function RouteTimelineCard({ shipment }: Props) {
  const progress = shipment.route_progress_percent;

  // Map route progress to step states (7 steps)
  const stateAt = (threshold: number, nextThreshold: number): State => {
    if (progress >= nextThreshold) return "done";
    if (progress >= threshold) return "current";
    return "upcoming";
  };

  const stops: {
    icon: typeof MapPin;
    title: string;
    address: string;
    state: State;
    time: string;
  }[] = [
    { icon: MapPin, title: "Pickup Scheduled", address: shipment.pickup_address, state: stateAt(0, 5), time: "10:30 AM" },
    { icon: Navigation, title: "Driver En Route", address: "Dispatched", state: stateAt(5, 15), time: "10:34 AM" },
    { icon: MapPinned, title: "Arrived at Pickup", address: shipment.pickup_address, state: stateAt(15, 25), time: "10:46 AM" },
    { icon: PackageCheck, title: "Loaded", address: "184 items secured", state: stateAt(25, 35), time: "10:58 AM" },
    { icon: Truck, title: "In Transit", address: "I-30 E · Arlington, TX", state: stateAt(35, 85), time: "11:04 AM" },
    { icon: MapPin, title: "Near Destination", address: shipment.dropoff_address, state: stateAt(85, 98), time: "12:08 PM" },
    { icon: Flag, title: "Delivered", address: shipment.dropoff_address, state: stateAt(98, 101), time: shipment.scheduled_arrival },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0f172a] p-6 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2dd4bf]">
          Route Timeline
        </p>
        <span className="text-[11px] font-bold text-[#fb923c]">{progress}% complete</span>
      </div>

      <ol className="mt-4">
        {stops.map((stop, i) => {
          const Icon = stop.icon;
          const isDone = stop.state === "done";
          const isCurrent = stop.state === "current";
          return (
            <li key={stop.title} className="relative flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ${
                    isDone
                      ? "bg-emerald-500/20 text-emerald-300 ring-emerald-400/40"
                      : isCurrent
                        ? "bg-orange-500/20 text-orange-300 ring-orange-400/40"
                        : "bg-white/5 text-slate-500 ring-white/10"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-orange-400/30" />
                  )}
                  {isDone ? (
                    <CheckCircle2 className="relative h-4 w-4" />
                  ) : (
                    <Icon className="relative h-4 w-4" />
                  )}
                </div>
                {i < stops.length - 1 && (
                  <div
                    className={`my-1 w-px flex-1 ${
                      isDone ? "bg-emerald-400/40" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p
                    className={`text-sm font-semibold ${
                      isCurrent ? "text-orange-200" : isDone ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {stop.title}
                  </p>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    {stop.time}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">{stop.address}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
