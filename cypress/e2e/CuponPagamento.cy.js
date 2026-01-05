Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Cannot read properties of null') &&
    err.message.includes("reading '0'")
  ) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/ext/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');
  });

  context("Teste Cupons", () => {
    
    it("Login", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

       //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(5)', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
        cy.get(':nth-child(2) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em compra
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

   });

   it("Limite de Cupom %",() => {
    
    //Digita um cupom já com um limite atingido
    cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]', {
  timeout: 10000
})
  .should('be.visible')
  .and('not.be.disabled')
  .scrollIntoView()
  .clear()
  .invoke('val', '05/01/2026')
  .trigger('input')
  .trigger('change')
  .blur();
  
  //Clica no pix
  cy.get('.mb-5 > .icon-radio', { timeout: 10000 })
  .should('be.visible')
  .click();

   //Aplicar cupom
   cy.get('.w-50 > .button-input > .btn-swipe-accent', { timeout: 10000 })
  .should('be.visible')
  .click();

  //Verifica a mensagem de limite
cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Limite de cupons alcançado');

  cy.wait(2000)

  });

  it("Data de cupom Expirada %", () => {

    cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
  .should('be.visible')
  .and('not.be.disabled')
  .click()
  .invoke('val', '0520')
  .trigger('input')
  .trigger('change');

cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

//Aplicar cupom
   cy.get('.w-50 > .button-input > .btn-swipe-accent', { timeout: 10000 })
  .should('be.visible')
  .click();

  //Verifica a mensagem de limite
cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Cupom não encontrado');

    cy.wait(2000)

  });

   it("Valor Acima do Minimo %", () => {

    cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
  .should('be.visible')
  .and('not.be.disabled')
  .click()
  .invoke('val', '0530')
  .trigger('input')
  .trigger('change');

cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

//Aplicar cupom
   cy.get('.w-50 > .button-input > .btn-swipe-accent', { timeout: 10000 })
  .should('be.visible')
  .click();

  //Verifica a mensagem de limite
cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Valor de compra insuficiente');

    cy.wait(2000)

  });

  it("Apllica cupom %", () => {

    cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
  .should('be.visible')
  .and('not.be.disabled')
  .click()
  .invoke('val', '0510')
  .trigger('input')
  .trigger('change');

cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

  cy.wait(4000)

  //Aplicar cupom
   cy.get('.w-50 > .button-input > .btn-swipe-accent', { timeout: 10000 })
  .should('be.visible')
  .click();

    cy.wait(4000)

  //Clica em continuar compra
  cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', { timeout: 10000 })
  .should('be.visible')
  .click();

  cy.wait(4000)

  cy.get('#pixQrCode', { timeout: 60000 })
  .should('be.visible');

  });

  it('Minha área/Minhas compras/Cupon %', () => {

    //Fecha a compra
    cy.get('.column.ng-valid > .modal-header > .btn', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Minha área
  cy.contains('span', 'Minha Área', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Minhas compras
  cy.contains('button.showcase-home-menu-item', 'Minhas Compras', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Digita o treinamernto
  cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
  .should('be.visible')
  .clear()
  .type('Teste Cupom Automação 2', { delay: 50 });

  //Pesquisa
  cy.get('.multiselect.ng-dirty > .btn', {timeout: 60000})
  .should('be.visible')
  .click()

  cy.wait(3000)

 cy.get('table#mypurchases-table tbody tr', { timeout: 20000 })
  .should('have.length.greaterThan', 0);

cy.wait(300); // micro-wait só pra estabilizar render (bem pequeno)

cy.get('table#mypurchases-table tbody tr', { timeout: 20000 })
  .then($rows => {
    const $last = $rows.last();
    expect($last.find('td.couponColumn').text()).to.contain('50%');
    expect($last.find('td.priceColumn').text()).to.contain('R$ 0.50');
  });

  //clica no ultimo
  cy.get('table#mypurchases-table tbody tr', { timeout: 20000 })
  .should('have.length.greaterThan', 0)
  .last()
  .within(() => {
    cy.get('button.sicredi-slip', { timeout: 20000 })
      .should('be.visible')
      .click({ force: true });
  });

  //Garante que o pix abriu
  cy.get('#pixQrCode', { timeout: 20000 })
  .should('be.visible');

  cy.wait(2000)

  });

  it('Relatórios/Compras', () => {

    //Fecha QRCode
    cy.get('.modal-overlay.ng-scope > .modal > .modal-header > .btn', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em perfil
    cy.get(':nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em Administrador
    cy.get(':nth-child(4) > .user-options-items > :nth-child(1) > ng-transclude > .ng-binding', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em relatórios
    cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

    //Clica em Compras/Relatório
    cy.contains('li.list-group-item.node-report-categories', 'Compras', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(5000)

        //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Teste Cupom Automação', { delay: 30 });

  cy.wait(2000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

  cy.log('VEREFEQUE O HORARIO DA COMPRA E O DESCONTO DO CUPOM');
  cy.wait(8000)
  

  })

 }); 
});
