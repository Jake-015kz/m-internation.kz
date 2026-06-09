// src/services/subscriptionService.ts
"use server";

import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");

export type SubscriptionResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function subscribeEmail(
  prevState: SubscriptionResult | null,
  formData: FormData
): Promise<SubscriptionResult> {
  const email = formData.get("email")?.toString() ?? "";

  const result = emailSchema.safeParse(email);
  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Invalid email" };
  }

  // TODO: Integrate with actual email service (Mailchimp, SendGrid, etc.)
  // For now, just validate and return success
  console.log("[subscription] New subscriber:", email);

  return { success: true, message: "Successfully subscribed!" };
}
