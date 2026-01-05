/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('unselectable')) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
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

  context("Teste Categoria", () => {
    
    it("Nova Categoria", () => {
      // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

      // Clica em adicionar categoria
      cy.get('.node-selected > .tree-icons > .icon-add', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Escreve
  cy.get('input[placeholder="Nova categoria"]', { timeout: 60000 })
  .filter(':visible')
  .first()
  .should('not.be.disabled')
  .focus()
  .clear({ force: true })
  .type('0Categoria Aut', { delay: 30, force: true })
  .should('have.value', '0Categoria Aut');

 cy.wait(1000)
  //Confirma
cy.get('[switch="modal.createCategory"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent', { timeout: 60000 }).click();

    });

    it("Sub categoria", () => {

        cy.get('[data-nodeid="3"] > .tree-icons > .icon-add', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Escreve
  cy.get('input[placeholder="Nova categoria"]', { timeout: 60000 })
  .filter(':visible')
  .first()
  .should('not.be.disabled')
  .focus()
  .clear({ force: true })
  .type('Sub Automação', { delay: 30, force: true })
  .should('have.value', 'Sub Automação');

   cy.wait(1000)
  //Confirma
cy.get('[switch="modal.createCategory"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();
  
     });
     
it('Veincular treinamento em uma categoria', () => {

  // Manualmente clique em um treinamento
cy.log("Clique em um treinamento")
cy.wait(8000)

  //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout: 60000}).click()
 
  cy.log('Adicione na categoria')
  cy.wait(10000)

  //clica em salvar
  cy.contains('button.btn-swipe-accent', 'Salvar', { timeout: 60000 })
  .should('be.visible')
  .click();

     });

it('Edite a categoria', () => {
        
        cy.log("Clique em editar")
        cy.wait(10000)

        cy.log("Edite a categoria")
        cy.wait(6000)

  //Confirma
  cy.get('[ng-if="permissions.configPermissions.editCategories || editingCategory.editPermitted.permitted || (editingCategory.createPermitted.permitted && !editingCategory.id)"]').click()

     });

     it('Compartilhar por portal', () => {

        //Clica na categoria
cy.log("Clique em editar")
        cy.wait(5000)

        cy.contains('a', 'Compartilhamento', { timeout: 60000 })
  .should('be.visible')
  .click();
 
  //Clica em adicionar
  cy.get('.pv-20 > .btn-swipe-accent').click()

   //Clica em outros portais
  cy.get('.mb-10.ng-scope > :nth-child(2) > .icon-radio').click()
  
  //Clica em selecionar
  cy.get('[ng-if="!useAssociatePortalsList.value"] > .multiselect > .border > .ui-select-match > .btn-default').click()
  
 cy.log("Escolha o portal")
 cy.wait(3000)

  //Confirma
  cy.get('[ng-if="permissions.configPermissions.editCategories || editingCategory.editPermitted.permitted || (editingCategory.createPermitted.permitted && !editingCategory.id)"]').click()

     });

          it('Excluir categoria', () => {

        cy.log("Clique em editar")
        cy.wait(5000)

      
        cy.contains('a', 'Compartilhamento', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Exclui a compartilhamento
  cy.get('.btn > .icon-discard').click()

  cy.wait(2000)

 //Exclui categoria
  cy.get('.content-box-footer-left > .btn-swipe-accent').click()
  cy.wait(2000)

  cy.get('[switch="modal.showRemoveCategory"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent').click()
  
    });
  });
});
