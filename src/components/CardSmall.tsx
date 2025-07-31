// src/components/CardSmall.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardSmallProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const CardSmall: React.FC<CardSmallProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <div className={cn(
      // Base styles from Figma card_sm_white
      'flex flex-col items-center',
      'p-[48px]',
      'gap-4',
      'bg-background-secondary',
      'rounded-xl',
      'min-h-[240px]',
      'w-[300px]',
      // Grid spans from design system
      'col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3',
      className
    )}>
      <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center">
        {React.createElement(icon, { className: "w-8 h-8 text-text-inverse" })}
      </div>
      <h3 className="text-heading text-xl font-bold text-text-primary text-center w-[160px]">
        {title}
      </h3>
      <p className="text-body text-sm text-text-primary text-center w-[160px]">
        {description}
      </p>
    </div>
  );
};