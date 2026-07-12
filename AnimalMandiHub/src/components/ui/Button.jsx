import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-primary-dark text-white hover:bg-primary-dark/90 shadow-md hover:shadow-lg transition-all duration-200',
  secondary: 'bg-white border border-stone/20 text-primary-dark hover:bg-surface-warm hover:border-primary/30 transition-all duration-200',
  danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all duration-200',
  success: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-all duration-200',
  warning: 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200 transition-all duration-200',
  ghost: 'bg-transparent text-stone hover:bg-surface-warm hover:text-primary-dark transition-all duration-200',
  outline: 'bg-transparent text-primary-dark border border-primary/30 hover:bg-primary/5 transition-all duration-200',
  accent: 'bg-primary text-white hover:bg-primary/90 shadow-md transition-all duration-200',
  link: 'bg-transparent text-primary p-0 h-auto underline underline-offset-4 hover:text-primary-dark transition-all duration-200',
  'ghost-danger': 'bg-transparent text-red-500 hover:bg-red-50 transition-all duration-200',
};

const sizes = {
  xs: 'h-7 px-2.5 text-xs rounded-lg gap-1',
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-11 px-5 text-base rounded-xl gap-2',
  xl: 'h-12 px-6 text-base rounded-xl gap-2',
  '2xl': 'h-14 px-8 text-lg rounded-2xl gap-2.5',
  icon: 'h-10 w-10 rounded-xl',
  'icon-sm': 'h-8 w-8 rounded-lg',
  'icon-md': 'h-10 w-10 rounded-xl',
  'icon-lg': 'h-12 w-12 rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-200
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        focus-ring
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin-slow" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
}
