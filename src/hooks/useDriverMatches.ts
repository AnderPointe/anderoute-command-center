/**
 * useDriverMatches — loads available drivers for load assignment.
 * Queries driver_locations table; falls back to mock drivers.
 */

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { drivers as mockDrivers } from "@/data/mock";
import type { DriverMatch } from "@/types/loads";

function mockToMatch(d: (typeof mockDrivers)[0]): DriverMatch {
  return {
    driver_id: d.id,
    driver_name: d.name,
    unit_number: d.vehicleId,
    vehicle_type: d.vehicleType,
    status: d.status,
    latitude: d.currentLocation.lat,
    longitude: d.currentLocation.lng,
    current_load_number: d.currentLoadId,
    last_ping_at: new Date(Date.now() - Math.random() * 120000).toISOString(),
    battery_level: Math.floor(60 + Math.random() * 40),
    is_available: ["waiting", "break", "offduty"].includes(d.status),
  };
}

export function useDriverMatches() {
  const [drivers, setDrivers] = useState<DriverMatch[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("driver_locations")
        .select("*")
        .order("last_ping_at", { ascending: false });

      if (error || !data || data.length === 0) {
        setDrivers(mockDrivers.map(mockToMatch));
      } else {
        setDrivers(
          data.map((row) => ({
            driver_id: row.driver_id,
            driver_name: row.unit_number ?? row.driver_id,
            unit_number: row.unit_number,
            vehicle_type: row.vehicle_type,
            status: row.status,
            latitude: row.latitude,
            longitude: row.longitude,
            current_load_number: row.current_load_number,
            last_ping_at: row.last_ping_at,
            battery_level: null,
            is_available: ["idle", "break"].includes(row.status),
          })),
        );
      }
    } catch {
      setDrivers(mockDrivers.map(mockToMatch));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { drivers, loading, refresh: load };
}
