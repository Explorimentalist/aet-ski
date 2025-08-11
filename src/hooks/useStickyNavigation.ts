// src/hooks/useStickyNavigation.ts
'use client';

import { useEffect, useRef } from 'react';

interface UseStickyNavigationProps {
  triggerOffset?: number; // Distance from top before becoming sticky (default: 84px)
  enabled?: boolean; // Whether the sticky behavior is enabled
}

export const useStickyNavigation = ({
  triggerOffset = 84,
  enabled = true
}: UseStickyNavigationProps = {}) => {
  const navigationRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we should enable sticky navigation
    if (!enabled || !navigationRef.current || !containerRef.current) return;

    const navigation = navigationRef.current;
    const container = containerRef.current;
    const footer = document.querySelector('footer') as HTMLElement;

    // Get initial dimensions
    const initialWidth = navigation.offsetWidth;
    const navigationHeight = navigation.offsetHeight;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const footerTop = footer?.offsetTop || 0;

    // Calculate sticky boundaries
    const stickyStart = containerTop - triggerOffset;
    const stickyEnd = footerTop - navigationHeight - 48; // 48px is footer's py-12

    let isSticky = false;
    let isStickyBottom = false;

    const updateStickyState = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop >= stickyStart && scrollTop < stickyEnd) {
        // Normal sticky state
        if (!isSticky) {
          isSticky = true;
          isStickyBottom = false;
          navigation.style.position = 'fixed';
          navigation.style.top = `${triggerOffset}px`;
          navigation.style.width = `${initialWidth}px`;
          navigation.style.zIndex = '10';
        }
      } else if (scrollTop >= stickyEnd) {
        // Bottom sticky state - navigation stops at footer boundary
        if (!isStickyBottom) {
          isSticky = false;
          isStickyBottom = true;
          navigation.style.position = 'fixed';
          navigation.style.top = `${stickyEnd}px`;
          navigation.style.width = `${initialWidth}px`;
          navigation.style.zIndex = '10';
        }
      } else {
        // Normal flow state
        if (isSticky || isStickyBottom) {
          isSticky = false;
          isStickyBottom = false;
          navigation.style.position = 'relative';
          navigation.style.top = 'auto';
          navigation.style.width = '100%';
          navigation.style.zIndex = 'auto';
        }
      }
    };

    // Initial update
    updateStickyState();

    // Add scroll listener
    window.addEventListener('scroll', updateStickyState, { passive: true });

    // Handle window resize
    const handleResize = () => {
      // Update width on resize
      if (isSticky || isStickyBottom) {
        navigation.style.width = `${container.offsetWidth}px`;
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', updateStickyState);
      window.removeEventListener('resize', handleResize);
    };
  }, [triggerOffset, enabled]);

  return {
    navigationRef,
    containerRef
  };
};
