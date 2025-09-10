'use client';

// src/app/review/ReviewPageClient.tsx
import React, { useCallback, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LazyMultiStepForm as MultiStepForm } from '@/components/LazyMultiStepForm';
import { Button } from '@/components/Button';
import { Grid } from '@/components/Grid';
import { PageWrapper } from '@/motion/PageWrapper';
import { BookingFormData } from '@/types';
import { LazyReviewForm as ReviewForm, ReviewFormValues } from '@/components/LazyReviewForm';
import { MessageSquareHeart, ShieldUser } from 'lucide-react';

export default function ReviewPageClient() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleFormSubmit = useCallback((data: BookingFormData) => {
    // Booking modal submit handler (unchanged from other pages)
    console.log('Form submitted:', data);
  }, []);

  return (
    <>
      {/* Navigation */}
      <Navigation onQuoteClick={handleOpenForm} />

      {/* Main Content */}
      <PageWrapper className="pt-[72px] pb-0 bg-background-primary">
        <Grid container className="py-12 tablet:py-16 desktop:py-24">
          {/* Page Heading */}
          <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12 mb-16">
            <h1
              className="text-4xl tablet:text-5xl desktop:text-6xl font-bold text-text-primary leading-[120%] tracking-[-0.011em]"
              style={{
                fontFamily:
                  'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
              }}
            >
              Leave a review
            </h1>
            {/* Intro paragraph removed as requested */}
          </div>

          {/* Content Grid */}
          <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12">
            <Grid>
              {/* Review Form - left side on desktop */}
              <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-6">
                <ReviewForm
                  onSubmit={async (payload: ReviewFormValues) => {
                    try {
                      const res = await fetch('/api/review', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                      });
                      const json = await res.json();
                      if (res.ok && json?.success) {
                        alert(json?.message || 'Thank you! Your review has been submitted.');
                        return true; // signal ReviewForm to reset
                      } else {
                        alert(json?.error || 'Failed to submit review. Please try again.');
                        return false;
                      }
                    } catch (err) {
                      console.error('Review submit error:', err);
                      alert('Network error. Please try again.');
                      return false;
                    }
                  }}
                />
              </div>

              {/* Side information - right side on desktop */}
              <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-4 desktop:col-start-desktop-8 mt-8xl desktop:mt-0 space-y-8">
                <div className="space-y-2">
                  <h2
                    className="text-base font-bold text-text-primary leading-[150%] tracking-[0.0005em] flex items-center gap-2"
                    style={{ fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
                  >
                    <MessageSquareHeart className="w-4 h-4" />
                    Thank you for your feedback
                  </h2>
                  <p
                    className="text-base font-normal text-text-primary leading-[150%] tracking-[0.0005em]"
                    style={{ fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
                  >
                    Reviews help us improve our service and guide other travellers. We read every submission.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2
                    className="text-base font-bold text-text-primary leading-[150%] tracking-[0.0005em] flex items-center gap-2"
                    style={{ fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
                  >
                    <ShieldUser className="w-4 h-4" />
                    Privacy
                  </h2>
                  <p
                    className="text-base font-normal text-text-primary leading-[150%] tracking-[0.0005em]"
                    style={{ fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
                  >
                    We display your name with your review, but do not share your booking details. We only use your data to verify the review.
                  </p>
                </div>
              </div>
            </Grid>
          </div>
        </Grid>
      </PageWrapper>

      {/* Footer */}
      <Footer onQuoteClick={handleOpenForm} />

      {/* Multi-Step Form Modal */}
      <MultiStepForm isOpen={isFormOpen} onClose={handleCloseForm} onSubmit={handleFormSubmit} />
    </>
  );
}
