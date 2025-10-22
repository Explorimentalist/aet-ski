// src/utils/positioning.ts

import type { 
  ViewportBounds, 
  ElementBounds, 
  DropdownCoordinates, 
  PortalDropdownConfig 
} from '@/types/dropdown';

/**
 * Default configuration values for portal dropdowns
 */
export const DEFAULT_PORTAL_CONFIG: Required<Omit<PortalDropdownConfig, 'portalContainer'>> = {
  position: 'auto',
  offset: 4,
  maxHeight: 400,
  viewportPadding: 16,
  zIndex: 70, // Above FormNavigation (z-[60])
  enableResize: true,
  resizeDebounce: 100,
};

/**
 * Get current viewport dimensions and boundaries
 */
export function getViewportBounds(): ViewportBounds {
  if (typeof window === 'undefined') {
    // SSR fallback
    return {
      top: 0,
      bottom: 1024,
      left: 0,
      right: 768,
      width: 768,
      height: 1024,
    };
  }

  return {
    top: 0,
    bottom: window.innerHeight,
    left: 0,
    right: window.innerWidth,
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Get element position and dimensions relative to viewport
 */
export function getElementBounds(element: HTMLElement): ElementBounds {
  const rect = element.getBoundingClientRect();
  
  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
  };
}

/**
 * Calculate available space around an element for dropdown positioning
 */
export function calculateAvailableSpace(
  elementBounds: ElementBounds,
  viewportBounds: ViewportBounds,
  config: Required<Omit<PortalDropdownConfig, 'portalContainer'>>
): {
  above: number;
  below: number;
  left: number;
  right: number;
} {
  const { viewportPadding } = config;

  return {
    above: elementBounds.top - viewportPadding,
    below: viewportBounds.bottom - elementBounds.bottom - viewportPadding,
    left: elementBounds.left - viewportPadding,
    right: viewportBounds.right - elementBounds.right - viewportPadding,
  };
}

/**
 * Determine optimal dropdown position based on available space
 */
export function determineOptimalPosition(
  elementBounds: ElementBounds,
  viewportBounds: ViewportBounds,
  config: Required<Omit<PortalDropdownConfig, 'portalContainer'>>
): 'top' | 'bottom' {
  const { position, maxHeight } = config;

  // If position is explicitly set (not auto), respect it
  if (position === 'top') return 'top';
  if (position === 'bottom') return 'bottom';

  // Auto positioning logic
  const availableSpace = calculateAvailableSpace(elementBounds, viewportBounds, config);
  
  // Check if dropdown fits below
  if (availableSpace.below >= maxHeight) {
    return 'bottom';
  }
  
  // Check if dropdown fits above
  if (availableSpace.above >= maxHeight) {
    return 'top';
  }
  
  // If neither position has enough space, choose the one with more space
  return availableSpace.below > availableSpace.above ? 'bottom' : 'top';
}

/**
 * Calculate dropdown coordinates for optimal positioning
 */
export function calculateDropdownCoordinates(
  triggerElement: HTMLElement,
  config: Partial<PortalDropdownConfig> = {}
): DropdownCoordinates {
  const mergedConfig = { ...DEFAULT_PORTAL_CONFIG, ...config };
  const elementBounds = getElementBounds(triggerElement);
  const viewportBounds = getViewportBounds();
  
  const optimalPosition = determineOptimalPosition(elementBounds, viewportBounds, mergedConfig);
  const availableSpace = calculateAvailableSpace(elementBounds, viewportBounds, mergedConfig);
  
  let x = elementBounds.left;
  let y: number;
  let maxHeight: number | undefined;

  if (optimalPosition === 'bottom') {
    y = elementBounds.bottom + mergedConfig.offset;
    maxHeight = Math.min(mergedConfig.maxHeight, availableSpace.below);
  } else {
    // Position above
    y = elementBounds.top - mergedConfig.offset;
    maxHeight = Math.min(mergedConfig.maxHeight, availableSpace.above);
  }

  // Ensure dropdown doesn't overflow horizontally
  const dropdownWidth = 320; // Standard dropdown width (w-80 = 320px)
  if (x + dropdownWidth > viewportBounds.right - mergedConfig.viewportPadding) {
    x = viewportBounds.right - dropdownWidth - mergedConfig.viewportPadding;
  }
  if (x < mergedConfig.viewportPadding) {
    x = mergedConfig.viewportPadding;
  }

  return {
    x,
    y,
    position: optimalPosition,
    maxHeight,
  };
}

/**
 * Check if an element is within viewport bounds
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const bounds = getElementBounds(element);
  const viewport = getViewportBounds();
  
  return (
    bounds.top >= viewport.top &&
    bounds.bottom <= viewport.bottom &&
    bounds.left >= viewport.left &&
    bounds.right <= viewport.right
  );
}

/**
 * Check if a point is within an element's bounds
 */
export function isPointInElement(
  x: number, 
  y: number, 
  element: HTMLElement
): boolean {
  const bounds = getElementBounds(element);
  
  return (
    x >= bounds.left &&
    x <= bounds.right &&
    y >= bounds.top &&
    y <= bounds.bottom
  );
}

/**
 * Debounce function for resize events
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Get the optimal portal container element
 */
export function getPortalContainer(
  customContainer?: HTMLElement | null
): HTMLElement | null {
  if (typeof document === 'undefined') {
    return null;
  }
  
  if (customContainer) {
    return customContainer;
  }
  
  return document.body;
}

/**
 * Create portal-safe event listener cleanup function
 */
export function createEventListenerCleanup(
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): () => void {
  element.addEventListener(event, handler, options);
  
  return () => {
    element.removeEventListener(event, handler, options);
  };
}

/**
 * Calculate z-index for portal dropdown to ensure it appears above other elements
 */
export function calculateZIndex(
  baseZIndex: number = DEFAULT_PORTAL_CONFIG.zIndex,
  customZIndex?: number
): number {
  if (customZIndex !== undefined) {
    return customZIndex;
  }
  
  // Ensure we're always above FormNavigation (z-[60])
  return Math.max(baseZIndex, 70);
}