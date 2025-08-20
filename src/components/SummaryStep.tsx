// src/components/SummaryStep.tsx
import React, { useMemo, useCallback, useState } from 'react';
import { X, Edit } from 'lucide-react';
import { Textarea } from '@/components/Textarea';
import { FormNavigation } from '@/components/FormNavigation';
import { FormStepProps } from '@/types';

export interface SummaryStepComponentProps extends FormStepProps {
  onClose: () => void;
  onSubmit: () => void;
}

export const SummaryStep: React.FC<SummaryStepComponentProps> = React.memo(({
  data,
  onUpdate,
  onClose,
  onEditStep,
  currentStep,
  totalSteps,
  onSubmit,
}) => {
  const journeyData = useMemo(() => data.journey || { type: 'one-way', collectionPoint: '', destinationPoint: '' }, [data.journey]);
  const datesData = useMemo(() => data.dates || { collectionDate: null, collectionTime: '', isCollectionFlexible: false, isReturnFlexible: false }, [data.dates]);
  const peopleData = useMemo(() => data.people || { adults: 0, children: 0 }, [data.people]);
  const luggageData = useMemo(() => data.luggage || { skis: 0, snowboards: 0, suitcases: 0, prams: 0, extraItems: [] }, [data.luggage]);
  const passengerData = useMemo(() => data.passenger || { name: '', email: '', phone: '', specialRequests: '' }, [data.passenger]);

  // Calculate assumed luggage based on people count
  const assumedLuggage = useMemo(() => {
    const totalPeople = (peopleData.adults || 0) + (peopleData.children || 0);
    return {
      suitcases: totalPeople,
      handLuggage: totalPeople,
    };
  }, [peopleData]);

  // Format date for display
  const formatDate = useCallback((date: Date | null | undefined): string => {
    if (!date) return 'Not specified';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }, []);

  // Handle additional information change
  const handleAdditionalInfoChange = useCallback((value: string) => {
    onUpdate({
      passenger: {
        ...passengerData,
        specialRequests: value,
      },
    });
  }, [passengerData, onUpdate]);

  // Handle edit step
  const handleEditStep = useCallback((step: number) => {
    if (onEditStep) {
      onEditStep(step);
    }
  }, [onEditStep]);

  // Handle form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(() => {
    console.log('SummaryStep: handleSubmit called - delegating to parent');
    setIsSubmitting(true);
    
    // Simply call onSubmit - let the parent handle the API call
    // This prevents duplicate API calls
    onSubmit();
  }, [onSubmit]);

  // Handle key navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div 
      className="w-full h-full relative min-h-[500px] pb-50"
      onKeyDown={handleKeyDown}
      role="form"
      aria-labelledby="summary-step-title"
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
                id="summary-step-title"
                className="text-[36px] font-bold text-text-form font-heading leading-[150%] tracking-[-0.019em]"
              >
                Summary
              </h2>
            </div>
          </div>

          {/* ARIA Live Region for step changes */}
          <div 
            aria-live="polite" 
            aria-atomic="true" 
            className="sr-only"
          >
            Step {currentStep} of {totalSteps}: Summary
          </div>

          {/* Summary Sections */}
          <div className="space-y-5xl">
            {/* Journey Section */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[24px] font-bold text-text-form font-body leading-[150%] tracking-[-0.011em]">Journey</h3>
                <button
                  type="button"
                  onClick={() => handleEditStep(1)}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-brand transition-colors"
                  aria-label="Edit journey details"
                >
                  <Edit className="w-6 h-6" />
                  Edit
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[16px] font-bold text-text-form font-body leading-[150%] tracking-[0.0005em]">{journeyData.type === 'return' ? 'Return' : 'One way'}</p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">From: <span className="font-bold">{journeyData.collectionPoint || 'Not specified'}</span></p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">To: <span className="font-bold">{journeyData.destinationPoint || 'Not specified'}</span></p>
              </div>
            </div>

            {/* Dates Section */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[24px] font-bold text-text-form font-body leading-[150%] tracking-[-0.011em]">Dates</h3>
                <button
                  type="button"
                  onClick={() => handleEditStep(2)}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-brand transition-colors"
                  aria-label="Edit dates"
                >
                  <Edit className="w-6 h-6" />
                  Edit
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Collection date: <span className="font-bold">{formatDate(datesData.collectionDate)}</span></p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Collection time: <span className="font-bold">{datesData.collectionTime || 'Not specified'}</span></p>
                {journeyData.type === 'return' && (
                  <>
                    <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Return date: <span className="font-bold">{formatDate(datesData.returnDate)}</span></p>
                    <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Return time: <span className="font-bold">{datesData.returnTime || 'Not specified'}</span></p>
                  </>
                )}
              </div>
            </div>

            {/* People Section */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[24px] font-bold text-text-form font-body leading-[150%] tracking-[-0.011em]">People</h3>
                <button
                  type="button"
                  onClick={() => handleEditStep(3)}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-brand transition-colors"
                  aria-label="Edit people details"
                >
                  <Edit className="w-6 h-6" />
                  Edit
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Adults: <span className="font-bold">{peopleData.adults || 0}</span></p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Children: <span className="font-bold">{peopleData.children || 0}</span></p>
              </div>
            </div>

            {/* Luggage Section */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[24px] font-bold text-text-form font-body leading-[150%] tracking-[-0.011em]">Luggage</h3>
                <button
                  type="button"
                  onClick={() => handleEditStep(4)}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-brand transition-colors"
                  aria-label="Edit luggage details"
                >
                  <Edit className="w-6 h-6" />
                  Edit
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Assumed Luggage: <span className="font-bold">{assumedLuggage.suitcases}x Suitcase, {assumedLuggage.handLuggage} Hand luggage</span></p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Extra luggage: <span className="font-bold">{luggageData.suitcases || 0}</span></p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Skis: <span className="font-bold">{luggageData.skis || 0}</span></p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Snowboards: <span className="font-bold">{luggageData.snowboards || 0}</span></p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Prams: <span className="font-bold">{luggageData.prams || 0}</span></p>
                {luggageData.extraItems && luggageData.extraItems.length > 0 && (
                  <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Other equipment: <span className="font-bold">{luggageData.extraItems.join(', ')}</span></p>
                )}
              </div>
            </div>

            {/* Passenger Details Section */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[24px] font-bold text-text-form font-body leading-[150%] tracking-[-0.011em]">Lead passanger details</h3>
                <button
                  type="button"
                  onClick={() => handleEditStep(5)}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-brand transition-colors"
                  aria-label="Edit passenger details"
                >
                  <Edit className="w-6 h-6" />
                  Edit
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Full name: <span className="font-bold">{passengerData.name || 'Not specified'}</span></p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Email: <span className="font-bold">{passengerData.email || 'Not specified'}</span></p>
                <p className="text-[16px] font-normal text-text-form font-body leading-[150%] tracking-[0.0005em]">Special requirements: <span className="font-bold">{passengerData.specialRequests || 'None'}</span></p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <Textarea
            label="Additional information"
            placeholder="Any additional information or special requests..."
            value={passengerData.specialRequests || ''}
            onChange={handleAdditionalInfoChange}
            rows={3}
            maxLength={500}
            helper="Optional: Any additional information or special requests"
            className="w-full"
          />

          {/* Bottom spacing to ensure content is visible above navigation */}
          <div className="h-40" />

          {/* Content continues... */}
        </div>
        </div>
      </div>

      {/* Sticky Footer Navigation */}
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleSubmit}
        onPrevious={() => {}} // No previous on final step
        isNextDisabled={isSubmitting}
        isPreviousDisabled={true}
        nextButtonText={isSubmitting ? 'Submitting...' : 'Get a quote'}
        showProgressDots={false}
      />
    </div>
  );
});

SummaryStep.displayName = 'SummaryStep'; 