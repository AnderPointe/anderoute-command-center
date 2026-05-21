import { createFileRoute } from "@tanstack/react-router";
import { UserCheck } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { PERM_MATRIX } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/permissions")({
  head: () => ({ meta: [{ title: "Permissions · Anderoute" }] }),
  component: Page,
});

function Page() {
  const roles = Array.from(new Set(PERM_MATRIX.map((p) => p.role)));
  const perms = Array.from(new Set(PERM_MATRIX.map((p) => p.perm)));
  const has = (role: string, perm: string) =>
    PERM_MATRIX.find((p) => p.role === role && p.perm === perm)?.allowed;
  return (
    <V2Page
      icon={<UserCheck className="size-6 text-violet-300" />}
      title="Advanced Permission Matrix"
      blurb="Roles × permissions. Customer and driver roles are deliberately walled off from internal risk scoring; only admin/owner can approve AI actions or manage API keys."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="p-2">Permission</th>
                {roles.map((r) => <th key={r} className="p-2 capitalize">{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {perms.map((perm) => (
                <tr key={perm} className="border-t border-white/10">
                  <td className="p-2">{perm}</td>
                  {roles.map((r) => {
                    const v = has(r, perm);
                    return (
                      <td key={r} className="p-2">
                        {v === undefined ? <span className="text-muted-foreground">—</span>
                          : v ? <span className="text-emerald-300">✓</span>
                          : <span className="text-rose-300">✗</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </V2Page>
  );
}
