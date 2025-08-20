// src/components/DatesStep.tsx
import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Calendar } from '@/components/Calendar';
import { TimeSelector } from '@/components/TimeSelector';
import { FormNavigation } from '@/components/FormNavigation';
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
  const [showReturnSoonWarning, setShowReturnSoonWarning] = useState(false);
  const continueButtonRef = useRef<HTMLButtonElement | null>(null);

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
    if (!isStepValid) return;

    // Intercept when return journey is same-day or within 7 days of collection date
    if (
      isReturnJourney &&
      datesData.collectionDate instanceof Date &&
      datesData.returnDate instanceof Date &&
      !datesData.isCollectionFlexible &&
      !datesData.isReturnFlexible
    ) {
      const start = new Date(
        datesData.collectionDate.getFullYear(),
        datesData.collectionDate.getMonth(),
        datesData.collectionDate.getDate()
      );
      const end = new Date(
        datesData.returnDate.getFullYear(),
        datesData.returnDate.getMonth(),
        datesData.returnDate.getDate()
      );
      const msPerDay = 1000 * 60 * 60 * 24;
      const diffDays = Math.round((end.getTime() - start.getTime()) / msPerDay);
      if (diffDays >= 0 && diffDays <= 7) {
        setShowReturnSoonWarning(true);
        return;
      }
    }

    onNext();
  }, [isStepValid, onNext, isReturnJourney, datesData]);

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

  // Focus the primary action when the warning opens
  useEffect(() => {
    if (showReturnSoonWarning && continueButtonRef.current) {
      continueButtonRef.current.focus();
    }
  }, [showReturnSoonWarning]);

  const formattedCollection = useMemo(() => {
    if (!(datesData.collectionDate instanceof Date)) return '';
    return datesData.collectionDate.toLocaleDateString(undefined, {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });
  }, [datesData.collectionDate]);

  const formattedReturn = useMemo(() => {
    if (!(datesData.returnDate instanceof Date)) return '';
    return datesData.returnDate.toLocaleDateString(undefined, {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });
  }, [datesData.returnDate]);

  return (
    <div 
      className="w-full h-full relative min-h-[500px] pb-32"
      onKeyDown={handleKeyDown}
      role="form"
      aria-labelledby="dates-step-title"
    >
      {/* Close Button - Responsive sizing: 20px mobile, 28px tablet+, 40px desktop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5xl right-5xl w-5 h-5 tablet:w-7 tablet:h-7 desktop:w-10 desktop:h-10 flex items-center justify-center text-text-secondary hover:text-text-brand transition-colors z-10"
        aria-label="Close modal"
      >
        <X className="w-4 h-4 tablet:w-5 tablet:h-5 desktop:w-5 desktop:h-5" />
      </button>

      {/* Content Container with proper spacing for sticky footer */}
      <div className="
        w-full h-full
        px-3xl tablet:px-7xl desktop:px-9xl
        pt-10xl pb-6
      ">
        {/* Content Area - spans same columns as navigation */}
        <div className="
          grid grid-cols-4 tablet:grid-cols-8 desktop:grid-cols-12
          gap-xl tablet:gap-2xl desktop:gap-3xl
        ">
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

          {/* Content continues... */}
        </div>
        </div>
      </div>

      {/* Sticky Footer Navigation */}
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onPrevious={onPrevious}
        isNextDisabled={!isStepValid}
        isPreviousDisabled={false}
        showProgressDots={true}
      />

      {showReturnSoonWarning && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="return-warning-title"
        >
          <div className="bg-background-secondary text-text-primary rounded-md shadow-lg w-[92%] tablet:w-[560px] max-w-[90vw]">
            {/* Header */}
            <div className="px-4xl py-3xl border-b border-border-secondary">
              <h3 id="return-warning-title" className="text-lg font-bold">
                Please confirm your return dates
              </h3>
            </div>
            {/* Body */}
            <div className="px-4xl py-3xl space-y-md">
              <p className="text-text-secondary">
                Your return is scheduled for <span className="font-medium text-text-primary">{formattedReturn}</span>,
                which is within 7 days of your collection date <span className="font-medium text-text-primary">{formattedCollection}</span>.
              </p>
              <p className="text-text-secondary">
                If this is correct, continue. Otherwise, go back to adjust your dates.
              </p>
            </div>
            {/* Footer */}
            <div className="px-4xl py-3xl border-t border-border-secondary flex items-center justify-end gap-md">
              <button
                type="button"
                className="px-4 py-2 bg-background-secondary text-text-primary rounded-lg hover:bg-background-hover transition-colors"
                onClick={() => setShowReturnSoonWarning(false)}
              >
                Go back
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-text-primary text-white rounded-lg hover:bg-text-primary/90 transition-colors"
                onClick={() => {
                  setShowReturnSoonWarning(false);
                  onNext();
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
  );
});

DatesStep.displayName = 'DatesStep';