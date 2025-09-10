'use client';

// src/app/HomePageClient.tsx
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Clock, Shield, MapPin, CheckCircle, Bus } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Grid } from '@/components/Grid';
import { CardSmall } from '@/components/CardSmall';
import { CardImage } from '@/components/CardImage';
import { LazyTestimonialsCarousel as TestimonialsCarousel } from '@/components/LazyTestimonialsCarousel';
import { LazyMultiStepForm as MultiStepForm } from '@/components/LazyMultiStepForm';
import { PageHeroHome } from '@/components/PageHeroHome';
import MarqueeRebrand from '../components/MarqueeRebrand';
import { ImageWithGradient } from '@/components/ImageWithGradient';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookingFormData } from '@/types';
import { TestimonialCard } from '@/components/CardLarge';
import { PageWrapper, PageContent, PageSection } from '@/motion/PageWrapper';
import PerformanceDashboard from '@/components/PerformanceDashboard';

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
    <>
      {/* Fixed Navigation */}
      <Navigation onQuoteClick={handleOpenForm} />
      
      {/* Main Content with top padding to account for fixed nav */}
      <PageWrapper className="pt-[72px] md:pt-[72px]">

      {/* Hero Section */}
      <PageHeroHome onQuoteClick={handleOpenForm} />

      {/* Rebrand Marquee Section */}
      <MarqueeRebrand />

      {/* The Transfers Section */}
      <section className="py-24 bg-background-primary">
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
                Our transfers
              </h2>
              
              {/* Service Features List - Numbered with separators */}
              <div className="flex flex-col">
                {/* Item 1 */}
                <div className="py-xl grid grid-cols-[40px_1fr] gap-4 items-center tablet:items-start">
                  <div className="flex justify-end items-center tablet:items-start w-6 h-10">
                    <span className="text-[40px] leading-none font-light text-text-form">1</span>
                  </div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.011em]">
                  We offer private transfers from Geneva, Chambery, Lyon, Grenoble & even Milan airports
                  </p>
                  <div className="col-span-2 h-px bg-border-secondary"></div>
                </div>

                {/* Item 2 */}
                <div className="py-xl grid grid-cols-[40px_1fr] gap-4 items-center tablet:items-start">
                  <div className="flex justify-end items-center tablet:items-start w-6 h-10">
                    <span className="text-[40px] leading-none font-light text-text-form">2</span>
                  </div>
                  <p className="text-body text-base font-normal text-text-primary leading-[150%] tracking-[-0.001em]">
                  We cover all the resorts of Les 3 Vallées as well as La Plagne, Les Arcs, Tignes, Val d'Isère and others in the surrounding areas
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
              cloudinaryPublicId="v1754484387/routes_top_map_scw9bx"
              alt="Map showing transfer routes from airports to resorts"
              height="h-[528px]"
              className="rounded-2xl"
              imageWidth={1200}
              imageHeight={528}
              deviceType="desktop"
              format="auto"
              priority={true}
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
            {/* Stretch items so each row matches the tallest card height */}
            <div className="flex flex-wrap items-stretch gap-4 md:gap-5 lg:gap-6 justify-start">
              {/* Card 1: Well equipped vehicles */}
              <CardImage
                title="Well equipped vehicles"
                description="Checked regularly, our vans have what it takes to make your journey."
                imagePublicId="https://res.cloudinary.com/dzrn3khsd/image/upload/v1757429374/interior_botneg.png" // or a full Cloudinary URL
                variant="flex"
              />
              {/* CardImage 2: Local knowledge */}
              <CardImage
                title="Local knowledge"
                description="AET is a local Savoie based company, the advantages are local permissions & knowledge."
                imagePublicId="https://res.cloudinary.com/dzrn3khsd/image/upload/v1757429004/Jamie_front__van_iwmo0h.png"
                variant="flex"
                className="flex-shrink-0"
              />

              {/* CardImage 3: Always on time */}
              <CardImage
                title="Always on time"
                description="We value your time and for that reason punctuality is paramount."
                imagePublicId="https://res.cloudinary.com/dzrn3khsd/image/upload/v1757443669/on_time_mafaod.png"
                variant="flex"
                className="flex-shrink-0"
              />

              {/* CardImage 4: Reliable service */}
              <CardImage
                title="Reliable service"
                description="Life sometimes does not go the way we expect. AET is adaptive to the unexpected."
                imagePublicId="https://res.cloudinary.com/dzrn3khsd/image/upload/v1757428709/enhanced_people_ski_slope_pffksd.png"
                variant="flex"
                className="flex-shrink-0"
              />

              {/* CardImage 5: Over 1700 journeys */}
              <CardImage
                title="Over 1700 journeys"
                description="More than 15 years experience bringing people to the joy of the mountains."
                imagePublicId="https://res.cloudinary.com/dzrn3khsd/image/upload/v1757428706/Jamies_van_side_nniut6.png"
                variant="flex"
                className="flex-shrink-0"
              />
            </div>
          </div>
        </Grid>
      </section>

      {/* Testimonials Carousel Section */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-background-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-heading text-3xl font-bold text-text-form mb-8">
            Ready to book your transfer ?
          </h2>
          <p className="text-body text-lg text-text-secondary mb-12">
          Secure your airport transfers to the French Alps  
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
      
      </PageWrapper> {/* Close PageWrapper */}
      
      {/* Development Performance Dashboard */}
      <PerformanceDashboard />
    </>
  );
}

