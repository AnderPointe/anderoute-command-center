import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { LoadOffer } from "@/types/loads";

export function useLoadOffers(loadId: string | null) {
  const [offers, setOffers] = useState<LoadOffer[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!loadId) return;
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from("load_offers")
        .select("*")
        .eq("load_id", loadId)
        .order("offered_at", { ascending: false });
      setOffers((data as LoadOffer[]) ?? []);
    } catch {
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, [loadId]);

  useEffect(() => {
    load();
  }, [load]);

  return { offers, loading, refresh: load };
}
