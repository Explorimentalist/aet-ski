'use client';

// src/motion/PageWrapper.tsx
// Page wrapper for individual page transitions
// Prevents double animation by handling initial render properly

import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { motionTokens as T } from './tokens';
import { useMotionSafe } from './useReduced';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slideUp' | 'slideUpLarge' | 'scale';
  delay?: number;
}

/**
 * Page wrapper component for smooth page transitions
 * Handles initial render and prevents double animation
 */
export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = '',
  animation = 'slideUp',
  delay = 0,
}) => {
  const { prefersReduced, shouldAnimate } = useMotionSafe();
  
  // For reduced motion, render without animations
  if (prefersReduced) {
    return (
      <main className={className}>
        {children}
      </main>
    );
  }
  
  // Get animation variants from motion tokens
  const animationVariants = T.variants[animation];
  
  // Page entrance variants
  const pageVariants = {
    hidden: animationVariants.hidden,
    visible: {
      ...animationVariants.visible,
      transition: {
        duration: T.d.medium,
        ease: T.e.brand,
        delay,
      },
    },
  };
  
  return (
    <motion.main
      className={className}
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {children}
    </motion.main>
  );
};

/**
 * Page content wrapper for staggered content reveal
 */
export const PageContent: React.FC<{
  children: ReactNode;
  className?: string;
  stagger?: 'xs' | 'sm' | 'md';
  delay?: number;
}> = ({ children, className = '', stagger = 'sm', delay = 0 }) => {
  const { prefersReduced } = useMotionSafe();
  
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }
  
  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: T.stagger[stagger],
        delayChildren: delay,
      },
    },
  };
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

/**
 * Page section wrapper for individual sections
 */
export const PageSection: React.FC<{
  children: ReactNode;
  className?: string;
  animation?: keyof typeof T.variants;
  delay?: number;
}> = ({ children, className = '', animation = 'slideUp', delay = 0 }) => {
  const { prefersReduced } = useMotionSafe();
  
  if (prefersReduced) {
    return <section className={className}>{children}</section>;
  }
  
  const baseVariants = T.variants[animation];
  
  const variants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        duration: T.d.short,
        ease: T.e.brand,
        delay,
      },
    },
  };
  
  return (
    <motion.section
      className={className}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};
