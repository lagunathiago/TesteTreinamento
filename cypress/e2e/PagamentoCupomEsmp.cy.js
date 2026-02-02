/*
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Cannot read properties of null') &&
      err.message.includes('charAt')) {
    return false
  }
  
})
*/
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Cannot read properties of null") ||
    err.message.includes("charAt")
  ) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

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

  context("Teste Cupons", () => {
    
      it("Clica na Vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(9)', { timeout: 60000 })
        .should('be.visible')
        .click();
       
   });

   
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

 it("Aceita a primeira solicitação", () => {

     // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="41"]',{timeout:60000})
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

  //Envia pra analise
  cy.get('button.btn-swipe-accent', { timeout: 60000 })
  .contains('Análise financeira')
  .click();

  //Confirma analise
  cy.get('#confirmModalConfirm', { timeout: 20000 })
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


//Envia para analise
  cy.get('button.btn-swipe-accent', { timeout: 60000 })
  .contains('Análise financeira')
  .click();

 //Confirma analise
 cy.get('#confirmModalConfirm', { timeout: 20000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click();

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

    cy.wait(3000)

  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Teste Automação Recorrente 1', { delay: 30 });

    cy.wait(3000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

    });


    it('Aplica cupom 10% no primeiro treinamento', ()=> {

      cy.wait(5000)

  cy.get('button')
  .filter(':contains("Revisar pagamentos")')
  .last()
  .scrollIntoView()
  .click({ force: true });

  cy.wait(10000)

  //Clica em alterar cupom
  cy.get('.ph-5 > .middle > .btn-swipe-accent', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

    cy.wait(2000)

//Clica em 'selecionar um cupom' para abrir o modal com os cupom
  cy.get('.modal-body > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default').click()

    cy.wait(2000)

//Clica no cupom CUPOM 10 quando ficvar visivel
cy.contains('.ui-select-choices-row', 'CUPOM10', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(2000)

  //Clica em aplicar cupom
  cy.contains('button', 'Aplicar cupom', { timeout: 60000 })
  .should('be.visible')
  .click()

    cy.wait(2000)

// validar valor da parcela
cy.contains('R$3.52').should('be.visible')

// validar valor total com desconto
cy.contains('R$17.60').should('be.visible')

  cy.wait(3000)

//Clica em aprvovar compra
cy.contains('button', 'Aprovar compra', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

  cy.wait(5000)

 });

  it('Pesquisa segundo treinamento',() => {

cy.wait(3000)

  cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Teste Automação Recorrente 2', { delay: 30 });

  cy.wait(4000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

    });

    it(' Aplica cupom R$2 no segundo treinamento', ()=> {

cy.wait(3000)
   
  cy.get('button',{timeout:20000})
  .filter(':contains("Revisar pagamentos")')
  .last()
  .scrollIntoView()
  .click({ force: true });

  //Clica em alterar cupom
  cy.get('.ph-5 > .middle > .btn-swipe-accent', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

//Clica em 'selecionar um cupom' para abrir o modal com os cupom
  cy.get('.modal-body > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default').click()

//Clica no cupom TESTE2801 quando ficvar visivel
cy.contains('.ui-select-choices-row', 'teste2801', { timeout: 60000 })
  .should('be.visible')
  .click()

    cy.wait(2000)

  //Clica em aplicar cupom
  cy.contains('button', 'Aplicar cupom', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(2000)

// validar valor da parcela
cy.contains('R$2.91').should('be.visible')

// validar valor total com desconto
cy.contains('R$5.82').should('be.visible')

    cy.wait(2000)

    //Clica em aprvovar compra
cy.contains('button', 'Aprovar compra', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

  cy.wait(5000)
  
    }); 

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
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("2006lrnrgr");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

it('Emite o primeiro boleto no treinamento Teste Automação Recorrente 1', ()=> {
        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(9)', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
        cy.get(':nth-child(1) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em efetuar pagamento
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

    it("Emite o primeiro boleto no treinamento Teste Automação Recorrente 2", () => {

        //Clica no Treinamento
        cy.get(':nth-child(2) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em efetuar pagamento
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

         cy.wait(2000)

         //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

    it("Vai em minhas aréas", () => {
      //Minha área
      cy.contains("span", "Minha Área", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Minhas compras
      cy.contains("button.showcase-home-menu-item", "Minhas Compras", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();
    });
    it("Valida a primeira compra", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Teste Automação Recorrente 1", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(300); // micro-wait só pra estabilizar render (bem pequeno)

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $last = $rows.last();
          expect($last.find("td.couponColumn").text()).to.contain("10%");
          expect($last.find("td.priceColumn").text()).to.contain("R$ 17.60");
        },
      );

      //clica no ultimo
      cy.get("#mypurchases-table tbody tr", { timeout: 20000 })
        .should("have.length.greaterThan", 0)
        .last()
        .within(() => {
          cy.get("button.bb-slip", { timeout: 20000 })
            .should("be.visible")
            .click({ force: true });
        });

      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");

      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

       cy.get('iframe#bb-boleto', { timeout: 30000 })
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .contains('div.cell.texto-a-direita', 'Valor Cobrado', { timeout: 30000 })
  .should(($cell) => {
    const txt = $cell.text().replace(/\s/g, '');
    expect(txt).to.include('3.52');
  });

         cy.log('VALIDE SE O SEU NOME E CPF ESTÁ CERTO')
        cy.wait(7000);
         cy.log('VALIDE SE O SEU NOME E CPF ESTÁ CERTO')

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

    });

    it("Valida a segunda compra", () => {

      cy.get('.showcase-head-2 > .btn', { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

        cy.contains("span", "Minha Área", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Minhas compras
      cy.contains("button.showcase-home-menu-item", "Minhas Compras", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();
  

      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Teste Automação Recorrente 2", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(300); // micro-wait só pra estabilizar render (bem pequeno)

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $last = $rows.last();
          expect($last.find("td.couponColumn").text()).to.contain("R$2.00");
          expect($last.find("td.priceColumn").text()).to.contain("R$ 5.82");
        },
      );

      //clica no ultimo
       cy.get("#mypurchases-table tbody tr", { timeout: 20000 })
        .should("have.length.greaterThan", 0)
        .last()
        .within(() => {
          cy.get("button.bb-slip", { timeout: 20000 })
            .should("be.visible")
            .click({ force: true });
        });

      cy.wait(2000);

      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");


      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

       cy.log('VALIDE O VALOR DE 2.91 NO BOLETO')

      cy.wait(1000);

       cy.get('iframe#bb-boleto', { timeout: 30000 })
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .contains('div.cell.texto-a-direita', 'Valor Cobrado', { timeout: 30000 })
  .should(($cell) => {
    const txt = $cell.text().replace(/\s/g, '');
    expect(txt).to.include('2.91');
  });

        cy.log('VALIDE SE O SEU NOME E CPF ESTÁ CERTO')
        cy.wait(7000);
         cy.log('VALIDE SE O SEU NOME E CPF ESTÁ CERTO')

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

    });
  });
});
