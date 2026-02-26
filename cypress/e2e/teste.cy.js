Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  // Erros conhecidos do Angular / Front que não devem quebrar o teste
  if (
    msg.includes('Cannot read properties of null') ||
    msg.includes('charAt') ||
    msg.includes('writeText') ||
    msg.includes('Clipboard') ||
    msg.includes('Document is not focused')
  ) {
    return false; // ignora o erro e continua o teste
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("123");
    cy.get("#btn-entrar").click();
  });

  context("Criando Treinamento", { testIsolation: false }, () => {
    it("Aba Geral", () => {

      // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click({force: true});

      cy.wait(7000); //espera alguns segundos para carregar a pagina

      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})
    });

    
      it('Campo personalizado', () => {

        //Clica no treinamento
      cy.contains('.card-items', 'Teste Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

  //Clica em editar no treinamento
  cy.get('button[title="Editar treinamento"]', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

// Espera renderizar a área
cy.wait(2000);

//Clica em campo personalizado
        cy.get('[ui-sref="accessLink.content.courses.edit.id.custom"]', { timeout: 20000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

        //Clica em novo campo personalizado
        cy.get('button[ng-click="editCustomField()"]', { timeout: 20000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

//Ecreve campo personalizado
  cy.get('input[placeholder="Nome"]', { timeout: 20000 })
  .first() // garante apenas 1 input
  .scrollIntoView()
  .click({ force: true })
  .invoke('removeAttr', 'disabled') // remove o disabled
  .clear({ force: true })
  .type('Campo personalizado Cypress', { force: true, delay: 30 });

        //Botão adicionar
        cy.get('.custom-field-editor > :nth-child(4) > .end > .btn-swipe-accent')
        //Salva o treinamento com o campo personalizado
        cy.contains('button.btn-swipe-accent', 'Salvar')
  .should('be.visible')
  .click({ force: true });
   
  });
  });

});