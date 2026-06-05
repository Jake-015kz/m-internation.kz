import type { AnchorHTMLAttributes } from "react";
import styles from "./SocialIcon.module.scss";

type SocialPlatform = "instagram" | "tiktok";

export interface SocialIconProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  platform: SocialPlatform;
  showLabel?: boolean;
}

const SOCIAL_CONFIG: Record<SocialPlatform, { label: string; url: string }> = {
  instagram: {
    label: "Instagram",
    url: "https://www.instagram.com",
  },
  tiktok: {
    label: "TikTok",
    url: "https://www.tiktok.com",
  },
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
      className={`${styles.socialIcon} ${showLabel ? styles.withLabel : ""} ${className}`}
      aria-label={config.label}
      {...props}
    >
      {platform === "instagram" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x="17.5" y="6.5" x1="17.51" y1="6.5" />
        </svg>
      )}
      {platform === "tiktok" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      )}
      {showLabel && <span>{config.label}</span>}
    </a>
  );
}
