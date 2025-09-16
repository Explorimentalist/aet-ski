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
        className="absolute top-3xl right-3xl tablet:top-7xl tablet:right-7xl desktop:top-9xl desktop:right-9xl w-6 h-6 flex items-center justify-center text-[#1D1B20] hover:text-[#4F5B62] transition-colors z-10"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Content Container - Perfect vertical and horizontal centering */}
      <div className="
        w-full h-screen
        flex items-center justify-center
        px-3xl tablet:px-7xl desktop:px-9xl
      ">
        {/* Content Area - Centered content with proper spacing */}
        <div className="
          w-full max-w-[624px]
          flex flex-col items-center justify-center
          gap-12
          text-center
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
              Your quote request was<br />
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
              Thank you for your enquiry, we will respond as soon as possible
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
