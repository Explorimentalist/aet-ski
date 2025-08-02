'use client';

// src/app/page.tsx
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Clock, Users, Shield } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Grid } from '@/components/Grid';
import { CardSmall } from '@/components/CardSmall';
import { TestimonialCard } from '@/components/CardLarge';
import { MultiStepForm } from '@/components/MultiStepForm';
import { useState, useCallback } from 'react';
import { BookingFormData } from '@/types';


export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
            
            {/* <div className="flex items-center gap-8 text-text-inverse">
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                <span className="text-sm">Geneva, Lyon, Chambery, Grenoble</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                <span className="text-sm">7 days a week</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <Grid container className="gap-grid-mobile tablet:gap-grid-tablet desktop:gap-grid-desktop">
          {/* Feature Card 1 */}
          <CardSmall
            icon={Users}
            title="Over 1850 journeys"
            description="Checked regularly, our vans have what it takes to make your journey."
          />

          {/* Feature Card 2 */}
          <CardSmall
            icon={Shield}
            title="Safe & Reliable"
            description="Professional drivers with extensive experience in alpine conditions."
          />

          {/* Feature Card 3 */}
          <CardSmall
            icon={Clock}
            title="Punctual Service"
            description="Always on time, ensuring you never miss your flight or ski session."
          />
        </Grid>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-yellow-200 via-blue-500 to-blue-700">
        <Grid container>
          {/* Section heading */}
          <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12 mb-16">
            <h2 className="text-heading text-3xl md:text-4xl font-bold text-text-inverse text-center">
              What our customers say
            </h2>
          </div>
          
          {/* Testimonials grid */}
          <Grid className="gap-grid-mobile tablet:gap-grid-tablet desktop:gap-grid-desktop">
            {/* Testimonial Card 1 */}
            <TestimonialCard
              rating={5}
              quote="Look no further for your transfers. Always faultless and friendly, with spotless vehicles and impressive punctuality."
              author="Ross Wilkinson"
            />

            {/* Testimonial Card 2 */}
            <TestimonialCard
              rating={5}
              quote="Exceptional service from start to finish. Professional, reliable, and made our ski holiday stress-free."
              author="Sarah Johnson"
            />

            {/* Testimonial Card 3 */}
            <TestimonialCard
              rating={5}
              quote="The best transfer service we've used in the Alps. Highly recommended for families and groups."
              author="Michael Chen"
            />
          </Grid>
        </Grid>
      </section>
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-heading text-3xl md:text-4xl font-bold text-text-primary mb-8">
            Ready to book your transfer?
          </h2>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-heading text-3xl md:text-4xl font-bold text-text-primary mb-8">
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
