Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  // Erros conhecidos do Angular / Front que não devem quebrar o teste
  if (
    msg.includes('Cannot read properties of null') ||
    msg.includes('Cannot read properties of undefined') ||   // ✅ novo
    msg.includes("reading 'then'") ||                         // ✅ novo
    msg.includes('charAt') ||
    msg.includes('writeText') ||
    msg.includes('Clipboard') ||
    msg.includes('Document is not focused')
  ) {
    return false;
  }
});


describe("Teste - Login e troca de perfil", () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");

   

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

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

context("Assitir Treinamento", { testIsolation: false }, () => {
  /*
   it('Vai até a vitrine', () => {

        //Clica em conteúdos
        cy.get('.active > .ng-binding',{timeout:60000})
        .should('be.visible')
        .click()

        //Vai até a vitrine
        cy.get('.showcase-navigation-menu > :nth-child(2) > .showcase-menu-name',{timeout:60000})
        .should('be.visible')
        .click()

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all')
        .last()
        .should('be.visible')
        .click()

    });

  it('Clica no treinamento ', ()=> {

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

    })

  it("Clicar em Fazer inscrição (se disponivel)", () => {
    cy.pause()

  });

  // --- GRAVAÇÃO ---
  it("Assistir gravação e validar 100%", () => {

    cy.log('ASSISTE A GRAVAÇÃO COMPLETA')
    cy.pause()
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
    cy.log("⬅️ Clicou em Voltar após assistir gravação");

    cy.get("table.default-table tbody tr")
      .first()
      .should("contain.text", "Visualizado")
      .and("contain.text", "100.00%");

    cy.log("✅ Gravação confirmada 100%");
  });


  // --- DOCUMENTO 1 ---
  it("Abrir documento PDF e validar 100%", () => {
    cy.wait(3000);

    //
    cy.get("tbody > :nth-child(3) > :nth-child(1) > .lector-txt-main")
      .should("be.visible")
      .click();

      //clica na listagem
      cy.get('#courseResourceMenuIndicator', { timeout: 60000 })
  .scrollIntoView({ block: 'center' })
  .click({ force: true });

  //clica no arquivo
  cy.get('.current-resource > .resource-list-header > .ng-binding',{timeout:60000})
  .should('be.visible')
  .click({force: true})

  cy.wait(2000)

  //Clica no chatbox 'li e concordo'
  cy.get('.modal-overlay:visible .modal', { timeout: 60000 })
  .first()
  .within(() => {
    cy.contains('label.checkbox, .checkbox', 'Li e concordo')
      .click({ force: true });
  });

  //Clica em confirmar
  cy.get('[switch="modal.agreementRequired"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(4000);
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 1 aberto e retornado com sucesso");
  });

  // --- DOCUMENTO 2 ---
  it("Abrir documento jpg e validar 100%", () => {
    cy.get("tbody > :nth-child(5) > :nth-child(1) > .lector-txt-main")
      .should("be.visible")
      .click();

        //clica na listagem
      cy.get('#courseResourceMenuIndicator', { timeout: 60000 })
  .scrollIntoView({ block: 'center' })
  .click({ force: true });

  //clica no arquivo
  cy.get('.course-resources-list-container > ul > :nth-child(3)',{timeout:60000})
  .should('be.visible')
  .click({force: true})

  cy.wait(2000)

  //Clica no chatbox 'li e concordo'
  cy.get('.modal-overlay:visible .modal', { timeout: 60000 })
  .first()
  .within(() => {
    cy.contains('label.checkbox, .checkbox', 'Li e concordo')
      .click({ force: true });
  });

  //Clica em confirmar
  cy.get('[switch="modal.agreementRequired"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(4000);

    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 2 aberto e retornado com sucesso");
  });

  // --- DOCUMENTO 3 ---
  it("Abrir documento png e validar 100%", () => {
    cy.get("tbody > :nth-child(7) > :nth-child(1) > .lector-txt-main")
      .should("be.visible")
      .click();

       //clica na listagem
      cy.get('#courseResourceMenuIndicator', { timeout: 60000 })
  .scrollIntoView({ block: 'center' })
  .click({ force: true });

  //clica no arquivo
  cy.get('.course-resources-list-container > ul > :nth-child(4)',{timeout:60000})
  .should('be.visible')
  .click({force: true})

  cy.wait(2000)

  //Clica no chatbox 'li e concordo'
  cy.get('.modal-overlay:visible .modal', { timeout: 60000 })
  .first()
  .within(() => {
    cy.contains('label.checkbox, .checkbox', 'Li e concordo')
      .click({ force: true });
  });

  //Clica em confirmar
  cy.get('[switch="modal.agreementRequired"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(4000);

    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 3 aberto e retornado com sucesso");
  });

  // --- DOCUMENTO 4 ---
  it("Abrir documento docx e validar 100%", () => {
    cy.get("tbody > :nth-child(9) > :nth-child(1) > .lector-txt-main")
      .should("be.visible")
      .click();

       //clica na listagem
      cy.get('#courseResourceMenuIndicator', { timeout: 60000 })
  .scrollIntoView({ block: 'center' })
  .click({ force: true });

  //clica no arquivo
  cy.get('.course-resources-list-container > ul > :nth-child(5)',{timeout:60000})
  .should('be.visible')
  .click({force: true})

  cy.wait(2000)

  //Clica no chatbox 'li e concordo'
  cy.get('.modal-overlay:visible .modal', { timeout: 60000 })
  .first()
  .within(() => {
    cy.contains('label.checkbox, .checkbox', 'Li e concordo')
      .click({ force: true });
  });

  //Clica em confirmar
  cy.get('[switch="modal.agreementRequired"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click()

    cy.wait(4000);
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 4 aberto e retornado com sucesso");
  });

  // --- DOCUMENTO 5 ---
  it("Abrir documento xlsx e validar 100%", () => {

    cy.get(':nth-child(11) > [style="padding-left: 5px;"]')
      .should("be.visible")
      .click();

    cy.wait(4000);
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 4 aberto e retornado com sucesso");

  });

  // --- DOCUMENTO 6 ---
    it("Abrir documento word e validar 100%", () => {

      cy.get(':nth-child(13) > [style="padding-left: 5px;"]')
      .should("be.visible")
      .click();

    cy.wait(4000);
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(2000);
    cy.log("⬅️ Documento 4 aberto e retornado com sucesso");

  });


  it("Avaliação uma por pagina", () => {
    // Clica na avaliação (espera até 30s se necessário)
    cy.get(':nth-child(15) > [style="padding-left: 5px;"]',{timeout:60000})
      .should("be.visible")
      .click();

    cy.log("PREENCHA AS RESPOTA E ENVIE");
    cy.pause()

    //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
  });

  it("Avaliação todas na mesma página", () => {
    cy.wait(3000);

    cy.get(':nth-child(17) > [style="padding-left: 5px;"]',{timeout:60000})
      .should("be.visible")
      .click();

    cy.log("PREENCHA AS RESPOTA E ENVIE");
    cy.pause()

    //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
  });

   
  it("Avaliação Correção", () => {
    cy.wait(3000);

    cy.get(':nth-child(19) > [style="padding-left: 5px;"]',{timeout:60000})
      .should("be.visible")
      .click();

    cy.log("PREENCHA AS RESPOTA E ENVIE");
    cy.pause()

    //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
  });


  it("Aula Presencial", () => {
    cy.wait(3000);
    //Clica na aula presencial
    cy.get("tbody > :nth-child(21) > :nth-child(1) > .lector-txt-main")
      .should("be.visible")
      .click();

    cy.wait(2000);
    // Valida se o título "Aula Presencial" está visível na página
    cy.get("h2.ng-binding", { timeout: 30000 })
      .should("be.visible")
      .and("contain.text", "Aula Presencial");

    //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

  });

  
       it("Direcionamento para YOUTUBE", () => {
  cy.wait(3000)

  // Ignora o erro específico que a aplicação dispara ao abrir a Webconferência
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes("reading '@class'")) {
      // retorna false para o Cypress NÃO falhar o teste
      return false;
    }
    // outros erros continuam quebrando o teste
  });

  cy.get('tbody > :nth-child(23) > :nth-child(1) > .lector-txt-main')
    .should("be.visible")
    .click();

  cy.wait(6000);

  //Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });

      });

  
      it("Direcionamento para TEANS", () => {
  cy.wait(3000)

  // Ignora o erro específico que a aplicação dispara ao abrir a Webconferência
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes("reading '@class'")) {
      // retorna false para o Cypress NÃO falhar o teste
      return false;
    }
    // outros erros continuam quebrando o teste
  });

  cy.get('tbody > :nth-child(25) > :nth-child(1) > .lector-txt-main')
    .should("be.visible")
    .click();

  cy.wait(6000);

  //Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });

      });

        it("Direcionamento para ZOOM", () => {
  cy.wait(3000)

  // Ignora o erro específico que a aplicação dispara ao abrir a Webconferência
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes("reading '@class'")) {
      // retorna false para o Cypress NÃO falhar o teste
      return false;
    }
    // outros erros continuam quebrando o teste
  });

  cy.get('tbody > :nth-child(27) > :nth-child(1) > .lector-txt-main')
    .should("be.visible")
    .click();

  cy.wait(6000);

  //Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });

      });
      
      it("Direcionamento para MEET", () => {
  cy.wait(3000)

  // Ignora o erro específico que a aplicação dispara ao abrir a Webconferência
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes("reading '@class'")) {
      // retorna false para o Cypress NÃO falhar o teste
      return false;
    }
    // outros erros continuam quebrando o teste
  });

  cy.get('tbody > :nth-child(29) > :nth-child(1) > .lector-txt-main')
    .should("be.visible")
    .click();

  cy.wait(6000);

  //Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });

      });


       it("Direcionamento para LECTOR", () => {
  cy.wait(3000)

  // Ignora o erro específico que a aplicação dispara ao abrir a Webconferência
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes("reading '@class'")) {
      // retorna false para o Cypress NÃO falhar o teste
      return false;
    }
    // outros erros continuam quebrando o teste
  });

  cy.get('tbody > :nth-child(31) > :nth-child(1) > .lector-txt-main')
    .should("be.visible")
    .click();

  cy.wait(6000);

  //Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });

      });


      it("WEB LECTOR", () => {
  cy.wait(3000)

  // Ignora o erro específico que a aplicação dispara ao abrir a Webconferência
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes("reading '@class'")) {
      // retorna false para o Cypress NÃO falhar o teste
      return false;
    }
    // outros erros continuam quebrando o teste
  });

  cy.get('tbody > :nth-child(33) > :nth-child(1) > .lector-txt-main')
    .should("be.visible")
    .click();

  cy.wait(6000);

  //Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });

      });

  it("Vídeo Lector", () => {
    cy.get(':nth-child(35) > [style="padding-left: 5px;"] > .lector-txt-main', {timeout: 3000})
      .should("be.visible")
      .click({ force: true });

      cy.log('Assista o video completo')
    cy.pause()

    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
    cy.log("⬅️ Clicou em Voltar após assistir gravação");
  });

  it("Video Youtube", () => {
    cy.wait(3000);

    cy.get(':nth-child(37) > [style="padding-left: 5px;"]', { timeout: 30000 })
      .should("be.visible")
      .click({ force: true });

    cy.wait(20000); // simula assistir o vídeo
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
    cy.log("⬅️ Clicou em Voltar após assistir gravação");
  });


  it("Topico ", () => {
    cy.get(":nth-child(41) > :nth-child(1) > .lector-txt-main")
      .should("be.visible")
      .click({ force: true });

      cy.log('Verifique se tem algo escrito')
    cy.wait(10000);

    //Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });
  });

  // Ignora erros do player SCORM que não afetam o teste
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("@class") || err.message.includes("ready")) {
      return false; // impede que o teste falhe por causa desses erros
    }
  });

  // Teste SCORM
  it("Scorm", () => {
    cy.wait(3000);
    cy.get(":nth-child(43) > :nth-child(1) > .lector-txt-main")
      .should("be.visible")
      .click();

    cy.log("FAÇA A AVALIAÇÃO DO SCORM, CONFIRME E DEIXE O BOTÃO VOLTAR VISIVEL");
    cy.pause

    // Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });
  });


  it("Entrega de atividade", () => {
    cy.wait(3000);

    cy.get(':nth-child(45) > [style="padding-left: 5px;"]')
      .should("be.visible")
      .click();

    cy.contains("Adicionar arquivos", { timeout: 20000 })
      .should("be.visible")
      .closest(".default-padding") // sobe pro container correto (ajuste se precisar)
      .find('input[type="file"]')
      .first()
      .selectFile("cypress/fixtures/images(1).png", { force: true });

    cy.wait(4000);

    cy.get(".btn-swipe-accent.mb-20").click({ force: true });

    cy.wait(4000);

    // Clica em voltar
    cy.get("#hideResource", { timeout: 50000 })
      .should("be.visible")
      .click({ force: true });
  });

  it("Reação todas na mesma página", () => {
    // Clica na avaliação (espera até 30s se necessário)
    cy.get("tbody > :nth-child(47) > :nth-child(1) > .lector-txt-main", {
      timeout: 30000,
    })
      .should("be.visible")
      .click();

    cy.log("PREENCHA AS RESPOTA E ENVIE");
    cy.pause()

    //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
  });

  it("Reação uma por página", () => {
    cy.wait(3000);
    // Clica na avaliação (espera até 30s se necessário)
    cy.get("tbody > :nth-child(49) > :nth-child(1) > .lector-txt-main", {
      timeout: 30000 })
      .should("be.visible")
      .click();

    cy.log("PREENCHA AS RESPOTA E ENVIE");
    cy.pause(10000);

    //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
  });

  it("Troca pro perfil Administrador", () => {

     //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    //Clica em selecionar perfil
    cy.get(':nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Clica em Administrador
  cy.get(':nth-child(4) > .user-options-items > :nth-child(1) > ng-transclude > .ng-binding', { timeout: 60000 })
  .should('be.visible')
  .click()

  });
   */

it("Vai pra categoria", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

      });

      it('Clica no treinamento', ()=> {
/*
     //Clica no Treinamento
  cy.contains('.card-title', 'Teste Automação', { timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })
*/
  cy.contains('.card-title', /^Teste Automação$/)
  .scrollIntoView()
  .should('be.visible')
  .click();

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .first()
      .should('be.visible')
      .click()

    });

    it('Corrige Avaliação', () => {

      //Clica em Corrigir Avalaiação
      cy.get('[ng-class*="manageSubscriptionsTabs.evaluations"]',{timeout:60000})
      .should('be.visible')
      .click()

      //Clica em corrigir
      cy.get('.center > .btn',{timeout:60000})
      .should('be.visible')
      .click()

      cy.get('.pv-10 > .input-number > div > .icon-pointer-up',{timeout:60000})
      .should('be.visible')
      .click()

      //Laço de Repetição(Clica dez vezes)
for (let i = 0; i < 10; i++) {
  cy.get('.pv-10 > .input-number > div > .icon-pointer-up')
    .click();
}

//Escreve
cy.get('textarea[ng-model="questionAnswer.observations"]')
  .should('be.visible')
  .type('Teste de observação da correção');

  cy.contains('button', 'Enviar correção')
  .click();

  //Espera Carregar o envio da avaliação
  cy.wait(7000)

  //Envia a Avalição
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{timeout:60000})
  .should('be.visible')
  .click()

    });

  });

});
