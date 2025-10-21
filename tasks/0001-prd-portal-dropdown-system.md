# PRD: Portal Dropdown System for Form Components

## Introduction/Overview

Form dropdown components (Calendar, TimeSelector, Select/Autocomplete) are currently being clipped by the **FormNavigation component** (`src/components/FormNavigation.tsx`) which is positioned as `fixed bottom-0` with `z-[60]`. This component renders at the bottom of the viewport during form steps and creates a visual conflict where dropdown options are hidden behind the navigation bar. This creates a poor user experience where users cannot see or interact with dropdown options. This feature implements a portal-based dropdown system that renders dropdowns outside the DOM hierarchy to prevent clipping and ensures consistent positioning across all form components.

**Problem:** Dropdown components are visually blocked by the fixed FormNavigation element (z-[60]) at the bottom of the viewport, making them partially or completely unusable.

**Goal:** Implement a robust portal-based dropdown system that ensures all form dropdowns are always fully visible and accessible to users.

## Goals

1. **Eliminate Visual Conflicts:** Ensure no dropdown is ever clipped by the FormNavigation component or other UI elements
2. **Consistent Behavior:** Standardize dropdown positioning behavior across all form components  
3. **Responsive Design:** Provide optimal dropdown experience on both desktop and mobile devices
4. **Performance Optimization:** Maintain smooth interactions during positioning calculations
5. **Developer Experience:** Create reusable infrastructure for easy implementation across components

## User Stories

**As a user filling out a form:**
- I want to see all calendar date options when I click on a date field, so that I can easily select my preferred date
- I want time selector dropdowns to be fully visible, so that I can choose my time without scrolling or guessing
- I want consistent dropdown behavior across all form fields, so that the interface feels predictable and professional

**As a user on mobile:**
- I want form dropdowns to display optimally for my screen size, so that I can easily interact with options on touch devices
- I want dropdowns to not interfere with device navigation or keyboard, so that my form completion experience is smooth

**As a developer:**
- I want a reusable dropdown system, so that I can implement consistent behavior across new form components
- I want clear positioning logic, so that I can understand and maintain the dropdown behavior

## Functional Requirements

1. **Portal Rendering:** All form dropdown components must render their dropdown content using React portals to `document.body`
2. **Smart Positioning:** System must automatically detect available space and position dropdowns above or below the trigger element
3. **Z-Index Management:** All portal dropdowns must use a consistent, high z-index value (minimum z-[70]) to appear above the FormNavigation component (z-[60]) and all other UI elements
4. **Viewport Boundary Detection:** System must calculate viewport boundaries and trigger element position to determine optimal placement
5. **Automatic Flip Logic:** When insufficient space exists below trigger, dropdown must automatically flip to appear above the trigger
6. **Mobile Optimization:** On mobile devices, implement touch-friendly dropdown patterns (larger touch targets, appropriate sizing)
7. **Reusable Hook Implementation:** Create `usePortalDropdown` custom hook that encapsulates positioning logic and portal rendering
8. **Click Outside Handling:** Portal dropdowns must close when user clicks outside the dropdown area
9. **Keyboard Navigation:** Portal dropdowns must maintain existing keyboard accessibility (ESC to close, arrow navigation)
10. **Animation Preservation:** Existing dropdown animations and transitions must be preserved in portal implementation
11. **SSR Compatibility:** Portal implementation must include server-side rendering fallbacks
12. **Dynamic Positioning Updates:** Dropdowns must recalculate position if window is resized while open

## Non-Goals (Out of Scope)

- **Custom Dropdown Animations:** Will preserve existing animations rather than creating new ones
- **New Form Components:** Focus only on existing Calendar, TimeSelector, and Select components  
- **Drag and Drop:** Not implementing drag/drop interactions for dropdown items
- **Multi-Select Functionality:** Maintaining existing single-select behavior only
- **Internationalization:** Not addressing RTL or language-specific positioning in this iteration
- **Advanced Mobile Gestures:** Not implementing swipe-to-dismiss or gesture-based interactions

## Design Considerations

- **Consistent Styling:** Portal dropdowns must maintain existing component styling (borders, shadows, backgrounds)
- **Responsive Breakpoints:** Follow existing tablet/desktop breakpoint patterns for dropdown sizing
- **Visual Hierarchy:** Ensure portal dropdowns have appropriate elevation and don't interfere with other overlays
- **Focus Management:** Maintain clear visual focus indicators for accessibility
- **Loading States:** Consider positioning during async data loading in dropdowns

## Technical Considerations

- **Dependencies:** Requires React 16.8+ for hooks, existing `createPortal` from react-dom
- **Performance:** Position calculations should be throttled/debounced to prevent excessive re-renders
- **Memory Management:** Ensure proper cleanup of event listeners and portal elements
- **Integration Points:** Must work seamlessly with existing form validation and state management
- **Browser Compatibility:** Support modern browsers with portal rendering capabilities
- **Hook Architecture:** `usePortalDropdown` should return positioning props and portal render function
- **Fallback Strategy:** Include non-portal fallback for environments where portal rendering fails

## Success Metrics

1. **No Clipping Issues:** 0% of dropdown interactions result in clipped or hidden content
2. **Consistent Behavior:** 100% of form dropdown components use the same positioning system
3. **Performance Maintained:** Dropdown opening/positioning completes within 16ms (60fps)
4. **Accessibility Preserved:** All existing keyboard navigation and screen reader functionality works unchanged
5. **Cross-Device Compatibility:** Dropdowns work correctly on mobile, tablet, and desktop viewports
6. **Developer Adoption:** New form components can implement portal dropdowns using the hook within 5 minutes

## Implementation Decisions

### Resolved Open Questions:

1. **Animation Timing:** Position calculation will happen **before** dropdown animation starts to ensure smooth, flicker-free transitions
2. **Error Boundaries:** Follow React best practices - implement try/catch blocks around portal rendering with graceful fallback to inline positioning
3. **Testing Strategy:** Best practices include:
   - Unit tests for positioning calculations
   - Visual regression tests for different viewport sizes
   - E2E tests for dropdown interactions across devices
   - Edge case testing (window resize, scroll, multiple dropdowns)
4. **Bundle Size Impact:** Follow performance best practices - lazy load positioning logic, tree-shake unused utilities, target <5KB increase
5. **Legacy Component Migration:** Upgrade existing dropdowns immediately where possible to ensure consistent UX across all form components

---

**Implementation Plan:**
1. Create `usePortalDropdown` hook with positioning logic
2. Migrate Calendar component to use portal system
3. Migrate TimeSelector and other dropdown components
4. Add comprehensive testing suite
5. Document usage patterns for future components