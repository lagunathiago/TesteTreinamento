/// <reference types="cypress" />

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://hml.lector.live/ext/subscribe/login");
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("123");
    cy.get('#btn-entrar').click();

});

  context("Teste Pagamento Sicredi", () => {
    it("Login", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem').click()
      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.contains('li.list-group-item', 'TesteAutomação', { timeout: 10000 })
  .click({ force: true });
      
    });
    
    it("Criando Treinamento paga á vista sem aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar > .btn-icon').click()
        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento pago á vista sem aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/PagaSemAprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
        
    })

    it("Conteúdos", () => {

        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        //Doc
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        cy.log('DIGITE UM DOCUMENTO E SELECIONE')
        cy.wait(10000)
        cy.get(".editing-resource > .end > .btn-swipe-accent").click();  

    })

    it('Turma Paga á vista sem aprovação', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Paga é vista sem aprovação"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}1.00');   
      
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REMOVE GRUPO TODOS')
      cy.log('MANUALMENTE ADICIONE UM GRUPO/PERFIL')
      cy.wait(10000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento


    });

     it("Criando turma paga á vista com aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento paga á vista com aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/PagaComAprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
    })

    it("Conteúdos", () => {

        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        //Doc
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        cy.log('DIGITE UM DOCUMENTO E SELECIONE')
        cy.wait(10000)
        cy.get(".editing-resource > .end > .btn-swipe-accent").click();  

    })

    it('Turma Paga á vista com aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Paga é vista com aprovação"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}1.00');   
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REMOVE GRUPO TODOS')
      cy.log('MANUALMENTE ADICIONE UM GRUPO/PERFIL')
      cy.wait(10000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

        });

        it("Criando Treinamento gratuito com aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento gratuito com aprovação") //  Nome no Treinamento

        cy.get('[aspect="banner"]').selectFile('cypress/fixtures/GratuitasemAprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
    })

    it("Conteúdos", () => {

        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        //Doc
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        cy.log('DIGITE UM DOCUMENTO E SELECIONE')
        cy.wait(10000)
        cy.get(".editing-resource > .end > .btn-swipe-accent").click();  

    })

    it('Turma Gratuita com aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita com aprovação"); //nome da turma
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REMOVE GRUPO TODOS')
      cy.log('MANUALMENTE ADICIONE UM GRUPO/PERFIL')
      cy.wait(10000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento


    });

    it("Criando Treinamento sem aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento gratuito com aprovação") //  Nome no Treinamento

        cy.get('[aspect="banner"]').selectFile('cypress/fixtures/GratuitosemAprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
    })

    it("Conteúdos", () => {

        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        //Doc
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        cy.log('DIGITE UM DOCUMENTO E SELECIONE')
        cy.wait(10000)
        cy.get(".editing-resource > .end > .btn-swipe-accent").click();  

    })

    it('Turma Gratuita sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita sem aprovação"); //nome da turma
     cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REMOVE GRUPO TODOS')
      cy.log('MANUALMENTE ADICIONE UM GRUPO/PERFIL')
      cy.wait(10000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

    });
  });
});
