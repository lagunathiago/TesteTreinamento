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

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

             cy.contains('.ui-select-choices-row span.ng-binding','NOVO',{ timeout: 60000 })
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

    cy.wait(1000)

     cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("teste09 teste08")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'teste09 teste08', {timeout: 60000})
      .click();

          cy.contains('button', 'Adicionar').click();

      cy.wait(2000)

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

      cy.wait(1000)

    cy.contains('button', 'Adicionar').click();

     cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("teste09 teste08")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'teste09 teste08', {timeout: 60000})
      .click();

          cy.contains('button', 'Adicionar').click();

      cy.wait(2000)

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
      .type("Quinto Cenário - Turma 1");

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

    cy.wait(1000)

     cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("teste09 teste08")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'teste09 teste08', {timeout: 60000})
      .click();

          cy.contains('button', 'Adicionar').click();

      cy.wait(2000)

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

    cy.wait(1000)

     cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("teste09 teste08")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

    cy.contains('.ui-select-choices-row', 'teste09 teste08', {timeout: 60000})
      .click();

          cy.contains('button', 'Adicionar').click();

      cy.wait(2000)

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

    it("Envia os campos do Treinamento ", () => {

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
      .click({force:true})

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click({force:true}) 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click({force:true});

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
      .click({force:true})

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

     it("Envia os campos do Treinamento", () => {

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
      .click({force:true})

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click({force:true}) 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click({force:true});

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
      .click( {force:true})

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

     it("Verefica se o botãoe fetuar pagamento está visivel", () => {

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

      it("Envia os campos do Treinamento", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Segundo Cenário', { timeout: 60000 })
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
    .type('TESTE CAMPO SEGUNDO CENÁRIO Aceitar');

});

   //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_1')
    .clear()
    .type('TESTE CAMPO SEGUNDO CENÁRIO Recusar');

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

     it("Aceita o campo e recusa o outro", () => {

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
cy.get('tbody > :nth-child(1) > :nth-child(8) > .btn', { timeout: 20000 })
  .first()
  .click({ force: true });

  cy.wait(4000)

  //Recusa o segundo documento
cy.get(':nth-child(2) > :nth-child(9) > .btn', { timeout: 10000 })
.click({ force: true });

 cy.wait(2000)

  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(6000)

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

      it("Envia os campos do Treinamento", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Segundo Cenário', { timeout: 60000 })
  .scrollIntoView()
  .click()

    //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()

        //Escreve no campo
        cy.get('.modal:visible',{ retries: 2 }).within(() => {
  cy.get('#customField_0')
    .clear()
    .type('TESTE CAMPO SEGUNDO CENÁRIO Campo Recusado');

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

     it("Aceita o campo que foi recusado", () => {

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
cy.get('.link-row > :nth-child(7) > .btn', { timeout: 20000 })
.click()

  cy.wait(4000)

  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(6000)

    });

it("Aba Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click({force:true})

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click({force:true}) 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click({force:true});

   });

    it("Aceita a solicitação do usuario", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Segundo Cenário', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click( {force:true})

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

  
      it("Verefica se o botãoe fetuar pagamento está visivel", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Segundo Cenário', { timeout: 60000 })
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
    cy.get('input[placeholder="Novo campo 04.12"]', { timeout: 60000 })
  .should('have.value', 'TESTE CAMPO SEGUNDO CENÁRIO Campo Recusado');

  //Clica em Voltar
  cy.get('.showcase-head-2 > .btn')
  .click()

  cy.wait (2000)
 
     });

it('Entra em outro perfil Aluno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("0906tes@sharklasers.com");

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

  
 it("Envia os campos do Treinamento", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Terceiro Cenário', { timeout: 60000 })
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
    .type('TESTE CAMPO TERCEIRO 10');

});

        //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_1')
    .clear()
    .type('TESTE CAMPO TERCEIRO 20');

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

     it("Recusa um campo e aceita o outro", () => {

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
cy.get(':nth-child(1) > :nth-child(8) > .btn', { timeout: 20000 })
  .first()
  .click();

  cy.wait(4000)

  //Recusa o segundo documento
cy.get(':nth-child(2) > :nth-child(9) > .btn', { timeout: 10000 })
.click();

  cy.wait(3000)

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
      .click({force:true})

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click({force:true}) 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click({force:true});

   });

    it("Cancela o processo de seleção", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Terceiro Cenário', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click( {force:true})

     //Processo de seleção
      cy.contains('a', 'Processo de seleção', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(3000)


  //Clica em cancelar processo de seleção
 cy.get('button.cancel-process')
  .first()
  .scrollIntoView()
  .click({ force: true });

  cy.wait(4000)


   });

   it('Pesquisa o usuario em não matriculado', () => {

    //Não matruclado
      cy.contains('a', 'Não matriculado', { timeout: 60000 })
  .should('be.visible')
  .click()
        cy.wait(5000)

      //Digita Usuario
      cy.get('input[ng-model="filter.text"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('teste09 teste08', { force: true });

  //Pesquisa
cy.get('course-not-subscribed-users.ng-isolate-scope > [ng-include=""] > .report-filters > :nth-child(1) > .filters-container > .multiselect > form.ng-valid > .btn',{timeout:60000})
  .should('be.visible')
  .click({ force: true });

        cy.wait(5000)

          cy.contains('table tbody tr', 'teste09 teste08', { timeout: 20000 })
    .should('be.visible')

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
      .type("0906tes@sharklasers.com");

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

  
 it("Envia os campos do Treinamento", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Terceiro Cenário', { timeout: 60000 })
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
    .type('TESTE CAMPO TERCEIRO 10');

});

        //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_1')
    .clear()
    .type('TESTE CAMPO TERCEIRO 20');

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

     it("Recusa um campo e aceita o outro", () => {

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
cy.get(':nth-child(1) > :nth-child(8) > .btn', { timeout: 20000 })
  .first()
  .click();

  cy.wait(4000)

  //Aceita o segundo documento
 cy.get(':nth-child(2) > :nth-child(8) > .btn',{timeout:20000})
 .click()

  cy.wait(3000)

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
      .click({force:true})

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click({force:true}) 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click({force:true});

   });

    it("Aceita a solicitação do usuario", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Terceiro Cenário', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true }) 
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click( {force:true})

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
  cy.contains('td', 'teste09 teste08', { timeout: 60000 })
  .should('be.visible');

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
      .type("0906tes@sharklasers.com");

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

      it("Verefica se o botãoe fetuar pagamento está visivel", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Terceiro Cenário', { timeout: 60000 })
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
    cy.get('input[placeholder="Novo campo 04.12"]', { timeout: 60000 })
  .should('have.value', 'TESTE CAMPO TERCEIRO 10');

  //Verefique se está escrito o campo aprovado
    cy.get('input[placeholder="teste 09/12/2025 campo"]', { timeout: 60000 })
  .should('have.value', 'TESTE CAMPO TERCEIRO 20');

  //Clica em Voltar
  cy.get('.showcase-head-2 > .btn')
  .click()

     });


 it("Envia os campos do Quarto Treinamento ", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Quarto Cenário', { timeout: 60000 })
  .scrollIntoView()
  .click()

     //Clica em comprar
       cy.get('.center > div > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em Não Preencher
        cy.get('.pv-5 > .checkbox > .icon-checkbox', {timeout:20000})
        .click()

        cy.wait(1000)
  
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

  //Verefica se aí estás escrito como não preenchido 
  cy.contains('Não preenchido')
  .should('be.visible');

//Aceita o documento
  cy.get('.link-row > :nth-child(7) > .btn', { timeout: 20000 })
  .click()

  cy.wait(2000)
 
  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(6000)

    });

    it("Aba Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click({force:true})

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click({force:true}) 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click({force:true});

   });

    it("Aceita a solicitação do usuario", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Quarto Cenário', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click( {force:true})

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
  cy.contains('td', 'teste09 teste08', { timeout: 60000 })
  .should('be.visible');

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
      .type("0906tes@sharklasers.com");

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

      it("Verefica se o botãoe fetuar pagamento está visivel", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Quarto Cenário', { timeout: 60000 })
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
    cy.get('input[placeholder="teste 09/12/2025 campo"]', { timeout: 60000 })
  .should('have.value', '');

  //Clica em Voltar
  cy.get('.showcase-head-2 > .btn')
  .click()

     });

      it("Envia os campos do Treinamento ", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Quinto Cenário', { timeout: 60000 })
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
    .type('TESTE CAMPO QUINTO CENÁRIO');

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

    it("Envia os campos do outro Treinamento ", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Quinto Cenário - Segundo Texte', { timeout: 60000 })
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
    .type('QUINTO CENÁRIO Segundo Teste');

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

        //Verefica se está desabilidado este campo para edição
            cy.get('input[placeholder="LECTOR20"]', { timeout: 60000 })
  .should('have.attr', 'readonly');

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

     it("Recusa o campo", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(3000)

  //Recusa o documento
cy.get(':nth-child(8) > .btn', { timeout: 20000 })
  .click();

  cy.wait(2000)
 
  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

  cy.wait(6000)

    });

 it('Entra em outro perfil Aluno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("0906tes@sharklasers.com");

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

     it("Envia os campos do Treinamento ", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Quinto Cenário', { timeout: 60000 })
  .scrollIntoView()
  .click()

     //Clica em Reenviar Campos
        cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()

        //Escreve no campo
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('TESTE CAMPO QUINTO CENÁRIO');

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

    it("Verefica se está escrito aguardando aprovação", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Quinto Cenário - Segundo Texte', { timeout: 60000 })
  .scrollIntoView()
  .click()

   //Verefica se o botão de efetuar pagamento aparece
  cy.contains('Aguardando aprovação', { timeout: 60000 })
  .should('be.visible');
   
  cy.wait(2000)

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

        //Verefica se está desabilidado este campo para edição
            cy.get('input[placeholder="LECTOR20"]', { timeout: 60000 })
  .should('have.attr', 'readonly');

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

  cy.get('.link-row > :nth-child(7) > .btn', { timeout: 20000 })
  .click()

  cy.wait(3000)
 
  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

    });

     it("Aba Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click({force:true})

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click({force:true}) 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click({force:true});

   });

    it("Aceita a solicitação do usuario", () => {

      //Clica no Treinamento
  cy.contains('.card-title', 'Quinto Cenário', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click( {force:true})

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
  cy.contains('td', 'teste09 teste08', { timeout: 60000 })
  .should('be.visible');

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

   });

   it('Aceita no segundo Treinamento', () => {

    //Clica na cetgoria
    cy.get('.breadcrumbs-path > :nth-child(7)', {timeout:20000})
    .click({force:true})

     //Clica no Treinamento
  cy.contains('.card-title', 'Quinto Cenário - Segundo Texte', {
  timeout: 60000
})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
  
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click( {force:true})

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
  cy.contains('td', 'teste09 teste08', { timeout: 60000 })
  .should('be.visible');

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
      .type("0906tes@sharklasers.com");

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

      it("Verefica se o botãoe fetuar pagamento está visivel", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Quinto Cenário', { timeout: 60000 })
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

       it("Verefica se botão fetuar pagamento está visivel do outro treinamento", () => {

        //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Quinto Cenário - Segundo Texte', { timeout: 60000 })
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
    cy.get('input[placeholder="LECTOR20"]', { timeout: 60000 })
    .scrollIntoView()
  .should('have.value', 'TESTE CAMPO QUINTO CENÁRIO');
  
  //Clica em Voltar
  cy.get('.showcase-head-2 > .btn')
  .click()

  cy.log('Teste finalizado com sucesso!');

     });

   it('Volta pro perfil Administrador para excluir os treinamentos',()=> {

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

         it("Aba Treinamentos", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click({force:true})

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="45"]',{timeout:60000})
      .should('be.visible')
      .click({force:true}) 

      //Clica na Sub Categoria
      cy.get('[data-nodeid="46"]',{timeout:60000})
      .should('be.visible')
      .click({force:true});

   });

   //Função para excluir treinamento
function excluirTreinamento(nome) {

  //Clica no Treinamento
  cy.contains('.card-title', nome, { timeout: 60000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

  //Clica em editar
  cy.get('.end.ng-scope > .icon-edit', { timeout: 60000 })
    .should('be.visible')
    .click();

  //Clica em Excluir
  cy.get('[name="SaveCourseForm"] > .content-box-footer > .content-box-footer-left > .icon-discard', { timeout: 20000 })
    .scrollIntoView()
    .click();

  //Confirma exclusão
  cy.get('[switch="modal.removeCourse"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent', { timeout: 20000 })
    .click();

  //Valida que foi removido
  cy.contains('.card-title', nome).should('not.exist');
}

//Teste completo
it('Exclui todos os Treinamentos', () => {

  const treinamentos = [
    'Primeiro Cenário',
    'Segundo Cenário',
    'Terceiro Cenário',
    'Quarto Cenário',
    'Quinto Cenário',
    'Quinto Cenário - Segundo Texte'
  ];

  treinamentos.forEach((nome) => {
    excluirTreinamento(nome);

     });

  });

  it('Exclui o campo criado', () => {

      cy.get('[title="Configurações"] > .sideitem')
      .click({force:true});

    cy.wait(2000);

    cy.get('[ui-sref="accessLink.content.configurations.account-subscription.custom-fields"]')
    .click()

   cy.contains('td', 'LECTOR20', { timeout: 60000 })
  .parents('tr')
  .within(() => {
    cy.get('button[ng-click*="showRemoveCustomField"]')
      .scrollIntoView()
      .should('be.visible')
      .click();
  });

  cy.get('.open-content > [ui-view=""] > .modal-overlay > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent')
  .click()

  cy.wait(1000)

  //Salvar
  cy.get('.open-content > .content-box-footer > .btn-swipe-accent')
  .click()

  });

});
