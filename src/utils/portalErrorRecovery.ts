// src/utils/portalErrorRecovery.ts

import type { PortalDropdownError } from '@/types/dropdown';

/**
 * Error recovery strategies for portal dropdown failures
 */
export interface ErrorRecoveryConfig {
  maxRetries?: number;
  retryDelay?: number;
  enableFallback?: boolean;
  logErrors?: boolean;
}

const DEFAULT_RECOVERY_CONFIG: Required<ErrorRecoveryConfig> = {
  maxRetries: 2,
  retryDelay: 100,
  enableFallback: true,
  logErrors: true,
};

/**
 * Retry mechanism for portal operations that may fail
 */
export async function retryPortalOperation<T>(
  operation: () => Promise<T> | T,
  config: ErrorRecoveryConfig = {}
): Promise<T> {
  const mergedConfig = { ...DEFAULT_RECOVERY_CONFIG, ...config };
  let lastError: Error;
  
  for (let attempt = 0; attempt <= mergedConfig.maxRetries; attempt++) {
    try {
      return await Promise.resolve(operation());
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (mergedConfig.logErrors) {
        console.warn(`Portal operation attempt ${attempt + 1} failed:`, lastError.message);
      }
      
      // Don't delay on the last attempt
      if (attempt < mergedConfig.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, mergedConfig.retryDelay));
      }
    }
  }
  
  throw lastError!;
}

/**
 * Safe portal container detection with fallback options
 */
export function safeGetPortalContainer(
  preferredContainer?: HTMLElement | null
): HTMLElement | null {
  try {
    // If a preferred container is specified and valid, use it
    if (preferredContainer && preferredContainer.isConnected) {
      return preferredContainer;
    }
    
    // Try document.body as default
    if (typeof document !== 'undefined' && document.body) {
      return document.body;
    }
    
    // Try document.documentElement as fallback
    if (typeof document !== 'undefined' && document.documentElement) {
      return document.documentElement;
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to find portal container:', error);
    return null;
  }
}

/**
 * Validate that an element is suitable for portal rendering
 */
export function validatePortalContainer(element: HTMLElement | null): boolean {
  if (!element) return false;
  
  try {
    // Check if element is connected to DOM
    if (!element.isConnected) return false;
    
    // Check if element allows child insertion
    const testDiv = document.createElement('div');
    element.appendChild(testDiv);
    element.removeChild(testDiv);
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Create error context for better debugging
 */
export function createErrorContext(
  error: PortalDropdownError,
  additionalInfo: Record<string, unknown> = {}
): string {
  const timestamp = new Date().toISOString();
  const context = {
    error,
    timestamp,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    viewport: typeof window !== 'undefined' ? {
      width: window.innerWidth,
      height: window.innerHeight,
    } : null,
    ...additionalInfo,
  };
  
  return JSON.stringify(context, null, 2);
}

/**
 * Error recovery strategies based on error type
 */
export const errorRecoveryStrategies = {
  PORTAL_CONTAINER_NOT_FOUND: {
    recovery: () => safeGetPortalContainer(),
    fallbackToInline: true,
    retryable: true,
  },
  
  TRIGGER_ELEMENT_NOT_FOUND: {
    recovery: () => null, // Cannot recover, need valid trigger
    fallbackToInline: false,
    retryable: false,
  },
  
  POSITIONING_CALCULATION_FAILED: {
    recovery: () => {
      // Try to get basic viewport dimensions as fallback
      if (typeof window !== 'undefined') {
        return {
          x: 0,
          y: 0,
          position: 'bottom' as const,
          maxHeight: 300,
        };
      }
      return null;
    },
    fallbackToInline: true,
    retryable: true,
  },
  
  PORTAL_RENDERING_FAILED: {
    recovery: () => null, // Cannot recover portal rendering
    fallbackToInline: true,
    retryable: false,
  },
} as const;

/**
 * Handle portal dropdown errors with appropriate recovery strategy
 */
export function handlePortalError(
  error: PortalDropdownError,
  context?: Record<string, unknown>
): {
  shouldRetry: boolean;
  shouldFallback: boolean;
  recoveryAction?: () => unknown;
} {
  const strategy = errorRecoveryStrategies[error];
  
  if (!strategy) {
    console.warn(`Unknown portal dropdown error: ${error}`);
    return {
      shouldRetry: false,
      shouldFallback: true,
    };
  }
  
  console.warn(`Portal dropdown error: ${error}`, createErrorContext(error, context));
  
  return {
    shouldRetry: strategy.retryable,
    shouldFallback: strategy.fallbackToInline,
    recoveryAction: strategy.recovery,
  };
}