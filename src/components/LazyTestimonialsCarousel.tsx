// src/components/LazyTestimonialsCarousel.tsx
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { TestimonialsCarouselSkeleton } from '@/components/fallbacks/TestimonialsCarouselFallback';
import { trackLazyLoadStart, performanceTracker } from '@/utils/performanceMetrics';

// Dynamic import with proper fallback
const TestimonialsCarousel = dynamic(
  () => import('./TestimonialsCarousel').then(module => ({ 
    default: module.TestimonialsCarousel 
  })),
  {
    loading: () => <TestimonialsCarouselSkeleton />,
    ssr: false,
  }
);

// Re-export types for convenience
export type { TestimonialData } from './TestimonialsCarousel';

interface LazyTestimonialsCarouselProps {
  testimonials: Array<{
    rating: number;
    quote: string;
    author: string;
  }>;
  className?: string;
}

export const LazyTestimonialsCarousel: React.FC<LazyTestimonialsCarouselProps> = (props) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Use intersection observer with generous margins for smooth UX
  const { ref: containerRef, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '400px 0px', // Start loading 400px before entering viewport
  });

  // Trigger loading when near viewport
  useEffect(() => {
    if (isIntersecting && !shouldLoad) {
      const loadStartTime = trackLazyLoadStart('TestimonialsCarousel');
      setStartTime(loadStartTime);
      setShouldLoad(true);
    }
  }, [isIntersecting, shouldLoad]);

  // Track successful load
  useEffect(() => {
    if (shouldLoad && startTime !== null) {
      // Small delay to ensure component has rendered
      const timer = setTimeout(() => {
        performanceTracker.trackLazyLoad('TestimonialsCarousel', startTime, true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [shouldLoad, startTime]);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <TestimonialsCarousel {...props} />
      ) : (
        <TestimonialsCarouselSkeleton className={props.className} />
      )}
    </div>
  );
};