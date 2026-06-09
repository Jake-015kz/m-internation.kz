import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SocialPlatform = "instagram" | "tiktok";

export interface SocialIconProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  platform: SocialPlatform;
  showLabel?: boolean;
}

const SOCIAL_CONFIG: Record<SocialPlatform, { label: string; url: string }> = {
  instagram: { label: "Instagram", url: "https://www.instagram.com" },
  tiktok: { label: "TikTok", url: "https://www.tiktok.com" },
};

export function SocialIcon({
  platform,
  showLabel = false,
  className = "",
  ...props
}: SocialIconProps) {
  const config = SOCIAL_CONFIG[platform];

  return (
    <a
      href={props.href || config.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={config.label}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-[0.5rem] border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--bg-surface)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden",
        'before:content-[""] before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-250',
        platform === "instagram" &&
          "before:bg-[linear-gradient(135deg,var(--social-instagram),var(--social-instagram-hover))]",
        platform === "tiktok" &&
          "before:bg-[linear-gradient(135deg,var(--social-tiktok),var(--social-tiktok-hover),#fe2c55)]",
        "hover:border-transparent hover:text-white hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)] hover:before:opacity-100",
        "active:translate-y-0 active:scale-[0.95]",
        showLabel && "w-auto px-3 py-2 gap-2",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center transition-all duration-250 hover:scale-110">
        {platform === "instagram" && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        )}
        {platform === "tiktok" && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        )}
      </span>
      {showLabel && (
        <span className="relative z-10 text-sm text-[var(--fg-muted)]">
          {config.label}
        </span>
      )}
    </a>
  );
}
