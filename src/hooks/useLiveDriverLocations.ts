/**
 * useLiveDriverLocations — subscribes to live driver positions via Supabase Realtime.
 *
 * Primary table: driver_locations (current snapshot per driver)
 * Falls back to mock data if the table is unavailable.
 *
 * A driver is marked stale if last_ping_at is older than STALE_THRESHOLD_MS.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { LiveDriverLocation } from "@/types/map";
import { drivers as mockDrivers } from "@/data/mock";

const STALE_THRESHOLD_MS = 120_000; // 2 minutes

export type RealtimeStatus = "connecting" | "connected" | "offline";

function toMockDriverLocation(d: (typeof mockDrivers)[0]): LiveDriverLocation {
  return {
    driver_id: d.id,
    company_id: "demo",
    unit_number: d.vehicleId,
    vehicle_type: d.vehicleType,
    latitude: d.currentLocation.lat,
    longitude: d.currentLocation.lng,
    speed_mph: d.currentSpeed,
    heading: Math.random() * 360,
    status: (d.status === "transit" ? "driving" : d.status === "break" ? "break" : "idle") as
      | "driving"
      | "idle"
      | "break"
      | "offline",
    current_load_number: d.currentLoadId ?? null,
    eta_minutes: d.eta ? parseInt(d.eta) || null : null,
    last_ping_at: new Date(Date.now() - Math.random() * 60_000).toISOString(),
    driver_name: d.name,
    battery_level: Math.floor(60 + Math.random() * 40),
    signal_strength: Math.floor(60 + Math.random() * 40),
    is_stale: false,
  };
}

function markStale(loc: LiveDriverLocation): LiveDriverLocation {
  const age = Date.now() - new Date(loc.last_ping_at).getTime();
  return { ...loc, is_stale: age > STALE_THRESHOLD_MS };
}

export function useLiveDriverLocations() {
  const [drivers, setDrivers] = useState<LiveDriverLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [realtimeStatus, setRealtimeStatus] = useState<RealtimeStatus>("connecting");
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const usingMock = useRef(false);

  const applyStale = (locs: LiveDriverLocation[]) => locs.map(markStale);

  const loadFromSupabase = useCallback(async () => {
    try {
      // Try driver_locations table first (typed)
      const { data, error } = await supabase
        .from("driver_locations")
        .select("*")
        .order("last_ping_at", { ascending: false });

      if (error || !data || data.length === 0) {
        // Fall back to mock
        usingMock.current = true;
        setDrivers(applyStale(mockDrivers.map(toMockDriverLocation)));
        setLoading(false);
        return;
      }

      usingMock.current = false;
      const locs: LiveDriverLocation[] = data.map((row) => ({
        driver_id: row.driver_id,
        company_id: row.company_id,
        unit_number: row.unit_number,
        vehicle_type: row.vehicle_type,
        latitude: row.latitude,
        longitude: row.longitude,
        speed_mph: row.speed_mph,
        heading: row.heading,
        status: row.status as LiveDriverLocation["status"],
        current_load_number: row.current_load_number,
        eta_minutes: row.eta_minutes,
        last_ping_at: row.last_ping_at,
        driver_name: undefined,
        battery_level: null,
        signal_strength: null,
        is_stale: false,
      }));
      setDrivers(applyStale(locs));
      setLoading(false);
    } catch {
      usingMock.current = true;
      setDrivers(applyStale(mockDrivers.map(toMockDriverLocation)));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromSupabase();

    // Subscribe to Realtime changes on driver_locations
    channelRef.current = supabase
      .channel("anderoute-driver-locations")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "driver_locations" },
        (payload) => {
          if (usingMock.current) return;
          if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
            const row = payload.new as {
              driver_id: string;
              company_id: string;
              unit_number?: string | null;
              vehicle_type?: string | null;
              latitude: number;
              longitude: number;
              speed_mph?: number | null;
              heading?: number | null;
              status: string;
              current_load_number?: string | null;
              eta_minutes?: number | null;
              last_ping_at: string;
            };
            const updated: LiveDriverLocation = {
              driver_id: row.driver_id,
              company_id: row.company_id,
              unit_number: row.unit_number,
              vehicle_type: row.vehicle_type,
              latitude: row.latitude,
              longitude: row.longitude,
              speed_mph: row.speed_mph,
              heading: row.heading,
              status: row.status as LiveDriverLocation["status"],
              current_load_number: row.current_load_number,
              eta_minutes: row.eta_minutes,
              last_ping_at: row.last_ping_at,
              is_stale: false,
            };
            setDrivers((prev) => {
              const idx = prev.findIndex((d) => d.driver_id === updated.driver_id);
              if (idx >= 0) {
                const next = [...prev];
                next[idx] = markStale(updated);
                return next;
              }
              return applyStale([...prev, updated]);
            });
          } else if (payload.eventType === "DELETE") {
            const id = (payload.old as { driver_id: string }).driver_id;
            setDrivers((prev) => prev.filter((d) => d.driver_id !== id));
          }
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setRealtimeStatus("connected");
        } else if (status === "CLOSED" || status === "CHANNEL_ERROR") {
          setRealtimeStatus("offline");
        } else {
          setRealtimeStatus("connecting");
        }
      });

    // If mock mode, mark as offline (no real Realtime)
    if (usingMock.current) {
      setRealtimeStatus("offline");
    }

    // Refresh stale flags every 30 seconds
    const staleTimer = setInterval(() => {
      setDrivers((prev) => applyStale(prev));
    }, 30_000);

    return () => {
      channelRef.current?.unsubscribe();
      clearInterval(staleTimer);
    };
  }, [loadFromSupabase]);

  return {
    drivers,
    loading,
    realtimeStatus,
    refresh: loadFromSupabase,
    usingMock: usingMock.current,
  };
}
