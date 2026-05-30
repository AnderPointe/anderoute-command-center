import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { useLoadEvents } from "@/hooks/useLoadEvents";

const EVENT_ICONS: Record<string, React.ElementType> = {
  created: CheckCircle,
  status_changed: Circle,
  offer_sent: Circle,
  driver_assigned: CheckCircle,
  note_added: Circle,
  document_uploaded: Circle,
  delivered: CheckCircle,
};

const EVENT_COLORS: Record<string, string> = {
  created: "#14b8a6",
  status_changed: "#3b82f6",
  offer_sent: "#8b5cf6",
  driver_assigned: "#f97316",
  note_added: "#94a3b8",
  document_uploaded: "#94a3b8",
  delivered: "#22c55e",
};

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.round(diff)}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString();
}

export function LoadTimeline({ loadId }: { loadId: string }) {
  const { events, loading } = useLoadEvents(loadId);

  if (loading) {
    return (
      <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
        Loading timeline…
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="py-8 text-center">
        <AlertCircle className="size-6 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
        <div className="text-xs text-slate-400 dark:text-slate-500">No events yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {events.map((event, i) => {
        const Icon = EVENT_ICONS[event.event_type] ?? Circle;
        const color = EVENT_COLORS[event.event_type] ?? "#94a3b8";
        const isLast = i === events.length - 1;
        return (
          <div key={event.id} className="flex gap-3">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div
                className="size-6 rounded-full flex items-center justify-center shrink-0 mt-1"
                style={{ backgroundColor: color + "22", border: `1.5px solid ${color}` }}
              >
                <Icon className="size-3" style={{ color }} />
              </div>
              {!isLast && <div className="w-px flex-1 my-1 bg-slate-200 dark:bg-slate-700" />}
            </div>
            {/* Content */}
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {event.title}
                  </div>
                  {event.description && (
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {event.description}
                    </div>
                  )}
                  {event.old_status && event.new_status && (
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {event.old_status} → {event.new_status}
                    </div>
                  )}
                  {event.created_by_name && (
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      by {event.created_by_name}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 shrink-0 mt-0.5">
                  {timeAgo(event.created_at)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
