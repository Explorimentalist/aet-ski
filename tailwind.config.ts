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
          'primary-active': '#0C2626',
          'primary-focus': 'rgba(29, 71, 71, 0.1)',
        },
        accent: {
          primary: '#FFCC80',
        },
        background: {
          primary: '#F5F5F5',
          secondary: '#FFFFFF',
          hover: '#F8F8F8',
          selected: '#E8EAEB',
          disabled: '#F5F5F5',
          error: '#FFF8F8',
        },
        text: {
          primary: '#4F5B62',
          form: '#4F5B62',
          secondary: '#757575',
          placeholder: '#B3B7BB',
          disabled: '#B3B7BB',
          inverse: '#FFFFFF',
          error: '#E53935',
          brand: '#1D4747',
          muted: '#3C3C3C',
        },
        border: {
          primary: '#4F5B62',
          secondary: '#DDDEE0',
          error: '#E52222',
          transparent: 'transparent',
        },
        state: {
          hover: '#EBEBEB',
          active: '#E8EAEB',
          focus: 'rgba(79, 91, 98, 0.1)',
        },
        shadow: {
          dropdown: 'rgba(0, 0, 0, 0.1)',
        },
        form: {
          text: '#4F5B62',
          icon: '#4F5B62',
          'selection-hover': '#CCE5E5',
          'selection-active': '#74BCBC',
        },
      },
      spacing: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
        '6xl': '48px',
        '7xl': '56px',
        '8xl': '64px',
        '8.5xl': '80px',
        '9xl': '84px',
        '10xl': '118px',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '28px',
        '3xl': '36px',
        '4xl': '48px',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.4',
        relaxed: '1.5',
        'base-px': '21px',
      },
      letterSpacing: {
        tight: '-0.019em',
        normal: '0.0005em',
        button: '-0.011em',
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '50%',
      },
      boxShadow: {
        none: 'none',
        sm: '0 0 0 2px rgba(79, 91, 98, 0.1)',
        md: '0 4px 12px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        fast: '0.2s',
        normal: '0.3s',
        slow: '0.8s',
      },
      backgroundImage: {
        'gradient-testimonial': 'radial-gradient(302.49% 115.61% at 50% 117.5%, #FFCC80 0%, #407099 25.48%, #2A4D6A 100%)',
        'gradient-hero': 'linear-gradient(180deg, #CFE0F6 0%, #F5F5F5 100%)',
      },
      fontFamily: {
        heading: ['GT Walsheim Trial', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        geist: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'slide-in-1': 'slide-in 0.5s ease-out 100ms forwards',
        'slide-in-2': 'slide-in 0.5s ease-out 200ms forwards',
        'slide-in-3': 'slide-in 0.5s ease-out 300ms forwards',
        'slide-in-4': 'slide-in 0.5s ease-out 400ms forwards',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },
      keyframes: {
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.005)' },
        },
      },
      // Custom aspect ratios for hero images
      aspectRatio: {
        'hero-desktop': '1.5',   // 1272/848 ≈ 1.5
        'hero-mobile': '0.754',  // 392/520 ≈ 0.754
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