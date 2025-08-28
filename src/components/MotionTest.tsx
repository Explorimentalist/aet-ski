// src/components/MotionTest.tsx
// Test component to verify motion system functionality

import React from 'react';
import { motion } from 'motion/react';
import { motionTokens as T, useMotionSafe } from '@/motion';

export const MotionTest: React.FC = () => {
  const { prefersReduced, variants: safeVariants } = useMotionSafe();
  
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Motion System Test</h2>
      
      {/* Basic motion test */}
      <motion.div
        className="p-4 bg-blue-100 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: T.d.medium, ease: T.e.brand }}
      >
        <h3 className="font-semibold mb-2">Basic Motion</h3>
        <p>This should animate in from below with brand easing.</p>
      </motion.div>
      
      {/* Hover animation test */}
      <motion.div
        className="p-4 bg-green-100 rounded-lg cursor-pointer"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: T.d.micro, ease: T.e.brand }}
      >
        <h3 className="font-semibold mb-2">Hover Animation</h3>
        <p>Hover and click to see micro-interactions.</p>
      </motion.div>
      
      {/* Stagger test */}
      <div className="space-y-2">
        <h3 className="font-semibold">Stagger Animation</h3>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: T.stagger.sm,
              },
            },
          }}
          className="flex gap-2"
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              variants={safeVariants.slideUp}
              className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center font-bold"
            >
              {i}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Reduced motion indicator */}
      <div className="p-4 bg-yellow-100 rounded-lg">
        <h3 className="font-semibold mb-2">Reduced Motion Status</h3>
        <p className="text-sm">
          Reduced motion preference: <strong>{prefersReduced ? 'Enabled' : 'Disabled'}</strong>
        </p>
        {prefersReduced && (
          <p className="text-sm text-gray-600 mt-1">
            Animations are simplified for accessibility.
          </p>
        )}
      </div>
      
      {/* Token values display */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Motion Tokens</h3>
        <div className="text-sm space-y-1">
          <p>Duration (medium): {T.d.medium}s</p>
          <p>Stagger (sm): {T.stagger.sm}s</p>
          <p>Brand ease: {T.e.brand.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};
