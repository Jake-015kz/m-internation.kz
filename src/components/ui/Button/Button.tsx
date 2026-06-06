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
    "bg-[var(--accent-primary)] text-[var(--bg-base)] font-semibold shadow-[0_0_20px_oklch(0.82_0.22_135/0.3),0_0_40px_oklch(0.82_0.22_135/0.15)] hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.98]",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--fg-primary)] hover:border-[var(--accent-primary)] hover:bg-[oklch(0.82_0.22_135/0.08)]",
  ghost: "bg-transparent text-[var(--fg-primary)] hover:bg-[oklch(1_0_0/0.05)]",
  glass:
    "bg-[linear-gradient(135deg,oklch(1_0_0/0.08)_0%,oklch(1_0_0/0.03)_100%)] backdrop-blur-[12px] border border-[oklch(1_0_0/0.1)] text-[var(--fg-primary)] hover:border-[oklch(0.82_0.22_135/0.25)] hover:bg-[linear-gradient(135deg,oklch(0.82_0.22_135/0.1)_0%,oklch(1_0_0/0.05)_100%)] hover:shadow-[0_8px_32px_oklch(0_0_0/0.25)]",
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
          "inline-flex items-center justify-center gap-2 font-body font-medium rounded-[0.375rem] cursor-pointer border-none outline-none no-nowrap tracking-[0.02em] relative overflow-hidden transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed",
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
