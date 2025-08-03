# Terms and Conditions Page Implementation

## Overview

This document outlines the implementation of the Terms and Conditions page for the AET Ski website, featuring a responsive side navigation component that adapts from desktop to mobile layouts.

## Components Created

### 1. SideNavigation Component (`src/components/SideNavigation.tsx`)

A responsive navigation component that provides:
- **Desktop**: Sticky side navigation with numbered sections (scrolls for 84px, then becomes fixed)
- **Mobile**: Accordion-style dropdown navigation
- **Tablet**: Responsive layout that adapts between desktop and mobile

#### Features:
- **GSAP-powered sticky behavior**: Smooth transitions between scroll states with no jumping
- **Boundary-aware**: Sticky behavior ends exactly at the download button
- **Width consistency**: Maintains consistent width during position transitions
- **Performance optimized**: Uses GSAP ScrollTrigger for smooth animations
- **Responsive**: Disabled on mobile devices with window resize handling
- **Mobile navigation**: Fixed navigation on mobile devices
- **Scroll spy functionality**: Automatically highlights active navigation items while scrolling
- **Smart scroll anchoring**: Sections are positioned in the middle of viewport when clicked
- Smooth scrolling to sections
- Active state management
- Hover effects and transitions
- Accessibility compliant
- TypeScript support

#### Props:
```typescript
interface SideNavigationProps {
  items: NavigationItem[];
  onItemClick: (id: string) => void;
  className?: string;
}

interface NavigationItem {
  id: string;
  number: string;
  title: string;
  isActive?: boolean;
}
```

### 2. Terms Page (`src/app/terms/page.tsx`)

The main Terms and Conditions page featuring:
- **Fixed Navigation**: Site navigation is fixed at the top with proper spacing
- **Sticky Side Navigation**: GSAP-powered sticky behavior with 84px trigger offset
- **Responsive grid layout**: (4/8 columns on desktop, 3/5 on tablet, full width on mobile)
- **All 11 sections** of AET's terms and conditions
- **Download PDF button** (placeholder for future implementation)
- **Smooth scrolling navigation** with side navigation component
- **Footer integration** with proper links and company information
- **Clean header** without white background, matching the page background

### 3. Sticky Navigation Hook (`src/hooks/useStickyNavigation.ts`)

A custom hook that provides:
- **GSAP ScrollTrigger integration** for smooth sticky behavior
- **Boundary detection** that ends sticky behavior at the download button
- **Width consistency** during position transitions to prevent layout shifts
- **Responsive behavior** (disabled on mobile devices) with window resize handling
- **Performance optimizations** with fast scroll end and overlap prevention
- **Cleanup handling** for proper memory management
- **Mobile navigation support** with fixed positioning on all devices

### 4. Scroll Spy Implementation

The Terms page includes:
- **Intersection Observer API** for efficient scroll detection
- **Smart threshold detection** that triggers when sections are in the middle of viewport
- **Automatic active state updates** for navigation items
- **Proper cleanup** to prevent memory leaks

## Design System Integration

### New Tokens Added

#### Layout Tokens:
```json
{
  "layout": {
    "component": {
      "sideNavigation": {
        "desktop": {
          "width": "409px",
          "columns": 4
        },
        "tablet": {
          "columns": 3
        },
        "mobile": {
          "height": "auto"
        },
        "padding": "32px 28px",
        "gap": "28px",
        "itemGap": "16px",
        "itemPadding": "0px",
        "itemGapHorizontal": "8px"
      }
    },
    "span": {
      "sideNavigation": {
        "mobile": 4,
        "tablet": 3,
        "desktop": 4
      },
      "content": {
        "mobile": 4,
        "tablet": 5,
        "desktop": 6
      }
    }
  }
}
```

#### Component Definition:
```json
{
  "components": {
    "sideNavigation": {
      "default": {
        "consumes": [
          "color.background.secondary",
          "color.text.primary",
          "color.text.secondary",
          "borderRadius.md",
          "typography.fontFamily.body",
          "typography.fontWeight.bold",
          "typography.fontWeight.medium",
          "typography.fontSize.lg",
          "typography.fontSize.base",
          "typography.lineHeight.relaxed",
          "typography.letterSpacing.button",
          "layout.component.sideNavigation.padding",
          "layout.component.sideNavigation.gap",
          "layout.component.sideNavigation.itemGap",
          "layout.component.sideNavigation.itemPadding",
          "layout.component.sideNavigation.itemGapHorizontal",
          "elevation.md",
          "animation.duration.fast",
          "animation.easing.easeInOut"
        ]
      }
    }
  }
}
```

## Responsive Behavior

### Desktop (≥1024px)
- Side navigation: 4 columns, fixed position
- Content: 6 columns, scrollable
- Navigation items: Horizontal layout with numbers and titles

### Tablet (768px - 1023px)
- Side navigation: 3 columns
- Content: 5 columns
- Same navigation behavior as desktop

### Mobile (<768px)
- Side navigation: Full width, accordion style
- Content: Full width, below navigation
- Navigation: Dropdown with current selection displayed

## Content Structure

The page contains 11 sections of AET's terms and conditions:

1. **Definitions** - Key terms and definitions
2. **Bookings and reservations** - Booking process and requirements
3. **Cancellations/Refunds/Credits** - Cancellation policies and refunds
4. **Data security and privacy** - Data handling and privacy
5. **Flight Delays, Cancellations and Diversions** - Flight-related policies
6. **Property and Baggage** - Luggage and property policies
7. **Baby, Child, and Booster Seats** - Child seat requirements
8. **Failure to provide confirmed Services due to reasons out of AET's control** - Force majeure situations
9. **Failure to provide confirmed Services due to reasons within AET's control** - Service failures
10. **Damage and Soiling of Vehicles** - Vehicle damage policies
11. **Refusal of Carriage** - Passenger conduct and refusal policies

## Technical Implementation

### Key Features:
- **TypeScript**: Fully typed components and interfaces
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized rendering with React hooks
- **SEO**: Semantic HTML structure

### File Structure:
```
src/
├── app/
│   └── terms/
│       └── page.tsx          # Main terms page with navigation and footer
├── components/
│   ├── SideNavigation.tsx    # Side navigation component
│   ├── Navigation.tsx        # Fixed site navigation
│   └── Footer.tsx            # Site footer
├── hooks/
│   └── useStickyNavigation.ts # GSAP-powered sticky navigation hook
└── tokens.json              # Updated design tokens
```

## Integration Points

### Footer Integration:
The footer already contains a link to `/terms` for "Terms & Conditions", so no additional integration is needed.

### Navigation:
The side navigation component can be reused in other pages that require similar navigation patterns.

## Future Enhancements

### PDF Download:
The download button is currently a placeholder. Future implementation should:
- Generate PDF from the terms content
- Include proper formatting and styling
- Handle download progress and errors

### Analytics:
Consider adding analytics tracking for:
- Section navigation usage
- PDF downloads
- Time spent on page

### SEO Optimization:
- Add meta tags for better search engine visibility
- Implement structured data for legal documents
- Add breadcrumb navigation

## Testing

### Manual Testing Checklist:
- [x] Page loads correctly at `/terms`
- [x] **Fixed navigation displays at the top on all devices**:
  - [x] Desktop navigation fixed at top
  - [x] Mobile navigation fixed at top
  - [x] Proper spacing for both mobile and desktop
- [x] Side navigation displays on desktop
- [x] **Sticky navigation behavior works correctly**:
  - [x] Scrolls normally for first 84px
  - [x] Becomes fixed after 84px scroll
  - [x] **No jumping during transitions**
  - [x] **Ends sticky behavior at download button**
  - [x] **Maintains consistent width during transitions**
  - [x] Smooth transitions between states
- [x] **Scroll anchoring works correctly**:
  - [x] Section numbers are visible when clicked
  - [x] Sections are positioned in middle of viewport
  - [x] Proper offset accounts for fixed header
- [x] **Scroll spy functionality works**:
  - [x] Navigation items highlight while scrolling
  - [x] Active state updates automatically
  - [x] Intersection Observer works efficiently
- [x] Accordion navigation works on mobile
- [x] Smooth scrolling to sections
- [x] Active state updates correctly
- [x] Responsive breakpoints work
- [x] Download button is present
- [x] Footer displays correctly with all links
- [x] Header has no white background
- [x] **Window resize handling works correctly**

### Automated Testing:
- TypeScript compilation passes
- ESLint passes (no errors in terms page)
- Page is accessible via HTTP 200

## Browser Support

The implementation uses modern CSS features and should work in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- Components are optimized for React 18
- CSS uses Tailwind's purge optimization
- Images and assets are optimized via Next.js
- Lazy loading implemented for better performance

## Accessibility

- Proper heading hierarchy (h1, h2)
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## Maintenance

### Updating Content:
To update the terms and conditions content, modify the `termsSections` array in `src/app/terms/page.tsx`.

### Styling Changes:
Use the design tokens in `tokens.json` for consistent styling across the application.

### Adding New Sections:
1. Add new section to `termsSections` array
2. Update navigation items automatically
3. Ensure proper ID for anchor links

## Conclusion

The Terms and Conditions page implementation provides a professional, accessible, and responsive solution that matches the AET brand guidelines and provides an excellent user experience across all devices. 