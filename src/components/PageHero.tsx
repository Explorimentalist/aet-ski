 // src/components/PageHero.tsx
import React from 'react';
import { Grid, GridLayouts } from './Grid';

interface PageHeroProps {
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  heading,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <section className="pt-[72px] pb-0">
      <Grid container className="py-12 tablet:py-16 desktop:py-24">
        {/* Heading - 4 columns on all breakpoints */}
        <div className={`${GridLayouts.heroHeading} mb-10`}>
          <h1 
            className="text-4xl tablet:text-5xl desktop:text-6xl font-bold text-text-primary leading-[120%] tracking-[-0.011em]"
            style={{
              fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            }}
          >
            {heading}
          </h1>
        </div>

        {/* Description - 4 columns on mobile/tablet, 6 columns on desktop starting from column 7 */}
        <div className={`${GridLayouts.heroBody} mb-5xl`}>
          <p 
            className="text-base font-normal text-text-primary leading-[150%] tracking-[0.0005em]"
            style={{
              fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            }}
          >
            {description}
          </p>
        </div>

        {/* Image - 4 columns on mobile, 8 columns on tablet, 12 columns on desktop */}
        <div className={GridLayouts.heroImage}>
          <div className="relative">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto rounded-2xl"
            />
            {/* Gradient overlay as seen in the design */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#CFE0F6] to-[#F5F5F5] mix-blend-multiply rounded-2xl" />
          </div>
        </div>
      </Grid>
    </section>
  );
};