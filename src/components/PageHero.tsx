// src/components/PageHero.tsx
// Enhanced PageHero with sophisticated content reveal animations
// Features staggered entrance, image reveal, and overlay animations

import React from 'react';
import { motion } from 'motion/react';
import { motionTokens, useMotionSafeSimple } from '@/motion';
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
          {/* Heading - 4 columns on all breakpoints */}
          <motion.div 
            className={`${GridLayouts.heroHeading} mb-10`}
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

          {/* Description - 4 columns on mobile/tablet, 6 columns on desktop starting from column 7 */}
          <motion.div 
            className={`${GridLayouts.heroBody} mb-5xl`}
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

          {/* Image - 4 columns on mobile, 8 columns on tablet, 12 columns on desktop */}
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
              <motion.picture
                initial={shouldAnimate ? { scale: 1.1 } : false}
                animate={shouldAnimate ? { scale: 1 } : undefined}
                transition={{
                  duration: motionTokens.d.long,
                  ease: motionTokens.e.brand,
                  delay: motionTokens.stagger.sm
                }}
              >
                {/* Default image */}
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-auto rounded-2xl"
                />
              </motion.picture>
              
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