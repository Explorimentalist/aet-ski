// src/components/PeopleStep.tsx
import React, { useMemo, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { NumberInput } from '@/components/NumberInput';
import { Button } from '@/components/Button';
import { FormStepProps } from '@/types';

export interface PeopleStepComponentProps extends FormStepProps {
  onClose: () => void;
}

export const PeopleStep: React.FC<PeopleStepComponentProps> = React.memo(({
  data,
  onUpdate,
  onNext,
  onPrevious,
  onClose,
  currentStep,
  totalSteps,
  validation,
}) => {
  const peopleData = useMemo(() => data.people || {
    adults: 1,
    children: 0,
  }, [data.people]);

  // Handle adults count change
  const handleAdultsChange = useCallback((value: number) => {
    onUpdate({
      people: {
        ...peopleData,
        adults: value,
      },
    });
  }, [peopleData, onUpdate]);

  // Handle children count change
  const handleChildrenChange = useCallback((value: number) => {
    onUpdate({
      people: {
        ...peopleData,
        children: value,
      },
    });
  }, [peopleData, onUpdate]);

  // Validate current step
  const isStepValid = useMemo(() => {
    return peopleData.adults >= 1 && peopleData.adults <= 20 && 
           peopleData.children >= 0 && peopleData.children <= 20;
  }, [peopleData]);

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
      aria-labelledby="people-step-title"
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
                id="people-step-title"
                className="text-2xl font-bold text-text-form"
              >
                People
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
            Step {currentStep} of {totalSteps}: People
          </div>

          {/* People Count Fields */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <NumberInput
              label="Adults"
              value={peopleData.adults}
              onChange={handleAdultsChange}
              min={1}
              max={20}
              required
              error={validation.errors.adults}
              helper="Ages 13 and above"
              className="w-full"
            />
            
            <NumberInput
              label="Children"
              value={peopleData.children}
              onChange={handleChildrenChange}
              min={0}
              max={20}
              error={validation.errors.children}
              helper="Ages 0-12"
              className="w-full"
            />
          </div>

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

PeopleStep.displayName = 'PeopleStep'; 