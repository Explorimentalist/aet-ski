'use client';

// src/motion/PageTransition.tsx
// Page transition wrapper for route changes
// Hybrid approach: fixed nav + animated page container

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { motionTokens as T } from './tokens';
import { useMotionSafe } from './useReduced';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  mode?: 'wait' | 'sync' | 'popLayout';
}

/**
 * Page transition wrapper component
 * Handles route changes with smooth animations
 * Fixed navigation remains static while page content animates
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
  mode = 'wait',
}) => {
  const pathname = usePathname();
  const { prefersReduced, transition: safeTransition } = useMotionSafe();
  
  // For reduced motion, render without animations
  if (prefersReduced) {
    return (
      <main className={className}>
        {children}
      </main>
    );
  }
  
  // Page transition variants - optimized to prevent double animation
  const pageVariants = {
    initial: {
      opacity: 0,
      y: prefersReduced ? 0 : 16,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: prefersReduced ? 0 : -16,
    },
  };
  
  // Page transition configuration
  const pageTransition = {
    duration: T.d.long,
    ease: T.e.brand,
  };
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        className={className}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

/**
 * Page entrance hook for local page animations
 * Use this for page-specific entrance sequences
 */
export const usePageEntrance = () => {
  const { prefersReduced, transition: safeTransition } = useMotionSafe();
  
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
    transition: safeTransition.medium,
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
