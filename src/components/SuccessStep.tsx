// src/components/SuccessStep.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/Button';

export interface SuccessStepProps {
  onClose: () => void;
  onGoHome: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = React.memo(({
  onClose,
  onGoHome,
}) => {
  return (
    <div className="w-full h-full relative bg-[#F5F5F5]">
      {/* Close Button - Positioned absolutely in top right */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-10 right-10 w-6 h-6 flex items-center justify-center text-[#1D1B20] hover:text-[#4F5B62] transition-colors z-10"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Content Container - Centered with responsive grid */}
      <div className="
        w-full h-full
        px-3xl tablet:px-7xl desktop:px-9xl
        grid grid-cols-4 tablet:grid-cols-8 desktop:grid-cols-12
        gap-xl tablet:gap-2xl desktop:gap-3xl
        flex items-center justify-center
      ">
        {/* Content Area - Middle 6/6/4 columns as specified */}
        <div className="
          col-span-4 
          tablet:col-start-2 tablet:col-span-6 
          desktop:col-start-4 desktop:col-span-6
          flex flex-col items-center justify-center
          gap-12
          min-h-[312px]
        ">
          {/* Success Message */}
          <div className="text-center">
            <h1 className="
              text-[36px] tablet:text-[42px] desktop:text-[48px]
              font-bold
              font-heading
              leading-[130%]
              tracking-[-0.019em]
              text-[#4F5B62]
              mb-0
            ">
              Your submission was<br />
              successful
            </h1>
          </div>

          {/* Description Text */}
          <div className="text-center">
            <p className="
              text-[18px] tablet:text-[20px] desktop:text-[24px]
              font-normal
              font-body
              leading-[150%]
              tracking-[0.0005em]
              text-[#4F5B62]
              max-w-[624px]
            ">
              Thanks for your submission. Your quote would be ready<br />
              and in your email in the next 24h.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={onGoHome}
              className="
                w-[154px]
                h-[48px]
                bg-[#1D4747]
                hover:bg-[#0C2626]
                text-white
                rounded-lg
                font-medium
                text-[16px]
                leading-[150%]
                tracking-[-0.011em]
              "
            >
              Go back home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

SuccessStep.displayName = 'SuccessStep'; 