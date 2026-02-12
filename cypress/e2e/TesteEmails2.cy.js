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

  context("Validações gerais do fluxo de e-mails", () => {

      it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(11)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
   });

   it('Fazer incrição no Treinamento gratuito sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
       cy.get(':nth-child(1) > .card-container a.ng-scope > .showcase-card-container', { timeout: 60000 })
  .filter(':visible')
  .eq(0)
  .scrollIntoView()
  .click({ force: true })

        //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
        cy.pause()

   });

   it('Compra do Treinamento pago á vista sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago á vista sem aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
        cy.pause()

   });

 it('Compra do Treinamento pago com recorrência sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com recorrência sem aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
         cy.pause()

    });

     it('Solicita incrição no Treinamento gratuito com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Fazer incrição
  cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

  cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
        cy.pause()

    });

     it('Solicita incrição no Treinamento paga com aprovação de Gestor', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento paga com aprovação de Gestor', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
        cy.pause()

    });

      it('Solicita a incrição no Treinamento pago com recorrência e aprovação de gestor', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', ' Treinamento pago com recorrência e aprovação de gestor', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
         cy.pause()

    });

    it("Envia os campos do Treinamento gratuito com aprovação de campos personalizados ", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação de campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('PRIMEIRO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
        cy.pause()

   });

   it("Envia os campos do Treinamento pago com aprovação de campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com aprovação de campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('SEGUNDO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
        cy.pause()

   });

    it("Envia os campos do Treinamento pago com recorrência e aprovação de campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com recorrência e aprovação de campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('TERCEIRO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
         cy.pause()

   });

   it("Envia os campos do Treinamento gratuito com aprovação de gestor e campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação de gestor e campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('QUARTO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

        cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
          cy.pause()  

   });

   it("Envia os campos do Treinamento pago com aprovação de gestor e campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com aprovação de gestor e campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('QUARTO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

                cy.log('VERIFICAR O RECEBIMENTO DO E-MAIL ')
                cy.pause()

   });

    it("Troca pro perfil Administrador", () => {

     //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em selecionar perfil
    cy.get(':nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Clica em Administrador
  cy.get(':nth-child(4) > .user-options-items > :nth-child(1) > ng-transclude > .ng-binding', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

    it("Recusa os campos", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Recusa o primeiro documento
  cy.get('tbody > :nth-child(1) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

 cy.get('.modal:visible, .modal-content:visible, .modal-body:visible', { timeout: 20000 })
  .first()
  .as('modal');

cy.get('@modal')
  .find('input[placeholder*="Motivo"]', { timeout: 20000 })
  .first()
  .then($input => {
    $input[0].value = 'Reprovado 1'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

  //Recusa o segundo documento
  cy.get(':nth-child(2) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(1) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 2'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

    //Recusa o terceiro documento
  cy.get(':nth-child(3) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(2) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 3'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

    //Recusa o quarto documento
  cy.get(':nth-child(4) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000);

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(3) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 4 '
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.log('Verefique a ação feita')
  cy.pause()

    });

it("Aba Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click() 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click();

   });


   it("Recusa o Treinamento paga com aprovação de Gestor", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento paga com aprovação de Gestor', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Recusar
  cy.contains('button', 'Recusar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Escreve a recusa
  cy.get('textarea[ng-model="declineSubscriptions.reason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Recusado do Treinamento paga com aprovação de Gestor', { delay: 50 })

  //Clica em recusar
  cy.get('[ng-show="modal.declineBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

   });

    it("Recusa o Treinamento gratuito com aprovação", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento gratuito com aprovação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Recusar
  cy.contains('button', 'Recusar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Escreve a recusa
  cy.get('textarea[ng-model="declineSubscriptions.reason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Recusado do Treinamento gratuito com aprovação', { delay: 50 })

  //Clica em recusar
  cy.get('[ng-show="modal.declineBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

   });

    it("Recusa o Treinamento pago com recorrência e aprovação de gestor", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento pago com recorrência e aprovação de gestor', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Recusar
  cy.contains('button', 'Recusar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Escreve a recusa
  cy.get('textarea[ng-model="declineSubscriptions.reason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Recusado do Treinamento pago com recorrência e aprovação de gestor', { delay: 50 })

  //Clica em recusar
  cy.get('[ng-show="modal.declineBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

   });
   
   it("Muda para o perfil aluno", ()=> {

        //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Perfil
  cy.get('.icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Aluno
  cy.get('.user-options-items > :nth-child(2) > ng-transclude', { timeout: 60000 })
  .should('be.visible')
  .click()

   });

    it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(11)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
   });

     it('Solicita incrição no Treinamento gratuito com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Fazer incrição
  cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

  cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });

     it('Solicita incrição no Treinamento paga com aprovação de Gestor', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento paga com aprovação de Gestor', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });

      it('Solicita a incrição no Treinamento pago com recorrência e aprovação de gestor', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', ' Treinamento pago com recorrência e aprovação de gestor', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });

    it("Envia os campos do Treinamento gratuito com aprovação de campos personalizados ", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação de campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()


        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('PRIMEIRO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it("Envia os campos do Treinamento pago com aprovação de campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com aprovação de campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
 
        //Escreve os campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('SEGUNDO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

    it("Envia os campos do Treinamento pago com recorrência e aprovação de campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com recorrência e aprovação de campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('TERCEIRO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it("Envia os campos do Treinamento gratuito com aprovação de gestor e campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação de gestor e campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('QUARTO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()
 

   });

   it("Envia os campos do Treinamento pago com aprovação de gestor e campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com aprovação de gestor e campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('QUARTO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()


   });

    it("Troca pro perfil Administrador", () => {

     //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em selecionar perfil
    cy.get(':nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Clica em Administrador
  cy.get(':nth-child(4) > .user-options-items > :nth-child(1) > ng-transclude > .ng-binding', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(7000)

    });

    it("Recusa os campos", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Recusa o primeiro documento
  cy.get('tbody > :nth-child(1) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

 cy.get('.modal:visible, .modal-content:visible, .modal-body:visible', { timeout: 20000 })
  .first()
  .as('modal');

cy.get('@modal')
  .find('input[placeholder*="Motivo"]', { timeout: 20000 })
  .first()
  .then($input => {
    $input[0].value = 'Reprovado 1'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

  //Recusa o segundo documento
  cy.get(':nth-child(2) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(1) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 2'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

    //Recusa o terceiro documento
  cy.get(':nth-child(3) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(2) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 3'
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

    //Recusa o quarto documento
  cy.get(':nth-child(4) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000);

    cy.get('.modal:visible')
  .first()
  .find('input[placeholder*="Motivo"]')
  .eq(3) // sempre o campo logo abaixo
  .then($input => {
    $input[0].value = 'Reprovado 4 '
    $input[0].dispatchEvent(new Event('input', { bubbles: true }))
    $input[0].dispatchEvent(new Event('change', { bubbles: true }))
  });

  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.log('VEREFIQUE OS E-MAILS DE RECUSA')
  cy.pause()

    });

it("Aba Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click() 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click();

   });


   it("Recusa o Treinamento paga com aprovação de Gestor", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento paga com aprovação de Gestor', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Recusar
  cy.contains('button', 'Recusar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Escreve a recusa
  cy.get('textarea[ng-model="declineSubscriptions.reason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Recusado do Treinamento paga com aprovação de Gestor', { delay: 50 })

  //Clica em recusar
  cy.get('[ng-show="modal.declineBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

   });

    it("Recusa o Treinamento gratuito com aprovação", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento gratuito com aprovação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Recusar
  cy.contains('button', 'Recusar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Escreve a recusa
  cy.get('textarea[ng-model="declineSubscriptions.reason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Recusado do Treinamento gratuito com aprovação', { delay: 50 })

  //Clica em recusar
  cy.get('[ng-show="modal.declineBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

   });

    it("Recusa o Treinamento pago com recorrência e aprovação de gestor", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento pago com recorrência e aprovação de gestor', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Recusar
  cy.contains('button', 'Recusar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Escreve a recusa
  cy.get('textarea[ng-model="declineSubscriptions.reason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Recusado do Treinamento pago com recorrência e aprovação de gestor', { delay: 50 })

  //Clica em recusar
  cy.get('[ng-show="modal.declineBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

    });
    
    it("Muda para o perfil aluno", ()=> {

        //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Perfil
  cy.get('.icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Aluno
  cy.get('.user-options-items > :nth-child(2) > ng-transclude', { timeout: 60000 })
  .should('be.visible')
  .click()

   });

    it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(11)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
   });

     it('Solicita incrição no Treinamento gratuito com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Fazer incrição
  cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click();

  cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });

     it('Solicita incrição no Treinamento paga com aprovação de Gestor', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento paga com aprovação de Gestor', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });

      it('Solicita a incrição no Treinamento pago com recorrência e aprovação de gestor', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

   //Clica no Treinamento
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', ' Treinamento pago com recorrência e aprovação de gestor', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });

    it("Envia os campos do Treinamento gratuito com aprovação de campos personalizados ", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação de campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()


        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('PRIMEIRO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it("Envia os campos do Treinamento pago com aprovação de campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com aprovação de campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
 
        //Escreve os campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('SEGUNDO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

    it("Envia os campos do Treinamento pago com recorrência e aprovação de campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com recorrência e aprovação de campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('TERCEIRO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it("Envia os campos do Treinamento gratuito com aprovação de gestor e campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação de gestor e campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('QUARTO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()
 

   });

   it("Envia os campos do Treinamento pago com aprovação de gestor e campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
   
            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago com aprovação de gestor e campos personalizados', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('QUARTO Campo Teste Automação');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()


   });

    it("Troca pro perfil Administrador", () => {

     //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em selecionar perfil
    cy.get(':nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Clica em Administrador
  cy.get(':nth-child(4) > .user-options-items > :nth-child(1) > ng-transclude > .ng-binding', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(7000)

    });

    

    it("Aprova os Campos Personalizado", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Recusa o primeiro documento
  cy.get(':nth-child(1) > :nth-child(11) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

  //Recusa o segundo documento
  cy.get(':nth-child(2) > :nth-child(11) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    //Recusa o terceiro documento
  cy.get(':nth-child(3) > :nth-child(11) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000)

    //Recusa o quarto documento
  cy.get(':nth-child(4) > :nth-child(11) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(2000);


  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.log('VEREFIQUE OS E-MAILS DE APROVAÇÃO')
  cy.pause()

    });

it("Aba Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click() 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click();

   });


   it("Aceita o Treinamento paga com aprovação de Gestor", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento paga com aprovação de Gestor', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Aprovar
  cy.contains('button', 'Aprovar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Aprova
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 60000})
  .should('be.visible')
  .click()


 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

   });

    it("Aceita o Treinamento gratuito com aprovação", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento gratuito com aprovação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Aprovar
  cy.contains('button', 'Aprovar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Aprova
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 60000})
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

   });

    it("Aceita o Treinamento pago com recorrência e aprovação de gestor", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento pago com recorrência e aprovação de gestor', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Aprovar
  cy.contains('button', 'Aprovar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Aprova
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 60000})
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

   });

    it("Aceita o Treinamento pago com aprovação de gestor e campos personalizados", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento pago com aprovação de gestor e campos personalizados', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Aprovar
  cy.contains('button', 'Aprovar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Aprova
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 60000})
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

   });

   it("Aceita o Treinamento gratuito com aprovação de gestor e campos personalizados", () => {
      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento gratuito com aprovação de gestor e campos personalizados', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
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

  //Clica em Aprovar
  cy.contains('button', 'Aprovar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Aprova
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 60000})
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(7)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.log('VEREFIQUE O SEU EMAIL')
  cy.pause()

    });
  });
});