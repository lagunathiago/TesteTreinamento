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

  context("Criando Treinamento", { testIsolation: false }, () => {
/*
      it("Criar Treinamento/Aba Geral", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Campo Personalizado Teste") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/images6.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

    });

      it("Conteúdo - Documento PDF", () => {
      
        //Clica em Conteúdo
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]',{timeout:60000})
      .should('be.visible')
      .click();
      
      //Clica em Novo Conteúdo
      cy.get("ui-view.ng-scope > .flex > .btn-swipe-accent",{timeout:60000})
      .should('be.visible')
      .click();

      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 60000 })
        .should("have.length", 1)
        .type("Chamada.pdf", { delay: 10 });

      cy.contains(".ui-select-choices-row", "Chamada.pdf", { timeout: 60000 })
        .should("be.visible")
        .click({ force: true });

        cy.get(".weight").type("1");  // Selecionar peso  
        
        //Clica no Peso
        cy.get(".open > .ui-select-choices > :nth-child(2)", { timeout: 60000 })
        .should("be.visible")
        .click({ force: true });

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

    it('Criando turma do treinamento', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]', { timeout: 60000 })
      .should('be.visible')
      .click()

      cy.get('[ng-click="editClass()"]', { timeout: 60000 }).click() //Nova turma
      cy.get("#className").type("Turma Teste Automação Turma"); //nome da turma

     cy.get('.column > :nth-child(1) > .icon-checkbox')
     .should('be.visible')
     .click(); // desativa aprovação
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("Aluno")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Aluno',{timeout:60000})
  .first()
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    });
    
         it('Adicinando os campos peronalizado com aprovação', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em novo
            cy.contains('label', 'Novo', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Escreve
 cy.get('table.custom-fields-table', { timeout: 60000 })
  .find('input[placeholder="Nome"]')
  .first()
  .should('be.visible')
  .should('not.be.disabled')
  .clear({ force: true })
  .type('Campo Personalizado - 01', { force: true });

              cy.wait(1000)

  //Selecona o tipo
 cy.get('td .ui-select-container.lector-select', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  // 3. Seleciona "Texto"
cy.contains('.ui-select-choices-row', 'Texto', { timeout: 60000 })
  .click();

          //Clica em adicionar
          cy.get(':nth-child(4) > .middle > .btn-swipe-accent', {timeout:60000})
            .should('be.visible')
            .click({force: true})

 //Escreve o segundo campo
 cy.get('table.custom-fields-table', { timeout: 60000 })
  .find('input[placeholder="Nome"]')
  .first()
  .should('be.visible')
  .should('not.be.disabled')
  .clear({ force: true })
  .type('Campo Personalizado - 02', { force: true });

   //Selecona o tipo
 cy.get('td .ui-select-container.lector-select', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  // 3. Seleciona "Texto"
cy.contains('.ui-select-choices-row', 'Texto', { timeout: 60000 })
  .click();

          //Clica em adicionar
          cy.get(':nth-child(4) > .middle > .btn-swipe-accent', {timeout:60000})
            .should('be.visible')
            .click({force: true})


      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento

      cy.wait(4000)

    });


 it('Sai do Perfil adm', () => {

    //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

    //Clica em sair
    cy.contains('div.option.menu-option', 'Sair', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(10000)

    });
    */
       it('Entra em outro perfil e envia os Documentos',()=> {

        cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

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
        cy.get('.carousel-container > .showcase-title-container > .middle > .show-all')
        .last()
        .should('be.visible')
        .click()

    });

    it('Clica no Treinamento ', () => {

         //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Campo Personalizado Teste', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()
        


  
    });


  });

});

