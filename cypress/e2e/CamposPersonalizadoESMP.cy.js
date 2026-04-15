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
    msg.includes('ResizeObserver loop completed with undelivered notifications') ||
    msg.includes('renderCertificateClick is not a function')
  ) {
    return false;
  }
});

describe("Teste - Login", () => {

  before(() => {
    cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.viewport(1920, 1080);

    cy.contains("button", "Entrar")
      .should('be.visible')
      .click({ force: true });

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
  
  /*
  it('Vai até a Categoria', () => {
    
    // =============================
    // 🔹 Acessa Treinamentos
    // =============================
    cy.get('[title="Treinamentos"] > .sideitem').click();
    cy.wait(3000);

    cy.get('[data-nodeid="45"]').click();
    cy.get('[data-nodeid="46"]').click();

  });

  it("Criação do primeiro treinamento pago com aprovação de campos", () => {

    // =============================
    // 🔹 Acessa Treinamentos
    // =============================
      //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

    cy.wait(3000);

    cy.get("#courseName").type("Primeiro Cenário");

      //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100')
        .scrollIntoView()
        .click()

        cy.get('[external-id=""] > .w-100').type("012025")

    // =============================
    // 🔹 Adicionar conteúdo
    // =============================

    cy.wait(2000)

     cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]')  // Clica em conteudos
     .scrollIntoView()
     .click()     

     cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent')
        .click()                

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();  // Clicou na aba

    cy.get(".open > .ui-select-choices > :nth-child(2)").click();  // Selecionar documentos como tipo de conteúdo

     cy.get(".weight").type("1");                                                   // Selecionar peso

        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

    cy.contains('.ui-select-container', 'Escolha um documento')
      .click()
      .within(() => {
        cy.get('input.ui-select-search').type('Minha');
      });

    cy.contains('.ui-select-choices-row', 'Minha Área - Adm.pdf',{timeout: 60000})
      .click();

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    // =============================
    // 🔹 Criar turma
    // =============================

    cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click();
    cy.get('[ng-click="editClass()"]').click();

    cy.get("#className")
      .type("Primeiro Cenário - Turma 1");

    cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio') //Clica em preço fixo 
    .click();

    cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

    cy.get('#price-fixed')
      .clear()
      .type('3.91');

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click();

    cy.get('.navigation-controls > .ml-20').click();
    cy.get('.navigation-controls > .ml-20').click();

    cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click();

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago suporte")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout: 60000})
      .click();

    cy.contains('button', 'Adicionar').click();

    // =============================
    // 🔹 Campos personalizados   
    // =============================

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

             cy.contains('.ui-select-choices-row span.ng-binding','campo 04.12',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================
    cy.get('.add-content > .end > .btn-swipe-accent').click();

    cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();

    cy.wait(7000)

  });

  it("Criação do segundo treinamento pago com aprovação de campos", () => {

     //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

    cy.get("#courseName").type("Segundo Cenário");

      //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100')
        .scrollIntoView()
        .click()

        cy.get('[external-id=""] > .w-100').type("012025")

    // =============================
    // 🔹 Adicionar conteúdo
    // =============================

    cy.wait(2000)

     cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]')  // Clica em conteudos
     .scrollIntoView()
     .click()     

     cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent')
        .click()                

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();  // Clicou na aba

    cy.get(".open > .ui-select-choices > :nth-child(2)").click();  // Selecionar documentos como tipo de conteúdo

     cy.get(".weight").type("1");                                                   // Selecionar peso

        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

    cy.contains('.ui-select-container', 'Escolha um documento')
      .click()
      .within(() => {
        cy.get('input.ui-select-search').type('Minha');
      });

    cy.contains('.ui-select-choices-row', 'Minha Área - Adm.pdf',{timeout: 60000})
      .click();

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    // =============================
    // 🔹 Criar turma
    // =============================

    cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click();
    cy.get('[ng-click="editClass()"]').click();

    cy.get("#className")
      .type("Segundo Cenário - Turma 1");

    cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio') //Clica em preço fixo 
    .click();

    cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

    cy.get('#price-fixed')
      .clear()
      .type('3.91');

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click();

    cy.get('.navigation-controls > .ml-20').click();
    cy.get('.navigation-controls > .ml-20').click();

    cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click();

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago suporte")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout: 60000})
      .click();

    cy.contains('button', 'Adicionar').click();

    // =============================
    // 🔹 Campos personalizados   
    // =============================

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

             cy.contains('.ui-select-choices-row span.ng-binding','Novo campo 04.12',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================
    cy.get('.add-content > .end > .btn-swipe-accent').click();

    cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();

    cy.wait(7000)

  });


  it("Criação do terceiro treinamento pago com aprovação de campos", () => {

     //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

    cy.get("#courseName").type("Terceiro Cenário");

      //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100')
        .scrollIntoView()
        .click()

        cy.get('[external-id=""] > .w-100').type("012025")

    // =============================
    // 🔹 Adicionar conteúdo
    // =============================

    cy.wait(2000)

     cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]')  // Clica em conteudos
     .scrollIntoView()
     .click()     

     cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent')
        .click()                

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();  // Clicou na aba

    cy.get(".open > .ui-select-choices > :nth-child(2)").click();  // Selecionar documentos como tipo de conteúdo

     cy.get(".weight").type("1");                                                   // Selecionar peso

        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

    cy.contains('.ui-select-container', 'Escolha um documento')
      .click()
      .within(() => {
        cy.get('input.ui-select-search').type('Minha');
      });

    cy.contains('.ui-select-choices-row', 'Minha Área - Adm.pdf',{timeout: 60000})
      .click();

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    // =============================
    // 🔹 Criar turma
    // =============================

    cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click();
    cy.get('[ng-click="editClass()"]').click();

    cy.get("#className")
      .type("Terceiro Cenário - Turma 1");

    cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio') //Clica em preço fixo 
    .click();

    cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

    cy.get('#price-fixed')
      .clear()
      .type('3.91');

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click();

    cy.get('.navigation-controls > .ml-20').click();
    cy.get('.navigation-controls > .ml-20').click();

    cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click();

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago suporte")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout: 60000})
      .click();

    cy.contains('button', 'Adicionar').click();

    // =============================
    // 🔹 Campos personalizados   
    // =============================

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

             cy.contains('.ui-select-choices-row span.ng-binding','Novo campo 04.12',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================
    cy.get('.add-content > .end > .btn-swipe-accent').click();

    cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();

    cy.wait(7000)

  });

  it("Criação do quarto treinamento pago com aprovação de campos", () => {

     //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

    cy.get("#courseName").type("Quarto Cenário");

      //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100')
        .scrollIntoView()
        .click()

        cy.get('[external-id=""] > .w-100').type("012025")

    // =============================
    // 🔹 Adicionar conteúdo
    // =============================

    cy.wait(2000)

     cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]')  // Clica em conteudos
     .scrollIntoView()
     .click()     

     cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent')
        .click()                

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();  // Clicou na aba

    cy.get(".open > .ui-select-choices > :nth-child(2)").click();  // Selecionar documentos como tipo de conteúdo

     cy.get(".weight").type("1");                                                   // Selecionar peso

        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

    cy.contains('.ui-select-container', 'Escolha um documento')
      .click()
      .within(() => {
        cy.get('input.ui-select-search').type('Minha');
      });

    cy.contains('.ui-select-choices-row', 'Minha Área - Adm.pdf',{timeout: 60000})
      .click();

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    // =============================
    // 🔹 Criar turma
    // =============================

    cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click();
    cy.get('[ng-click="editClass()"]').click();

    cy.get("#className")
      .type("Quarto Cenário - Turma 1");

    cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio') //Clica em preço fixo 
    .click();

    cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

    cy.get('#price-fixed')
      .clear()
      .type('3.91');

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click();

    cy.get('.navigation-controls > .ml-20').click();
    cy.get('.navigation-controls > .ml-20').click();

    cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click();

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago suporte")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout: 60000})
      .click();

    cy.contains('button', 'Adicionar').click();

    // =============================
    // 🔹 Campos personalizados   
    // =============================

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

             cy.contains('.ui-select-choices-row span.ng-binding','teste 09/12/2025 campo',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

    // =============================
    // 🔹 Salvar
    // =============================
    cy.get('.add-content > .end > .btn-swipe-accent').click();

    cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();

    cy.wait(7000)

  });

it("Criação do quinto treinamento pago com aprovação de campos", () => {

     //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

    cy.get("#courseName").type("Quinto Cenário");

      //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100')
        .scrollIntoView()
        .click()

        cy.get('[external-id=""] > .w-100').type("012025")

    // =============================
    // 🔹 Adicionar conteúdo
    // =============================

    cy.wait(2000)

     cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]')  // Clica em conteudos
     .scrollIntoView()
     .click()     

     cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent')
        .click()                

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();  // Clicou na aba

    cy.get(".open > .ui-select-choices > :nth-child(2)").click();  // Selecionar documentos como tipo de conteúdo

     cy.get(".weight").type("1");                                                   // Selecionar peso

        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

    cy.contains('.ui-select-container', 'Escolha um documento')
      .click()
      .within(() => {
        cy.get('input.ui-select-search').type('Minha');
      });

    cy.contains('.ui-select-choices-row', 'Minha Área - Adm.pdf',{timeout: 60000})
      .click();

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    // ================================
    // 🔹 Criar turma
    // ===============================

    cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click();
    cy.get('[ng-click="editClass()"]').click();

    cy.get("#className")
      .type("uinto Cenário - Turma 1");

    cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio') //Clica em preço fixo 
    .click();

    cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

    cy.get('#price-fixed')
      .clear()
      .type('3.91');

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click();

    cy.get('.navigation-controls > .ml-20').click();
    cy.get('.navigation-controls > .ml-20').click();

    cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click();

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago suporte")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout: 60000})
      .click();

    cy.contains('button', 'Adicionar').click();

    // =============================
    // 🔹 Campos personalizados   
    // =============================

            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em Novo
            cy.get('.column > :nth-child(2) > .icon-radio') 
            .click()

            //Escreve no novo campo
       cy.get('input[ng-model="object.model[language.key]"]')
  .filter(':visible')
  .first()
  .invoke('removeAttr', 'disabled')
  .type('LECTOR20')

  //Clica em Tipo
 cy.get("[ng-show=\"useType == 'NEW' || isEditing\"] > :nth-child(2) > .ui-select-container")
  .click()

  //Espera as opções aparecerem 
  cy.wait(2000)

  //Seleciona a opção Texto
 cy.contains('.ui-select-choices-row', 'Texto')
  .should('be.visible')
  .click()

  //Clica em adicionar 
    cy.get(':nth-child(4) > .middle > .btn-swipe-accent')
    .click()

    cy.wait(1000)

   cy.get('.add-content > .end > .btn-swipe-accent').click();

    cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();

  cy.wait(7000)

  });


  it("Criação do sexto treinamento pago com aprovação de campos", () => {

     //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

    cy.get("#courseName").type("Quinto Cenário - Segundo Texte");

      //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100')
        .scrollIntoView()
        .click()

        cy.get('[external-id=""] > .w-100').type("012025")

    // =============================
    // 🔹 Adicionar conteúdo
    // =============================

    cy.wait(2000)

     cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]')  // Clica em conteudos
     .scrollIntoView()
     .click()     

     cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent')
        .click()                

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();  // Clicou na aba

    cy.get(".open > .ui-select-choices > :nth-child(2)").click();  // Selecionar documentos como tipo de conteúdo

     cy.get(".weight").type("1");                                                   // Selecionar peso

        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

    cy.contains('.ui-select-container', 'Escolha um documento')
      .click()
      .within(() => {
        cy.get('input.ui-select-search').type('Minha');
      });

    cy.contains('.ui-select-choices-row', 'Minha Área - Adm.pdf',{timeout: 60000})
      .click();

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    // =============================
    // 🔹 Criar turma
    // =============================

    cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click();
    cy.get('[ng-click="editClass()"]').click();

    cy.get("#className")
      .type("Quinto Cenário - Turma 2");

    cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio') //Clica em preço fixo 
    .click();

    cy.get('.column > :nth-child(1) > .icon-checkbox') //Clica em requer aprovação
    .click();

    cy.get('#price-fixed')
      .clear()
      .type('3.91');

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click();

    cy.get('.navigation-controls > .ml-20').click();
    cy.get('.navigation-controls > .ml-20').click();

    cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click();

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago suporte")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'thiago suporte', {timeout: 60000})
      .click();

    cy.contains('button', 'Adicionar').click();

    // =============================
    // 🔹 Campos personalizados   
    // =============================

            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})

          //Digitar o nome do campo
 cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
 .type('LECTOR20')

 //Clica no campo
             cy.contains('.ui-select-choices-row span.ng-binding','LECTOR20',{ timeout: 60000 })
.should('be.visible')
.click();

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

             cy.get('.add-content > .end > .btn-swipe-accent').click();

    cy.get('.content-box-footer > .flex > .btn-swipe-accent').click();

    cy.wait(7000)

  });

    it('Entra em outro perfil Aluno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

      it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(9)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
   });

    it("Envia os campos do Treinamento gratuito com aprovação de campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Primeiro Cenário', { timeout: 60000 })
  .scrollIntoView()
  .click()

     //Clica em comprar
       cy.get('.center > div > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('TESTE CAMPO PRIMEIRO CENÁRIO');

});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(6000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it('Meu Cadastro', () => {
      cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']", { timeout: 10000 })
        .scrollIntoView()
        .find('.ng-binding')
        .click({ force: true });

      cy.get("[ng-class*='home.register']", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ui-sref="accessLink.content.home.register.more-info"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

        cy.scrollTo('bottom');

        //Clique em Salvar
        cy.get('.open-content > .content-box-footer > .btn-swipe-accent')
        .scrollIntoView()
        .click()

        cy.wait(5000)

   });

    it('Volta pro perfil Administrador',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("2006lrnrgr");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

     it("Aceita o campo", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(3000)

  //Aceita o primeiro documento
cy.get('tbody > :nth-child(1) button.btn.round.icon-checkbox.txt-success', { timeout: 60000 })
  .first()
  .click({ force: true });

  cy.wait(2000)
 
  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(5000)

  //Clioca no icon de notivicações pra fechar a aba
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

    });

    it("Aba Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click() 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click();

   });

    it("Recusa a solicitação do usuario", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Primeiro Cenário', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
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

   //Clica em Recusar
  cy.contains('button', 'Recusar', { timeout: 60000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click()

  //Escreve a recusa
  cy.get('textarea[ng-model="declineSubscriptions.reason"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('Teste Recusa do Primeiro Cenário', { delay: 50 })

  //Clica em recusar
  cy.get('[ng-show="modal.declineBatchSubscriptions"] > .modal > .content-box-footer > .btn-swipe-accent',{ timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(4000)

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

   });

   it('Entra em outro perfil Aluno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

          it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(9)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
   });

     it("Envia os campos do Treinamento gratuito com aprovação de campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Primeiro Cenário', { timeout: 60000 })
  .scrollIntoView()
  .click()

     //Clica em comprar
       cy.get('.center > div > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('TESTE CAMPO PRIMEIRO CENÁRIO');

});

cy.wait(2000)

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(6000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it('Meu Cadastro', () => {
      cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']", { timeout: 10000 })
        .scrollIntoView()
        .find('.ng-binding')
        .click({ force: true });

      cy.get("[ng-class*='home.register']", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ui-sref="accessLink.content.home.register.more-info"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

        cy.scrollTo('bottom');

        //Clique em Salvar
        cy.get('.open-content > .content-box-footer > .btn-swipe-accent')
        .scrollIntoView()
        .click()

        cy.wait(5000)

   });

    it('Volta pro perfil Administrador',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("2006lrnrgr");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

     it("Aceita o campo", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(3000)

  //Aceita o primeiro documento
cy.get('tbody > :nth-child(1) button.btn.round.icon-checkbox.txt-success', { timeout: 60000 })
  .first()
  .click({ force: true });

  cy.wait(2000)
 
  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(5000)

    });

    it("Aba Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click() 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click();

   });

    it("Aceita a solicitação do usuario", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Primeiro Cenário', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
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

  cy.wait(4000)

    //Aguardando pagamento 
      cy.contains('a', 'Aguardando pagamento', { timeout: 60000 })
  .should('be.visible')
  .click()

  // Verefica se o usaurio está na lista de aguardando pagamento
  cy.contains('td', 'thiago suporte', { timeout: 60000 })
  .should('be.visible');

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

   });
*/
it('Entra em outro perfil Aluno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

  it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(9)', { timeout: 60000 })
        .should('be.visible')
        .click();
        
   });

   /*
     it("Envia os campos do Treinamento gratuito com aprovação de campos personalizados", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Primeiro Cenário', { timeout: 60000 })
  .scrollIntoView()
  .click()

  //Verefica se o botão de efetuar pagamento aparece
  cy.contains('Efetuar pagamento', { timeout: 60000 })
  .should('be.visible');

    //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

     });
*/

     it('Verefica as informações do Campo Aprovado', () => {


      cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']", { timeout: 10000 })
        .scrollIntoView()
        .find('.ng-binding')
        .click({ force: true });

      cy.get("[ng-class*='home.register']", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ui-sref="accessLink.content.home.register.more-info"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Clica em outra informações
        cy.get('[ui-sref="accessLink.content.home.register.more-info"]')
        .click()

        //Verefique se está escrito o campo aprovado
    cy.get('input[placeholder="campo 04.12"]', { timeout: 60000 })
  .should('have.value', 'TESTE CAMPO PRIMEIRO CENÁRIO');

  //Clica em Voltar
  cy.get('.showcase-head-2 > .btn')
  .click()
 
  
     });

});