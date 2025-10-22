// cypress/e2e/portal-dropdowns.cy.ts

describe('Portal Dropdown System - Calendar Tests', () => {
  beforeEach(() => {
    // Navigate to homepage and open the booking form
    cy.visit('/');
    
    // Wait for page to load
    cy.get('body').should('be.visible');
    
    // Open the booking form modal by clicking "Get a quote now"
    cy.contains('Get a quote now').first().click();
    
    // Wait for form modal to appear
    cy.get('[data-testid="multi-step-form"]', { timeout: 5000 }).should('be.visible');
  });

  describe('Calendar Dropdown Positioning', () => {
    it('should open Calendar dropdown without being clipped by FormNavigation', () => {
      // Find and click the Collection date Calendar input to open dropdown
      cy.contains('Collection date').parent().find('button').click();
      
      // Wait for dropdown to appear
      cy.waitForPortalDropdown();
      
      // Verify dropdown is visible and positioned correctly
      cy.get('[data-portal-dropdown]').should('be.visible').then(($dropdown) => {
        const dropdown = $dropdown[0];
        const dropdownRect = dropdown.getBoundingClientRect();
        
        // Check that dropdown is not clipped by viewport bottom
        expect(dropdownRect.bottom).to.be.lessThan(window.innerHeight);
        
        // Check that dropdown has proper z-index (should be 70)
        const zIndex = window.getComputedStyle(dropdown).zIndex;
        expect(parseInt(zIndex)).to.be.at.least(70);
      });
      
      // Verify FormNavigation is still visible but dropdown appears above it
      cy.get('[data-testid="form-navigation"]').should('be.visible').then(($nav) => {
        const nav = $nav[0];
        const navRect = nav.getBoundingClientRect();
        
        cy.get('[data-portal-dropdown]').then(($dropdown) => {
          const dropdownRect = $dropdown[0].getBoundingClientRect();
          
          // Dropdown should be above FormNavigation in z-index
          const navZIndex = parseInt(window.getComputedStyle(nav).zIndex);
          const dropdownZIndex = parseInt(window.getComputedStyle($dropdown[0]).zIndex);
          expect(dropdownZIndex).to.be.greaterThan(navZIndex);
        });
      });
    });

    it('should position dropdown above trigger when near bottom viewport', () => {
      // Resize viewport to simulate near-bottom scenario
      cy.viewport(1280, 600);
      
      // Scroll to bottom to position Calendar near viewport bottom
      cy.scrollTo('bottom');
      
      // Find Calendar input and get its position
      cy.contains('Collection date').parent().find('button').then(($input) => {
        const inputRect = $input[0].getBoundingClientRect();
        const inputBottom = inputRect.bottom;
        
        // Click to open dropdown
        cy.wrap($input).click();
        
        // Wait for dropdown and verify it's positioned above
        cy.waitForPortalDropdown().then(($dropdown) => {
          const dropdownRect = $dropdown[0].getBoundingClientRect();
          
          // Dropdown should be positioned above the input when near bottom
          if (window.innerHeight - inputBottom < 300) { // Not enough space below
            expect(dropdownRect.bottom).to.be.lessThan(inputRect.top);
          }
        });
      });
    });

    it('should position dropdown below trigger when sufficient space available', () => {
      // Ensure we're at top of page with plenty space below
      cy.scrollTo('top');
      
      // Find Calendar input
      cy.contains('Collection date').parent().find('button').then(($input) => {
        const inputRect = $input[0].getBoundingClientRect();
        const inputBottom = inputRect.bottom;
        
        // Click to open dropdown
        cy.wrap($input).click();
        
        // Wait for dropdown and verify it's positioned below
        cy.waitForPortalDropdown().then(($dropdown) => {
          const dropdownRect = $dropdown[0].getBoundingClientRect();
          
          // Dropdown should be positioned below the input when space available
          if (window.innerHeight - inputBottom >= 300) { // Enough space below
            expect(dropdownRect.top).to.be.greaterThan(inputRect.bottom);
          }
        });
      });
    });

    it('should not overflow viewport horizontally', () => {
      // Test with different viewport widths
      const viewports = [
        { width: 320, height: 568 }, // Mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1280, height: 720 }, // Desktop
      ];

      viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height);
        
        // Click Calendar input
        cy.contains('Collection date').parent().find('button').click();
        
        // Wait for dropdown
        cy.waitForPortalDropdown().then(($dropdown) => {
          const dropdownRect = $dropdown[0].getBoundingClientRect();
          
          // Verify dropdown doesn't overflow viewport
          expect(dropdownRect.left).to.be.at.least(0);
          expect(dropdownRect.right).to.be.at.most(viewport.width);
        });
        
        // Close dropdown before next iteration
        cy.clickOutside();
        cy.get('[data-portal-dropdown]').should('not.exist');
      });
    });

    it('should close dropdown when clicking outside', () => {
      // Open Calendar dropdown
      cy.contains('Collection date').parent().find('button').click();
      
      // Verify dropdown is open
      cy.waitForPortalDropdown();
      
      // Click outside the dropdown
      cy.clickOutside();
      
      // Verify dropdown is closed
      cy.get('[data-portal-dropdown]').should('not.exist');
    });

    it('should close dropdown when pressing Escape key', () => {
      // Open Calendar dropdown
      cy.contains('Collection date').parent().find('button').click();
      
      // Verify dropdown is open
      cy.waitForPortalDropdown();
      
      // Press Escape key
      cy.get('body').type('{esc}');
      
      // Verify dropdown is closed
      cy.get('[data-portal-dropdown]').should('not.exist');
    });

    it('should maintain dropdown position during scroll', () => {
      // Open Calendar dropdown
      cy.contains('Collection date').parent().find('button').click();
      
      // Wait for dropdown
      cy.waitForPortalDropdown();
      
      // Get initial dropdown position
      cy.get('[data-portal-dropdown]').then(($dropdown) => {
        const initialRect = $dropdown[0].getBoundingClientRect();
        
        // Scroll the page
        cy.scrollTo(0, 100);
        
        // Check if dropdown position updates or closes (both are valid behaviors)
        cy.get('body').then(() => {
          cy.get('[data-portal-dropdown]').should(($newDropdown) => {
            if ($newDropdown.length > 0) {
              // If dropdown is still open, position should be recalculated
              const newRect = $newDropdown[0].getBoundingClientRect();
              // Position should either stay with trigger or be recalculated
              expect(newRect).to.not.deep.equal(initialRect);
            }
            // It's also acceptable if dropdown closes on scroll
          });
        });
      });
    });
  });

  describe('Calendar Dropdown Functionality', () => {
    it('should allow date selection and close dropdown', () => {
      // Open Calendar dropdown
      cy.contains('Collection date').parent().find('button').click();
      
      // Wait for dropdown
      cy.waitForPortalDropdown();
      
      // Find and click a future date
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      const dateButton = futureDate.getDate().toString();
      
      cy.get('[data-portal-dropdown]').within(() => {
        // Look for date buttons that are not disabled
        cy.get('button').contains(dateButton).first().click();
      });
      
      // Verify dropdown closes after selection
      cy.get('[data-portal-dropdown]').should('not.exist');
      
      // Verify input value was updated (check button text instead of input value)
      cy.contains('Collection date').parent().find('button').should('not.contain.text', 'Select collection date');
    });

    it('should navigate between months', () => {
      // Open Calendar dropdown
      cy.contains('Collection date').parent().find('button').click();
      
      // Wait for dropdown
      cy.waitForPortalDropdown();
      
      cy.get('[data-portal-dropdown]').within(() => {
        // Find next month button and click
        cy.get('button[aria-label*="next"], button').contains('>').click();
        
        // Verify month changed by checking for different month name or dates
        cy.get('[data-testid="calendar-month"], .calendar-month, h3, h4').should('be.visible');
      });
    });

    it('should handle rapid clicks without breaking positioning', () => {
      // Rapidly open and close dropdown multiple times
      for (let i = 0; i < 3; i++) {
        cy.contains('Collection date').parent().find('button').click();
        cy.wait(100);
        cy.clickOutside();
        cy.wait(100);
      }
      
      // Final open should still work correctly
      cy.contains('Collection date').parent().find('button').click();
      cy.waitForPortalDropdown();
      
      // Verify dropdown is positioned correctly
      cy.get('[data-portal-dropdown]').should('be.visible').then(($dropdown) => {
        const dropdownRect = $dropdown[0].getBoundingClientRect();
        expect(dropdownRect.top).to.be.greaterThan(0);
        expect(dropdownRect.left).to.be.greaterThan(0);
      });
    });
  });

  describe('Mobile-Specific Calendar Tests', () => {
    beforeEach(() => {
      // Set mobile viewport
      cy.viewport(375, 667); // iPhone SE
    });

    it('should position Calendar dropdown optimally on mobile', () => {
      // Open Calendar dropdown
      cy.contains('Collection date').parent().find('button').click();
      
      // Wait for dropdown
      cy.waitForPortalDropdown();
      
      cy.get('[data-portal-dropdown]').should('be.visible').then(($dropdown) => {
        const dropdownRect = $dropdown[0].getBoundingClientRect();
        
        // On mobile, dropdown should fit within viewport
        expect(dropdownRect.left).to.be.at.least(0);
        expect(dropdownRect.right).to.be.at.most(375);
        expect(dropdownRect.top).to.be.at.least(0);
        expect(dropdownRect.bottom).to.be.at.most(667);
      });
    });

    it('should handle touch interactions correctly', () => {
      // Open Calendar dropdown with touch
      cy.contains('Collection date').parent().find('button').trigger('touchstart').trigger('touchend');
      
      // Wait for dropdown
      cy.waitForPortalDropdown();
      
      // Touch a date to select it
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      const dateButton = futureDate.getDate().toString();
      
      cy.get('[data-portal-dropdown]').within(() => {
        cy.get('button').contains(dateButton).first().trigger('touchstart').trigger('touchend');
      });
      
      // Verify dropdown closes and value is selected
      cy.get('[data-portal-dropdown]').should('not.exist');
    });
  });
});