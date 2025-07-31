// src/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1D4747',
          'primary-hover': '#0C2626',
        },
        background: {
          primary: '#F5F5F5',
          secondary: '#FFFFFF',
        },
        text: {
          primary: '#1D4747',
          secondary: '#757575',
          inverse: '#FFFFFF',
        },
      },
      backgroundImage: {
        'gradient-testimonial': 'radial-gradient(302.49% 115.61% at 50% 117.5%, #FFCC80 0%, #407099 25.48%, #2A4D6A 100%)',
      },
      fontFamily: {
        heading: ['GT Walsheim Trial', 'sans-serif'],
        body: ['Geist', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'slide-in-1': 'slide-in 0.5s ease-out 100ms forwards',
        'slide-in-2': 'slide-in 0.5s ease-out 200ms forwards',
        'slide-in-3': 'slide-in 0.5s ease-out 300ms forwards',
        'slide-in-4': 'slide-in 0.5s ease-out 400ms forwards',
      },
      // Custom breakpoints matching design system
      screens: {
        'mobile': '380px',
        'tablet': '768px',
        'desktop': '1440px',
      },
      // Container configuration
      container: {
        center: true,
        padding: {
          DEFAULT: '24px',    // Mobile margin
          tablet: '56px',     // Tablet margin
          desktop: '84px',    // Desktop margin
        },
        screens: {
          tablet: '768px',
          desktop: '1440px',
        },
      },
      // Grid system
      gridTemplateColumns: {
        'mobile': 'repeat(4, minmax(0, 1fr))',
        'tablet': 'repeat(8, minmax(0, 1fr))',
        'desktop': 'repeat(12, minmax(0, 1fr))',
      },
      // Grid gaps
      gap: {
        'grid-mobile': '16px',
        'grid-tablet': '20px',
        'grid-desktop': '24px',
      },
      // Column spans
      gridColumn: {
        'mobile-full': 'span 4 / span 4',
        'tablet-full': 'span 8 / span 8',
        'desktop-full': 'span 12 / span 12',
        // Mobile spans (4 columns)
        'mobile-1': 'span 1 / span 1',
        'mobile-2': 'span 2 / span 2',
        'mobile-3': 'span 3 / span 3',
        'mobile-4': 'span 4 / span 4',
        // Tablet spans (8 columns)
        'tablet-1': 'span 1 / span 1',
        'tablet-2': 'span 2 / span 2',
        'tablet-3': 'span 3 / span 3',
        'tablet-4': 'span 4 / span 4',
        'tablet-5': 'span 5 / span 5',
        'tablet-6': 'span 6 / span 6',
        'tablet-7': 'span 7 / span 7',
        'tablet-8': 'span 8 / span 8',
        // Desktop spans (12 columns)
        'desktop-1': 'span 1 / span 1',
        'desktop-2': 'span 2 / span 2',
        'desktop-3': 'span 3 / span 3',
        'desktop-4': 'span 4 / span 4',
        'desktop-5': 'span 5 / span 5',
        'desktop-6': 'span 6 / span 6',
        'desktop-7': 'span 7 / span 7',
        'desktop-8': 'span 8 / span 8',
        'desktop-9': 'span 9 / span 9',
        'desktop-10': 'span 10 / span 10',
        'desktop-11': 'span 11 / span 11',
        'desktop-12': 'span 12 / span 12',
      },
      // Column start positions (for offsets)
      gridColumnStart: {
        'mobile-1': '1',
        'mobile-2': '2',
        'mobile-3': '3',
        'mobile-4': '4',
        'tablet-1': '1',
        'tablet-2': '2',
        'tablet-3': '3',
        'tablet-4': '4',
        'tablet-5': '5',
        'tablet-6': '6',
        'tablet-7': '7',
        'tablet-8': '8',
        'desktop-1': '1',
        'desktop-2': '2',
        'desktop-3': '3',
        'desktop-4': '4',
        'desktop-5': '5',
        'desktop-6': '6',
        'desktop-7': '7',
        'desktop-8': '8',
        'desktop-9': '9',
        'desktop-10': '10',
        'desktop-11': '11',
        'desktop-12': '12',
      },
    },
  },
};

export default config; 