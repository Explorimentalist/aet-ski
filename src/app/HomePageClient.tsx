'use client';

// src/app/HomePageClient.tsx
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Grid } from '@/components/Grid';
import { CardImage } from '@/components/CardImage';
import { LazyTestimonialsCarousel as TestimonialsCarousel } from '@/components/LazyTestimonialsCarousel';
import { LazyMultiStepForm as MultiStepForm } from '@/components/LazyMultiStepForm';
import { PageHeroHome } from '@/components/PageHeroHome';
import MarqueeRebrand from '../components/MarqueeRebrand';
import { ImageWithGradient } from '@/components/ImageWithGradient';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BookingFormData } from '@/types';
import { PageWrapper } from '@/motion/PageWrapper';
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

  const handleSkiStorageContact = useCallback(() => {
    router.push('/contact?interest=ski-storage');
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
                  We cover all the resorts of Les 3 Vallées as well as La Plagne, Les Arcs, Tignes, Val d&apos;Isère and others in the surrounding areas
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
              cloudinaryPublicId="v1759846075/routes_top_map_scw9bx"
              alt="Map showing transfer routes from airports to resorts"
              height="h-[400px] tablet:h-[360px] desktop:h-[528px]"
              className="rounded-2xl"
              imageWidth={1200}
              imageHeight={528}
              deviceType="desktop"
              format="auto"
              priority={true}
              preserveAspectRatio={true}
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
                description="Checked regularly, modern & comfortable. Our vans have what it takes to make your journey."
                imagePublicId="https://res.cloudinary.com/dzrn3khsd/image/upload/v1757429374/interior_botneg.png" // or a full Cloudinary URL
                variant="flex"
              />
              {/* CardImage 2: Local knowledge */}
              <CardImage
                title="Local knowledge"
                description="AET is a local Savoie based company, the advantages are local knowledge & permissions."
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

              {/* CardImage 6: Friendly drivers */}
              <CardImage
                title="Friendly drivers"
                description="Our team of drivers will greet you with a smile and make your journey enjoyable & seamless."
                imagePublicId="https://res.cloudinary.com/dzrn3khsd/image/upload/v1757935281/family_laughing_mzvprp.png"
                imageAlt="Family inside a Volkswagen Transporter T6 laughing while traveling through snowy scenery"
                variant="flex"
                className="flex-shrink-0"
              />
            </div>
          </div>
        </Grid>
      </section>

      {/* Ski Equipment Storage Section */}
      <section className="py-48 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #F5F5F5 0%, #CAE7FF 16%, #CAE7FF 84%, #F5F5F5 100%)' }}>
        <Grid container className="gap-grid-mobile tablet:gap-grid-tablet desktop:gap-grid-desktop">
          {/* Tag and Heading - Mobile: above image, Tablet: cols 1-4, Desktop: cols 2-4 */}
          <div className="col-mobile-4 tablet:col-tablet-4 tablet:col-start-1 desktop:col-desktop-3 desktop:col-start-2 relative z-10 order-1 desktop:order-1 desktop:flex desktop:items-center">
            <div className="flex flex-col gap-6 w-full">
              {/* New Badge */}
              <div className="inline-flex items-center px-3 py-2 bg-accent-primary h-[30px] max-w-fit" style={{ borderRadius: '15px' }}>
                <span 
                  className="text-xs font-normal text-text-muted leading-[120%] tracking-button whitespace-nowrap"
                  style={{
                    fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                  }}
                >
                  NEW
                </span>
              </div>

              {/* Heading */}
              <h2 
                className="text-heading text-3xl font-bold text-text-primary leading-[120%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                Snow Equipment Storage
              </h2>
              
              {/* Content Container - Hidden on mobile, shown on tablet and desktop */}
              <div className="hidden tablet:flex desktop:flex flex-col gap-5">
                {/* Description */}
                <p className="text-base font-normal leading-relaxed tracking-tight" style={{ color: '#000000', letterSpacing: '-0.011em' }}>
                If you are returning to the Alps why not remove some of the hassle of travelling. AET offers a storage facility for returning customers:
                </p>
                
                <ul className="text-base font-normal leading-relaxed tracking-tight" style={{ color: '#000000', letterSpacing: '-0.011em' }}>
                  <li>• Easy to drop off & collect</li>
                  <li>• Affordable</li>
                  <li>• Secure</li>
                </ul>
                
                {/* Call to action */}
                <div className="flex flex-col gap-4 tablet:items-start desktop:items-start">
                  <p className="text-base font-normal leading-relaxed tracking-tight" style={{ color: '#000000', letterSpacing: '-0.011em' }}>
                    Find out more.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    className="tablet:w-fit desktop:w-fit"
                    onClick={handleSkiStorageContact}
                    style={{
                      background: 'transparent',
                      border: '2px solid #1D4747',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      height: '40px',
                      color: '#1D4747',
                    }}
                  >
                    Contact us
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Column - Mobile: below content, Tablet: cols 5-8, Desktop: cols 7-10 */}
          <div className="col-mobile-4 tablet:col-tablet-4 tablet:col-start-5 desktop:col-desktop-4 desktop:col-start-7 order-2 desktop:order-2 mb-8 desktop:mb-0 desktop:flex desktop:items-center tablet:flex tablet:items-center">
            <div className="relative flex justify-center desktop:justify-center w-full">
              {/* Main Image with Decorative Overlay */}
              <div className="relative">
                {/* Background Ski Storage Image */}
                <Image 
                  src="https://res.cloudinary.com/dzrn3khsd/image/upload/v1758021650/ski_service_ps34ym.png"
                  alt="Ski equipment storage service - skier with gear in alpine setting"
                  width={407}
                  height={580}
                  className="w-72 tablet:w-96 desktop:w-[407px] h-[410px] tablet:h-[545px] desktop:h-[580px] object-cover rounded-xl tablet:rounded-2xl relative z-10"
                  priority={false}
                  loading="lazy"
                />
                
                {/* PNG Overlay - Positioned to align with top of image */}
                <div className="absolute -top-8 -left-4 -right-4 pointer-events-none z-20">
                  <Image 
                    src="https://res.cloudinary.com/dzrn3khsd/image/upload/v1758023015/Clouds_dyj2t0.png"
                    alt=""
                    width={800}
                    height={400}
                    className="w-[160%] desktop:w-[220%] h-auto object-contain mx-auto"
                    style={{ 
                      mixBlendMode: 'normal',
                      opacity: 1 
                    }}
                    priority={false}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Description - Mobile only: below image, Tablet/Desktop: hidden (combined with first column) */}
          <div className="col-mobile-4 tablet:hidden desktop:hidden order-3">
            <div className="flex flex-col gap-5">
              {/* Description */}
              <p className="text-base font-normal leading-relaxed tracking-tight" style={{ color: '#000000', letterSpacing: '-0.011em' }}>
                If you return every year to the alps, consider keeping your storage safe, in our facilities. It is:
              </p>
              
              {/* Benefits */}
              <ul className="text-base font-normal leading-relaxed tracking-tight" style={{ color: '#000000', letterSpacing: '-0.011em' }}>
                <li>• Easy to drop off & collect</li>
                <li>• Affordable</li>
                <li>• Secure</li>
              </ul>
              
              {/* Call to action */}
              <div className="flex flex-col gap-4 tablet:items-center">
                <p className="text-base font-normal leading-relaxed tracking-tight" style={{ color: '#000000', letterSpacing: '-0.011em' }}>
                  Find out more.
                </p>
                <Button
                  variant="secondary"
                  size="md"
                  className="tablet:w-full"
                  onClick={handleOpenForm}
                  style={{
                    background: 'transparent',
                    border: '2px solid #1D4747',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    height: '40px',
                    color: '#1D4747',
                  }}
                >
                  Contact us
                </Button>
              </div>
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
