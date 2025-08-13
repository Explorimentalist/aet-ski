// src/components/Button.tsx
import React, { forwardRef } from 'react';
import { ButtonProps } from '@/types';
import { Loader2 } from 'lucide-react';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
}, ref) => {
  // Base classes matching Figma specifications
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-0',
    'disabled:cursor-not-allowed',
    'box-border',
    // Figma typography specs
    'font-geist',
    'text-base',
    'leading-[150%]',
    'tracking-[-0.011em]',
    'text-center',
  ].join(' ');
  
  // Variant classes based on Figma specifications
  const variantClasses = {
    primary: disabled 
      ? 'bg-[#B3B7BB] text-white border-0' // Disabled state from Figma
      : 'bg-[#1D4747] hover:bg-[#0C2626] text-white border-0 focus:ring-[rgba(29,71,71,0.1)]',
    secondary: disabled
      ? 'bg-transparent border-2 border-[#B3B7BB] text-[#B3B7BB]' // Disabled state from Figma
      : 'bg-transparent hover:bg-white border-2 border-[#1D4747] hover:border-[#0C2626] text-[#1D4747] hover:text-[#0C2626] focus:ring-[rgba(29,71,71,0.1)]',
  };
  
  // Size classes matching Figma specifications exactly
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg gap-2', // Custom small size
    md: 'px-4 py-2 rounded-lg gap-2.5', // Figma: padding: 8px 16px
    lg: 'px-6 py-3 rounded-lg gap-2.5', // Figma: padding: 12px 24px
    'left-icon': 'rounded-lg gap-1', // Custom padding handled in style
    'right-icon': 'rounded-lg gap-1', // Custom padding handled in style
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button
      ref={ref}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        // Exact Figma specifications
        borderRadius: '8px',
        fontSize: '16px',
        lineHeight: '150%',
        letterSpacing: '-0.011em',
        fontWeight: '500',
        // Exact padding from Figma based on size
        ...(size === 'lg' && { padding: '12px 24px' }),
        ...(size === 'md' && { padding: '8px 16px' }),
        ...(size === 'sm' && { padding: '6px 12px' }),
        ...(size === 'left-icon' && { padding: '8px 16px 8px 10px' }),
        ...(size === 'right-icon' && { padding: '8px 10px 8px 16px' }),
        // Gap for icons - different for icon variations
        gap: size === 'left-icon' || size === 'right-icon' ? '4px' : '10px',
      }}
    >
      {loading && <Loader2 className="w-6 h-6 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';