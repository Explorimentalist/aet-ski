'use client';

// src/app/contact/ContactPageClient.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LazyMultiStepForm as MultiStepForm } from '@/components/LazyMultiStepForm';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { Grid } from '@/components/Grid';
import { BookingFormData } from '@/types';
import { Mail, MapPinned } from 'lucide-react';
import { PageWrapper } from '@/motion/PageWrapper';

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  message: boolean;
}

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();

  // Check for URL parameters - no longer pre-populating message
  useEffect(() => {
    const interest = searchParams.get('interest');
    // No longer pre-filling the message, just letting placeholder show
  }, [searchParams]);

  // Determine placeholder text based on context
  const getMessagePlaceholder = () => {
    const interest = searchParams.get('interest');
    if (interest === 'ski-storage') {
      return "Let us know what items you are considering to store.\nFor e.g. Skis x 3, Snowboard x 1, boots x 4, suitcase x 1 etc.";
    }
    return "Write your message here";
  };

  // Validation helper functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (name.trim().length > 100) {
      return 'Name must be less than 100 characters';
    }
    if (!/^[a-zA-Z\s\-']+$/.test(name.trim())) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (email.length > 254) {
      return 'Email is too long';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) {
      return 'Message is required';
    }
    if (message.trim().length < 10) {
      return 'Message must be at least 10 characters';
    }
    if (message.trim().length > 1000) {
      return 'Message must be less than 1000 characters';
    }
    return undefined;
  };

  // Validate single field
  const validateField = (fieldName: string, value: string): string | undefined => {
    switch (fieldName) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'message':
        return validateMessage(value);
      default:
        return undefined;
    }
  };

  // Validate entire form
  const validateForm = (): ValidationErrors => {
    return {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message),
    };
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    const errors = validateForm();
    return !errors.name && !errors.email && !errors.message;
  };

  const handleInputChange = (field: string, value: string) => {
    // Update form data
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleInputBlur = (field: string) => {
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate field on blur
    const error = validateField(field, formData[field as keyof typeof formData]);
    if (error) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  const handleSubmit = async () => {
    console.log('Starting contact form submission...');
    console.log('Form data:', formData);

    // Mark all fields as touched
    setTouchedFields({
      name: true,
      email: true,
      message: true,
    });

    // Validate entire form
    const errors = validateForm();
    setValidationErrors(errors);

    // Check if form has any errors
    if (errors.name || errors.email || errors.message) {
      console.log('Form validation failed:', errors);
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    // Set submitting state
    setIsSubmitting(true);

    try {
      // Send contact form data to API
      console.log('Making fetch request to /api/contact...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (response.ok) {
        console.log('Response is OK, parsing JSON...');
        const result = await response.json();
        console.log('Contact form submitted successfully:', result);
        
        if (result.success) {
          alert('Thank you! Your message has been sent successfully.');
          // Reset form
          setFormData({
            name: '',
            email: '',
            message: '',
          });
          // Reset validation states
          setValidationErrors({});
          setTouchedFields({
            name: false,
            email: false,
            message: false,
          });
        } else {
          console.error('API returned success=false:', result);
          alert(result.message || 'Failed to send message. Please try again.');
        }
      } else {
        console.log('Response not OK, parsing error...');
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error('Failed to parse error response as JSON:', parseError);
          errorData = { error: 'Unknown error' };
        }
        console.error('Contact form submission failed:', errorData);
        alert(errorData.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form (full error object):', error);
      console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      alert('Network error. Please check your connection and try again.');
    } finally {
      // Always reset submitting state
      setIsSubmitting(false);
    }
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
                fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
              }}
            >
              Contact us for any questions you may have
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
                    onBlur={() => handleInputBlur('name')}
                    error={touchedFields.name ? validationErrors.name : undefined}
                    placeholder="Enter your name"
                  />

                  {/* Email Field */}
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    onBlur={() => handleInputBlur('email')}
                    error={touchedFields.email ? validationErrors.email : undefined}
                    placeholder="Enter your email"
                  />

                  {/* Message Field */}
                  <Textarea
                    label="Message"
                    required
                    value={formData.message}
                    onChange={(value) => handleInputChange('message', value)}
                    onBlur={() => handleInputBlur('message')}
                    error={touchedFields.message ? validationErrors.message : undefined}
                    placeholder={getMessagePlaceholder()}
                    rows={4}
                    maxLength={1000}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !isFormValid()}
                      loading={isSubmitting}
                      className="w-auto"
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
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
      </PageWrapper>

      {/* Footer */}
      <Footer onQuoteClick={handleOpenForm} />

      {/* Multi-Step Form Modal */}
      <MultiStepForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}



