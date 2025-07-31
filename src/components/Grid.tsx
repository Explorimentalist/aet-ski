// src/components/Grid.tsx
import React from 'react';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  container?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  children,
  className = '',
  as: Component = 'div',
  container = false,
}) => {
  const baseClasses = [
    'grid',
    // Default 4-column mobile grid
    'grid-cols-mobile',
    'gap-grid-mobile',
    // 8-column tablet grid
    'tablet:grid-cols-tablet',
    'tablet:gap-grid-tablet',
    // 12-column desktop grid
    'desktop:grid-cols-desktop',
    'desktop:gap-grid-desktop',
  ].join(' ');

  const containerClasses = container ? 'container mx-auto' : '';
  
  return (
    <Component className={`${baseClasses} ${containerClasses} ${className}`}>
      {children}
    </Component>
  );
};

// Predefined layouts based on the design system
export const GridLayouts = {
  // Form fields: 6 cols centered on desktop, 6 cols offset 1 on tablet, full width on mobile
  formField: 'col-mobile-4 tablet:col-tablet-6 tablet:col-start-tablet-2 desktop:col-desktop-6 desktop:col-start-desktop-4',
  
  // Page hero layout
  heroHeading: 'col-mobile-4 tablet:col-tablet-4 desktop:col-desktop-4',
  heroBody: 'col-mobile-4 tablet:col-tablet-4 tablet:col-start-tablet-4 desktop:col-desktop-6 desktop:col-start-desktop-6',
  heroImage: 'col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12',
  
  // Cards
  largeCard: 'col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-4',
  smallCard: 'col-mobile-4 tablet:col-tablet-3 desktop:col-desktop-3',
  
  // Navigation
  siteNav: 'col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12',
  
  // Footer
  footer: 'col-mobile-4 tablet:col-tablet-8 desktop:col-desktop-12',
};