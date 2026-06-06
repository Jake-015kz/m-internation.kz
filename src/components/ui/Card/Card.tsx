import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "glass" | "glassSubtle" | "glassStrong";
  children?: React.ReactNode;
  hover?: boolean;
}

const variantStyles: Record<string, string> = {
  default: "bg-transparent",
  bordered: "bg-transparent border border-[var(--border-subtle)] p-6",
  glass:
    "bg-[linear-gradient(135deg,oklch(1_0_0/0.08)_0%,oklch(1_0_0/0.02)_100%)] backdrop-blur-[10px] border border-[oklch(1_0_0/0.1)] shadow-[inset_0_1px_0_oklch(1_0_0/0.15),0_8px_32px_oklch(0_0_0/0.3)] p-6",
  glassSubtle:
    "bg-[linear-gradient(135deg,oklch(1_0_0/0.05)_0%,oklch(1_0_0/0.01)_100%)] backdrop-blur-[8px] border border-[oklch(1_0_0/0.06)] shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_4px_16px_oklch(0_0_0/0.2)] p-6",
  glassStrong:
    "bg-[linear-gradient(135deg,oklch(1_0_0/0.12)_0%,oklch(1_0_0/0.04)_100%)] backdrop-blur-[12px] border border-[oklch(1_0_0/0.14)] shadow-[inset_0_1px_0_oklch(1_0_0/0.2),inset_0_-1px_0_oklch(0_0_0/0.1),0_16px_48px_oklch(0_0_0/0.4)] p-6",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className = "", variant = "default", hover = false, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
          variantStyles[variant],
          hover &&
            "cursor-pointer hover:border-[oklch(0.82_0.22_135/0.25)] hover:shadow-[0_12px_40px_oklch(0_0_0/0.3),0_0_20px_oklch(0.82_0.22_135/0.08)] hover:-translate-y-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export { Card };
