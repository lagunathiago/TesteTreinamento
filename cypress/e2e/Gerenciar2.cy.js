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

/*
     it("Clica vai ate a categoria", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

     });

      it('Cria o treinamento', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Segundo Teste Gerenciar Automação") //  Nome no Treinamento

        cy.get('[aspect="square"]').selectFile('cypress/fixtures/Gerenciar2.png', { force: true });
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

          cy.get(".editing-resource > .end > .btn-swipe-accent", { timeout: 60000 })
        .should("exist")
        .click({ force: true });

    });

     it("Conteúdo - Certificado", () => {

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:60000})
            .should('be.visible')
            .click();
      
      cy.get(".editing-resource > :nth-child(2) > .w-100").click();

      cy.get("body .ui-select-choices-row", { timeout: 60000 })
        .should("be.visible")
        .contains(/^Certificado$/i)
        .click({ force: true });

      cy.wait(1500);

      cy.contains(".ui-select-container", "Informe o nome do certificado", {
        timeout: 60000,
      })
        .scrollIntoView()
        .should("be.visible")
        .within(() => {
          cy.get(".ui-select-toggle").click({ force: true });
        });

      cy.get("input.ui-select-search:visible", { timeout: 60000 })
        .should("have.length", 1)
        .clear({ force: true })
        .type("Certificado do Treinamento", { force: true, delay: 20 });

      // Se existir opção, clica nela
      cy.get(".ui-select-choices-row", { timeout: 60000 })
        .contains("Certificado do Treinamento")
        .click({ force: true });

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();
    });
  
    it('Turma Paga sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita sem aprovação"); //nome da turma
     cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação


      cy.get(".price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio").click(); //Clica em fixo
      cy.get("#price-fixed").click(); //Clica no valor
      cy.get("#price-fixed") //Valor Treinamento
        .clear()
        .type("{selectall}2");
      

      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("Aluno")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

    });

    it('Digita Treinamento', () => {


      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Digita o Treianamento
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 20000 })
  .should('be.visible')
  .clear()
  .type('Segundo Teste Gerenciar Automação');

  //Clica em pesquisar
  cy.get('.multiselect.ng-dirty > .btn', {timeout: 60000})
  .should('be.visible')
  .click()

//Clica no treinamento: Gerenciar Teste Automação
  cy.contains('.card-title', /^Segundo Teste Gerenciar Automação$/, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()
      
    });

       // -----------------Não Matriculados------------------------

   
    it('Pesquisa por Usuario e faz Matricula', () => {

        cy.wait(3000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('thiago teste', { force: true });

  //Pesquisa
cy.get('course-not-subscribed-users.ng-isolate-scope > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

        cy.wait(3000)

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

                cy.wait(3000)

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

        cy.wait(3000)

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

     it('Pesquisa por Login e faz a Matricula', () => {


                cy.wait(3000)

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

          cy.wait(3000)

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
    
       it('Pesquisa por Grupo e faz a Matricula', () => {

                cy.wait(3000)

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

        cy.wait(3000)

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

            cy.wait(3000)

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

        cy.wait(3000)

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

            cy.wait(3000)

   //Digita perfil
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(2) //
  .click({ force: true })
  .type('Aluno', { force: true });

  cy.wait(2000)

 cy.get('.ui-select-choices-row:visible', { timeout: 20000 })
  .contains(/^Aluno$/)
  .click({ force: true })

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(5)
  .click({ force: true });

        cy.wait(3000)

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

it('Pesquisa por Clientes e faz a Matricula', () => {

            cy.wait(3000)

  //Digita Clientes
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(3) //
  .click({ force: true })
  .type('Outro', { force: true });

  cy.wait(2000)

   cy.contains('Outro', {timeout: 20000})
  .should('be.visible')
  .click()

  cy.wait(2000)

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


it('Clica em Aguaradando pagamento', () => {

     //Clica em Matriculados Concuidos
      cy.contains('a', ' Aguardando pagamento', { timeout: 60000 })
  .click({force: true})
    
});


it('Pesquisda por Usuário', () => {

        //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('thiago teste', { force: true });

  cy.wait(2000)

  //Pesquisa
cy.get('[ng-show="manageSubscriptionsTabs.waitingPayment"] > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn', {timeout:60000})
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)

    cy.contains('table tbody tr', 'thiago teste', { timeout: 60000 })
    .should('be.visible')

      // Apaga Usuario
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
    .filter(':visible')
    .first()
    .click({ force: true })
    .clear({ force: true });
  
});

 it('Pesquisa por Email', () => {

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

  
    cy.contains('table tbody tr', 'iiuqprxz@sharklasers.com', { timeout: 60000 })
    .should('be.visible')

  //Apaga email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 1=E-MAIL
  .click({ force: true })
  .clear({ force: true });

    });

     it('Pesquisa por Login', () => {

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

    //Apaga Login
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(2) // 2= pesquisa de Login
  .click({ force: true })
  .clear({ force: true });

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

  cy.wait(1000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(3)
  .click({ force: true });

  cy.wait(1000)

  cy.contains('td', 'Grupo - 2', { timeout: 60000 })
  .should('be.visible')

//Apaga Grupo 
  cy.get('[ng-show="manageSubscriptionsTabs.waitingPayment"] > [ng-include=""] > .report-filters > :nth-child(4) > .filters-container > .multiselect > .border > div > .ui-select-match > [ng-repeat="$item in $select.selected track by $index"] > .ui-select-match-item > .close')
  .click({ force: true})
 
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

  cy.contains('td', 'Analista de Testes JR', { timeout: 60000 })
  .should('be.visible')

    //Digita Cargo
 cy.get('[ng-show="manageSubscriptionsTabs.waitingPayment"] > [ng-include=""] > .report-filters > :nth-child(5) > .filters-container > .multiselect > .border > div > .ui-select-match > [ng-repeat="$item in $select.selected track by $index"] > .ui-select-match-item > .close')
 .click({force: true})
  
    });

it('Pesquisa por Perfil faz a Matricula', () => {

   //Digita perfil
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(2) //
  .click({ force: true })
  .type('Aluno', { force: true });

  cy.wait(2000)

  cy.get('.ui-select-choices-row:visible', { timeout: 20000 })
  .contains(/^Aluno$/)
  .click({ force: true })

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(5)
  .click({ force: true });

  cy.wait(1000)

  cy.contains('td', 'Aluno', { timeout: 60000 })
  .should('be.visible')


    //Apaga o Perfil
    cy.get('[ng-show="manageSubscriptionsTabs.waitingPayment"] > [ng-include=""] > .report-filters > :nth-child(6) > .filters-container > .multiselect > .border > div > .ui-select-match > [ng-repeat="$item in $select.selected track by $index"] > .ui-select-match-item > .close')
  .click({ force: true })
  
    });

it('Pesquisa por Clientes e faz a Matricula', () => {

  //Digita Clientes
  cy.get('input.ui-select-search:visible', { timeout: 20000 })
  .eq(3) //
  .click({ force: true })
  .type('Outro', { force: true });

     //Clique no cliente
  cy.get('.ui-select-choices-row.active', { timeout: 20000 })
  .contains(/^Outro$/)
  .click({ force: true })

  cy.wait(2000)

 //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(6)
  .click({ force: true });

  cy.wait(1000)

  cy.contains('td', 'Outro', { timeout: 60000 })
  .should('be.visible')

  cy.wait(2000)

    //Apaga o Cliente
    cy.get('[ng-show="manageSubscriptionsTabs.waitingPayment"] > [ng-include=""] > .report-filters > :nth-child(7) > .filters-container > .multiselect > .border > div > .ui-select-match > [ng-repeat="$item in $select.selected track by $index"] > .ui-select-match-item > .close')
  .click({ force: true })

    });
    
it("Filtros de exportação/Aguardando pagamento", () => {
  cy.wait(3000)

  //Selecionar colunas
        cy.get('#waiting-payment-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-collection', {timeout: 60000})
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

          //Clica em Aguardando pagamento
      cy.contains('a', 'Aguardando pagamento', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(3000)
    
      //Copiar
      cy.get('#waiting-payment-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-copy', {timeout:60000})
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Csv
      cy.get('#waiting-payment-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-csv',  { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Pdf
      cy.get('#waiting-payment-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-pdf', { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Xls
      cy.get('#waiting-payment-table_wrapper > :nth-child(1) > .dt-buttons > .icon-file-xls', { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(6000)

      //Vai e volta pra ficar 10 porpágina
      //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

          //Clica em Matriculados Concuidos
      cy.contains('a', 'Aguardando pagamento', { timeout: 60000 })
  .should('be.visible')
  .click()

      cy.wait(1000);

      //Imprimir
      cy.get('#waiting-payment-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-print', { timeout: 60000 })
      .should("be.visible")
      .click();

      cy.wait(6000);

    });
    
it('Listagem', () => {

   cy.get('select[name="waiting-payment-table_length"]', { timeout: 20000 })
  .select('10') // ou '50', '100', 'Todos'

  cy.wait(1000)

  cy.get('select[name="waiting-payment-table_length"]')
  .select('25')

   cy.wait(1000)

  cy.get('select[name="waiting-payment-table_length"]')
  .select('50')

   cy.wait(1000)

  cy.get('select[name="waiting-payment-table_length"]')
  .select('100')

    });

     it('ENTRA NO PERFIL ALUNO VERIFICA SE ESTA ESCRITO O BOTÃO: CONTINUAR COMRPRA', () => {

         cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

    });

     it('Vai até a vitrine', () => {

        //Clica em conteúdos
        cy.get('.active > .ng-binding',{timeout:60000})
        .should('be.visible')
        .click()

        //Vai até a vitrine
        cy.get('.showcase-navigation-menu > :nth-child(2) > .showcase-menu-name',{timeout:60000})
        .should('be.visible')
        .click()

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

    });

  it('Clica no treinamento ', ()=> {

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Segundo Teste Gerenciar Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  cy.wait(2000)

    })

  it("Verefica se esta escrito Continuar compra", () => {

cy.contains('Continuar compra', { timeout: 20000 })
  .should('be.visible')

     });


     it('Entra em outro pesfil e cancela o pagamento', () => {

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

     it("Vai até a categoria", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

     });

      it('Digita Treinamento e Abre o Gerenciar', () => {

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Digita o Treianamento
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 20000 })
  .should('be.visible')
  .clear()
  .type('Segundo Teste Gerenciar Automação');

  //Clica em pesquisar
  cy.get('.multiselect.ng-dirty > .btn', {timeout: 60000})
  .should('be.visible')
  .click()

//Clica no treinamento: Gerenciar Teste Automação
  cy.contains('.card-title', /^Segundo Teste Gerenciar Automação$/, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()
      
    });

    it('Clica em Aguaradando pagamento', () => {

     //Clica em Matriculados Concuidos
      cy.contains('a', ' Aguardando pagamento', { timeout: 60000 })
  .click({force: true})
    
});

    it('Pesquisda por Usuário para cancelar pagamento', () => {

        //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('thiago teste', { force: true });

  cy.wait(2000)

  //Pesquisa
cy.get('[ng-show="manageSubscriptionsTabs.waitingPayment"] > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn', {timeout:60000})
  .should('be.visible')
  .click({ force: true });

    cy.wait(2000)

    cy.contains('table tbody tr', 'thiago teste', { timeout: 60000 })
    .should('be.visible')

      //Clica no primero icon box disponivel
  cy.get('td.select-checkbox:visible', { timeout: 60000 })
  .not('.disabled') // evita desabilitados (se existir)
  .not('.selected') // evita já selecionados (se existir)
  .first()
  .click({ force: true });

  cy.wait(2000)
  
  //Cancelar Pagamentos
  cy.contains('button', 'Cancelar pagamentos', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(2000)
  
  //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

  cy.wait(2000)
     
    });

    it('Pesquisa o usuario em não matriculados', () => {
        
      //Clica em Matriculados Concuidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
  .click({force: true})

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('thiago teste', { force: true });

  //Pesquisa
cy.get('course-not-subscribed-users.ng-isolate-scope > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

   cy.contains('td', 'thiago teste', { timeout: 60000 })
  .should('be.visible')

    });

    it('entra no perfil aluno verefica se esta escrito o botão comprar', () => {

         cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

    });

     it('Vai até a vitrine', () => {

        //Clica em conteúdos
        cy.get('.active > .ng-binding',{timeout:60000})
        .should('be.visible')
        .click()

        //Vai até a vitrine
        cy.get('.showcase-navigation-menu > :nth-child(2) > .showcase-menu-name',{timeout:60000})
        .should('be.visible')
        .click()

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()


    });

  it('Clica no treinamento ', ()=> {

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Segundo Teste Gerenciar Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  cy.wait(2000)

    })

  it("Verefica se esta escrito Comprar após o cancelamento", () => {

cy.contains('Comprar', { timeout: 20000 })
  .should('be.visible')

     });


      it('Entra em outro pesfil e cancela o pagamento', () => {

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


    it("Vai até os relatóros", ()=> {

    //Clica em relatórios
    cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

          cy.wait(5000)

            //Treinamento
    cy.contains('li.list-group-item.node-report-categories', 'Treinamentos', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  
            //Clica em Compras
    cy.contains('li.list-group-item.node-report-categories', 'Compras', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

      });

        it('Pesquis o pelo treinamento e aluno e verifica se está cancelado', ()=> {

      cy.wait(1000)
      
  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Segundo Teste Gerenciar Automação', { delay: 30 });

  cy.wait(1000)

  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(0) // 
  .should('be.visible')
  .clear()
  .type('thiago teste', { delay: 30 });

    cy.wait(2000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

  cy.get('#reports-table tbody tr', { timeout: 20000 })
  .first()
  .find('td.translateColumn')
  .last()
  .should('contain.text', 'Pagamento Cancelado')

     });

     it('Vai até logs geral', () => {
        
            //Clica em Geral
  cy.get('[data-nodeid="59"]',{ timeout: 60000})
    .click({ force: true })

     });

     it('Pesquisa no Geral e valida o cancelamento (remoção))', () => {

  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(0) // 
  .should('be.visible')
  .clear()
  .type('thiago teste', { delay: 30 });

  cy.wait(1000)

  //Clica em ação
  cy.get(':nth-child(2) > .relative > .w-100 > :nth-child(1) > .placeholder', {timeout:60000 })
  .should('be.visible')
  .click({force: true})

  cy.wait(1000)

  //Clica em remoção
  cy.get(':nth-child(2) > .relative > .custom-dropdown > div > :nth-child(4) > .icon-checkbox', {timeout:60000})
  .should('be.visible')
  .click({force: true})

  cy.wait(1000)

  //Clique em pesquisar
  cy.get(':nth-child(1) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

  ///Vrifica se está escrito remoçao
  cy.get('#reports-table tbody tr', { timeout: 20000 })
  .first()
  .find('td.logActionColumn')
  .should('contain.text', 'Remoção')

     });

it('ENTRA NO PERFIL ALUNO VERIFICA SE ESTA ESCRITO O BOTÃO: CONTINUAR COMRPRA', () => {

         cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

    });

     it('Vai até a vitrine', () => {

        //Clica em conteúdos
        cy.get('.active > .ng-binding',{timeout:60000})
        .should('be.visible')
        .click()

        //Vai até a vitrine
        cy.get('.showcase-navigation-menu > :nth-child(2) > .showcase-menu-name',{timeout:60000})
        .should('be.visible')
        .click()

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

    });

  it('Clica no treinamento ', ()=> {

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Segundo Teste Gerenciar Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  cy.wait(2000)

    })

  it("Verefica se esta escrito Continuar compra", () => {

//Clica em comprar
cy.get('.classes-actions > :nth-child(1) > .center > div', {timeout: 60000})
        .should('be.visible')
        .click()

        cy.wait(2000)

        //Efutuar Pagamento
  cy.get('[ng-show="modal.checkout"] > .modal > .content-box-footer > .btn-swipe-accent',{timeout:60000})
    .should('be.visible')
  .click({ force: true })

  cy.log('VEREFIQUE SE VOCE SERÁ REDIRECIONADO PARA A PAGINA DO MERCADO PAGO')
  cy.wait(10000)
cy.log('VEREFIQUE SE VOCE SERÁ REDIRECIONADO PARA A PAGINA DO MERCADO PAGO')

     });
     */

       it('Entra em outro perfil e valida a nova trasnmisão', () => {

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

     it("Vai até os relatóros", ()=> {

    //Clica em relatórios
    cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

          cy.wait(5000)

            //Treinamento
    cy.contains('li.list-group-item.node-report-categories', 'Treinamentos', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  
            //Clica em Compras
    cy.contains('li.list-group-item.node-report-categories', 'Compras', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

      });

        it('Pesquis o pelo treinamento e aluno e verifica se está cancelado', ()=> {

      cy.wait(1000)

  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Segundo Teste Gerenciar Automação', { delay: 30 });

  cy.wait(1000)

  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(0) // 
  .should('be.visible')
  .clear()
  .type('thiago teste', { delay: 30 });

    cy.wait(2000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

  cy.pause()
  cy.log('VALIDE QUE FOI GERADO UMA NOVA TRANSMIÇÃO')

     });

    });
 
   });