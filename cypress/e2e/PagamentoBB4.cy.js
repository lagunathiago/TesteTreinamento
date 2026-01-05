/// <reference types="cypress" />

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("qualidade2@lectortec.com.br");
    cy.get("ng-transclude > .border").type("2006lrnrgr");
    cy.get('#btn-entrar').click();

});

  context("Aprovação ESMP", () => {
  it ("Gratuito sem aprrovação", () => {

//Clica no treinamento
    cy.get(
  ':nth-child(4) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container',
  { timeout: 60000 } // espera até 60s
)
  .should('be.visible')
  .scrollIntoView()
  .click();

  //Clica em Fazer incrição
  cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

  // 2) Clica em acessar
cy.contains('.classes-actions .btn-swipe-accent', 'Acessar', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click(); 

  //Espera 4 segundos
  cy.wait(4000);

  //Espera 4 segundos
    cy.wait(4000);

    //Clica em voltar
cy.get('#hideResource', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

  //Clica em concluido
  cy.get('.header > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();


  });

     


    
   });
});