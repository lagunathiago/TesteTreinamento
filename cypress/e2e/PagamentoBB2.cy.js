/// <reference types="cypress" />

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("qualidade2@lectortec.com.br");
    cy.get("ng-transclude > .border").type("2006lrnrgr");
    cy.get('#btn-entrar').click();

});

  context("Teste Compra BB", () => {
    it("Login", () => {
        
        //clicar em carrosel
        cy.get(':nth-child(6) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .click({ force: true });
      
    });
/*
    it("Turma paga á vista sem aprovação", () => {

      cy.wait(2000)
        //Clica no treinamento Turma paga á vista sem aprovação
        cy.get(':nth-child(1) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container').click()


        /*
        //Confirma o valor de 3.91 do botão
        cy.contains('button', '3.91').should('be.visible');
       
        //Clique para comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent').click()

        //Espera alguns segundos para visualizar o boleto
        cy.log('CONFIRA SE AS INFORMAÇÕES DO BOLETO ESTÃO CERTA')
        cy.wait(15000)


  //Fecha boleto
  cy.get('#modal-paymentBB > .ng-pristine > modal-header > div > .btn').click()
  
  //Clica em minha area
  cy.get('#user-options-btn > .icon-profile').click()
  cy.wait(2000)
  cy.get('#user-home-tab > ng-transclude > .icon-pointer-right').click()
  cy.wait(2000)
  cy.get(':nth-child(6) > ng-transclude').click()

  //Digite o nome do seu treinamento
  cy.log('DIGITE O NOME DO TREINAMENTO E VISUALIZE SE AS INFORMAÇOES DO PAGAMENTO ESTÃO CERTA')
  cy.wait(30000)

     });

     it("Turma paga 2x sem aprovação", () => {

      cy.wait(2000)

      //Volta
      cy.get('.showcase-head-2 > .btn').click()

      //clicar em carrosel
        cy.get(':nth-child(6) > .carousel-container > .showcase-title-container > .middle > .show-all',{ timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .click({ force: true });



        //Clica no treinamento Turma paga á 2x vista sem aprovação
        cy.get(':nth-child(3) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container').click()
        
        /*
        //Confirma o valor de 7.92 do botão
        cy.contains('button', '7.82').should('be.visible');
       
        //Clique para comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent').click()

        //Espera alguns segundos para visualizar o boleto
        cy.log('CONFIRA SE AS INFORMAÇÕES DO BOLETO ESTÃO CERTA')
        cy.wait(15000)


  //Fecha boleto
  cy.get('#modal-paymentBB > .ng-pristine > modal-header > div > .btn').click()
  
  //Clica em minha area
  
  cy.get('#user-options-btn > .icon-profile').click()
  cy.wait(2000)
  
  cy.get(':nth-child(6) > ng-transclude > .ng-binding').click()

  //Digite o nome do seu treinamento
  cy.log('DIGITE O NOME DO TREINAMENTO E VISUALIZE SE AS INFORMAÇOES DO PAGAMENTO ESTÃO CERTA')
  cy.wait(30000)


     });

     it("Turma paga 5x sem aprovação", () => {

      cy.wait(2000)
      
      //Volta
      cy.get('.showcase-head-2 > .btn').click()
      
        //Clica no treinamento Turma paga 5x sem aprovação
        cy.get(':nth-child(5) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container').click()

        //Confirma o valor de 19.55 do botão
        cy.contains('button', '19.55').should('be.visible');
       
        //Clique para comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent').click()

        //Espera alguns segundos para visualizar o boleto
        cy.log('CONFIRA SE AS INFORMAÇÕES DO BOLETO ESTÃO CERTA')
        cy.wait(15000)


  //Fecha boleto
  cy.get('#modal-paymentBB > .ng-pristine > modal-header > div > .btn').click()
  
  //Clica em minha area
  cy.get('#user-options-btn > .icon-profile').click()
  cy.wait(2000)
  cy.get('#user-home-tab > ng-transclude > .icon-pointer-right').click()
  cy.wait(2000)
  cy.get(':nth-child(6) > ng-transclude > .ng-binding').click()

  //Digite o nome do seu treinamento
  cy.log('DIGITE O NOME DO TREINAMENTO E VISUALIZE SE AS INFORMAÇOES DO PAGAMENTO ESTÃO CERTA')
  cy.wait(30000)

      });
*/
      it("Turma paga á vista com aprovação", () => {

      cy.wait(2000)
      /*
      //Volta
      cy.get('.showcase-head-2 > .btn').click()
      */

        //Clica no treinamento Turma paga 5x com aprovação
        cy.get(':nth-child(2) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container').click()

        //Confirma o valor de 3.91 do botão
        cy.contains('button', '3.91').should('be.visible');
       
        //Clique para comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent').click()

        //Confirma que o botão esteja escrito 'Aguardando Aprovação
        cy.get('.btn-swipe-accent', { timeout: 20000 })
  .should('contain.text', 'Aguardando aprovação');
        
        //Clica em minha area
  cy.get('#user-options-btn > .icon-profile').click()
  cy.wait(2000)
       
        


     


      });
   });
});