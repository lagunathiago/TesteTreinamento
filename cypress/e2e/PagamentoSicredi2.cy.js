 <reference types="cypress" />

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://hml.lector.live/ext/subscribe/login");
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("qualidade2@lectortec.com.br");
    cy.get("ng-transclude > .border").type("123");
    cy.get('#btn-entrar').click();
});



});