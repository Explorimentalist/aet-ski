// src/components/MarqueeRebrand.tsx
import React from 'react';
import { Grid } from './Grid';
import { Logo } from './Logo';

/**
 * Token-aligned infinite marquee announcing the rebrand.
 * - Uses duplicated tracks for seamless looping
 * - Animation keyframes defined in globals.css: marquee-scroll
 */
const MarqueeRebrand: React.FC = () => {
  const Item = () => (
    <div
      className="flex flex-row items-center h-6"
      style={{ gap: 'var(--spacing-2xl)' }}
    >
      <img
        src="/images/logo_white_to_black.png"
        alt="White to black logo"
        className="h-6 w-auto"
        loading="lazy"
      />
      <span className="text-body text-base leading-[150%] tracking-[-0.011em] text-text-form">
        now operates as
      </span>
      <Logo className="h-6 w-auto" color="#4F5B62" />
    </div>
  );

  return (
    <section className="py-6 bg-background-primary">
      <Grid container>
        <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12 overflow-hidden">
          <div
            className="flex w-max"
            style={{
              animation: 'marquee-scroll 24s linear infinite',
              willChange: 'transform',
            }}
            aria-label="Company rebrand marquee"
          >
            {/* Track A */}
            <div className="flex" style={{ gap: 'var(--spacing-5xl)' }}>
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
            </div>

            {/* Track B (duplicate) */}
            <div className="flex" style={{ gap: 'var(--spacing-5xl)' }} aria-hidden="true">
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
            </div>
          </div>
        </div>
      </Grid>
    </section>
  );
};

export default MarqueeRebrand;
export { MarqueeRebrand };


