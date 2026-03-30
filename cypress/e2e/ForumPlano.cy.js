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
    
     it("Clica na aba treinamento", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

         //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

     });
/*
      it('Cria o treinamento Forum Automação', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Forum Automação") //  Nome no Treinamento

    })

     it("Conteúdo - Documento JPEG", () => {

      //Clica em conteudos
            cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:10000})
            .scrollIntoView()
            .should('be.visible')
            .click();

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();

      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 10000 })
        .should("have.length", 1)
        .type("CAPA 19.jpg", { delay: 10 });

      cy.contains(
        ".ui-select-choices-row",
        "CAPA 19.jpg",
        { timeout: 10000 },
      )
        .should("be.visible")
        .click({ force: true });

        //Peso 1
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

    it('Turma Gratuita sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita sem aprovação"); //nome da turma
     cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação

     //Clica nos Tutores
     cy.get(':nth-child(7) > .multiselect > [name="UserOwnerSelect"] > :nth-child(1) > .ui-select-search')
     .scrollIntoView()
     .click()

     cy.wait(2000)

     //Clica em Thiago Laguna
     cy.contains('.ui-select-choices-row','Thiago Laguna', {timeout:10000})
     .click()

    cy.wait(2000)
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
     
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
        .type("Aluno")

        cy.wait(1000)

         cy.get('.ui-select-choices-row:visible', { timeout: 20000 })
  .contains(/^Aluno$/)
  .click({ force: true })

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

      cy.wait(5000)

    });
    */
      it('Cria o treinamento Tutoria Aprovado Automação', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Tutoria Aprovado Automação") //  Nome no Treinamento
    
    })

     it("Conteúdo - Documento JPEG", () => {

      //Clica em conteudos
            cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:10000})
            .scrollIntoView()
            .should('be.visible')
            .click();

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();

      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 10000 })
        .should("have.length", 1)
        .type("CAPA 19.jpg", { delay: 10 });

      cy.contains(
        ".ui-select-choices-row",
        "CAPA 19.jpg",
        { timeout: 10000 },
      )
        .should("be.visible")
        .click({ force: true });

        //Peso 1
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });
  
    it('Turma Gratuita sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita sem aprovação"); //nome da turma
     cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação

     
     //Clica nos Tutores
     cy.get(':nth-child(7) > .multiselect > [name="UserOwnerSelect"] > :nth-child(1) > .ui-select-search')
     .scrollIntoView()
     .click()

     cy.wait(2000)

     //Clica em Thiago Laguna
     cy.contains('.ui-select-choices-row','Thiago Laguna', {timeout:10000})
     .click()

    cy.wait(2000)
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
    
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
        .type("Aluno")

        cy.wait(1000)

         cy.get('.ui-select-choices-row:visible', { timeout: 20000 })
  .contains(/^Aluno$/)
  .click({ force: true })

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

            cy.wait(5000)

    });

      it('Cria o treinamento Tutoria Expiração', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Tutoria Expiração Automação") //  Nome no Treinamento
    
    })

     it("Conteúdo - Documento JPEG", () => {

      //Clica em conteudos
            cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:10000})
            .scrollIntoView()
            .should('be.visible')
            .click();

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();


      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 10000 })
        .should("have.length", 1)
        .type("CAPA 19.jpg", { delay: 10 });

      cy.contains(
        ".ui-select-choices-row",
        "CAPA 19.jpg",
        { timeout: 10000 },
      )
        .should("be.visible")
        .click({ force: true });

        //Peso 1
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });
  
    it('Turma Gratuita sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita sem aprovação"); //nome da turma
     cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação

     //Clica nos Tutores
     cy.get(':nth-child(7) > .multiselect > [name="UserOwnerSelect"] > :nth-child(1) > .ui-select-search')
     .scrollIntoView()
     .click()

     cy.wait(2000)

     //Clica em Thiago Laguna
     cy.contains('.ui-select-choices-row','Thiago Laguna', {timeout:10000})
     .click()

    cy.wait(2000)
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
   
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
        .type("Aluno")

        cy.wait(1000)

         cy.get('.ui-select-choices-row:visible', { timeout: 20000 })
  .contains(/^Aluno$/)
  .click({ force: true })

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

            cy.wait(5000)
      
    });

      it('Cria o treinamento Tutoria Prorrogação', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Tutoria Prorrogação Automação") //  Nome no Treinamento
    
    })

     it("Conteúdo - Documento JPEG", () => {

      //Clica em conteudos
            cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:10000})
            .scrollIntoView()
            .should('be.visible')
            .click();

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();


      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 10000 })
        .should("have.length", 1)
        .type("CAPA 19.jpg", { delay: 10 });

      cy.contains(
        ".ui-select-choices-row",
        "CAPA 19.jpg",
        { timeout: 10000 },
      )
        .should("be.visible")
        .click({ force: true });

        //Peso 1
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });
  
    it('Turma Gratuita sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita sem aprovação"); //nome da turma
     cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação

     //Clica nos Tutores
     cy.get(':nth-child(7) > .multiselect > [name="UserOwnerSelect"] > :nth-child(1) > .ui-select-search')
     .scrollIntoView()
     .click()

     cy.wait(2000)

     //Clica em Thiago Laguna
     cy.contains('.ui-select-choices-row','Thiago Laguna', {timeout:10000})
     .click()

    cy.wait(2000)
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
   
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
        .type("Aluno")

        cy.wait(1000)

         cy.get('.ui-select-choices-row:visible', { timeout: 20000 })
  .contains(/^Aluno$/)
  .click({ force: true })

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

            cy.wait(5000)

    });

       it('Cria o treinamento Tutoria Progresso', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Tutoria Progresso Automação") //  Nome no Treinamento
    
    })

     it("Conteúdo - Documento JPEG", () => {

      //Clica em conteudos
            cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:10000})
            .scrollIntoView()
            .should('be.visible')
            .click();

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();

      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 10000 })
        .should("have.length", 1)
        .type("CAPA 19.jpg", { delay: 10 });

      cy.contains(
        ".ui-select-choices-row",
        "CAPA 19.jpg",
        { timeout: 10000 },
      )
        .should("be.visible")
        .click({ force: true });

        //Peso 1
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

    
    it("Conteúdo - Documento PPTX", () => {

         cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();

      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 60000 })
        .should("have.length", 1)
        .type("Certificado 14.02.2024", { delay: 10 });

      cy.contains(".ui-select-choices-row", "Certificado 14.02.2024", {
        timeout: 60000,
      })
        .should("be.visible")
        .click({ force: true });

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();
    });

    it("Conteúdo - Documento DOC", () => {

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();

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

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();
    });

    it("Conteúdo - Avaliação (uma por página)", () => {

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();

      cy.get(".open > .ui-select-choices > :nth-child(3)").click(); // Avaliação

      cy.contains(".ui-select-container", "Escolha uma avaliação")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 60000 })
        .should("have.length", 1)
        .type("uma por página Thiago", { delay: 10 });

      cy.contains(".ui-select-choices-row", "uma por página Thiago", {
        timeout: 60000,
      })
        .should("be.visible")
        .click({ force: true });

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });
  
    it('Turma Gratuita sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita sem aprovação"); //nome da turma
     cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação

     //Clica nos Tutores
     cy.get(':nth-child(7) > .multiselect > [name="UserOwnerSelect"] > :nth-child(1) > .ui-select-search')
     .scrollIntoView()
     .click()

     cy.wait(2000)

     //Clica em Thiago Laguna
     cy.contains('.ui-select-choices-row','Thiago Laguna', {timeout:10000})
     .click()

    cy.wait(2000)
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
   
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
        .type("Aluno")

        cy.wait(1000)

         cy.get('.ui-select-choices-row:visible', { timeout: 20000 })
  .contains(/^Aluno$/)
  .click({ force: true })

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

            cy.wait(5000)

    });

       it('Cria o treinamento Tutoria Tempo de Inatividade', () => {
        
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Tutoria Inatividade Automação") //  Nome no Treinamento
    
    })

     it("Conteúdo - Documento JPEG", () => {

      //Clica em conteudos
            cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', {timeout:10000})
            .scrollIntoView()
            .should('be.visible')
            .click();

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();

      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

      cy.contains(".ui-select-container", "Escolha um documento")
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 10000 })
        .should("have.length", 1)
        .type("CAPA 19.jpg", { delay: 10 });

      cy.contains(
        ".ui-select-choices-row",
        "CAPA 19.jpg",
        { timeout: 10000 },
      )
        .should("be.visible")
        .click({ force: true });

        //Peso 1
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });
  
    it('Turma Gratuita sem aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Gratuita sem aprovação"); //nome da turma
     cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação

     //Clica nos Tutores
     cy.get(':nth-child(7) > .multiselect > [name="UserOwnerSelect"] > :nth-child(1) > .ui-select-search')
     .scrollIntoView()
     .click()

     cy.wait(2000)

     //Clica em Thiago Laguna
     cy.contains('.ui-select-choices-row','Thiago Laguna', {timeout:10000})
     .click()

    cy.wait(2000)
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
       cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
   
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
        .type("Aluno")

        cy.wait(1000)

         cy.get('.ui-select-choices-row:visible', { timeout: 20000 })
  .contains(/^Aluno$/)
  .click({ force: true })

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

            cy.wait(5000)
      
    });

  });

});
