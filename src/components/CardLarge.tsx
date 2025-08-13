// src/components/CardLarge.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardLargeProps {
  children: React.ReactNode;
  className?: string;
}

export const CardLarge: React.FC<CardLargeProps> = ({
  children,
  className,
}) => {
  // Responsive base classes with proper scaling and motion
  const baseClasses = [
    'flex flex-col',
    'p-6 tablet:p-8 desktop:p-6xl', // 24 / 32 / 48 px from tokens
    'gap-4 tablet:gap-5 desktop:gap-6', // 16 / 20 / 24 px from tokens
    'justify-between', // align stars to top and text block to bottom
    'relative',
    'font-geist',
    'tracking-[-0.011em]',
    'leading-relaxed',
    'items-start',
    'bg-gradient-testimonial',
    'rounded-lg',
    'min-h-[320px] tablet:min-h-[400px] desktop:min-h-[520px]', // Responsive height
    'w-full', // Full width, controlled by parent container
    // Motion and interaction states
    'transition-all duration-normal ease-in-out',
    'hover:shadow-lg hover:-translate-y-1',
    'cursor-default',
    // Grid spans from design system
    'col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-4',
  ].join(' ');

  return (
    <div className={cn(baseClasses, className)}>
      {children}
    </div>
  );
};

// Testimonial Card component
interface TestimonialCardProps {
  rating: number;
  quote: string;
  author: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating,
  quote,
  author,
  className,
}) => {
  return (
    <CardLarge className={className}>
      {/* Star rating */}
      <div className="flex gap-1 w-[100px] tablet:w-[116px] h-5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 tablet:w-5 tablet:h-5 text-[#FFCC80] transition-transform duration-fast hover:scale-110"
            fill="#FFCC80"
            aria-hidden="true"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
      
      {/* Quote and author container - responsive width */}
      <div className="flex flex-col gap-8 items-end w-full max-w-[280px] tablet:max-w-[312px]">
        <p className="text-base tablet:text-[18px] desktop:text-[20px] font-medium text-text-inverse w-full">
          {quote}
        </p>
        <p className="text-xs tablet:text-base font-medium text-text-inverse text-right w-full">
          {author}
        </p>
      </div>
    </CardLarge>
  );
};