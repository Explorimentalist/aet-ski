// src/app/contact/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MultiStepForm } from '@/components/MultiStepForm';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { Grid } from '@/components/Grid';
import { BookingFormData } from '@/types';
import { Mail, MapPinned } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
  };

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
    <div className="min-h-screen bg-background-primary">
      {/* Navigation */}
      <Navigation onQuoteClick={handleOpenForm} />

      {/* Main Content */}
      <main className="pt-[72px] pb-0">
        <Grid container className="py-12 tablet:py-16 desktop:py-24">
          {/* Page Heading */}
          <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12 mb-16">
            <h1 
              className="text-4xl tablet:text-5xl desktop:text-6xl font-bold text-text-primary leading-[120%] tracking-[-0.011em]"
              style={{
                fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
              }}
            >
              Contact
            </h1>
          </div>

          {/* Form and Contact Info Container */}
          <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12">
            <Grid>
              {/* Contact Form - Full width on mobile/tablet, left side on desktop */}
              <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-6">
                <form className="space-y-6">
                  {/* Name Field */}
                  <Input
                    label="Name"
                    required
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                    placeholder="Enter your name"
                  />

                  {/* Email Field */}
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    placeholder="Enter your email"
                  />

                  {/* Message Field */}
                  <Textarea
                    label="Message"
                    required
                    value={formData.message}
                    onChange={(value) => handleInputChange('message', value)}
                    placeholder="Write your message here"
                    rows={4}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleSubmit}
                      className="w-auto"
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </div>

              {/* Contact Information - Below form on mobile/tablet, right side on desktop */}
              <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-4 desktop:col-start-desktop-8 mt-8xl desktop:mt-0 space-y-8">
                {/* Email Section */}
                <div className="space-y-2">
                  <h2 
                    className="text-base font-bold text-text-primary leading-[150%] tracking-[0.0005em] flex items-center gap-2"
                    style={{
                      fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                    }}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </h2>
                  <a
                    href="mailto:hq@aet.ski"
                    className="
                      text-base font-normal leading-[150%] tracking-[0.0005em]
                      text-text-primary
                      transition-colors duration-200 ease-in-out
                      hover:text-brand-primary
                      focus:text-brand-primary
                      outline-none
                    "
                    style={{
                      fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                    }}
                  >
                    hq@aet.ski
                  </a>
                </div>

                {/* Address Section */}
                <div className="space-y-2">
                  <h2 
                    className="text-base font-bold text-text-primary leading-[150%] tracking-[0.0005em] flex items-center gap-2"
                    style={{
                      fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                    }}
                  >
                    <MapPinned className="w-4 h-4" />
                    Address
                  </h2>
                  <p 
                    className="text-base font-normal text-text-primary leading-[150%] tracking-[0.0005em]"
                    style={{
                      fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                    }}
                  >
                    55 Rue Derrière le Château, 73600, Salins-Fontaine, France - Siret 921 741 328 00014.
                  </p>
                </div>
              </div>
            </Grid>
          </div>
        </Grid>
      </main>

      {/* Footer */}
      <Footer onQuoteClick={handleOpenForm} />

      {/* Multi-Step Form Modal */}
      <MultiStepForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
} 