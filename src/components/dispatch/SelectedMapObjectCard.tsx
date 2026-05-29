/**
 * SelectedMapObjectCard — floating detail card for selected drivers, POIs, and geofences.
 */

import {
  X,
  Truck,
  Phone,
  MessageSquare,
  Package,
  Battery,
  Signal,
  Clock,
  MapPin,
  Globe,
  Building2,
  Shield,
  ExternalLink,
  Navigation,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LiveDriverLocation, MapGeofence, MapPoi } from "@/types/map";
import { POI_CATEGORY_META } from "./poiHelpers";

interface Props {
  type: "driver" | "poi" | "geofence";
  data: LiveDriverLocation | MapPoi | MapGeofence;
  onClose: () => void;
}

// ─── Driver Card ─────────────────────────────────────────────────────────────

function DriverCard({ driver, onClose }: { driver: LiveDriverLocation; onClose: () => void }) {
  const statusColor =
    driver.status === "driving"
      ? "#14b8a6"
      : driver.status === "idle"
        ? "#f59e0b"
        : driver.status === "offline" || driver.is_stale
          ? "#6b7280"
          : "#3b82f6";

  const pingAge = driver.last_ping_at
    ? Math.round((Date.now() - new Date(driver.last_ping_at).getTime()) / 1000)
    : null;

  const pingLabel =
    pingAge != null
      ? pingAge < 60
        ? `${pingAge}s ago`
        : `${Math.round(pingAge / 60)}m ago`
      : "Unknown";

  return (
    <div
      className="w-72 rounded-2xl border border-[#1e3a5f] bg-[#0b1526]/97 shadow-2xl backdrop-blur-xl overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(20,184,166,0.15)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-3 border-b border-[#1e3a5f]">
        <div className="flex items-center gap-2.5">
          <div
            className="size-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: statusColor + "22", border: `1px solid ${statusColor}40` }}
          >
            <Truck className="size-4" style={{ color: statusColor }} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100">
              {driver.driver_name ?? `Driver ${driver.driver_id.slice(0, 6)}`}
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <span className="size-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
              {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
              {driver.is_stale && " · Stale"}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-600 hover:text-slate-300 transition-colors mt-0.5"
        >
          <X className="size-3.5" />
        </button>
      </div>

      {/* Info grid */}
      <div className="p-3 space-y-0.5">
        {driver.unit_number && <Row icon={Truck} label="Unit" value={driver.unit_number} />}
        {driver.vehicle_type && (
          <Row icon={Building2} label="Vehicle" value={driver.vehicle_type} />
        )}
        {driver.speed_mph != null && (
          <Row icon={Navigation} label="Speed" value={`${driver.speed_mph.toFixed(0)} mph`} />
        )}
        {driver.eta_minutes != null && (
          <Row icon={Clock} label="ETA" value={`${driver.eta_minutes} min`} />
        )}
        {driver.current_load_number && (
          <Row icon={Package} label="Load" value={driver.current_load_number} />
        )}
        {driver.battery_level != null && (
          <Row
            icon={Battery}
            label="Battery"
            value={
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-16 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${driver.battery_level}%`,
                      background: driver.battery_level > 30 ? "#14b8a6" : "#ef4444",
                    }}
                  />
                </div>
                <span>{driver.battery_level}%</span>
              </div>
            }
          />
        )}
        {driver.signal_strength != null && (
          <Row icon={Signal} label="Signal" value={`${driver.signal_strength}%`} />
        )}
        <Row icon={Clock} label="Last Ping" value={pingLabel} />
      </div>

      {/* Action buttons */}
      <div className="flex gap-1.5 p-3 pt-0">
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-teal-500/15 border border-teal-500/30 py-2 text-[11px] font-semibold text-teal-300 hover:bg-teal-500/25 transition-colors">
          <MessageSquare className="size-3" />
          Message
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-700/60 border border-slate-600/40 py-2 text-[11px] font-semibold text-slate-300 hover:bg-slate-600/60 transition-colors">
          <Phone className="size-3" />
          Call
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-orange-500/15 border border-orange-500/30 py-2 text-[11px] font-semibold text-orange-300 hover:bg-orange-500/25 transition-colors">
          <Package className="size-3" />
          Assign
        </button>
      </div>
    </div>
  );
}

// ─── POI Card ─────────────────────────────────────────────────────────────────

function PoiCard({ poi, onClose }: { poi: MapPoi; onClose: () => void }) {
  const meta = POI_CATEGORY_META[poi.category] ?? POI_CATEGORY_META.custom;

  return (
    <div
      className="w-72 rounded-2xl border border-[#1e3a5f] bg-[#0b1526]/97 shadow-2xl backdrop-blur-xl overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.7)" }}
    >
      <div className="flex items-start justify-between p-3 border-b border-[#1e3a5f]">
        <div className="flex items-center gap-2.5">
          <div
            className="size-8 rounded-xl flex items-center justify-center shrink-0 text-lg"
            style={{ background: meta.color + "22", border: `1px solid ${meta.color}40` }}
          >
            {meta.emoji}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100 leading-tight">{poi.name}</div>
            <div className="text-[10px] text-slate-500 mt-0.5 capitalize">{meta.label}</div>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-300 transition-colors">
          <X className="size-3.5" />
        </button>
      </div>

      <div className="p-3 space-y-0.5">
        {poi.address && <Row icon={MapPin} label="Address" value={poi.address} />}
        {(poi.city || poi.state) && (
          <Row
            icon={MapPin}
            label="Location"
            value={`${poi.city ?? ""}${poi.city && poi.state ? ", " : ""}${poi.state ?? ""}`}
          />
        )}
        {poi.phone && <Row icon={Phone} label="Phone" value={poi.phone} />}
        {poi.website && (
          <Row
            icon={Globe}
            label="Website"
            value={
              <a
                href={poi.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-teal-400 hover:text-teal-300 truncate"
              >
                <span className="truncate">{poi.website.replace(/^https?:\/\//, "")}</span>
                <ExternalLink className="size-2.5 shrink-0" />
              </a>
            }
          />
        )}
        {poi.description && (
          <div className="pt-1 text-[10px] text-slate-500 leading-relaxed">{poi.description}</div>
        )}
      </div>

      <div className="flex gap-1.5 p-3 pt-0">
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-teal-500/15 border border-teal-500/30 py-2 text-[11px] font-semibold text-teal-300 hover:bg-teal-500/25 transition-colors">
          <Navigation className="size-3" />
          Add Stop
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-orange-500/15 border border-orange-500/30 py-2 text-[11px] font-semibold text-orange-300 hover:bg-orange-500/25 transition-colors">
          <Package className="size-3" />
          Assign Load
        </button>
      </div>
    </div>
  );
}

// ─── Geofence Card ────────────────────────────────────────────────────────────

function GeofenceCard({ geofence, onClose }: { geofence: MapGeofence; onClose: () => void }) {
  const typeLabel = geofence.geofence_type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      className="w-72 rounded-2xl border border-[#1e3a5f] bg-[#0b1526]/97 shadow-2xl backdrop-blur-xl overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.7)" }}
    >
      <div className="flex items-start justify-between p-3 border-b border-[#1e3a5f]">
        <div className="flex items-center gap-2.5">
          <div
            className="size-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: geofence.color + "22", border: `1px solid ${geofence.color}40` }}
          >
            <Shield className="size-4" style={{ color: geofence.color }} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100">{geofence.name}</div>
            <div className="text-[10px] text-slate-500">{typeLabel}</div>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-300 transition-colors">
          <X className="size-3.5" />
        </button>
      </div>

      <div className="p-3 space-y-0.5">
        <Row
          icon={Zap}
          label="Status"
          value={
            <span
              className={cn(
                "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold",
                geofence.is_active ? "bg-teal-500/20 text-teal-300" : "bg-slate-700 text-slate-400",
              )}
            >
              {geofence.is_active ? "Active" : "Inactive"}
            </span>
          }
        />
        {geofence.radius_m != null && (
          <Row icon={MapPin} label="Radius" value={`${geofence.radius_m.toLocaleString()} m`} />
        )}
        {geofence.description && (
          <div className="pt-1 text-[10px] text-slate-500">{geofence.description}</div>
        )}
        {geofence.metadata && Object.keys(geofence.metadata).length > 0 && (
          <div className="pt-1">
            {Object.entries(geofence.metadata).map(([k, v]) => (
              <Row key={k} icon={Building2} label={k} value={String(v)} />
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-1.5 p-3 pt-0">
        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-700/60 border border-slate-600/40 py-2 text-[11px] font-semibold text-slate-300 hover:bg-slate-600/60 transition-colors">
          <Shield className="size-3" />
          Edit Zone
        </button>
      </div>
    </div>
  );
}

// ─── Row helper ──────────────────────────────────────────────────────────────

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 py-0.5">
      <Icon className="size-3 text-slate-600 mt-0.5 shrink-0" />
      <span className="text-[10px] text-slate-500 w-14 shrink-0">{label}</span>
      <span className="text-[10px] text-slate-300 flex-1 leading-tight">{value}</span>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function SelectedMapObjectCard({ type, data, onClose }: Props) {
  if (type === "driver") {
    return <DriverCard driver={data as LiveDriverLocation} onClose={onClose} />;
  }
  if (type === "poi") {
    return <PoiCard poi={data as MapPoi} onClose={onClose} />;
  }
  if (type === "geofence") {
    return <GeofenceCard geofence={data as MapGeofence} onClose={onClose} />;
  }
  return null;
}
