'use client';

// src/app/template.tsx  
// Simple glassmorphism overlay that covers new page on mount
// Then slides away to reveal content

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useMotionSafe } from '@/motion/useReduced';
import { motionTokens as T } from '@/motion/tokens';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { prefersReduced } = useMotionSafe();
  const [showOverlay, setShowOverlay] = React.useState(true);
  const [showContent, setShowContent] = React.useState(false);
  
  React.useEffect(() => {
    if (prefersReduced) {
      setShowOverlay(false);
      setShowContent(true);
      return;
    }
    
    // Start content reveal after overlay pause
    const timer = setTimeout(() => {
      setShowContent(true);
      // Overlay will exit after content starts showing  
      setTimeout(() => setShowOverlay(false), 100);
    }, T.glassmorphism.timing.pause * 1000); // 240ms pause
    
    return () => clearTimeout(timer);
  }, [prefersReduced]);
  
  // For reduced motion users, render simple static content
  if (prefersReduced) {
    return <>{children}</>;
  }
  
  return (
    <>
      {/* Glassmorphism overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="glassmorphism-overlay"
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: T.glassmorphism.overlay.background,
              backdropFilter: `blur(${T.glassmorphism.overlay.backdropBlur})`,
              WebkitBackdropFilter: `blur(${T.glassmorphism.overlay.backdropBlur})`,
            }}
            initial={{ y: '0%' }}  // Start covering screen
            exit={{ 
              y: '-100%',           // Exit upward
              transition: {
                duration: T.glassmorphism.timing.slideOut,
                ease: T.glassmorphism.overlay_variants.exit.transition.ease,
                type: 'tween',
              }
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8, scale: 0.99 }}
        animate={{ 
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 8,
          scale: showContent ? 1 : 0.99,
        }}
        transition={{
          duration: T.glassmorphism.timing.slideOut,
          ease: T.glassmorphism.overlay_variants.exit.transition.ease,
          delay: showContent ? 0.1 : 0,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}