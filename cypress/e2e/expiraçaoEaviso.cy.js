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
    msg.includes('Document is not focused')
  ) {
    return false;
  }
});


describe("Teste - Login", () => {
   before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

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

  context("Criando Treinamento", { testIsolation: false }, () => {
    
    it("Indo na categoria", () => {

      // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

    });

      it('Criando treinamento com Aviso de Expiração', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

      cy.get("#courseName", {timeout:60000}).click(); // Clica pra digitar
      cy.get("#courseName").type("Aviso de expiração Automação"); //  Nome no Treinamento

      cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]',)
      .selectFile("cypress/fixtures/images6.png", { force: true });

      cy.log("AJUSTE A IMAGEM MANUALMENTE");
      cy.wait(6000); // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click(); // Confirma em confirmar para salvar a imagem

      //Clica em "Enviar e-mail aos usuários sobre expiração da turma"
      cy.get('[class-expiration-message=""] > .checkbox > .icon-checkbox', {timeout:60000})
      .should('be.visible')
      .click()

    });

      it("Conteúdo - Documento DOC", () => {
        
        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()   

      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 60000 })
        .should("have.length", 1)
        .type("6518 - Opcao de evento hibrido", { delay: 10 });

      cy.contains(".ui-select-choices-row", "6518 - Opcao de evento hibrido", {
        timeout: 60000,
      })
        .should("be.visible")
        .click({ force: true });

        //Peso 1
         cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

    it("Turma Gratuita", () => {
      // Garante que está na aba de Turmas
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]')
        .should("be.visible")
        .click({ force: true });

      // Espera renderizar a área
      cy.wait(2000);
      cy.get('[ng-click="editClass()"]').click(); //Nova turma
      cy.get("#className").type("Turma Gratuita"); //nome da turma
      cy.get(".column > :nth-child(1) > .icon-checkbox").click(); // desativa aprovação

      cy.wait(3000);

      cy.log('INSERA A DATA DE INCRIÇÃO E A DATA DE REALIZAÇÃO')
      cy.pause()


      //vai ate as permisaoes
      cy.get(':nth-child(3) > .dot', {timeout:60000})
      .should('be.visible')
      .click()
    
      cy.get(
        '.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default',
      ).type("Aluno");

      cy.get(".ui-select-dropdown").should("be.visible");

      cy.contains(".ui-select-choices-row", "Aluno").click();

      cy.contains("button", "Adicionar").should("be.visible").click();

      // Clica no botão "Salvar Turma"
      cy.get(".add-content > .end > .btn-swipe-accent").click();
      
      //Clica em salvar
       cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      

    });


     it('Criando treinamento Lista de Incritos', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

      cy.get("#courseName", {timeout:60000}).click(); // Clica pra digitar
      cy.get("#courseName").type("Lista de Incrito Automação"); //  Nome no Treinamento

      cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]',)
      .selectFile("cypress/fixtures/images6.png", { force: true });

      cy.log("AJUSTE A IMAGEM MANUALMENTE");
      cy.wait(6000); // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click(); // Confirma em confirmar para salvar a imagem

      //clica no box lista de espera
      cy.get('[send-subscription-interval-end-mail=""] > .checkbox > .icon-checkbox',{timeout:60000})
      .should('be.visible')
      .click()

      //Clica em lista de usuario
      cy.get('input[placeholder="Escolha um usuário"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .click({ force: true })
  .type('Thiago Laguna', { force: true });

  //Clica no Thiago Laguna
   cy.contains(".ui-select-choices-row", "Thiago Laguna", {timeout: 60000})
        .should("be.visible")
        .click({ force: true });

    
    });

      it("Conteúdo - Documento DOC", () => {
        
        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()   

      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 60000 })
        .should("have.length", 1)
        .type("6518 - Opcao de evento hibrido", { delay: 10 });

      cy.contains(".ui-select-choices-row", "6518 - Opcao de evento hibrido", {
        timeout: 60000,
      })
        .should("be.visible")
        .click({ force: true });

        //Peso 1
         cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

    it("Turma Gratuita", () => {
      // Garante que está na aba de Turmas
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]')
        .should("be.visible")
        .click({ force: true });

      // Espera renderizar a área
      cy.wait(2000);
      cy.get('[ng-click="editClass()"]').click(); //Nova turma
      cy.get("#className").type("Turma Gratuita"); //nome da turma
      cy.get(".column > :nth-child(1) > .icon-checkbox").click(); // desativa aprovação

      cy.wait(3000);

      cy.log('INSERA A DATA DE INCRIÇÃO E A DATA DE REALIZAÇÃO')
      cy.pause()

      //vai ate as permisaoes
      cy.get(':nth-child(3) > .dot', {timeout:60000})
      .should('be.visible')
      .click()
    
      cy.get(
        '.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default',
      ).type("Aluno");

      cy.get(".ui-select-dropdown").should("be.visible");

      cy.contains(".ui-select-choices-row", "Aluno").click();

      cy.contains("button", "Adicionar").should("be.visible").click();

      // Clica no botão "Salvar Turma"
      cy.get(".add-content > .end > .btn-swipe-accent").click();
      
      //Clica em salvar
       cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
    
    });

it('Muda para o perfil aluno', () => {
  
//Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Clica em Perfil
  cy.get('.icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Aluno
 cy.contains('span','Aluno - Todos')
  .should('be.visible')
  .click()

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

    });

  it('Clica no treinamento Lista de Incrito Automação', ()=> {

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Lista de Incrito Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em Fazer Incrição
        cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

  cy.wait(3000)

   //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

    });
    

     it('Clica no treinamento Aviso de expiração Automação', ()=> {

        //Clica em Ver Tudo
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all',{timeout:60000})
        .last()
        .should('be.visible')
        .click()

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Aviso de expiração Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em Fazer Incrição
        cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

  cy.wait(3000)

   //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

        cy.log(`VEREFIQUE SE OS EMIALS DE EXPIRAÇÃO E LISTA DE ESPERA CHEGUEM NO HORÁRIO QUE VOCE COLOCOU`)

    });

  });
});
