// src/components/fallbacks/TestimonialsCarouselFallback.tsx
// Loading skeleton for TestimonialsCarousel component

import React from 'react';
import { motion } from 'motion/react';
import { Grid } from '../Grid';

const TestimonialCardSkeleton: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <motion.div
    className="bg-background-secondary rounded-xl p-6 space-y-4"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{ 
      duration: 1.5, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
  >
    {/* Star rating skeleton */}
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="w-4 h-4 bg-gray-200 rounded-sm" />
      ))}
    </div>

    {/* Quote skeleton */}
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-4/6" />
    </div>

    {/* Author section skeleton */}
    <div className="flex items-center space-x-3 pt-4">
      {/* Avatar skeleton */}
      <div className="w-12 h-12 bg-gray-200 rounded-full" />
      
      {/* Author info skeleton */}
      <div className="space-y-1 flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  </motion.div>
);

interface TestimonialsCarouselFallbackProps {
  className?: string;
}

export const TestimonialsCarouselSkeleton: React.FC<TestimonialsCarouselFallbackProps> = ({
  className = ''
}) => (
  <div className={`testimonials-carousel-skeleton ${className}`}>
    <Grid container>
      <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12">
        {/* Section title skeleton */}
        <div className="text-center mb-12">
          <motion.div
            className="h-12 bg-gray-200 rounded w-2/3 mx-auto mb-4"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="h-4 bg-gray-200 rounded w-1/2 mx-auto"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
        </div>

        {/* Carousel controls skeleton */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            className="w-12 h-12 bg-gray-200 rounded-full"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-12 h-12 bg-gray-200 rounded-full"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Testimonial cards skeleton */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
          <TestimonialCardSkeleton delay={0} />
          <TestimonialCardSkeleton delay={0.3} />
          <TestimonialCardSkeleton delay={0.6} />
        </div>

        {/* Pagination dots skeleton */}
        <div className="flex justify-center space-x-2 mt-8">
          {[1, 2, 3, 4, 5].map((dot, index) => (
            <motion.div
              key={dot}
              className="w-3 h-3 bg-gray-200 rounded-full"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: index * 0.1
              }}
            />
          ))}
        </div>
      </div>
    </Grid>
  </div>
);

// Compact version for smaller spaces
export const TestimonialsCarouselCompactSkeleton: React.FC = () => (
  <div className="space-y-4">
    <div className="flex space-x-4 overflow-hidden">
      {[1, 2, 3].map((card, index) => (
        <motion.div
          key={card}
          className="flex-shrink-0 w-80 bg-background-secondary rounded-xl p-4 space-y-3"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: index * 0.3
          }}
        >
          {/* Compact star rating */}
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="w-3 h-3 bg-gray-200 rounded-sm" />
            ))}
          </div>
          
          {/* Compact quote */}
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
          </div>
          
          {/* Compact author */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Loading state with progress indication
export const TestimonialsLoadingState: React.FC = () => (
  <div className="text-center py-16">
    <motion.div
      className="inline-flex items-center space-x-2 text-brand-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-4 h-4 bg-brand-primary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-4 h-4 bg-brand-primary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-4 h-4 bg-brand-primary rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
      />
      <span className="text-lg font-medium ml-4">Loading testimonials...</span>
    </motion.div>
  </div>
);

export default TestimonialsCarouselSkeleton;