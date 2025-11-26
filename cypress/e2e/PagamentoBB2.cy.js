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


  context("Teste Pagamento BB", () => {
    it("Entrando no carrorel", () => {
        
        //clicar em vitrine
        cy.get(':nth-child(6) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .click({ force: true });
      
    });

    it("Turma paga á vista sem aprovação", () => {
        //Clica no treinamento Turma paga á vista sem aprovação
        cy.get(':nth-child(1) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container').click()
        
        //Confirma o valor de 3.91 do botão
        cy.contains('button', '3.91').should('be.visible');
       
        //Clique para comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent').click()

        cy.wait(10000)


     });
   });
});