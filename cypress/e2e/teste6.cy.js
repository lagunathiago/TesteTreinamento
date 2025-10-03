Cypress.on("uncaught:exception", () => false);

describe("Teste Vitrine, Visão do aluno", () => {
  it("Abre um certificado (mesma aba OU nova aba)", () => {
    cy.visit("https://hml.lector.live/landing");

    // Login
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("2006lrnrgr");
    cy.get(":nth-child(4) > .btn-swipe-accent").click();

  })
})