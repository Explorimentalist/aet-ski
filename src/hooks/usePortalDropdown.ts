// src/hooks/usePortalDropdown.ts

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type {
  PortalDropdownConfig,
  PortalDropdownState,
  PortalDropdownActions,
  UsePortalDropdownReturn,
  DropdownCoordinates,
  PortalDropdownError,
  PortalDropdownEventHandlers,
} from '@/types/dropdown';
import {
  calculateDropdownCoordinates,
  getPortalContainer,
  debounce,
  createEventListenerCleanup,
  calculateZIndex,
  DEFAULT_PORTAL_CONFIG,
} from '@/utils/positioning';
import {
  WindowResizeObserver,
  PortalDropdownResizeObserver,
  supportsResizeObserver,
  isMobileDevice,
  getDeviceOrientation,
} from '@/utils/resizeObserver';

/**
 * Custom hook for managing portal-based dropdowns with smart positioning
 * 
 * @param config - Configuration options for the portal dropdown
 * @param eventHandlers - Optional event handlers for dropdown interactions
 * @returns Portal dropdown state, actions, and refs
 */
export function usePortalDropdown(
  config: Partial<PortalDropdownConfig> = {},
  eventHandlers: PortalDropdownEventHandlers = {}
): UsePortalDropdownReturn {
  // Merge config with defaults
  const mergedConfig = useMemo(() => ({
    ...DEFAULT_PORTAL_CONFIG,
    ...config,
  }), [config]);

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<DropdownCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const triggerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLElement>(null);
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);
  const windowResizeObserverRef = useRef<WindowResizeObserver | null>(null);
  const elementResizeObserverRef = useRef<PortalDropdownResizeObserver | null>(null);

  // Portal container
  const portalContainer = useMemo(() => 
    getPortalContainer(mergedConfig.portalContainer), 
    [mergedConfig.portalContainer]
  );

  // Calculate position coordinates
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) {
      setError('TRIGGER_ELEMENT_NOT_FOUND');
      eventHandlers.onError?.('TRIGGER_ELEMENT_NOT_FOUND', 'Trigger element not found');
      return;
    }

    try {
      const newCoordinates = calculateDropdownCoordinates(triggerRef.current, mergedConfig);
      setCoordinates(newCoordinates);
      setError(null);
      eventHandlers.onPositionChange?.(newCoordinates);
    } catch (err) {
      setError('POSITIONING_CALCULATION_FAILED');
      eventHandlers.onError?.(
        'POSITIONING_CALCULATION_FAILED', 
        `Position calculation failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    }
  }, [mergedConfig, eventHandlers]);

  // Enhanced resize handling with device detection
  const handleResize = useCallback(() => {
    const isMobile = isMobileDevice();
    const orientation = getDeviceOrientation();
    
    // On mobile, recalculate immediately on orientation change
    if (isMobile) {
      calculatePosition();
    } else {
      // On desktop, use debounced calculation
      calculatePosition();
    }
    
    // Emit position change event with device context
    eventHandlers.onPositionChange?.(coordinates!);
  }, [calculatePosition, coordinates, eventHandlers]);

  // Initialize advanced resize observers
  useEffect(() => {
    if (!mergedConfig.enableResize) {
      return;
    }

    // Setup window resize observer
    windowResizeObserverRef.current = new WindowResizeObserver(handleResize, {
      debounceDelay: mergedConfig.resizeDebounce,
      threshold: isMobileDevice() ? 5 : 10, // More sensitive on mobile
    });

    // Setup element resize observer (if supported)
    if (supportsResizeObserver()) {
      elementResizeObserverRef.current = new PortalDropdownResizeObserver(handleResize, {
        debounceDelay: mergedConfig.resizeDebounce,
        threshold: 5,
      });
    }

    return () => {
      windowResizeObserverRef.current?.disconnect();
      elementResizeObserverRef.current?.disconnect();
    };
  }, [mergedConfig.enableResize, mergedConfig.resizeDebounce, handleResize]);

  // Actions
  const actions: PortalDropdownActions = useMemo(() => ({
    open: () => {
      // Calculate position before opening to ensure smooth animation
      calculatePosition();
      setIsOpen(true);
      eventHandlers.onOpen?.();
    },

    close: () => {
      setIsOpen(false);
      eventHandlers.onClose?.();
    },

    toggle: () => {
      if (isOpen) {
        setIsOpen(false);
        eventHandlers.onClose?.();
      } else {
        calculatePosition();
        setIsOpen(true);
        eventHandlers.onOpen?.();
      }
    },

    recalculatePosition: calculatePosition,

    updateConfig: (newConfig: Partial<PortalDropdownConfig>) => {
      Object.assign(mergedConfig, newConfig);
      if (isOpen) {
        calculatePosition();
      }
    },
  }), [isOpen, calculatePosition, eventHandlers, mergedConfig]);

  // Setup event listeners when dropdown is open
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') {
      return;
    }

    const cleanupFunctions: (() => void)[] = [];

    // Click outside detection
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is outside both trigger and dropdown
      if (
        triggerRef.current && 
        !triggerRef.current.contains(target) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(target)
      ) {
        actions.close();
      }
    };

    cleanupFunctions.push(
      createEventListenerCleanup(document, 'mousedown', handleClickOutside)
    );

    // Escape key handler
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        actions.close();
      }
    };

    cleanupFunctions.push(
      createEventListenerCleanup(document, 'keydown', handleEscape)
    );

    // Scroll handler (recalculate on scroll)
    const handleScroll = debounce(() => {
      if (triggerRef.current && isOpen) {
        calculatePosition();
      }
    }, 50); // Faster scroll response

    cleanupFunctions.push(
      createEventListenerCleanup(window, 'scroll', handleScroll, { passive: true })
    );

    // Observe trigger element for size changes (if ResizeObserver is supported)
    if (elementResizeObserverRef.current && triggerRef.current) {
      elementResizeObserverRef.current.observe(triggerRef.current);
      
      // Cleanup will be handled by the observer's disconnect method
    }

    // Store cleanup functions
    cleanupFunctionsRef.current = cleanupFunctions;

    // Cleanup on unmount or when dropdown closes
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];
      
      // Unobserve trigger element
      if (elementResizeObserverRef.current && triggerRef.current) {
        elementResizeObserverRef.current.unobserve(triggerRef.current);
      }
    };
  }, [isOpen, actions, calculatePosition]);

  // Portal render function with enhanced error handling
  const renderPortal = useCallback((content: React.ReactNode): React.ReactPortal | React.ReactNode => {
    // Check for disabled portal mode (force inline rendering)
    if (mergedConfig.portalContainer === null) {
      return (
        <div className="relative">
          <div
            className="absolute z-50 mt-1"
            style={{
              maxHeight: coordinates?.maxHeight,
            }}
            ref={dropdownRef}
          >
            {content}
          </div>
        </div>
      );
    }

    // Fallback to inline rendering if portal is not available
    if (!portalContainer) {
      setError('PORTAL_CONTAINER_NOT_FOUND');
      eventHandlers.onError?.('PORTAL_CONTAINER_NOT_FOUND', 'Portal container not found, falling back to inline rendering');
      
      // Inline fallback with relative positioning
      return (
        <div className="relative">
          <div
            className={`absolute z-50 ${coordinates?.position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}`}
            style={{
              maxHeight: coordinates?.maxHeight,
            }}
            ref={dropdownRef}
          >
            {content}
          </div>
        </div>
      );
    }

    // Validate coordinates before rendering
    if (!coordinates) {
      setError('POSITIONING_CALCULATION_FAILED');
      eventHandlers.onError?.('POSITIONING_CALCULATION_FAILED', 'Coordinates not calculated, falling back to inline rendering');
      
      return (
        <div className="relative">
          <div
            className="absolute z-50 mt-1"
            ref={dropdownRef}
          >
            {content}
          </div>
        </div>
      );
    }

    try {
      const portalContent = (
        <div
          style={{
            position: 'fixed',
            left: coordinates.x,
            top: coordinates.position === 'top' ? coordinates.y - (coordinates.maxHeight || 0) : coordinates.y,
            zIndex: calculateZIndex(mergedConfig.zIndex),
            maxHeight: coordinates.maxHeight,
            pointerEvents: 'auto',
          }}
          ref={dropdownRef}
        >
          {content}
        </div>
      );

      return createPortal(portalContent, portalContainer);
    } catch (err) {
      setError('PORTAL_RENDERING_FAILED');
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      eventHandlers.onError?.(
        'PORTAL_RENDERING_FAILED', 
        `Portal rendering failed: ${errorMessage}`
      );
      
      // Enhanced inline fallback with proper positioning
      return (
        <div className="relative">
          <div
            className={`absolute z-50 ${coordinates.position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}`}
            style={{
              maxHeight: coordinates.maxHeight,
            }}
            ref={dropdownRef}
          >
            {content}
          </div>
        </div>
      );
    }
  }, [coordinates, portalContainer, mergedConfig.zIndex, mergedConfig.portalContainer, eventHandlers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupFunctionsRef.current.forEach(cleanup => cleanup());
    };
  }, []);

  // State object
  const state: PortalDropdownState = useMemo(() => ({
    isOpen,
    coordinates,
    shouldOpenUpward: coordinates?.position === 'top',
    portalContainer,
    error,
  }), [isOpen, coordinates, portalContainer, error]);

  return {
    state,
    actions,
    triggerRef,
    dropdownRef,
    renderPortal,
  };
}

/**
 * Lightweight hook for components that only need basic portal dropdown functionality
 * 
 * @param config - Configuration options
 * @returns Simplified portal dropdown interface
 */
export function useSimplePortalDropdown(config: Partial<PortalDropdownConfig> = {}) {
  const { state, actions, triggerRef, renderPortal } = usePortalDropdown(config);
  
  return {
    isOpen: state.isOpen,
    open: actions.open,
    close: actions.close,
    toggle: actions.toggle,
    triggerRef,
    renderPortal,
    shouldOpenUpward: state.shouldOpenUpward,
  };
}

export default usePortalDropdown;