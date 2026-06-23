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

  
     it("Clica vai ate a categoria", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
        .should('be.visible')
        .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
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


             cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ DESCREVA UM DESCRIÇÃO PARA ONILNE/PRESECIAL/CONTEUDO!';
  aviso.style.position = 'fixed';
  aviso.style.top = '20px';
  aviso.style.left = '50%';
  aviso.style.transform = 'translateX(-50%)';
  aviso.style.background = 'red';
  aviso.style.color = 'white';
  aviso.style.padding = '20px';
  aviso.style.fontSize = '24px';
  aviso.style.fontWeight = 'bold';
  aviso.style.zIndex = '999999';

  doc.body.appendChild(aviso);

});

cy.pause()

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



      cy.wait(3000);

           cy.get(".navigation-controls > .ml-20")
        .scrollIntoView()
        .click(); //botao prximo

              cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️REALIZE O AGENDAMENTO!';
  aviso.style.position = 'fixed';
  aviso.style.top = '20px';
  aviso.style.left = '50%';
  aviso.style.transform = 'translateX(-50%)';
  aviso.style.background = 'red';
  aviso.style.color = 'white';
  aviso.style.padding = '20px';
  aviso.style.fontSize = '24px';
  aviso.style.fontWeight = 'bold';
  aviso.style.zIndex = '999999';

  doc.body.appendChild(aviso);
});

        cy.pause()

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
        cy.contains('span', 'teste automoção')
  .closest('button')
  .click();

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

  
       // Clica na turma
    cy.get('label.class-container')
  .first()
  .click();

      cy.wait(2000)

      //Clica em fazer incrição
      cy.get('.selected > .class-info > .classes-actions > .btn-swipe-accent')
      .should('be.visible')
      .click();

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

        cy.wait(8000)

        cy.contains('Evento Híbrido (Online)', { timeout: 20000 })
  .should('be.visible');

cy.get('#hideResource', { timeout: 10000 })
  .should('be.visible')
  .click();

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
        cy.contains('span', 'teste automoção')
  .closest('button')
  .click();

cy.wait(2000)

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

    // Clica na turma
    cy.get('label.class-container')
  .first()
  .click();

      cy.wait(2000)

      //Clica em fazer incrição
      cy.get('.selected > .class-info > .classes-actions > .btn-swipe-accent')
      .should('be.visible')
      .click();

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

          cy.contains('Evento Híbrido (Presencial)', { timeout: 20000 })
  .should('be.visible');

  cy.get('#hideResource', { timeout: 10000 })
  .should('be.visible')
  .click();

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

    it('Verefica se o evento está no calendario', () => {

      //Verefica se o evento está no calendário
      cy.contains('.fc-title', 'Aula presencial - Evento Hibrido', { timeout: 10000 })
  .should('exist')
  .and('be.visible')

  cy.log('VEREFIQUE SE FOI ABERTO')

       cy.wait(4000)

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

     it("Clica vai ate a categoria", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
        .should('be.visible')
        .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
        .should('be.visible')
        .click({force: true})

     });

it('Clica no treinamento', () => {

//Clica no treinamento
  cy.contains('.card-title', /^Evento Hibrido Automação 2$/, { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica na turma
     cy.get('label.class-container:visible')
  .first()
  .click();

         // Clica no gerenciar
  cy.contains('.class-container', 'Turma Gratuita')
  .find('button.icon-manage')
  .click();
    
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

  //Clica em salvar
  cy.get('[ng-show="presenceList != null"] > .end > .mr-20')
  .click()

     });

  });

});