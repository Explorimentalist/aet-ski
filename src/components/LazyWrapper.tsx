// src/components/LazyWrapper.tsx
// Universal error boundary and loading states for lazy-loaded components

import React, { Component, ReactNode, Suspense } from 'react';
import { motion } from 'motion/react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  componentName?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`LazyLoad Error in ${this.props.componentName || 'Unknown Component'}:`, error, errorInfo);
    
    // Track error for monitoring
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="lazy-load-error p-4 bg-background-error border border-border-error rounded-xl text-center">
          <p className="text-text-error font-medium mb-2">
            Component failed to load
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="text-sm text-brand-primary hover:text-brand-secondary underline"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

interface LoadingSkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  variant?: 'rectangular' | 'circular' | 'text' | 'button';
  animate?: boolean;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  height = '20px',
  width = '100%',
  variant = 'rectangular',
  animate = true
}) => {
  const baseClasses = 'bg-background-secondary';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
    button: 'rounded-xl h-12'
  };

  const skeletonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const skeletonElement = (
    <div 
      className={skeletonClasses}
      style={{ height, width }}
      aria-hidden="true"
    />
  );

  if (!animate) {
    return skeletonElement;
  }

  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {skeletonElement}
    </motion.div>
  );
};

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  componentName: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  className?: string;
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback,
  componentName,
  onError,
  className = ''
}) => {
  const defaultFallback = (
    <div className={`lazy-loading-container ${className}`}>
      <LoadingSkeleton height="200px" />
    </div>
  );

  return (
    <ErrorBoundary 
      fallback={fallback} 
      componentName={componentName}
      onError={onError}
    >
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyWrapper;