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

    cy.contains("button", "Entrar", { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.get('form.ng-pristine > [type="text"]', { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible")
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible")
      .type("2006lrnrgr");

    cy.get("#btn-entrar", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

  context("Vai para a categoria", { testIsolation: false }, () => {


     it("Clica vai ate a categoria", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
        .scrollIntoView()
        .should('be.visible')
        .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
        .scrollIntoView()
        .should('be.visible')
        .click({force: true})

     });

      it('Cria o treinamento', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

        cy.get("#courseName")
          .scrollIntoView()
          .click(); // Clica pra digitar

        cy.get("#courseName")
          .scrollIntoView()
          .type("Evento Hibrido Automação") //  Nome no Treinamento

    });

     it("Conteúdo - Aula Presencial TEANMS", () => {

          //Clica em conteudos
            cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:60000})
            .should('be.visible')
            .click();

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:60000})
            .should('be.visible')
            .click();

      cy.get(".editing-resource > :nth-child(2) > .w-100").click();

      cy.get("body .ui-select-choices-row", { timeout: 60000 })
        .should("be.visible")
        .contains(/^\s*Aula\s*Presencial\s*$/i)
        .click({ force: true });

      cy.get('input[placeholder="Nome"]:visible', { timeout: 60000 })
        .first()
        .clear({ force: true })
        .type("Aula Presencial TEANMS", { force: true });

        cy.contains('.first-row', 'Evento Híbrido')
        .scrollIntoView()
        .parent()
        .find('label.checkbox')
        .should('be.visible')
        .click({ force: true })

        cy.log('DESCREVA UM DESCRIÇÃO PARA ONILNE/PRESECIAL/CONTEUDO')
        cy.pause()
        cy.log('DESCREVA UM DESCRIÇÃO PARA ONILNE/PRESECIAL/CONTEUDO')

          cy.wait(1000)
          
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

  //Clica na plataforma
  cy.get('[ng-if="contaInfo.toolsConfig.webconferenceParams.enableExternalPlatforms"] > .w-100',{timeout:60000})
  .should('be.visible')
  .click()

  //Clica no TEANMS
  cy.get('.open > .ui-select-choices > :nth-child(3)',{timeout:60000})
  .should('be.visible')
  .click()

  //link da aula
        cy.get('input[ng-model="editingResource.url"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('https://teams.live.com/meet/9324583981570?p=StQQv6W0Pnmo0pe2VH', { delay: 30 })

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });
    
    it('Turma Paga sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]')
        .scrollIntoView()
        .click()

      cy.get('[ng-click="editClass()"]')
        .scrollIntoView()
        .click() //Nova turma

      cy.get("#className")
        .scrollIntoView()
        .type("Turma Gratuita sem aprovação"); //nome da turma

      cy.get('.column > :nth-child(1) > .icon-checkbox')
        .scrollIntoView()
        .click(); // desativa aprovação

      cy.wait(3000);

           cy.get(".navigation-controls > .ml-20")
        .scrollIntoView()
        .click(); //botao prximo

        cy.pause()
        cy.log('REALIZE O AGENDAMENTO, E INSIRA APENAS UMA VAGA PRESENCIAL')

      cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo
      
      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn')
        .scrollIntoView()
        .click()

        cy

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
        .scrollIntoView()
        .type("Aluno")

      cy.contains('.ui-select-choices-row', 'Aluno', {timeout:60000})
        .scrollIntoView()
        .first()
        .click()

      cy.contains('button', 'Adicionar')
        .scrollIntoView()
        .should('be.visible')
        .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      cy.get('.add-content > .end > .btn-swipe-accent')
        .scrollIntoView()
        .click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent')
        .scrollIntoView()
        .click()

        cy.wait(8000)

    });

      it('ENTRA NO PERFIL ALUNO E MATRICULA COMO PRESENCIAL ', () => {

         cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

    });

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
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

    });

  it('Clica no treinamento ', ()=> {

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Evento Hibrido Automação', { timeout: 60000 })
  .scrollIntoView()
  .click()

  cy.wait(2000)

  });

  it('Se escreve como Presensial', ()=> {
  
   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        //clica para escolher o tipo de modalidade
        cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .modal-body > .default-table > tbody > tr > .p-5 > .ui-select-container',{timeout:60000})
        .click()

        cy.wait(1000)

        //Prescial
        cy.get('.open > .ui-select-choices > :nth-child(2)',{timeout:60000})
        .click()

        cy.wait(1000)

        //Continuar Incrição
        cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .content-box-footer > .btn-swipe-accent',{timeout:60000})
        .click()

        cy.wait(7000)

        //Clica em acessar
  cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(1000)

        cy.contains('Evento Híbrido (Presencial)', { timeout: 20000 })
  .should('be.visible');

        //Clica em voltar
    cy.get("#hideResource", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

      cy.wait(2000)

    });

     it('ENTRA NO PERFIL ALUNO E MATRICULA COMO ONILNE', () => {

         cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("lector1308@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

    });

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
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

    });

  it('Clica no treinamento ', ()=> {

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Evento Hibrido Automação', { timeout: 60000 })
  .scrollIntoView()
  .click()

  cy.wait(2000)

  });
  
  it('Verifica ao atingir o limite de vaga é derecionado para online', ()=> {

   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(1000)

 cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .modal-body > .default-table > tbody > tr > .p-5')
  .should('not.be.enabled')

  cy.wait(1000)

        //Continuar Incrição
        cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .content-box-footer > .btn-swipe-accent',{timeout:60000})
        .click()

        cy.wait(7000)

        //Clica em acessar
  cy.get('.classes-actions > .btn-swipe-accent.ng-scope', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(8000)

        cy.contains('Não há mais vagas presenciais disponíveis', { timeout: 60000 })
  .should('be.visible');

  cy.contains('Evento Híbrido (Online)', { timeout: 60000 })
  .should('be.visible');

        //Clica em concluir
      cy.get('.resource-button-preview', { timeout: 60000 })
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });

      //clica em ok
      cy.get('[switch="modal.courseFinished"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent', { timeout: 60000 })
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });

    });

  });

});