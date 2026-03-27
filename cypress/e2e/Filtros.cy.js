Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  // Erros conhecidos do Angular / Front que não devem quebrar o teste
  if (
    msg.includes('Cannot read properties of null') ||
    msg.includes('Cannot read properties of undefined') ||   
    msg.includes("reading 'then'") ||                        
    msg.includes('charAt') ||
    msg.includes('writeText') ||
    msg.includes('Clipboard') ||
    msg.includes('Clipboard') ||
    msg.includes('renderCertificateClick is not a function')
  ) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
   
      cy.contains("button", "Entrar", { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

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

  context("Filtros", () => {
    it("Pesquisar Treinamentos", () => {
      // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem', { timeout: 60000 })
        .should("be.visible")
        .click();

        cy.wait(2000)

      //Pesquisa
      cy.get('input[placeholder="Pesquisar treinamentos"]', { timeout: 60000 })
        .should("be.visible")
        .clear()
        .type("Teste", { delay: 50 });

      cy.wait(1000);
      cy.get(".multiselect.ng-dirty > .btn").click();
    });

    it("Filtro Ordenação AZ/ZA", () => {

      //Clica em nome A/Z
      cy.get('[ng-model="$parent.order"]').click();
      cy.wait(1000);

      //Z á A
      cy.get(".open > .ui-select-choices > :nth-child(2)", { timeout: 60000 })
        .should("be.visible")
        .click({ force: true });
      cy.wait(3000);

      //Clica em nome A/Z
      cy.get('[ng-model="$parent.order"]').click();
      cy.wait(1000);

      //A á Z
      cy.get(".open > .ui-select-choices > :nth-child(1)", { timeout: 60000 })
        .should("be.visible")
        .click({ force: true });
    });
    it("Filtro Mais Recente/Mias Antigo", () => {
      //Clica em nome A/Z
      cy.get('[ng-model="$parent.order"]').click();
      cy.wait(1000);

      //Mais recente
      cy.get(".open > .ui-select-choices > :nth-child(3)", { timeout: 60000 })
        .should("be.visible")
        .click({ force: true });
      cy.wait(3000);

      //Clica em nome A/z
      cy.get('[ng-model="$parent.order"]').click();
      cy.wait(1000);

      //Mais antigo
      cy.get(".open > .ui-select-choices > :nth-child(4)", { timeout: 60000 })
        .should("be.visible")
        .click({ force: true });
    });

    it("Filtro Card", () => {
      //Clica em Cards
      cy.get(".title-bar > .filter").click();
      cy.wait(1000);

      //Miniaturas
      cy.get(".open > .ui-select-choices > :nth-child(3)", { timeout: 60000 })
        .should("be.visible")
        .click();
      cy.wait(4000);

      //Clica em Cards
      cy.get(".title-bar > .filter").click();
      cy.wait(2000);

      //somente capa
      cy.get(".open > .ui-select-choices > :nth-child(2)", { timeout: 60000 })
        .should("be.visible")
        .click();
      cy.wait(4000);

      //Clica em Cards
      cy.get(".title-bar > .filter").click();
      cy.wait(4000);

      //cartoes
      cy.get(".open > .ui-select-choices > :nth-child(1)", { timeout: 60000 })
        .should("be.visible")
        .click();
      cy.wait(4000);

      //Clica em Cards
      cy.get(".title-bar > .filter").click();
      cy.wait(4000);

      //cartoes
      cy.get(".open > .ui-select-choices > :nth-child(4)", { timeout: 60000 })
        .should("be.visible")
        .click();
      cy.wait(60000);

    });
  });
});
