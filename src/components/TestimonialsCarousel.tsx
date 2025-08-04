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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning && !prefersReducedMotion) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), prefersReducedMotion ? 100 : 400);
  }, [testimonials.length, isTransitioning, prefersReducedMotion]);

  const prevSlide = useCallback(() => {
    if (isTransitioning && !prefersReducedMotion) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), prefersReducedMotion ? 100 : 400);
  }, [testimonials.length, isTransitioning, prefersReducedMotion]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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

  // Get three visible testimonials (current, next, and the one after)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], index });
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

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
            className="flex items-center gap-6 tablet:gap-5 desktop:gap-6 overflow-hidden"
            role="group"
            aria-label="Testimonials"
            aria-live="polite"
            aria-atomic="true"
            style={{
              transform: `translateX(${isTransitioning && !prefersReducedMotion ? '-2px' : '0px'})`,
              transition: prefersReducedMotion ? 'none' : 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {visibleTestimonials.map((testimonial, index) => {
              // Apply visual effects based on position
              let opacity = 1;
              let blur = 0;
              
              if (index === 1) {
                opacity = 0.48;
                blur = 5; // Updated to match desktop CSS: filter: blur(5px)
              } else if (index === 2) {
                opacity = 0.24;
                blur = 12; // Updated to match desktop CSS: filter: blur(12px)
              }

              return (
                <div
                  key={`${testimonial.index}-${currentIndex}`}
                  className="flex-shrink-0"
                  style={{
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                    transform: `translateY(${isTransitioning && !prefersReducedMotion ? (index * 2) + 'px' : '0px'}) scale(${isTransitioning && !prefersReducedMotion ? 0.98 : 1})`,
                    transition: prefersReducedMotion ? 'none' : 'all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transitionDelay: prefersReducedMotion ? '0ms' : `${index * 50}ms`,
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

        {/* Navigation below cards - spans same width as cards container */}
        <div className="col-mobile-4 tablet:col-tablet-5 tablet:col-start-4 desktop:col-desktop-9 desktop:col-start-4 mt-6">
          <div className="flex flex-col gap-4">
            {/* Separator line - hidden on mobile */}
            <div className="w-full h-px bg-text-primary hidden tablet:block" />
            
            {/* Navigation controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevSlide}
                className="w-8 h-8 tablet:w-6 tablet:h-6 flex items-center justify-center text-text-primary hover:text-[#0C2626] tablet:hover:bg-background-hover hover:bg-[#0C2626] hover:text-white tablet:hover:text-[#0C2626] transition-all duration-200 ease-in-out tablet:bg-transparent bg-background-secondary rounded-full tablet:rounded-none hover:scale-105 active:scale-95"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5 tablet:w-4 tablet:h-4 transition-transform duration-200" />
              </button>
              
              <button
                onClick={nextSlide}
                className="w-8 h-8 tablet:w-6 tablet:h-6 flex items-center justify-center text-text-primary hover:text-[#0C2626] tablet:hover:bg-background-hover hover:bg-[#0C2626] hover:text-white tablet:hover:text-[#0C2626] transition-all duration-200 ease-in-out tablet:bg-transparent bg-background-secondary rounded-full tablet:rounded-none hover:scale-105 active:scale-95"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5 tablet:w-4 tablet:h-4 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </Grid>
    </section>
  );
};