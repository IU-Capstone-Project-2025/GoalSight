describe('User journey: Home → Tournament → Prediction', () => {
  it('Navigates from Home to Tournament and gets prediction', () => {
    cy.visit('/');

    // Проверка домашней страницы
    cy.contains('2025 CLUB TOURNAMENT');
    cy.contains('NEXT MATCH');
    cy.contains('vs');

    // Навигация к турниру
    cy.get('nav').contains(/tournament/i).click();

    // Проверка что мы на турнирах
    cy.url().should('include', '/tournaments');
    cy.contains('The ultimate football championship');

    // Дожидаемся появления команд
    cy.get('[data-cy=team-item]').should('have.length.greaterThan', 1);

    // Кликаем по чекбоксам первых двух команд
    cy.get('[data-cy^="team-checkbox-"]').eq(0).check({ force: true });
    cy.get('[data-cy^="team-checkbox-"]').eq(1).check({ force: true });

    // Ждём появления панели предсказания
    cy.get('[data-cy="prediction-panel"]').should('exist');

    // Проверка процентов
    cy.get('[data-cy="team1-chance"]').should('contain.text', '%');
    cy.get('[data-cy="team2-chance"]').should('contain.text', '%');
  });
});


describe('Navigation', () => {
  it('Should navigate between Home and Tournament', () => {
    cy.visit('/');

    cy.get('nav').contains(/tournament/i).click();
    cy.url().should('include', '/tournament');

    cy.get('nav').contains(/home/i).click();
    cy.url().should('include', '/');
  });
});