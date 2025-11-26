/// <reference types="cypress" />

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("123");
    cy.get('#btn-entrar').click();

});


  context("Teste Pagamento BB", () => {
    it("Login", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem').click()
      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="40"]').click()
      
    });
    /*
    
    it("Criando Turma paga á vista sem aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar > .btn-icon').click()
        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Turma paga á vista sem aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/PagaSemAprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")
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
  .type('{selectall}3.91');   
      
  cy.get('#installmentDate0') //Clica no calendario da data de vencimento
  .should('be.visible')
  .click({ force: true });

  cy.wait(10000) //Espera um tempo para inserir a data de vencimento
  cy.log("INSIRA UMA DATA DE VENCIMENTO")

      
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
        cy.get("#courseName").type("Turma paga á vista com aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/PagaComAprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")
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
  .type('{selectall}3.91');   
      
  cy.get('#installmentDate0') //Clica no calendario da data de vencimento
  .should('be.visible')
  .click({ force: true });

  cy.wait(10000) //Espera um tempo para inserir a data de vencimento
  cy.log("INSIRA UMA DATA DE VENCIMENTO")

      
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

     })

      it("Criar turma paga com pagamento em 2x Sem aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Turma paga 2x sem aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/2xSemAprovação.jpg', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")
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

    it('Turma pagamento recorrente 2x sem aprovação', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma recorrente 2x com aprovação"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
      cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente 
      
  cy.get('#installmentDate0') //Clica no calendario da data de vencimento
  .should('be.visible')
  .click({ force: true });

  cy.wait(10000) //Espera um tempo para inserir a data de vencimento
  cy.log("INSIRA UMA DATA DE VENCIMENTO")

      
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

     })
      

     it("Criar turma paga com pagamento em 2x com aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Turma paga 2x com aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/2xComAprovação.jpg', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")
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

    it('Turma pagamento recorrente 2x com aprovação', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Recorrente 2x com aprovação"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
      cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente 
      
  cy.get('#installmentDate0') //Clica no calendario da data de vencimento
  .should('be.visible')
  .click({ force: true });

  cy.wait(10000) //Espera um tempo para inserir a data de vencimento
  cy.log("INSIRA UMA DATA DE VENCIMENTO")

      
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
     })

it("Criar turma paga com pagamento em 5x sem aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Turma paga 5x sem aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/5xSemAprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")
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

    it('Turma pagamento recorrente 5x sem aprovação', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Recorrente 5x sem aprovação"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
      cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente 

      cy.get('.column > :nth-child(1) > .input-number > div > .icon-pointer-up') //Clica 3x para ficar a parcela em 5x
  .click()
  .click()
  .click();

      
  cy.get('#installmentDate0') //Clica no calendario da data de vencimento
  .should('be.visible')
  .click({ force: true });

  cy.wait(10000) //Espera um tempo para inserir a data de vencimento
  cy.log("INSIRA UMA DATA DE VENCIMENTO")

      
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
     })

     it("Criar turma paga com pagamento em 5x com aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Turma paga 5x com aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/5xComAprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")
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

    it('Turma pagamento recorrente 5x com aprovação', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Recorrente 5x com aprovação"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
      cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente 

      cy.get('.column > :nth-child(1) > .input-number > div > .icon-pointer-up')//Clica 3x para ficar a parcela em 5x
  .click()
  .click()
  .click();
      
  cy.get('#installmentDate0') //Clica no calendario da data de vencimento
  .should('be.visible')
  .click({ force: true });

  cy.wait(10000) //Espera um tempo para inserir a data de vencimento
  cy.log("INSIRA UMA DATA DE VENCIMENTO")

      
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
     })
*/
     it('Colocando a Categoria do Treinamento na Vitrine', () => { 
     //Role até aparecer vitrines
    cy.log('ROLE ATÉ APARECER A VITRINES NA ABA')
    cy.wait(5000)

        //Clica na vitrine
        cy.get('a.sideitem[ui-sref="accessLink.content.showcases"]')
  .should('be.visible')
  .click({ force: true });
        cy.wait(2000)

        //Clica na primeira vitrine
        cy.get(':nth-child(1) > :nth-child(5) > .actions > .actions-line > :nth-child(1) > .btn').click()
        
        cy.wait(2000)
        //Clica em adicionar
        cy.get('.btn-icon').click()

        cy.wait(2000)
        cy.get('[ng-click="addCarousel();"]').click();
        
        
        //Tempo para adicionar a categoria
        cy.wait(15000)
        cy.log("ADICIONE A CATEGORIA DO TREINAMENTO MANUALMENTE")
 
        
// Clica no botão "Salvar" no carrosel
cy.contains('button.btn-swipe-accent.ng-binding', 'Salvar')
  .should('be.visible')
  .click({ force: true });

//clica em salvar novamente
cy.contains('button.btn-swipe-accent.ng-scope', 'Salvar')
  .should('be.visible')
  .click({ force: true });
      
    });

  });

});