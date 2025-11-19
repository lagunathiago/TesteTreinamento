
describe("Teste - Login e troca de perfil", () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://hml.lector.live/landing");

    // Login
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("123");
    cy.get(":nth-child(4) > .btn-swipe-accent").click();

    // Acessa o treinamento
    cy.get('[ng-init="course = content.entity"] > .card > .card-items', {
      timeout: 60000,
    })
      .should("be.visible")
      .first()
      .click();

    // Decide entre "Fazer inscrição" ou "Acessar"
    cy.get("body", { timeout: 30000 }).then(($body) => {
      const botaoInscricao = '[ng-click="subscribeClass(class);"]';
      const botaoAcessar = ".classes-actions > .btn-swipe-accent.ng-scope";

      if ($body.find(botaoInscricao).length > 0) {
        cy.get(botaoInscricao).should("be.visible").click();
        cy.log("✅ Clicou em Fazer inscrição");

        cy.get(botaoAcessar, { timeout: 30000 })
          .should("be.visible")
          .click();
        cy.log("✅ Clicou em Acessar após inscrição");
      } else if ($body.find(botaoAcessar).length > 0) {
        cy.get(botaoAcessar).should("be.visible").click();
        cy.log("✅ Clicou em Acessar diretamente");
      } else {
        cy.log("⚠️ Nenhum botão encontrado.");
      }
    });
  });

  // --- GRAVAÇÃO ---
  it("Assistir gravação e validar 100%", () => {
    cy.wait(24000); // simula assistir o vídeo
    cy.get("#hideResource", { timeout: 60000 }).should("be.visible").click({ force: true });
    cy.log("⬅️ Clicou em Voltar após assistir gravação");

    cy.get("table.default-table tbody tr")
      .first()
      .should("contain.text", "Visualizado")
      .and("contain.text", "100.00%");

    cy.log("✅ Gravação confirmada 100%");
  });
  /*

  // --- DOCUMENTO 1 ---
  it("Abrir documento PDF e validar 100%", () => {
    cy.get('tbody > :nth-child(3) > :nth-child(1) > .lector-txt-main')
      .should("be.visible")
      .click();

    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 1 aberto e retornado com sucesso");
  });

  // --- DOCUMENTO 2 ---
  it("Abrir documento XLSX e validar 100%", () => {
    cy.get('tbody > :nth-child(5) > :nth-child(1) > .lector-txt-main')
      .should("be.visible")
      .click();

    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 2 aberto e retornado com sucesso");
  });

  // --- DOCUMENTO 3 ---
  it("Abrir documento pptx e validar 100%", () => {
    cy.get('tbody > :nth-child(7) > :nth-child(1) > .lector-txt-main')
      .should("be.visible")
      .click();

    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 3 aberto e retornado com sucesso");
  });

  // --- DOCUMENTO 4 ---
  it("Abrir documento pptx e validar 100%", () => {
    cy.get('tbody > :nth-child(9) > :nth-child(1) > .lector-txt-main')
      .should("be.visible")
      .click();

    cy.wait(4000);
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 4 aberto e retornado com sucesso");

  });  

 
   it('Avaliação uma por pagina', ()=>{
    //Clica na avaliação
    cy.get('tbody > :nth-child(11) > :nth-child(1) > .lector-txt-main')
      .should("be.visible")
      .click();

      //Clica em iniciar avaliação
      cy.get('.default-gap > .btn-swipe-accent')
      .should("be.visible")
      .click();

      //Espera 10 segundo 
      cy.log('Responda as avaliações ')
      cy.wait(10000)

      //Clica em enviar resposta
      cy.get('#nextResourceArrow')
      .should("be.visible")
      .click();

      //Clica em confirmar envio de resposta
      cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
      .should("be.visible")
      .click();
    
      //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

  });

  it("Avaliação todas na mesma página", ()=>{
    cy.wait(3000)
    //Clica na avaliação todas na mesma página
    cy.get('tbody > :nth-child(13) > :nth-child(1) > .lector-txt-main')
    .should("be.visible")
    .click()

    //Clica em iniciar avaliação
      cy.get('.default-gap > .btn-swipe-accent')
      .should("be.visible")
      .click();

      //Espera 10 segundo 
      cy.log('Responda as avaliações ')
      cy.wait(10000)

      //Clica em enviar resposta
      cy.get('#nextResourceArrow')
      .should("be.visible")
      .click();

      //Clica em confirmar envio de resposta
      cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
      .should("be.visible")
      .click();
    
      //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
        
      });
  

      it("Aula Presencial", ()=> {
        cy.wait(3000)
        //Clica na aula presencial
        cy.get('tbody > :nth-child(15) > :nth-child(1) > .lector-txt-main')
        .should("be.visible")
        .click()

        cy.wait(2000)
        // Valida se o título "Aula Presencial" está visível na página
cy.get('h2.ng-binding', { timeout: 30000 })
  .should('be.visible')
  .and('contain.text', 'Aula Presencial');


       //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

      });

      it("Direcionamento para Webconferencia", () => {

  // Ignora o erro específico que a aplicação dispara ao abrir a Webconferência
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes("reading '@class'")) {
      // retorna false para o Cypress NÃO falhar o teste
      return false;
    }
    // outros erros continuam quebrando o teste
  });

  cy.get('tbody > :nth-child(17) > :nth-child(1) > .lector-txt-main')
    .should("be.visible")
    .click();

  cy.wait(6000);

  //Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });

      });

      it("Vídeo Lector", ()=> {
                cy.wait(3000)
        cy.get(':nth-child(19) > :nth-child(1) > .lector-txt-main')
        .should("be.visible")
      .click({ force: true });

      cy.wait(19000); // simula assistir o vídeo
    cy.get("#hideResource", { timeout: 60000 }).should("be.visible").click({ force: true });
    cy.log("⬅️ Clicou em Voltar após assistir gravação");


      });

      it("Video Youtube", ()=> {
        cy.wait(3000)
        cy.get(':nth-child(21) > :nth-child(1) > .lector-txt-main').click()
        .should("be.visible")
      .click({ force: true });

      cy.wait(15000); // simula assistir o vídeo
    cy.get("#hideResource", { timeout: 60000 }).should("be.visible").click({ force: true });
    cy.log("⬅️ Clicou em Voltar após assistir gravação");

      });
      */

      it("Topico ", ()=> {

        cy.get(':nth-child(25) > :nth-child(1) > .lector-txt-main')
        .should("be.visible")
      .click({ force: true });

      cy.wait(2000)

      //Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });
                
      });

      // Ignora erros do player SCORM que não afetam o teste
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("@class") || err.message.includes("ready")) {
    return false; // impede que o teste falhe por causa desses erros
  }
});
/*
// Teste SCORM
it("Scorm", () => {
  cy.get(':nth-child(27) > :nth-child(1) > .lector-txt-main')
  .should("be.visible")
        .click()

  cy.log("FAÇA A AVALIAÇÃO DO SCORM, CONFIRME E DEIXE O BOTÃO VOLTAR VISIVEL");
  cy.wait(20000);

  // Clica em voltar
  cy.get("#hideResource", { timeout: 50000 })
    .should("be.visible")
    .click({ force: true });
});

it("Entrega de atividade", ()=> {
  cy.get(':nth-child(29) > :nth-child(1) > .lector-txt-main')
  .should("be.visible")
        .click()

  cy.contains('label', 'Adicionar arquivos')
    .parent()                        // sobe um nível
    .find('input[type="file"]')      // acha o input file
    .selectFile('cypress/fixtures/images(1).png', { force: true });  

      cy.wait(2000)


    cy.get('.btn-swipe-accent.mb-20').click({ force: true });
  
    // Clica em voltar
  cy.get("#hideResource", { timeout: 50000 })
    .should("be.visible")
    .click({ force: true });
});


it("Reação todas na mesma página", ()=> {
      cy.wait(3000)
  cy.get(':nth-child(31) > :nth-child(1) > .lector-txt-main')
  .should("be.visible")
        .click()

         //Clica em iniciar avaliação
      cy.get('.default-gap > .btn-swipe-accent')
      .should("be.visible")
      .click();

      //Espera 15 segundo 
      cy.log('Responda as avaliações ')
      cy.wait(15000)

      //Clica em enviar resposta
      cy.get('#nextResourceArrow')
      .should("be.visible")
      .click();

      //Clica em confirmar envio de resposta
      cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
      .should("be.visible")
      .click();
    
      //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
});

it("Reação uma por página", ()=> {
      cy.wait(3000)
  cy.get(':nth-child(33) > :nth-child(1) > .lector-txt-main')
  .should("be.visible")
        .click()

        cy.wait(3000)
        //Clica em iniciar avaliação
      cy.get('.live-event-resource-message > .default-gap > .btn-swipe-accent')
      .should("be.visible")
      .click();

      //Espera 15 segundo 
      cy.log('Responda as avaliações ')
      cy.wait(15000)

      //Clica em enviar resposta
      cy.get('#nextResourceArrow')
      .should("be.visible")
      .click();

      //Clica em confirmar envio de resposta
      cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
      .should("be.visible")
      .click();
    
      //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

});
*/

it("Concluir treinamento", ()=> {
  cy.get('.header > .btn-swipe-accent')
  .should("be.visible")
        .click()

        cy.wait(5000)
        cy.get('[switch="modal.finishCourse"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent')
        .should("be.visible")
        .click()
        
        cy.log("gerando certificado")
        cy.wait(8000)



});



});
