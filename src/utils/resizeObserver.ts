// src/utils/resizeObserver.ts

/**
 * Enhanced resize observation utilities for portal dropdowns
 * Provides more granular control over when to recalculate positions
 */

export interface ResizeObserverConfig {
  /** Debounce delay for resize events */
  debounceDelay?: number;
  /** Threshold for triggering recalculation (pixels) */
  threshold?: number;
  /** Enable observation of container element changes */
  observeContainer?: boolean;
  /** Enable observation of trigger element changes */
  observeTrigger?: boolean;
}

const DEFAULT_RESIZE_CONFIG: Required<ResizeObserverConfig> = {
  debounceDelay: 100,
  threshold: 10,
  observeContainer: true,
  observeTrigger: true,
};

/**
 * Custom resize observer for portal dropdown elements
 */
export class PortalDropdownResizeObserver {
  private resizeObserver: ResizeObserver | null = null;
  private debounceTimer: NodeJS.Timeout | null = null;
  private lastDimensions: { width: number; height: number } | null = null;
  private config: Required<ResizeObserverConfig>;
  private callback: () => void;
  private observedElements = new Set<Element>();

  constructor(callback: () => void, config: ResizeObserverConfig = {}) {
    this.callback = callback;
    this.config = { ...DEFAULT_RESIZE_CONFIG, ...config };
    this.initializeObserver();
  }

  private initializeObserver() {
    if (typeof window === 'undefined' || !window.ResizeObserver) {
      return;
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      this.handleResize(entries);
    });
  }

  private handleResize(entries: ResizeObserverEntry[]) {
    // Check if any entry represents a significant size change
    let shouldRecalculate = false;

    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      
      if (!this.lastDimensions) {
        this.lastDimensions = { width, height };
        shouldRecalculate = true;
        break;
      }

      const widthDiff = Math.abs(width - this.lastDimensions.width);
      const heightDiff = Math.abs(height - this.lastDimensions.height);

      if (widthDiff >= this.config.threshold || heightDiff >= this.config.threshold) {
        this.lastDimensions = { width, height };
        shouldRecalculate = true;
        break;
      }
    }

    if (shouldRecalculate) {
      this.debouncedCallback();
    }
  }

  private debouncedCallback() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.callback();
      this.debounceTimer = null;
    }, this.config.debounceDelay);
  }

  observe(element: Element) {
    if (this.resizeObserver && !this.observedElements.has(element)) {
      this.resizeObserver.observe(element);
      this.observedElements.add(element);
    }
  }

  unobserve(element: Element) {
    if (this.resizeObserver && this.observedElements.has(element)) {
      this.resizeObserver.unobserve(element);
      this.observedElements.delete(element);
    }
  }

  disconnect() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.observedElements.clear();
    }

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }
}

/**
 * Enhanced window resize detection with orientation change support
 */
export class WindowResizeObserver {
  private callback: () => void;
  private config: Required<ResizeObserverConfig>;
  private debounceTimer: NodeJS.Timeout | null = null;
  private lastViewport: { width: number; height: number } | null = null;
  private listeners: (() => void)[] = [];

  constructor(callback: () => void, config: ResizeObserverConfig = {}) {
    this.callback = callback;
    this.config = { ...DEFAULT_RESIZE_CONFIG, ...config };
    this.setupListeners();
  }

  private setupListeners() {
    if (typeof window === 'undefined') {
      return;
    }

    // Store initial viewport dimensions
    this.lastViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Window resize listener
    const handleResize = () => {
      const currentViewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      if (this.shouldRecalculate(currentViewport)) {
        this.lastViewport = currentViewport;
        this.debouncedCallback();
      }
    };

    // Orientation change listener (mobile devices)
    const handleOrientationChange = () => {
      // Small delay to allow viewport to update after orientation change
      setTimeout(() => {
        const currentViewport = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
        this.lastViewport = currentViewport;
        this.debouncedCallback();
      }, 100);
    };

    // Visual viewport API support (mobile keyboards, etc.)
    const handleVisualViewportChange = () => {
      if (window.visualViewport) {
        const currentViewport = {
          width: window.visualViewport.width,
          height: window.visualViewport.height,
        };
        
        if (this.shouldRecalculate(currentViewport)) {
          this.debouncedCallback();
        }
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange);

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportChange);
      this.listeners.push(() => {
        window.visualViewport?.removeEventListener('resize', handleVisualViewportChange);
      });
    }

    this.listeners.push(
      () => window.removeEventListener('resize', handleResize),
      () => window.removeEventListener('orientationchange', handleOrientationChange)
    );
  }

  private shouldRecalculate(currentViewport: { width: number; height: number }): boolean {
    if (!this.lastViewport) {
      return true;
    }

    const widthDiff = Math.abs(currentViewport.width - this.lastViewport.width);
    const heightDiff = Math.abs(currentViewport.height - this.lastViewport.height);

    return widthDiff >= this.config.threshold || heightDiff >= this.config.threshold;
  }

  private debouncedCallback() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.callback();
      this.debounceTimer = null;
    }, this.config.debounceDelay);
  }

  disconnect() {
    this.listeners.forEach(cleanup => cleanup());
    this.listeners = [];

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }
}

/**
 * Detect if device supports ResizeObserver
 */
export function supportsResizeObserver(): boolean {
  return typeof window !== 'undefined' && 'ResizeObserver' in window;
}

/**
 * Detect if viewport size change is significant enough to warrant recalculation
 */
export function isSignificantViewportChange(
  oldDimensions: { width: number; height: number },
  newDimensions: { width: number; height: number },
  threshold: number = 10
): boolean {
  const widthDiff = Math.abs(newDimensions.width - oldDimensions.width);
  const heightDiff = Math.abs(newDimensions.height - oldDimensions.height);
  
  return widthDiff >= threshold || heightDiff >= threshold;
}

/**
 * Get current device orientation
 */
export function getDeviceOrientation(): 'portrait' | 'landscape' {
  if (typeof window === 'undefined') {
    return 'portrait';
  }

  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
}

/**
 * Detect if device is mobile based on viewport and user agent
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check viewport size
  const isSmallViewport = window.innerWidth <= 768;
  
  // Check user agent for mobile indicators
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(navigator.userAgent);
  
  // Check for touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isSmallViewport || isMobileUA || hasTouch;
}