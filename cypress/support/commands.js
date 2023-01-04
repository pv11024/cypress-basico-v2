Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Patrick')
    cy.get('#lastName').type('Vieira')
    cy.get('#email').type('patrick_zardo@hotmail.com')
    cy.get('#open-text-area').type('Teste Cypress')
    cy.contains('button','Enviar').click()
    cy.get('.success').should('be.visible')

})
