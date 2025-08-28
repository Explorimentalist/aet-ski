// src/motion/useReduced.ts
// Motion utilities for handling reduced motion preferences
// Provides consistent motion safety across components

import { useEffect, useState } from 'react';
import { MotionProps } from 'motion/react';
import { motionTokens } from './tokens';

// Hook to detect if user prefers reduced motion
export const usePrefersReduced = (): boolean => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
};

// Hook that returns motion configuration object
export const useMotionSafe = () => {
  const prefersReduced = usePrefersReduced();
  
  return {
    prefersReduced,
    shouldAnimate: !prefersReduced,
    transition: prefersReduced ? { duration: 0 } : motionTokens.transitions.short,
    variants: prefersReduced ? {} : motionTokens.variants,
    viewport: prefersReduced ? {} : { once: true, amount: 0.3, margin: '-10%' }
  };
};

// Legacy hook that returns true if motion should be enabled (for backward compatibility)
export const useMotionSafeSimple = (): boolean => {
  const prefersReduced = usePrefersReduced();
  return !prefersReduced;
};

// Utility function to get motion props based on user preference
// Returns motion props if motion is safe, otherwise returns empty object
export const getMotionProps = <T extends MotionProps>(
  motionProps: T,
  shouldAnimate: boolean = true
): Partial<T> => {
  if (!shouldAnimate) {
    // Return only non-animation props for accessibility
    const { animate, initial, exit, whileHover, whileFocus, whileTap, variants, transition, ...staticProps } = motionProps;
    return staticProps as Partial<T>;
  }
  return motionProps;
};

// Type-safe wrapper for motion props
export type SafeMotionProps<T extends MotionProps = MotionProps> = T & {
  respectReducedMotion?: boolean;
};