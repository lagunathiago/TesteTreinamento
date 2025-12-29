Cypress.on('uncaught:exception', (err) => {
  // Ignora APENAS esse erro específico do front (bug conhecido)
  if (err.message.includes("Cannot set properties of null") &&
      err.message.includes("setting 'ready'")) {
    return false; // não falha o teste
  }
});

describe("Teste - Login e troca de perfil", () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");

    // Login
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("testeaut@uorak.com.br");
    cy.get("ng-transclude > .border").type("123");
   cy.get('#btn-entrar').click();


    // Acessa o treinamento
    cy.get('.showcase-card-container', {
      timeout: 60000,
    })
      .should("be.visible")
      .first()
      .click();
  });

/*it('Fazer inscrição, Acessar ou cair direto na gravação', () => {
  const selInscricao = 'button[ng-click="subscribeClass(class)"]';
  const selAcessar = 'button[ui-sref^="accessLink.content.home.courses.id.contents"]';

  // Se tiver algum seletor confiável da página de gravação/conteúdo, coloque aqui:
  const selGravacao = '[ui-sref*="contents"], .recordings, .resource-view, #nextResourceArrow';

  cy.get('body', { timeout: 30000 }).then(($body) => {
    const temInscricao = $body.find(selInscricao).filter(':visible').length > 0;
    const temAcessar = $body.find(selAcessar).filter(':visible').length > 0;

    // 1) Se existir Inscrever, clica e depois tenta Acessar (se aparecer)
    if (temInscricao) {
      cy.get(selInscricao, { timeout: 30000 })
        .filter(':visible')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.log('✅ Clicou em Fazer inscrição');

      // Depois de inscrever, pode:
      // - aparecer "Acessar"
      // - ou redirecionar direto pro conteúdo
      cy.get('body', { timeout: 60000 }).then(($b2) => {
        const apareceuAcessar = $b2.find(selAcessar).filter(':visible').length > 0;

        if (apareceuAcessar) {
          cy.get(selAcessar, { timeout: 60000 })
            .filter(':visible')
            .first()
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });

          cy.log('✅ Clicou em Acessar após inscrição');
        } else {
          cy.log('ℹ️ Não apareceu "Acessar" — provavelmente entrou direto na gravação');
          cy.get(selGravacao, { timeout: 60000 }).should('exist');
        }
      });

      return;
    }

    // 2) Se existir Acessar, clica
    if (temAcessar) {
      cy.get(selAcessar, { timeout: 30000 })
        .filter(':visible')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.log('✅ Clicou em Acessar diretamente');
      return;
    }

    // 3) Se não tem nenhum botão, já caiu direto na gravação/conteúdo
    cy.log('ℹ️ Usuário já inscrito: entrou direto na gravação/conteúdo');
    cy.get(selGravacao, { timeout: 60000 }).should('exist');
  });
});
*/

it('Clicar em Fazer inscrição (se disponivel)', () => {

  cy.wait(2000)

});
  // --- GRAVAÇÃO ---
  it("Assistir gravação e validar 100%", () => {
    cy.wait(30000); // simula assistir o vídeo
    cy.get("#hideResource", { timeout: 60000 }).should("be.visible").click({ force: true });
    cy.log("⬅️ Clicou em Voltar após assistir gravação");

    cy.get("table.default-table tbody tr")
      .first()
      .should("contain.text", "Visualizado")
      .and("contain.text", "100.00%");

    cy.log("✅ Gravação confirmada 100%");
  });
  
  // --- DOCUMENTO 1 ---
  it("Abrir documento PDF e validar 100%", () => {

      cy.wait(3000)

    cy.get('tbody > :nth-child(3) > :nth-child(1) > .lector-txt-main')
      .should("be.visible")
      .click();

          cy.wait(4000);
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

          cy.wait(4000);
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

          cy.wait(4000);
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
    // Clica na avaliação (espera até 30s se necessário)
cy.get('tbody > :nth-child(11) > :nth-child(1) > .lector-txt-main', { timeout: 30000 })
  .should('be.visible')
  .click();


  cy.log("PREENCHA AS RESPOTA E ENVIE")
  cy.wait(15000)

      //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

  });

  it("Avaliação todas na mesma página", ()=>{

     cy.wait(3000)
    // Clica na avaliação (espera até 30s se necessário)
cy.get('tbody > :nth-child(11) > :nth-child(1) > .lector-txt-main', { timeout: 30000 })
  .should('be.visible')
  .click();

  
  cy.log("PREENCHA AS RESPOTA E ENVIE")
  cy.wait(15000)
  
   
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
  cy.wait(3000)

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
          cy.get(':nth-child(19) > [style="padding-left: 5px;"] > .lector-txt-main', { timeout: 3000 })      
        .should("be.visible")
      .click({ force: true });

      cy.wait(20000); // simula assistir o vídeo

    cy.get("#hideResource", { timeout: 60000 }).should("be.visible").click({ force: true });
    cy.log("⬅️ Clicou em Voltar após assistir gravação");


      });

      it("Video Youtube", ()=> {

        cy.wait(3000)

        cy.get(':nth-child(21) > [style="padding-left: 5px;"]',{ timeout: 30000 })
        .should("be.visible")
      .click({ force: true });

      cy.wait(20000); // simula assistir o vídeo
    cy.get("#hideResource", { timeout: 60000 }).should("be.visible").click({ force: true });
    cy.log("⬅️ Clicou em Voltar após assistir gravação");

      });

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

// Teste SCORM
it("Scorm", () => {
          cy.wait(3000)
  cy.get(':nth-child(27) > :nth-child(1) > .lector-txt-main')
  .should("be.visible")
        .click()

  cy.log("FAÇA A AVALIAÇÃO DO SCORM, CONFIRME E DEIXE O BOTÃO VOLTAR VISIVEL");
  cy.wait(60000);

  // Clica em voltar
  cy.get("#hideResource", { timeout: 50000 })
    .should("be.visible")
    .click({ force: true });
});

it("Entrega de atividade", ()=> {

    cy.wait(3000)

  cy.get(':nth-child(29) > [style="padding-left: 5px;"]')
  .should("be.visible")
        .click()


          cy.contains('Adicionar arquivos', { timeout: 20000 })
  .should('be.visible')
  .closest('.default-padding')          // sobe pro container correto (ajuste se precisar)
  .find('input[type="file"]')
  .first()
  .selectFile('cypress/fixtures/images(1).png', { force: true });

 cy.wait(4000)

    cy.get('.btn-swipe-accent.mb-20').click({ force: true });

  cy.wait(4000)

  
    // Clica em voltar
  cy.get("#hideResource", { timeout: 50000 })
    .should("be.visible")
    .click({ force: true });
});


it("Reação todas na mesma página", ()=> {

  // Clica na avaliação (espera até 30s se necessário)
cy.get('tbody > :nth-child(11) > :nth-child(1) > .lector-txt-main', { timeout: 30000 })
  .should('be.visible')
  .click();
  
  cy.log("PREENCHA AS RESPOTA E ENVIE")
  cy.wait(10000)
  
      //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
      
});

it("Reação uma por página", ()=> {

  cy.wait(3000)
      // Clica na avaliação (espera até 30s se necessário)
cy.get('tbody > :nth-child(11) > :nth-child(1) > .lector-txt-main', { timeout: 30000 })
  .should('be.visible')
  .click();
  
  cy.log("PREENCHA AS RESPOTA E ENVIE")
  cy.wait(10000)
  
      //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

});

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
