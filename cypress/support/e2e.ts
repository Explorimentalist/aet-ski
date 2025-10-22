// cypress/support/e2e.ts

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add global types for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      waitForPortalDropdown(): Chainable<JQuery<HTMLElement>>;
      clickOutside(): Chainable<void>;
    }
  }
}