// src/components/DatesStep.tsx
import React, { useMemo, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { LazyCalendar as Calendar } from '@/components/LazyCalendar';
import { TimeSelector } from '@/components/TimeSelector';
import { Logo } from '@/components/Logo';

import { FormStepProps, DatesStepData } from '@/types';

export interface DatesStepComponentProps extends FormStepProps {
  onClose: () => void;
}

export const DatesStep: React.FC<DatesStepComponentProps> = React.memo(({
  data,
  onUpdate,
  onNext,
  onClose,
  currentStep,
  totalSteps,
  validation,
  onValidationChange,
}) => {
  // Local warning removed; handled at parent level

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

  // Report validation state to parent
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isStepValid);
    }
  }, [isStepValid, onValidationChange]);

  // Handle next step
  // Handle key navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && isStepValid) {
      event.preventDefault();
      onNext();
    }
  }, [isStepValid, onNext]);

  // No local warning to manage here

  // No formatted dates needed here anymore (handled by parent warning)

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
        className="absolute top-3xl right-3xl tablet:top-7xl tablet:right-7xl desktop:right-9xl w-5 h-5 tablet:w-7 tablet:h-7 desktop:w-10 desktop:h-10 flex items-center justify-center text-text-secondary hover:text-text-brand transition-colors z-10"
        aria-label="Close modal"
      >
        <X className="w-4 h-4 tablet:w-5 tablet:h-5 desktop:w-5 desktop:h-5" />
      </button>

      {/* Content Container with proper spacing for sticky footer */}
      <div className="
        w-full h-full
        px-3xl tablet:px-7xl desktop:px-9xl
        pt-8xl desktop:pt-8-5xl pb-6
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

          {/* Saturday travel advice banner */}
          <div className="bg-background-secondary p-4 rounded-sm border border-border-secondary">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <Logo className="w-12 h-12 tablet:w-14 tablet:h-14" />
                <span className="text-sm font-semibold text-text-primary">Advice:</span>
              </div>
              <p className="text-sm text-text-primary">
                Saturdays are the busiest days to travel on. We recommend avoiding them if you can.
              </p>
            </div>
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
                label="Flight arrival time"
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
                  label="Flight departure time"
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

    </div>
  );
});

DatesStep.displayName = 'DatesStep';
