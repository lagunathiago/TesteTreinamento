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

    cy.visit("https://hml.lector.live/ext/subscribe/login");
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

  context("Teste Aprovações", () => {

    /*
     it("Aba Treinamentos", () => {

         // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="14"]', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true });

    });

    it("Treinamento paga á vista sem aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar > .btn-icon').click()
        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento pago á vista sem aprovação") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/PagaSemAprovação.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        
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
      .type('Boletim Lector')
  })


  // 3) clica no item pelo texto (use um trecho, não o nome inteiro)
cy.get('.ui-select-dropdown, .ui-select-choices', { timeout: 60000 })
  .contains('div.ui-select-choices-row', 'Boletim Lector 07-10-2024', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true });
  
  cy.get(".editing-resource > .end > .btn-swipe-accent").click();

  

    });
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
     
      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna')
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
     
    });

    it('Clica no treinamento denovo', ()=> {

     //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento pago á vista sem aprovação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  //Clica na turma
        cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]',{timeout:60000})
        .should('be.visible')
        .click()

    })

     it('Duplicar Turma Paga para Gratuita', () => {

  //Clicar em clonar turma

    cy.get('button[title="Clonar turma"]')
      .should('exist')
      .click({ force: true });
  
       cy.get("#className").type(" Clonagem Para gratuita"); //nome da turma
       cy.get('input[type="radio"][value="free"]')//Clica em gratuito
  .should('exist')
  .check({ force: true });

      cy.wait(3000)

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
     
    });


     it("Treinamento paga á vista com aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) 
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
        
         cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Boletim Lector')
  })

  // 3) clica no item pelo texto (use um trecho, não o nome inteiro)
cy.get('.ui-select-dropdown, .ui-select-choices', { timeout: 60000 })
  .contains('div.ui-select-choices-row', 'Boletim Lector 07-10-2024', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true });
  
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

         it('Clica no treinamento denovo', ()=> {

     //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento paga á vista com aprovação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  //Clica na turma
        cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]',{timeout:60000})
        .should('be.visible')
        .click()

    })

         it('Duplicar Turma Paga para Gratuita', () => {

  //Clicar em clonar turma
    cy.get('button[title="Clonar turma"]')
      .should('exist')
      .click({ force: true });
  
       cy.get("#className").type(" Clonagem Para gratuita"); //nome da turma
       cy.get('input[type="radio"][value="free"]')//Clica em gratuito
  .should('exist')
  .check({ force: true });

      cy.wait(3000)

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

     cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Boletim Lector')
  })

  // 3) clica no item pelo texto (use um trecho, não o nome inteiro)
cy.get('.ui-select-dropdown, .ui-select-choices', { timeout: 60000 })
  .contains('div.ui-select-choices-row', 'Boletim Lector 07-10-2024', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true });
  
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

     it('Clica no treinamento denovo', ()=> {

     //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento gratuito com aprovação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  //Clica na turma
        cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]',{timeout:60000})
        .should('be.visible')
        .click()

    })

        it('Duplicar Turma Gratuita para Paga', () => {

  //Clicar em clonar turma
    cy.get('button[title="Clonar turma"]')
      .should('exist')
      .click({ force: true });

       cy.get("#className").type("Clonagem Para Paga"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}1.00'); 

      cy.wait(3000)

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

          cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Boletim Lector')
  })

  // 3) clica no item pelo texto (use um trecho, não o nome inteiro)
cy.get('.ui-select-dropdown, .ui-select-choices', { timeout: 60000 })
  .contains('div.ui-select-choices-row', 'Boletim Lector 07-10-2024', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true });
  
  cy.get(".editing-resource > .end > .btn-swipe-accent").click();
        
    })
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
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

    });

    it('Clica no treinamento denovo', ()=> {

     //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento gratuito sem aprovação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

  //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  //Clica na turma
        cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]',{timeout:60000})
        .should('be.visible')
        .click()

    })

     it('Duplicar Turma Gratuita para Paga', () => {

  //Clicar em clonar turma

    cy.get('button[title="Clonar turma"]')
      .should('exist')
      .click({ force: true });

       cy.get("#className").type("Clonagem Para Paga"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}1.00'); 

      cy.wait(3000)

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
      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento

      cy.wait(3000)

    });

     it("Muda para o perfil aluno", ()=> {

        //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Perfil
  cy.get('.icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Aluno
  cy.get('.user-options-items > :nth-child(1) > ng-transclude', { timeout: 60000 })
  .should('be.visible')
  .click()

   });

*/
    it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(7)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
   });
/*
     it('Compra do Treinamento pago á vista sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();


            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento pago á vista sem aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        //Clica no pix
      cy.get(".mb-5 > .icon-radio", { timeout: 10000 })
        .should("be.visible")
        .click();

        //Clica em continuar compra
      cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {
        timeout: 10000,
      })
        .should("be.visible")
        .click();

      cy.wait(4000);

      cy.get("#pixQrCode", { timeout: 60000 }).should("be.visible");

  cy.wait(3000)
  

  //Fecha modal
  cy.get('.column.ng-valid > .modal-header > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });
    
     it('Solicita a incrição no Treinamento paga á vista com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento paga á vista com aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

  cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });

     it('Solicita a incrição no Treinamento gratuito com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito com aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
        cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

  cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });
    */
     it('Faz a incrição no Treinamento gratuito sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito sem aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

  cy.wait(3000)

//Clica em acessar
  cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
        cy.wait(3000)

        //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
 
      cy.log('CONCLUA O TREINAMENTO')
      cy.pause()

});

     it('Acessar o Treinamento gratuito sem aprovação novamente após a conclusão', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Treinamento gratuito sem aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

  cy.wait(3000)

//Clica em acessar
  cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()
        cy.wait(3000)

        //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

      cy.log('CONCLUA O TREINAMENTO')
      cy.pause()

     });


 it("Troca pro perfil Administrador", () => {

     //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em selecionar perfil
    cy.get(':nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Clica em Administrador
  cy.get(':nth-child(4) > .user-options-items > :nth-child(1) > ng-transclude > .ng-binding', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

     it("Aba Treinamentos", () => {

         // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="43"]',{timeout:60000})
      .should('be.visible')
      .click() 

    });

    it("Aceita a solicitação do Treinamento paga á vista com aprovação", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento paga á vista com aprovação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .first()
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica em Aprovar
  cy.contains('button', 'Aprovar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Aprova
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 60000})
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(5)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.get('.breadcrumbs-path > .lector-txt-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

   });

    it("Aceita a solicitação do Treinamento gratuito com aprovação", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Treinamento gratuito com aprovação', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .first()
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica em Aprovar
  cy.contains('button', 'Aprovar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Aprova
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 60000})
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(5)',{ timeout: 60000 })
  .should('be.visible')
  .click()

   });

   




    
  });
});
