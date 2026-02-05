/*
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Cannot read properties of null') &&
      err.message.includes('charAt')) {
    return false
  }
  
})
*/
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Cannot read properties of null") ||
    err.message.includes("charAt")
  ) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("2006lrnrgr");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

  context("Validações gerais do fluxo de e-mails", () => {

      it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(10)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
   });
/*
   it('Fazer incrição no Treinamento gratuito sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
       cy.get(':nth-child(1) > .card-container a.ng-scope > .showcase-card-container', { timeout: 60000 })
  .filter(':visible')
  .eq(0)
  .scrollIntoView()
  .click({ force: true })


        //Clica em comprar
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it('Compra o Treinamento pago á vista sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
       cy.get(':nth-child(1) > .card-container a.ng-scope > .showcase-card-container', { timeout: 60000 })
  .filter(':visible')
  .eq(1)
  .scrollIntoView()
  .click({ force: true })


        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });
*/


 it('Treinamento pago com recorrência sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
       cy.get('.card-container a.ng-scope > .showcase-card-container', { timeout: 60000 })
  .filter(':visible')
  .eq(2)
  .scrollIntoView()
  .click({ force: true });

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();


        
    });

  });
});