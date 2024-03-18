Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    cy.get('#firstName').type('Eliakim')
    cy.get('#lastName').type('Cordeiro')
    cy.get('#email').type('eliakim@teste.com')
    cy.get('#open-text-area').type('texto')
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

})