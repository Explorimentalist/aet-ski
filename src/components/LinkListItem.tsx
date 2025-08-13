// src/components/LinkListItem.tsx
import React from 'react';
import Image from 'next/image';
import { Grid } from './Grid';
import { ExternalLink } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/cloudinary';

interface LinkListItemProps {
  /** Company logo as Cloudinary public ID or fallback URL */
  logo: string;
  /** Company name - used for alt text and display */
  companyName: string;
  /** Website URL */
  url: string;
  /** Optional description or additional info */
  description?: string;
  /** Logo width for responsive sizing */
  logoWidth?: number;
  /** Logo height for responsive sizing */
  logoHeight?: number;
}

export const LinkListItem: React.FC<LinkListItemProps> = ({
  logo,
  companyName,
  url,
  description,
  logoWidth = 300,
  logoHeight = 40,
}) => {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Generate optimized image URL using Cloudinary - SEO optimized
  const optimizedLogoUrl = React.useMemo(() => {
    // If it's already a full URL (fallback), use as-is
    if (logo.startsWith('http')) {
      return logo;
    }
    
    // Generate optimized URL (Next.js Image will handle responsive delivery)
    return getOptimizedImageUrl(logo, {
      width: logoWidth,
      height: logoHeight,
      format: 'auto',
      quality: 'auto',
      crop: 'scale'
    });
  }, [logo, logoWidth, logoHeight]);

  // Detect SVG to avoid rasterization/pixelation
  const isSvg = optimizedLogoUrl.toLowerCase().includes('.svg');

  // Generate SEO-friendly, descriptive alt text
  const altText = React.useMemo(() => {
    const service = url.includes('.com') ? 'travel service' : 'ski resort';
    return `${companyName} logo - Premium ${service} partner for French Alps ski transfers and holidays`;
  }, [companyName, url]);

  return (
    <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12">
      {/* Separator Line */}
      <div className="w-full h-px bg-border-secondary mb-xl"></div>
      
      {/* List Item Content */}
      <Grid className="py-xl">
        {/* Logo Section - 3 cols desktop, 2 cols tablet, full width mobile; fill column width up to 48px height */}
        <div className="col-mobile-4 tablet:col-tablet-2 desktop:col-desktop-3 flex items-center">
          <div className="min-h-12 flex items-center justify-start w-full">
            {isSvg ? (
              <img
                src={optimizedLogoUrl}
                alt={altText}
                className="block h-auto max-h-12 max-w-full object-contain"
                loading="lazy"
                style={{ objectPosition: 'left center', objectFit: 'contain' }}
              />
            ) : (
              <Image
                src={optimizedLogoUrl}
                alt={altText}
                width={logoWidth}
                height={logoHeight}
                className="block h-auto max-h-12 max-w-full object-contain"
                priority={false}
                loading="lazy"
                sizes="(max-width: 768px) 200px, (max-width: 1200px) 250px, 300px"
                quality={85}
                style={{ objectPosition: 'left center', objectFit: 'contain' }}
              />
            )}
          </div>
        </div>

        {/* Company Name - starts col 4 desktop (3 cols), starts col 3 tablet (3 cols), hidden mobile */}
        <div className="hidden tablet:block tablet:col-tablet-3 tablet:col-start-tablet-3 desktop:col-desktop-3 desktop:col-start-desktop-4">
          <div className="flex items-center min-h-12">
            <span className="font-body font-medium text-base text-text-primary leading-relaxed tracking-button">
              {companyName}
            </span>
          </div>
        </div>

        {/* URL Section - starts col 9 desktop (4 cols), starts col 6 tablet (3 cols), full width mobile */}
        <div className="col-mobile-4 tablet:col-tablet-3 tablet:col-start-tablet-6 desktop:col-desktop-4 desktop:col-start-desktop-9">
          <div className="flex items-center justify-between min-h-12">
            {/* Mobile: Show company name */}
            <div className="tablet:hidden">
              <span className="font-body font-medium text-base text-text-primary leading-relaxed tracking-button">
                {companyName}
              </span>
            </div>
            
            {/* URL with External Link Icon - SEO optimized */}
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-sm text-text-primary hover:text-brand-primary transition-colors duration-fast group"
              title={`Visit ${companyName} website - Opens in new tab`}
              aria-label={`Visit ${companyName} website for ${displayUrl} - Opens in new tab`}
            >
              <span className="font-body font-medium text-base leading-relaxed tracking-button underline">
                {displayUrl}
              </span>
              <ExternalLink 
                className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-fast" 
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* Description (if provided) - Full width, appears below on all devices */}
        {description && (
          <div className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12 mt-lg">
            <p className="font-body font-medium text-base text-text-primary leading-relaxed tracking-normal">
              {description}
            </p>
          </div>
        )}
      </Grid>
    </div>
  );
};