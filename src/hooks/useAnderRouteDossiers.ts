import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type {
  ArrivalStatus,
  CargoManifest,
  Driver,
  DriverDossier,
  DriverStatus,
  Shipment,
  Vehicle,
} from "@/types/anderroute";
import { DEMO_DRIVERS } from "@/data/anderrouteDemo";

type DbDriver = any;
type DbVehicle = any;
type DbLoad = any;
type DbShipment = any;
type DbTelemetry = any;

const STATUS_MAP: Record<string, DriverStatus> = {
  waiting: "available",
  available: "available",
  offered: "available",
  accepted: "en_route",
  pickup: "en_route",
  loaded: "en_route",
  transit: "en_route",
  delivered: "delivering",
  delayed: "delayed",
  break: "break",
  offduty: "offline",
};

function mapDriverStatus(s: string | null | undefined): DriverStatus {
  return STATUS_MAP[s ?? ""] ?? "available";
}

function mapPriority(load: DbLoad | undefined): Shipment["priority"] {
  if (load?.requires_hazmat) return "critical";
  if (load?.requires_cdl) return "high";
  return "standard";
}

function mapArrival(status: string | null | undefined): ArrivalStatus {
  if (status === "delayed") return "delayed";
  return "on_time";
}

function buildDossier(
  d: DbDriver,
  veh: DbVehicle | undefined,
  load: DbLoad | undefined,
  ship: DbShipment | undefined,
  tel: DbTelemetry | undefined,
): DriverDossier {
  const driver: Driver = {
    id: d.id,
    company_id: d.company_id,
    user_id: d.user_id ?? "",
    name: d.name,
    role: d.license_type === "CDL" ? "CDL Freight Driver" : "Driver",
    photo_url:
      d.photo_url ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(d.name)}&backgroundColor=14b8a6`,
    phone: d.phone ?? "—",
    status: mapDriverStatus(d.status),
    current_lat: Number(d.current_lat ?? 32.78),
    current_lng: Number(d.current_lng ?? -96.8),
    speed_mph: Number(tel?.speed_mph ?? 0),
    bearing: 90,
    last_seen_at: d.last_updated ?? new Date().toISOString(),
    vehicle_id: d.vehicle_id ?? "",
  };

  const vehicle: Vehicle = {
    id: veh?.id ?? "",
    company_id: veh?.company_id ?? d.company_id,
    unit_number: veh?.unit_number ?? "—",
    make: veh?.make ?? "—",
    model: veh?.model ?? "",
    type: veh?.type ?? "Vehicle",
    plate: veh?.plate ?? "—",
    fuel_level: Number(veh?.fuel_level ?? tel?.fuel_or_battery_percent ?? 75),
    battery_level: veh?.battery_level ?? null,
    engine_status: veh?.engine_status ?? "Nominal",
    temperature_status: veh?.temperature_f
      ? `Cabin — ${veh.temperature_f}°F`
      : "Nominal",
  };

  const weight = Number(ship?.weight ?? load?.weight ?? 0);
  const volume = Number(ship?.volume ?? 0);
  const capacity = Number(ship?.capacity_percent ?? tel?.route_progress_percent ?? 70);
  const progress = Number(ship?.route_progress ?? tel?.route_progress_percent ?? 0);
  const etaMin = Number(ship?.eta_minutes ?? 0);

  const shipment: Shipment = {
    id: ship?.id ?? `pending-${d.id}`,
    company_id: d.company_id,
    driver_id: d.id,
    vehicle_id: d.vehicle_id ?? "",
    cargo_type: ship?.cargo_type ?? load?.commodity ?? ship?.commodity ?? "General Freight",
    hauling_description:
      ship?.hauling_description ??
      `${ship?.commodity ?? load?.commodity ?? "Freight"} for ${ship?.customer_name ?? load?.customer ?? "customer"}.`,
    pickup_address: ship?.pickup_address ?? load?.pickup_location ?? "—",
    pickup_lat: 32.7555,
    pickup_lng: -97.3308,
    dropoff_address: ship?.dropoff_address ?? load?.dropoff_location ?? "—",
    dropoff_lat: 32.7767,
    dropoff_lng: -96.797,
    eta_minutes: etaMin,
    scheduled_arrival: ship?.scheduled_arrival_at
      ? new Date(ship.scheduled_arrival_at).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      : ship?.eta ?? "—",
    arrival_status: mapArrival(ship?.status ?? d.status),
    priority: mapPriority(load),
    space_used_percent: capacity,
    capacity_used_percent: capacity,
    weight,
    volume,
    route_progress_percent: progress,
    status: (ship?.status ?? d.status ?? "active").toString(),
  };

  const manifest: CargoManifest = {
    id: `MAN-${shipment.id}`,
    shipment_id: shipment.id,
    category: shipment.cargo_type,
    item_count: ship?.quantity ?? load?.quantity ?? 0,
    weight,
    volume,
    special_handling_notes: ship?.special_instructions ?? "Standard handling.",
    temperature_requirement: ship?.is_temperature_controlled
      ? "Temperature controlled"
      : "Ambient",
    hazmat: !!ship?.is_hazardous || !!load?.requires_hazmat,
    priority: shipment.priority,
  };

  return { driver, vehicle, shipment, manifest };
}

async function fetchDossiers(): Promise<DriverDossier[]> {
  const [{ data: drivers }, { data: vehicles }, { data: loads }, { data: shipments }, { data: telemetry }] =
    await Promise.all([
      supabase.from("drivers").select("*").order("name"),
      supabase.from("vehicles").select("*"),
      supabase.from("loads").select("*"),
      supabase.from("shipments").select("*"),
      supabase
        .from("telemetry")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(200),
    ]);

  if (!drivers?.length) return [];

  const vehById = new Map((vehicles ?? []).map((v: any) => [v.id, v]));
  const loadByDriver = new Map<string, any>();
  (loads ?? []).forEach((l: any) => {
    if (l.assigned_driver_id) loadByDriver.set(l.assigned_driver_id, l);
  });
  const shipByLoad = new Map((shipments ?? []).map((s: any) => [s.load_id, s]));
  const telByDriver = new Map<string, any>();
  (telemetry ?? []).forEach((t: any) => {
    if (!telByDriver.has(t.driver_id)) telByDriver.set(t.driver_id, t);
  });

  return drivers.map((d: any) => {
    const load = loadByDriver.get(d.id);
    const ship = load ? shipByLoad.get(load.id) : undefined;
    return buildDossier(d, vehById.get(d.vehicle_id), load, ship, telByDriver.get(d.id));
  });
}

export function useDriverDossiers() {
  const [dossiers, setDossiers] = useState<DriverDossier[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const rows = await fetchDossiers();
        if (!active) return;
        if (rows.length === 0) {
          setDossiers(DEMO_DRIVERS);
          setUsingDemo(true);
        } else {
          setDossiers(rows);
          setUsingDemo(false);
        }
      } catch (e) {
        console.warn("[anderroute] fetch failed, using demo data", e);
        if (active) {
          setDossiers(DEMO_DRIVERS);
          setUsingDemo(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();

    const channel = supabase
      .channel("anderroute-dossiers")
      .on("postgres_changes", { event: "*", schema: "public", table: "drivers" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "shipments" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "telemetry" }, load)
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { dossiers, loading, usingDemo };
}

export function useDriverDossier(driverId: string) {
  const { dossiers, loading, usingDemo } = useDriverDossiers();
  const dossier = dossiers.find((d) => d.driver.id === driverId) ?? dossiers[0];
  return { dossier, loading, usingDemo };
}
