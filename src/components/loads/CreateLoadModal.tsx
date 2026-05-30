import { useState } from "react";
import { X, Package, Loader2, Plus } from "lucide-react";
import { createLoad, getCompanyId, insertLoadEvent } from "@/services/loadService";
import { notifyHighPriorityLoadCreated } from "@/services/loadNotificationService";
import type { LoadPriority } from "@/types/loads";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const EQUIPMENT_TYPES = [
  "Box Truck",
  "Dry Van",
  "Reefer",
  "Flatbed",
  "Hotshot",
  "Cargo Van",
  "Step Deck",
  "Power Only",
];

export function CreateLoadModal({ onClose, onCreated }: Props) {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    load_number: `LOAD-${Date.now().toString().slice(-6)}`,
    customer_name: "",
    broker_name: "",
    priority: "normal" as LoadPriority,
    commodity: "",
    equipment_type: "",
    weight_lbs: "",
    miles: "",
    rate: "",
    pickup_name: "",
    pickup_city: "",
    pickup_state: "",
    pickup_zip: "",
    dropoff_name: "",
    dropoff_city: "",
    dropoff_state: "",
    dropoff_zip: "",
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleCreate = async () => {
    if (!form.load_number.trim()) {
      setError("Load number is required.");
      return;
    }
    setCreating(true);
    setError(null);
    try {
      const load = await createLoad({
        company_id: getCompanyId(),
        load_number: form.load_number.trim(),
        customer_name: form.customer_name || null,
        broker_name: form.broker_name || null,
        status: "open",
        priority: form.priority,
        commodity: form.commodity || null,
        equipment_type: form.equipment_type || null,
        weight_lbs: form.weight_lbs ? parseFloat(form.weight_lbs) : null,
        miles: form.miles ? parseFloat(form.miles) : null,
        rate: form.rate ? parseFloat(form.rate) : null,
        pickup_name: form.pickup_name || null,
        pickup_city: form.pickup_city || null,
        pickup_state: form.pickup_state || null,
        pickup_zip: form.pickup_zip || null,
        dropoff_name: form.dropoff_name || null,
        dropoff_city: form.dropoff_city || null,
        dropoff_state: form.dropoff_state || null,
        dropoff_zip: form.dropoff_zip || null,
        metadata: {},
      });
      await insertLoadEvent(load.id, "created", "Load created", {
        created_by_name: "Dispatcher",
      });
      if (form.priority === "high" || form.priority === "urgent") {
        await notifyHighPriorityLoadCreated(form.load_number);
      }
      onCreated();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create load. Check Supabase setup.");
    } finally {
      setCreating(false);
    }
  };

  const field = (
    label: string,
    key: keyof typeof form,
    opts?: { type?: string; required?: boolean; placeholder?: string },
  ) => (
    <div>
      <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
        {label}
        {opts?.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={opts?.type ?? "text"}
        value={form[key]}
        onChange={(e) => set(key, e.target.value as (typeof form)[typeof key])}
        placeholder={opts?.placeholder}
        className="w-full rounded-lg border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#0f1a2e] text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 px-2.5 py-1.5 outline-none focus:border-teal-400 dark:focus:border-teal-500 transition-colors"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0b1526] rounded-2xl border border-slate-200 dark:border-[#1e3a5f] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-[#1e3a5f] shrink-0">
          <div className="flex items-center gap-2">
            <Package className="size-4 text-teal-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Create New Load
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Load info */}
          <div className="grid grid-cols-2 gap-3">
            {field("Load Number", "load_number", { required: true, placeholder: "LOAD-1001" })}
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => set("priority", e.target.value as LoadPriority)}
                className="w-full rounded-lg border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#0f1a2e] text-xs text-slate-700 dark:text-slate-200 px-2.5 py-1.5 outline-none"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {field("Customer Name", "customer_name", { placeholder: "Walmart DC" })}
            {field("Broker Name", "broker_name", { placeholder: "Broker Inc." })}
          </div>

          {/* Cargo */}
          <div className="pt-2 border-t border-slate-100 dark:border-[#1e3a5f]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Cargo Details
            </div>
            <div className="grid grid-cols-2 gap-3">
              {field("Commodity", "commodity", { placeholder: "Retail Freight" })}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Equipment Type
                </label>
                <select
                  value={form.equipment_type}
                  onChange={(e) => set("equipment_type", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#0f1a2e] text-xs text-slate-700 dark:text-slate-200 px-2.5 py-1.5 outline-none"
                >
                  <option value="">Select type</option>
                  {EQUIPMENT_TYPES.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              {field("Weight (lbs)", "weight_lbs", { type: "number", placeholder: "12000" })}
              {field("Miles", "miles", { type: "number", placeholder: "214" })}
              {field("Rate ($)", "rate", { type: "number", placeholder: "850" })}
            </div>
          </div>

          {/* Pickup */}
          <div className="pt-2 border-t border-slate-100 dark:border-[#1e3a5f]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-500 dark:text-teal-400 mb-2">
              Pickup Location
            </div>
            <div className="grid grid-cols-2 gap-3">
              {field("Name", "pickup_name", { placeholder: "Dallas Warehouse" })}
              {field("City", "pickup_city", { placeholder: "Dallas" })}
              {field("State", "pickup_state", { placeholder: "TX" })}
              {field("ZIP", "pickup_zip", { placeholder: "75201" })}
            </div>
          </div>

          {/* Drop-off */}
          <div className="pt-2 border-t border-slate-100 dark:border-[#1e3a5f]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-500 dark:text-orange-400 mb-2">
              Drop-off Location
            </div>
            <div className="grid grid-cols-2 gap-3">
              {field("Name", "dropoff_name", { placeholder: "Fort Worth Customer" })}
              {field("City", "dropoff_city", { placeholder: "Fort Worth" })}
              {field("State", "dropoff_state", { placeholder: "TX" })}
              {field("ZIP", "dropoff_zip", { placeholder: "76102" })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-[#1e3a5f] shrink-0 space-y-3">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 px-3 py-2 text-xs text-red-600 dark:text-red-400">
              {error}
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
              onClick={handleCreate}
              disabled={creating}
              className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-40 rounded-xl py-2.5 transition-colors"
            >
              {creating ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Plus className="size-3.5" />
              )}
              {creating ? "Creating…" : "Create Load"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
