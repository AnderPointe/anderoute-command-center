import { Send, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { useLoadOffers } from "@/hooks/useLoadOffers";

const OFFER_STATUS_CONFIG = {
  sent: { label: "Pending", color: "#f59e0b", Icon: Clock },
  accepted: { label: "Accepted", color: "#22c55e", Icon: CheckCircle },
  declined: { label: "Declined", color: "#ef4444", Icon: XCircle },
  expired: { label: "Expired", color: "#94a3b8", Icon: AlertCircle },
};

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.round(diff)}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  return `${Math.round(diff / 3600)}h ago`;
}

export function LoadOfferPanel({ loadId }: { loadId: string }) {
  const { offers, loading, refresh } = useLoadOffers(loadId);

  if (loading) {
    return (
      <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
        Loading offers…
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {offers.length === 0 ? (
        <div className="py-8 text-center">
          <Send className="size-6 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <div className="text-xs text-slate-400 dark:text-slate-500">No offers sent yet</div>
          <div className="text-[10px] text-slate-300 dark:text-slate-600 mt-0.5">
            Use the Offer button on the load card to send offers
          </div>
        </div>
      ) : (
        offers.map((offer) => {
          const { label, color, Icon } =
            OFFER_STATUS_CONFIG[offer.offer_status] ?? OFFER_STATUS_CONFIG.sent;
          return (
            <div
              key={offer.id}
              className="rounded-xl border border-slate-200 dark:border-[#1e3a5f] bg-white dark:bg-[#0f1a2e] p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-full bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                    {(offer.driver_name ?? "D").charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {offer.driver_name ?? `Driver ${offer.driver_id.slice(0, 8)}`}
                    </div>
                    <div className="text-[9px] text-slate-400 dark:text-slate-500">
                      Offered {timeAgo(offer.offered_at)}
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold"
                  style={{ backgroundColor: color + "20", color }}
                >
                  <Icon className="size-2.5" />
                  {label}
                </div>
              </div>
              {offer.response_note && (
                <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/50 rounded-lg px-2 py-1">
                  "{offer.response_note}"
                </div>
              )}
              {offer.expires_at && offer.offer_status === "sent" && (
                <div className="mt-1.5 flex items-center gap-1 text-[9px] text-amber-500 dark:text-amber-400">
                  <Clock className="size-2.5" />
                  Expires{" "}
                  {new Date(offer.expires_at).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
      <button
        onClick={refresh}
        className="w-full text-[10px] text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 py-1 transition-colors"
      >
        Refresh
      </button>
    </div>
  );
}
