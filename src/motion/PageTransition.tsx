'use client';

// src/motion/PageTransition.tsx
// Glassmorphism page transition system
// Three-phase overlay transition: slide-in → pause → slide-out

import React, { ReactNode, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { motionTokens as T } from './tokens';
import { useMotionSafe } from './useReduced';
import { 
  GlassmorphismOverlay, 
  useGlassmorphismTransition,
  GlassmorphismContent 
} from './GlassmorphismOverlay';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  mode?: 'wait' | 'sync' | 'popLayout';
}

/**
 * Glassmorphism page transition wrapper component
 * Implements premium three-phase overlay transition system
 * Phase 1: Overlay slides up to cover screen
 * Phase 2: Brief pause while content loads
 * Phase 3: Overlay slides up and exits, revealing new content
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
}) => {
  const pathname = usePathname();
  const { prefersReduced } = useMotionSafe();
  const [prevPathname, setPrevPathname] = React.useState<string | null>(null);
  
  const {
    isOverlayVisible,
    isContentReady,
    startTransition,
    handleOverlayComplete,
  } = useGlassmorphismTransition();
  
  // Detect route changes and trigger glassmorphism transition
  useEffect(() => {
    if (prevPathname === null) {
      // First mount - just set the pathname without transition
      setPrevPathname(pathname);
    } else if (pathname !== prevPathname) {
      // Route change detected - trigger transition
      startTransition();
      setPrevPathname(pathname);
    }
  }, [pathname, prevPathname, startTransition]);
  
  // For reduced motion, render simple static content
  if (prefersReduced) {
    return (
      <main className={className}>
        {children}
      </main>
    );
  }
  
  return (
    <>
      {/* Glassmorphism overlay */}
      <GlassmorphismOverlay
        isVisible={isOverlayVisible}
        onComplete={handleOverlayComplete}
      />
      
      {/* Page content with coordinated animation */}
      <AnimatePresence mode="wait" initial={false}>
        <GlassmorphismContent
          key={pathname}
          isReady={isContentReady}
          className={className}
        >
          <main>
            {children}
          </main>
        </GlassmorphismContent>
      </AnimatePresence>
    </>
  );
};

/**
 * Page entrance hook for local page animations
 * Use this for page-specific entrance sequences
 */
export const usePageEntrance = () => {
  const { prefersReduced } = useMotionSafe();
  
  if (prefersReduced) {
    return {
      initial: false,
      animate: false,
      variants: {},
      transition: {},
    };
  }
  
  return {
    initial: 'hidden',
    animate: 'visible',
    variants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: T.stagger.sm,
          delayChildren: 0.1,
        },
      },
    },
    transition: {
      duration: T.d.medium,
      ease: T.e.brand,
    },
  };
};

/**
 * Page section variants for consistent entrance animations
 */
export const pageSectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.25, 0.90, 0.30, 1],
    },
  },
};

/**
 * Page hero variants for prominent entrance
 */
export const pageHeroVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.80,
      ease: [0.25, 0.90, 0.30, 1],
    },
  },
};

/**
 * Page content variants for staggered content reveal
 */
export const pageContentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.25, 0.90, 0.30, 1],
    },
  },
};
