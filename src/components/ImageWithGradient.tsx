// src/components/ImageWithGradient.tsx
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getAdvancedOptimizedUrl } from '@/lib/cloudinary';

interface ImageWithGradientProps {
  src?: string;
  alt: string;
  className?: string;
  height?: string;
  width?: string;
  gradientFrom?: string;
  gradientTo?: string;
  placeholder?: boolean;
  // Next.js Image props
  imageWidth?: number;
  imageHeight?: number;
  priority?: boolean;
  sizes?: string;
  // Phase 2: Advanced Cloudinary optimization
  cloudinaryPublicId?: string;
  mobileCloudinaryPublicId?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
}

export const ImageWithGradient: React.FC<ImageWithGradientProps> = ({
  src,
  alt,
  className,
  height = 'h-[528px]',
  width = 'w-full',
  gradientFrom = '#CFE0F6',
  gradientTo = '#F5F5F5',
  placeholder = false,
  imageWidth = 1200,
  imageHeight = 528,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px',
  // Phase 2: Advanced Cloudinary optimization
  cloudinaryPublicId,
  mobileCloudinaryPublicId,
  deviceType = 'desktop',
  format = 'auto',
}) => {
  // Phase 2: Generate optimized image URLs for different devices
  const mobileOptimizedSrc = React.useMemo(() => {
    if (mobileCloudinaryPublicId) {
      return getAdvancedOptimizedUrl(mobileCloudinaryPublicId, {
        width: imageWidth,
        height: imageHeight,
        quality: 'auto',
        format,
        deviceType: 'mobile',
        crop: 'fit'
      });
    }
    return null;
  }, [mobileCloudinaryPublicId, imageWidth, imageHeight, format]);

  const desktopOptimizedSrc = React.useMemo(() => {
    if (cloudinaryPublicId) {
      return getAdvancedOptimizedUrl(cloudinaryPublicId, {
        width: imageWidth,
        height: imageHeight,
        quality: 'auto',
        format,
        deviceType,
        crop: 'fit'
      });
    }
    return src;
  }, [cloudinaryPublicId, src, imageWidth, imageHeight, format, deviceType]);
  return (
    <div className={cn(
      'relative rounded-xl overflow-hidden',
      width,
      height,
      className
    )}>
      {/* Background gradient (subtle base) */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(to bottom, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      />
      
      {/* Image or Placeholder */}
      {(desktopOptimizedSrc || mobileOptimizedSrc) && !placeholder ? (
        <>
          {/* Mobile Image */}
          {mobileOptimizedSrc && (
            <Image
              src={mobileOptimizedSrc}
              alt={alt}
              width={imageWidth}
              height={imageHeight}
              className="absolute inset-0 w-full h-full object-cover rounded-xl block tablet:hidden desktop:hidden"
              priority={priority}
              sizes="100vw"
              quality={85}
            />
          )}
          {/* Desktop/Tablet Image */}
          {desktopOptimizedSrc && (
            <Image
              src={desktopOptimizedSrc}
              alt={alt}
              width={imageWidth}
              height={imageHeight}
              className="absolute inset-0 w-full h-full object-cover rounded-xl hidden tablet:block desktop:block"
              priority={priority}
              sizes={sizes}
              quality={85}
            />
          )}
        </>
      ) : (
        <div 
          className="absolute inset-0 rounded-xl opacity-50"
          style={{
            background: `linear-gradient(to bottom, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          }}
        />
      )}

      {/* Veil overlay on top of image */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          mixBlendMode: 'multiply',
        }}
        aria-hidden
      />
    </div>
  );
}; 