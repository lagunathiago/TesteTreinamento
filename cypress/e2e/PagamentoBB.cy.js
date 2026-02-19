Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  // Erros conhecidos do Angular / Front que não devem quebrar o teste
  if (
    msg.includes('Cannot read properties of null') ||
    msg.includes('charAt') ||
    msg.includes('writeText') ||
    msg.includes('Clipboard') ||
    msg.includes('Document is not focused')
  ) {
    return false; // ignora o erro e continua o teste
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

  context("Teste Pagamento BB", () => {
    
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
    
    it("Criando Turma paga á vista sem aprovação", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

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

      cy.wait(1000);
     
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
        cy.get("#courseName").type("Turma paga á vista sem aprovação") //  Nome no Treinamento

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

    it('Turma Paga á vista com aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Paga é vista com aprovação"); //nome da turma
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

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
     
    });

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

    });

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

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
     
    });

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

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
     
    });

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

       cy.get('.column > :nth-child(1) > .input-number > div > .icon-pointer-up')//Clica 3x para ficar a parcela em 5x
  .click()
  .click()
  .click();

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

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
     
    });

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

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

cy.wait(3000)

    });
    
    it("Muda para o perfil aluno", ()=> {

        //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.get('.icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Aluno
  cy.get('.user-options-items > :nth-child(2) > ng-transclude', { timeout: 60000 })
  .should('be.visible')
  .click()

    });


    it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(10)', { timeout: 60000 })
        .should('be.visible')
        .click();
       
   });

    it('Compra da Turma paga á vista sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga á vista sem aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

  cy.wait(3000)

        cy.log('VEREFIQUE O BOLETO')
        cy.wait(5000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });
    

     it('Solicita a incrição no Turma paga á vista com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga á vista com aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

  cy.wait(4000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });

     it('Compra da Turma paga 2x sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga 2x sem aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()    

  cy.wait(3000)

        cy.log('VEREFIQUE O BOLETO')
        cy.wait(5000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();    

    });


    it('Solicita incrição da Turma paga 2x com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga 2x com aprovação', { timeout: 60000 })
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

     it('Compra da Turma paga 5x sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga 5x sem aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()    

  cy.wait(3000)

        cy.log('VEREFIQUE O BOLETO')
        cy.wait(5000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();    

    });

     it('Solicita incrição da Turma paga 5x com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga 5x com aprovação', { timeout: 60000 })
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


     it("Sai do perfil de compra", () => {

     //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em sair
    cy.contains('div.option.menu-option', 'Sair', { timeout: 60000 })
  .should('be.visible')
  .click()



    });
    
       it('Entra em outro perfil e aceita as solicitações de matriculas',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');


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

     it("Aceita a solicitação do Turma paga á vista com aprovação", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Turma paga á vista com aprovação', {
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

    it("Aceita a solicitação do Turma paga 2x com aprovação", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Turma paga 2x com aprovação', {
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


     it("Aceita a solicitação do Turma paga 5x com aprovação", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Turma paga 5x com aprovação', {
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
    

    it('Sai do Perfil adm', () => {

    //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

    //Clica em sair
    cy.contains('div.option.menu-option', 'Sair', { timeout: 60000 })
  .should('be.visible')
  .click()

    });

it('Entra no perfil aluno para validar os boletos', () => {


  cy.log('ESPERE CARREGAR A PÁGINA E CONTINUE')
  cy.pause()

  cy.get('input[type="text"]', { timeout: 60000 })
    .filter(':visible')
    .first()
    .clear()
    .type('qualidade2@lectortec.com.br');

  cy.get('input[type="password"]', { timeout: 60000 })
    .filter(':visible')
    .first()
    .clear()
    .type('2006lrnrgr');

  cy.get('#btn-entrar', { timeout: 60000 })
    .should('be.visible')
    .click();

  cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');
});

    it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(10)', { timeout: 60000 })
        .should('be.visible')
        .click();


    });

    it('Emite o boleto do Turma paga á vista com aprovação', ()=> {

      //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga á vista com aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em efetuar pagamento
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(4000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it('Emite o boleto do Turma paga 2x com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga 2x com aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em efetuar pagamento
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(4000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it('Emite o boleto do Turma paga 5x com aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga 5x com aprovação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        //Clica em efetuar pagamento
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(4000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });


 it("Minha área/Minhas compras/", () => {

      //Minha área
      cy.contains("span", "Minha Área", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Minhas compras
      cy.contains("button.showcase-home-menu-item", "Minhas Compras", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();
    });

it("Valida compra do Turma paga á vista sem aprovação", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Turma paga á vista sem aprovação", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.get('.pagination > :nth-child(3) > a',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)


      //clica no ultimo
      cy.get('#mypurchases-table tbody tr', { timeout: 20000 })
  .filter(':has(button.bb-slip)')
  .last()
  .within(() => {
    cy.get('button.bb-slip')
      .should('be.visible')
      .click();
  });

      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");

      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });


        cy.log('VALIDE AS INFORMAÇÕES DO BOLETO')
        cy.pause()

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

    });

    it("Valida compra do Turma paga á vista com aprovação", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Turma paga á vista com aprovação", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)

//Clica no ultimo
     cy.get('#mypurchases-table tbody tr', { timeout: 20000 })
  .filter(':has(button.bb-slip)')
  .last()
  .within(() => {
    cy.get('button.bb-slip')
      .should('be.visible')
      .click();
  });

      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");

      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });


        cy.log('VALIDE AS INFORMAÇÕES DO BOLETO')
        cy.pause()

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

    });

     it("Valida compra do Turma paga 2x sem aprovação", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Turma paga 2x sem aprovação", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)

      //clica no ultimo
        cy.get('#mypurchases-table tbody tr', { timeout: 20000 })
  .filter(':has(button.bb-slip)')
  .last()
  .within(() => {
    cy.get('button.bb-slip')
      .should('be.visible')
      .click();
  });

      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");

      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });


        cy.log('VALIDE AS INFORMAÇÕES DO BOLETO')
        cy.pause()

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

    });

    it("Valida compra do Turma paga 2x com aprovação", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Turma paga 2x com aprovação", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)

      //clica no ultimo
        cy.get('#mypurchases-table tbody tr', { timeout: 20000 })
  .filter(':has(button.bb-slip)')
  .last()
  .within(() => {
    cy.get('button.bb-slip')
      .should('be.visible')
      .click();
  });

      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");

      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });

        cy.log('VALIDE AS INFORMAÇÕES DO BOLETO')
        cy.pause()

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

    });

    it("Valida compra do Turma paga 5x sem aprovação", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Turma paga 5x sem aprovação", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)

      //Clica no ultimo
         cy.get('#mypurchases-table tbody tr', { timeout: 20000 })
  .filter(':has(button.bb-slip)')
  .last()
  .within(() => {
    cy.get('button.bb-slip')
      .should('be.visible')
      .click();
  });

      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");

      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });

        cy.log('VALIDE AS INFORMAÇÕES DO BOLETO')
        cy.pause()

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

    });

    it("Valida compra do Turma paga 5x com aprovação", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Turma paga 5x com aprovação", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)

      //clica no ultimo
        cy.get('#mypurchases-table tbody tr', { timeout: 20000 })
  .filter(':has(button.bb-slip)')
  .last()
  .within(() => {
    cy.get('button.bb-slip')
      .should('be.visible')
      .click();
  });


      
      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");

      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .first()
        .click({ force: true });

        cy.log('VALIDE AS INFORMAÇÕES DO BOLETO')
        cy.pause()

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });


    });






  });

});