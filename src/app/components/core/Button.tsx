import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-normal ease-spring active:scale-95';
  
  const variants = {
    primary: 'bg-brand text-white shadow-[0_4px_12px_rgba(240,123,12,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(240,123,12,0.4)]',
    secondary: 'bg-secondary text-white shadow-[0_4px_12px_hsla(147,32%,38%,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_hsla(147,32%,38%,0.4)]',
    outline: 'bg-transparent border-2 border-border-strong text-text-primary hover:border-text-primary hover:bg-bg-sunken',
    ghost: 'bg-transparent border-2 border-transparent text-text-secondary hover:bg-bg-sunken hover:text-text-primary',
    danger: 'bg-error-bg text-error hover:bg-error hover:text-white',
  };

  const sizes = {
    sm: 'py-1.5 px-4 text-xs',
    md: 'py-2.5 px-5 text-sm',
    lg: 'py-3.5 px-6 text-base',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
