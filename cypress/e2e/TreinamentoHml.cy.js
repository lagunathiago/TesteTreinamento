/// <reference types="cypress" />

describe("Teste - Login", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://hml.lector.live/landing");
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("123");
    cy.get(":nth-child(4) > .btn-swipe-accent").click();

});

  context("Assitindo Treinamento com todos os conteúdos", () => {
    it("Bloqueio de incrição", () => {

     cy.get('[title="Treinamentos"] > .sideitem').click()
     cy.get('[data-nodeid="1"]').click()
     cy.get(':nth-child(1) > .card-items > .between > .flex > .btn-transparent').click()
     

     cy.wait(15000) //Espera alguns segundos para digitar um nome e a data
     cy.get('.new-block > .btn-swipe-accent').click() //Clica em novo bloqueio
     cy.contains('button', /^Salvar$/i, { timeout: 10000 })
       .should('be.visible')
       .click({ force: true });
     cy.wait(3000)

     cy.get('.card-items').click()
     cy.wait(2000)
     cy.contains('Inscrição bloqueada') //Verifica se a incrição no treinamento realmente está bloqueda 

     cy.get('.end.ng-scope > .icon-edit').click() // Clica em editar
     cy.get('[ui-sref="accessLink.content.courses.edit.id.subscription-block"]').click() 
     cy.get('button.btn.icon-discard').first().click(); //Clica na lixeira do primeiro nome da lista de bloqueio de incrição


     cy.contains('button', /^Salvar$/i, { timeout: 10000 })
       .should('be.visible')
       .click({ force: true });
    
     cy.get('.card-items').click()
     cy.contains('Fazer inscrição') //Verifica se é possivel fazer a incrição
     
    });

    //  Aqui vai o seu segundo teste
    it.only("Assistir todos os conteúdos", () => {
    
    cy.wait(5000)
    cy.contains('div', 'Thiago').click();
    cy.contains('div.option.menu-option', 'Selecionar perfil').click();
    cy.get('.user-options-items > :nth-child(1) > ng-transclude').click();
    cy.wait(5000);

// Clica no primeiro treinamento
cy.get('[ng-init="course = content.entity"] > .card > .card-items').click();

// Aguarda a página carregar
cy.wait(5000);

// Verifica qual botão está disponível e clica no correto
cy.get('body').then(($body) => {
  const btnInscricao = $body.find('button:contains("Fazer inscrição"):visible');
  
  if (btnInscricao.length) {
    cy.log('Botão "Fazer inscrição" encontrado — clicando...');
    cy.wrap(btnInscricao.first()).click({ force: true });
  } else {
    cy.log('Botão "Fazer inscrição" não encontrado — clicando em "Acessar"...');
    cy.contains('button', /^Acessar$/i, { timeout: 20000 })
      .click({ force: true });
  }
});
 
cy.get('#hideResource')
  .should('be.visible')
  .click({ force: true });// Volta para o documento

cy.get(':nth-child(1) > :nth-child(7) > .txt-end > .ng-binding').contains('100.00%')//Verifica se a porcentagem está em 100%

cy.get(':nth-child(5) > [style="padding-left: 5px;"]').click() //Clica na avaliação






 
    });
  });
});