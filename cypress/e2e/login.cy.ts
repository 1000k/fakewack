describe('Login Page', () => {
  it('should be redirected to the login page unless already logged in', () => {
    cy.visit('/');
    cy.url().should('include', '/signin');
  });

  it('should log in with dummy credentials', () => {
    cy.visit('/signin');
    cy.get('[data-test="dummy_signin"]').click();

    cy.get('#input-password-for-password-provider').type('password');
    cy.get('#submitButton').click();

    cy.url().should('include', '/');

    cy.get('[data-test="header-username"]').should('contain', 'Bob Alice');
  });
});
