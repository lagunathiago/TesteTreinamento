Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Cannot read properties of null') &&
    err.message.includes("reading '0'")
  ) {
    return false;
  }
});


describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
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

  context("Teste de capa", () => {
    
    it("Inserindo Capa/Baner/Tradicional", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica na categoria Automação
       cy.contains('li.list-group-item', '0Teste Capas')
  .click({ force: true })
        
//Editando Nome do treinamento e o Idioma
      cy.get('.title-bar > .btn-icon').click()
      cy.get("#courseName").click(); // Clica pra digitar
      cy.get("#courseName").type("Teste de capas") //  Nome no Treinamento

       //Tradicional
      cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/images6.png', { force: true });
      cy.log('AJUSTE A IMAGEM MANUALMENTE')
      cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
cy.wait(2000)
      //Capa
      cy.get('label.thumb-placeholder[aspect="cover"] input[type="file"]').selectFile('cypress/fixtures/Capa.jpg', { force: true });
      cy.log('AJUSTE A IMAGEM MANUALMENTE')
      cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
cy.wait(2000)

      //Baner
      cy.get('label.thumb-placeholder[aspect="banner"] input[type="file"]').selectFile('cypress/fixtures/Benner.jpg', { force: true });
      cy.log('AJUSTE A IMAGEM MANUALMENTE')
      cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
cy.wait(2000)

    });

    it("Conteúdos", () => {

        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        //Doc
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

         cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Lector Imagem.png')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Lector Imagem.png',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

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
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("Aluno")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Aluno')
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
    });
     it("Capas", () => {
        
        //Clica em Cards
        cy.get('.title-bar > .filter', {timeout: 60000})
          .should('be.visible')
          .click()

        cy.wait(1000)
        
        //Miniaturas
        cy.get('.open > .ui-select-choices > :nth-child(3)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(12000)

      //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(2000)

        //somente capa
        cy.get('.open > .ui-select-choices > :nth-child(2)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(12000)

        //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(2000)

        //cartoes
        cy.get('.open > .ui-select-choices > :nth-child(1)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(12000)
        
      
        //Clica em Cards
        cy.get('.title-bar > .filter').click()
        cy.wait(2000)

        //cartoes
        cy.get('.open > .ui-select-choices > :nth-child(4)', { timeout: 60000 })
  .should('be.visible')
  .click();
        cy.wait(60000)

   });
  });

});
  