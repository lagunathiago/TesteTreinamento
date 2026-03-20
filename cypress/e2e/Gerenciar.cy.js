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


     it("Clica na aba treinamento", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

     });

/*
      it('Cria o treinamento', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Gerenciar Teste Automação") //  Nome no Treinamento

        cy.get('[aspect="square"]').selectFile('cypress/fixtures/Grenciar.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

    
    })

     it("Conteúdo - Documento JPEG", () => {

      //Clica em conteudos
            cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:60000})
            .should('be.visible')
            .click();

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:60000})
            .should('be.visible')
            .click();


      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 60000 })
        .should("have.length", 1)
        .type("CAPA 19.jpg", { delay: 10 });

      cy.contains(
        ".ui-select-choices-row",
        "CAPA 19.jpg",
        { timeout: 60000 },
      )
        .should("be.visible")
        .click({ force: true });

        //Peso 1
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

  
    it('Turma Gratuita sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita sem aprovação"); //nome da turma
     cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna')
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

    });
*/

    it('Digita Treinamento', () => {
       
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

//Clica no treinamento: Gerenciar Teste Automação
  cy.contains('.card-title', /^Gerenciar Teste Automação$/, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

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
  .type('kaka 1', { force: true });

  //Pesquisa
cy.get('course-not-subscribed-users.ng-isolate-scope > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
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

    cy.wait(2000)

  //Confirma
  cy.contains('button:visible', 'Confirmar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

    cy.wait(4000)


  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(1000)

 //verefica se foi matriculado
 cy.contains('td.userNameColumn', 'kaka 1', { timeout: 20000 })
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
  .eq(1) // 1=E-MAIL
  .click({ force: true })
  .type('{selectall}{backspace}iiuqprxz@sharklasers.com', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(1)
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

  cy.wait(2000)

  //Confirma
  cy.contains('button:visible', 'Confirmar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(4000)

 //Verefica se foi matriulado
 cy.contains('td.userEmailColumn', 'iiuqprxz@sharklasers.com', { timeout: 20000 })
  .should('be.visible');

  cy.wait(1000)

  //Volta em Não Matriculados//Matriculados/Concluidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

     it('Pesquisa por Login e faz a Matricula', () => {

      //Digita Login
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(2) // 2= pesquisa de Login
  .click({ force: true })
  .type('{selectall}{backspace}teste aut', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(2)
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

  cy.wait(2000)

  //Confirma
  cy.contains('button:visible', 'Confirmar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  //Matriculados/Concluidos
      cy.contains('a', 'Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

 cy.wait(2000)

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

   //Digita Grupo
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(0) // Grupo geralmente é o primeiro
  .click({ force: true })
  .type('Grupo - 2', { force: true });

  cy.wait(1000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(3)
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

  cy.wait(2000)

  //Confirma
  cy.contains('button:visible', 'Confirmar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

    });

 it('Pesquisa por Cargo e faz a Matricula', () => {

  //Digita Cargo
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(1) //
  .click({ force: true })
  .type('Analista de Testes JR', { force: true });

  cy.wait(1000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(4)
  .click({ force: true });

  cy.wait(1000)

//Clica no iconn box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Confirma
  cy.contains('button:visible', 'Confirmar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)


    });

    */

it('Pesquisa por Perfil faz a Matricula', () => {

   //Digita perfil
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(2) //
  .click({ force: true })
  .type('Aluno', { force: true });

  cy.wait(1000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(5)
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

  cy.wait(2000)

  //Confirma
  cy.contains('button:visible', 'Confirmar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

    });

it('Pesquisa por Clientes e faz a Matricula', () => {

  //Digita Clientes
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(3) //
  .click({ force: true })
  .type('Outro', { force: true });

  cy.wait(1000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(6)
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

  cy.wait(2000)

  //Confirma
  cy.contains('button:visible', 'Confirmar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

  
    });

it('Pesquisa por txt faz a Matricula', () => {

//Clica em Filtar por arquivo
  cy.get('.mt-5 > .flex > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.log('ADICIONE UM ARQUIVO TXT')
  cy.pause()
  
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

  cy.wait(2000)

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
 cy.contains('td.userNameColumn', 'Thiago', { timeout: 20000 })
  .should('be.visible');

  cy.wait(1000)

  //Volta em Não Matriculados//Matriculados/Concluidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

it("Filtros de exportação/Não matriculados", () => {
  cy.wait(3000)

      //Selecionar colunas
        cy.get('#not-subscribed-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-collection', { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.get('[data-cv-idx="0"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="1"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="2"]').click();
      cy.wait(1000);

      cy.get('[data-cv-idx="0"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="1"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="2"]').click();
      cy.wait(1000);
  
      cy.wait(5000)
      
  //Clica em Matricular
 cy.get('.manage-subscriptions-area-header > .lector-txt-accent')
  .click({ force: true });

      //Copiar
      cy.get('#not-subscribed-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-copy',{ timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Csv
      cy.get('#not-subscribed-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-csv', { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Pdf
      cy.get('#not-subscribed-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-pdf', { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Copiar
      cy.get('#not-subscribed-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-copy', { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Selecionar todos
      cy.get('#not-subscribed-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-select-all', { timeout: 60000 })
      .should("be.visible")
      .click();

      //Desmarcar todos
      cy.get('#not-subscribed-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-select-none', { timeout: 60000 })
      .should("be.visible")
      .click();

      //Imprimir
      cy.get('#not-subscribed-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-print', { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(6000);

    });


// -----------------Matriculados/Cancelar Matriculas------------------------
    
    it('Matriculados/Cancelar Matriculas', () => {
      
      //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

    it('Pesquisa por Usuario e Cancela a Matricula', () => {

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('teste teste 05', { force: true });

  //Pesquisa
  cy.get('[ng-show="manageSubscriptionsTabs.subscribed"] > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="subscribedUsersReport.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('1 Cancelamento realizado via automação Cypress', { force: true })

  //Confirma
  cy.get('[switch="modal.cancelSubscriptions"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)
 
  cy.contains('table tbody tr', 'teste 08/01 - 6', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Cancelado')
   });


  });

it('Pesquisa por E-mail e Cancela a Matricula', () => {

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 0=USUÁRIO, 1=E-MAIL
  .click({ force: true })
  .type('{selectall}{backspace}teste0801-1@sharklasers.com', { force: true });


  //Pesquisa
  cy.get('[ng-show="manageSubscriptionsTabs.subscribed"] > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="subscribedUsersReport.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('2 Cancelamento realizado via automação Cypress', { force: true })

  //Confirma
  cy.get('[switch="modal.cancelSubscriptions"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)

    cy.contains('td.subscriptionStatusColumn', 'Cancelado', { timeout: 60000 })
  .should('be.visible')

});
 
// Bug Visual, Foi feita a programação,Porem não foi testado, Falta Testar 
it('Pesquisa por Login e Cancela a Matricula', () => {

  //Digita Login
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(2) // 2=USUÁRIO, login
  .click({ force: true })
  .type('{selectall}{backspace}teste aut', { force: true });

  //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(3) > .filters-container > .multiselect > form.ng-valid > .btn', {timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="subscribedUsersReport.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('3 Cancelamento realizado via automação Cypress', { force: true })

  //Confirma
  cy.get('[switch="modal.cancelSubscriptions"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)

    cy.contains('td.subscriptionStatusColumn', 'Cancelado', { timeout: 60000 })
  .should('be.visible')

    });

    it('Pesquisa por Grupo e Cancela a Matricula', () => {

  // Digita em Grupos
cy.get('input.ui-select-search', { timeout: 20000 })
  .filter(':visible')
  .eq(0) // 0= Grupos
  .click({ force: true })
  .type('grupo 13.11 2', { force: true });

  //Clica no Grupo digitado
  cy.contains('.ui-select-choices-row', 'grupo 13.11 2', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(3) > .filters-container > .multiselect > form.ng-valid > .btn', {timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="subscribedUsersReport.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('4 Cancelamento realizado via automação Cypress', { force: true })

  //Confirma
  cy.get('[switch="modal.cancelSubscriptions"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)

    cy.contains('td.subscriptionStatusColumn', 'Cancelado', { timeout: 60000 })
  .should('be.visible')

    });

 it('Pesquisa por Cargo e Cancela a Matricula', () => {

  // Digita em Cargo
cy.get('input.ui-select-search', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 1=Cargo
  .click({ force: true })
  .type('CARGO 09.01', { force: true });

  //Clica no Cargo Digitado
  cy.contains('.ui-select-choices-row', 'CARGO 09.01', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(3) > .filters-container > .multiselect > form.ng-valid > .btn', {timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="subscribedUsersReport.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('4 Cancelamento realizado via automação Cypress', { force: true })

  //Confirma
  cy.get('[switch="modal.cancelSubscriptions"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)

    cy.contains('td.subscriptionStatusColumn', 'Cancelado', { timeout: 60000 })
  .should('be.visible')

    });

it('Pesquisa por Perfil e Cancela a Matricula', () => {

  // Digita em Perfil
cy.get('input.ui-select-search', { timeout: 20000 })
  .filter(':visible')
  .eq(2) //2 = perfil
  .click({ force: true })
  .type('Aluno', { force: true });

  //Clica no Aluno Digitado
  cy.contains('.ui-select-choices-row', 'Aluno', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(3) > .filters-container > .multiselect > form.ng-valid > .btn', {timeout:60000})
  .should('be.visible')
  .click({ force: true });

  //Clica no Thiago Suporte
  cy.contains('td.userNameColumn', 'Thiago suporte', { timeout: 20000 })
  .parents('tr')
  .find('td.select-checkbox')
  .click({ force: true });

  cy.wait(1000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="subscribedUsersReport.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('5 Cancelamento realizado via automação Cypress', { force: true })

  //Confirma
  cy.get('[switch="modal.cancelSubscriptions"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)

    cy.contains('td.subscriptionStatusColumn', 'Cancelado', { timeout: 60000 })
  .should('be.visible')

    });

    it('Pesquisa por Unidade e Cancela a Matricula', () => {

  // Digita em Perfil
cy.get('input.ui-select-search', { timeout: 20000 })
  .filter(':visible')
  .eq(3) //3 = Perfil
  .click({ force: true })
  .type('Pay per Use', { force: true });

  //Clica no Aluno Digitado
  cy.contains('.ui-select-choices-row', 'Pay per Use', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(3) > .filters-container > .multiselect > form.ng-valid > .btn', {timeout:60000})
  .should('be.visible')
  .click({ force: true });

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="subscribedUsersReport.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('6 Cancelamento realizado via automação Cypress', { force: true })

  //Confirma
  cy.get('[switch="modal.cancelSubscriptions"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)

    cy.contains('td.subscriptionStatusColumn', 'Cancelado', { timeout: 60000 })
  .should('be.visible')

     });

it('Volta para não Matriculados e Matricula alunos para Concluir o Treinamento', () => {
  
  //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

    });


it('Pesquisa por Usuario e faz Matricula', () => {

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('usuario 791', { force: true });

  //Pesquisa
  cy.get('course-not-subscribed-users.ng-isolate-scope > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

  //Clica no Icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

    cy.wait(4000)
  
    });

     it('Pesquisa por Email e faz a Matricula', () => {

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 0=USUÁRIO, 1=E-MAIL
  .click({ force: true })
  .type('{selectall}{backspace}654651@hml2.lector.com', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('course-not-subscribed-users.ng-isolate-scope > [ng-include=""] > .report-filters > :nth-child(2) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
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

  cy.wait(2000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

    });

     it('Pesquisa por Login e faz a Matricula', () => {

      //Digita Login
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(2) // 2= pesquisa de Login
  .click({ force: true })
  .type('{selectall}{backspace}usertest120421', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('course-not-subscribed-users.ng-isolate-scope > [ng-include=""] > .report-filters > :nth-child(3) > .filters-container > .multiselect > form.ng-pristine > .btn',{timeout:60000})
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

  cy.wait(2000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

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

  cy.wait(2000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

    });

it('Pesquisa por Perfil faz a Matricula', () => {

      //Digita Perfil
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

  cy.wait(2000)

  //Confirma
  cy.get('[switch="modal.confirmSubscribeUsers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

    });

it('Pesquisa por Perfil faz a Matricula', () => {

      //Digita Perfil
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

  cy.wait(2000)

  //Clica em Matricular
  cy.get('button[ng-click="showSubscribeUsers()"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)


    });

  });
  
});