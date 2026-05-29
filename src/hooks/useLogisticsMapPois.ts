/**
 * useLogisticsMapPois — loads POIs from logistics_map_pois table.
 * Falls back to demo POIs if the table is empty or unavailable.
 */

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { MapPoi, PoiCategory } from "@/types/map";

// Demo POIs for when Supabase has no data
const DEMO_POIS: MapPoi[] = [
  {
    id: "demo-depot-1",
    company_id: "demo",
    name: "Main Depot — Dallas",
    category: "depot",
    latitude: 32.7767,
    longitude: -96.797,
    city: "Dallas",
    state: "TX",
    is_active: true,
    is_public: false,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-warehouse-1",
    company_id: "demo",
    name: "Anderoute Warehouse — Fort Worth",
    category: "warehouse",
    latitude: 32.7555,
    longitude: -97.3308,
    city: "Fort Worth",
    state: "TX",
    is_active: true,
    is_public: false,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-truck-stop-1",
    company_id: "demo",
    name: "Pilot Travel Center — I-20",
    category: "truck_stop",
    latitude: 32.4849,
    longitude: -97.077,
    address: "I-20 & Hwy 287",
    city: "Mansfield",
    state: "TX",
    phone: "(817) 555-0100",
    is_active: true,
    is_public: true,
    metadata: { fuel: true, parking: true, showers: true },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-airport-1",
    company_id: "demo",
    name: "Dallas/Fort Worth International Airport",
    category: "airport",
    latitude: 32.8998,
    longitude: -97.0403,
    city: "DFW",
    state: "TX",
    website: "https://www.dfwairport.com",
    is_active: true,
    is_public: true,
    metadata: { cargo: true, iata: "DFW" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-fuel-1",
    company_id: "demo",
    name: "Love's Travel Stop — Waco",
    category: "fuel",
    latitude: 31.5493,
    longitude: -97.1467,
    city: "Waco",
    state: "TX",
    is_active: true,
    is_public: true,
    metadata: { diesel: true },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-customer-1",
    company_id: "demo",
    name: "Acme Manufacturing",
    category: "customer",
    latitude: 33.2148,
    longitude: -97.1331,
    city: "Denton",
    state: "TX",
    phone: "(940) 555-0123",
    is_active: true,
    is_public: false,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-maintenance-1",
    company_id: "demo",
    name: "Fleet Maintenance Center",
    category: "maintenance",
    latitude: 32.9483,
    longitude: -97.2711,
    city: "North Richland Hills",
    state: "TX",
    is_active: true,
    is_public: false,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function useLogisticsMapPois(categoryFilter?: PoiCategory[]) {
  const [pois, setPois] = useState<MapPoi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Stable serialized key to avoid infinite re-renders from array references
  const categoryKey = categoryFilter ? categoryFilter.slice().sort().join(",") : "";

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from("logistics_map_pois").select("*").eq("is_active", true);

      if (categoryFilter && categoryFilter.length > 0) {
        query = query.in("category", categoryFilter);
      }

      const { data, error: err } = await query;

      if (err || !data || data.length === 0) {
        // Fallback to demo POIs filtered by category
        const filtered =
          categoryFilter && categoryFilter.length > 0
            ? DEMO_POIS.filter((p) => categoryFilter.includes(p.category))
            : DEMO_POIS;
        setPois(filtered);
      } else {
        const mapped: MapPoi[] = data.map((row) => ({
          id: row.id,
          company_id: row.company_id,
          name: row.name,
          category: row.category as PoiCategory,
          latitude: row.latitude,
          longitude: row.longitude,
          address: row.address,
          city: row.city,
          state: row.state,
          zip: row.zip,
          phone: row.phone,
          website: row.website,
          description: row.description,
          is_active: row.is_active,
          is_public: row.is_public,
          metadata: (row.metadata ?? {}) as Record<string, unknown>,
          created_at: row.created_at,
          updated_at: row.updated_at,
        }));
        setPois(mapped);
      }
    } catch {
      setPois(DEMO_POIS);
      setError("Could not load POIs — showing demo data.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryKey]);

  useEffect(() => {
    load();
  }, [load]);

  return { pois, loading, error, refresh: load };
}
