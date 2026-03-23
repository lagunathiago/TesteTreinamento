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

  cy.wait(1000)

  // Clica no segundo
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(1)
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
    
       it('Pesquisa por Grupo e faz a Matricula', () => {

   //Digita Grupo
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(0) // Grupo geralmente é o primeiro
  .click({ force: true })
  .type('Grupo - 2', { force: true });

  cy.wait(2000)

    //Clique no grupo
  cy.contains('Grupo - 2', {timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

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

  // Clica no segundo
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(1)
  .click({ force: true });

  // Clica no terceiro
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(2)
  .click({ force: true });

  // Clica no quarto
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(3)
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

  cy.wait(2000)

    //Clique no cargo
  cy.contains('Analista de Testes JR', {timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(4)
  .click({ force: true });

  cy.wait(1000)

//clica no iconn box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  // Clica no segundo
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(1)
  .click({ force: true });

   // Clica no terceiro
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(2)
  .click({ force: true });

  // Clica no quarto
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(3)
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


it('Pesquisa por Perfil faz a Matricula', () => {

   //Digita perfil
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(2) //
  .click({ force: true })
  .type('Aluno', { force: true });

  cy.wait(2000)

  cy.contains('Aluno', {timeout: 20000})
  .should('be.visible')
  .click()

  cy.wait(2000)

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

  // Clica no segundo
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(1)
  .click({ force: true });

   // Clica no terceiro
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(2)
  .click({ force: true });

  // Clica no quarto
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(3)
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

  cy.wait(2000)

   cy.contains('Outro', {timeout: 20000})
  .should('be.visible')
  .click()

  .cy.wait(2000)

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

  // Clica no segundo
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(1)
  .click({ force: true });

  cy.wait(1000)

   // Clica no terceiro
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(2)
  .click({ force: true });

  // Clica no quarto
cy.get('td.select-checkbox')
  .filter(':visible')
  .eq(3)
  .click({ force: true });

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
  cy.contains('button:visible', 'Confirmar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

    });

it("Filtros de exportação/Não matriculados", () => {
  cy.wait(3000)

  //Selecionar colunas
        cy.get('#not-subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-collection', { timeout: 60000 })
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

      //Vai e volta para fechar a caixinha de selecionar colunas

      //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

          //Clica em Matriculados Concuidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(3000)
    
      //Copiar
      cy.get('#not-subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-copy',{ timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Csv
      cy.get('#not-subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-csv', { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Pdf
      cy.get('#not-subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-pdf', { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Xls
      cy.get('#not-subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .icon-file-xls', { timeout: 60000 })
      .should("be.visible")
      .click();

      //Vai e volta pra ficar 10 porpágina
      //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

          //Clica em Matriculados Concuidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(3000)
    

      cy.wait(1000);

       //Selecionar todos
        cy.get('#not-subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-select-all', { timeout: 60000 })
        .should("be.visible")
        .click();

        cy.wait(1000)

        //Desmarcar todos
        cy.get('#not-subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-select-none', { timeout: 60000 })
        .should("be.visible")
        .click();

      //Imprimir
      cy.get('#not-subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-print', { timeout: 60000 })
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

      cy.wait(4000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('kaka 1', { force: true });

    cy.wait(2000)

    //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });
  
  cy.wait(4000)

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
  cy.get('textarea[ng-model="report.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('1 Cancelamento realizado via automação Cypress', { force: true });

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(2000)
 
  });


it('Pesquisa por E-mail e Cancela a Matricula', () => {

  cy.wait(4000)

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 0=USUÁRIO, 1=E-MAIL
  .click({ force: true })
  .type('{selectall}{backspace}teste0801-1@sharklasers.com', { force: true });

   //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(1)
  .click({ force: true });

  cy.wait(4000)

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
  cy.get('textarea[ng-model="report.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('2 Cancelamento realizado via automação Cypress', { force: true });

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(2000)

});

 
it('Pesquisa por Login e Cancela a Matricula', () => {

  cy.wait(4000)

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
  .click({ force: true })

  cy.wait(4000)

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
  cy.get('textarea[ng-model="report.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('3 Cancelamento realizado via automação Cypress', { force: true });

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    });


    it('Clica em Situação', () => {

    //Clica em situação
    cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(10) > .filters-container > .multiselect', {timeout:60000})
    .should('be.visible')
    .click()

    cy.wait(2000)

    // espera o dropdown aparecer
cy.get('.ui-select-choices', { timeout: 60000 })
  .should('be.visible');

  //Clica em Concluído
cy.get('.open > .ui-select-choices > :nth-child(6)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

   });

   it('Verifica se os usuários estão como Cancelados', () => {

      cy.contains('table tbody tr', 'kaka 1', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Concluído')
   });

     cy.contains('table tbody tr', 'teste0801-1@sharklasers.com', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Concluído')
   });

     cy.contains('table tbody tr', 'teste aut', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Concluído')
     });

    });

      it('Volta para a situação qualquer', () => {

    //Clica em situação
    cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(10) > .filters-container > .multiselect', {timeout:60000})
    .should('be.visible')
    .click()

    cy.wait(2000)

    // espera o dropdown aparecer
cy.get('.ui-select-choices', { timeout: 60000 })
  .should('be.visible');

  //Clica em Qualquer
cy.get('.open > .ui-select-choices > :nth-child(1)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
    
   });

    it('Pesquisa por Grupo e Cancela a Matricula', () => {

      cy.wait(4000)

   //Digita Grupo
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(0) // Grupo geralmente é o primeiro
  .click({ force: true })
  .type('Grupo - 2', { force: true });

  cy.wait(2000)

  //Clique no grupo
  cy.contains('Grupo - 2', {timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

 //Pesquisa
 cy.get(':nth-child(5) > .filters-container > .multiselect > .icon-spyglass', {timeout:60000})
  .should('be.visible')
  .click({force: true})
  
  cy.wait(2000)

  //Clica no primero icon box disponivel
  cy.get('td.select-checkbox:visible', { timeout: 60000 })
  .not('.disabled') // evita desabilitados (se existir)
  .not('.selected') // evita já selecionados (se existir)
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="report.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('4 Cancelamento realizado via automação Cypress', { force: true });

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(2000)

    });

 it('Pesquisa por Cargo e Cancela a Matricula', () => {

  cy.wait(2000)

   //Digita Cargo
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(1) //
  .click({ force: true })
  .type('Analista de Testes JR', { force: true });

  //Clique no Cargo
  cy.contains('Analista de Testes JR', {timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(4)
  .click({ force: true });

  cy.wait(2000)

  //Clica no primero icon box disponivel
  cy.get('td.select-checkbox:visible', { timeout: 60000 })
  .not('.disabled') // evita desabilitados (se existir)
  .not('.selected') // evita já selecionados (se existir)
  .first()
  .click({ force: true });

  cy.wait(2000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="report.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('5 Cancelamento realizado via automação Cypress', { force: true });

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

      cy.wait(2000)

    });

it('Pesquisa por Perfil e Cancela a Matricula', () => {

  cy.wait(2000)
  
    //Digita perfil
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(2) //
  .click({ force: true })
  .type('Aluno', { force: true });

  cy.wait(2000)

    //Clique no perfil
 cy.contains('.ui-select-choices-row', 'Aluno', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(5)
  .click({ force: true });

  cy.wait(2000)

  //Clica no primero icon box disponivel
  cy.get('td.select-checkbox:visible', { timeout: 60000 })
  .not('.disabled') // evita desabilitados (se existir)
  .not('.selected') // evita já selecionados (se existir)
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Escreve
  cy.get('textarea[ng-model="report.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('6 Cancelamento realizado via automação Cypress', { force: true });

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

   cy.wait(2000)

    });

    it('Pesquisa por Unidade e Cancela a Matricula', () => {

      cy.wait(2000)

   //Digita Clientes
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(3) //
  .click({ force: true })
  .type('Outro', { force: true });

  cy.wait(2000)

    //Clique na unidade
  cy.contains('.ui-select-choices-row', 'Outro', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(6)
  .click({ force: true });

  cy.wait(2000)

 //Clica no primero icon box disponivel
  cy.get('td.select-checkbox:visible', { timeout: 60000 })
  .not('.disabled') // evita desabilitados (se existir)
  .not('.selected') // evita já selecionados (se existir)
  .first()
  .click({ force: true });

  cy.wait(1000)

   //Cancelar Matricula
  cy.contains('button', 'Cancelar matrícula', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
  
  //Escreve
  cy.get('textarea[ng-model="report.cancellationReason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('6 Cancelamento realizado via automação Cypress', { force: true });

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(3000)

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
  .type('name shark', { force: true });

  cy.wait(1000)

  //Pesquisa
cy.get('course-not-subscribed-users.ng-isolate-scope > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

  //clica no iconn box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

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

  
     it('Pesquisa por Email e faz a Matricula', () => {

       //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 1=E-MAIL
  .click({ force: true })
  .type('{selectall}{backspace}mika@uorak.com', { force: true });

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

  cy.wait(2000)

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

     it('Pesquisa por Login e faz a Matricula', () => {

       //Digita Login
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(2) // 2= pesquisa de Login
  .click({ force: true })
  .type('{selectall}{backspace}teste090425@uorak.com', { force: true });

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

    });
*/
it('Vai para a aba de Matriculados/concluidos', () => {

   //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

     });

     /*
    it('Pesquisa por Usuario e Conclui a Matricula', () => {

      cy.wait(4000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('name shark', { force: true });

    cy.wait(2000)

    //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });
  
  cy.wait(3000)

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Concluir Matricula
  cy.contains('button', 'Concluir matrícula(s)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(2000)

    });

    it('Pesquisa por E-mail e Conclui a Matricula', () => {

  cy.wait(4000)

//Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 0=USUÁRIO, 1=E-MAIL
  .click({ force: true })
  .type('{selectall}{backspace}mika@uorak.com', { force: true });

   //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(1)
  .click({ force: true });

  cy.wait(4000)

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

   //Concluir Matricula
  cy.contains('button', 'Concluir matrícula(s)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
  
  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(2000)

});

it('Pesquisa por Login e Conclui a Matricula', () => {

  cy.wait(4000)

  //Digita Login
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(2) // 2= pesquisa de Login
  .click({ force: true })
  .type('{selectall}{backspace}teste090425@uorak.com', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(2)
  .click({ force: true })

  cy.wait(4000)

  //Clica no icon box
 cy.get('td.select-checkbox')
  .filter(':visible')
  .first()
  .click({ force: true });

  cy.wait(1000)

   //Concluir Matricula
  cy.contains('button', 'Concluir matrícula(s)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
  
  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(2000)

   });

   it('Clica em Situação', () => {

    //Clica em situação
    cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(10) > .filters-container > .multiselect', {timeout:60000})
    .should('be.visible')
    .click()

    cy.wait(2000)

    // espera o dropdown aparecer
cy.get('.ui-select-choices', { timeout: 60000 })
  .should('be.visible');

  //Clica em Concluído
cy.get('.open > .ui-select-choices > :nth-child(5)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

   });

   it('Verifica se os usuários estão como Concluidos', () => {

      cy.contains('table tbody tr', 'Mikaelle Teste', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Concluído')
   });

     cy.contains('table tbody tr', 'name shark', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Concluído')
   });

     cy.contains('table tbody tr', 'Usuário Teste 090425', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Concluído')
     });

    });

      it('Volta para a situação qualquer', () => {

    //Clica em situação
    cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(10) > .filters-container > .multiselect', {timeout:60000})
    .should('be.visible')
    .click()

    cy.wait(2000)

    // espera o dropdown aparecer
cy.get('.ui-select-choices', { timeout: 60000 })
  .should('be.visible');

  //Clica em Qualquer
cy.get('.open > .ui-select-choices > :nth-child(1)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(3000)
    
   });

   it('Pesquisa por Grupo e Conclui á Matricula', () => {

      cy.wait(4000)

   //Digita Grupo
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(0) // Grupo geralmente é o primeiro
  .click({ force: true })
  .type('Grupo - 2', { force: true });

  cy.wait(2000)

  //Clique no grupo
  cy.contains('Grupo - 2', {timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

 //Pesquisa
 cy.get(':nth-child(5) > .filters-container > .multiselect > .icon-spyglass', {timeout:60000})
  .should('be.visible')
  .click({force: true})
  
  cy.wait(2000)

  //Clica no primero icon box disponivel
  cy.get('td.select-checkbox:visible', { timeout: 60000 })
  .not('.disabled') // evita desabilitados (se existir)
  .not('.selected') // evita já selecionados (se existir)
  .first()
  .click({ force: true });

  cy.wait(1000)

  //Concluir Matricula
  cy.contains('button', 'Concluir matrícula(s)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
  
  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });
    cy.wait(2000)

    //Fecha o Grupo - 2
    cy.get(':nth-child(5) > .filters-container > .multiselect > .border > div > .ui-select-match > [ng-repeat="$item in $select.selected track by $index"] > .ui-select-match-item > .close', {timeout: 60000})
    .click()

    cy.wait(2000)

    });

    it('Pesquisa por Cargo e Conclui a matricula', () => {

  cy.wait(2000)

   //Digita Cargo
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(1) //
  .click({ force: true })
  .type('Analista de Testes JR', { force: true });

  //Clique no Cargo
  cy.contains('Analista de Testes JR', {timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(4)
  .click({ force: true });

  cy.wait(2000)

  //Clica no primero icon box disponivel
  cy.get('td.select-checkbox:visible', { timeout: 60000 })
  .not('.disabled') // evita desabilitados (se existir)
  .not('.selected') // evita já selecionados (se existir)
  .first()
  .click({ force: true });

  cy.wait(2000)
  
  //Concluir Matricula
  cy.contains('button', 'Concluir matrícula(s)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
  
  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(2000)

    //Fecha o Analista de Teste Jr
    cy.get(':nth-child(6) > .filters-container > .multiselect > .border > div > .ui-select-match > [ng-repeat="$item in $select.selected track by $index"] > .ui-select-match-item > .close', {timeout: 60000})
    .click()

    cy.wait(2000)

    });

    it('Pesquisa por Perfil e Conclui á matricula a Matricula', () => {

  cy.wait(2000)
  
    //Digita perfil
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(2) //
  .click({ force: true })
  .type('Aluno', { force: true });

  cy.wait(2000)

    //Clique no perfil
 cy.contains('.ui-select-choices-row', 'Aluno', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(5)
  .click({ force: true });

  cy.wait(2000)

  //Clica no primero icon box disponivel
  cy.get('td.select-checkbox:visible', { timeout: 60000 })
  .not('.disabled') // evita desabilitados (se existir)
  .not('.selected') // evita já selecionados (se existir)
  .first()
  .click({ force: true });

  cy.wait(1000)

 //Concluir Matricula
  cy.contains('button', 'Concluir matrícula(s)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
  
  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(2000)

    //Fecha o Aluno
    cy.get(':nth-child(7) > .filters-container > .multiselect > .border > div > .ui-select-match > [ng-repeat="$item in $select.selected track by $index"] > .ui-select-match-item > .close', {timeout: 60000})
    .click()

    cy.wait(2000)

    });

     it('Pesquisa por Unidade e Concluir a Matricula', () => {

      cy.wait(2000)

   //Digita Clientes
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(3) //
  .click({ force: true })
  .type('Outro', { force: true });

  cy.wait(2000)

    //Clique na unidade
  cy.contains('.ui-select-choices-row', 'Outro', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(6)
  .click({ force: true });

  cy.wait(2000)

 //Clica no primero icon box disponivel
  cy.get('td.select-checkbox:visible', { timeout: 60000 })
  .not('.disabled') // evita desabilitados (se existir)
  .not('.selected') // evita já selecionados (se existir)
  .first()
  .click({ force: true });

  cy.wait(1000)

 //Concluir Matricula
  cy.contains('button', 'Concluir matrícula(s)', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
  
  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });
    cy.wait(2000)

    //Fecha o Outro
    cy.get(':nth-child(8) > .filters-container > .multiselect > .border > div > .ui-select-match > [ng-repeat="$item in $select.selected track by $index"] > .ui-select-match-item > .close', {timeout: 60000})
    .click()

    cy.wait(2000)

     });

it('Ativa a fleg => Exibir apenas os melhores resultados de cada usuário', () => {

  //Clica na Fleg
  cy.get('.col-sm-12 > .checkbox.mb-20 > .icon-checkbox', {timeout:60000})
  .should('be.visible')
  .click()

  //Verifica se apresentou apenas os usuarios concluidos
    cy.contains('table tbody tr', 'Concluído', { timeout: 60000 })
    .first()
    .should('be.visible')

    cy.wait(1000)

      //Clica na Fleg
    cy.get('.col-sm-12 > .checkbox.mb-20 > .icon-checkbox',{timeout:60000})
  .should('be.visible')
  .click()

   });

   it("Filtros de exportação/Não matriculados", () => {

  cy.wait(2000)

    //Selecionar todos
        cy.get('#subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-select-all', {timeout: 60000})
        .should("be.visible")
        .click();

        cy.wait(1000)

        //Desmarcar todos
        cy.get('#subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-select-none', {timeout:60000})
        .should("be.visible")
        .click();

  //Selecionar colunas
        cy.get('#subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-collection', {timeout:60000})
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

      //Vai e volta para fechar a caixinha de selecionar colunas
      cy.wait(2000)

          //Clica em Não Matriculados Concuidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

  cy.wait(3000)
    
      //Copiar
      cy.get('#subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-copy', {timeout:60000})
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Csv
      cy.get('#subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-csv', {timeout:60000})
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Pdf
      cy.get('#subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-pdf', {timeout:60000})
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Xls
      cy.get('#subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .icon-file-xls', {timeout:60000})
      .should("be.visible")
      .click();

      //Vai e volta pra ficar 10 porpágina
         //Clica em Matriculados Concuidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .should('be.visible')
  .click()

      //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

      //Imprimir
      cy.get('#subscribed-table-1476721_wrapper > :nth-child(1) > .dt-buttons > .buttons-print')
      .should("be.visible")
      .click();

      cy.wait(6000);
  
    });

    it('Transferir', () => {

      //Clica no primeiro Transferir
      cy.contains('button', 'Transferir', { timeout: 60000 })
  .first()
  .click({ force: true });

  cy.wait(1000)

  // abre select
cy.get('.modal:visible', { timeout: 60000 })
  .find('.ui-select-toggle:visible')
  .first()
  .click({ force: true });

  //Clica em 5.5
  cy.contains('5 5', {timeout:60000})
  .should('be.visible')
  .click()

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(4000)

    //Concluidas 
     cy.contains('table tbody tr', '5 5', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Em andamento')
   });

   it('Conversar', () => {

    //Clica no primeiro Transferir
      cy.contains('button', 'Conversar', { timeout: 60000 })
  .first()
  .click({ force: true });

   //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  // digita mensagem
cy.get('#chat-input', { timeout: 60000 })
  .should('be.visible')
  .click()
  .type('Mensagem enviada via automação Cypress ', { force: true });

// envia
cy.get('button.icon-location:visible')
  .click({ force: true });

  cy.wait(2000)

  cy.get('.chat-window-actions > .icon-close')
  .click({ force: true })
    
      });

      it('Clica em Gerenciar', () => {

        //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click({ force: true })

  //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

  cy.wait(3000)
        
      });

      it('Bloquear (botão bloquear Não funciona na plataforma, apenas fiz a automação para verificar se ão aconetece nada grave)', () => {

        //Clica no primeiro Bloquear
      cy.contains('button', 'Bloquear', { timeout: 60000 })
  .first()
  .click({ force: true });

  cy.wait(1000)

    //Fecha modal
 cy.get('[ng-click="closeBlockSubscriptionsModal()"]', { timeout: 60000 })
  .first()
  .click({ force: true });

      });
*/

      it('Certificado', () => {

   //Concluir Matricula
  cy.contains('button', 'Emitir certificados', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

   //Clica no icon box
  cy.get('.checkbox:visible', { timeout: 60000 })
  .first()
  .click({ force: true });

  cy.wait(2000)

  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

    cy.wait(4000)


        
      });
   
    });

  });
  