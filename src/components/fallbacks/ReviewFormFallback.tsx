// src/components/fallbacks/ReviewFormFallback.tsx
// Loading skeleton for ReviewForm component

import React from 'react';
import { motion } from 'motion/react';

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

interface ReviewFormFallbackProps {
  className?: string;
}

export const ReviewFormSkeleton: React.FC<ReviewFormFallbackProps> = ({
  className = ''
}) => (
  <div className={`review-form-skeleton space-y-6 ${className}`}>
    {/* Form title skeleton */}
    <SkeletonPulse>
      <div className="h-8 bg-gray-200 rounded w-2/3" />
    </SkeletonPulse>

    {/* Star rating skeleton */}
    <div className="space-y-2">
      <SkeletonPulse>
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </SkeletonPulse>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <SkeletonPulse key={star}>
            <motion.div
              className="w-8 h-8 bg-gray-200 rounded-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          </SkeletonPulse>
        ))}
      </div>
    </div>

    {/* Form fields skeleton */}
    <div className="space-y-4">
      {/* Name field */}
      <div className="space-y-2">
        <SkeletonPulse>
          <div className="h-4 bg-gray-200 rounded w-1/6" />
        </SkeletonPulse>
        <SkeletonPulse>
          <div className="h-12 bg-gray-200 rounded-xl w-full" />
        </SkeletonPulse>
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <SkeletonPulse>
          <div className="h-4 bg-gray-200 rounded w-1/5" />
        </SkeletonPulse>
        <SkeletonPulse>
          <div className="h-12 bg-gray-200 rounded-xl w-full" />
        </SkeletonPulse>
      </div>

      {/* Booking reference field */}
      <div className="space-y-2">
        <SkeletonPulse>
          <div className="h-4 bg-gray-200 rounded w-2/5" />
        </SkeletonPulse>
        <SkeletonPulse>
          <div className="h-12 bg-gray-200 rounded-xl w-full" />
        </SkeletonPulse>
      </div>

      {/* Review message field */}
      <div className="space-y-2">
        <SkeletonPulse>
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </SkeletonPulse>
        <SkeletonPulse>
          <div className="h-32 bg-gray-200 rounded-xl w-full" />
        </SkeletonPulse>
      </div>
    </div>

    {/* Submit button skeleton */}
    <div className="flex justify-end">
      <SkeletonPulse>
        <div className="h-12 bg-gray-200 rounded-xl w-32" />
      </SkeletonPulse>
    </div>
  </div>
);

// Compact version for smaller spaces
export const ReviewFormCompactSkeleton: React.FC = () => (
  <div className="space-y-4">
    {/* Compact star rating */}
    <div className="flex items-center space-x-2">
      <SkeletonPulse>
        <div className="h-3 bg-gray-200 rounded w-16" />
      </SkeletonPulse>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <SkeletonPulse key={star}>
            <div className="w-4 h-4 bg-gray-200 rounded" />
          </SkeletonPulse>
        ))}
      </div>
    </div>

    {/* Compact form fields */}
    <div className="grid grid-cols-2 gap-3">
      <SkeletonPulse>
        <div className="h-10 bg-gray-200 rounded-lg" />
      </SkeletonPulse>
      <SkeletonPulse>
        <div className="h-10 bg-gray-200 rounded-lg" />
      </SkeletonPulse>
    </div>
    
    <SkeletonPulse>
      <div className="h-20 bg-gray-200 rounded-lg w-full" />
    </SkeletonPulse>
    
    <SkeletonPulse>
      <div className="h-10 bg-gray-200 rounded-lg w-24 ml-auto" />
    </SkeletonPulse>
  </div>
);

// Star rating skeleton component
export const StarRatingSkeleton: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star, index) => (
        <SkeletonPulse key={star}>
          <motion.div
            className={`${sizeClasses[size]} bg-gray-200 rounded`}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        </SkeletonPulse>
      ))}
    </div>
  );
};

// Loading state with form icon animation
export const ReviewFormLoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <motion.div
      className="mb-4"
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Review/feedback icon */}
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-brand-primary">
        <path 
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>

    <motion.div
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-900">Loading Review Form</h3>
      <p className="text-gray-600 max-w-sm">
        Preparing the form for your feedback. This will only take a moment...
      </p>
    </motion.div>

    {/* Loading dots */}
    <div className="flex space-x-1 mt-6">
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
    </div>
  </div>
);

// Main fallback export for LazyReviewForm
export const ReviewFormFallback = ReviewFormSkeleton;

export default ReviewFormSkeleton;