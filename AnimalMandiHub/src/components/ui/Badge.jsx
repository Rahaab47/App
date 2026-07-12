import React from 'react';

const variants = {
  primary: 'bg-primary-50 text-primary border-primary/20',
  secondary: 'bg-surface-warm text-stone border-stone/12',
  accent: 'bg-accent-light text-accent-dark border-accent/20',
  success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  danger: 'bg-red-50 text-red-600 border-red-200',
  warning: 'bg-amber-50 text-amber-600 border-amber-200',
  info: 'bg-blue-50 text-blue-600 border-blue-200',
  neutral: 'bg-surface text-stone-light border-stone/10',
};

const sizes = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-sm px-3 py-1.5',
};

export default function Badge({
  children,
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  dot = false,
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${variants[variant] || variants.secondary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          variant === 'success' ? 'bg-emerald-500' :
          variant === 'danger' ? 'bg-red-500' :
          variant === 'warning' ? 'bg-amber-500' :
          'bg-primary'
        }`} />
      )}
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {children}
    </span>
  );
}
