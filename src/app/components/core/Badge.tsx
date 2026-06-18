import React from 'react';

type BadgeVariant = 'expiring' | 'critical' | 'fresh' | 'success' | 'warning' | 'info' | 'brand' | 'neutral' | 'ai';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  size?: 'xs' | 'sm';
  dot?: boolean;
  className?: string;
}

export default function Badge({ variant = 'neutral', children, size = 'sm', dot = false, className = '' }: BadgeProps) {
  const styles: Record<BadgeVariant, string> = {
    critical: 'bg-error-bg text-error border-error/20',
    expiring: 'bg-warning-bg text-warning border-warning/20',
    fresh: 'bg-success-bg text-success border-success/20',
    success: 'bg-success-bg text-success border-success/20',
    warning: 'bg-warning-bg text-warning border-warning/20',
    info: 'bg-info-bg text-info border-info/20',
    brand: 'bg-brand-light text-brand border-brand/20',
    neutral: 'bg-bg-sunken text-text-secondary border-border-subtle',
    ai: 'bg-brand-plum-50 text-brand-plum-600 border-brand-plum-200',
  };

  const dotStyles: Record<BadgeVariant, string> = {
    critical: 'bg-error',
    expiring: 'bg-warning',
    fresh: 'bg-success',
    success: 'bg-success',
    warning: 'bg-warning',
    info: 'bg-info',
    brand: 'bg-brand',
    neutral: 'bg-text-tertiary',
    ai: 'bg-brand-plum-500',
  };

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[10px] gap-1',
    sm: 'px-2 py-0.5 text-xs gap-1.5',
  };

  return (
    <span className={`inline-flex items-center font-bold rounded-pill border ${styles[variant]} ${sizeStyles[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
}
