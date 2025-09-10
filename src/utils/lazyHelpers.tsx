// src/utils/lazyHelpers.tsx
// Reusable dynamic import utilities with retry logic and error handling

import dynamic from 'next/dynamic';
import { ComponentType, ReactNode } from 'react';

interface RetryableImportOptions {
  retries?: number;
  delay?: number;
}

interface LazyComponentOptions<P = {}> {
  loader: () => Promise<{ default: ComponentType<P> }>;
  loading?: ComponentType<any>;
  ssr?: boolean;
  retries?: number;
  componentName?: string;
  onError?: (error: Error) => void;
}

// Create retry mechanism for failed imports
export const createRetryableImport = <T,>(
  importFn: () => Promise<T>,
  { retries = 3, delay = 1000 }: RetryableImportOptions = {}
): (() => Promise<T>) => {
  return async () => {
    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error as Error;
        
        // Log the attempt
        console.warn(`Import attempt ${attempt + 1} failed:`, error);
        
        // If this was the last attempt, throw the error
        if (attempt === retries) {
          throw lastError;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
      }
    }

    throw lastError!;
  };
};

// Enhanced dynamic import with retry logic
export const createLazyComponent = <P extends {} = {}>({
  loader,
  loading,
  ssr = false,
  retries = 2,
  componentName = 'LazyComponent',
  onError
}: LazyComponentOptions<P>): ComponentType<P> => {
  const retryableLoader = createRetryableImport(loader, { retries });

  return dynamic(
    async () => {
      try {
        const module = await retryableLoader();
        
        // Track successful load
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ ${componentName} loaded successfully`);
        }
        
        return module;
      } catch (error) {
        console.error(`❌ Failed to load ${componentName}:`, error);
        onError?.(error as Error);
        
        // Return a fallback component that shows the error
        return {
          default: () => (
            <div className="lazy-load-error p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-600 font-medium mb-2">
                Failed to load {componentName}
              </p>
              <p className="text-red-500 text-sm">
                Please refresh the page to try again
              </p>
            </div>
          )
        };
      }
    },
    {
      loading,
      ssr
    }
  );
};

// Preload component for better UX
export const preloadComponent = async (
  importFn: () => Promise<any>,
  componentName = 'Component'
): Promise<void> => {
  try {
    await importFn();
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Preloaded ${componentName}`);
    }
  } catch (error) {
    console.warn(`⚠️ Failed to preload ${componentName}:`, error);
  }
};

// Batch preload multiple components
export const preloadComponents = async (
  components: Array<{
    loader: () => Promise<any>;
    name: string;
  }>
): Promise<void> => {
  const preloadPromises = components.map(({ loader, name }) =>
    preloadComponent(loader, name)
  );

  await Promise.allSettled(preloadPromises);
};

// Hook to preload component on user interaction
export const usePreloadOnInteraction = (
  importFn: () => Promise<any>,
  componentName = 'Component'
) => {
  const preload = () => preloadComponent(importFn, componentName);

  return {
    onMouseEnter: preload,
    onFocus: preload,
    onTouchStart: preload
  };
};

// Common loading components
export const DefaultLoadingSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} style={{ height: '200px' }} />
);

export const ButtonLoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl h-12 w-32" />
);

export const FormLoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="animate-pulse bg-gray-200 rounded h-10 w-full" />
    <div className="animate-pulse bg-gray-200 rounded h-10 w-full" />
    <div className="animate-pulse bg-gray-200 rounded h-24 w-full" />
    <div className="animate-pulse bg-gray-200 rounded-xl h-12 w-32 ml-auto" />
  </div>
);

export const CarouselLoadingSkeleton = () => (
  <div className="flex space-x-4 overflow-hidden">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex-shrink-0 w-80">
        <div className="animate-pulse bg-gray-200 rounded-xl h-48" />
      </div>
    ))}
  </div>
);

// Error tracking utility
export const trackLazyLoadError = (componentName: string, error: Error) => {
  // In production, send to your error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry, LogRocket, etc.
    console.error(`LazyLoad Error [${componentName}]:`, {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  } else {
    console.error(`🚨 LazyLoad Error [${componentName}]:`, error);
  }
};

export default createLazyComponent;