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
        {/* Section Heading and Navigation - 3 columns desktop/tablet, 4 columns mobile */}
        <div className="col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3 flex flex-col tablet:min-h-[400px] desktop:min-h-[520px]">
          <h2 
            className="text-heading text-3xl font-bold text-text-primary leading-[150%] tracking-button"
            style={{
              fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            }}
          >
            Testimonials
          </h2>
          
          {/* Desktop/Tablet navigation at bottom */}
          <div className="mt-auto hidden tablet:flex flex-col gap-2">
            <div className="w-full h-px bg-text-primary" />
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={prevSlide}
                className="w-6 h-6 flex items-center justify-center text-text-primary hover:text-text-brand transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-6 h-6 flex items-center justify-center text-text-primary hover:text-text-brand transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Cards Container - responsive column spans */}
        <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-9">
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
                  className="flex-shrink-0 transition-all duration-normal ease-in-out"
                  style={{
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  }}
                >
                  <TestimonialCard
                    rating={testimonial.rating}
                    quote={testimonial.quote}
                    author={testimonial.author}
                    className="w-[360px] h-[400px] tablet:w-[360px] tablet:h-[400px] desktop:w-[408px] desktop:h-[520px]"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="col-mobile-4 tablet:hidden mt-4 flex justify-between items-center">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center text-text-primary hover:text-text-brand transition-colors bg-background-secondary rounded-full"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center text-text-primary hover:text-text-brand transition-colors bg-background-secondary rounded-full"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </Grid>
    </section>
  );
};