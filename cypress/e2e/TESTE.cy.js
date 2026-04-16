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

});