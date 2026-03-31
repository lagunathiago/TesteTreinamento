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

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.viewport(1920, 1080);

    cy.contains("button", "Entrar", { timeout: 60000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .scrollIntoView()
      .should("be.visible")
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .scrollIntoView()
      .should("be.visible")
      .type("2006lrnrgr");

    cy.get("#btn-entrar", { timeout: 60000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

  context("Vai para a categoria", { testIsolation: false }, () => {
    
     it("Clica na aba treinamento", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()


     });

     /*
      it('Cria uma categoria', () => {
        
        //Cria uma categoria
        cy.get('[data-nodeid="0"] > .tree-icons > .icon-add',{timeout:60000})
        .click()

         //Escreve
  cy.get('input[placeholder="Nova categoria"]', { timeout: 60000 })
  .filter(':visible')
  .first()
  .should('not.be.disabled')
  .focus()
  .clear({ force: true })
  .type('000Permissão', { delay: 30, force: true })
  .should('have.value', '000Permissão');

cy.get('[switch="modal.createCategory"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent', { timeout: 60000 }).click();

    });
*/
    it('Adicionar a permissao Acessar', () => {

        cy.contains('li.list-group-item', '000Permissão', { timeout: 60000 })
  .should('be.visible')
  .within(() => {
    cy.get('.icon-edit').click({ force: true })
  })

  //Clica em Permissão
  cy.get('[ng-class="{\'tab-active\':permissionTabs.value == 2}"]')
  .click()

  cy.get('.form-row > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
  .type('Gestor')

  cy.wait(1000)

  //Clica em gestor
  cy.contains('.ui-select-choices-row-inner', 'Gestor', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

//clica em ação
cy.get('.form-row > .permission-select > [ng-show="actions != null"] > .multiselect > .border > .ui-select-match > .btn-default')
.click()

 cy.wait(1000)

  //Clica em acessar
  cy.contains('.ui-select-choices-row-inner', 'Acessar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
 
  cy.wait(1000)

  //clica em adicionar
  cy.get('.form-row > .permission-select > .middle > .btn-swipe-accent')
  .click()
        
    });

 it('Adicioanr a permissao Editar', () => {

      cy.wait(1000)

  cy.get('.form-row > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
  .type('Gestor')

  cy.wait(1000)

  //Clica em gestor
  cy.contains('.ui-select-choices-row-inner', 'Gestor', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

//clica em ação
cy.get('.form-row > .permission-select > [ng-show="actions != null"] > .multiselect > .border > .ui-select-match > .btn-default')
.click()

 cy.wait(1000)

  //Clica em acessar
  cy.contains('.ui-select-choices-row-inner', 'Editar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
 
  cy.wait(1000)

  //clica em adicionar
  cy.get('.form-row > .permission-select > .middle > .btn-swipe-accent')
  .click()

    cy.wait(1000)

        
    });


     it('Adicioanr a permissao Exxcluir', () => {

              cy.wait(1000)

  cy.get('.form-row > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
  .type('Gestor')

  cy.wait(1000)

  //Clica em gestor
  cy.contains('.ui-select-choices-row-inner', 'Gestor', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

//clica em ação
cy.get('.form-row > .permission-select > [ng-show="actions != null"] > .multiselect > .border > .ui-select-match > .btn-default')
.click()

 cy.wait(1000)

  //Clica em acessar
  cy.contains('.ui-select-choices-row-inner', 'Excluir', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
 
  cy.wait(1000)

  //clica em adicionar
  cy.get('.form-row > .permission-select > .middle > .btn-swipe-accent')
  .click()

  cy.wait(1000)
        
    });


     it('Adicioanr a permissao Criar', () => {

              cy.wait(1000)

  cy.get('.form-row > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
  .type('Gestor')

  cy.wait(1000)

  //Clica em gestor
  cy.contains('.ui-select-choices-row-inner', 'Gestor', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

//clica em ação
cy.get('.form-row > .permission-select > [ng-show="actions != null"] > .multiselect > .border > .ui-select-match > .btn-default')
.click()

 cy.wait(1000)

  //Clica em acessar
  cy.contains('.ui-select-choices-row-inner', 'Criar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })
 
  cy.wait(1000)

  //clica em adicionar
  cy.get('.form-row > .permission-select > .middle > .btn-swipe-accent')
  .click()

  //Salva
  cy.get('[ng-if="permissions.configPermissions.editCategories || editingCategory.editPermitted.permitted || (editingCategory.createPermitted.permitted && !editingCategory.id)"]')
  .click()

    });

  });
  
});