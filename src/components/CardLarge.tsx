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
  // Base classes from Figma card_lg_testimonials
  const baseClasses = [
    'flex flex-col',
    'p-[48px]',
    'gap-[168px]',
    'relative',
    'font-geist',
    'tracking-[-0.011em]',
    'leading-relaxed',
    'items-start',
    'bg-gradient-testimonial',
    'rounded-lg',
    'min-h-[520px]',
    'w-[408px]',
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
      <div className="flex gap-1 w-[116px] h-5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 text-[#FFCC80]"
            fill="#FFCC80"
            aria-hidden="true"
          />
        ))}
      </div>
      
      {/* Quote and author container */}
      <div className="flex flex-col gap-8 items-end w-[312px]">
        <p className="text-2xl font-medium text-text-inverse w-full">
          {quote}
        </p>
        <p className="text-base font-medium text-text-inverse text-right w-full">
          {author}
        </p>
      </div>
    </CardLarge>
  );
};