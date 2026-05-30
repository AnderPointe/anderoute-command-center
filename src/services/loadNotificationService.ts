/**
 * loadNotificationService — create notifications for load events.
 * Fails gracefully if the notifications table does not exist.
 */

import { supabase } from "@/integrations/supabase/client";
import { getCompanyId } from "./loadService";

async function insertNotification(payload: {
  recipient_driver_id?: string | null;
  title: string;
  body: string;
  notification_type: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("notifications").insert({
      company_id: getCompanyId(),
      recipient_driver_id: payload.recipient_driver_id ?? null,
      title: payload.title,
      body: payload.body,
      notification_type: payload.notification_type,
      metadata: payload.metadata ?? {},
      created_at: new Date().toISOString(),
    });
  } catch {
    console.warn(
      "[loadNotificationService] notifications table may not exist yet — skipping notification",
    );
  }
}

export async function notifyLoadAssigned(
  loadNumber: string,
  driverName: string,
  driverId?: string | null,
): Promise<void> {
  await insertNotification({
    recipient_driver_id: driverId,
    title: "Load Assigned",
    body: `${loadNumber} has been assigned to ${driverName}.`,
    notification_type: "load_assigned",
    metadata: { load_number: loadNumber },
  });
}

export async function notifyLoadOffered(
  loadNumber: string,
  driverName: string,
  driverId?: string | null,
): Promise<void> {
  await insertNotification({
    recipient_driver_id: driverId,
    title: "Load Offer",
    body: `You have a new load offer: ${loadNumber}.`,
    notification_type: "load_offered",
    metadata: { load_number: loadNumber },
  });
}

export async function notifyLoadStatusChanged(
  loadNumber: string,
  newStatus: string,
  driverId?: string | null,
): Promise<void> {
  await insertNotification({
    recipient_driver_id: driverId,
    title: "Load Status Updated",
    body: `${loadNumber} status changed to ${newStatus}.`,
    notification_type: "load_status_changed",
    metadata: { load_number: loadNumber, new_status: newStatus },
  });
}

export async function notifyLoadDelivered(
  loadNumber: string,
  driverId?: string | null,
): Promise<void> {
  await insertNotification({
    recipient_driver_id: driverId,
    title: "Load Delivered",
    body: `${loadNumber} has been delivered. Great work!`,
    notification_type: "load_delivered",
    metadata: { load_number: loadNumber },
  });
}

export async function notifyHighPriorityLoadCreated(loadNumber: string): Promise<void> {
  await insertNotification({
    title: "High Priority Load",
    body: `Urgent load ${loadNumber} needs immediate dispatch attention.`,
    notification_type: "high_priority_load",
    metadata: { load_number: loadNumber },
  });
}
