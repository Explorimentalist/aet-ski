// src/components/TestimonialsCarousel.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Grid } from '@/components/Grid';
import { TestimonialCard } from '@/components/CardLarge';
import { cn } from '@/lib/utils';

export interface TestimonialData {
  rating: number;
  quote: string;
  author: string;
}

interface TestimonialsCarouselProps {
  testimonials: TestimonialData[];
  className?: string;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  className,
}) => {
  // Start from the middle set for true infinite scrolling
  const [currentIndex, setCurrentIndex] = useState(testimonials.length);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  // Calculate exact transform values for pixel-perfect positioning
  const getTransformValue = () => {
    // Card widths: Mobile: 280px, Tablet: 360px, Desktop: 408px
    // Gaps: Mobile: 24px, Tablet: 20px, Desktop: 24px
    const cardWithGap = {
      mobile: 280 + 24,   // 304px per card
      tablet: 360 + 20,   // 380px per card  
      desktop: 408 + 24,  // 432px per card
    };
    
    return {
      mobile: -currentIndex * cardWithGap.mobile,
      tablet: -currentIndex * cardWithGap.tablet,
      desktop: -currentIndex * cardWithGap.desktop,
    };
  };

  const transformValues = getTransformValue();
  const trackRef = React.useRef<HTMLDivElement>(null);

  // Detect screen size for responsive transforms
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('desktop');
      } else if (window.innerWidth >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      // If we're at the end of the duplicated set, prepare for seamless reset
      if (newIndex >= testimonials.length * 2) {
        // Set a timeout to reset position after transition completes
        setTimeout(() => {
          setCurrentIndex(testimonials.length);
          setIsAnimating(false);
        }, 400);
        return newIndex;
      }
      return newIndex;
    });
    
    // For normal slides, reset animation state after transition
    setTimeout(() => setIsAnimating(false), 400);
  }, [testimonials.length, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      // If we're at the beginning of the duplicated set, prepare for seamless reset
      if (newIndex < testimonials.length) {
        // Set a timeout to reset position after transition completes
        setTimeout(() => {
          setCurrentIndex(testimonials.length * 2 - 1);
          setIsAnimating(false);
        }, 400);
        return newIndex;
      }
      return newIndex;
    });
    
    // For normal slides, reset animation state after transition
    setTimeout(() => setIsAnimating(false), 400);
  }, [testimonials.length, isAnimating]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  return (
    <section 
      className={cn("py-24", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Customer testimonials carousel"
      role="region"
    >
      <Grid container className="gap-grid-mobile tablet:gap-grid-tablet desktop:gap-grid-desktop">
        {/* Section Heading - simplified */}
        <motion.div 
          className="col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-heading text-3xl font-bold text-text-primary leading-[150%] tracking-button"
            style={{
              fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            }}
          >
            Testimonials
          </h2>
        </motion.div>

        {/* Testimonials Cards Container - responsive column spans */}
        <div className="col-mobile-4 tablet:col-tablet-5 desktop:col-desktop-9">
          <div 
            className="relative overflow-hidden edge-fade-right"
            role="group"
            aria-label="Testimonials"
            aria-live="polite"
            aria-atomic="true"
          >
            <motion.div 
              className="flex items-center gap-6 tablet:gap-5 desktop:gap-6"
              animate={{
                x: transformValues[screenSize],
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
              ref={trackRef}
            >
              {/* Render testimonials 3 times for infinite scrolling */}
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => {
                const n = testimonials.length;
                const originalIndex = index % n;
                
                // Normalize distance independent of which cloned set we're in
                const activeIndex = ((currentIndex % n) + n) % n;
                let relative = originalIndex - activeIndex; // range potentially [-n+1, n-1]
                if (relative > n / 2) relative -= n;
                if (relative < -n / 2) relative += n;
                
                let opacity = 1;
                let blur = 0;
                let scale = 1;
                
                // Apply visual effects based on normalized distance
                if (relative === 1) {
                  opacity = 0.48;
                  blur = 5;
                  scale = 0.95;
                } else if (relative === 2) {
                  opacity = 0.24;
                  blur = 12;
                  scale = 0.9;
                } else if (relative < 0 || relative > 2) {
                  opacity = 0;
                  blur = 12;
                  scale = 0.85;
                }

                return (
                  <motion.div
                    key={`${originalIndex}-${Math.floor(index / testimonials.length)}`}
                    className="flex-shrink-0"
                    animate={{
                      opacity,
                      filter: blur > 0 ? `blur(${blur}px)` : 'none',
                      scale,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <TestimonialCard
                      rating={testimonial.rating}
                      quote={testimonial.quote}
                      author={testimonial.author}
                      className="w-[280px] tablet:w-[360px] desktop:w-[408px]"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Navigation below cards - spans same width as cards container */}
        <motion.div 
          className="col-mobile-4 tablet:col-tablet-5 tablet:col-start-4 desktop:col-desktop-9 desktop:col-start-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-4">
            {/* Separator line - hidden on mobile */}
            <div className="w-full h-px bg-text-primary hidden tablet:block" />
            
            {/* Navigation controls */}
            <div className="flex justify-between items-center">
              <motion.button
                onClick={prevSlide}
                disabled={isAnimating}
                className={`w-10 h-10 flex items-center justify-center tablet:bg-transparent bg-background-secondary rounded-full tablet:rounded-none tablet:hover:bg-transparent tablet:focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-[rgba(29,71,71,0.1)] ${
                  isAnimating 
                    ? 'text-text-disabled cursor-not-allowed' 
                    : 'text-text-primary hover:text-[#0C2626] hover:bg-background-hover cursor-pointer'
                }`}
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowLeft className="w-8 h-8 tablet:w-8 tablet:h-8" />
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                disabled={isAnimating}
                className={`w-10 h-10 flex items-center justify-center tablet:bg-transparent bg-background-secondary rounded-full tablet:rounded-none tablet:hover:bg-transparent tablet:focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-[rgba(29,71,71,0.1)] ${
                  isAnimating 
                    ? 'text-text-disabled cursor-not-allowed' 
                    : 'text-text-primary hover:text-[#0C2626] hover:bg-background-hover cursor-pointer'
                }`}
                aria-label="Next testimonial"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-8 h-8 tablet:w-8 tablet:h-8" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Grid>
    </section>
  );
};