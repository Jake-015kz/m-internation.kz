"use client";

import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSubscription } from "@/hooks";

export function SubscriptionForm() {
  const t = useTranslations("footer");
  const { email, setEmail, isSubscribed, error, handleSubscribe } =
    useSubscription();

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
        onSubmit={handleSubscribe}
        aria-label="Newsletter subscription"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("subscription.placeholder")}
          className="flex-1 min-w-0 px-3 md:px-4 py-2.5 md:py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-l-[0.5rem] text-[var(--fg-primary)] font-body text-xs md:text-sm outline-none placeholder:text-[var(--fg-dim)] focus:border-[var(--accent-primary)] transition-colors duration-250"
          required
          aria-label="Email address"
        />
        <button
          type="submit"
          className="flex items-center justify-center px-3 md:px-4 py-2.5 md:py-3 min-h-[44px] bg-[var(--accent-primary)] text-[var(--bg-base)] border-none rounded-r-[0.5rem] cursor-pointer transition-[background-color] duration-250 hover:bg-[var(--accent-primary-hover)] flex-shrink-0"
          aria-label="Subscribe"
        >
          {isSubscribed ? "✓" : <Send size={14} />}
        </button>
      </form>
      {isSubscribed && (
        <p className="mt-2 text-sm text-[var(--success)]" role="alert">
          {t("subscription.success")}
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm text-[var(--error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
