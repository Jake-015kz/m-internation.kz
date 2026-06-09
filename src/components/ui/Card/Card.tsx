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
    "bg-[linear-gradient(135deg,oklch(1_0_0/0.06)_0%,oklch(1_0_0/0.02)_100%)] backdrop-blur-[8px] border border-[oklch(1_0_0/0.08)] shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_4px_20px_oklch(0_0_0/0.2)] p-6",
  glassSubtle:
    "bg-[linear-gradient(135deg,oklch(1_0_0/0.04)_0%,oklch(1_0_0/0.01)_100%)] backdrop-blur-[6px] border border-[oklch(1_0_0/0.05)] shadow-[inset_0_1px_0_oklch(1_0_0/0.08),0_2px_12px_oklch(0_0_0/0.15)] p-6",
  glassStrong:
    "bg-[linear-gradient(135deg,oklch(1_0_0/0.08)_0%,oklch(1_0_0/0.03)_100%)] backdrop-blur-[10px] border border-[oklch(1_0_0/0.12)] shadow-[inset_0_1px_0_oklch(1_0_0/0.15),inset_0_-1px_0_oklch(0_0_0/0.08),0_8px_32px_oklch(0_0_0/0.25)] p-6",
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
          "rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          variantStyles[variant],
          hover &&
            "cursor-pointer hover:border-[oklch(0.82_0.22_135/0.2)] hover:shadow-[0_8px_32px_oklch(0_0_0/0.25),0_0_16px_oklch(0.82_0.22_135/0.06)] hover:-translate-y-1",
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
