// src/components/JourneyStep.tsx
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Select } from '@/components/Select';

import { FormStepProps } from '@/types';
import { locations } from '@/data/locations';
import { filterDestinationOptions, validateDifferentLocations } from '@/utils/locationFilters';

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
  onValidationChange,
}) => {
  const journeyData = useMemo(() => data.journey || {
    type: 'one-way' as const,
    collectionPoint: '',
    destinationPoint: '',
  }, [data.journey]);

  // Track user interactions to determine when to show errors
  const [hasInteracted, setHasInteracted] = useState({
    collectionPoint: false,
    destinationPoint: false,
  });
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Memoize the categorized options for better performance
  const categorizedOptions = useMemo(() => locations, []);

  // Filter destination options to exclude the selected collection point
  const filteredDestinationOptions = useMemo(() => 
    filterDestinationOptions(categorizedOptions, journeyData.collectionPoint),
    [categorizedOptions, journeyData.collectionPoint]
  );

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
    setHasInteracted(prev => ({ ...prev, collectionPoint: true }));
    onUpdate({
      journey: {
        ...journeyData,
        collectionPoint: value,
      },
    });
  }, [journeyData, onUpdate]);

  // Handle destination point change
  const handleDestinationPointChange = useCallback((value: string) => {
    setHasInteracted(prev => ({ ...prev, destinationPoint: true }));
    onUpdate({
      journey: {
        ...journeyData,
        destinationPoint: value,
      },
    });
  }, [journeyData, onUpdate]);

  // Enhanced validation with location difference check
  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    
    // Only show errors if user has interacted or attempted submit
    const shouldShowErrors = hasAttemptedSubmit || 
      hasInteracted.collectionPoint || 
      hasInteracted.destinationPoint;
    
    if (!shouldShowErrors) {
      return errors;
    }
    
    if (!journeyData.collectionPoint) {
      errors.collectionPoint = 'Please select a collection point';
    }
    
    if (!journeyData.destinationPoint) {
      errors.destinationPoint = 'Please select a destination';
    }
    
    // Check if locations are different - only show this error if both fields have values
    if (journeyData.collectionPoint && journeyData.destinationPoint) {
      const locationValidation = validateDifferentLocations(
        journeyData.collectionPoint, 
        journeyData.destinationPoint
      );
      
      if (!locationValidation.isValid && locationValidation.error) {
        errors.destinationPoint = locationValidation.error;
      }
    }
    
    return errors;
  }, [journeyData, hasInteracted, hasAttemptedSubmit]);

  // Validate current step
  const isStepValid = useMemo(() => {
    return Boolean(journeyData.collectionPoint && 
                   journeyData.destinationPoint && 
                   journeyData.collectionPoint !== journeyData.destinationPoint);
  }, [journeyData]);

  // Report validation state to parent
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isStepValid);
    }
  }, [isStepValid, onValidationChange]);

  // Handle next step
  const handleNext = useCallback(() => {
    if (isStepValid) {
      onNext();
    } else {
      // Mark that user has attempted to submit, so show all relevant errors
      setHasAttemptedSubmit(true);
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
      className="w-full h-full relative min-h-[500px] pb-32"
      onKeyDown={handleKeyDown}
      role="form"
      aria-labelledby="journey-step-title"
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
            error={validationErrors.collectionPoint}
            className="w-full"
          />

          {/* Destination Point - with filtered options */}
          <div className="space-y-2">
            <Select
              label="Destination"
              placeholder="Select your destination"
              categorizedOptions={filteredDestinationOptions}
              value={journeyData.destinationPoint}
              onChange={handleDestinationPointChange}
              required
              error={validationErrors.destinationPoint}
              className="w-full"
            />
            {journeyData.collectionPoint && !validationErrors.destinationPoint && (
              <p className="text-sm text-text-secondary">
                Choose a different location from your collection point
              </p>
            )}
          </div>
        </div>
        </div>
      </div>


    </div>
  );
});

JourneyStep.displayName = 'JourneyStep';
