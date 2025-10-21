## Relevant Files

- `src/hooks/usePortalDropdown.tsx` - Core hook for portal dropdown positioning and rendering logic (✅ Created - comprehensive hook with smart positioning, event handling, and fallback support)
- `src/hooks/usePortalDropdownErrorBoundary.tsx` - React error boundary component for portal dropdown failures (✅ Created)
- `src/utils/portalErrorRecovery.ts` - Error recovery utilities and strategies for portal operations (✅ Created)
- `src/utils/resizeObserver.ts` - Advanced resize observation utilities with mobile support (✅ Created)
- `src/hooks/usePortalDropdown.test.ts` - Unit tests for the portal dropdown hook (✅ Created - comprehensive test coverage for all hook functionality)
- `src/utils/positioning.test.ts` - Unit tests for positioning utilities (✅ Created - covers all positioning functions and edge cases)
- `src/utils/resizeObserver.test.ts` - Unit tests for resize observer utilities (✅ Created - tests mobile detection, orientation changes, and observer lifecycle)
- `src/utils/portalErrorRecovery.test.ts` - Unit tests for error recovery utilities (✅ Created - validates error handling strategies and recovery mechanisms)
- `src/components/Calendar.tsx` - Existing calendar component to migrate to portal system (✅ Migrated - now uses usePortalDropdown hook with smart positioning)
- `src/components/Calendar.test.tsx` - Updated tests for Calendar with portal behavior (✅ Created - comprehensive test suite with 26 passing tests)
- `src/components/TimeSelector.tsx` - Existing time selector component to migrate to portal system (✅ Migrated - now uses usePortalDropdown hook with smart positioning)
- `src/components/TimeSelector.test.tsx` - Updated tests for TimeSelector with portal behavior (✅ Created - comprehensive test suite with 37 passing tests)
- `src/utils/positioning.ts` - Utility functions for viewport calculations and positioning logic (✅ Created - comprehensive positioning utilities with SSR support)
- `src/utils/positioning.test.ts` - Unit tests for positioning utilities
- `src/types/dropdown.ts` - TypeScript interfaces for portal dropdown configuration (✅ Created - comprehensive interfaces for positioning, state, and configuration)
- `cypress/e2e/portal-dropdowns.cy.ts` - End-to-end tests for dropdown interactions across devices

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npm test` to run Jest tests. Running without a path executes all tests found by the Jest configuration.
- Use `npm run cypress:open` for interactive E2E testing or `npm run cypress:run` for headless execution.

## Tasks

- [x] 1.0 Create reusable portal dropdown hook with positioning logic
  - [x] 1.1 Create TypeScript interfaces for portal dropdown configuration in `src/types/dropdown.ts`
  - [x] 1.2 Implement viewport boundary detection utilities in `src/utils/positioning.ts`
  - [x] 1.3 Create `usePortalDropdown` hook in `src/hooks/usePortalDropdown.tsx` with smart positioning logic
  - [x] 1.4 Add error boundary handling with graceful fallback to inline positioning
  - [x] 1.5 Implement dynamic position recalculation on window resize
  - [x] 1.6 Add comprehensive unit tests for hook and utilities
  
- [x] 2.0 Migrate Calendar component to use portal dropdown system
  - [x] 2.1 Integrate `usePortalDropdown` hook into Calendar component
  - [x] 2.2 Replace existing absolute positioning with portal rendering at z-[70]
  - [x] 2.3 Preserve existing animations and styling while using portal
  - [x] 2.4 Ensure click-outside detection works with portal rendering
  - [x] 2.5 Test Calendar positioning edge cases (near viewport boundaries)
  - [x] 2.6 Update Calendar component tests to cover portal behavior

- [x] 3.0 Migrate TimeSelector component to use portal dropdown system
  - [x] 3.1 Integrate `usePortalDropdown` hook into TimeSelector component
  - [x] 3.2 Replace existing absolute positioning with portal rendering at z-[70]
  - [x] 3.3 Preserve existing scrollable time list functionality in portal
  - [x] 3.4 Ensure TimeSelector animations work correctly with portal
  - [x] 3.5 Test TimeSelector positioning with long time lists
  - [x] 3.6 Update TimeSelector component tests to cover portal behavior

- [ ] 4.0 Test and validate portal dropdown behavior across devices
  - [ ] 4.1 Create E2E tests for Calendar dropdown positioning scenarios
  - [ ] 4.2 Create E2E tests for TimeSelector dropdown positioning scenarios  
  - [ ] 4.3 Test dropdown behavior on mobile devices (touch interactions)
  - [ ] 4.4 Validate dropdown positioning with FormNavigation component visible
  - [ ] 4.5 Test window resize behavior while dropdowns are open
  - [ ] 4.6 Performance testing - ensure 60fps during positioning calculations

- [ ] 5.0 Document portal dropdown system for future components
  - [ ] 5.1 Create usage documentation in `src/hooks/usePortalDropdown.md`
  - [ ] 5.2 Add code examples for implementing portal dropdowns in new components
  - [ ] 5.3 Document mobile optimization patterns and touch-friendly implementations
  - [ ] 5.4 Create troubleshooting guide for common portal dropdown issues
  - [ ] 5.5 Update component library documentation with portal dropdown patterns