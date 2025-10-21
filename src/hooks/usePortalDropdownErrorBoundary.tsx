// src/hooks/usePortalDropdownErrorBoundary.tsx

import React, { Component, ReactNode } from 'react';
import type { PortalDropdownError } from '@/types/dropdown';

interface PortalDropdownErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: PortalDropdownError, errorInfo: string) => void;
  enableLogging?: boolean;
}

interface PortalDropdownErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

/**
 * Error boundary component specifically for portal dropdown errors
 * Provides graceful fallback to inline rendering when portal rendering fails
 */
export class PortalDropdownErrorBoundary extends Component<
  PortalDropdownErrorBoundaryProps,
  PortalDropdownErrorBoundaryState
> {
  constructor(props: PortalDropdownErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): PortalDropdownErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError, enableLogging = true } = this.props;
    
    if (enableLogging) {
      console.warn('Portal dropdown error caught by boundary:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    }

    // Map React errors to our typed error system
    let portalError: PortalDropdownError = 'PORTAL_RENDERING_FAILED';
    if (error.message.includes('createPortal')) {
      portalError = 'PORTAL_RENDERING_FAILED';
    } else if (error.message.includes('container')) {
      portalError = 'PORTAL_CONTAINER_NOT_FOUND';
    }

    onError?.(portalError, `${error.message}\n${errorInfo.componentStack}`);
    
    this.setState({
      errorInfo: `${error.message}\n${errorInfo.componentStack}`,
    });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return this.props.fallback || (
        <div className="relative">
          {this.props.children}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC for wrapping components with portal dropdown error boundary
 */
export function withPortalDropdownErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  errorBoundaryProps?: Omit<PortalDropdownErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: T) => (
    <PortalDropdownErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </PortalDropdownErrorBoundary>
  );

  WrappedComponent.displayName = `withPortalDropdownErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}