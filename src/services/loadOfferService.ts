/**
 * loadOfferService — manage load offers to drivers.
 * Offers are human-initiated by dispatchers only.
 */

import { supabase } from "@/integrations/supabase/client";
import { getCompanyId, insertLoadEvent } from "./loadService";

export async function offerLoadToDriver(
  loadId: string,
  driverId: string,
  driverName: string,
  expiresInMinutes = 30,
): Promise<void> {
  const companyId = getCompanyId();
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000).toISOString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).from("load_offers").upsert(
    {
      company_id: companyId,
      load_id: loadId,
      driver_id: driverId,
      offer_status: "sent",
      offered_at: new Date().toISOString(),
      expires_at: expiresAt,
      metadata: {},
    },
    { onConflict: "load_id,driver_id" },
  );

  if (error) throw error;

  await insertLoadEvent(loadId, "offer_sent", `Load offered to ${driverName}`, {
    description: `Offer expires in ${expiresInMinutes} minutes`,
  });
}

export async function respondToOffer(
  offerId: string,
  response: "accepted" | "declined",
  responseNote?: string,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("load_offers")
    .update({
      offer_status: response,
      responded_at: new Date().toISOString(),
      response_note: responseNote ?? null,
    })
    .eq("id", offerId);

  if (error) throw error;
}
