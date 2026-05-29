/**
 * useMapGeofences — loads geofences from Supabase or uses demo data.
 *
 * Supports both polygon-based (map_geofences.geometry JSONB) and
 * radius-based (logistics_map_geofences) geofences.
 */

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { MapGeofence } from "@/types/map";

const DEMO_GEOFENCES: MapGeofence[] = [
  {
    id: "demo-geofence-dfw",
    company_id: "demo",
    name: "DFW Dispatch Zone",
    description: "Demo dispatch operating zone around Dallas/Fort Worth",
    geofence_type: "dispatch_zone",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-97.35, 32.55],
          [-96.55, 32.55],
          [-96.55, 33.15],
          [-97.35, 33.15],
          [-97.35, 32.55],
        ],
      ],
    },
    color: "#14b8a6",
    is_active: true,
    metadata: { priority: "high", region: "DFW" },
  },
  {
    id: "demo-geofence-warehouse",
    company_id: "demo",
    name: "Fort Worth Warehouse Zone",
    description: "Yard and loading dock area",
    geofence_type: "yard_zone",
    latitude: 32.7555,
    longitude: -97.3308,
    radius_m: 500,
    geometry: null,
    color: "#f59e0b",
    is_active: true,
    metadata: { capacity: 50 },
  },
  {
    id: "demo-geofence-restricted",
    company_id: "demo",
    name: "Airport Restricted Zone",
    description: "DFW Airport restricted vehicle area",
    geofence_type: "restricted",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-97.07, 32.87],
          [-97.01, 32.87],
          [-97.01, 32.93],
          [-97.07, 32.93],
          [-97.07, 32.87],
        ],
      ],
    },
    color: "#ef4444",
    is_active: true,
    metadata: {},
  },
];

export function useMapGeofences() {
  const [geofences, setGeofences] = useState<MapGeofence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try new map_geofences table first (polygon-based, from the new SQL)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: newData, error: newErr } = await (supabase as any)
        .from("map_geofences")
        .select("*")
        .eq("is_active", true);

      if (!newErr && newData && newData.length > 0) {
        const mapped: MapGeofence[] = (
          newData as {
            id: string;
            company_id: string;
            name: string;
            description?: string | null;
            geofence_type: string;
            geometry: { type: "Polygon"; coordinates: number[][][] } | null;
            color: string;
            is_active: boolean;
            metadata: Record<string, unknown>;
            created_at?: string;
            updated_at?: string;
          }[]
        ).map((row) => ({
          id: row.id,
          company_id: row.company_id,
          name: row.name,
          description: row.description,
          geofence_type: row.geofence_type,
          geometry: row.geometry,
          color: row.color,
          is_active: row.is_active,
          metadata: row.metadata ?? {},
          created_at: row.created_at,
          updated_at: row.updated_at,
        }));
        setGeofences([
          ...mapped,
          ...DEMO_GEOFENCES.filter((d) => !mapped.some((m) => m.id === d.id)),
        ]);
        return;
      }

      // Try legacy logistics_map_geofences table
      const { data: legacyData, error: legacyErr } = await supabase
        .from("logistics_map_geofences")
        .select("*")
        .eq("status", "active");

      if (!legacyErr && legacyData && legacyData.length > 0) {
        const mapped: MapGeofence[] = legacyData.map((row) => ({
          id: row.id,
          company_id: row.company_id,
          name: row.name,
          description: row.notes,
          geofence_type: row.type,
          geometry: null,
          latitude: row.latitude,
          longitude: row.longitude,
          radius_m: row.radius_m,
          color: "#14b8a6",
          is_active: row.status === "active",
          metadata: {},
          created_at: row.created_at,
          updated_at: row.updated_at,
        }));
        setGeofences(mapped);
        return;
      }

      // Fall back to demo geofences
      setGeofences(DEMO_GEOFENCES);
    } catch {
      setGeofences(DEMO_GEOFENCES);
      setError("Could not load geofences — showing demo data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { geofences, loading, error, refresh: load };
}
