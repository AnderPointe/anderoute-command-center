/**
 * useLoads — loads Supabase loads with Realtime subscription.
 * Falls back to DEMO_LOADS when the table is not yet created.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchLoads, getCompanyId } from "@/services/loadService";
import { DEMO_LOADS } from "@/types/loads";
import type { Load, LoadFilters } from "@/types/loads";

export type RealtimeStatus = "connecting" | "connected" | "offline";

export function useLoads(filters?: Partial<LoadFilters>) {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realtimeStatus, setRealtimeStatus] = useState<RealtimeStatus>("connecting");
  const usingDemo = useRef(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLoads(filters);
      if (data.length === 0 && !filters?.status && !filters?.search) {
        usingDemo.current = true;
        setLoads(DEMO_LOADS);
      } else {
        usingDemo.current = false;
        setLoads(data);
      }
    } catch {
      usingDemo.current = true;
      setLoads(DEMO_LOADS);
      setError("Using demo data — Supabase loads table not yet available.");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    load();

    if (usingDemo.current) {
      setRealtimeStatus("offline");
      return;
    }

    channelRef.current = supabase
      .channel("anderoute-loads")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "loads",
          filter: `company_id=eq.${getCompanyId()}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload: any) => {
          if (payload.eventType === "INSERT") {
            setLoads((prev) => [payload.new as Load, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setLoads((prev) =>
              prev.map((l) => (l.id === (payload.new as Load).id ? (payload.new as Load) : l)),
            );
          } else if (payload.eventType === "DELETE") {
            setLoads((prev) => prev.filter((l) => l.id !== (payload.old as { id: string }).id));
          }
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setRealtimeStatus("connected");
        else if (status === "CLOSED" || status === "CHANNEL_ERROR") setRealtimeStatus("offline");
        else setRealtimeStatus("connecting");
      });

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [load]);

  // Client-side text search (supplements server-side filters)
  const filtered = filters?.search
    ? loads.filter((l) => {
        const q = filters.search!.toLowerCase();
        return (
          l.load_number.toLowerCase().includes(q) ||
          (l.customer_name ?? "").toLowerCase().includes(q) ||
          (l.broker_name ?? "").toLowerCase().includes(q) ||
          (l.commodity ?? "").toLowerCase().includes(q) ||
          (l.pickup_city ?? "").toLowerCase().includes(q) ||
          (l.pickup_state ?? "").toLowerCase().includes(q) ||
          (l.dropoff_city ?? "").toLowerCase().includes(q) ||
          (l.dropoff_state ?? "").toLowerCase().includes(q) ||
          (l.assigned_driver_name ?? "").toLowerCase().includes(q)
        );
      })
    : loads;

  return {
    loads: filtered,
    allLoads: loads,
    loading,
    error,
    realtimeStatus,
    refresh: load,
    usingDemo: usingDemo.current,
  };
}
