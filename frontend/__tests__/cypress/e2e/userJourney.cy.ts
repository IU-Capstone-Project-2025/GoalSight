// Cypress E2E tests: user journey and navigation for main app flows

describe('User journey: Home → Tournament → Prediction', () => {
  it('Navigates from Home to Tournament and gets prediction', () => {
    // Visit the home page
    cy.visit('/');

    // Check that the home page displays key elements
    cy.contains('FIFA CLUB WORLD CUP 2025');
    cy.contains('NEXT MATCH');
    cy.contains('vs');

    // Navigate to the Tournament page via the navigation bar
    cy.get('nav').contains(/tournament/i).click();

    // Verify we are on the tournaments page
    cy.url().should('include', '/tournaments');
    cy.contains('The ultimate football championship');

    // Wait for the list of teams to appear
    cy.get('[data-cy=team-item]').should('have.length.greaterThan', 1);

    // Select the first two teams using their checkboxes
    cy.get('[data-cy^="team-checkbox-"]').eq(0).check({ force: true });
    cy.get('[data-cy^="team-checkbox-"]').eq(1).check({ force: true });

    // Wait for the prediction panel to appear
    cy.get('[data-cy="prediction-panel"]').should('exist');

    // Check that prediction percentages are displayed for both teams
    cy.get('[data-cy="team1-chance"]').should('contain.text', '%');
    cy.get('[data-cy="team2-chance"]').should('contain.text', '%');
  });
});


describe('Navigation', () => {
  it('Should navigate between Home and Tournament', () => {
    // Visit the home page
    cy.visit('/');

    // Navigate to Tournament and check URL
    cy.get('nav').contains(/tournament/i).click();
    cy.url().should('include', '/tournament');

    // Navigate back to Home and check URL
    cy.get('nav').contains(/home/i).click();
    cy.url().should('include', '/');
  });
});