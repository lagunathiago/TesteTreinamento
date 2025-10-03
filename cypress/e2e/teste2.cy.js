// Esse teste adiciona Habilidades e Verifica se foi salva
describe("Minhas Habilidades", () => {
  context("Login e acesso", () => {
    it("Teste minhas hablidades", () => {
      // 1) Login
      cy.visit("https://hml.lector.live/landing");

      cy.contains("button", "Entrar").click();
      cy.get('form.ng-pristine > [type="text"]').type(
        "thiagosuporte@uorak.com"
      );
      cy.get("ng-transclude > .border").type("123");
      cy.get(":nth-child(4) > .btn-swipe-accent").click();

      // 3) Clica no menu "Minhas Habilidades"
      cy.contains("a", /^Minhas Habilidades$/i, { timeout: 20000 })
        .should("be.visible")
        .scrollIntoView()
        .click({ force: true });

      // clica no botão de adicionar cargo
      cy.get('a.btn.icon-add[title="Adicionar cargos"]', { timeout: 15000 })
        .should("be.visible")
        .click({ force: true });

      cy.contains("button", "Adicionar", { timeout: 15000 })
        .should("be.visible")
        .click({ force: true });

      // valida que aparece a frase "Você não possui Habilidades"
      cy.contains("div.ng-binding", "Você não possui Habilidades", {
        timeout: 10000,
      }).should("be.visible");

      //Volta para dashboard
      cy.get(":nth-child(1) > a > .w-100").click();

      //Volta para as Minhas habilidades
      cy.get(":nth-child(2) > a > .w-100").click();

      cy.contains('Suporte').should('be.visible');

    });
  });
});
