'use client';

// src/app/page.tsx
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Clock, Users, Shield, MapPin, CheckCircle } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Grid } from '@/components/Grid';
import { CardSmall } from '@/components/CardSmall';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { MultiStepForm } from '@/components/MultiStepForm';
import { ImageWithGradient } from '@/components/ImageWithGradient';
import { useState, useCallback } from 'react';
import { BookingFormData } from '@/types';


export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Testimonials data
  const testimonials = [
    {
      rating: 5,
      quote: "Look no further for your transfers. Always faultless and friendly, with spotless vehicles and impressive punctuality.",
      author: "Ross Wilkinson"
    },
    {
      rating: 5,
      quote: "Exceptional service from start to finish. Professional, reliable, and made our ski holiday stress-free.",
      author: "Sarah Johnson"
    },
    {
      rating: 5,
      quote: "The best transfer service we've used in the Alps. Highly recommended for families and groups.",
      author: "Michael Chen"
    },
    {
      rating: 5,
      quote: "Outstanding punctuality and comfort. Made our trip to Val d'Isère absolutely seamless and enjoyable.",
      author: "Emma Watson"
    },
    {
      rating: 5,
      quote: "Professional drivers, immaculate vehicles, and unbeatable local knowledge of the Alpine routes.",
      author: "James Thompson"
    }
  ];

  const handleOpenForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleFormSubmit = useCallback((data: BookingFormData) => {
    console.log('Form submitted:', data);
    // TODO: Handle form submission (API call, etc.)
    // Don't close modal here - let the success page handle closing
    // The MultiStepForm will show the success page, and user can close it
  }, []);

  return (
    <main className="min-h-screen">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Main Content with top padding to account for fixed nav */}
      <div className="pt-[72px] md:pt-[72px]">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-background-primary rounded-3xl mx-21 my-30 lg:mx-84px md:mx-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-background-primary/50 rounded-3xl" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-inverse mb-8">
            Reliable airport transfers to the French Alps
          </h1>
          
          <p className="text-body text-xl md:text-2xl text-text-inverse mb-12 max-w-3xl mx-auto">
            More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="w-full sm:w-auto" onClick={handleOpenForm}>
              Get a quote
            </Button>
            
          </div>
        </div>
      </section>

      {/* The Transfers Section */}
      <section className="py-24">
        <Grid container className="gap-grid-mobile tablet:gap-grid-tablet desktop:gap-grid-desktop">
          {/* Left Column - Content (3/3/4 columns) */}
          <div className="col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3">
            <div className="flex flex-col gap-5">
              {/* Heading */}
              <h2 
                className="text-heading text-3xl font-bold text-text-primary leading-[100%] tracking-[-0.019em]"
                style={{
                  fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                The transfers
              </h2>
              
              {/* Bullet Points List */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-text-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.011em]">
                    We offer private transfers from Geneva, Lyon, Chambery and Grenoble airports
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-text-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.001em]">
                    We cover all the resorts of Les 3 Vallées as well as Val d&apos;Isère, Tignes, Les Arcs, La Plagne and others in their surrounding areas.
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-text-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.011em]">
                    7 days a week
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-text-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.011em]">
                    Door to door throughout the winter
                  </p>
                </div>
              </div>
              
              {/* Button */}
              <Button
                variant="secondary"
                size="md"
                className="w-fit"
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #1D4747',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  width: '119px',
                  height: '40px',
                }}
              >
                View routes
              </Button>
            </div>
          </div>
          
          {/* Right Column - Image (9/5/4 columns) */}
          <div className="col-mobile-4 tablet:col-tablet-5 desktop:col-desktop-9">
            <ImageWithGradient
              alt="Map showing transfer routes from various airports to ski resorts in the French Alps"
              placeholder={true}
              height="h-[528px]"
            />
          </div>
        </Grid>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-background-primary">
        <Grid container className="gap-grid-mobile tablet:gap-grid-tablet desktop:gap-grid-desktop">
          {/* Section Heading - spans 3 columns */}
          <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-3 mb-16">
            <h2 
              className="text-heading text-3xl font-bold text-text-primary leading-[120%] tracking-[-0.011em]"
              style={{
                fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
              }}
            >
              Why choose us
            </h2>
          </div>
          
          {/* Cards Container - spans 9 columns */}
          <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-9">
            <div className="flex flex-wrap gap-4 md:gap-5 lg:gap-6 justify-start">
              {/* Card 1: Well equipped vehicles */}
              <CardSmall
                icon={Shield}
                title="Well equipped vehicles"
                description="Checked regularly, our vans have what it takes to make your journey."
                className="flex-shrink-0"
                variant="flex"
              />

              {/* Card 2: Local knowledge */}
              <CardSmall
                icon={MapPin}
                title="Local knowledge"
                description="Our local business advantages get you faster and affordably to your destination."
                className="flex-shrink-0"
                variant="flex"
              />

              {/* Card 3: Always on time */}
              <CardSmall
                icon={Clock}
                title="Always on time"
                description="We value your time and for that reason punctuality is paramount."
                className="flex-shrink-0"
                variant="flex"
              />

              {/* Card 4: Reliable service */}
              <CardSmall
                icon={CheckCircle}
                title="Reliable service"
                description="We value your time and for that reason punctuality is paramount."
                className="flex-shrink-0"
                variant="flex"
              />

              {/* Card 5: Your quote within a day */}
              <CardSmall
                icon={Users}
                title="Your quote within a day"
                description="We sent you a quote back within 24h"
                className="flex-shrink-0"
                variant="flex"
              />
            </div>
          </div>
        </Grid>
      </section>

      {/* Testimonials Carousel Section */}
      <TestimonialsCarousel testimonials={testimonials} />


      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-heading text-3xl font-bold text-text-form mb-8">
            Ready to book your transfer?
          </h2>
          <p className="text-body text-lg text-text-secondary mb-12">
            Get a quote in minutes and secure your airport transfer to the French Alps
          </p>
          <Button size="lg" className="mx-auto" onClick={handleOpenForm}>
            Get a quote now
          </Button>
        </div>
      </section>

      {/* Multi-Step Form Modal */}
      <MultiStepForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />

      <Footer />
      
      </div> {/* Close main content wrapper */}
    </main>
  );
}
