import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EDI_TXNS } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/edi-transactions")({
  head: () => ({ meta: [{ title: "EDI Transactions · Anderoute" }] }),
  component: Page,
});

const tone: Record<string, string> = {
  received: "border-sky-500/30 text-sky-300",
  parsed: "border-sky-500/30 text-sky-300",
  accepted: "border-emerald-500/30 text-emerald-300",
  rejected: "border-rose-500/30 text-rose-300",
  sent: "border-emerald-500/30 text-emerald-300",
  ack: "border-emerald-500/30 text-emerald-300",
  error: "border-rose-500/30 text-rose-300",
};

function Page() {
  const errors = EDI_TXNS.filter((t) => t.status === "error");
  return (
    <V2Page
      icon={<Network className="size-6 text-violet-300" />}
      title="EDI Transaction Viewer"
      blurb="Inbound and outbound transactions per partner, with parse status, acknowledgment status, and an error queue for partner follow-up."
    >
      {errors.length > 0 && (
        <Card className="border-rose-500/30 bg-rose-500/[0.04] p-4">
          <h2 className="text-sm font-semibold text-rose-200">Error queue ({errors.length})</h2>
          <div className="mt-2 space-y-1 text-sm">
            {errors.map((e) => (
              <div key={e.id} className="text-xs text-rose-100/80">
                <span className="font-mono">{e.doc}</span> · {e.partner} · {e.note}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">All transactions</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="p-2">Doc</th><th className="p-2">Partner</th><th className="p-2">Direction</th><th className="p-2">Status</th><th className="p-2">At</th><th className="p-2">Note</th></tr>
            </thead>
            <tbody>
              {EDI_TXNS.map((t) => (
                <tr key={t.id} className="border-t border-white/10">
                  <td className="p-2 font-mono">{t.doc}</td>
                  <td className="p-2">{t.partner}</td>
                  <td className="p-2 text-xs uppercase tracking-wide text-muted-foreground">{t.direction}</td>
                  <td className="p-2"><Badge variant="outline" className={tone[t.status]}>{t.status}</Badge></td>
                  <td className="p-2 text-xs text-muted-foreground">{t.at}</td>
                  <td className="p-2 text-xs text-muted-foreground">{t.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </V2Page>
  );
}
