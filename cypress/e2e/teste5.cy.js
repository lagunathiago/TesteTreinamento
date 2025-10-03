// Ignora erros JS do app
Cypress.on("uncaught:exception", () => false);

describe("Meus Certificados", () => {
  it("Abre um certificado (mesma aba OU nova aba)", () => {
    cy.visit("https://hml.lector.live/landing");

    // Login
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("123");
    cy.get(":nth-child(4) > .btn-swipe-accent").click();

    // Meus Certificados
    cy.contains("a", /^Meus Certificados$/i, { timeout: 20000 }).click({
      force: true,
    });
    cy.get("#mycertificates-table tbody tr", { timeout: 20000 }).should(
      "have.length.greaterThan",
      0
    );

    // Stub opcional: se abrir nova aba vamos capturar a URL
    cy.window().then((win) => cy.stub(win, "open").as("windowOpen"));

    // Clique no primeiro certificado
    cy.get('td.actionsColumn button[title="Abrir certificado"]', {
      timeout: 15000,
    })
      .first()
      .scrollIntoView()
      .click({ force: true });

    // Se chamou window.open -> visitar URL; senão -> validar viewer na própria aba
    cy.get("@windowOpen").then((stub) => {
      if (stub && stub.called) {
        const url = stub.getCall(0).args[0];
        cy.visit(url);
      }

      // Valida que o viewer carregou (sem depender de intercept)
      // 1) tentativa direta
      cy.get('embed[type="application/pdf"], .pdfViewer, canvas', {
        timeout: 20000,
      }).should("exist");

      // 2) se estiver dentro de iframe (alguns viewers), valida também
      cy.get("iframe", { timeout: 20000 }).then(($ifs) => {
        if ($ifs.length) {
          const $iframe = $ifs.first();
          cy.wrap($iframe).its("0.contentDocument.body");
        }
      });

      // Checagem extra útil
      cy.contains(/Certificado/i, { timeout: 10000 }).should("be.visible");
    });

    //

    cy.contains("button", "Voltar", { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });

    //clicca nos filtros
    cy.get(".title-bar > .ui-select-container").click();
    cy.wait(500); // espera 0,5s
    cy.get(".open > .ui-select-choices > :nth-child(2)").click();
    cy.contains("Treinamentos", { timeout: 20000 });

    cy.wait(1000); // espera 1s antes do próximo clique

    cy.get(".title-bar > .ui-select-container").click();
    cy.wait(500);
    cy.get(".open > .ui-select-choices > :nth-child(3)").click();
    cy.contains("Trilhas", { timeout: 20000 });

    //filtros de data de incrição
    //data inicial
    cy.get('[ng-model="filters.subscriptionStart"] > .date-range-result').click()
    cy.get('[ng-model="filters.subscriptionStart"] > .date-range-popup > .start-date > .datetimepicker').click()
    cy.get('.datetimepicker-days > .table-condensed > thead > :nth-child(1) > .prev > .glyphicon').click()
    cy.contains('td.day', /^1$/)
  .should('be.visible')
  .click();
    cy.contains('span.hour', '0:00', { timeout: 10000 })
  .should('be.visible')
  .click();
    cy.contains('span.minute', '0:00', { timeout: 10000 })
  .should('be.visible')
  .click();
  
  //data final 

cy.get('[ng-model="filters.subscriptionStart"] > .date-range-popup > .end-date > .datetimepicker').click()

// trabalha sempre no datepicker visível
cy.get('body .datetimepicker.dropdown-menu:visible')
  .should('be.visible')
  .within(() => {
    // DIA (ex.: 1)
    cy.contains('td.day', /^1$/).click();

    // Se o componente pedir HORA depois do dia:
    cy.contains('span.hour', /^0:00$/).click().then(() => {});

    // Se em seguida pedir os MINUTOS:
    cy.contains('span.minute', /^0:00$/).click().then(() => {});
  });

  cy.get('[ng-model="filters.subscriptionStart"] > .date-range-popup > .btn-swipe-accent').click()


  cy.get('.title-bar > .ui-select-container').click()
  cy.get('.open > .ui-select-choices > :nth-child(1)').click()
  cy.contains('Treinamentos', { timeout: 20000 })
 
  




  });
});
