import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "ghost" | "glass";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent-primary)] text-[var(--bg-base)] font-semibold shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98]",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--fg-primary)] hover:border-[var(--accent-primary)] hover:bg-[oklch(0.82_0.22_135/0.06)] hover:shadow-[var(--shadow-sm)]",
  ghost: "bg-transparent text-[var(--fg-primary)] hover:bg-[oklch(1_0_0/0.05)]",
  glass:
    "bg-[linear-gradient(135deg,oklch(1_0_0/0.06)_0%,oklch(1_0_0/0.02)_100%)] backdrop-blur-[8px] border border-[oklch(1_0_0/0.08)] text-[var(--fg-primary)] hover:border-[oklch(0.82_0.22_135/0.2)] hover:bg-[linear-gradient(135deg,oklch(0.82_0.22_135/0.08)_0%,oklch(1_0_0/0.04)_100%)] hover:shadow-[var(--shadow-sm)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      isLoading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-body font-medium rounded-[0.5rem] cursor-pointer border-none outline-none no-nowrap tracking-[0.01em] relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          isLoading && "pointer-events-none",
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="w-[1em] h-[1em] border-2 border-current border-r-transparent rounded-full animate-[spin_0.6s_linear_infinite]" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
