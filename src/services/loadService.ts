/**
 * loadService — Supabase CRUD for loads, with graceful fallback.
 * All mutations are human-initiated — no autonomous dispatch.
 */

import { supabase } from "@/integrations/supabase/client";
import type { Load, LoadStatus, LoadFilters } from "@/types/loads";

const DEMO_COMPANY_ID =
  (import.meta.env.VITE_DEMO_COMPANY_ID as string | undefined) ||
  "11111111-1111-1111-1111-111111111111";

export function getCompanyId(): string {
  return DEMO_COMPANY_ID;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToLoad(row: any): Load {
  return {
    id: row.id,
    company_id: row.company_id,
    load_number: row.load_number,
    customer_name: row.customer_name,
    broker_name: row.broker_name,
    status: row.status as LoadStatus,
    priority: row.priority ?? "normal",
    commodity: row.commodity,
    equipment_type: row.equipment_type,
    weight_lbs: row.weight_lbs,
    miles: row.miles,
    rate: row.rate,
    pickup_name: row.pickup_name,
    pickup_address: row.pickup_address,
    pickup_city: row.pickup_city,
    pickup_state: row.pickup_state,
    pickup_zip: row.pickup_zip,
    pickup_latitude: row.pickup_latitude,
    pickup_longitude: row.pickup_longitude,
    pickup_window_start: row.pickup_window_start,
    pickup_window_end: row.pickup_window_end,
    dropoff_name: row.dropoff_name,
    dropoff_address: row.dropoff_address,
    dropoff_city: row.dropoff_city,
    dropoff_state: row.dropoff_state,
    dropoff_zip: row.dropoff_zip,
    dropoff_latitude: row.dropoff_latitude,
    dropoff_longitude: row.dropoff_longitude,
    dropoff_window_start: row.dropoff_window_start,
    dropoff_window_end: row.dropoff_window_end,
    assigned_driver_id: row.assigned_driver_id,
    assigned_driver_name: row.assigned_driver_name,
    assigned_unit_number: row.assigned_unit_number,
    created_by: row.created_by,
    updated_by: row.updated_by,
    metadata: row.metadata ?? {},
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function fetchLoads(filters?: Partial<LoadFilters>): Promise<Load[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase as any)
    .from("loads")
    .select("*")
    .eq("company_id", DEMO_COMPANY_ID)
    .order("created_at", { ascending: false });

  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.priority) query = query.eq("priority", filters.priority);
  if (filters?.equipment_type) query = query.eq("equipment_type", filters.equipment_type);
  if (filters?.pickup_state) query = query.eq("pickup_state", filters.pickup_state);
  if (filters?.dropoff_state) query = query.eq("dropoff_state", filters.dropoff_state);
  if (filters?.assigned_driver_id)
    query = query.eq("assigned_driver_id", filters.assigned_driver_id);
  if (filters?.unassigned_only) query = query.is("assigned_driver_id", null);
  if (filters?.high_priority_only) query = query.in("priority", ["high", "urgent"]);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(rowToLoad);
}

export async function updateLoadStatus(
  loadId: string,
  newStatus: LoadStatus,
  updatedBy?: string,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("loads")
    .update({
      status: newStatus,
      updated_by: updatedBy ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", loadId)
    .eq("company_id", DEMO_COMPANY_ID);
  if (error) throw error;
}

export async function assignDriver(
  loadId: string,
  driverId: string,
  driverName: string,
  unitNumber?: string | null,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("loads")
    .update({
      assigned_driver_id: driverId,
      assigned_driver_name: driverName,
      assigned_unit_number: unitNumber ?? null,
      status: "assigned",
      updated_at: new Date().toISOString(),
    })
    .eq("id", loadId)
    .eq("company_id", DEMO_COMPANY_ID);
  if (error) throw error;
}

export async function createLoad(
  payload: Omit<Load, "id" | "created_at" | "updated_at">,
): Promise<Load> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("loads")
    .insert({ ...payload, company_id: DEMO_COMPANY_ID })
    .select()
    .single();
  if (error) throw error;
  return rowToLoad(data);
}

export async function insertLoadEvent(
  loadId: string,
  eventType: string,
  title: string,
  extra?: {
    description?: string;
    old_status?: string;
    new_status?: string;
    created_by_name?: string;
  },
): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("load_events").insert({
      company_id: DEMO_COMPANY_ID,
      load_id: loadId,
      event_type: eventType,
      title,
      description: extra?.description ?? null,
      old_status: extra?.old_status ?? null,
      new_status: extra?.new_status ?? null,
      created_by_name: extra?.created_by_name ?? "Dispatcher",
      metadata: {},
    });
  } catch {
    // Non-fatal — event log failure should not block load operation
    console.warn("[loadService] insertLoadEvent failed — table may not exist yet");
  }
}
