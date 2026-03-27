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
    cy.viewport(1920, 1080);

    cy.contains("button", "Entrar", { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.get('form.ng-pristine > [type="text"]', { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible")
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible")
      .type("2006lrnrgr");

    cy.get("#btn-entrar", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

  context("Vai para a categoria", { testIsolation: false }, () => {

     it("Clica vai ate a categoria", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
        .scrollIntoView()
        .should('be.visible')
        .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
        .scrollIntoView()
        .should('be.visible')
        .click({force: true})

     });


      it('Cria o treinamento', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

        cy.get("#courseName")
          .scrollIntoView()
          .click(); // Clica pra digitar

        cy.get("#courseName")
          .scrollIntoView()
          .type("automação aula presencial") //  Nome no Treinamento

    });

     it("Conteúdo - Aula Presencial", () => {

          cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:60000})
          .should('be.visible')
            .should('be.visible')
            .click();
      
      cy.get(".editing-resource > :nth-child(2) > .w-100", {timeout:60000})
      .should('be.visible')
      .click();

      cy.get("body .ui-select-choices-row", { timeout: 60000 })
      .should('be.visible')
      .should('be.visible')
        .should("be.visible")
        .contains(/^\s*Aula\s*Presencial\s*$/i)
        .click({ force: true });

      cy.get('input[placeholder="Nome"]:visible', { timeout: 60000 })
        .first()
        .clear({ force: true })
        .type("Aula Presencial Cypress", { force: true });

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    }); 

      it("Conteúdo - Aula Presencial", () => {

         cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', { timeout: 60000 })
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:60000})
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.get(".editing-resource > :nth-child(2) > .w-100")
          .scrollIntoView()
          .click();

        cy.get("body .ui-select-choices-row", { timeout: 60000 })
          .scrollIntoView()
          .should("be.visible")
          .contains(/^\s*Aula\s*Presencial\s*$/i)
          .scrollIntoView()
          .click({ force: true });

        cy.get('input[placeholder="Nome"]:visible', { timeout: 60000 })
          .scrollIntoView()
          .first()
          .clear({ force: true })
          .type("Aula Presencial Cypress", { force: true });

        cy.get(".weight")
          .scrollIntoView()
          .type("1");

        cy.get(".open > .ui-select-choices > :nth-child(2)")
          .scrollIntoView()
          .click();

        cy.get(".editing-resource > .end > .btn-swipe-accent")
          .scrollIntoView()
          .click();

    }); 

    it('Turma Paga sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]')
        .scrollIntoView()
        .click()

      cy.get('[ng-click="editClass()"]')
        .scrollIntoView()
        .click() //Nova turma

      cy.get("#className")
        .scrollIntoView()
        .type("Turma Gratuita sem aprovação"); //nome da turma

      cy.get('.column > :nth-child(1) > .icon-checkbox')
        .scrollIntoView()
        .click(); // desativa aprovação

      cy.wait(3000);

      cy.get(".navigation-controls > .ml-20")
        .scrollIntoView()
        .click(); //botao prximo

           cy.get(".navigation-controls > .ml-20")
        .scrollIntoView()
        .click(); //botao prximo

      cy.log("REALIZE O AGENDAMENTO");
      cy.pause()

      cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo
      
      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn')
        .scrollIntoView()
        .click()

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
        .scrollIntoView()
        .type("Aluno")

      cy.get('.ui-select-dropdown')
        .scrollIntoView()
        .should('be.visible')

      cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
        .scrollIntoView()
        .first()
        .click()

      cy.contains('button', 'Adicionar')
        .scrollIntoView()
        .should('be.visible')
        .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      cy.get('.add-content > .end > .btn-swipe-accent')
        .scrollIntoView()
        .click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent')
        .scrollIntoView()
        .click()

    });

    it('Digita Treinamento', () => {

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Digita o Treianamento
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 20000 })
        .scrollIntoView()
        .should('be.visible')
        .clear()
        .type('automação aula presencial');
  
      //Clica em pesquisar
      cy.get('.multiselect.ng-dirty > .btn', {timeout: 60000})
        .scrollIntoView()
        .should('be.visible')
        .click()

      //Clica no treinamento: Gerenciar Teste Automação
      cy.contains('.card-title', /^automação aula presencial$/, { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
        .scrollIntoView()
        .should('be.visible')
        .click()

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
  .click()

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
    .click()

  cy.wait(3000)

    });

        it('Pesquisa por Usuario e Conclui a Matricula', () => {

      cy.wait(4000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('Guilherme Fernandes Raposo de Barros', { force: true });

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

    it('Aula Presencial', () => {
  
      //Clica em Aula Presencial
      cy.contains('a', 'Lista de Presença', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible')
        .click()

    });

      it('Pesquisa por Unidade', () => {

      cy.wait(1000)

      cy.get('.filters > :nth-child(2) > .ng-pristine', {timeout:60000})
       .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('unidade 1', { force: true });

  cy.wait(2000)

  //Pesquisa
 cy.get(':nth-child(6) > .btn-swipe-accent',{timeout:60000})
        .scrollIntoView()
        .click()

  cy.wait(1000)

  cy.contains('div', 'unidade 1', { timeout: 60000 })
  .should('be.visible');

cy.get('.filters > :nth-child(2) > .ng-valid', {timeout:60000})
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })

    });
    it('Pesquisa por Grupo - 2', () => {

      cy.wait(3000)

      cy.get('.filters > :nth-child(3) > .ng-pristine', {timeout:60000})
       .filter(':visible')
       .first()
  .click({ force: true })
  .clear({ force: true })
  .type('Grupo - 2{enter}', { force: true });

  cy.wait(2000)

//Pesquisa
 cy.get(':nth-child(6) > .btn-swipe-accent',{timeout:60000})
        .scrollIntoView()
        .click({force: true})

  cy.wait(1000)

  cy.contains('div', 'Grupo - 2', { timeout: 60000 })
  .should('be.visible');

    cy.get('.filters > :nth-child(3) > .ng-valid', {timeout:60000})
       .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })

    });

      it('Pesquisa por Cargo', () => {

      cy.wait(3000)

      cy.get('.filters > :nth-child(4) > .ng-pristine', {timeout:60000})
       .filter(':visible')
       .first()
  .click({ force: true })
  .clear({ force: true })
  .type('Analista de Testes JR{enter}', { force: true });

  cy.wait(2000)

 //Pesquisa
 cy.get(':nth-child(6) > .btn-swipe-accent',{timeout:60000})
        .scrollIntoView()
        .click()

  cy.wait(1000)

  cy.contains('div', 'Analista de Testes JR', { timeout: 60000 })
  .should('be.visible');

        cy.get('.filters > :nth-child(3) > .ng-valid', {timeout:60000})
       .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })

    });
    it('Imprimir', () => {

      //Clica em imprimir
      cy.get('[ng-show="manageSubscriptionsTabs.presenceList"] > .end > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(6000)

    });

      it('Lista de Presença (Aulas presenciais)', () => {
  
      //Clica em Aula Presencial
      cy.contains('a', 'Lista de Presença (Aulas presenciais)', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible')
        .click()

    });

    it('Salva dois usuario', () => {

      cy.get(':nth-child(2) > td.ng-scope > .flex > .checkbox > .icon-checkbox', { timeout: 60000 })
      .click()

      cy.get(':nth-child(2) > td.ng-scope > .flex > .ui-select-container', {timeout:60000})
      .click()

      cy.wait(1000)

      cy.get('.open > .ui-select-choices > :nth-child(2)', {timeout:60000})
      .click()

       //segundo

       cy.get(':nth-child(3) > td.ng-scope > .flex > .checkbox > .icon-checkbox', { timeout: 60000 })
      .click()

      cy.get(':nth-child(3) > td.ng-scope > .flex > .ui-select-container', {timeout:60000})
      .click()

      cy.wait(1000)

      cy.get('.open > .ui-select-choices > :nth-child(2)', {timeout:60000})
      .click()

      cy.get('[ng-show="presenceList != null"] > .end > .mr-20')
      .scrollIntoView()
      .click()

      cy.wait(4000)
      
    });

    it('Selecionar os usuario e salva', () => {

      //Cliquei em todos
      cy.get('.mt-10 > .checkbox > .icon-checkbox', {timeout:60000})
      .click()

      cy.wait(1000)

      //verifica se o primeiro esta desflegado
    cy.get(':nth-child(3) > td.ng-scope > .flex > .checkbox > .icon-checkbox', { timeout: 60000 })
  .should('exist')
  .and('not.have.class', 'checked-checked');

        cy.wait(1000)

      //Cliquei em todos
      cy.get('.mt-10 > .checkbox > .icon-checkbox', {timeout:60000})
      .click()

    });

  });

});