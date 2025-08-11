// src/components/PageHeroHome.tsx
import React from 'react';
import { Grid, GridLayouts } from './Grid';
import { Button } from './Button';

interface PageHeroHomeProps {
  onQuoteClick: () => void;
}

export const PageHeroHome: React.FC<PageHeroHomeProps> = ({ onQuoteClick }) => {
  return (
    <section className="relative">
      <Grid container>
        {/* Background Image Container - Full width across all devices */}
        <div className={GridLayouts.heroImage}>
          <div className="relative">
            {/* Responsive Image Container - Using custom aspect ratios */}
            <div className="relative w-full aspect-hero-mobile tablet:aspect-hero-desktop overflow-hidden rounded-lg tablet:rounded-xl desktop:rounded-2xl">
              {/* Background Image - Enhanced Cloudinary with responsive images */}
              <picture>
                {/* Mobile version - portrait aspect ratio 392:520 */}
                <source
                  media="(max-width: 767px)"
                  srcSet="https://res.cloudinary.com/dzrn3khsd/image/upload/w_400,h_530,c_fill,g_auto,f_auto,q_auto/v1754407276/AET.ski_pj8eld.png 400w,
                          https://res.cloudinary.com/dzrn3khsd/image/upload/w_800,h_1060,c_fill,g_auto,f_auto,q_auto/v1754407276/AET.ski_pj8eld.png 800w"
                  sizes="100vw"
                />
                {/* Tablet and Desktop version - landscape aspect ratio 1272:848 */}
                <source
                  media="(min-width: 768px)"
                  srcSet="https://res.cloudinary.com/dzrn3khsd/image/upload/w_800,h_533,c_fill,g_auto,f_auto,q_auto/v1754407276/AET.ski_pj8eld.png 800w,
                          https://res.cloudinary.com/dzrn3khsd/image/upload/w_1200,h_800,c_fill,g_auto,f_auto,q_auto/v1754407276/AET.ski_pj8eld.png 1200w,
                          https://res.cloudinary.com/dzrn3khsd/image/upload/w_1600,h_1067,c_fill,g_auto,f_auto,q_auto/v1754407276/AET.ski_pj8eld.png 1600w"
                  sizes="100vw"
                />
                {/* Fallback image for better browser support */}
                <img
                  src="https://res.cloudinary.com/dzrn3khsd/image/upload/w_1200,h_800,c_fill,g_auto,f_auto,q_auto/v1754407276/AET.ski_pj8eld.png"
                  alt="French Alps mountain landscape with snow-covered peaks and ski resorts"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />
              </picture>
              
              {/* Gradient Veil with Multiply Blend Mode - Updated to match design */}
              <div 
                className="absolute inset-0 rounded-lg tablet:rounded-xl desktop:rounded-2xl"
                style={{
                  background: 'linear-gradient(180deg, #CFE0F6 0%, #F5F5F5 100%)',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Hero Text Content - Positioned in upper portion */}
            <div className="absolute inset-0">
              <div className="text-center max-w-4xl mx-auto px-6 tablet:px-8 desktop:px-12 pt-7xl tablet:pt-8xl desktop:pt-8.5xl">
                <h1 
                  className="text-2xl tablet:text-4xl desktop:text-6xl font-bold text-text-inverse mb-xl tablet:mb-2xl desktop:mb-3xl leading-tight tracking-tight"
                  style={{
                    fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                    lineHeight: '120%',
                    letterSpacing: '-0.011em'
                  }}
                >
                  Reliable airport transfers to the French Alps
                </h1>
                
                <p 
                  className="text-base tablet:text-lg desktop:text-2xl max-w-3xl mx-auto leading-relaxed"
                  style={{
                    fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                    lineHeight: '150%',
                    letterSpacing: '0.0005em',
                    color: '#F5F5F5'
                  }}
                >
                  More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski
                </p>
              </div>
            </div>

            {/* CTA Button - Positioned near bottom */}
            <div className="absolute inset-x-0 bottom-6xl tablet:bottom-8xl desktop:bottom-10xl">
              <div className="flex justify-center px-6 tablet:px-8 desktop:px-12">
                <Button 
                  size="lg" 
                  className="w-full mobile:w-auto"
                  onClick={onQuoteClick}
                >
                  Get a quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </section>
  );
};