describe("Treinamento", () => {
  context("Criando Treinamento", () => {
    it("Teste Treinamneto", () => {

      cy.viewport(1920, 1080);  

      // 1) Login
      cy.visit("https://hml.lector.live/landing");

      cy.contains("button", "Entrar").click();
      cy.get('form.ng-pristine > [type="text"]').type("thiagosuporte@uorak.com");
      cy.get("ng-transclude > .border").type("123");
      cy.get(":nth-child(4) > .btn-swipe-accent").click();

      // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem').click()
      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Editando Nome do treinamento e o Idioma
      cy.get('.title-bar > .btn-icon').click()
      cy.get('#i-pt_BR_1398').type('Teste Cypress')                      //  Nome no Treinamento
      cy.get('[language=""] > .w-100').click()                           //  Idioma em portugues
      cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/images6.png', { force: true });
      cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

      //Aba autor
      cy.get('[ui-sref="accessLink.content.courses.edit.id.authors"]').click()                                               // Clica em Autores
      cy.get('[authors=""] > .ng-isolate-scope > .multiselect > .border > :nth-child(1) > .ui-select-search').type('Autor')  // Digita Autores
      cy.wait(1000)                                                                                                          // Espera alguns segundo
      cy.get('#ui-select-choices-row-41-0 > .ui-select-choices-row-inner').click()                                           // Clica no primeiro autor                                           
       
      //Aba conteúdo
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
      cy.wait(10000);                                                                // Espera 10 segundo para digitar um nome de um documento
      cy.get(".weight").type("1");                                                   // Selecionar peso
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Adicionar documento

      //Adicionar turma
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click();     // sessão turma
      cy.get('[ng-click="editClass()"]').click();                                   //botão de adicionar turma
      cy.get("#className").type("Teste turma");                                     //nome da turma
      cy.get(".add-content > .end > .btn-swipe-accent").click();                    //botão de adicionar turma

      //Salvar treinamento
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click();                               // sessão conteúdos
      cy.get(".content-box-footer > .flex > .btn-swipe-accent").click();                                       //botão de salvar
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click();                              //salvar versionamento


    });
  });
});