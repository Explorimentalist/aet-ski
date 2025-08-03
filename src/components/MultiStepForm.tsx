// src/components/MultiStepForm.tsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import { JourneyStep } from '@/components/JourneyStep';
import { DatesStep } from '@/components/DatesStep';
import { PeopleStep } from '@/components/PeopleStep';
import { LuggageStep } from '@/components/LuggageStep';
import { PassengerStep } from '@/components/PassengerStep';
import { SummaryStep } from '@/components/SummaryStep';
import { SuccessStep } from '@/components/SuccessStep';
import { MultiStepFormProps, BookingFormData, FormValidation } from '@/types';

// Error Boundary Component
class FormErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Form Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-text-error mb-2">
            Something went wrong
          </h3>
          <p className="text-text-secondary mb-4">
            Please refresh the page and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-text-primary text-white rounded-lg hover:bg-text-primary/90"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const MultiStepForm: React.FC<MultiStepFormProps> = React.memo(({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BookingFormData>>({});
  const [validation, setValidation] = useState<FormValidation>({
    isValid: false,
    errors: {},
    touched: {},
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 6;

  // Memoize step validation
  const validateCurrentStep = useCallback((data: Partial<BookingFormData>, touched: Record<string, boolean> = {}): FormValidation => {
    const errors: Record<string, string> = {};

    switch (currentStep) {
      case 1: // Journey step
        if (touched.collectionPoint && !data.journey?.collectionPoint) {
          errors.collectionPoint = 'Collection point is required';
        }
        if (touched.destinationPoint && !data.journey?.destinationPoint) {
          errors.destinationPoint = 'Destination is required';
        }
        if (touched.destinationPoint && data.journey?.collectionPoint === data.journey?.destinationPoint) {
          errors.destinationPoint = 'Destination must be different from collection point';
        }
        break;
      case 2: // Dates step
        if (touched.collectionDate && !data.dates?.collectionDate && !data.dates?.isCollectionFlexible) {
          errors.collectionDate = 'Collection date is required';
        }
        if (touched.collectionTime && !data.dates?.collectionTime && data.dates?.collectionDate && !data.dates?.isCollectionFlexible) {
          errors.collectionTime = 'Collection time is required';
        }
        // Return date validation only for return journeys
        if (data.journey?.type === 'return') {
          if (touched.returnDate && !data.dates?.returnDate && !data.dates?.isReturnFlexible) {
            errors.returnDate = 'Return date is required';
          }
          if (touched.returnTime && !data.dates?.returnTime && data.dates?.returnDate && !data.dates?.isReturnFlexible) {
            errors.returnTime = 'Return time is required';
          }
        }
        break;
      case 3: // People step
        if (touched.adults && (!data.people?.adults || data.people.adults < 1)) {
          errors.adults = 'At least one adult is required';
        }
        if (touched.adults && data.people?.adults && data.people.adults > 20) {
          errors.adults = 'Maximum 20 adults allowed';
        }
        if (touched.children && data.people?.children && data.people.children > 20) {
          errors.children = 'Maximum 20 children allowed';
        }
        break;
      case 4: // Luggage step
        // All luggage fields are optional, so no validation errors
        break;
      case 5: // Passenger step
        if (touched.name && !data.passenger?.name?.trim()) {
          errors.name = 'Name is required';
        }
        if (touched.email && !data.passenger?.email?.trim()) {
          errors.email = 'Email is required';
        } else if (touched.email && data.passenger?.email && !data.passenger.email.includes('@')) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      // Add validation for other steps as they're implemented
      default:
        break;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      touched,
    };
  }, [currentStep]);

  // Validate current step when step changes
  useEffect(() => {
    const newValidation = validateCurrentStep(formData, validation.touched);
    setValidation(newValidation);
  }, [currentStep, formData, validateCurrentStep, validation.touched]);

  // Handle form data updates
  const handleFormUpdate = useCallback((newData: Partial<BookingFormData>) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    
    // Validate on data change
    const newValidation = validateCurrentStep(updatedData, validation.touched);
    setValidation(newValidation);
  }, [formData, validateCurrentStep, validation.touched]);

  // Mark field as touched
  const markFieldAsTouched = useCallback((fieldName: string) => {
    const newTouched = { ...validation.touched, [fieldName]: true };
    const newValidation = validateCurrentStep(formData, newTouched);
    setValidation(newValidation);
  }, [validation.touched, validateCurrentStep, formData]);

  // Handle form submission (will be used in final step)
  const handleSubmit = useCallback(() => {
    console.log('handleSubmit called, validation.isValid:', validation.isValid);
    console.log('formData:', formData);
    
    // TEMPORARY: For testing purposes, always show success page
    // TODO: Remove this bypass when email service is set up
    onSubmit(formData as BookingFormData);
    console.log('Setting showSuccess to true');
    setShowSuccess(true);
    
    // ORIGINAL CODE (commented out for testing):
    // if (validation.isValid) {
    //   onSubmit(formData as BookingFormData);
    //   setShowSuccess(true);
    // }
  }, [validation.isValid, formData, onSubmit]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (currentStep < totalSteps && validation.isValid) {
      if (currentStep === totalSteps) {
        // This is the final step, submit the form
        handleSubmit();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  }, [currentStep, totalSteps, validation.isValid, handleSubmit]);

  // Handle edit step (for summary page)
  const handleEditStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  // Handle previous step
  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Handle modal close
  const handleClose = useCallback(() => {
    // Reset form state when closing
    setCurrentStep(1);
    setFormData({});
    setValidation({ isValid: false, errors: {}, touched: {} });
    setShowSuccess(false);
    onClose();
  }, [onClose]);

  // Handle go home (from success page)
  const handleGoHome = useCallback(() => {
    setShowSuccess(false);
    setCurrentStep(1);
    setFormData({});
    setValidation({ isValid: false, errors: {}, touched: {} });
    onClose();
  }, [onClose]);

  // Memoize the current step component
  const currentStepComponent = useMemo(() => {
    console.log('currentStepComponent: showSuccess =', showSuccess);
    
    // Show success page if submission was successful
    if (showSuccess) {
      console.log('Rendering SuccessStep component');
      return (
        <SuccessStep
          onClose={handleClose}
          onGoHome={handleGoHome}
        />
      );
    }

    const stepProps = {
      data: formData,
      onUpdate: handleFormUpdate,
      onNext: handleNext,
      onPrevious: handlePrevious,
      currentStep,
      totalSteps,
      validation,
      onEditStep: handleEditStep,
      markFieldAsTouched,
    };

    switch (currentStep) {
      case 1:
        return (
          <JourneyStep
            {...stepProps}
            onClose={handleClose}
          />
        );
      case 2:
        return (
          <DatesStep
            {...stepProps}
            onClose={handleClose}
          />
        );
      case 3:
        return (
          <PeopleStep
            {...stepProps}
            onClose={handleClose}
          />
        );
      case 4:
        return (
          <LuggageStep
            {...stepProps}
            onClose={handleClose}
          />
        );
      case 5:
        return (
          <PassengerStep
            {...stepProps}
            onClose={handleClose}
          />
        );
      case 6:
        return (
          <SummaryStep
            {...stepProps}
            onClose={handleClose}
            onSubmit={handleSubmit}
          />
        );
      // Add other steps as they're implemented
      default:
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold text-text-form mb-2">
              Step {currentStep}
            </h3>
            <p className="text-text-secondary">
              This step is coming soon...
            </p>
          </div>
        );
    }
  }, [currentStep, formData, handleFormUpdate, handleNext, handlePrevious, validation, handleClose, handleEditStep, markFieldAsTouched, showSuccess, handleGoHome, handleSubmit]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
    >
      <FormErrorBoundary>
        {currentStepComponent}
      </FormErrorBoundary>
    </Modal>
  );
});

MultiStepForm.displayName = 'MultiStepForm';