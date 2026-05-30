import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCompanyId } from "@/services/loadService";
import type { LoadNote } from "@/types/loads";

export function useLoadNotes(loadId: string | null) {
  const [notes, setNotes] = useState<LoadNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    if (!loadId) return;
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from("load_notes")
        .select("*")
        .eq("load_id", loadId)
        .order("created_at", { ascending: false });
      setNotes((data as LoadNote[]) ?? []);
    } catch {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [loadId]);

  const addNote = useCallback(
    async (noteText: string, authorName = "Dispatcher") => {
      if (!loadId || !noteText.trim()) return;
      setAdding(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = await (supabase as any)
          .from("load_notes")
          .insert({
            company_id: getCompanyId(),
            load_id: loadId,
            note: noteText.trim(),
            created_by_name: authorName,
            is_internal: true,
          })
          .select()
          .single();
        if (data) setNotes((prev) => [data as LoadNote, ...prev]);
      } catch {
        console.warn("[useLoadNotes] insert failed — table may not exist");
      } finally {
        setAdding(false);
      }
    },
    [loadId],
  );

  useEffect(() => {
    load();
  }, [load]);

  return { notes, loading, adding, addNote, refresh: load };
}
