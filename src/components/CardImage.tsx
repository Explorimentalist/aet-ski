// src/components/CardImage.tsx
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl } from '@/lib/cloudinary';

interface CardImageProps {
  title: string;
  description: string;
  /** Cloudinary public id or full URL for the image */
  imagePublicId?: string;
  /** Optional alt text for the image */
  imageAlt?: string;
  className?: string;
  /** Keep the same layout API as CardSmall */
  variant?: 'grid' | 'flex';
}

/**
 * CardImage – Variant of CardSmall with a bottom image and gradients.
 * - Keeps the same width/column behaviour as CardSmall.
 * - Removes the icon, adds a 200px high image with gradient overlays.
 */
export const CardImage: React.FC<CardImageProps> = ({
  title,
  description,
  imagePublicId,
  imageAlt = 'AET vehicle in the Alps',
  className,
  variant = 'grid',
}) => {
  // Build an optimized Cloudinary URL when a public id is provided.
  const imageUrl = React.useMemo(() => {
    if (!imagePublicId) return undefined;
    return getOptimizedImageUrl(imagePublicId, {
      width: 600, // 2x for ~300px card width
      height: 400,
      quality: 'auto',
      format: 'auto',
      crop: 'fill',
    });
  }, [imagePublicId]);

  return (
    <div
      className={cn(
        // Outer shell manages rounding and overflow so the image can go edge-to-edge
        'bg-background-secondary rounded-xl overflow-hidden',
        // Match CardSmall responsive sizing behaviour
        variant === 'grid'
          ? 'w-full col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3'
          : 'w-full tablet:w-[300px]',
        className,
      )}
    >
      {/* Content padding area */}
      <div className="flex flex-col items-center pt-6xl px-6xl pb-xl gap-4">
        <h3 className="text-heading text-xl font-bold text-text-form text-center w-[160px]">
          {title}
        </h3>
        <p className="text-body text-sm text-text-form text-center w-[160px]">
          {description}
        </p>
      </div>

      {/* Image section – full width of the card, fixed 200px height */}
      <div className="relative w-full h-[200px]">
        {/* Optimized image (falls back to empty if none provided) */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            priority={false}
          />
        ) : null}

        {/* Inverse top fade: opaque at top -> transparent at bottom */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            // Keep the very top fully opaque so the start of the image is never visible.
            background:
              'linear-gradient(180deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 16px, rgba(255,255,255,0.92) 80px, rgba(255,255,255,0) 60%)',
          }}
          aria-hidden
        />

        {/* 1px top cover to guarantee no seam on some displays */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white pointer-events-none" aria-hidden />

        {/* Subtle bottom radial highlight to match Figma */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px]"
          style={{
            background:
              'radial-gradient(36.55% 79.71% at 50% 100%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)',
          }}
          aria-hidden
        />
      </div>
    </div>
  );
};

export default CardImage;
