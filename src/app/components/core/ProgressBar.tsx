import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  color?: 'brand' | 'success' | 'warning' | 'error' | 'info' | 'sage' | 'sky';
  size?: 'xs' | 'sm' | 'md';
  showLabel?: boolean;
  animated?: boolean;
  label?: string;
  sublabel?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  color = 'brand',
  size = 'sm',
  showLabel = false,
  animated = true,
  label,
  sublabel,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const trackColors = {
    brand: 'bg-brand-light',
    success: 'bg-success-bg',
    warning: 'bg-warning-bg',
    error: 'bg-error-bg',
    info: 'bg-info-bg',
    sage: 'bg-brand-sage-50',
    sky: 'bg-brand-sky-50',
  };

  const fillColors = {
    brand: 'bg-brand',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
    sage: 'bg-brand-sage-500',
    sky: 'bg-brand-sky-400',
  };

  const heights = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  return (
    <div className="w-full">
      {(label || showLabel) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-semibold text-text-secondary">{label}</span>}
          {showLabel && (
            <span className="text-xs font-bold text-text-primary">{value}{sublabel}</span>
          )}
        </div>
      )}
      <div className={`w-full ${trackColors[color]} rounded-md overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} ${fillColors[color]} rounded-md progress-fill ${animated ? 'transition-all duration-slow ease-decelerate' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
