// src/components/fallbacks/CalendarFallback.tsx
// Loading skeleton for Calendar component

import React from 'react';
import { motion } from 'motion/react';

interface CalendarFallbackProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helper?: string;
  className?: string;
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

export const CalendarSkeleton: React.FC<CalendarFallbackProps> = ({
  label,
  className = ''
}) => (
  <div className={`calendar-skeleton ${className}`}>
    {/* Label skeleton */}
    {label && (
      <div className="mb-2">
        <SkeletonPulse>
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </SkeletonPulse>
      </div>
    )}

    {/* Input field skeleton */}
    <SkeletonPulse>
      <div className="form-calendar w-full flex items-center justify-between h-12 px-4 bg-gray-200 rounded-xl">
        <div className="h-4 bg-gray-300 rounded w-32" />
        <div className="w-5 h-5 bg-gray-300 rounded" />
      </div>
    </SkeletonPulse>
  </div>
);

export const CalendarDropdownSkeleton: React.FC = () => (
  <div className="absolute z-10 w-80 mt-1 bg-background-secondary border border-border-secondary rounded-sm shadow-md p-4">
    {/* Header skeleton */}
    <div className="flex items-center justify-between mb-4">
      <SkeletonPulse>
        <div className="w-6 h-6 bg-gray-200 rounded" />
      </SkeletonPulse>
      
      <SkeletonPulse>
        <div className="h-6 bg-gray-200 rounded w-32" />
      </SkeletonPulse>
      
      <SkeletonPulse>
        <div className="w-6 h-6 bg-gray-200 rounded" />
      </SkeletonPulse>
    </div>

    {/* Week days skeleton */}
    <div className="grid grid-cols-7 gap-1 mb-2">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
        <SkeletonPulse key={day}>
          <div className="h-4 bg-gray-200 rounded text-center" style={{ animationDelay: `${index * 0.1}s` }} />
        </SkeletonPulse>
      ))}
    </div>

    {/* Calendar grid skeleton */}
    <div className="grid grid-cols-7 gap-1 mb-4">
      {Array.from({ length: 42 }, (_, index) => (
        <SkeletonPulse key={index}>
          <div 
            className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
            style={{ animationDelay: `${(index % 7) * 0.05}s` }}
          />
        </SkeletonPulse>
      ))}
    </div>

    {/* "I'm not sure" button skeleton */}
    <SkeletonPulse>
      <div className="w-full h-10 bg-gray-200 rounded-xl" />
    </SkeletonPulse>
  </div>
);

// Compact calendar skeleton for smaller spaces
export const CalendarCompactSkeleton: React.FC = () => (
  <div className="inline-flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
    <SkeletonPulse>
      <div className="w-4 h-4 bg-gray-200 rounded" />
    </SkeletonPulse>
    <SkeletonPulse>
      <div className="h-4 bg-gray-200 rounded w-20" />
    </SkeletonPulse>
  </div>
);

// Calendar field with loading state
export const CalendarFieldSkeleton: React.FC<{
  label?: string;
  required?: boolean;
  helper?: string;
}> = ({ label, required = false, helper }) => (
  <div className="flex flex-col gap-2">
    {/* Label */}
    {label && (
      <SkeletonPulse>
        <div className="flex items-center gap-1">
          <div className="h-4 bg-gray-200 rounded" style={{ width: `${label.length * 8}px` }} />
          {required && <div className="w-2 h-4 bg-red-200 rounded" />}
        </div>
      </SkeletonPulse>
    )}
    
    {/* Calendar input */}
    <CalendarSkeleton />
    
    {/* Helper text */}
    {helper && (
      <SkeletonPulse>
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </SkeletonPulse>
    )}
  </div>
);

// Loading state with calendar icon animation
export const CalendarLoadingState: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <motion.div
      className="flex items-center space-x-3 text-brand-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated calendar icon */}
      <motion.div
        className="relative"
        animate={{ 
          rotateY: [0, 360],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-primary">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </motion.div>
      
      <span className="text-sm font-medium">Loading calendar...</span>
    </motion.div>
  </div>
);

// Main fallback component matching Calendar interface
export const CalendarFallback: React.FC<CalendarFallbackProps> = ({
  label,
  placeholder = 'Select a date',
  required = false,
  error,
  helper,
  className = ''
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {label && (
      <SkeletonPulse>
        <label className="text-base text-text-form font-normal leading-[150%] tracking-[0.0005em]">
          <div className="h-4 bg-gray-200 rounded inline-block" style={{ width: `${label.length * 8 + 20}px` }} />
          {required && <span className="ml-1 w-2 h-4 bg-red-200 rounded inline-block" />}
        </label>
      </SkeletonPulse>
    )}
    
    <SkeletonPulse>
      <div className={`
        form-calendar
        w-full
        flex items-center justify-between
        ${error ? 'border-border-error bg-background-error' : 'bg-gray-200'}
      `}>
        <span className="text-text-placeholder">
          <div className="h-4 bg-gray-300 rounded inline-block" style={{ width: `${placeholder.length * 8}px` }} />
        </span>
        <div className="w-5 h-5 bg-gray-300 rounded" />
      </div>
    </SkeletonPulse>

    {error && (
      <SkeletonPulse>
        <div className="h-4 bg-red-200 rounded w-3/4" />
      </SkeletonPulse>
    )}
    
    {helper && !error && (
      <SkeletonPulse>
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </SkeletonPulse>
    )}
  </div>
);

export default CalendarSkeleton;