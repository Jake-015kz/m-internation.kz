import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Badge.module.scss';

export type BadgeVariant = 'primary' | 'outline' | 'subtle' | 'lime' | 'default';
export type BadgeSize = 'xs' | 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', size = 'sm', className = '', ...props }, ref) => {
    const classNames = [
      styles.badge,
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
