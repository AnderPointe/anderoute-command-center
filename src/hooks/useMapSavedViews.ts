/**
 * useMapSavedViews — loads saved map views from Supabase or defaults.
 *
 * Falls back to DEFAULT_SAVED_VIEWS if Supabase table is not available.
 */

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_SAVED_VIEWS } from "@/types/map";
import type { MapSavedView, LayerKey } from "@/types/map";

export function useMapSavedViews() {
  const [views, setViews] = useState<MapSavedView[]>(DEFAULT_SAVED_VIEWS);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from("map_saved_views")
        .select("*")
        .order("is_default", { ascending: false })
        .order("name");

      if (error || !data || data.length === 0) {
        setViews(DEFAULT_SAVED_VIEWS);
        return;
      }

      const mapped: MapSavedView[] = data.map(
        (row: {
          id: string;
          name: string;
          description?: string | null;
          center_lng: number;
          center_lat: number;
          zoom: number;
          pitch: number;
          bearing: number;
          layer_settings?: Record<string, boolean>;
          is_default?: boolean;
          is_shared?: boolean;
        }) => ({
          id: row.id,
          name: row.name,
          description: row.description,
          center_lng: row.center_lng,
          center_lat: row.center_lat,
          zoom: Number(row.zoom),
          pitch: Number(row.pitch),
          bearing: Number(row.bearing),
          layer_settings: (row.layer_settings ?? {}) as Partial<Record<LayerKey, boolean>>,
          is_default: row.is_default,
          is_shared: row.is_shared,
        }),
      );

      // Merge Supabase views with defaults (put Supabase first, then any missing defaults)
      const supabaseIds = new Set(mapped.map((v) => v.id));
      const missing = DEFAULT_SAVED_VIEWS.filter((v) => !supabaseIds.has(v.id));
      setViews([...mapped, ...missing]);
    } catch {
      setViews(DEFAULT_SAVED_VIEWS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { views, loading, refresh: load };
}
