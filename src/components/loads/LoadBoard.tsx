/**
 * LoadBoard — Anderoute / Andetrack logistics command center.
 *
 * Features: Kanban board, Supabase Realtime, filters, driver assignment,
 * load creation, load detail drawer, timeline, notes, documents, map preview.
 *
 * All dispatch actions are human-approved — no autonomous assignment.
 */

import { useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { LoadBoardHeader } from "./LoadBoardHeader";
import { LoadBoardFilters } from "./LoadBoardFilters";
import { LoadKanban } from "./LoadKanban";
import { LoadDetailsDrawer } from "./LoadDetailsDrawer";
import { AssignDriverModal } from "./AssignDriverModal";
import { CreateLoadModal } from "./CreateLoadModal";
import { useLoads } from "@/hooks/useLoads";
import type { Load, LoadFilters } from "@/types/loads";
import { DEFAULT_FILTERS } from "@/types/loads";

export function LoadBoard() {
  const [filters, setFilters] = useState<LoadFilters>(DEFAULT_FILTERS);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [assignLoad, setAssignLoad] = useState<Load | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const { loads, allLoads, loading, error, realtimeStatus, refresh, usingDemo } = useLoads({
    ...filters,
    search: filters.search,
  });

  const handleSearch = (q: string) => setFilters((f) => ({ ...f, search: q }));

  return (
    <div className="space-y-4">
      {/* Header with metrics, search, create button */}
      <LoadBoardHeader
        loads={allLoads}
        realtimeStatus={realtimeStatus}
        usingDemo={usingDemo}
        onSearch={handleSearch}
        searchQuery={filters.search}
        onCreateLoad={() => setShowCreate(true)}
      />

      {/* Filters row */}
      <div className="flex items-center gap-2">
        <LoadBoardFilters filters={filters} onChange={setFilters} />
        <button
          onClick={refresh}
          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0f1a2e] transition-colors"
        >
          <RefreshCw className="size-3.5" />
          Refresh
        </button>
      </div>

      {/* Error banner */}
      {error && !usingDemo && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-4 py-3">
          <AlertTriangle className="size-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-700 dark:text-amber-300">
            <strong>Note:</strong> {error}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-sm text-slate-400 dark:text-slate-500 gap-2">
          <RefreshCw className="size-4 animate-spin" />
          Loading loads…
        </div>
      )}

      {/* Kanban board */}
      {!loading && (
        <LoadKanban
          loads={loads}
          onView={setSelectedLoad}
          onAssign={setAssignLoad}
          onOffer={(load) => {
            setSelectedLoad(load);
          }}
        />
      )}

      {/* Load Detail Drawer */}
      {selectedLoad && (
        <LoadDetailsDrawer
          load={selectedLoad}
          onClose={() => setSelectedLoad(null)}
          onRefresh={refresh}
          onAssign={(load) => {
            setSelectedLoad(null);
            setAssignLoad(load);
          }}
        />
      )}

      {/* Assign Driver Modal */}
      {assignLoad && (
        <AssignDriverModal
          load={assignLoad}
          onClose={() => setAssignLoad(null)}
          onAssigned={() => {
            setAssignLoad(null);
            refresh();
          }}
        />
      )}

      {/* Create Load Modal */}
      {showCreate && (
        <CreateLoadModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            refresh();
          }}
        />
      )}
    </div>
  );
}
