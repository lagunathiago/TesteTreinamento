//Neste teste validamos dois fluxos principais:
//Emissão de certificado: acessamos uma trilha já concluída e emitimos o certificado correspondente.
//Acesso a trilha em andamento: entramos em uma trilha ativa, navegamos até o treinamento vinculado e confirmamos o carregamento do conteúdo.
Cypress.on("uncaught:exception", () => false);

describe("Minhas Trilhas", () => {
  it("Testes Minhas trilhas", () => {
    cy.visit("https://hml.lector.live/landing");

    // Login
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("123");
    cy.get(":nth-child(4) > .btn-swipe-accent").click();

    // Abre Minhas Trilhas de forma estável
    cy.get('a[href$="/universolector/home/trails"]', { timeout: 20000 })
      .should("be.visible")
      .scrollIntoView()
      .click({ force: true });

    // Pesquisa e envia ENTER (posiciona abaixo do breadcrumb para não ficar coberto)
    cy.get('input[ng-model="searchFilter.text"]', { timeout: 20000 })
      .scrollIntoView({ offset: { top: -250, left: 0 } })
      .should("be.visible")
      .type("19/08 trilha{enter}");

    // Aguarda a tabela parar de processar antes de interagir
    cy.get("div.dataTables_processing", { timeout: 30000 }).should(
      "not.be.visible"
    );

    // Confirma que a linha apareceu (retryable)
    cy.contains("tr", "19/08 trilha", { timeout: 20000 }).should("be.visible");

    // Clica no botão "Certificado" da linha correta
    cy.contains("tr", "19/08 trilha", { timeout: 20000 })
      .scrollIntoView()
      .within(() => {
        cy.get('button[title="Certificado"]', { timeout: 20000 })
          .should("be.enabled")
          .scrollIntoView()
          .click();
      });

    // Espera o modal renderizar e ficar visível (sai do ng-hide/display:none)
    cy.get("#modal-certificate", { timeout: 60000 })
      .should("exist")
      .and("be.visible");

    // (opcional) garante que o viewer renderizou algo
    cy.get(
      "#modal-certificate iframe, #modal-certificate embed, #modal-certificate canvas",
      { timeout: 60000 }
    ).should("exist");

    // Fecha o modal somente quando o botão "Voltar" estiver visível
    cy.get("#modal-certificate .btn-swipe-accent.icon-arrow-left", {
      timeout: 20000,
    })
      .should("be.visible")
      .click();

    //Clica em minhas habiliades e clic em minhas trilhas para aparecer todas as trilhas novamente
    cy.get(":nth-child(3) > a > .w-100", { timeout: 20000 }).click();
    // Verifica se "Meus Treinamentos" aparece visível na tela 
    cy.contains("li.lector-txt-accent", "Meus Treinamentos", {
      timeout: 20000,
    }).should("be.visible");
    cy.get(':nth-child(4) > a > .w-100').click()

cy.get('#mytrails-table > tbody > :nth-child(1) > :nth-child(2)').click()

// Verifica se o botão "Finalizar trilha" está visível
cy.contains("button", "Finalizar trilha", { timeout: 20000 })
  .should("be.visible");

cy.intercept('GET', '**/courses/**/contents**').as('openContent');

cy.get('table.stage-content-list tbody', { timeout: 20000 }).should('exist');

// Garante que a tabela existe
cy.get('table.stage-content-list tbody', { timeout: 20000 }).should('exist');

// Encontra a linha com "Em andamento"
cy.contains('tr', 'Em andamento', { timeout: 20000 })
  .should('be.visible')
  .within(() => {
    // Dentro da linha, encontra e clica no botão "Acessar"
    cy.contains('button', 'Acessar', { timeout: 10000 })
      .should('exist')
      .scrollIntoView()
      .click({ force: true });
  });

// Confirma que abriu o curso (ou modal)
cy.url({ timeout: 20000 }).should('include', '/courses');
 
// Verifica se "Entrega de atividade" aparece na tela
cy.contains('h2', 'Aula Presencial: teste', { timeout: 20000 })
  .should('be.visible');
  


 });
});
