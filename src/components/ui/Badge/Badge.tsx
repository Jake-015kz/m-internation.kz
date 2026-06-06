import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "primary"
  | "outline"
  | "subtle"
  | "lime"
  | "default";
export type BadgeSize = "xs" | "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-[var(--fg-primary)] text-[var(--bg-base)]",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--fg-primary)]",
  subtle: "bg-[var(--bg-surface)] text-[var(--fg-primary)]",
  lime: "bg-[oklch(0.82_0.22_135/0.1)] text-[var(--accent-primary)] border border-[oklch(0.82_0.22_135/0.2)]",
  default:
    "bg-transparent text-[var(--fg-muted)] border border-[var(--border-subtle)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: "text-[0.6rem] px-1.5 py-0.5",
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { children, variant = "default", size = "sm", className = "", ...props },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-mono font-semibold rounded-[0.375rem] whitespace-nowrap uppercase tracking-[0.12em]",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
