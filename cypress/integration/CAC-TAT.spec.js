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

    
    it('Validar que, se um valor não-numérico for digitado, seu valor continuará vazio', function() {    
        cy.get('#firstName').type('Eliakim')
        cy.get('#lastName').type('Cordeiro')
        cy.get('#phone').type('teste')
        cy.get('#email').type('eliakim@teste.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').contains('Enviar').click()

        cy.get('#phone').should('have.text', '')
        cy.get('#phone').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {    
        cy.get('#firstName').type('Eliakim')
        cy.get('#lastName').type('Cordeiro')
        cy.get('#email').type('eliakim@teste.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })


    it('Preencha e limpe os campos nome, sobrenome, email e telefone', function() {    
        cy.get('#firstName').type('Eliakim').should('have.value','Eliakim').clear().should('have.value','')
        cy.get('#lastName').type('Cordeiro').should('have.value','Cordeiro').clear().should('have.value','')
        cy.get('#phone').type('81998092962').should('have.value','81998092962').clear().should('have.value','')
        cy.get('#email').type('eliakim@teste.com').should('have.value','eliakim@teste.com').clear().should('have.value','')
        cy.get('#open-text-area').type('Teste').should('have.value','Teste').clear().should('have.value','')

    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {    

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Fazer login os campos obrigatório com comando customizado', function() {    

        cy.fillMandatoryFieldsAndSubmit()

  })
  

  it('Fazer login utilizando o comando contains para botão', function() {    

    cy.get('#firstName').type('Eliakim')
    cy.get('#lastName').type('Cordeiro')
    cy.get('#email').type('eliakim@teste.com')
    cy.get('#open-text-area').type('texto')
    cy.contains('Enviar').click()

    cy.get('.success').should('be.visible')


})

it('Seleciona um produto (YouTube) por seu texto num combo simples', function() {    

    cy.get('#product').select('YouTube').should('have.value', 'youtube')

})

it('Seleciona um produto (Mentoria) por seu valor (value)', function() {    

    cy.get('#product').select('mentoria').should('have.value', 'mentoria')

})

it('seleciona um produto (Blog) por seu índice', function() {    

    cy.get('#product').select(1).should('have.value', 'blog')

})

it('seleciona um produto (Blog) por seu índice', function() {    

    cy.get('#product').select(1).should('have.value', 'blog')

})

it('marca o tipo de atendimento "Feedback"', function() {    

    cy.get('input[value="feedback"]').check().should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check().should('have.value','elogio')

})

it('marca cada tipo de atendimento', function() {    

    cy.get('input[type="radio"]').should('have.length',3)
    .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })

})

it('Interagir com o checkbox', function() {    

    cy.get('#email-checkbox').check().should('be.checked')
    cy.get('#email-checkbox').uncheck().should('be.empty')
    cy.get('#phone-checkbox').check().should('be.checked')
    cy.get('input[type="checkbox"]').last().uncheck()
    .should('be.empty')

    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')

})

it('seleciona um arquivo da pasta fixtures do Cypress e validar que nome correto do arquivo é persistido no objeto de files do input',
     function() {    

    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
    .then(input=> {
        expect(input[0].files[0].name).to.equals('example.json')
    })
})

it('seleciona um arquivo simulando um drag-and-drop e validar que nome correto do arquivo é persistido no objeto de files do input',
     function() {    

    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .then(input=> {
        expect(input[0].files[0].name).to.equals('example.json')
    })
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias e validar que nome correto do arquivo é persistido no objeto de files do input',
     function() {    

    cy.fixture('example.json').as('exampleFile')    
    cy.get('#file-upload').selectFile('@exampleFile')
    .then(input=> {
        expect(input[0].files[0].name).to.equals('example.json')
    })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',
     function() {          
    cy.get('#privacy a').should('have.attr', 'target','_blank')
 
    })

it('acessa a página da política de privacidade removendo o target e então clicando no link',
    function() {          
   cy.get('#privacy a').invoke('removeAttr', 'target').click()

   })

   it.only('testa a página da política de privacidade de forma independente',
    function() {          
   cy.get('#privacy a').invoke('removeAttr', 'target').click()
   cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade') 

   cy.contains('Talking About Testing').should('be.visible')

   })

})




























