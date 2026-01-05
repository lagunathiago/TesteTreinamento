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
      .type("thiagosuporte@uorak.com");

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
    
    it("Clica em cupon", () => {

        // Clicando em Cadastros
      cy.get('[title="Cadastros"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em Cupons
        cy.get(':nth-child(13) > a > .w-100', { timeout: 60000})
        .should('be.visible')
        .click()
   });
/*
     it("Remover Cupon", () => {

        cy.get('.edit-coupon-btn', { timeout: 20000 })
  .first()
  .should('be.visible')
  .click();

  cy.contains('button', 'Remover', { timeout: 20000 })
  .should('be.visible')
  .click();

  cy.get('[switch="modal.removeCoupon"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout: 60000})
  .should('be.visible')
  .click()

   });

   it('Filtros de cupons', () => {
    //Selecionar colunas
    cy.get('.buttons-collection',{timeout: 60000})
    .should('be.visible')
    .click()

    cy.get('[data-cv-idx="0"]').click()
    cy.wait(1000)
    cy.get('[data-cv-idx="1"]').click()
    cy.wait(1000)
    cy.get('[data-cv-idx="2"]').click()
    cy.wait(1000)
    cy.get('[data-cv-idx="3"]').click()
    cy.wait(1000)

    cy.get('[data-cv-idx="0"]').click()
    cy.wait(1000)
    cy.get('[data-cv-idx="1"]').click()
    cy.wait(1000)
    cy.get('[data-cv-idx="2"]').click()
    cy.wait(1000)
    cy.get('[data-cv-idx="3"]').click()
    cy.wait(1000)

    //Copiar
    cy.get('.buttons-copy',{timeout: 60000})
    .should('be.visible')
    .click()

    cy.wait(1000)

    //Csv
    cy.get('.buttons-csv',{timeout: 60000})
    .should('be.visible')
    .click()

    cy.wait(1000)

    //Pdf
    cy.get('.buttons-pdf',{timeout: 60000})
    .should('be.visible')
    .click()

    cy.wait(1000)

    //Copiar
    cy.get('.icon-file-xls',{timeout: 60000})
    .should('be.visible')
    .click()

    cy.wait(1000)
    
    //Imprimir 
    cy.get('.buttons-print', {timeout: 60000})
    .should('be.visible')
    .click()

    cy.wait(6000)
   });

   it("Pesquisar cupom", () => {
cy.get('input[placeholder="Pesquisar..."]', { timeout: 20000 })
  .should('be.visible')
  .clear()
  .type('Teste');

  cy.get('.title-bar > .multiselect > .btn',{timeout: 60000})
  .should('be.visible')
  .click()
   });

    it("Criar cupom R$", () => {
        //Clica em criar cupons
        cy.get('.title-bar > .btn-icon',{timeout: 60000})
        .should('be.visible')
        .click()

        //Nome cupom
cy.contains('Editar cupom', { timeout: 20000 }).should('be.visible');

cy.get('input[id*="pt_BR_"]', { timeout: 20000 })
  .should('exist')
  .first()
  .click({ force: true })
  .invoke('val', 'Cupom Automação R$')
  .trigger('input')
  .trigger('change')
  .blur();

  //Valor
  cy.get('input[type="number"][ng-model="coupon.value"]', { timeout: 20000 })
  .should('be.visible')
  .and('not.be.disabled')
  .clear()
  .type('1');

  //Código
  cy.get('input[ng-model="coupon.code"]', { timeout: 20000 })
  .should('be.visible')
  .and('not.be.disabled')
  .clear()
  .type('12345');

  // Quantidade
cy.contains('div.box-title', 'Quantidade')
  .next()
  .find('input[type="number"]')
  .clear({ force: true })
  .type('1', { force: true })
  .blur();

//Data de inicio
cy.get('input[ng-model="coupon.startDate"]', { timeout: 20000 })
  .should('be.visible')
  .invoke('val', '01/02/2026 10:00')
  .trigger('input')
  .trigger('change');

  //Data de fim
cy.get('input[ng-model="coupon.endDate"]', { timeout: 20000 })
  .should('be.visible')
  .should('not.be.disabled')
  .invoke('val', '05/02/2026 18:00')
  .trigger('input')
  .trigger('change');

 //C onfirma
cy.get('[switch="modal.coupons"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
 .should('be.visible')
  .click();
  
   });
*/
   it("Criar cupom %", () => {
        //Clica em criar cupons
        cy.get('.title-bar > .btn-icon',{timeout: 60000})
        .should('be.visible')
        .click()

        //Nome cupom
cy.contains('Editar cupom', { timeout: 20000 }).should('be.visible');

cy.get('input[id*="pt_BR_"]', { timeout: 20000 })
  .should('exist')
  .first()
  .click({ force: true })
  .invoke('val', 'Cupom Automação %')
  .trigger('input')
  .trigger('change')
  .blur();

 // Escolhe %
  cy.get('select[ng-model="coupon.valueType"]', { timeout: 60000 })
  .should('be.visible')
  .select('%');


  cy.wait(1000)

  cy.get('select[ng-model="coupon.valueType"]', { timeout: 20000 })
  .should('be.visible')
  .select('%');


  //Valor
  cy.get('input[type="number"][ng-model="coupon.value"]', { timeout: 20000 })
  .should('be.visible')
  .and('not.be.disabled')
  .clear()
  .type('50');

  //Código
  cy.get('input[ng-model="coupon.code"]', { timeout: 20000 })
  .should('be.visible')
  .and('not.be.disabled')
  .clear()
  .type('12345');

  // Quantidade
cy.contains('div.box-title', 'Quantidade')
  .next()
  .find('input[type="number"]')
  .clear({ force: true })
  .type('1', { force: true })
  .blur();

//Data de inicio
cy.get('input[ng-model="coupon.startDate"]', { timeout: 20000 })
  .should('be.visible')
  .invoke('val', '01/02/2026 10:00')
  .trigger('input')
  .trigger('change');

  //Data de fim
cy.get('input[ng-model="coupon.endDate"]', { timeout: 20000 })
  .should('be.visible')
  .should('not.be.disabled')
  .invoke('val', '05/02/2026 18:00')
  .trigger('input')
  .trigger('change');


 //C onfirma
cy.get('[switch="modal.coupons"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
 .should('be.visible')
  .click();

  
   });


  });
});
  