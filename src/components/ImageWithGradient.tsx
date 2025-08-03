// src/components/ImageWithGradient.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageWithGradientProps {
  src?: string;
  alt: string;
  className?: string;
  height?: string;
  width?: string;
  gradientFrom?: string;
  gradientTo?: string;
  placeholder?: boolean;
}

export const ImageWithGradient: React.FC<ImageWithGradientProps> = ({
  src,
  alt,
  className,
  height = 'h-[528px]',
  width = 'w-full',
  gradientFrom = '#CFE0F6',
  gradientTo = '#F5F5F5',
  placeholder = false,
}) => {
  return (
    <div className={cn(
      'relative rounded-xl overflow-hidden',
      width,
      height,
      className
    )}>
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(to bottom, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* Image or Placeholder */}
      {src && !placeholder ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div 
          className="absolute inset-0 rounded-xl opacity-50"
          style={{
            background: `linear-gradient(to bottom, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          }}
        />
      )}
    </div>
  );
}; 