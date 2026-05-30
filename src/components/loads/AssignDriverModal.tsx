import { useState } from "react";
import { X, UserCheck, Loader2 } from "lucide-react";
import { LoadDriverMatchPanel } from "./LoadDriverMatchPanel";
import { assignDriver } from "@/services/loadService";
import { notifyLoadAssigned } from "@/services/loadNotificationService";
import { insertLoadEvent } from "@/services/loadService";
import type { Load, DriverMatch } from "@/types/loads";

interface Props {
  load: Load;
  onClose: () => void;
  onAssigned: () => void;
}

export function AssignDriverModal({ load, onClose, onAssigned }: Props) {
  const [selected, setSelected] = useState<DriverMatch | null>(null);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssign = async () => {
    if (!selected || assigning) return;
    setAssigning(true);
    setError(null);
    try {
      await assignDriver(load.id, selected.driver_id, selected.driver_name, selected.unit_number);
      await insertLoadEvent(
        load.id,
        "driver_assigned",
        `Driver assigned: ${selected.driver_name}`,
        {
          description: selected.unit_number ? `Unit: ${selected.unit_number}` : undefined,
        },
      );
      await notifyLoadAssigned(load.load_number, selected.driver_name, selected.driver_id);
      onAssigned();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Assignment failed. Please try again.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#0b1526] rounded-2xl border border-slate-200 dark:border-[#1e3a5f] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-[#1e3a5f] shrink-0">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Assign Driver</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {load.load_number} · {load.pickup_city}, {load.pickup_state} → {load.dropoff_city},{" "}
              {load.dropoff_state}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Driver list */}
        <div className="flex-1 overflow-y-auto p-4">
          <LoadDriverMatchPanel onSelect={setSelected} selectedDriverId={selected?.driver_id} />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-[#1e3a5f] shrink-0 space-y-3">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 px-3 py-2 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
          {selected && (
            <div className="rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 px-3 py-2 text-xs text-teal-700 dark:text-teal-300">
              Assigning <strong>{selected.driver_name}</strong>
              {selected.unit_number && ` (${selected.unit_number})`} to {load.load_number}
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1e3a5f] rounded-xl py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={!selected || assigning}
              className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-40 rounded-xl py-2.5 transition-colors"
            >
              {assigning ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <UserCheck className="size-3.5" />
              )}
              {assigning ? "Assigning…" : "Confirm Assignment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
