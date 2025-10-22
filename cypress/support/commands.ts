// cypress/support/commands.ts

// Custom command to get elements by test ID
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Custom command to wait for portal dropdown to be visible
Cypress.Commands.add('waitForPortalDropdown', () => {
  return cy.get('[data-portal-dropdown]', { timeout: 2000 }).should('be.visible');
});

// Custom command to click outside any element
Cypress.Commands.add('clickOutside', () => {
  return cy.get('body').click(0, 0);
});