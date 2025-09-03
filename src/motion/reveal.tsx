'use client';

// src/motion/reveal.tsx
// Data reveal system for scroll-triggered animations
// Supports data-reveal, data-stagger, and data-modal attributes

import React, { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';
import { motionTokens as T } from './tokens';
import { useMotionSafe } from './useReduced';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  
  // Data attribute support
  'data-reveal'?: string;
  'data-stagger'?: string;
  'data-modal'?: string;
  
  // Animation variants
  variants?: Variants;
  
  // Custom animation settings
  delay?: number;
  duration?: number;
  ease?: string | number[];
  
  // Viewport settings
  once?: boolean;
  amount?: number;
  margin?: string;
}

/**
 * Reveal component for scroll-triggered animations
 * Supports data attributes for declarative animation control
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  as: Component = 'div',
  'data-reveal': revealType = 'slideUp',
  'data-stagger': staggerType,
  'data-modal': modalType,
  variants: customVariants,
  delay = 0,
  duration,
  ease,
  once = true,
  amount = 0.15,
  margin = '0px',
  ...props
}) => {
  const { prefersReduced, variants: safeVariants, viewport: safeViewport } = useMotionSafe();
  
  // Determine animation type from data attributes
  const getAnimationType = () => {
    if (revealType === 'fade') return 'fade';
    if (revealType === 'slideUp') return 'slideUp';
    if (revealType === 'slideUpLarge') return 'slideUpLarge';
    if (revealType === 'scale') return 'scale';
    if (revealType === 'slideLeft') return 'slideLeft';
    if (revealType === 'slideRight') return 'slideRight';
    return 'slideUp'; // default
  };
  
  // Get stagger configuration
  const getStaggerConfig = () => {
    if (!staggerType) return undefined;
    
    if (staggerType === 'xs') return T.stagger.xs;
    if (staggerType === 'sm') return T.stagger.sm;
    if (staggerType === 'md') return T.stagger.md;
    return T.stagger.sm; // default
  };
  
  // Build animation variants
  const buildVariants = (): Variants => {
    if (customVariants) return customVariants;
    
    const animationType = getAnimationType();
    const baseVariants = T.variants[animationType];
    
          // Add stagger support for children
      if (staggerType) {
        return {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: getStaggerConfig(),
              delayChildren: delay,
            },
          },
        };
      }
    
    // Single element animation
    return {
      hidden: baseVariants.hidden,
      visible: {
        ...baseVariants.visible,
        transition: {
          duration: duration || T.transitions.medium.duration,
          ease: (ease as [number, number, number, number] | string) || T.e.brand,
          delay,
        },
      },
    };
  };
  
  // Build viewport configuration
  const buildViewport = () => {
    if (prefersReduced) {
      return { once: true, amount: 0.5, margin };
    }
    
    return {
      once,
      amount,
      margin,
    };
  };
  
  // For reduced motion, render without animations
  if (prefersReduced) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }
  
  return (
    <motion.div
      as={Component}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={buildViewport()}
      variants={buildVariants()}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger container for multiple reveal elements
 */
export const StaggerContainer: React.FC<{
  children: ReactNode;
  className?: string;
  stagger?: 'xs' | 'sm' | 'md';
  delay?: number;
}> = ({ children, className = '', stagger = 'sm', delay = 0 }) => {
  const { prefersReduced } = useMotionSafe();
  
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }
  
  const variants: Variants = {
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
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger item for use within StaggerContainer
 */
export const StaggerItem: React.FC<{
  children: ReactNode;
  className?: string;
  animation?: keyof typeof T.variants;
  delay?: number;
}> = ({ children, className = '', animation = 'slideUp', delay = 0 }) => {
  const { prefersReduced, variants: safeVariants } = useMotionSafe();
  
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }
  
  const baseVariants = safeVariants[animation];
  
  const variants: Variants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        duration: T.transitions.short.duration,
        ease: T.transitions.short.ease,
        delay,
      },
    },
  };
  
  return (
    <motion.div
      className={className}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Export types
export type { RevealProps };
