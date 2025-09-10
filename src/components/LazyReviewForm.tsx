// src/components/LazyReviewForm.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ReviewFormFallback } from '@/components/fallbacks/ReviewFormFallback';
import { trackLazyLoadStart, performanceTracker } from '@/utils/performanceMetrics';

// Dynamic import of the ReviewForm component
const ReviewForm = dynamic(
  () => import('./ReviewForm').then(module => ({ 
    default: module.ReviewForm 
  })),
  {
    loading: () => <ReviewFormFallback />,
    ssr: false,
  }
);

// Re-export types for convenience
export type { ReviewFormValues } from './ReviewForm';

interface LazyReviewFormProps {
  onSubmit: (values: { rating: number; comment: string; name: string; bookingName?: string }) => unknown | Promise<unknown>;
  initialBookingName?: string;
  className?: string;
}

export const LazyReviewForm: React.FC<LazyReviewFormProps> = (props) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasInteraction, setHasInteraction] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use intersection observer with moderate margins since it's main page content
  const { isIntersecting } = useIntersectionObserver(containerRef, {
    threshold: 0,
    rootMargin: '300px 0px', // Start loading when 300px away
  });

  // Trigger loading on intersection OR user interaction
  useEffect(() => {
    if ((isIntersecting || hasInteraction) && !shouldLoad) {
      const loadStartTime = trackLazyLoadStart('ReviewForm');
      setStartTime(loadStartTime);
      setShouldLoad(true);
    }
  }, [isIntersecting, hasInteraction, shouldLoad]);

  // Track successful load
  useEffect(() => {
    if (shouldLoad && startTime !== null) {
      const timer = setTimeout(() => {
        performanceTracker.trackLazyLoad('ReviewForm', startTime, true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [shouldLoad, startTime]);

  // Handle user interaction - load immediately if user tries to interact
  const handleInteraction = () => {
    if (!shouldLoad) {
      setHasInteraction(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseOver={handleInteraction}
      onFocus={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {shouldLoad ? (
        <ReviewForm {...props} />
      ) : (
        <ReviewFormFallback className={props.className} />
      )}
    </div>
  );
};