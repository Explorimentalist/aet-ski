'use client';

// src/app/HomePageClient.tsx
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Clock, Shield, MapPin, CheckCircle, Bus } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Grid } from '@/components/Grid';
import { CardSmall } from '@/components/CardSmall';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { MultiStepForm } from '@/components/MultiStepForm';
import { PageHeroHome } from '@/components/PageHeroHome';
import MarqueeRebrand from '../components/MarqueeRebrand';
import { ImageWithGradient } from '@/components/ImageWithGradient';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookingFormData } from '@/types';
import { TestimonialCard } from '@/components/CardLarge';

export default function HomePageClient() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();

  // Testimonials state - fetched from Sanity with fallback
  const [testimonials, setTestimonials] = useState([
    { rating: 5, quote: "Look no further for your transfers. Always faultless and friendly, with spotless vehicles and impressive punctuality.", author: "Ross Wilkinson" },
    { rating: 5, quote: "Exceptional service from start to finish. Professional, reliable, and made our ski holiday stress-free.", author: "Sarah Johnson" },
    { rating: 5, quote: "The best transfer service we've used in the Alps. Highly recommended for families and groups.", author: "Michael Chen" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((t: { rating: number; content: string; author: string }) => ({
            rating: t.rating,
            quote: t.content,
            author: t.author,
          }));
          setTestimonials(mapped);
        }
      } catch {
        // silent fallback to defaults
      }
    })();
  }, []);

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

  const handleViewRoutes = useCallback(() => {
    router.push('/routes');
  }, [router]);

  return (
    <main className="min-h-screen">
      {/* Fixed Navigation */}
      <Navigation onQuoteClick={handleOpenForm} />
      
      {/* Main Content with top padding to account for fixed nav */}
      <div className="pt-[72px] md:pt-[72px]">

      {/* Hero Section */}
      <PageHeroHome onQuoteClick={handleOpenForm} />

      {/* Rebrand Marquee Section */}
      <MarqueeRebrand />

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
              
              {/* Service Features List - Numbered with separators */}
              <div className="flex flex-col">
                {/* Item 1 */}
                <div className="py-xl grid grid-cols-[40px_1fr] gap-4 items-center tablet:items-start">
                  <div className="flex justify-end items-center tablet:items-start w-6 h-10">
                    <span className="text-[40px] leading-none font-light text-text-form">1</span>
                  </div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.011em]">
                    We offer private transfers from Geneva, Lyon, Chambery and Grenoble airports
                  </p>
                  <div className="col-span-2 h-px bg-border-secondary"></div>
                </div>

                {/* Item 2 */}
                <div className="py-xl grid grid-cols-[40px_1fr] gap-4 items-center tablet:items-start">
                  <div className="flex justify-end items-center tablet:items-start w-6 h-10">
                    <span className="text-[40px] leading-none font-light text-text-form">2</span>
                  </div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.001em]">
                    We cover all the resorts of Les 3 Vallées as well as Val d&apos;Isère, Tignes, Les Arcs, La Plagne and others in their surrounding areas.
                  </p>
                  <div className="col-span-2 h-px bg-border-secondary"></div>
                </div>

                {/* Item 3 */}
                <div className="py-xl grid grid-cols-[40px_1fr] gap-4 items-center tablet:items-start">
                  <div className="flex justify-end items-center tablet:items-start w-6 h-10">
                    <span className="text-[40px] leading-none font-light text-text-form">3</span>
                  </div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.011em]">7 days a week</p>
                  <div className="col-span-2 h-px bg-border-secondary"></div>
                </div>

                {/* Item 4 */}
                <div className="py-xl grid grid-cols-[40px_1fr] gap-4 items-center tablet:items-start">
                  <div className="flex justify-end items-center tablet:items-start w-6 h-10">
                    <span className="text-[40px] leading-none font-light text-text-form">4</span>
                  </div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.011em]">Door to door throughout the winter</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Static Map with veil (9/5/4 columns) */}
          <div className="col-mobile-4 tablet:col-tablet-5 desktop:col-desktop-9">
            <ImageWithGradient
              src="https://res.cloudinary.com/dzrn3khsd/image/upload/v1754484387/routes_top_map_scw9bx.png"
              alt="Map showing transfer routes from airports to resorts"
              height="h-[528px]"
              className="rounded-2xl"
            />
          </div>

          {/* Button - Moved to be responsive */}
          <div className="col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3 mt-4 tablet:mt-0 desktop:mt-0">
            <Button
              variant="secondary"
              size="md"
              className="w-fit"
              onClick={handleViewRoutes}
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
                icon={Bus}
                title="Over 1700 journeys"
                description="Over 10 years of experience bringing people to the joy of the slopes"
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
            Get a quote in the next 24h and secure your airport transfer to the French Alps
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

      <Footer onQuoteClick={handleOpenForm} />
      
      </div> {/* Close main content wrapper */}
    </main>
  );
}

