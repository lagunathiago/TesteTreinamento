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
    msg.includes('Document is not focused')
  ) {
    return false;
  }
});


describe("Teste - Login", () => {
  before(() => {

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("thiagosuporte@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");


  });

  context("Criando Treinamento", { testIsolation: false }, () => {

    it("Vai em treinamentos e pesquisa o treinamento", () => {
       
        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Digita o Treianamento
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 20000 })
  .should('be.visible')
  .clear()
  .type('Gerenciar Teste Automação');

  //Clica em pesquisar
  cy.get('.multiselect.ng-dirty > .btn', {timeout: 60000})
  .should('be.visible')
  .click()

  //Clica no Treinamento
  cy.contains('.card-title', 'Gerenciar Teste Automação', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()
      
    });

       // -----------------Não Matriculados------------------------
   /*
    it('Pesquisa por Usuario e faz Matricula', () => {

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('teste 08/01 - 6', { force: true });

  //Pesquisa
  cy.get('[ng-show="manageSubscriptionsTabs.notSubscribed"] > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

    cy.wait(4000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

    cy.wait(4000)

  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(1000)

 //verefica se foi matriculado
 cy.contains('td.userNameColumn', 'teste 08/01 - 6', { timeout: 20000 })
  .should('be.visible');

  //Volta em Não Matriculados//Matriculados/Concluidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()
  
    });

     it('Pesquisa por Email e faz a Matricula', () => {

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 0=USUÁRIO, 1=E-MAIL
  .click({ force: true })
  .type('{selectall}{backspace}teste0801-1@sharklasers.com', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('[ng-show="manageSubscriptionsTabs.notSubscribed"] > [ng-include=""] > .report-filters > :nth-child(2) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

//clica no iconn box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(4000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(4000)

 //Verefica se foi matriulado
 cy.contains('td.userEmailColumn', 'teste0801-5@sharklasers.com', { timeout: 20000 })
  .should('be.visible');

  cy.wait(1000)

  //Volta em Não Matriculados//Matriculados/Concluidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

     it('Pesquisa por Login e faz a Matricula', () => {

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(2) // 2= pesquisa de login
  .click({ force: true })
  .type('{selectall}{backspace}teste aut', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('[ng-show="manageSubscriptionsTabs.notSubscribed"] > [ng-include=""] > .report-filters > :nth-child(2) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

//clica no iconn box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(4000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(4000)

 //Verefica se foi matriulado
 cy.contains('td.userLoginColumn', 'teste aut', { timeout: 20000 })
  .should('be.visible');

  cy.wait(1000)

  //Volta em Não Matriculados//Matriculados/Concluidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

       it('Pesquisa por Grupo e faz a Matricula', () => {

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(3) // 
  .click({ force: true })
  .type('{selectall}{backspace}Grupo - 2', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('[ng-show="manageSubscriptionsTabs.notSubscribed"] > [ng-include=""] > .report-filters > :nth-child(2) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

//clica no iconn box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(2000)

 //Verefica se foi matriulado
 cy.contains('td.userNameColumn', 'kaka1', { timeout: 20000 })
  .should('be.visible');

  cy.wait(1000)

  //Volta em Não Matriculados//Matriculados/Concluidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

 it('Pesquisa por Cargo e faz a Matricula', () => {

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(4) // 2= pesquisa de grupos
  .click({ force: true })
  .type('{selectall}{backspace}Analista de Testes JR', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('[ng-show="manageSubscriptionsTabs.notSubscribed"] > [ng-include=""] > .report-filters > :nth-child(2) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

//clica no iconn box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(2000)

 //Verefica se foi matriulado
 cy.contains('td.userNameColumn', 'USUARIO 06.06.2024 10', { timeout: 20000 })
  .should('be.visible');

  cy.wait(1000)

  //Volta em Não Matriculados//Matriculados/Concluidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

it('Pesquisa por Perfil faz a Matricula', () => {

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(5) // 2= pesquisa de grupos
  .click({ force: true })
  .type('{selectall}{backspace}Aluno', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('[ng-show="manageSubscriptionsTabs.notSubscribed"] > [ng-include=""] > .report-filters > :nth-child(2) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

//clica no iconn box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(2000)

 //Verefica se foi matriulado
 cy.contains('td.userNameColumn', 'Valindolfo Blener', { timeout: 20000 })
  .should('be.visible');

  cy.wait(1000)

  //Volta em Não Matriculados//Matriculados/Concluidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

    })
    */

it('Pesquisa por Perfil faz a Matricula', () => {

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(6) // 2= pesquisa de grupos
  .click({ force: true })
  .type('{selectall}{backspace}Outro', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('[ng-show="manageSubscriptionsTabs.notSubscribed"] > [ng-include=""] > .report-filters > :nth-child(2) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

//clica no iconn box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(2000)

 //Verefica se foi matriulado
 cy.contains('td.userNameColumn', '03 10', { timeout: 20000 })
  .should('be.visible');

  cy.wait(1000)

  //Volta em Não Matriculados//Matriculados/Concluidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

    });


    
    
  });

});