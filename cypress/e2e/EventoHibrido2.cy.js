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
      .type("thiagosuporte@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .scrollIntoView()
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 })
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
          .type("Evento Hibrido Automação 2") //  Nome no Treinamento

    });

     it("Conteúdo - Aula Presencial TEANMS", () => {

          //Clica em conteudos
            cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:60000})
            .scrollIntoView()
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
        .type("Aula Presencial Youtube Automação", { force: true });

        cy.contains('.first-row', 'Evento Híbrido')
        .scrollIntoView()
        .parent()
        .find('label.checkbox')
        .should('be.visible')
        .click({ force: true })

          cy.wait(1000)
          
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

  //Clica na plataforma
  cy.get('[ng-if="contaInfo.toolsConfig.webconferenceParams.enableExternalPlatforms"] > .w-100',{timeout:60000})
  .should('be.visible')
  .click()

   //Clica no youtube
  cy.get('.open > .ui-select-choices > :nth-child(4)',{timeout:60000})
  .should('be.visible')
  .click()

  //link da aula
        cy.get('input[ng-model="editingResource.url"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('https://www.youtube.com/watch?v=Bz1uWWnX77s', { delay: 30 })

  //LINK DE GRAVAÇÃO
  cy.get('input[ng-model="editingResource.recordingUrl"]', { timeout: 60000 })
  .should('be.visible')
  .clear()
  .type('https://www.youtube.com/watch?v=Bz1uWWnX77s', { delay: 30 })

  cy.log('DESCREVA UM DESCRIÇÃO PARA ONILNE/PRESECIAL/CONTEUDO')
        cy.pause()
        cy.log('DESCREVA UM DESCRIÇÃO PARA ONILNE/PRESECIAL/CONTEUDO')

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
        cy.log('REALIZE O AGENDAMENTO, E INSERA APENAS UMA VAGA PRESENCIAL')

      cy.get('.navigation-controls > .ml-20')
        .scrollIntoView()
        .click()//botao prximo
      
      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn')
        .scrollIntoView()
        .click()

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
        .type("Aluno")

        cy.wait(1000)

         cy.get('.ui-select-choices-row:visible', { timeout: 20000 })
  .contains(/^Aluno$/)
  .click({ force: true })

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

      it('ENTRA NO PERFIL ALUNO E MATRICULA COMO ONLINE', () => {

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

        cy.wait(3000)

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

    });

  it('Clica no treinamento ', ()=> {

    cy.wait(3000)

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Evento Hibrido Automação 2', { timeout: 60000 })
  .scrollIntoView()
  .click()

  cy.wait(2000)

  });

  it('Se escreve como Onilne', ()=> {

  
   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        //clica para escolher o tipo de modalidade
        cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .modal-body > .default-table > tbody > tr > .p-5 > .ui-select-container',{timeout:60000})
        .click()

        cy.wait(1000)

        //Online
        cy.get('.open > .ui-select-choices > :nth-child(1)',{timeout:60000})
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

        cy.wait(8000)


        cy.contains('Evento Híbrido (Online)', { timeout: 20000 })
  .should('be.visible');

  //Clica em concluir
      cy.get('.resource-preview-icon', { timeout: 60000 })
      .scrollIntoView()
      .click()

      //Clica no X
      cy.get('[switch="modal.courseFinished"] > .modal > .between > .btn', {timeout:60000})
      .click()

      cy.wait(2000)

    });

    it("Minha área/Meu Calendario", () => {

      //Minha área
      cy.contains("span", "Minha Área", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Minhas compras
      cy.contains("button.showcase-home-menu-item", "Meu Calendário", {timeout: 60000 })
        .should("be.visible")
        .click();
    });

    it('Abre o evento pelo calendário', () => {

    cy.contains('.fc-title', 'Aula Presencial Youtube Automação', { timeout: 10000 })
    .scrollIntoView()
  .click({ force: true })

       cy.wait(7000)

    });

     it('ENTRA NO PERFIL ALUNO E MATRICULA COMO PRESENCIAL', () => {

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

     cy.wait(3000)

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

    });

  it('Clica no treinamento ', ()=> {

     cy.wait(2000)

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Evento Hibrido Automação 2', { timeout: 60000 })
  .scrollIntoView()
  .click()

  cy.wait(2000)

  });
 
  it('Se escreve como Presensial', ()=> {

   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(1000)

        //clica para escolher o tipo de modalidade
        cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .modal-body > .default-table > tbody > tr > .p-5 > .ui-select-container',{timeout:60000})
        .click()

          //Presencial
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

        cy.wait(8000)

          cy.contains('Evento Híbrido (Presencial)', { timeout: 20000 })
  .should('be.visible');


  cy.get('body', { timeout: 10000 }).then(($body) => {

  if ($body.find('.resource-button-preview:visible').length) {

    // Clica em concluir
    cy.get('.resource-button-preview', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    // Clica no X
    cy.get('[switch="modal.courseFinished"] > .modal > .between > .btn', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

  } else if ($body.find('#hideResource:visible').length) {

    // Clica em voltar
    cy.get('#hideResource', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

  }
});

    });
  

    it("Minha área/Meu Calendario", () => {

      //Minha área
      cy.contains("span", "Minha Área", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Minhas compras
      cy.contains("button.showcase-home-menu-item", "Meu Calendário", {timeout: 60000 })
        .should("be.visible")
        .click();
    });

    it('Tenta brir pelo calendário', () => {

    cy.get('.fc-title', { timeout: 10000 })
    .scrollIntoView()
  .click({ force: true })

  cy.log('VEREFIQUE SE FOI ABERTO')

       cy.wait(7000)

    });

     it('Vai até a vitrine', () => {

        //Clica em conteudo
        cy.get('[ng-class*="accessLink.content.showcase.id.open"] > .icon-next',{timeout:60000})
        .should('be.visible')
        .click()
        
        //Vai até a vitrine
        cy.get('.showcase-navigation-menu > :nth-child(2) > .showcase-menu-name',{timeout:60000})
        .should('be.visible')
        .click()

     cy.wait(3000)

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

    });
   
     it('Clica no treinamento ', ()=> {

     cy.wait(2000)

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Automação Evento Antes', { timeout: 60000 })
  .scrollIntoView()
  .click()

  cy.wait(2000)

  });
 
  it('Se escreve como Presensial', ()=> {

   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(1000)

        //clica para escolher o tipo de modalidade
        cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .modal-body > .default-table > tbody > tr > .p-5 > .ui-select-container',{timeout:60000})
        .click()

          //Presencial
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

        cy.wait(8000)

        cy.contains('O evento só pode ser iniciado 30 minutos antes do horário marcado.', {timeout:10000})
        .should('be.visible')

          // Clica em voltar
    cy.get('#hideResource', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

  });


   it('Vai até a vitrine', () => {

        //Clica em conteudo
        cy.get('[ng-class*="accessLink.content.showcase.id.open"] > .icon-next',{timeout:60000})
        .should('be.visible')
        .click()
        
        //Vai até a vitrine
        cy.get('.showcase-navigation-menu > :nth-child(2) > .showcase-menu-name',{timeout:60000})
        .should('be.visible')
        .click()

     cy.wait(3000)

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

    });
   
     it('Clica no treinamento ', ()=> {

     cy.wait(2000)

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Automação Evento Depois', { timeout: 60000 })
  .scrollIntoView()
  .click()

  cy.wait(2000)

  });
 
  it('Se escreve como Presensial', ()=> {

    
   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 20000 })
        .should('be.visible')
        .click()

        cy.wait(1000)

        //clica para escolher o tipo de modalidade
        cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .modal-body > .default-table > tbody > tr > .p-5 > .ui-select-container',{timeout:60000})
        .click()

          //Presencial
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

        cy.wait(8000)

        cy.contains('O evento foi finalizado por limite de tempo.')
        .should('be.visible')
    
      cy.log('Volte para a tela inicial')
      cy.pause()

  });

it('Verefica a presença dos alunos', () => {

 cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.viewport(1920, 1080);

    cy.contains("button", "Entrar", { timeout: 60000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .scrollIntoView()
      .should("be.visible")
      .type("thiagosuporte@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .scrollIntoView()
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

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

it('Clica no treinamento', () => {

//Clica no treinamento
  cy.contains('.card-title', /^Evento Hibrido Automação 2$/, { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:10000})
      .should('be.visible')
      .click()

        //Clica em Matriculados Concuidos
      cy.contains('a', ' Matriculados / Concluídos', { timeout: 10000 })
  .click({force: true})

  //Em andamento
     cy.contains('table tbody tr', 'teste4 teste3', { timeout: 10000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Em andamento')

   });

     cy.contains('table tbody tr', 'thiago suporte 2', { timeout: 10000 })
  .within(() => {
    cy.get('td.subscriptionStatusColumn')
      .should('contain', 'Em andamento')

      });
    });

      it('Lista de Presença', () => {

             //Clica em Lista de presença
      cy.contains('a', 'Lista de Presença', { timeout: 10000 })
  .click()

  cy.get(':nth-child(6) > .btn-swipe-accent')
  .click()

  cy.wait(2000)

  cy.contains('td', 'teste4 teste3', { timeout: 10000 })
  .should('exist')

cy.contains('td', 'thiago suporte 2', { timeout: 10000 })
  .should('exist')

     });

     it('Lista de Presença (Aulas presenciais)', () => {

         //Clica em Lista de presença
      cy.contains('a', 'Lista de Presença (Aulas presenciais)', { timeout: 10000 })
  .click()

          cy.contains('td', 'teste4 teste3', { timeout: 10000 })
  .should('exist')

cy.contains('td', 'thiago suporte 2', { timeout: 10000 })
  .should('exist')

     });

  });

});