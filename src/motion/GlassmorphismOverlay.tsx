'use client';

// src/motion/GlassmorphismOverlay.tsx
// Glassmorphism overlay component for premium page transitions
// Implements three-phase animation: slide-in → pause → slide-out

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { motionTokens as T } from './tokens';
import { useMotionSafe } from './useReduced';

interface GlassmorphismOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
}

/**
 * Glassmorphism overlay for page transitions
 * Creates a premium glass-like overlay that wipes across the screen
 * Follows brand motion principles with proper timing and easing
 */
export const GlassmorphismOverlay: React.FC<GlassmorphismOverlayProps> = ({
  isVisible,
  onComplete,
}) => {
  const { prefersReduced } = useMotionSafe();
  
  // For reduced motion users, skip the overlay entirely
  if (prefersReduced) {
    return null;
  }
  
  const glassmorphismTokens = T.glassmorphism;
  
  return (
    <AnimatePresence
      onExitComplete={onComplete}
      mode="wait"
    >
      {isVisible && (
        <motion.div
          key="glassmorphism-overlay"
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: glassmorphismTokens.overlay.background,
            backdropFilter: `blur(${glassmorphismTokens.overlay.backdropBlur})`,
            WebkitBackdropFilter: `blur(${glassmorphismTokens.overlay.backdropBlur})`,
            borderRadius: glassmorphismTokens.overlay.borderRadius,
          }}
          variants={glassmorphismTokens.overlay_variants}
          initial="initial"
          animate="covering"
          exit="exit"
          onAnimationComplete={(definition) => {
            // Only call onComplete when the exit animation finishes
            if (definition === 'exit' && onComplete) {
              onComplete();
            }
          }}
        />
      )}
    </AnimatePresence>
  );
};

/**
 * Hook to manage glassmorphism overlay state and timing
 * Provides coordinated control for the three-phase transition
 */
export const useGlassmorphismTransition = () => {
  const [isOverlayVisible, setIsOverlayVisible] = React.useState(true);  // Start with overlay visible
  const [isContentReady, setIsContentReady] = React.useState(false);     // Start with content hidden
  const { prefersReduced } = useMotionSafe();
  
  // Auto-trigger the overlay exit sequence after a brief moment
  React.useEffect(() => {
    if (prefersReduced) {
      setIsContentReady(true);
      setIsOverlayVisible(false);
      return;
    }
    
    // Small delay to allow initial render, then automatically start exit sequence
    const timer = setTimeout(() => {
      // Overlay will automatically transition from covering -> exit via animation
    }, 200); // Brief pause for the "covering" phase
    
    return () => clearTimeout(timer);
  }, [prefersReduced]);
  
  const startTransition = React.useCallback(() => {
    // This method is no longer needed since transition auto-starts
  }, []);
  
  const handleOverlayComplete = React.useCallback(() => {
    setIsOverlayVisible(false);
    setIsContentReady(true);
  }, []);
  
  return {
    isOverlayVisible,
    isContentReady,
    startTransition,
    handleOverlayComplete,
  };
};

/**
 * Content wrapper that coordinates with glassmorphism overlay
 * Ensures content is hidden during overlay transition
 */
export const GlassmorphismContent: React.FC<{
  children: React.ReactNode;
  isReady: boolean;
  className?: string;
}> = ({ children, isReady, className = '' }) => {
  const { prefersReduced, variants: safeVariants } = useMotionSafe();
  
  // For reduced motion, always show content
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }
  
  const contentVariants = T.glassmorphism.content_variants;
  
  return (
    <motion.div
      className={className}
      variants={contentVariants}
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};