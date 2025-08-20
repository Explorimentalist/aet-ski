// src/components/FormNavigation.tsx
import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/Button';

export interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  nextButtonText?: string;
  previousButtonText?: string;
  showProgressDots?: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousDisabled = false,
  nextButtonText = 'Next',
  previousButtonText = 'Previous',
  showProgressDots = true,
}) => {
  // Create portal to render outside Modal's scrollable context
  const navigationContent = (
    <div className="
      fixed bottom-0 left-0 right-0 
      border-t border-border-secondary
      px-3xl tablet:px-7xl desktop:px-9xl
      py-6xl
      backdrop-blur-[24px]
      z-[60]
    "
    style={{
      background: 'linear-gradient(to bottom, rgba(245, 245, 245, 0.9) 0%, rgba(245, 245, 245, 0.3) 50%, transparent 100%)',
    }}
    >
      <div className="
        grid grid-cols-4 tablet:grid-cols-8 desktop:grid-cols-12
        gap-xl tablet:gap-2xl desktop:gap-3xl
      ">
        {/* Navigation content - spans same columns as form content */}
        <div className="
          col-span-4 
          tablet:col-start-2 tablet:col-span-6 
          desktop:col-start-4 desktop:col-span-6
          flex items-center justify-between
        ">
        {/* Left side - Previous button or empty space */}
        <div className="flex-1">
          {currentStep > 1 && currentStep < totalSteps && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onPrevious}
              disabled={isPreviousDisabled}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {previousButtonText}
            </Button>
          )}
        </div>

        {/* Center - Progress dots */}
        {showProgressDots && currentStep < totalSteps && (
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
        )}

        {/* Right side - Next button */}
        <div className="flex-1 flex justify-end">
          <Button
            size="right-icon"
            onClick={onNext}
            disabled={isNextDisabled}
          >
            {nextButtonText} <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render outside Modal's scrollable context
  if (typeof document !== 'undefined') {
    return createPortal(navigationContent, document.body);
  }

  // Fallback for SSR
  return navigationContent;
};
