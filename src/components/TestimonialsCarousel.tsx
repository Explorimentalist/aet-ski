// src/components/TestimonialsCarousel.tsx
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const controls = useAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Create extended array for seamless infinite scrolling
  const extendedTestimonials = [...testimonials, ...testimonials];

  // Calculate card dimensions for different screen sizes
  const cardDimensions = {
    mobile: { width: 280, gap: 24 },
    tablet: { width: 360, gap: 20 },
    desktop: { width: 408, gap: 24 },
  };

  // Calculate exact transform values for pixel-perfect positioning
  const getTransformValue = (index: number) => {
    const { width, gap } = cardDimensions[screenSize];
    return -(index * (width + gap));
  };

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

  const nextSlide = useCallback(async () => {
    if (isAnimating || testimonials.length === 0) return;
    setIsAnimating(true);
    
    const nextIndex = currentIndex + 1;
    
    // Animate to the next position
    await controls.start({
      x: getTransformValue(nextIndex),
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    });
    
    // If we've reached the end of the first set, reset to beginning seamlessly
    if (nextIndex >= testimonials.length) {
      // Instantly jump back to position 0 (which is visually identical to position testimonials.length)
      controls.set({ x: getTransformValue(0) });
      setCurrentIndex(0);
    } else {
      setCurrentIndex(nextIndex);
    }
    
    setIsAnimating(false);
  }, [currentIndex, testimonials.length, isAnimating, controls, getTransformValue]);

  const prevSlide = useCallback(async () => {
    if (isAnimating || testimonials.length === 0) return;
    setIsAnimating(true);
    
    if (currentIndex === 0) {
      // If we're at the beginning, jump to the end of the first set and animate backwards
      const lastIndex = testimonials.length - 1;
      controls.set({ x: getTransformValue(testimonials.length) }); // Position at duplicate of first item
      
      await controls.start({
        x: getTransformValue(lastIndex),
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.4
        }
      });
      setCurrentIndex(lastIndex);
    } else {
      // Normal previous slide
      const prevIndex = currentIndex - 1;
      await controls.start({
        x: getTransformValue(prevIndex),
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.4
        }
      });
      setCurrentIndex(prevIndex);
    }
    
    setIsAnimating(false);
  }, [currentIndex, testimonials.length, isAnimating, controls, getTransformValue]);

  // Initialize animation position
  useEffect(() => {
    controls.set({ x: getTransformValue(currentIndex) });
  }, [screenSize, controls, currentIndex, getTransformValue]);

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
              animate={controls}
              ref={trackRef}
            >
              {/* Render testimonials with duplicates for seamless infinite scrolling */}
              {extendedTestimonials.map((testimonial, index) => {
                const originalIndex = index % testimonials.length;
                
                // Calculate distance from current active card
                let distance = Math.abs(index - currentIndex);
                
                // For the duplicated set, also consider the wrapped distance
                const wrappedDistance = Math.abs(index - currentIndex - testimonials.length);
                if (wrappedDistance < distance) {
                  distance = wrappedDistance;
                }
                
                let opacity = 1;
                let blur = 0;
                let scale = 1;
                
                // Apply visual effects based on distance from active card
                if (distance === 1) {
                  opacity = 0.48;
                  blur = 5;
                  scale = 0.95;
                } else if (distance === 2) {
                  opacity = 0.24;
                  blur = 12;
                  scale = 0.9;
                } else if (distance > 2) {
                  opacity = 0;
                  blur = 12;
                  scale = 0.85;
                }

                return (
                  <motion.div
                    key={`testimonial-${originalIndex}-${Math.floor(index / testimonials.length)}`}
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