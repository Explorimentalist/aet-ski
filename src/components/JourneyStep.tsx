// src/components/JourneyStep.tsx
import React, { useMemo, useCallback } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { FormStepProps } from '@/types';
import { locations } from '@/data/locations';

export interface JourneyStepComponentProps extends FormStepProps {
  onClose: () => void;
}

export const JourneyStep: React.FC<JourneyStepComponentProps> = React.memo(({
  data,
  onUpdate,
  onNext,
  onClose,
  currentStep,
  totalSteps,
  validation,
}) => {
  const journeyData = useMemo(() => data.journey || {
    type: 'one-way' as const,
    collectionPoint: '',
    destinationPoint: '',
  }, [data.journey]);

  // Memoize the categorized options for better performance
  const categorizedOptions = useMemo(() => locations, []);

  // Handle journey type change
  const handleJourneyTypeChange = useCallback((type: 'one-way' | 'return') => {
    onUpdate({
      journey: {
        ...journeyData,
        type,
      },
    });
  }, [journeyData, onUpdate]);

  // Handle collection point change
  const handleCollectionPointChange = useCallback((value: string) => {
    onUpdate({
      journey: {
        ...journeyData,
        collectionPoint: value,
      },
    });
  }, [journeyData, onUpdate]);

  // Handle destination point change
  const handleDestinationPointChange = useCallback((value: string) => {
    onUpdate({
      journey: {
        ...journeyData,
        destinationPoint: value,
      },
    });
  }, [journeyData, onUpdate]);

  // Validate current step
  const isStepValid = useMemo(() => {
    return journeyData.collectionPoint && journeyData.destinationPoint;
  }, [journeyData]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (isStepValid) {
      onNext();
    }
  }, [isStepValid, onNext]);

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
      aria-labelledby="journey-step-title"
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
            id="journey-step-title"
            className="text-2xl font-bold text-text-form"
          >
            Journey
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
        Step {currentStep} of {totalSteps}: Journey
      </div>

      {/* Journey Type Selection */}
      <div className="space-y-3">
        <label className="text-base font-medium text-text-form">
          Journey Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
                          <input
                type="radio"
                name="journeyType"
                value="one-way"
                checked={journeyData.type === 'one-way'}
                onChange={() => handleJourneyTypeChange('one-way')}
                className="w-4 h-4 border-border-secondary focus:ring-2 focus:ring-border-primary"
                style={{ 
                  accentColor: '#4F5B62',
                  color: '#4F5B62'
                }}
              />
            <span className="text-base text-text-form">One way</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="journeyType"
              value="return"
              checked={journeyData.type === 'return'}
              onChange={() => handleJourneyTypeChange('return')}
              className="w-4 h-4 border-border-secondary focus:ring-2 focus:ring-border-primary"
              style={{ 
                accentColor: '#4F5B62',
                color: '#4F5B62'
              }}
            />
            <span className="text-base text-text-form">Return</span>
          </label>
        </div>
      </div>

      {/* Collection Point */}
      <Select
        label="Collection point"
        placeholder="Select your collection point"
        categorizedOptions={categorizedOptions}
        value={journeyData.collectionPoint}
        onChange={handleCollectionPointChange}
        required
        error={validation.errors.collectionPoint}
        className="w-full"
      />

      {/* Destination Point */}
      <Select
        label="Destination"
        placeholder="Select your destination"
        categorizedOptions={categorizedOptions}
        value={journeyData.destinationPoint}
        onChange={handleDestinationPointChange}
        required
        error={validation.errors.destinationPoint}
        className="w-full"
      />

      {/* Navigation with Progress Dots and Button */}
      <div className="flex items-center justify-between pt-4">
        {/* Progress Dots - Centered in available space */}
        <div className="flex-1 flex justify-center">
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`
                  w-3 h-3 rounded-full transition-all duration-300 ease-in-out
                                  ${index === currentStep - 1 
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

        {/* Navigation Button - Right aligned */}
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

JourneyStep.displayName = 'JourneyStep';