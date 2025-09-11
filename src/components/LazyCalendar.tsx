// src/components/LazyCalendar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { CalendarFallback } from '@/components/fallbacks/CalendarFallback';
import { trackLazyLoadStart, performanceTracker } from '@/utils/performanceMetrics';

// Dynamic import of the Calendar component
const Calendar = dynamic(
  () => import('./Calendar').then(module => ({ 
    default: module.Calendar 
  })),
  {
    loading: () => <CalendarFallback />,
    ssr: false,
  }
);

// Re-export types for convenience
export type { CalendarProps } from './Calendar';

interface LazyCalendarProps {
  label?: string;
  placeholder?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
  error?: string;
  helper?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export const LazyCalendar: React.FC<LazyCalendarProps> = (props) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasInteraction, setHasInteraction] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Use intersection observer with smaller margins since it's inside a form
  const { ref: containerRef, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px 0px', // Start loading when 200px away
  });

  // Trigger loading on intersection OR user interaction
  useEffect(() => {
    if ((isIntersecting || hasInteraction) && !shouldLoad) {
      const loadStartTime = trackLazyLoadStart();
      setStartTime(loadStartTime);
      setShouldLoad(true);
    }
  }, [isIntersecting, hasInteraction, shouldLoad]);

  // Track successful load
  useEffect(() => {
    if (shouldLoad && startTime !== null) {
      const timer = setTimeout(() => {
        performanceTracker.trackLazyLoad('Calendar', startTime, true);
      }, 50);

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
      ref={containerRef as React.RefObject<HTMLDivElement>}
      onMouseOver={handleInteraction}
      onFocus={handleInteraction}
    >
      {shouldLoad ? (
        <Calendar {...props} />
      ) : (
        <CalendarFallback 
          label={props.label}
          required={props.required}
          error={props.error}
          helper={props.helper}
          placeholder={props.placeholder}
          className={props.className}
        />
      )}
    </div>
  );
};