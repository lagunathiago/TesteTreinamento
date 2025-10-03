Cypress.on("uncaught:exception", () => false);

describe("Teste Vitrine, Visão do aluno", () => {
  it("Login", () => {
    cy.visit("https://hml.lector.live/landing");

    // exemplo tela grande tipo notebook full HD
    cy.viewport(1920, 1080);
    // Login
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine [type="text"]').type("cypress@lectortec.com.br");
    cy.get("ng-transclude > .border").type("2006lrnrgr");
    cy.get(":nth-child(4) > .btn-swipe-accent").click();

    // Aguarda a página carregar após o login
    cy.wait(5000); // espera fixa de 5 segundos (ajuste se precisar)

    // Vai para a trilha
    cy.get('[ng-init="trail = content.entity"] > .card > .card-items').click();

    // Faz a inscrição da Trilha (apenas se o botão existir)
    cy.get("body").then(($body) => {
      const temInscrever = $body.find('.default-gap button.btn-swipe-accent:contains("Inscrever"):visible').length > 0;

      if (temInscrever) {
        cy.contains('.default-gap button.btn-swipe-accent', 'Inscrever')
          .scrollIntoView()
          .should("be.visible")
          .click();
      } else {
        cy.log('⏭️ Já está inscrito (botão "Inscrever" não encontrado). Seguindo…');
      }
    });


//Clica em acessar avaliação
cy.get(':nth-child(2) > :nth-child(6) > .pv-5 > .btn-swipe-accent').click()

//Entrei na primeira alternativa e escolhi a opçao 1
cy.get(':nth-child(2) > :nth-child(2) > .associative-answer').click()
cy.get('.open > .ui-select-choices > :nth-child(1)').click()
cy.wait(1000)

//Entrei na segunda alternativa e escolhi a opçao 2
cy.get(':nth-child(3) > :nth-child(2) > .associative-answer').click()
cy.get('.open > .ui-select-choices > :nth-child(2)').click()
cy.wait(1000)

//Entrei na terceira alternativa e escolhi a opçao 4
cy.get(':nth-child(4) > :nth-child(2) > .associative-answer').click()
cy.get('.open > .ui-select-choices > :nth-child(4)').click()
cy.wait(1000)

//Entrei na quarta alternativa e escolhi a opçao 3
cy.get(':nth-child(5) > :nth-child(2) > .associative-answer').click()
cy.get('.open > .ui-select-choices > :nth-child(3)').click()
cy.wait(1000)

//Escrevi um texto na segunda alternativa
cy.get('.discursive').type('Teste Lector');

//Terceira alternativa escolhi a opção 1
cy.get('.alternatives-grid-box > :nth-child(1) > :nth-child(1) > .checkbox > .icon-radio').click()


//Quinta alternativa escolhi as opção de verdadeiro e falso
cy.get('tbody > :nth-child(2) > :nth-child(1) > .checkbox').click()       //verdadeiro
cy.get(':nth-child(3) > :nth-child(2) > .checkbox > .icon-radio').click() //falso
cy.get(':nth-child(4) > :nth-child(1) > .checkbox').click()               //verdadeiro
cy.get(':nth-child(5) > :nth-child(2) > .checkbox > .icon-radio').click() //falso

//Clicar no botão enviar resposta
cy.get('.evaluation-actions > .end > .btn-swipe-accent').click()

//Clica em sim
cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent').click()
 
//Clica em voltar
cy.get('button[ng-click="closeEvaluation()"]', { timeout: 10000 })
  .filter(':visible')
  .first()
  .scrollIntoView()
  .should('be.enabled')     // garante que está clicável
  .click({ force: true });

// Acessa o DOCUMENTO correto
cy.contains('tr', /apostila sobre investimentos/i, { timeout: 30000 })
  .scrollIntoView()
.within(() => {
    cy.get('button[ng-click="accessContent(content);"]:visible', { timeout: 10000 })
      .should('be.enabled')
      .click({ force: true });  // força o clique caso tenha overlay/scroll
      
      //Clica em voltar
cy.contains('button', /^Voltar$/i, { timeout: 10000 })
  .filter('.hide-resource')
  .click({ force: true });



}); 

});
});
