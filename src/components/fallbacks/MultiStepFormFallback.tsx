// src/components/fallbacks/MultiStepFormFallback.tsx
// Loading skeleton and fallback for MultiStepForm component

import React from 'react';
import { motion } from 'motion/react';
import { LoadingSkeleton } from '../LazyWrapper';
import { Modal } from '../Modal';

interface MultiStepFormFallbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkeletonPulse = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0.6 }}
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{ 
      duration: 1.5, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    {children}
  </motion.div>
);

export const MultiStepFormSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Progress indicator skeleton */}
    <div className="flex justify-between items-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <SkeletonPulse>
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </SkeletonPulse>
          {step < 5 && (
            <SkeletonPulse>
              <div className="w-16 h-0.5 bg-gray-200 mx-2" />
            </SkeletonPulse>
          )}
        </div>
      ))}
    </div>

    {/* Form content skeleton */}
    <div className="space-y-4">
      {/* Title skeleton */}
      <SkeletonPulse>
        <div className="h-8 bg-gray-200 rounded w-3/4" />
      </SkeletonPulse>

      {/* Form fields skeleton */}
      {[1, 2, 3].map((field) => (
        <div key={field} className="space-y-2">
          <SkeletonPulse>
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </SkeletonPulse>
          <SkeletonPulse>
            <div className="h-12 bg-gray-200 rounded-xl w-full" />
          </SkeletonPulse>
        </div>
      ))}
    </div>

    {/* Navigation buttons skeleton */}
    <div className="flex justify-between pt-6">
      <SkeletonPulse>
        <div className="h-12 bg-gray-200 rounded-xl w-24" />
      </SkeletonPulse>
      <SkeletonPulse>
        <div className="h-12 bg-gray-200 rounded-xl w-24" />
      </SkeletonPulse>
    </div>
  </div>
);

export const MultiStepFormFallback: React.FC<MultiStepFormFallbackProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <SkeletonPulse>
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
          </SkeletonPulse>
          <SkeletonPulse>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          </SkeletonPulse>
        </div>

        <MultiStepFormSkeleton />

        {/* Loading indicator */}
        <div className="flex items-center justify-center mt-8 space-x-2">
          <motion.div
            className="w-2 h-2 bg-brand-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-brand-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-brand-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          />
          <span className="text-sm text-text-secondary ml-3">Loading form...</span>
        </div>
      </div>
    </Modal>
  );
};

// Static fallback for when Modal component also fails to load
export const StaticFormFallback: React.FC = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 max-w-md mx-4">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Loading Booking Form</h3>
          <p className="text-gray-600">Please wait while we prepare your booking form...</p>
        </div>
        
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  </div>
);

export default MultiStepFormFallback;