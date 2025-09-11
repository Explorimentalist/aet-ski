// src/tests/performance/ImageLoading.test.tsx
// Individual component testing suite for lazy loading implementation
// Phase 4: Performance Testing & Validation

import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageHeroHome } from '@/components/PageHeroHome';
import { LinkListItem } from '@/components/LinkListItem';
import { RouteTransfer } from '@/components/RouteTransfer';
import { PageHero } from '@/components/PageHero';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, priority, loading, fetchPriority, ...props }: {
    src: string;
    alt: string;
    priority?: boolean;
    loading?: string;
    fetchPriority?: string;
    [key: string]: unknown;
  }) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        data-priority={priority}
        data-loading={loading}
        data-fetch-priority={fetchPriority}
        {...props}
      />
    );
  };
});

// Mock motion components
jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <section {...props}>{children}</section>,
  },
  useMotionSafeSimple: () => false,
  motionTokens: {
    stagger: { xs: 0, sm: 0.1, md: 0.2 },
    d: { medium: 0.3, long: 0.5 },
    e: { brand: 'ease-out', fade: 'ease-in' },
    patterns: { entrance: {} },
  },
}));

describe('Image Loading Performance Tests', () => {
  describe('PageHeroHome Component', () => {
    it('should have priority loading for above-the-fold hero image', () => {
      const mockOnQuoteClick = jest.fn();
      render(<PageHeroHome onQuoteClick={mockOnQuoteClick} />);
      
      const heroImage = screen.getByAltText('French Alps mountain landscape with snow-covered peaks and ski resorts');
      
      expect(heroImage).toHaveAttribute('loading', 'eager');
      expect(heroImage).toHaveAttribute('fetchPriority', 'high');
    });

    it('should render without errors', () => {
      const mockOnQuoteClick = jest.fn();
      expect(() => {
        render(<PageHeroHome onQuoteClick={mockOnQuoteClick} />);
      }).not.toThrow();
    });
  });

  describe('LinkListItem Component', () => {
    const mockProps = {
      logo: 'test-logo',
      companyName: 'Test Company',
      url: 'https://test.com',
    };

    it('should have lazy loading by default', () => {
      render(<LinkListItem {...mockProps} />);
      
      const logoImage = screen.getByAltText(/Test Company logo/);
      
      expect(logoImage).toHaveAttribute('data-loading', 'lazy');
      expect(logoImage).toHaveAttribute('data-priority', 'false');
    });

    it('should have priority loading when priority prop is true', () => {
      render(<LinkListItem {...mockProps} priority={true} />);
      
      const logoImage = screen.getByAltText(/Test Company logo/);
      
      expect(logoImage).toHaveAttribute('data-loading', 'eager');
      expect(logoImage).toHaveAttribute('data-priority', 'true');
    });

    it('should render without errors', () => {
      expect(() => {
        render(<LinkListItem {...mockProps} />);
      }).not.toThrow();
    });
  });

  describe('RouteTransfer Component', () => {
    const mockProps = {
      heading: 'Test Route',
      transferStats: {
        departure: 'Test Airport',
        distance: '100km',
        eta: '2h',
        cost: '€100',
      },
      transferDescription: 'Test description',
      mapImageAlt: 'Test map',
    };

    it('should have lazy loading for route images', () => {
      render(<RouteTransfer {...mockProps} />);
      
      const mapImage = screen.getByAltText('Test map');
      
      expect(mapImage).toHaveAttribute('loading', 'lazy');
      expect(mapImage).toHaveAttribute('fetchPriority', 'low');
    });

    it('should render without errors', () => {
      expect(() => {
        render(<RouteTransfer {...mockProps} />);
      }).not.toThrow();
    });
  });

  describe('PageHero Component', () => {
    const mockProps = {
      heading: 'Test Heading',
      description: 'Test description',
      imageAlt: 'Test image',
    };

    it('should have priority loading by default', () => {
      render(<PageHero {...mockProps} />);
      
      const heroImage = screen.getByAltText('Test image');
      
      expect(heroImage).toHaveAttribute('data-priority', 'true');
    });

    it('should allow priority to be disabled', () => {
      render(<PageHero {...mockProps} priority={false} />);
      
      const heroImage = screen.getByAltText('Test image');
      
      expect(heroImage).toHaveAttribute('data-priority', 'false');
    });

    it('should render without errors', () => {
      expect(() => {
        render(<PageHero {...mockProps} />);
      }).not.toThrow();
    });
  });

  describe('Performance Attributes Validation', () => {
    it('should validate all image components have proper loading attributes', () => {
      const mockOnQuoteClick = jest.fn();
      const mockLinkProps = {
        logo: 'test-logo',
        companyName: 'Test Company',
        url: 'https://test.com',
      };
      const mockRouteProps = {
        heading: 'Test Route',
        transferStats: {
          departure: 'Test Airport',
          distance: '100km',
          eta: '2h',
          cost: '€100',
        },
        transferDescription: 'Test description',
        mapImageAlt: 'Test map',
      };
      const mockPageHeroProps = {
        heading: 'Test Heading',
        description: 'Test description',
        imageAlt: 'Test image',
      };

      // Render all components
      render(<PageHeroHome onQuoteClick={mockOnQuoteClick} />);
      render(<LinkListItem {...mockLinkProps} />);
      render(<RouteTransfer {...mockRouteProps} />);
      render(<PageHero {...mockPageHeroProps} />);

      // Check that all images have loading attributes
      const allImages = screen.getAllByRole('img');
      allImages.forEach((image) => {
        expect(image).toHaveAttribute('loading');
      });
    });
  });
});

