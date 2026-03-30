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

    cy.visit("https://hml.lector.live/sicoobcrediminas/subscribe/login");
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
      cy.contains("li.list-group-item", "Lector",{timeout: 60000})
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

        cy.get("#courseName", {timeout:60000})
          .scrollIntoView()
          .click(); // Clica pra digitar

        cy.get("#courseName", {timeout:60000})
          .scrollIntoView()
          .type("Teste Automação QRCode") //  Nome no Treinamento

    });

     it("Conteúdo - Aula Presencial", () => {

        //clica em conteudos
           cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:60000})
           .scrollIntoView()
            .should('be.visible')
            .click();

            //Clica em novo conteudo
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

           cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

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

      cy.wait(3000);

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
        .type("Aluno")

      cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
        .first()
        .click()

      cy.contains('button', 'Adicionar')
        .scrollIntoView()
        .should('be.visible')
        .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      cy.get('.add-content > .end > .btn-swipe-accent')
        .click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent')
        .click()

    });

    it('Digita Treinamento', () => {

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Digita o Treianamento
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 20000 })
        .scrollIntoView()
        .should('be.visible')
        .clear()
        .type('Teste Automação QRCode');
  
      //Clica em pesquisar
      cy.get('.multiselect.ng-dirty > .btn', {timeout: 60000})
        .scrollIntoView()
        .should('be.visible')
        .click()

      //Clica no treinamento: Gerenciar Teste Automação
      cy.contains('.card-title', /^Teste Automação QRCode$/, { timeout: 60000 })
      .scrollIntoView()
        .click({ force: true });


      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
        .should('be.visible')
        .click()

      });

       it('Lista de Presença (Aulas presenciais)', () => {
  
      //Clica em Aula Presencial
      cy.contains('a', 'Lista de Presença (Aulas presenciais)', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible')
        .click()

     });

      it('Bairxar o QR Code', () => {

        //Baixa o qr code
          cy.get('.icon-download', {timeout:60000})
          .click()

          cy.log('SCANEAR O QR CODE')
          cy.pause()

           //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()
        
      });

       it('Abre do novo', () => {

      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
        .should('be.visible')
        .click()

      });

       it('Lista de Presença/ Verifica se tem algum nome', () => {
  
      //Clica em Aula Presencial
      cy.contains('a', 'Lista de Presença (Aulas presenciais)', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible')
        .click()

        //Verifica se tem algum nome
        cy.get('tbody tr td.ng-binding', { timeout: 60000 })
  .first()
  .invoke('text')
  .should('not.be.empty');

     });


it('Clica na impressora', () => {

    //clica na impressora
    cy.get('.middle > .icon-printer',{timeout:60000})
    .click()

    cy.wait(6000)
    
      });

      it('Teste', () => {

        //Copia
         cy.get('.middle > .icon-copy',{timeout:60000})
    .click()

        cy.get('.toast-container', { timeout: 10000 })
  .should('be.visible')
  .and('contain.text', 'Link copiado com sucesso.');
        
      });

    });

  });



