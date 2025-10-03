// Este teste valida três pontos principais:
// 1. Confirma se o certificado de uma treinamento concluído pode ser emitido corretamente.
// 2. Verifica se é possível visualizar os detalhes de um treinamento já concluído.
// 3. Garante que todos os conteúdos vinculados ao treinamento estão disponíveis.


Cypress.on("uncaught:exception", () => false);

describe("Meus Treinamentos", () => {
  context("Login e acesso", () => {
    it("Teste meus treinamentos", () => {
      // 1) Login
      cy.visit("https://hml.lector.live/landing");

      cy.contains("button", "Entrar").click();
      cy.get('form.ng-pristine > [type="text"]').type(
        "thiagosuporte@uorak.com"
      );
      cy.get("ng-transclude > .border").type("123");
      cy.get(":nth-child(4) > .btn-swipe-accent").click();

      cy.contains("a", /^Meus Treinamentos$/i, { timeout: 20000 })
        .should("be.visible")
        .scrollIntoView()
        .click({ force: true });

      cy.get(
        'form[ng-submit="filterText()"] input[ng-model="searchFilter.text"]',
        { timeout: 15000 }
      )
        .should("exist")
        .scrollIntoView()
        .click({ force: true })
        .clear({ force: true })
        .type("teste50", { force: true });

      cy.get(".multiselect.ng-dirty > .btn").click();
      cy.get(
        ":nth-child(5) > .actionsColumn > .middle > .icon-certificate"
      ).click();
      cy.get("button.btn-swipe-accent.icon-arrow-left", {
        timeout: 10000,
      }).should("be.visible");
      cy.get(".top-bar > .btn-swipe-accent").click();

      cy.get('button[title="Visualizar conteúdos"]')
        .first()
        .click({ force: true });
      cy.contains("div", "Gravação").should("be.visible");
      cy.contains("div", "Documentos").should("be.visible");
      cy.get("div.lector-txt-main.ng-binding:visible", {
        timeout: 10000,
      }).contains("Aula Presencial");

      cy.get(".breadcrumbs-path > :nth-child(3)").click();

      cy.contains("button", "Estudar")
        .should("be.visible")
        .click({ force: true });



   // fecha o modal "Atenção" se estiver aberto
cy.get('body').then($b => {
  const modalAberto = $b.find('#resumeWatching.modal-overlay[open="true"]').length > 0;
  if (modalAberto) {
    cy.get('#resumeWatching.modal-overlay')
      .contains('button', /^Não$/)          
      .click({ force: true });

      cy.contains('.section-tab', /descri[cç][aã]o/i, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

// valida que o conteúdo "teste" está na descrição
cy.contains('div.description[marked="course.description"]', /teste/i, { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible');

  cy.get('.course-info-section > .tabs > .flex > :nth-child(2)').click()

       };
     });
    });
  });
});
