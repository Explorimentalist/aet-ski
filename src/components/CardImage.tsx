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
  // Lightweight shimmer placeholder for improved perceived performance
  const shimmer = (w: number, h: number) =>
    `\n      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">\n        <defs>\n          <linearGradient id="g">\n            <stop stop-color="#f6f7f8" offset="20%"/>\n            <stop stop-color="#edeef1" offset="50%"/>\n            <stop stop-color="#f6f7f8" offset="70%"/>\n          </linearGradient>\n        </defs>\n        <rect width="${w}" height="${h}" fill="#f6f7f8"/>\n        <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>\n        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite"  />\n      </svg>`;
  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

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
        // Outer shell manages rounding and overflow; make it a column flex box so the image can stick to the bottom
        'bg-background-secondary rounded-xl overflow-hidden flex flex-col self-stretch',
        // Match CardSmall responsive sizing behaviour
        variant === 'grid'
          ? 'w-full col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3'
          : 'w-full tablet:w-[300px]',
        className,
      )}
    >
      {/* Content padding area */}
      <div className="flex flex-col items-center pt-6xl px-6xl pb-xl gap-4 flex-1">
        <h3 className="text-heading text-xl font-bold text-text-form text-center">
          {title}
        </h3>
        <p className="text-body text-sm text-text-form text-center">
          {description}
        </p>
      </div>

      {/* Image section – full width of the card, fixed 200px height */}
      <div className="relative w-full h-[200px] mt-auto">
        {/* Optimized image (falls back to empty if none provided) */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(600, 200))}`}
          />
        ) : null}

        {/* Inverse top fade: opaque at top -> transparent at bottom */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            // Lighter fade: ~8px solid, then fade to 0 by ~35% (~70px of 200px)
            background:
              'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 4%, rgba(255,255,255,0.85) 20%, rgba(255,255,255,0) 35%)',
          }}
          aria-hidden
        />

        {/* 1px top cover to guarantee no seam on some displays */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white pointer-events-none" aria-hidden />

        {/* Subtle bottom radial highlight to match Figma */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px]"
          style={{
            background:
              'radial-gradient(36.55% 79.71% at 50% 100%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
          }}
          aria-hidden
        />
      </div>
    </div>
  );
};

export default CardImage;
