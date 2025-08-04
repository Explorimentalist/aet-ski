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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

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
        {/* Section Heading with play/pause indicator */}
        <div className="col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3">
          <div className="flex items-center gap-3">
            <h2 
              className="text-heading text-3xl font-bold text-text-primary leading-[150%] tracking-button"
              style={{
                fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
              }}
            >
              Testimonials
            </h2>
            
            {/* Auto-play indicator */}
            <div className="hidden tablet:flex items-center gap-2">
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-fast ease-in-out ${
                  isPlaying 
                    ? 'bg-text-brand animate-pulse' 
                    : 'bg-text-secondary'
                }`}
                aria-hidden="true"
              />
              <span className="text-xs text-text-secondary font-medium">
                {isPlaying ? 'Auto' : 'Paused'}
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Cards Container - responsive column spans */}
        <div className="col-mobile-4 tablet:col-tablet-5 desktop:col-desktop-9">
          <div 
            className="flex items-center gap-6 tablet:gap-5 desktop:gap-6 overflow-hidden"
            role="group"
            aria-label="Testimonials"
            aria-live="polite"
            aria-atomic="true"
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
                  className="flex-shrink-0 transition-all duration-normal ease-in-out hover:scale-[1.02] focus-within:scale-[1.02] cursor-pointer"
                  style={{
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                    transform: `scale(${index === 0 ? 1 : 0.95 + (index * 0.025)})`,
                  }}
                  onMouseEnter={() => setIsPlaying(false)}
                  onMouseLeave={() => setIsPlaying(true)}
                  onClick={() => {
                    if (index === 1) nextSlide();
                    if (index === 2) {
                      nextSlide();
                      setTimeout(nextSlide, 150);
                    }
                  }}
                  role="button"
                  tabIndex={index === 0 ? 0 : -1}
                  aria-label={index === 0 ? `Current testimonial from ${testimonial.author}` : `View testimonial from ${testimonial.author}`}
                >
                  <TestimonialCard
                    rating={testimonial.rating}
                    quote={testimonial.quote}
                    author={testimonial.author}
                    className="w-[280px] tablet:w-[360px] desktop:w-[408px] transition-shadow duration-fast ease-in-out hover:shadow-lg"
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
            
            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mb-4 tablet:hidden">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-fast ease-in-out ${
                    index === currentIndex 
                      ? 'bg-text-brand scale-125' 
                      : 'bg-text-secondary hover:bg-text-primary'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation controls with enhanced motion */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevSlide}
                className="group relative w-8 h-8 tablet:w-6 tablet:h-6 flex items-center justify-center text-text-primary hover:text-text-brand focus:text-text-brand tablet:bg-transparent bg-background-secondary hover:bg-background-hover tablet:hover:bg-transparent rounded-full tablet:rounded-none transition-all duration-fast ease-in-out hover:scale-110 tablet:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-brand-primary-focus active:scale-95 tablet:active:scale-100"
                aria-label="Previous testimonial"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
              >
                <ArrowLeft className="w-5 h-5 tablet:w-4 tablet:h-4 transition-transform duration-fast ease-in-out group-hover:-translate-x-0.5 tablet:group-hover:translate-x-0" />
                {/* Hover indicator for desktop */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-text-brand transition-all duration-fast ease-in-out group-hover:w-full hidden tablet:block" />
              </button>
              
              <button
                onClick={nextSlide}
                className="group relative w-8 h-8 tablet:w-6 tablet:h-6 flex items-center justify-center text-text-primary hover:text-text-brand focus:text-text-brand tablet:bg-transparent bg-background-secondary hover:bg-background-hover tablet:hover:bg-transparent rounded-full tablet:rounded-none transition-all duration-fast ease-in-out hover:scale-110 tablet:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-brand-primary-focus active:scale-95 tablet:active:scale-100"
                aria-label="Next testimonial"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
              >
                <ArrowRight className="w-5 h-5 tablet:w-4 tablet:h-4 transition-transform duration-fast ease-in-out group-hover:translate-x-0.5 tablet:group-hover:translate-x-0" />
                {/* Hover indicator for desktop */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-text-brand transition-all duration-fast ease-in-out group-hover:w-full hidden tablet:block" />
              </button>
            </div>
          </div>
        </div>
      </Grid>
    </section>
  );
};