// src/components/PageHero.tsx
// Enhanced PageHero with sophisticated content reveal animations
// Features staggered entrance, image reveal, and overlay animations

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { motionTokens, useMotionSafeSimple } from '@/motion';
import { Grid, GridLayouts } from './Grid';
import { getAdvancedOptimizedUrl } from '@/lib/cloudinary';

interface PageHeroProps {
  heading: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
  // Next.js Image props
  imageWidth?: number;
  imageHeight?: number;
  priority?: boolean;
  // Phase 2: Advanced Cloudinary optimization
  cloudinaryPublicId?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
}

export const PageHero: React.FC<PageHeroProps> = ({
  heading,
  description,
  imageSrc,
  imageAlt,
  imageWidth = 1200,
  imageHeight = 600,
  priority = true,
  // Phase 2: Advanced Cloudinary optimization
  cloudinaryPublicId,
  deviceType = 'desktop',
  format = 'auto',
}) => {
  // Phase 2: Generate optimized image URL
  const optimizedImageSrc = React.useMemo(() => {
    if (cloudinaryPublicId) {
      return getAdvancedOptimizedUrl(cloudinaryPublicId, {
        width: imageWidth,
        height: imageHeight,
        quality: 'auto',
        format,
        deviceType,
        crop: 'fill'
      });
    }
    return imageSrc || '';
  }, [cloudinaryPublicId, imageSrc, imageWidth, imageHeight, format, deviceType]);
  const shouldAnimate = useMotionSafeSimple();

  return (
    <section className="pt-[72px] pb-0">
      <Grid container className="py-12 tablet:py-16 desktop:py-24">
        <motion.div
          className="col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12"
          initial={shouldAnimate ? "hidden" : false}
          animate={shouldAnimate ? "visible" : undefined}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: motionTokens.stagger.md,
                delayChildren: motionTokens.stagger.xs
              }
            }
          }}
        >
          {/* Content Row - Heading and Description side by side on tablet/desktop */}
          <div className="grid grid-cols-mobile tablet:grid-cols-tablet desktop:grid-cols-desktop gap-grid-mobile tablet:gap-grid-tablet desktop:gap-grid-desktop mb-5xl">
            {/* Heading - Left column */}
            <motion.div 
              className={GridLayouts.heroHeading}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 32,
                  scale: 0.98
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: motionTokens.d.medium,
                    ease: motionTokens.e.brand
                  }
                }
              }}
            >
              <h1 
                className="text-4xl tablet:text-5xl desktop:text-6xl font-bold text-text-primary leading-[120%] tracking-[-0.011em]"
                style={{
                  fontFamily: 'GT Walsheim Trial, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                {heading}
              </h1>
            </motion.div>

            {/* Description - Right column */}
            <motion.div 
              className={GridLayouts.heroBody}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 24
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: motionTokens.d.medium,
                    ease: motionTokens.e.brand
                  }
                }
              }}
            >
              <p 
                className="text-base font-normal text-text-primary leading-[150%] tracking-[0.0005em]"
                style={{
                  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                }}
              >
                {description}
              </p>
            </motion.div>
          </div>

          {/* Image - Full width below content */}
          <motion.div 
            className={GridLayouts.heroImage}
            variants={{
              hidden: { 
                opacity: 0, 
                y: 20,
                scale: 0.96
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  duration: motionTokens.d.long,
                  ease: motionTokens.e.brand
                }
              }
            }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <motion.div
                initial={shouldAnimate ? { scale: 1.1 } : false}
                animate={shouldAnimate ? { scale: 1 } : undefined}
                transition={{
                  duration: motionTokens.d.long,
                  ease: motionTokens.e.brand,
                  delay: motionTokens.stagger.sm
                }}
              >
                {/* Hero image with Phase 2 Cloudinary optimization */}
                <Image
                  src={optimizedImageSrc}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-auto rounded-2xl"
                  priority={priority}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  quality={90}
                />
              </motion.div>
              
              {/* Animated gradient overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-hero mix-blend-multiply rounded-2xl" 
                initial={shouldAnimate ? { opacity: 0 } : false}
                animate={shouldAnimate ? { opacity: 1 } : undefined}
                transition={{
                  duration: motionTokens.d.medium,
                  ease: motionTokens.e.fade,
                  delay: motionTokens.stagger.md
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </Grid>
    </section>
  );
};