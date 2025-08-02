// src/components/LuggageStep.tsx
import React, { useMemo, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft, Briefcase } from 'lucide-react';
import { NumberInput } from '@/components/NumberInput';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { FormStepProps } from '@/types';

export interface LuggageStepComponentProps extends FormStepProps {
  onClose: () => void;
}

export const LuggageStep: React.FC<LuggageStepComponentProps> = React.memo(({
  data,
  onUpdate,
  onNext,
  onPrevious,
  onClose,
  currentStep,
  totalSteps,
  validation,
}) => {
  const luggageData = useMemo(() => data.luggage || {
    skis: 0,
    snowboards: 0,
    suitcases: 0,
    prams: 0,
    extraItems: [],
  }, [data.luggage]);

  const peopleData = useMemo(() => data.people || {
    adults: 1,
    children: 0,
  }, [data.people]);

  // Calculate assumed luggage based on people count
  const assumedLuggage = useMemo(() => {
    const totalPeople = peopleData.adults + peopleData.children;
    return {
      suitcases: totalPeople,
      handLuggage: totalPeople,
    };
  }, [peopleData]);

  // Handle extra suitcases change
  const handleExtraSuitcasesChange = useCallback((value: number) => {
    onUpdate({
      luggage: {
        ...luggageData,
        suitcases: value,
      },
    });
  }, [luggageData, onUpdate]);

  // Handle skis change
  const handleSkisChange = useCallback((value: number) => {
    onUpdate({
      luggage: {
        ...luggageData,
        skis: value,
      },
    });
  }, [luggageData, onUpdate]);

  // Handle snowboards change
  const handleSnowboardsChange = useCallback((value: number) => {
    onUpdate({
      luggage: {
        ...luggageData,
        snowboards: value,
      },
    });
  }, [luggageData, onUpdate]);

  // Handle prams change
  const handlePramsChange = useCallback((value: number) => {
    onUpdate({
      luggage: {
        ...luggageData,
        prams: value,
      },
    });
  }, [luggageData, onUpdate]);

  // Handle other equipment change
  const handleOtherEquipmentChange = useCallback((value: string) => {
    onUpdate({
      luggage: {
        ...luggageData,
        extraItems: value ? [value] : [],
      },
    });
  }, [luggageData, onUpdate]);

  // Validate current step (always valid as all fields are optional)
  const isStepValid = useMemo(() => {
    return true; // All luggage fields are optional
  }, []);

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
      aria-labelledby="luggage-step-title"
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
                id="luggage-step-title"
                className="text-2xl font-bold text-text-form"
              >
                Extra Luggage or Special Equipment
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
            Step {currentStep} of {totalSteps}: Extra Luggage or Special Equipment
          </div>

          {/* Assumed Luggage Note */}
          <div className="bg-background-secondary p-4 rounded-sm border border-border-secondary">
            <h3 className="text-base font-medium text-text-form mb-2">
              Assumed Luggage
            </h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-form-icon" />
                <span>Suitcase quantity: {assumedLuggage.suitcases}x suitcases</span>
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-form-icon" />
                <span>Hand luggage quantity: {assumedLuggage.handLuggage}x hand luggage</span>
              </li>
            </ul>
            <p className="text-xs text-text-secondary mt-2">
              Based on {peopleData.adults} adult{peopleData.adults !== 1 ? 's' : ''} and {peopleData.children} child{peopleData.children !== 1 ? 'ren' : ''}
            </p>
          </div>

          {/* Luggage Fields */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <NumberInput
              label="Extra suitcase(s)"
              value={luggageData.suitcases}
              onChange={handleExtraSuitcasesChange}
              min={0}
              max={20}
              error={validation.errors.extraSuitcases}
              helper="Additional suitcases beyond assumed"
              className="w-full"
              showButtons={true}
            />
            
            <NumberInput
              label="Skis"
              value={luggageData.skis}
              onChange={handleSkisChange}
              min={0}
              max={20}
              error={validation.errors.skis}
              helper="Number of ski sets"
              className="w-full"
              showButtons={true}
            />
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
            <NumberInput
              label="Snowboards"
              value={luggageData.snowboards}
              onChange={handleSnowboardsChange}
              min={0}
              max={20}
              error={validation.errors.snowboards}
              helper="Number of snowboards"
              className="w-full"
              showButtons={true}
            />
            
            <NumberInput
              label="Pram(s)"
              value={luggageData.prams}
              onChange={handlePramsChange}
              min={0}
              max={5}
              helper="Number of prams/strollers"
              className="w-full"
              showButtons={true}
            />
          </div>

          {/* Other Equipment */}
          <Textarea
            label="Other Equipment"
            placeholder="Describe any other special equipment or luggage items..."
            value={luggageData.extraItems.join(', ')}
            onChange={handleOtherEquipmentChange}
            rows={3}
            maxLength={200}
            helper="Optional: List any other equipment or special items"
            className="w-full"
          />

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

LuggageStep.displayName = 'LuggageStep'; 