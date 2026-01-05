/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('unselectable')) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("thiagosuporte@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');
  });

  context("Filtros", () => {
    
    it("Pesquisar Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Pesquisa
        cy.get('input[placeholder="Pesquisar treinamentos"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Teste', { delay: 50 });

  cy.wait(1000)
cy.get('.multiselect.ng-dirty > .btn').click()

    });

    it("Filtro Ordenação AZ/ZA", () => {
      
        
        //Clica em nome A/Z
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)
        
        //Z á A
        cy.get('.open > .ui-select-choices > :nth-child(2)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
        cy.wait(3000)

      //Clica em nome A/Z
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)

        //A á Z
cy.get('.open > .ui-select-choices > :nth-child(1)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

    });
     it("Filtro Mais Recente/Mias Antigo", () => {
        
        //Clica em nome A/Z
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)
        
        //Mais recente
        cy.get('.open > .ui-select-choices > :nth-child(3)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
        cy.wait(3000)

      //Clica em nome A/z
        cy.get('[ng-model="$parent.order"]').click()
        cy.wait(1000)

        //Mais antigo
cy.get('.open > .ui-select-choices > :nth-child(4)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
});

 it("Filtro Card", () => {
        
        //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(1000)
        
        //Miniaturas
        cy.get('.open > .ui-select-choices > :nth-child(3)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(12000)

      //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(2000)

        //somente capa
        cy.get('.open > .ui-select-choices > :nth-child(2)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(12000)

        //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(2000)

        //cartoes
        cy.get('.open > .ui-select-choices > :nth-child(1)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(12000)
        
        //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(2000)

        //cartoes
        cy.get('.open > .ui-select-choices > :nth-child(4)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(60000)

   });
  });
});
