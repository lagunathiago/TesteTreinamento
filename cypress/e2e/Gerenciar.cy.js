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

    it("Conteúdo - Certificado", () => {

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

    it('Pesquisa por Usuario e faz Matricula', () => {

      cy.wait(3000)

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

  cy.wait(3000)

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

  cy.wait(3000)

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

  cy.wait(3000)

  //limpa o grupo
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

  cy.wait(3000)

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

   //limpa o grupo
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

  cy.wait(3000)


    });

it('Pesquisa por Perfil faz a Matricula', () => {

   cy.wait(3000)

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

    //limpa o grupo
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

     cy.wait(3000)

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

    //limpa o grupo
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

     cy.wait(3000)
  
    });

it('Pesquisa por txt faz a Matricula', () => {

  cy.wait(3000)

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

          //Clica em Não Matriculados Concuidos
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

  cy.wait(4000)

    });


    it('Clica em Situação', () => {

      cy.wait(2000)

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

   it('Verifica se os usuários estão como Concluidos', () => {

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

    cy.wait(4000)

    //limpa
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

     cy.wait(3000)


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

      cy.wait(4000)

    //limpa 
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

     cy.wait(3000)

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

it('Vai para a aba de Matriculados/concluidos', () => {

   //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

     });
     
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

    cy.wait(4000)

    //limpa o grupo
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

     cy.wait(3000)

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

    cy.wait(4000)

     //limpa o grupo
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

     cy.wait(3000)

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

    cy.wait(4000)

     //limpa 
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

     cy.wait(3000)

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

    cy.wait(4000)

     //limpa o grupo
  cy.get('.ui-select-match-item > .close',{timeout:10000})
  .should('be.visible')

     cy.wait(3000)

     });

it('Ativa a fleg => Exibir apenas os melhores resultados de cada usuário', () => {

  cy.wait(2000)

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

      cy.wait(2000)

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

    //Em andamento
     cy.contains('table tbody tr', '5 5', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Em andamento')

   });


  });

   it('Conversar',() => {

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

it('Verefica que não tenha o botão de retomar matricula no usuario Cancelado', () => {

  cy.contains('td.subscriptionStatusColumn', 'Cancelado', { timeout: 20000 })
  .parents('tr')
  .within(() => {
    cy.contains('Retomar matrícula').should('not.exist')
  })

});

it('Clica em Não Matriculados Concuidos', () => {

  //Clica em Não Matriculados Concuidos
      cy.contains('a', 'Não matriculados', { timeout: 60000 })
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
  .type('thiago teste', { force: true });

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

it('Matriculados/Concluidos', () => {
      
      //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

    it('Pesquisa por Usuario e Conclui a Matricula', () => {

      cy.wait(4000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('thiago teste', { force: true });

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
       it('Pesquisa e retoma a matricula', () => {

      cy.wait(4000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('thiago teste', { force: true });

    cy.wait(2000)

    //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });
 
    cy.wait(2000)

     });

     it('Retomar matricula', () => {

      //Clica em Retomar Matricula
  cy.get('button[title="Retomar matrícula"]', { timeout: 20000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  //Clica no chate box
cy.get('.popover-body:visible')
  .within(() => {
    cy.get('label.checkbox')
      .first()
      .click({ force: true })
  })

  cy.get('.popover-body:visible')
  .within(() => {
    cy.contains('label', 'Indeterminado')
      .click({ force: true })
  })

   //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

     });


  it('Pesquisa o usuario e verifica se ele esta em andamento e que nao tenha o botao retomar matricula', () => {

      cy.wait(4000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('thiago teste', { force: true });

    cy.wait(2000)

    //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });
 
    cy.wait(3000)

     cy.contains('td.subscriptionStatusColumn', 'Em andamento', { timeout: 20000 })
  .parents('tr')
  .within(() => {
    cy.contains('Retomar matrícula').should('not.exist')
  })

     });

       it('Entra em outro perfil e verifica se os conteudos estão disponivel', () => {

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
       cy.contains('.showcase-card-title', 'Gerenciar Teste Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  cy.wait(2000)

    });

  it("Visualiza o conteudo e finaliza o treinamento", () => {

cy.wait(7000)
       //FINALIZE O TREINAMENTO
      cy.log('VISUALIZE O CONTEUDO E FINALIZE O TREINAMENTO')
      cy.pause()

      });

       it('Entra em outro perfil e confirma a nova conclusao', () => {

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

       it("Clica na aba treinamento", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      
         //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

     });

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
    it('Vai para a aba de Matriculados/concluidos', () => {

   //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

     });

  it('Pesquisa o usuario e verifica se foi concluido', () => {

      cy.wait(4000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('thiago teste', { force: true });

    cy.wait(2000)

    //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });
 
    cy.wait(3000)

    cy.contains('table tbody tr', 'thiago teste', { timeout: 60000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Concluído')
   });

    });


 it('Pesquisa o usuario e retoma a matricula', () => {

      cy.wait(4000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('Mikaelle Teste', { force: true });

    cy.wait(2000)

    //Pesquisa
  cy.get('.col-sm-12 > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });
 
    cy.wait(3000)

 });

 it('Retomar matricula por Data', () => {

      //Clica em Retomar Matricula
  cy.get('button[title="Retomar matrícula"]', { timeout: 20000 })
  .first()
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  //Clica no chate box
cy.get('.popover-body:visible')
  .within(() => {
    cy.get('label.checkbox')
      .first()
      .click({ force: true })
  })

  cy.get('.popover-body:visible')
  .within(() => {
    cy.contains('label', 'Período')
      .click({ force: true })
  })

cy.log('DEFINA UM PERIODO DA RETOMADA DE MATRICULA')
cy.pause()
cy.log('DEFINA UM PERIODO DA RETOMADA DE MATRICULA')

   //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

     });
   it('Pesquisa por Login', () => {

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

  cy.wait(2000)

    });

    it('Verifica se nao é possivel retomar matricula ao não flegar o chate box', () => {

      //Clica em Retomar Matricula
  cy.get('button[title="Retomar matrícula"]', { timeout: 20000 })
  .first()
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  //Periodo
  cy.get('.popover-body:visible')
  .within(() => {
    cy.contains('label', 'Período')
      .click({ force: true })
  })

  //Verifica se não esta disponivel o botão confirmar
  cy.contains('button.btn-swipe-accent:visible', 'Confirmar', { timeout: 60000 })
  .should('be.disabled');

   //Periodo
  cy.get('.popover-body:visible')
  .within(() => {
    cy.contains('label', 'Indeterminado')
      .click({ force: true })
  })

  //Verifica se não esta disponivel o botão confirmar
  cy.contains('button.btn-swipe-accent:visible', 'Confirmar', { timeout: 60000 })
  .should('be.disabled');

   //Confirmar
  cy.get('button.btn-swipe-accent:visible', { timeout: 60000 })
  .contains('Confirmar')
  .click({ force: true });

     });

     it('Data no passado', () => {

  //Clica no chate box
cy.get('.popover-body:visible')
  .within(() => {
    cy.get('label.checkbox')
      .first()
      .click({ force: true })
  })

  cy.get('.popover-body:visible')
  .within(() => {
    cy.contains('label', 'Período')
      .click({ force: true })
  })

 cy.log('Tente inserir uma data no passado(não deve permitir)')
 cy.pause()

 //Fecha o modal de retomar matricula
cy.contains('h2', 'Retomar matrícula', { timeout: 60000 })
  .parents('.popover-header')
  .find('div.btn.round.icon-close.pointer-events-all')
  .click({ force: true });

 //Fecha modal do gerenciar
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(2000)

     });
       it("Vai até os relatóros", ()=> {

    //Clica em relatórios
    cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

          cy.wait(5000)

          //Clica em Matriculas
  cy.get('[data-nodeid="56"]', {timeout:60000})
   .should('be.visible')
  .click({ force: true });

     });

      it('Pesquis o pelo treinamento e aluno e verifica o log', ()=> {

      cy.wait(1000)
    
  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(0) // 
  .should('be.visible')
  .clear()
  .type('Gerenciar Teste Automação', { delay: 30 });

    cy.wait(2000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

  cy.contains('td.logDetails', 'Retomou a matrícula', { timeout: 60000 })
  .should('be.visible');

  cy.wait(2000)

     });

      it("Clica na aba treinamento", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      
         //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

     });

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

    it('Clica em Desempenho', () => {

       //Clica em Desempenho
      cy.contains('a', 'Desempenho', { timeout: 60000 })
  .should('be.visible')
  .click()
      
    });

    it('Modifica o progresso e o desempenho', () => {
      
      //Clica em editar
        cy.get(':nth-child(1) > .progressColumn > div > .ml-10', {timeout:60000})
    .should('be.visible')
  .click()

  cy.get(':nth-child(1) > .box-title > .checkbox')
  .click()

  cy.get(':nth-child(2) > .box-title > .checkbox')
  .click()

cy.get('.modal:visible .box.ng-scope:visible input[type="number"]').eq(0)
  .click({ force: true })
  .type('{selectall}100', { force: true });

cy.get('.modal:visible .box.ng-scope:visible input[type="number"]').eq(1)
  .click({ force: true })
  .type('{selectall}100', { force: true });

   //Confirma
  cy.contains('button:visible', 'Confirmar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Verefica se o progresos e aproveitamento estão em 100%
  cy.get('td.progressColumn', { timeout: 60000 })
  .should('contain.text', 'Progresso: 100.00%')
  .and('contain.text', 'Aproveitamento: 100.00%');

  cy.wait(2000)

   //Fecha modal do gerenciar
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click();

    });

     it('ENTRA NO EM OUTRO PERFIL PARA ULTILIZAR O PROCESSO DE SELEÇAO', () => {

         cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

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

    it('Clica na aba treinamento', () => {

       // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

    //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

      cy.wait(3000)
      
    });

    it('Pesquisa o treinamento', () => {
      
     //Digita o Treianamento
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 20000 })
  .should('be.visible')
  .clear()
  .type('processo de seleção teste');

  //Clica em pesquisar
  cy.get('.multiselect.ng-dirty > .btn', {timeout: 60000})
  .should('be.visible')
  .click()

//Clica no treinamento: processo de seleçao
  cy.contains('.card-title', /^processo de seleção teste$/, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()
      
    });

    it('Vai para a aba de Matriculados/concluidos', () => {

   //Clica em Processo seleçao
      cy.contains('a', 'Processo de seleção', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

     });

     it('Pesquisa por Nome de usuario', () => {

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('Thiago suporte', { force: true });

  //Pesquisa
cy.get('[ng-if="auditReport"] > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn', {timeout:60000})
  .should('be.visible')
  .click({ force: true });

  cy.contains('td', 'Thiago suporte', { timeout: 60000 })
  .should('be.visible');

  //Limpa o campo de Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })

     });

     it('Pesquisa por E-mail', () => {

  cy.wait(4000)

      //Digita Email
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 0=USUÁRIO, 1=E-MAIL
  .click({ force: true })
  .type('{selectall}{backspace}thiagosuporte2@uorak.com', { force: true });

   //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(1)
  .click({ force: true });

   cy.contains('td', 'thiago teste', { timeout: 60000 })
  .should('be.visible');

  cy.wait(1000)
  
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(1) // 0=USUÁRIO, 1=E-MAIL
  .click({ force: true })
  .clear({ force: true})
 
});

it('Situação Aprovado/Recusado', () => {

  //Clica em Situação
  cy.get('[ng-if="auditReport"] > [ng-include=""] > .report-filters > :nth-child(3) > .filters-container > .multiselect', {timeout:60000})
  .should('be.visible')
  .click()

  //Aprovado
  cy.get('.open > .ui-select-choices > :nth-child(2)', {timeout:60000})
  .should('be.visible')
  .click()

  //Verifica se está escrito o usuario que foi aprovado
   cy.contains('td', 'Thiago suporte', { timeout: 60000 })
  .should('be.visible');

  cy.wait(1000)

  //Clica em Situação
  cy.get('[ng-if="auditReport"] > [ng-include=""] > .report-filters > :nth-child(3) > .filters-container > .multiselect', {timeout:60000})
  .should('be.visible')
  .click()

  //Reprovado
  cy.get('.open > .ui-select-choices > :nth-child(3)', {timeout:60000})
  .should('be.visible')
  .click()

  //Verifica se está escrito o usuario que foi aprovado
   cy.contains('td', 'teste aut', { timeout: 60000 })
  .should('be.visible');

   //Clica em Situação
  cy.get('[ng-if="auditReport"] > [ng-include=""] > .report-filters > :nth-child(3) > .filters-container > .multiselect', {timeout:60000})
  .should('be.visible')
  .click()

   //Qualquer
  cy.get('.open > .ui-select-choices > :nth-child(1)', {timeout:60000})
  .should('be.visible')
  .click()

   });

   it('Pesquisa por nome do campo', () => {

  cy.wait(3000)

  //Digita Login
  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(2) // 2= pesquisa de Login
  .click({ force: true })
  .type('{selectall}{backspace}teste1', { force: true });

  cy.wait(1000)

  //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(2)
  .click({ force: true })

  cy.wait(2000)

  //Verifica se está escrito os 3 usuarios
  cy.contains('td', 'Thiago suporte', { timeout: 60000 }).should('be.visible');
cy.contains('td', 'thiago teste').should('be.visible');
cy.contains('td', 'teste aut').should('be.visible');

cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(2) 
  .click({ force: true })
  .clear({ force: true})

  cy.wait(2000)

    });

      it('Pesquisa por Valor do Campo', () => {

  cy.wait(3000)

  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(3) // 0=USUÁRIO, 1=E-MAIL
  .click({ force: true })
  .type('{selectall}{backspace}teste 3', { force: true });

   //Pesquisa
  cy.get('button.icon-spyglass:visible', { timeout: 60000 })
  .eq(3)
  .click({ force: true });

   cy.contains('td', 'teste aut', { timeout: 60000 })
  .should('be.visible');

  cy.wait(1000)

  cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .eq(3) // 0=USUÁRIO, 1=E-MAIL
  .click({ force: true })
  .clear({ force: true})

  cy.wait(2000)
 
});

it('Filtros de datas', () => {

  cy.log('FILTRE PELA DATA DE SOLICITAÇÃO E DATA DE APROVAÇÃO')
  cy.pause()
  cy.log('FILTRE PELA DATA DE SOLICITAÇÃO E DATA DE APROVAÇÃO')

   });

   //CHAMADO - 11279
   //BUGS EM ALGUNS FILTROS DO PROCESSO DE SELEÇÃO 
   // AUTOMAÇÃO NÃO CRIADA NOS FILTROS:
   // DATA DE SOLICITAÇÃO
   //GRUPOS
   //CARGOS
   //PERFIL
   //CLIENTE

it("Filtros de exportação/Não matriculados", () => {
  
  cy.wait(3000)

  //Selecionar colunas
        cy.get('#audit-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-collection', {timeout:60000})
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

          //Volta em processo de seleção
      cy.contains('a', 'Processo de seleção', { timeout: 60000 })
  .should('be.visible')
  .click()
              
  cy.wait(3000)
    
      //Copiar
      cy.get('#audit-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-copy',{timeout:60000})
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Csv
      cy.get('#audit-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-csv',{timeout:60000})
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Pdf
      cy.get('#audit-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-pdf',{timeout:60000})
      .should("be.visible")
      .click();

      cy.wait(1000);

      //Xls
      cy.get('#audit-table_wrapper > :nth-child(1) > .dt-buttons > .icon-file-xls', {timeout:60000})
      .should("be.visible")
      .click();

      //Vai e volta pra ficar 10 porpágina
      //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

          //Clica em Matriculados Concuidos
      cy.contains('a', 'Processo de seleção', { timeout: 60000 })
  .should('be.visible')
  .click()

      cy.wait(1000);

      //Imprimir
      cy.get('#audit-table_wrapper > :nth-child(1) > .dt-buttons > .buttons-print', {timeout:60000})
      .should("be.visible")
      .click();

      cy.wait(6000);

    });


it('Listagem', () => {

  cy.get('[name="audit-table_length"]', { timeout: 60000 })
  .select('10');

  cy.wait(1000)

   cy.get('[name="audit-table_length"]', { timeout: 60000 })
  .select('25');

   cy.wait(1000)

  cy.get('[name="audit-table_length"]', { timeout: 60000 })
  .select('50');

   cy.wait(1000)

  cy.get('[name="audit-table_length"]', { timeout: 60000 })
  .select('100');

    });

     it('entra no perfil aluno verefica se esta escrito o botão comprar', () => {

         cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("lector1305@sharklasers.com");

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
       cy.contains('.showcase-card-title', 'processo de seleção teste', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  cy.wait(2000)

    })


    it('Fazer incrição', () => {

   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(2000)

        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Campo Automatização 01');
});

cy.log('ENVIE UM ARQUIVO')
cy.pause()

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  //Espera alguns segundos na pagina para enviar os campos
  cy.wait(5000)

    });

    

     it('Entra no perfil adm e recusa os campos', () => {

         cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

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

    
    
    it("Aceita os campos", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Recusa o primeiro documento
  cy.get('tbody > :nth-child(1) > :nth-child(9) > .btn', {timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

  //Recusa o segundo documento
  cy.get(':nth-child(2) > :nth-child(9) > .btn', {timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

   // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(5000)

    })


    it('Clica na aba treinamento', () => {

       // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

    //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

      cy.wait(3000)
      
    });

    it('Pesquisa o treinamento', () => {
      
     //Digita o Treianamento
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 20000 })
  .should('be.visible')
  .clear()
  .type('processo de seleção teste');

  //Clica em pesquisar
  cy.get('.multiselect.ng-dirty > .btn', {timeout: 60000})
  .should('be.visible')
  .click()

//Clica no treinamento: processo de seleçao
  cy.contains('.card-title', /^processo de seleção teste$/, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()
      
    });

    it('Cancela o processo', () => {

   //Clica em Cancela o processo
      cy.contains('a', 'Processo de seleção', { timeout: 60000 })
  .click({force: true})

      cy.wait(2000)

      cy.contains('tr', 'teste teste', { timeout: 60000 })
  .within(() => {
    cy.contains('button', 'Cancelar processo')
      .first()
      .click({ force: true });
  });

  cy.wait(3000)

  //Verefica se o usuario foi retirado do processo de seleçao
  cy.contains('td', 'teste teste')
  .should('not.exist');

     });
   
  });

});
