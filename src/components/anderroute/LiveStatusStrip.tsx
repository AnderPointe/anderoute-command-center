import {
  Clock3,
  LocateFixed,
  RadioTower,
  Route,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function LiveStatusStrip() {
  const stats = [
    {
      label: "Driver Status",
      value: "En Route",
      icon: Truck,
      accent: "text-teal-300",
    },
    {
      label: "GPS Signal",
      value: "96%",
      icon: RadioTower,
      accent: "text-emerald-300",
    },
    {
      label: "Last Ping",
      value: "2 min ago",
      icon: LocateFixed,
      accent: "text-orange-300",
    },
    {
      label: "ETA Accuracy",
      value: "High",
      icon: Clock3,
      accent: "text-teal-300",
    },
    {
      label: "Route Status",
      value: "On Schedule",
      icon: Route,
      accent: "text-emerald-300",
    },
    {
      label: "Customer Status",
      value: "Notified",
      icon: ShieldCheck,
      accent: "text-orange-300",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-white shadow-xl backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <Icon className={`h-5 w-5 ${stat.accent}`} />
              <span className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_18px_rgba(20,184,166,0.8)]" />
            </div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
            <p className="mt-1 text-lg font-bold">{stat.value}</p>
          </div>
        );
      })}
    </section>
  );
}
