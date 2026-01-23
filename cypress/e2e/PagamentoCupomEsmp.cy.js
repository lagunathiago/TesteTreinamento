/*
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Cannot read properties of null') &&
      err.message.includes('charAt')) {
    return false
  }
  
})
*/
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Cannot read properties of null') ||
    err.message.includes('charAt')
  ) {
    return false
  }
})


describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/esmp/subscribe/login");
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
    
      it("Clica na Vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(8)', { timeout: 60000 })
        .should('be.visible')
        .click();

       
   });
/*
     it("Compra Teste Automação Recorrente 1", () => {

        //Clica no Treinamento
        cy.get(':nth-child(1) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em compra
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)
   
        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

    it("Compra Teste Automação Recorrente 2", () => {

        //Clica no Treinamento
        cy.get(':nth-child(2) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em compra
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

         cy.wait(2000)
   
        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });
   
    it("Sai do perfil de compra", () => {

     //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em sair
    cy.contains('div.option.menu-option', 'Sair', { timeout: 60000 })
  .should('be.visible')
  .click()

    });
*/
    it('Entra em outro perfil para aceitar a solicitão e aplicar matricula',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

/*

 it("Aceita a primeira solicitação", () => {

     // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="40"]',{timeout:60000})
      .should('be.visible')
      .click()
      
      //Clica no treinamento
      cy.get(':nth-child(1) > .card-items',{timeout:60000})
      .should('be.visible')
      .click()
      
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Aceita matricula
  cy.get('[ladda="pendingSubscriptionsReport.loadingApprovals.true"]',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Aprova matricula
  cy.get('[ng-show="modal.approveBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  
   });


 it("Aceita a segunda solicitação", () => {

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(5)',{ timeout: 60000 })
  .should('be.visible')
  .click()

//Clica no segundo treinamento
  cy.get('.card-items', { timeout: 60000 })
  .should('have.length.greaterThan', 1)
  .eq(1) // segundo card (index começa em 0)
  .scrollIntoView()
  .click()


      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Aceita matricula
  cy.get('[ladda="pendingSubscriptionsReport.loadingApprovals.true"]',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Aprova matricula
  cy.get('[ng-show="modal.approveBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

    });

    it("Vai até os relatóros", ()=> {

    //Clica em relatórios
    cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

          cy.wait(5000)

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
  .type('Teste Automação Recorrente 1', { delay: 30 });

    cy.wait(5000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();
*//*
    });

    it('Aplica cupom 10% no primeiro treinamento', ()=> {

        cy.contains('button', 'Revisar pagamentos', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

  //Clica em alterar cupom
  cy.get('.ph-5 > .middle > .btn-swipe-accent', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

//Clica em 'selecionar um cupom' para abrir o modal com os cupom
  cy.get('.modal-body > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default').click()

//Clica no cupom CUPOM 10 quando ficvar visivel
cy.contains('.ui-select-choices-row', 'CUPOM10', { timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica em aplicar cupom
  cy.contains('button', 'Aplicar cupom', { timeout: 60000 })
  .should('be.visible')
  .click()


// validar valor da parcela
cy.contains('R$3.52').should('be.visible')

// validar valor total com desconto
cy.contains('R$17.60').should('be.visible')

//Fecha Modas
cy.get('.modal-overlay.ng-scope > .modal > .modal-header > .btn', { timeout: 60000 })
  .should('be.visible')
  .click()

 });

  it('Pesquisa segundo treinamento',() => {

  cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Teste Automação Recorrente 2', { delay: 30 });

  cy.wait(5000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

    });

    it(' Aplica cupom R$1 no segundo treinamento', ()=> {
        
        cy.contains('button', 'Revisar pagamentos', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

  //Clica em alterar cupom
  cy.get('.ph-5 > .middle > .btn-swipe-accent', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

//Clica em 'selecionar um cupom' para abrir o modal com os cupom
  cy.get('.modal-body > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default').click()

//Clica no cupom CUPOM 10 quando ficvar visivel
cy.contains('.ui-select-choices-row', 'Teste Cupom$1', { timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica em aplicar cupom
  cy.contains('button', 'Aplicar cupom', { timeout: 60000 })
  .should('be.visible')
  .click()

// validar valor da parcela
cy.contains('R$3.41').should('be.visible')

// validar valor total com desconto
cy.contains('R$6.82').should('be.visible')

//Fecha Modas
cy.get('.modal-overlay.ng-scope > .modal > .modal-header > .btn', { timeout: 60000 })
  .should('be.visible')
  .click()
    });
*/
    it('Sai do Perfil adm', () => {

    //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

    //Clica em sair
    cy.contains('div.option.menu-option', 'Sair', { timeout: 60000 })
  .should('be.visible')
  .click()


    });


it('Entra no perfil aluno para validar os boletos',()=> {

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

    it("Vai em minhas aréas", ()=>{

        //Minha área
  cy.contains('span', 'Minha Área', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Minhas compras
  cy.contains('button.showcase-home-menu-item', 'Minhas Compras', { timeout: 60000 })
  .should('be.visible')
  .click();



    })

  });
});
