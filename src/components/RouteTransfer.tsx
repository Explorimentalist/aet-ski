// src/components/RouteTransfer.tsx
import React from 'react';
import { Grid, GridLayouts } from './Grid';
import { ShieldCheck } from 'lucide-react';

interface TransferStats {
  departure: string;
  distance: string;
  eta: string;
  cost: string;
}

interface RouteTransferProps {
  heading: string;
  transferStats: TransferStats;
  transferDescription: string;
  mapImageSrc: string;
  mapImageAlt: string;
  isRecommended?: boolean;
  recommendedText?: string;
}

export const RouteTransfer: React.FC<RouteTransferProps> = ({
  heading,
  transferStats,
  transferDescription,
  mapImageSrc,
  mapImageAlt,
  isRecommended = false,
  recommendedText = "90% go this way",
}) => {
  return (
    <section className="py-16 tablet:py-20 desktop:py-24">
      <Grid container>
        {/* Heading - 3 columns on desktop/tablet, 4 on mobile */}
        <div className="col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3 mb-8">
          <h2 
            className="text-3xl font-bold text-text-primary leading-[150%] tracking-[-0.019em] mb-4"
            style={{
              fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            }}
          >
            {heading}
          </h2>
          {isRecommended && (
            <div className="inline-flex items-center px-3 py-2 gap-md bg-accent-primary h-[30px] min-w-[164px] max-w-fit" style={{ borderRadius: '15px' }}>
              <ShieldCheck size={14} className="text-text-muted flex-shrink-0" />
              <span 
                className="text-xs font-normal text-text-muted leading-[120%] tracking-button whitespace-nowrap"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                Top pick: {recommendedText}
              </span>
            </div>
          )}
        </div>

        {/* Transfer Stats - 4 columns on mobile, 5 on tablet, 6 on desktop */}
        <div className="col-mobile-4 tablet:col-tablet-5 desktop:col-desktop-6 mb-8">
          <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-y-6 tablet:gap-x-12 tablet:flex-wrap">
            {/* Departure */}
            <div className="flex flex-col gap-1">
              <span 
                className="text-xs font-normal text-text-primary leading-[150%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                Departure from
              </span>
              <span 
                className="text-base font-bold text-text-primary leading-[150%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                {transferStats.departure}
              </span>
            </div>

            {/* Distance */}
            <div className="flex flex-col gap-1">
              <span 
                className="text-xs font-normal text-text-primary leading-[150%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                Distance
              </span>
              <span 
                className="text-base font-bold text-text-primary leading-[150%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                {transferStats.distance}
              </span>
            </div>

            {/* ETA */}
            <div className="flex flex-col gap-1">
              <span 
                className="text-xs font-normal text-text-primary leading-[150%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                ETA
              </span>
              <span 
                className="text-base font-bold text-text-primary leading-[150%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                {transferStats.eta}
              </span>
            </div>

            {/* Cost */}
            <div className="flex flex-col gap-1">
              <span 
                className="text-xs font-normal text-text-primary leading-[150%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                Cost
              </span>
              <span 
                className="text-base font-bold text-text-primary leading-[150%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                {transferStats.cost}
              </span>
            </div>
          </div>
        </div>

        {/* Transfer Description - 4 columns on mobile, 5 on tablet, 6 on desktop */}
        <div className="col-mobile-4 tablet:col-tablet-5 tablet:col-start-4 desktop:col-desktop-6 desktop:col-start-4 mb-8">
          <div className="flex flex-col gap-1">
            <span 
              className="text-xs font-normal text-text-primary leading-[150%] tracking-[-0.011em]"
              style={{
                fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
              }}
            >
              Transfer information
            </span>
            <p 
              className="text-base font-medium text-text-primary leading-[150%] tracking-[-0.011em]"
              style={{
                fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
              }}
            >
              {transferDescription}
            </p>
          </div>
        </div>

        {/* Map Image - 4 columns on mobile, 8 on tablet/desktop */}
        <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-8 desktop:col-start-4">
          <div className="relative">
            <img
              src={mapImageSrc}
              alt={mapImageAlt}
              className="w-full h-auto rounded-xl"
            />
            {/* Gradient overlay with multiply blend mode */}
            <div className="absolute inset-0 bg-gradient-hero mix-blend-multiply rounded-xl" />
          </div>
        </div>
      </Grid>
    </section>
  );
}; 