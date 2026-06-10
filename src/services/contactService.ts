// src/services/contactService.ts
"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа").max(100),
  email: z.string().email("Некорректный email адрес"),
  phone: z.string().min(5, "Некорректный номер телефона").max(20).optional(),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов").max(1000),
});

export type ContactResult =
  | { success: true; message: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

export async function submitContactForm(
  prevState: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0]?.toString() ?? "unknown";
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { success: false, error: "Пожалуйста, исправьте ошибки в форме", fieldErrors };
  }

  // TODO: Integrate with actual email/CRM service
  console.log("[contact] New contact form submission:", {
    name: result.data.name,
    email: result.data.email,
    phone: result.data.phone,
    message: result.data.message.substring(0, 50) + "...",
  });

  return { success: true, message: "Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время." };
}
