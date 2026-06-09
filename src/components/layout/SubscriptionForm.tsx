// src/components/layout/SubscriptionForm.tsx
"use client";

import { useActionState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { subscribeEmail } from "@/services/subscriptionService";

export function SubscriptionForm() {
  const t = useTranslations("footer");
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(subscribeEmail, null);

  return (
    <div className="flex-1 max-w-[28rem]">
      <h3 className="font-heading font-semibold text-sm md:text-base text-[var(--fg-primary)] mb-1.5 md:mb-2">
        {t("subscription.title")}
      </h3>
      <p className="text-xs md:text-sm text-[var(--fg-muted)] mb-3 md:mb-4">
        {t("subscription.description")}
      </p>
      <form
        className="flex gap-0"
        action={(formData) => startTransition(() => formAction(formData))}
        aria-label="Newsletter subscription"
      >
        <input
          type="email"
          name="email"
          placeholder={t("subscription.placeholder")}
          className="flex-1 min-w-0 px-3 md:px-4 py-2.5 md:py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-l-[0.5rem] text-[var(--fg-primary)] font-body text-xs md:text-sm outline-none placeholder:text-[var(--fg-dim)] focus:border-[var(--accent-primary)] transition-colors duration-250"
          required
          aria-label="Email address"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center px-3 md:px-4 py-2.5 md:py-3 min-h-[44px] bg-[var(--accent-primary)] text-[var(--bg-base)] border-none rounded-r-[0.5rem] cursor-pointer transition-[background-color] duration-250 hover:bg-[var(--accent-primary-hover)] flex-shrink-0 disabled:opacity-60 disabled:cursor-wait"
          aria-label="Subscribe"
        >
          {isPending ? (
            <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : state?.success ? (
            "✓"
          ) : (
            <Send size={14} />
          )}
        </button>
      </form>
      {state?.success && (
        <p className="mt-2 text-sm text-[var(--success)]" role="alert">
          {t("subscription.success")}
        </p>
      )}
      {state && !state.success && (
        <p className="mt-2 text-sm text-[var(--error)]" role="alert">
          {state.error}
        </p>
      )}
    </div>
  );
}
