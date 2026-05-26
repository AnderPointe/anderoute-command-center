import { useNavigate } from "@tanstack/react-router";
import { Truck, MapPin, Clock } from "lucide-react";
import type { DriverDossier } from "@/types/anderroute";
import LiquidGlassCard from "./LiquidGlassCard";
import { StatusBadge } from "./StatusBadge";

interface Props {
  dossier: DriverDossier;
}

export function DriverCard({ dossier }: Props) {
  const navigate = useNavigate();
  const { driver, vehicle, shipment } = dossier;

  return (
    <LiquidGlassCard
      glow
      className="cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
    >
      <button
        type="button"
        onClick={() =>
          navigate({ to: "/drivers/$driverId", params: { driverId: driver.id } })
        }
        className="block w-full p-5 text-left"
      >
        <div className="flex items-start gap-3">
          <div className="relative">
            <img
              src={driver.photo_url}
              alt={driver.name}
              className="h-12 w-12 rounded-2xl object-cover ring-1 ring-[var(--lg-border)]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--lg-glass-strong)] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-semibold text-[var(--lg-text)]">
                {driver.name}
              </p>
              <StatusBadge status={driver.status} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--lg-teal)]">
              {driver.id}
            </p>
            <p className="mt-1 truncate text-xs text-[var(--lg-muted)]">
              <Truck className="mr-1 inline h-3 w-3" />
              {vehicle.make} {vehicle.model}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-[var(--lg-muted)]">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[var(--lg-orange)]" />
            {shipment.dropoff_address}
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-[var(--lg-text)]">
            <Clock className="h-3 w-3 text-[var(--lg-teal)]" />
            {shipment.eta_minutes}m
          </span>
        </div>

        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[var(--lg-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--lg-teal)] to-[var(--lg-orange)] shadow-[0_0_8px_rgba(20,184,166,0.5)] transition-all duration-500"
            style={{ width: `${shipment.route_progress_percent}%` }}
          />
        </div>
      </button>
    </LiquidGlassCard>
  );
}
