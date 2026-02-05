/*
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Cannot read properties of null') &&
      err.message.includes('charAt')) {
    return false
  }
  
})
*/
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Cannot read properties of null") ||
    err.message.includes("charAt")
  ) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

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

  context("Criação Treinamentos Para o Teste de Emails", () => {
      it("Criação dos treinamentos", () => {

         // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="42"]',{timeout:60000})
      .should('be.visible')
      .click() 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="43"]',{timeout:60000})
      .should('be.visible')
      .click() 
   
    });
    it("Treinamento gratuito sem aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento gratuito sem aprovação") //  Nome no Treinamento

        cy.get('[aspect="banner"]').selectFile('cypress/fixtures/Treinamento gratuito sem aprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")
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
      .type('Minha')
  });

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

  cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });
    it('Treinamento Gratuito sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Treinamento Gratuito sem aprovação"); //nome da turma
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
  .click();

      cy.wait(1000);

      // Clica no botão "Salvar Turma"
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

    });
     
     it("Treinamento paga á vista sem aprovação", () => {

         //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 1 minuto
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento pago á vista sem aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Treinamento pago sem aprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
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

         cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

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

  cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco

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
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
    });

     it("Treinamento pago com recorrência sem aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento pago com recorrência sem aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Treinamento pago com recorrência sem aprovação.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    });

    it("Adicionar Conteúdo", () => {

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
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })

    it('Criando turma do treinamento', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Treinamento pago com recorrência sem aprovação"); //nome da turma
            cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
      cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente 

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna',{timeout:60000})
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(4000)

    });

         it("Treinamento gratuito com aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento gratuito com aprovação") //  Nome no Treinamento

        cy.get('[aspect="banner"]').selectFile('cypress/fixtures/Treinamento gratuito com aprovação de gestor.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

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
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })
    it('Turma Gratuita com aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita com aprovação"); //nome da turma
      
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
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
      
    });
    

     it("Treinamento paga com aprovação de Gestor", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento paga com aprovação de Gestor") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Treinamento pago com aprovação de gestor', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
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
        
         cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })

    it('Turma Paga á vista com aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma paga com aprovação de Gestor"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
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
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
       
        });

         it("Treinamento pago com recorrência e aprovação de gestor", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento pago com recorrência e aprovação de gestor") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Treinamento pago com recorrência e aprovação de gestor.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    })

    it("Adicionar Conteúdo", () => {

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
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })
    it('Criando turma do treinamento', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma pago com recorrência e aprovação de gestor"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
      cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna',{timeout:60000})
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(4000)

    });


    it("Treinamento gratuito com aprovação de campos personalizados", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento gratuito com aprovação de campos personalizados") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Treinamento gratuito com aprovação de campos personalizados.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    })

    it("Adicionar Conteúdo", () => {

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
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })

    it('Treinamento gratuito com aprovação de campos personalizados', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma gratuito com aprovação de campos personalizados"); //nome da turma
      
          cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna',{timeout:60000})
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    });
    
         it('Adicinando a aprovação de campos personalizado', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

           cy.contains(
  '.ui-select-choices-row span.ng-binding',
  'campo 04.12',
  { timeout: 60000 }
)
.should('be.visible')
.click();


            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(4000)

    });
    
        
      it("Treinamento pago com aprovação de campos personalizados", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento pago com aprovação de campos personalizados") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Treinamento pago com aprovação de campos personalizados.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    })

    it("Adicionar Conteúdo", () => {

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
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

    it('Criando turma do treinamento', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma pago com aprovação de campos personalizados"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
       cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação

      
    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna',{timeout:60000})
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    });
    
         it('Adicinando a aprovação de campos personalizado', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

         
           cy.contains(
  '.ui-select-choices-row span.ng-binding',
  'campo 04.12',
  { timeout: 60000 }
)
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(4000);

    });

 it("Treinamento pago com recorrência e aprovação de campos personalizados", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento pago com recorrência e aprovação de campos personalizados") //  Nome no Treinamento
        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Teste050.png', { force: true });

        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    });

    it("Adicionar Conteúdo", () => {

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
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

     it('Criando turma do treinamento', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Treinamento pago com recorrência e aprovação de campos personalizados"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
  cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente 
      cy.get('.column > :nth-child(1) > .input-number > div > .icon-pointer-up')//Clica 2x para ficar a parcela em 4x
  .click()
       cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação


      
    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna',{timeout:60000})
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    });
    
         it('Adicinando a aprovação de campos personalizado', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             cy.contains(
  '.ui-select-choices-row span.ng-binding',
  'campo 04.12',
  { timeout: 60000 }
)
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(4000);

    });

    it("Treinamento gratuito com aprovação de gestor e campos personalizados", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento gratuito com aprovação de gestor e campos personalizados") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Treinamento gratuito com aprovação de gestor e campos personalizados.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    })

    it("Adicionar Conteúdo", () => {

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
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })

    it('Criando turma do treinamento', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Treinamento gratuito com aprovação de gestor e campos personalizados"); //nome da turma

      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna',{timeout:60000})
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    });
    
         it('Adicinando a aprovação de campos personalizado', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
           cy.contains(
  '.ui-select-choices-row span.ng-binding',
  'campo 04.12',
  { timeout: 60000 }
)
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(4000)

    });


     it("Treinamento pago com aprovação de gestor e campos personalizados", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento pago com aprovação de gestor e campos personalizados") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Treinamento pago com aprovação de gestor e campos personalizados.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    })

    it("Adicionar Conteúdo", () => {

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
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })

    it('Criando turma do treinamento', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma pago com aprovação de gestor e campos personalizados"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
      cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente 
      cy.get('.column > :nth-child(1) > .input-number > div > .icon-pointer-up')//Clica 2x para ficar a parcela em 4x
  .click()
  .click();

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna',{timeout:60000})
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    });
    
         it('Adicinando a aprovação de campos personalizado', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})  
            
           cy.contains(
  '.ui-select-choices-row span.ng-binding',
  'campo 04.12',
  { timeout: 60000 }
)
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(4000);

      

    });



  });
});
