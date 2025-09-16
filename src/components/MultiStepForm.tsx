// src/components/MultiStepForm.tsx
// Enhanced multi-step form with sophisticated step transition animations
// Features slide transitions, stagger effects, and progress indicators

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { motionTokens, useMotionSafeSimple } from '@/motion';
import { Modal } from '@/components/Modal';
import { FormNavigation } from '@/components/FormNavigation';
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
  const [isFirstFormOpen, setIsFirstFormOpen] = useState(true);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const [isNavigationFirstRender, setIsNavigationFirstRender] = useState(true);
  const [stepValidationStates, setStepValidationStates] = useState<Record<number, boolean>>({});
  const [showReturnDateMismatchWarning, setShowReturnDateMismatchWarning] = useState(false);
  const continueButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const totalSteps = 6;

  // Track first form open for navigation animation
  useEffect(() => {
    if (isOpen && isFirstFormOpen) {
      // Mark that we've opened the form for the first time
      setIsFirstFormOpen(false);
    }
  }, [isOpen, isFirstFormOpen]);

  // Control navigation visibility based on modal state
  useEffect(() => {
    if (isOpen) {
      // Show navigation when modal opens
      setIsNavigationVisible(true);
      
      // Allow navigation entrance animation on first render
      if (isNavigationFirstRender) {
        // Delay marking as not first render to allow entrance animation
        setTimeout(() => {
          setIsNavigationFirstRender(false);
        }, motionTokens.delay.medium * 1000 + motionTokens.d.short * 1000); // Wait for entrance animation to complete
      }
    } else {
      // Hide navigation when modal closes
      setIsNavigationVisible(false);
    }
  }, [isOpen, isNavigationFirstRender]);

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

  // Handle validation state changes from step components
  const handleStepValidationChange = useCallback((step: number, isValid: boolean) => {
    setStepValidationStates(prev => ({
      ...prev,
      [step]: isValid
    }));
  }, []);

  // Handle form submission (will be used in final step)
  const handleSubmit = useCallback(async () => {
    console.log('handleSubmit called, validation.isValid:', validation.isValid);
    console.log('formData:', formData);
    
    if (validation.isValid) {
      try {
        // Send booking data to API
        const response = await fetch('/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Booking submitted successfully:', result);
          
          if (result.emailSent) {
            console.log('📧 Emails sent successfully');
          } else {
            console.warn('⚠️ Emails not sent - check server logs');
          }
          
          // Call onSubmit with the result
          onSubmit(formData as BookingFormData);
          setShowSuccess(true);
        } else {
          const error = await response.json();
          console.error('❌ Booking submission failed:', error);
          
          // Show more specific error message
          const errorMessage = error.message || 'Failed to submit booking. Please try again.';
          alert(`Booking Error: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error submitting booking:', error);
        alert('Network error. Please check your connection and try again.');
      }
    }
  }, [validation.isValid, formData, onSubmit]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (currentStep < totalSteps && validation.isValid) {
      // Step-specific pre-next checks
      if (currentStep === 2) {
        const journeyType = formData.journey?.type || 'one-way';
        const dates = formData.dates;
        if (
          journeyType === 'return' &&
          dates?.collectionDate instanceof Date &&
          dates?.returnDate instanceof Date &&
          !dates.isCollectionFlexible &&
          !dates.isReturnFlexible
        ) {
          const start = new Date(
            dates.collectionDate.getFullYear(),
            dates.collectionDate.getMonth(),
            dates.collectionDate.getDate()
          );
          const end = new Date(
            dates.returnDate.getFullYear(),
            dates.returnDate.getMonth(),
            dates.returnDate.getDate()
          );
          const msPerDay = 1000 * 60 * 60 * 24;
          const diffDays = Math.round((end.getTime() - start.getTime()) / msPerDay);
          if (diffDays !== 7) {
            setShowReturnDateMismatchWarning(true);
            return;
          }
        }
      }

      if (currentStep === totalSteps) {
        // This is the final step, submit the form
        handleSubmit();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  }, [currentStep, totalSteps, validation.isValid, handleSubmit, formData]);

  // Focus the primary action when the warning opens
  useEffect(() => {
    if (showReturnDateMismatchWarning && continueButtonRef.current) {
      continueButtonRef.current.focus();
    }
  }, [showReturnDateMismatchWarning]);

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
    // First, hide navigation to start its exit animation
    setIsNavigationVisible(false);
    
    // Wait for navigation exit animation to complete, then close modal
    setTimeout(() => {
      // Reset form state when closing
      setCurrentStep(1);
      setFormData({});
      setValidation({ isValid: false, errors: {}, touched: {} });
      setShowSuccess(false);
      setIsFirstFormOpen(true); // Reset for next time form opens
      setIsNavigationFirstRender(true); // Reset navigation first render state
      onClose();
    }, motionTokens.d.short * 1000); // Convert to milliseconds
  }, [onClose]);

  // Handle go home (from success page)
  const handleGoHome = useCallback(() => {
    // First, hide navigation to start its exit animation
    setIsNavigationVisible(false);
    
    // Wait for navigation exit animation to complete, then close modal
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentStep(1);
      setFormData({});
      setValidation({ isValid: false, errors: {}, touched: {} });
      setIsFirstFormOpen(true); // Reset for next time form opens
      setIsNavigationFirstRender(true); // Reset navigation first render state
      onClose();
    }, motionTokens.d.short * 1000); // Convert to milliseconds
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
      onValidationChange: (isValid: boolean) => handleStepValidationChange(currentStep, isValid),
      isModalOpen: isOpen,
      isFirstRender: isFirstFormOpen,
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
  }, [currentStep, formData, handleFormUpdate, handleNext, handlePrevious, validation, handleClose, handleEditStep, markFieldAsTouched, showSuccess, handleGoHome, handleSubmit, handleStepValidationChange, isFirstFormOpen, isOpen]);

  const shouldAnimate = useMotionSafeSimple();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      coordinateWithFixedBottom={true}
    >
      <FormErrorBoundary>
        <div className="relative min-h-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={showSuccess ? 'success' : `step-${currentStep}`}
              initial={shouldAnimate ? "enter" : false}
              animate={shouldAnimate ? "center" : undefined}
              exit={shouldAnimate ? "exit" : undefined}
              variants={motionTokens.components.multiStep.step}
              transition={{
                type: "tween",
                duration: motionTokens.d.short,
                ease: motionTokens.e.brand
              }}
              className="w-full"
            >
              {/* Step Content with Stagger Animation */}
              <motion.div
                initial={shouldAnimate ? "hidden" : false}
                animate={shouldAnimate ? "visible" : undefined}
                variants={motionTokens.components.multiStep.content}
              >
                <motion.div
                  variants={motionTokens.patterns.entrance}
                  transition={{
                    duration: motionTokens.d.short,
                    ease: motionTokens.e.brand
                  }}
                >
                  {currentStepComponent}
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Form Navigation - Controlled by separate visibility state */}
          {!showSuccess && (
            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={currentStep === totalSteps ? handleSubmit : handleNext}
              onPrevious={handlePrevious}
              isNextDisabled={!stepValidationStates[currentStep]}
              isPreviousDisabled={currentStep === 1}
              showProgressDots={currentStep < totalSteps}
              isVisible={isNavigationVisible}
              isFirstRender={isNavigationFirstRender}
              nextButtonText={currentStep === totalSteps ? 'Get your quote' : 'Next'}
            />
          )}

          {/* Warning overlay for non 7-day return trips */}
          {showReturnDateMismatchWarning && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="return-warning-title"
            >
              <div className="bg-background-secondary text-text-primary rounded-md shadow-lg w-[92%] tablet:w-[560px] max-w-[90vw]">
                <div className="px-4xl py-3xl border-b border-border-secondary">
                  <h3 id="return-warning-title" className="text-lg font-bold">
                    Please confirm your trip length
                  </h3>
                </div>
                <div className="px-4xl py-3xl space-y-md">
                  <p className="text-text-secondary">
                    Your return is scheduled for{' '}
                    <span className="font-medium text-text-primary">
                      {formData.dates?.returnDate instanceof Date
                        ? formData.dates.returnDate.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
                        : ''}
                    </span>
                    , which is not exactly 7 days after your collection date{' '}
                    <span className="font-medium text-text-primary">
                      {formData.dates?.collectionDate instanceof Date
                        ? formData.dates.collectionDate.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
                        : ''}
                    </span>
                    .
                  </p>
                  <p className="text-text-secondary">
                    Most ski trips are 7 days. If this is correct, continue; otherwise go back to adjust your dates.
                  </p>
                </div>
                <div className="px-4xl py-3xl border-t border-border-secondary flex items-center justify-end gap-md">
                  <button
                    type="button"
                    className="px-4 py-2 bg-background-secondary text-text-primary rounded-lg hover:bg-background-hover transition-colors"
                    onClick={() => setShowReturnDateMismatchWarning(false)}
                  >
                    Go back
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-text-primary text-white rounded-lg hover:bg-text-primary/90 transition-colors"
                    onClick={() => {
                      setShowReturnDateMismatchWarning(false);
                      setCurrentStep(prev => prev + 1);
                    }}
                    ref={continueButtonRef}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </FormErrorBoundary>
    </Modal>
  );
});

MultiStepForm.displayName = 'MultiStepForm';
