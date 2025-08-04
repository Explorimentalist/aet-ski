// src/components/TestimonialsCarousel.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
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

  // Calculate responsive transform values
  const getTransformValue = () => {
    const offset = testimonials.length; // Start from middle set for infinite scrolling
    const position = currentIndex + offset;
    
    // Return different values for different breakpoints
    // Mobile: 280px + 24px gap = 304px per card
    // Tablet: 360px + 20px gap = 380px per card  
    // Desktop: 408px + 24px gap = 432px per card
    return {
      mobile: -position * 304,
      tablet: -position * 380, 
      desktop: -position * 432,
    };
  };

  const transformValues = getTransformValue();

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 400);
  }, [testimonials.length, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    // Reset animation state after transition completes
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
        <div className="col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3">
          <h2 
            className="text-heading text-3xl font-bold text-text-primary leading-[150%] tracking-button"
            style={{
              fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            }}
          >
            Testimonials
          </h2>
        </div>

        {/* Testimonials Cards Container - responsive column spans */}
        <div className="col-mobile-4 tablet:col-tablet-5 desktop:col-desktop-9">
          <div 
            className="relative overflow-hidden"
            role="group"
            aria-label="Testimonials"
            aria-live="polite"
            aria-atomic="true"
          >
            <div 
              className="flex items-center gap-6 tablet:gap-5 desktop:gap-6 transition-transform duration-[400ms] ease-out motion-reduce:transition-none"
              style={{
                transform: `translateX(${transformValues.mobile}px)`,
              }}
            >
              {/* Render testimonials with infinite loop logic */}
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => {
                const originalIndex = index % testimonials.length;
                
                // Calculate position relative to current focused testimonial
                // We start from the middle set (testimonials.length offset), so adjust accordingly
                const positionFromCurrent = index - (currentIndex + testimonials.length);
                
                let opacity = 1;
                let blur = 0;
                
                // Apply visual effects based on distance from current item
                if (positionFromCurrent === 1) {
                  opacity = 0.48;
                  blur = 5;
                } else if (positionFromCurrent === 2) {
                  opacity = 0.24;
                  blur = 12;
                } else if (positionFromCurrent < 0 || positionFromCurrent > 2) {
                  opacity = 0;
                  blur = 12;
                }

                return (
                  <div
                    key={`${originalIndex}-${Math.floor(index / testimonials.length)}`}
                    className="flex-shrink-0 transition-all duration-[400ms] ease-out motion-reduce:transition-none"
                    style={{
                      opacity,
                      filter: blur > 0 ? `blur(${blur}px)` : 'none',
                    }}
                  >
                    <TestimonialCard
                      rating={testimonial.rating}
                      quote={testimonial.quote}
                      author={testimonial.author}
                      className="w-[280px] tablet:w-[360px] desktop:w-[408px]"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation below cards - spans same width as cards container */}
        <div className="col-mobile-4 tablet:col-tablet-5 tablet:col-start-4 desktop:col-desktop-9 desktop:col-start-4 mt-6">
          <div className="flex flex-col gap-4">
            {/* Separator line - hidden on mobile */}
            <div className="w-full h-px bg-text-primary hidden tablet:block" />
            
            {/* Navigation controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className={`w-8 h-8 tablet:w-6 tablet:h-6 flex items-center justify-center transition-all duration-200 ease-in-out tablet:bg-transparent bg-background-secondary rounded-full tablet:rounded-none tablet:hover:bg-transparent tablet:focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-[rgba(29,71,71,0.1)] ${
                  isAnimating 
                    ? 'text-text-disabled cursor-not-allowed' 
                    : 'text-text-primary hover:text-[#0C2626] hover:bg-background-hover cursor-pointer'
                }`}
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5 tablet:w-4 tablet:h-4" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className={`w-8 h-8 tablet:w-6 tablet:h-6 flex items-center justify-center transition-all duration-200 ease-in-out tablet:bg-transparent bg-background-secondary rounded-full tablet:rounded-none tablet:hover:bg-transparent tablet:focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-[rgba(29,71,71,0.1)] ${
                  isAnimating 
                    ? 'text-text-disabled cursor-not-allowed' 
                    : 'text-text-primary hover:text-[#0C2626] hover:bg-background-hover cursor-pointer'
                }`}
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5 tablet:w-4 tablet:h-4" />
              </button>
            </div>
          </div>
        </div>
      </Grid>
    </section>
  );
};