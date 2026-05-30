import {
  X,
  MapPin,
  Truck,
  Package,
  DollarSign,
  Clock,
  User,
  Calendar,
  FileText,
  MessageSquare,
  Map as MapIcon,
  Activity,
  Send,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Load, LoadStatus } from "@/types/loads";
import { STATUS_COLORS, KANBAN_COLUMNS, PRIORITY_COLORS, PRIORITY_LABELS } from "@/types/loads";
import { LoadTimeline } from "./LoadTimeline";
import { LoadNotesPanel } from "./LoadNotesPanel";
import { LoadOfferPanel } from "./LoadOfferPanel";
import { LoadDocumentsPanel } from "./LoadDocumentsPanel";
import { LoadMapPreview } from "./LoadMapPreview";
import { updateLoadStatus, insertLoadEvent } from "@/services/loadService";

type Tab =
  | "overview"
  | "stops"
  | "driver"
  | "offers"
  | "timeline"
  | "notes"
  | "documents"
  | "messages"
  | "map";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: Package },
  { id: "stops", label: "Stops", icon: MapPin },
  { id: "timeline", label: "Timeline", icon: Activity },
  { id: "notes", label: "Notes", icon: FileText },
  { id: "offers", label: "Offers", icon: Send },
  { id: "documents", label: "Docs", icon: FileText },
  { id: "map", label: "Map", icon: MapIcon },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

const STATUS_ACTIONS: { status: LoadStatus; label: string }[] = [
  { status: "offered", label: "Mark Offered" },
  { status: "accepted", label: "Mark Accepted" },
  { status: "assigned", label: "Mark Assigned" },
  { status: "pickup", label: "En Route Pickup" },
  { status: "at_pickup", label: "Arrived Pickup" },
  { status: "loaded", label: "Mark Loaded" },
  { status: "transit", label: "En Route Drop-off" },
  { status: "at_dropoff", label: "Arrived Drop-off" },
  { status: "delivered", label: "Mark Delivered" },
  { status: "cancelled", label: "Cancel Load" },
];

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3 py-1.5">
      <span className="text-[10px] text-slate-400 dark:text-slate-500 w-24 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-xs text-slate-700 dark:text-slate-200 flex-1">{value}</span>
    </div>
  );
}

function formatDatetime(iso?: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface Props {
  load: Load;
  onClose: () => void;
  onRefresh: () => void;
  onAssign: (load: Load) => void;
}

export function LoadDetailsDrawer({ load, onClose, onRefresh, onAssign }: Props) {
  const [tab, setTab] = useState<Tab>("overview");
  const [updating, setUpdating] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const statusColor = STATUS_COLORS[load.status] ?? "#94a3b8";

  const handleStatusChange = async (newStatus: LoadStatus) => {
    if (updating) return;
    setUpdating(true);
    setStatusMenuOpen(false);
    try {
      await updateLoadStatus(load.id, newStatus);
      await insertLoadEvent(load.id, "status_changed", `Status → ${newStatus}`, {
        old_status: load.status,
        new_status: newStatus,
      });
      onRefresh();
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-lg bg-white dark:bg-[#0b1526] border-l border-slate-200 dark:border-[#1e3a5f] shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-4 py-3 border-b border-slate-200 dark:border-[#1e3a5f] shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                {load.load_number}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                style={{ backgroundColor: statusColor + "22", color: statusColor }}
              >
                {load.status.replace("_", " ")}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                style={{
                  backgroundColor: PRIORITY_COLORS[load.priority] + "22",
                  color: PRIORITY_COLORS[load.priority],
                }}
              >
                {PRIORITY_LABELS[load.priority]}
              </span>
            </div>
            {load.customer_name && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {load.customer_name}
                {load.broker_name ? ` · ${load.broker_name}` : ""}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Action bar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-100 dark:border-[#1e3a5f] shrink-0">
          {/* Status change */}
          <div className="relative">
            <button
              onClick={() => setStatusMenuOpen((v) => !v)}
              disabled={updating}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-60 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              {updating ? "Updating…" : "Update Status"}
              <ArrowRight className="size-3" />
            </button>
            {statusMenuOpen && (
              <div className="absolute top-full left-0 mt-1 z-50 w-48 rounded-xl border border-slate-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0b1526] shadow-2xl py-1 overflow-hidden">
                {STATUS_ACTIONS.map((a) => (
                  <button
                    key={a.status}
                    onClick={() => handleStatusChange(a.status)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-colors",
                      a.status === "cancelled"
                        ? "text-red-500 dark:text-red-400"
                        : "text-slate-700 dark:text-slate-200",
                      a.status === load.status && "opacity-40 cursor-default",
                    )}
                    disabled={a.status === load.status}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onAssign(load)}
            className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 hover:bg-orange-100 dark:hover:bg-orange-500/20 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <User className="size-3" /> Assign Driver
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-slate-100 dark:border-[#1e3a5f] overflow-x-auto shrink-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors",
                tab === id
                  ? "bg-teal-50 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5",
              )}
            >
              <Icon className="size-3" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4">
          {tab === "overview" && (
            <div className="space-y-1 divide-y divide-slate-100 dark:divide-[#1e3a5f]">
              <Row label="Load #" value={load.load_number} />
              <Row label="Customer" value={load.customer_name} />
              <Row label="Broker" value={load.broker_name} />
              <Row label="Commodity" value={load.commodity} />
              <Row label="Equipment" value={load.equipment_type} />
              <Row
                label="Weight"
                value={load.weight_lbs ? `${load.weight_lbs.toLocaleString()} lbs` : undefined}
              />
              <Row
                label="Miles"
                value={load.miles ? `${load.miles.toLocaleString()} mi` : undefined}
              />
              <Row label="Rate" value={load.rate ? `$${load.rate.toLocaleString()}` : undefined} />
              {load.rate && load.miles && load.miles > 0 && (
                <Row label="Rate/Mile" value={`$${(load.rate / load.miles).toFixed(2)}/mi`} />
              )}
              <Row label="Driver" value={load.assigned_driver_name} />
              <Row label="Unit" value={load.assigned_unit_number} />
              <Row label="Created" value={formatDatetime(load.created_at)} />
              <Row label="Updated" value={formatDatetime(load.updated_at)} />
            </div>
          )}

          {tab === "stops" && (
            <div className="space-y-4">
              {/* Pickup */}
              <div className="rounded-xl border border-teal-200 dark:border-teal-500/20 bg-teal-50 dark:bg-teal-500/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-[10px] font-bold">
                    P
                  </div>
                  <span className="text-sm font-bold text-teal-700 dark:text-teal-300">Pickup</span>
                </div>
                <div className="space-y-1 text-xs">
                  {load.pickup_name && (
                    <div className="font-semibold text-slate-700 dark:text-slate-200">
                      {load.pickup_name}
                    </div>
                  )}
                  {load.pickup_address && (
                    <div className="text-slate-500 dark:text-slate-400">{load.pickup_address}</div>
                  )}
                  <div className="text-slate-500 dark:text-slate-400">
                    {load.pickup_city}, {load.pickup_state} {load.pickup_zip}
                  </div>
                  {load.pickup_window_start && (
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 mt-1">
                      <Clock className="size-3" />
                      {formatDatetime(load.pickup_window_start)}
                      {load.pickup_window_end && ` → ${formatDatetime(load.pickup_window_end)}`}
                    </div>
                  )}
                </div>
              </div>

              {/* Drop-off */}
              <div className="rounded-xl border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">
                    D
                  </div>
                  <span className="text-sm font-bold text-orange-700 dark:text-orange-300">
                    Drop-off
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  {load.dropoff_name && (
                    <div className="font-semibold text-slate-700 dark:text-slate-200">
                      {load.dropoff_name}
                    </div>
                  )}
                  {load.dropoff_address && (
                    <div className="text-slate-500 dark:text-slate-400">{load.dropoff_address}</div>
                  )}
                  <div className="text-slate-500 dark:text-slate-400">
                    {load.dropoff_city}, {load.dropoff_state} {load.dropoff_zip}
                  </div>
                  {load.dropoff_window_start && (
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 mt-1">
                      <Clock className="size-3" />
                      {formatDatetime(load.dropoff_window_start)}
                      {load.dropoff_window_end && ` → ${formatDatetime(load.dropoff_window_end)}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === "timeline" && <LoadTimeline loadId={load.id} />}
          {tab === "notes" && <LoadNotesPanel loadId={load.id} />}
          {tab === "offers" && <LoadOfferPanel loadId={load.id} />}
          {tab === "documents" && <LoadDocumentsPanel loadId={load.id} />}
          {tab === "map" && <LoadMapPreview load={load} />}

          {tab === "messages" && (
            <div className="py-8 text-center">
              <MessageSquare className="size-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Load Chat
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                Create a load-specific messenger thread to coordinate with the driver.
              </div>
              <button className="flex items-center gap-2 mx-auto bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
                <MessageSquare className="size-3.5" />
                Open Load Chat
              </button>
            </div>
          )}

          {tab === "driver" && (
            <div className="space-y-3">
              {load.assigned_driver_name ? (
                <div className="rounded-xl border border-slate-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0f1a2e] p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center text-white font-bold">
                      {load.assigned_driver_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {load.assigned_driver_name}
                      </div>
                      {load.assigned_unit_number && (
                        <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <Truck className="size-3" />
                          {load.assigned_unit_number}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onAssign(load)}
                    className="w-full text-xs font-semibold text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 rounded-lg py-2 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors"
                  >
                    Reassign Driver
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <User className="size-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    No driver assigned
                  </div>
                  <button
                    onClick={() => onAssign(load)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    Assign Driver
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
