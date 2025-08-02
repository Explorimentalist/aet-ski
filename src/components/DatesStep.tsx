// src/components/DatesStep.tsx
import React, { useMemo, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Calendar } from '@/components/Calendar';
import { TimeSelector } from '@/components/TimeSelector';
import { Button } from '@/components/Button';
import { FormStepProps, DatesStepData } from '@/types';

export interface DatesStepComponentProps extends FormStepProps {
  onClose: () => void;
}

export const DatesStep: React.FC<DatesStepComponentProps> = React.memo(({
  data,
  onUpdate,
  onNext,
  onPrevious,
  onClose,
  currentStep,
  totalSteps,
  validation,
}) => {
  const datesData = useMemo(() => data.dates || {
    collectionDate: null,
    collectionTime: '',
    returnDate: null,
    returnTime: '',
    isCollectionFlexible: false,
    isReturnFlexible: false,
  }, [data.dates]);

  const journeyType = data.journey?.type || 'one-way';
  const isReturnJourney = journeyType === 'return';

  // Handle collection date change
  const handleCollectionDateChange = useCallback((date: Date | null) => {
    const updatedDates: DatesStepData = {
      ...datesData,
      collectionDate: date,
      isCollectionFlexible: date === null,
    };
    
    // Clear collection time if "I'm not sure" is selected
    if (date === null) {
      updatedDates.collectionTime = '';
    }

    onUpdate({
      dates: updatedDates,
    });
  }, [datesData, onUpdate]);

  // Handle collection time change
  const handleCollectionTimeChange = useCallback((time: string | null) => {
    onUpdate({
      dates: {
        ...datesData,
        collectionTime: time || '',
      },
    });
  }, [datesData, onUpdate]);

  // Handle return date change
  const handleReturnDateChange = useCallback((date: Date | null) => {
    const updatedDates: DatesStepData = {
      ...datesData,
      returnDate: date,
      isReturnFlexible: date === null,
    };
    
    // Clear return time if "I'm not sure" is selected
    if (date === null) {
      updatedDates.returnTime = '';
    }

    onUpdate({
      dates: updatedDates,
    });
  }, [datesData, onUpdate]);

  // Handle return time change
  const handleReturnTimeChange = useCallback((time: string | null) => {
    onUpdate({
      dates: {
        ...datesData,
        returnTime: time || '',
      },
    });
  }, [datesData, onUpdate]);

  // Validate current step
  const isStepValid = useMemo(() => {
    // Collection date and time are required (unless flexible)
    const collectionValid = datesData.collectionDate !== null || 
                           (datesData.isCollectionFlexible && datesData.collectionTime === '');
    
    // Return validation only for return journeys
    if (!isReturnJourney) {
      return collectionValid;
    }
    
    const returnValid = datesData.returnDate !== null || 
                       (datesData.isReturnFlexible && (datesData.returnTime === '' || datesData.returnTime === undefined));
    
    return collectionValid && returnValid;
  }, [datesData, isReturnJourney]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (isStepValid) {
      onNext();
    }
  }, [isStepValid, onNext]);

  // Handle previous step
  const handlePrevious = useCallback(() => {
    onPrevious();
  }, [onPrevious]);

  // Handle key navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && isStepValid) {
      event.preventDefault();
      handleNext();
    }
  }, [isStepValid, handleNext]);

  return (
    <div 
      className="w-full h-full relative"
      onKeyDown={handleKeyDown}
      role="form"
      aria-labelledby="dates-step-title"
    >
      {/* Close Button - Responsive sizing: 20px mobile, 28px tablet+, 40px desktop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5xl right-5xl w-5 h-5 tablet:w-7 tablet:h-7 desktop:w-10 desktop:h-10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors z-10"
        aria-label="Close modal"
      >
        <X className="w-4 h-4 tablet:w-5 tablet:h-5 desktop:w-5 desktop:h-5" />
      </button>

      {/* Responsive Grid Container - Moved down 120px (10xl = 118px) */}
      <div className="
        w-full h-full
        px-3xl tablet:px-7xl desktop:px-9xl
        grid grid-cols-4 tablet:grid-cols-8 desktop:grid-cols-12
        gap-xl tablet:gap-2xl desktop:gap-3xl
        pt-10xl py-6
      ">
        {/* Content Area - Middle 6/6/4 columns */}
        <div className="
          col-span-4 
          tablet:col-start-2 tablet:col-span-6 
          desktop:col-start-4 desktop:col-span-6
          space-y-6
        ">
          {/* Header */}
          <div className="flex items-baseline justify-between">
            <div className="flex-1">
                        <h2 
            id="dates-step-title"
            className="text-2xl font-bold text-text-form"
          >
            Dates
          </h2>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-text-secondary">
                {currentStep}/{totalSteps}
              </p>
            </div>
          </div>

          {/* ARIA Live Region for step changes */}
          <div 
            aria-live="polite" 
            aria-atomic="true" 
            className="sr-only"
          >
            Step {currentStep} of {totalSteps}: Dates
          </div>

          {/* Collection Date and Time */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <Calendar
              label="Collection date"
              placeholder="Select collection date"
              value={datesData.collectionDate}
              onChange={handleCollectionDateChange}
              required
              error={validation.errors.collectionDate}
              minDate={new Date()}
            />
            
            {!datesData.isCollectionFlexible && (
              <TimeSelector
                label="Collection time"
                placeholder="Select time"
                value={datesData.collectionTime}
                onChange={handleCollectionTimeChange}
                required
                error={validation.errors.collectionTime}
              />
            )}
          </div>

          {/* Return Date and Time - Only show for return journeys */}
          {isReturnJourney && (
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
              <Calendar
                label="Return date"
                placeholder="Select return date"
                value={datesData.returnDate}
                onChange={handleReturnDateChange}
                required
                error={validation.errors.returnDate}
                minDate={datesData.collectionDate || new Date()}
              />
              
              {!datesData.isReturnFlexible && (
                <TimeSelector
                  label="Return time"
                  placeholder="Select time"
                  value={datesData.returnTime || ''}
                  onChange={handleReturnTimeChange}
                  required
                  error={validation.errors.returnTime}
                />
              )}
            </div>
          )}

          {/* Navigation with Progress Dots and Buttons */}
          <div className="flex items-center justify-between pt-4">
            {/* Back Button */}
            <Button
              size="left-icon"
              variant="secondary"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>

            {/* Progress Dots - Centered in available space */}
            <div className="flex-1 flex justify-center">
              <div className="flex gap-2">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`
                      w-3 h-3 rounded-full transition-all duration-300 ease-in-out
                                      ${index <= currentStep - 1 
                  ? 'bg-text-form scale-110' 
                  : 'bg-border-secondary hover:bg-border-primary'
                }
                    `}
                    aria-label={`Step ${index + 1} of ${totalSteps}`}
                    disabled={index >= currentStep}
                  />
                ))}
              </div>
            </div>

            {/* Next Button */}
            <Button
              size="right-icon"
              onClick={handleNext}
              disabled={!isStepValid}
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

DatesStep.displayName = 'DatesStep';