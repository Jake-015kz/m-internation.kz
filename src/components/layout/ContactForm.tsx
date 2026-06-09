// src/components/layout/ContactForm.tsx
"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContactForm } from "@/services/contactService";

export function ContactForm() {
  const t = useTranslations("contactsPage");
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <section className="py-12 border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        <div className="max-w-[36rem]">
          <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-2 md:text-2xl">
            {t("formTitle")}
          </h2>
          <p className="font-body text-sm text-[var(--fg-muted)] mb-6">
            {t("formDescription")}
          </p>

          <form action={formAction} className="flex flex-col gap-4">
            <div>
              <label htmlFor="contact-name" className="block font-body text-xs text-[var(--fg-secondary)] mb-1.5">
                {t("formName")} *
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                minLength={2}
                maxLength={100}
                placeholder={t("formNamePlaceholder")}
                className="w-full px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[0.5rem] text-[var(--fg-primary)] font-body text-sm outline-none placeholder:text-[var(--fg-dim)] focus:border-[var(--accent-primary)] transition-colors duration-250"
                disabled={isPending}
              />
              {state && !state.success && "name" in (state.fieldErrors || {}) && (
                <p className="mt-1 text-xs text-[var(--error)]">{state.fieldErrors?.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-email" className="block font-body text-xs text-[var(--fg-secondary)] mb-1.5">
                  {t("formEmail")} *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[0.5rem] text-[var(--fg-primary)] font-body text-sm outline-none placeholder:text-[var(--fg-dim)] focus:border-[var(--accent-primary)] transition-colors duration-250"
                  disabled={isPending}
                />
                {state && !state.success && "email" in (state.fieldErrors || {}) && (
                  <p className="mt-1 text-xs text-[var(--error)]">{state.fieldErrors?.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-phone" className="block font-body text-xs text-[var(--fg-secondary)] mb-1.5">
                  {t("formPhone")}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="+7 (777) 123-45-67"
                  className="w-full px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[0.5rem] text-[var(--fg-primary)] font-body text-sm outline-none placeholder:text-[var(--fg-dim)] focus:border-[var(--accent-primary)] transition-colors duration-250"
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-body text-xs text-[var(--fg-secondary)] mb-1.5">
                {t("formMessage")} *
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={1000}
                rows={4}
                placeholder={t("formMessagePlaceholder")}
                className="w-full px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[0.5rem] text-[var(--fg-primary)] font-body text-sm outline-none placeholder:text-[var(--fg-dim)] focus:border-[var(--accent-primary)] transition-colors duration-250 resize-y"
                disabled={isPending}
              />
              {state && !state.success && "message" in (state.fieldErrors || {}) && (
                <p className="mt-1 text-xs text-[var(--error)]">{state.fieldErrors?.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-sm px-6 py-3 min-h-[44px] rounded-[0.5rem] transition-[color,background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait disabled:hover:scale-100 self-start"
            >
              {isPending ? (
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                t("formSubmit")
              )}
            </button>

            {state?.success && (
              <p className="text-sm text-[var(--success)]" role="alert">
                {state.message}
              </p>
            )}
            {state && !state.success && !state.fieldErrors && (
              <p className="text-sm text-[var(--error)]" role="alert">
                {state.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
