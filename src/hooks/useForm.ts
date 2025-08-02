// src/hooks/useForm.ts
import { useState, useCallback } from 'react';
import { BookingFormData } from '@/types';

const initialFormData: BookingFormData = {
  journey: {
    type: 'one-way',
    collectionPoint: '',
    destinationPoint: '',
  },
  dates: {
    collectionDate: null,
    collectionTime: '',
    isCollectionFlexible: false,
    isReturnFlexible: false,
  },
  people: {
    adults: 1,
    children: 0,
  },
  luggage: {
    skis: 0,
    snowboards: 0,
    suitcases: 0,
    prams: 0,
    extraItems: [],
  },
  passenger: {
    name: '',
    email: '',
    phone: '',
  },
};

export function useBookingForm() {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data
  const updateFormData = useCallback((section: keyof BookingFormData, data: Partial<BookingFormData[keyof BookingFormData]>) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
  }, []);

  // Navigate to next step
  const nextStep = useCallback(() => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Navigate to specific step
  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 7) {
      setCurrentStep(step);
    }
  }, []);

  // Submit form
  const submitForm = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to submit booking
      console.log('Submitting booking:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form after successful submission
      resetForm();
      return { success: true };
    } catch (error) {
      console.error('Error submitting booking:', error);
      return { success: false, error: 'Failed to submit booking' };
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, resetForm]);

  // Validate current step
  const validateCurrentStep = useCallback(() => {
    switch (currentStep) {
      case 1: // Journey
        return formData.journey.collectionPoint && formData.journey.destinationPoint;
      case 2: // Dates
        return formData.dates?.collectionDate && formData.dates?.collectionTime;
      case 3: // People
        return formData.people?.adults && formData.people.adults > 0;
      case 4: // Luggage
        return true; // Optional step
      case 5: // Passenger details
        return formData.passenger?.name && formData.passenger?.email && formData.passenger?.phone;
      case 6: // Summary
        return true; // Review step
      case 7: // Success
        return true; // Success step
      default:
        return false;
    }
  }, [currentStep, formData]);

  // Check if step is complete
  const isStepComplete = useCallback((step: number) => {
    switch (step) {
      case 1:
        return formData.journey.collectionPoint && formData.journey.destinationPoint;
      case 2:
        return formData.dates?.collectionDate && formData.dates?.collectionTime;
      case 3:
        return formData.people?.adults && formData.people.adults > 0;
      case 4:
        return true; // Optional step
      case 5:
        return formData.passenger?.name && formData.passenger?.email && formData.passenger?.phone;
      case 6:
        return true; // Review step
      case 7:
        return true; // Success step
      default:
        return false;
    }
  }, [formData]);

  return {
    formData,
    currentStep,
    isSubmitting,
    updateFormData,
    resetForm,
    nextStep,
    prevStep,
    goToStep,
    submitForm,
    validateCurrentStep,
    isStepComplete,
  };
} 