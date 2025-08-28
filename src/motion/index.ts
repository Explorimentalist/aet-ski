// src/motion/index.ts
// Central export file for all motion utilities

// Core motion tokens
export { motionTokens } from './tokens';
export type { MotionTokens, MotionVariants, MotionTransitions } from './tokens';

// Reduced motion utilities
export { usePrefersReduced, useMotionSafe, useMotionSafeSimple, getMotionProps } from './useReduced';

// Reveal system
export { Reveal, StaggerContainer, StaggerItem } from './reveal';
export type { RevealProps } from './reveal';

// Page transitions
export { 
  PageTransition, 
  usePageEntrance,
  pageSectionVariants,
  pageHeroVariants,
  pageContentVariants,
} from './PageTransition';

// Page wrapper components
export {
  PageWrapper,
  PageContent,
  PageSection,
} from './PageWrapper';

// Re-export motion components for convenience
export { motion, AnimatePresence } from 'motion/react';
export type { Variants, Transition, MotionProps } from 'motion/react';
