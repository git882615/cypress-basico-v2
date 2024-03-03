/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
      })

    it('verifica o título da aplicação', function() {    
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('Preencher campos obrigatórios e enviar formulario', function() {    
        const textoLongo = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste'
        cy.get('#firstName').type('Eliakim')
        cy.get('#lastName').type('Cordeiro')
        cy.get('#email').type('eliakim@teste.com')
        cy.get('#open-text-area').type(textoLongo,{delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
        
    })

    it('Preencher campos obrigatórios com email INVALIDO e enviar formulario', function() {    
        cy.get('#firstName').type('Eliakim')
        cy.get('#lastName').type('Cordeiro')
        cy.get('#email').type('eliakim.invalido.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        
    })

    
    it.only('Validar que, se um valor não-numérico for digitado, seu valor continuará vazio', function() {    
        cy.get('#firstName').type('Eliakim')
        cy.get('#lastName').type('Cordeiro')
        cy.get('#phone').type('teste')
        cy.get('#email').type('eliakim@teste.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('#phone').should('have.text', '')
        cy.get('#phone').should('have.value', '')
    })
  })
  