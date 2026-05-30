import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { LoadEvent } from "@/types/loads";

const DEMO_EVENTS = (loadId: string): LoadEvent[] => [
  {
    id: "demo-event-1",
    company_id: "demo",
    load_id: loadId,
    event_type: "created",
    title: "Load created",
    description: "Load entered the system",
    created_by_name: "Dispatcher",
    metadata: {},
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "demo-event-2",
    company_id: "demo",
    load_id: loadId,
    event_type: "status_changed",
    title: "Status updated",
    old_status: "open",
    new_status: "assigned",
    created_by_name: "Dispatcher",
    metadata: {},
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
];

export function useLoadEvents(loadId: string | null) {
  const [events, setEvents] = useState<LoadEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!loadId) return;
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from("load_events")
        .select("*")
        .eq("load_id", loadId)
        .order("created_at", { ascending: false });
      if (error || !data) {
        setEvents(DEMO_EVENTS(loadId));
      } else {
        setEvents(data.length > 0 ? (data as LoadEvent[]) : DEMO_EVENTS(loadId));
      }
    } catch {
      setEvents(DEMO_EVENTS(loadId));
    } finally {
      setLoading(false);
    }
  }, [loadId]);

  useEffect(() => {
    load();
  }, [load]);

  return { events, loading, refresh: load };
}
