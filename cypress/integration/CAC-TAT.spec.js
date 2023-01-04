/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function()   {
     cy.visit('./src/index.html')

    })
   
    it('verifica o título da aplicação', function() {
     cy.title().should('be.equal','Central de Atendimento ao Cliente')
  
    })



    it('Preenche os campos obrigatórios e envia o formulário', function() {

        const longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,'
        cy.get('#firstName').type('Patrick')
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('patrick_zardo@hotmail.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')

    })


    it('Exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function() {

    cy.get('#firstName').type('Patrick')
    cy.get('#lastName').type('Vieira')
    cy.get('#email').type('patrick_zardo@hotmail,com')
    cy.get('#open-text-area').type('Teste Cypress')
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')

})


    it('Campo telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value','')

})

it('Campo telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Patrick')
    cy.get('#lastName').type('Vieira')
    cy.get('#email').type('patrick_zardo@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste Cypress')
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
    
})


it('Preenche e limpa os campos nome, sobrenome, e-mail e telefone', function() {
    cy.get('#firstName')
    .type('Patrick')
    .should('have.value','Patrick')
    .clear()
    .should('have.value','')

    cy.get('#lastName')
    .type('Vieira')
    .should('have.value','Vieira')
    .clear()
    .should('have.value','')

    cy.get('#email')
    .type('patrick_zardo@hotmail.com')
    .should('have.value','patrick_zardo@hotmail.com')
    .clear()
    .should('have.value','')

    cy.get('#phone')
    .type('51985684737')
    .should('have.value','51985684737')
    .clear()
    .should('have.value','')

    cy.get('#open-text-area')
    .type('Teste Cypress')
    .should('have.value','Teste Cypress')
    .clear()
    .should('have.value','')

})

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        

})

    it('Envia o formulário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
    
    
 })

    it('Seleciona o produto (Youtube) por seu texto', function() {
    cy.get('#product')
    .select('YouTube')
    .should('have.value','youtube')
})

    it('Seleciona o produto (Mentoria) por seu valor', function() {
    cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
})

    it('Seleciona o produto (Blog) pelo seu índice', function() {
    cy.get('#product')
        .select(1)
        .should('have.value','blog')
})


    it('Marca o tipo de atendimento "Feedback', function() {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value','feedback')
})

    it('Marca cada tipo de atendimento', function() {
     cy.get('input[type="radio"')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')

    })



    it('Seleciona um arquivo da pasta Fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        
        })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json' ,{action: 'drag-drop'})
        .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    
        })
    })

    it('Seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function() {
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('input[type="file"]')
        .selectFile('@arquivoExemplo')
        .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    
        })
    })

    it('Verifica que ao clicar na política de privacidade, abre em outra aba sem necessidade de um clique', function() {
        cy.get('#privacy a')   
        .should ('have.attr', 'target', '_blank')
    })


    it('Acessa a página de política de privacidade removendo e então clicando no link', function() {
        cy.get('#privacy a')
         .invoke('removeAttr', 'target')
         .click() 
        cy.contains('Talking About Testing')
        .should('be.visible')
    })
})