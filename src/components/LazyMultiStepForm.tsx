// src/components/LazyMultiStepForm.tsx
// Lazy-loaded wrapper for MultiStepForm with error boundaries and preloading

import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { preloadComponent, trackLazyLoadError } from '@/utils/lazyHelpers';
import { MultiStepFormFallback, StaticFormFallback } from './fallbacks';
import { performanceTracker, trackLazyLoadStart } from '@/utils/performanceMetrics';
import { BookingFormData } from '@/types';
import { LazyWrapper } from './LazyWrapper';

// Create the lazy-loaded MultiStepForm component using Next.js dynamic
const LazyMultiStepFormComponent = dynamic(
  () => import('./MultiStepForm').then(module => ({ default: module.MultiStepForm })),
  {
    loading: () => null,
    ssr: false
  }
);

interface LazyMultiStepFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
  preloadOnInteraction?: boolean;
}

export const LazyMultiStepForm: React.FC<LazyMultiStepFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  preloadOnInteraction = true
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Preload component on user interaction (hover, focus, etc.)
  const handlePreload = useCallback(async () => {
    if (isPreloaded || isLoading) return;

    const startTime = trackLazyLoadStart('MultiStepForm-Preload');
    
    try {
      await preloadComponent(
        () => import('./MultiStepForm').then(module => ({ default: module.MultiStepForm })),
        'MultiStepForm'
      );
      setIsPreloaded(true);
      performanceTracker.trackLazyLoad('MultiStepForm-Preload', startTime, true);
    } catch (error) {
      console.warn('Failed to preload MultiStepForm:', error);
      performanceTracker.trackLazyLoad('MultiStepForm-Preload', startTime, false, (error as Error).message);
    }
  }, [isPreloaded, isLoading]);

  // Preload when component mounts if user has fast connection
  useEffect(() => {
    if (!preloadOnInteraction) return;

    // Check connection quality
    const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
    const isFastConnection = !connection || connection.effectiveType === '4g';
    
    if (isFastConnection) {
      // Preload after a short delay to not block initial page load
      const timer = setTimeout(() => {
        handlePreload();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [handlePreload, preloadOnInteraction]);

  // Handle form opening with loading state
  const handleFormOpen = useCallback(() => {
    if (!isOpen) return;

    // If component isn't preloaded, show loading state
    if (!isPreloaded) {
      setIsLoading(true);
      const startTime = trackLazyLoadStart('MultiStepForm');

      // Track when component actually loads
      const checkLoaded = () => {
        setIsLoading(false);
        performanceTracker.trackLazyLoad('MultiStepForm', startTime, true);
      };

      // Set a timeout to handle loading state
      const timer = setTimeout(checkLoaded, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isPreloaded]);

  useEffect(() => {
    handleFormOpen();
  }, [handleFormOpen]);

  // Error handler
  const handleError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    setLoadError(error);
    trackLazyLoadError('MultiStepForm', error);
    
    // Track the error in performance metrics
    const startTime = performance.now();
    performanceTracker.trackLazyLoad('MultiStepForm', startTime, false, error.message);
  }, []);

  // If there's a critical error, show static fallback
  if (loadError) {
    return <StaticFormFallback />;
  }

  // If not open, return null
  if (!isOpen) {
    return null;
  }

  // If loading and not preloaded, show fallback
  if (isLoading && !isPreloaded) {
    return (
      <MultiStepFormFallback
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  }

  // Render the lazy component with error boundary
  return (
    <LazyWrapper
      componentName="MultiStepForm"
      onError={handleError}
      fallback={
        <MultiStepFormFallback
          isOpen={isOpen}
          onClose={onClose}
        />
      }
    >
      <LazyMultiStepFormComponent
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </LazyWrapper>
  );
};

// Hook to provide preloading functionality to parent components
export const useMultiStepFormPreload = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  const preload = useCallback(async () => {
    if (isPreloaded) return;

    try {
      await preloadComponent(
        () => import('./MultiStepForm').then(module => ({ default: module.MultiStepForm })),
        'MultiStepForm'
      );
      setIsPreloaded(true);
    } catch (error) {
      console.warn('Failed to preload MultiStepForm:', error);
    }
  }, [isPreloaded]);

  return {
    preload,
    isPreloaded,
    // Event handlers for preloading on interaction
    preloadProps: {
      onMouseEnter: preload,
      onFocus: preload,
      onTouchStart: preload
    }
  };
};

// Higher-order component for automatic preloading
export const withMultiStepFormPreload = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const MultiStepFormPreloadComponent = React.forwardRef<unknown, P & { preloadMultiStepForm?: boolean }>((props, ref) => {
    const { preload, preloadProps } = useMultiStepFormPreload();
    const { preloadMultiStepForm = true, ...componentProps } = props;

    const enhancedProps = preloadMultiStepForm ? {
      ...componentProps,
      ...preloadProps
    } : componentProps;

    return <Component {...enhancedProps as P} ref={ref} />;
  });
  
  MultiStepFormPreloadComponent.displayName = `withMultiStepFormPreload(${Component.displayName || Component.name || 'Component'})`;
  return MultiStepFormPreloadComponent;
};

export default LazyMultiStepForm;