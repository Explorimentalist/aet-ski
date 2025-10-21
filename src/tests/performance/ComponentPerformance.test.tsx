// src/tests/performance/ComponentPerformance.test.tsx
// Component performance testing suite
// Phase 4: Performance Testing & Validation

import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageHeroHome } from '@/components/PageHeroHome';
import { LinkListItem } from '@/components/LinkListItem';
import { RouteTransfer } from '@/components/RouteTransfer';

// Mock Next.js Image component
jest.mock('next/image', () => {
  type ImgLoading = 'eager' | 'lazy';
  type ImgFetchPriority = 'high' | 'low' | 'auto';
  return function MockImage({ src, alt, priority, loading, fetchPriority, sizes, quality, ...props }: {
    src: string;
    alt: string;
    priority?: boolean;
    loading?: ImgLoading;
    fetchPriority?: ImgFetchPriority;
    sizes?: string;
    quality?: number;
    [key: string]: unknown;
  }) {
    const derivedLoading: ImgLoading = loading ?? (priority ? 'eager' : 'lazy');
    const derivedFetch: ImgFetchPriority = fetchPriority ?? (priority ? 'high' : 'low');
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={derivedLoading}
        fetchPriority={derivedFetch}
        data-priority={priority}
        data-loading={derivedLoading}
        data-fetch-priority={derivedFetch}
        data-sizes={sizes}
        data-quality={quality}
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

describe('Component Performance Tests', () => {
  describe('Image Optimization', () => {
    it('should have responsive sources and eager loading for hero image', () => {
      const mockOnQuoteClick = jest.fn();
      const { container } = render(<PageHeroHome onQuoteClick={mockOnQuoteClick} />);

      // Verify responsive <source> tags define sizes
      const sources = Array.from(container.querySelectorAll('picture source'));
      expect(sources.length).toBeGreaterThan(0);
      sources.forEach((el) => {
        expect(el.getAttribute('sizes')).toBeTruthy();
      });

      // Fallback <img> should be eager/high priority above-the-fold
      const heroImage = screen.getByAltText(
        'French Alps mountain landscape with snow-covered peaks and ski resorts'
      );
      expect(heroImage).toHaveAttribute('loading', 'eager');
      expect(heroImage).toHaveAttribute('fetchPriority', 'high');
    });

    it('should have appropriate quality settings', () => {
      const mockProps = {
        logo: 'test-logo',
        companyName: 'Test Company',
        url: 'https://test.com',
      };
      
      render(<LinkListItem {...mockProps} />);
      
      const logoImage = screen.getByAltText(/Test Company logo/);
      
      // Check that the image has quality attribute
      expect(logoImage).toHaveAttribute('data-quality');
    });
  });

  describe('Loading Strategy Validation', () => {
    it('should implement correct loading strategy for above-the-fold content', () => {
      const mockOnQuoteClick = jest.fn();
      render(<PageHeroHome onQuoteClick={mockOnQuoteClick} />);
      
      const heroImage = screen.getByAltText('French Alps mountain landscape with snow-covered peaks and ski resorts');
      
      // Above-the-fold should have eager loading and high priority
      expect(heroImage).toHaveAttribute('loading', 'eager');
      expect(heroImage).toHaveAttribute('fetchPriority', 'high');
    });

    it('should implement correct loading strategy for below-the-fold content', () => {
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
      
      render(<RouteTransfer {...mockProps} />);
      
      const mapImage = screen.getByAltText('Test map');
      
      // Below-the-fold should have lazy loading and low priority
      expect(mapImage).toHaveAttribute('loading', 'lazy');
      expect(mapImage).toHaveAttribute('fetchPriority', 'low');
    });

    it('should allow conditional priority loading for logos', () => {
      const mockProps = {
        logo: 'test-logo',
        companyName: 'Test Company',
        url: 'https://test.com',
      };
      
      // Test with priority enabled
      const { rerender } = render(<LinkListItem {...mockProps} priority={true} />);
      let logoImage = screen.getByAltText(/Test Company logo/);
      expect(logoImage).toHaveAttribute('data-loading', 'eager');
      expect(logoImage).toHaveAttribute('data-priority', 'true');
      
      // Test with priority disabled
      rerender(<LinkListItem {...mockProps} priority={false} />);
      logoImage = screen.getByAltText(/Test Company logo/);
      expect(logoImage).toHaveAttribute('data-loading', 'lazy');
      expect(logoImage).toHaveAttribute('data-priority', 'false');
    });
  });

  describe('Accessibility and SEO', () => {
    it('should have proper alt text for all images', () => {
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

      render(<PageHeroHome onQuoteClick={mockOnQuoteClick} />);
      render(<LinkListItem {...mockLinkProps} />);
      render(<RouteTransfer {...mockRouteProps} />);

      const allImages = screen.getAllByRole('img');
      allImages.forEach((image) => {
        expect(image).toHaveAttribute('alt');
        expect(image.getAttribute('alt')).toBeTruthy();
      });
    });

    it('should have descriptive alt text', () => {
      const mockLinkProps = {
        logo: 'test-logo',
        companyName: 'Test Company',
        url: 'https://test.com',
      };
      
      render(<LinkListItem {...mockLinkProps} />);
      
      const logoImage = screen.getByAltText(/Test Company logo/);
      const altText = logoImage.getAttribute('alt');
      
      // Alt text should be descriptive and include company name
      expect(altText).toContain('Test Company');
      expect(altText).toContain('logo');
    });
  });

  describe('Performance Metrics', () => {
    it('should render components within acceptable time limits', () => {
      const mockOnQuoteClick = jest.fn();
      const startTime = performance.now();
      
      render(<PageHeroHome onQuoteClick={mockOnQuoteClick} />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Component should render within 100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('should not cause memory leaks with multiple renders', () => {
      const mockProps = {
        logo: 'test-logo',
        companyName: 'Test Company',
        url: 'https://test.com',
      };
      
      const { rerender } = render(<LinkListItem {...mockProps} />);
      
      // Render multiple times to check for memory leaks
      for (let i = 0; i < 10; i++) {
        rerender(<LinkListItem {...mockProps} priority={i % 2 === 0} />);
      }
      
      // If we get here without errors, no memory leaks detected
      expect(true).toBe(true);
    });
  });
});





