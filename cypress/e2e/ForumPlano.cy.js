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

      cy.get(".editing-resource > :nth-child(2) > .w-100").click();
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

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();
    });

    it("Conteúdo - Avaliação (uma por página)", () => {

            cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', {timeout:10000})
            .should('be.visible')
            .click();

           cy.get(".editing-resource > :nth-child(2) > .w-100").click();
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

it('Clica No Treinamento Forum Automação', () => {

    //Clica no treinamento: Gerenciar Teste Automação
  cy.contains('.card-title', /^Forum Automação$/, { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:10000})
      .should('be.visible')
      .click()

      });

       it('Foruns', () => {
      
      //Clica em Matriculados Concuidos
      cy.contains('a', 'Fóruns', { timeout: 10000 })
  .should('be.visible')
  .click()  

    });
    
    it('Adicinar o Forúm', () => {
      cy.wait(1000)

        //Clique em Adicionar
        cy.get('[ng-if="manageSubscriptionsTabs.forums"] > .btn-swipe-accent.ng-scope')
        .click() 

        //Esscreve
      cy.get('input[placeholder="Título"]:visible', { timeout: 20000 })
  .first()
  .click({ force: true })
  .clear({ force: true })
  .type('Titulo Automação Forúm', { force: true })

 // Clica em Exigir aprovação para publicações
  cy.get('.class-forum-editor > :nth-child(5) > .icon-checkbox')
  .click()

  cy.wait(1000)

  //Clica em Habilitar avaliação dos comentários
  cy.get('.class-forum-editor > :nth-child(6) > .icon-checkbox')
  .click()

  // Clica em Decrescente (Mais novos primeiro)
  cy.get('.class-forum-editor > :nth-child(9) > .icon-radio')
  .click()

  //Clica em Salvar
  cy.get('.class-forum-editor > .between > .end > .btn-swipe-accent')
  .click()

  cy.wait(5000)

  cy.get('.btn-publish')
  .should('be.visible')

  cy.wait(1000)

     //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

    cy.wait(1000)

    //Clica na categoria
  cy.get('.breadcrumbs-path > :nth-child(5)')
  .click()

    });

    it('Clica No Treinamento Tutoria Aprovado Automação', () => {

    //Clica no treinamento: Gerenciar Teste Automação
  cy.contains('.card-title', /^Tutoria Aprovado Automação$/, { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:10000})
      .should('be.visible')
      .click()

      });

       it('Plano de Tutoria', () => {
      
      //Clica em Plano de tutoria
      cy.contains('a', 'Plano de tutoria', { timeout: 10000 })
  .should('be.visible')
  .click()  

    });

    it('Adiciona o plano de aluno aprovado', () => {

      cy.wait(1000)

      //Clica em adicionar
      cy.get('[ng-show="manageSubscriptionsTabs.tutorPlan && editingSubscriptionsClass.isTutor"] > .btn-swipe-accent')
      .click()

      cy.wait(1000)

      cy.get('[ng-show="manageSubscriptionsTabs.tutorPlan && editingSubscriptionsClass.isTutor"] > .btn-swipe-accent')
      .click()

cy.wait(1000)

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .should('be.visible')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).click({ force: true })
  })

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).type(
      'Olá #NOME_COMPLETO_ALUNO# voce foi aprovado no #TITULO_TREINAMENTO#',
      { force: true }
    )
  })

  cy.wait(1000)

  //Pega uma imagem
 cy.contains('label', 'Adicionar anexo', { timeout: 60000 })
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/images(1).png', { force: true })

  cy.wait(1000)

  cy.get('[ng-if="showingTutorPlanEditingPanel"] > .end > .btn-swipe-accent')
  .click()

  cy.wait(4000)


//Clica para ver a mensagem
  cy.get('[ng-repeat="tutorPlanItem in tutorPlanList"] > .icon-view')
  .click()

  cy.log('VISUALIZE A MENSAGEM')
  cy.wait(4000)
  
  //Fecha
  cy.get('[switch="tutorItemMailTemplate.show"] > .modal > .between > .btn')
  .click()

   cy.wait(1000)

     //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

    cy.wait(1000)

   //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

    });

      it('Clica No Treinamento Tutoria Expiração Automação', () => {

    //Clica no treinamento: Gerenciar Teste Automação
  cy.contains('.card-title', /^Tutoria Expiração Automação$/, { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:10000})
      .should('be.visible')
      .click()

      });

       it('Plano de Tutoria', () => {
      
      //Clica em Plano de tutoria
      cy.contains('a', 'Plano de tutoria', { timeout: 10000 })
  .should('be.visible')
  .click()  

    });

    it('Adiciona o plano de expiração', () => {

      cy.wait(1000)

      //Clica em adicionar
      cy.get('[ng-show="manageSubscriptionsTabs.tutorPlan && editingSubscriptionsClass.isTutor"] > .btn-swipe-accent')
      .click()

      cy.wait(1000)

      //Clica em expiração
      cy.get('[ng-show="manageSubscriptionsTabs.tutorPlan && editingSubscriptionsClass.isTutor"] > .btn-swipe-accent')
      .click()

      cy.wait(1000)

      //1 DIA NO AVISO DE EXPIRAÇÃO
      cy.get('input[type="number"]', { timeout: 60000 })
  .eq(0)
  .type('1', { force: true })

      cy.wait(1000)

      cy.get('[ng-hide="editingSubscriptionsClass.recurrencyInDays"] > .checkbox > .icon-radio')
      .click()

cy.wait(1000)

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .should('be.visible')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).click({ force: true })
  })

  cy.wait(1000)

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).type(
      'OLÁ #NOME_COMPLETO_ALUNO# SEU TREINAMENTO #TITULO_TREINAMENTO# SERÁ EXPIRADO EM #DATA_EXPIRACAO#',
      { force: true }
    )
  })

  cy.wait(1000)

  //Pega uma imagem
 cy.contains('label', 'Adicionar anexo', { timeout: 60000 })
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/images(1).png', { force: true })

  cy.wait(1000)

  cy.get('[ng-if="showingTutorPlanEditingPanel"] > .end > .btn-swipe-accent')
  .click()

  cy.wait(4000)


//Clica para ver a mensagem
  cy.get('[ng-repeat="tutorPlanItem in tutorPlanList"] > .icon-view')
  .click()

  cy.log('VISUALIZE A MENSAGEM')
  cy.wait(4000)
  
  //Fecha
  cy.get('[switch="tutorItemMailTemplate.show"] > .modal > .between > .btn')
  .click()

   cy.wait(1000)

     //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

    cy.wait(1000)

   //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

    });

       it('Clica No Treinamento Tutoria Prorrogação Automação', () => {

    //Clica no treinamento: Gerenciar Teste Automação
  cy.contains('.card-title', /^Tutoria Prorrogação Automação$/, { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:10000})
      .should('be.visible')
      .click()

      });

       it('Plano de Tutoria', () => {
      
      //Clica em Plano de tutoria
      cy.contains('a', 'Plano de tutoria', { timeout: 10000 })
  .should('be.visible')
  .click()  

    });

    it('Adiciona o plano progresso', () => {

      cy.wait(1000)

      //Clica em adicionar
      cy.get('[ng-show="manageSubscriptionsTabs.tutorPlan && editingSubscriptionsClass.isTutor"] > .btn-swipe-accent')
      .click()

      cy.wait(1000)

      //Clica em progresso
      cy.get('[ng-hide="editingTutorPlanItem.extensionPresent || editingSubscriptionsClass.recurrencyInDays"] > .checkbox > .icon-radio')
      .click()

      cy.wait(1000)

      //1 DIA NO PROGRESSO
      cy.get('input[type="number"]', { timeout: 60000 })
  .eq(1)
  .type('1', { force: true })
  
cy.wait(1000)

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .should('be.visible')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).click({ force: true })
  })

  cy.wait(1000)

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).type(
      'OLÁ #NOME_COMPLETO_ALUNO# SEU TREINAMENTO #TITULO_TREINAMENTO# SERÁ PRORROGADO EM #PRORROGACAO_EM_DIAS# DIAS',
      { force: true }
    )
  })

  cy.wait(1000)

  //Pega uma imagem
 cy.contains('label', 'Adicionar anexo', { timeout: 60000 })
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/images(1).png', { force: true })

  cy.wait(1000)

  cy.get('[ng-if="showingTutorPlanEditingPanel"] > .end > .btn-swipe-accent')
  .click()

  cy.wait(4000)

//Clica para ver a mensagem
  cy.get('[ng-repeat="tutorPlanItem in tutorPlanList"] > .icon-view')
  .click()

  cy.log('VISUALIZE A MENSAGEM')
  cy.wait(4000)
  
  //Fecha
  cy.get('[switch="tutorItemMailTemplate.show"] > .modal > .between > .btn')
  .click()

   cy.wait(1000)

     //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

    cy.wait(1000)

   //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

    });

        it('Clica No Treinamento Tutoria Progresso Automação', () => {

    //Clica no treinamento: Gerenciar Teste Automação
  cy.contains('.card-title', /^Tutoria Progresso Automação$/, { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:10000})
      .should('be.visible')
      .click()

      });

       it('Plano de Tutoria', () => {
      
      //Clica em Plano de tutoria
      cy.contains('a', 'Plano de tutoria', { timeout: 10000 })
  .should('be.visible')
  .click()  

    });

    it('Adiciona o plano de progresso', () => {

      cy.wait(1000)

      //Clica em adicionar
      cy.get('[ng-show="manageSubscriptionsTabs.tutorPlan && editingSubscriptionsClass.isTutor"] > .btn-swipe-accent')
      .click()

      cy.wait(1000)

      //Clica em progresso
      cy.get(':nth-child(4) > .checkbox > .icon-radio')
      .click()

      cy.wait(1000)

      //1 DIA NO PROGRESSO
      cy.get('input[type="number"]', { timeout: 60000 })
  .eq(2)
  .type('1', { force: true })
  
cy.wait(1000)

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .should('be.visible')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).click({ force: true })
  })

  cy.wait(1000)

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).type(
      'OLÁ #NOME_COMPLETO_ALUNO# VOCE TEVE PROGRESSO NO TREINAMENTO #TITULO_TREINAMENTO#',
      { force: true }
    )
  })

  cy.wait(1000)

  //Pega uma imagem
 cy.contains('label', 'Adicionar anexo', { timeout: 60000 })
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/images(1).png', { force: true })

  cy.wait(1000)

  cy.get('[ng-if="showingTutorPlanEditingPanel"] > .end > .btn-swipe-accent')
  .click()

  cy.wait(4000)

//Clica para ver a mensagem
  cy.get('[ng-repeat="tutorPlanItem in tutorPlanList"] > .icon-view')
  .click()

  cy.log('VISUALIZE A MENSAGEM')
  cy.wait(4000)
  
  //Fecha
  cy.get('[switch="tutorItemMailTemplate.show"] > .modal > .between > .btn')
  .click()

   cy.wait(1000)

     //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

    cy.wait(1000)

   //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

    });

        it('Clica No Treinamento Tutoria Inatividade Automação', () => {

    //Clica no treinamento: Gerenciar Teste Automação
  cy.contains('.card-title', /^Tutoria Inatividade Automação$/, { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:10000})
      .should('be.visible')
      .click()

      });

       it('Plano de Tutoria', () => {
      
      //Clica em Plano de tutoria
      cy.contains('a', 'Plano de tutoria', { timeout: 10000 })
  .should('be.visible')
  .click()  

    });

    it('Adiciona o plano de expiração', () => {

      cy.wait(1000)

      //Clica em adicionar
      cy.get('[ng-show="manageSubscriptionsTabs.tutorPlan && editingSubscriptionsClass.isTutor"] > .btn-swipe-accent')
      .click()

      cy.wait(1000)

      //Clica em INATIVO
      cy.get(':nth-child(5) > .checkbox > .icon-radio')
      .click()

      cy.wait(1000)

      //1 EM INATIVO
      cy.get('input[type="number"]', { timeout: 60000 })
  .eq(3)
  .type('1', { force: true })
  
cy.wait(1000)

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .should('be.visible')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).click({ force: true })
  })

  cy.wait(1000)

cy.get('iframe.cke_wysiwyg_frame', { timeout: 60000 })
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then((body) => {
    cy.wrap(body).type(
      'OLÁ #NOME_COMPLETO_ALUNO# VOCE ESTÁ INATIVO NO TREINAMENTO #TITULO_TREINAMENTO# POR #TEMPO_INATIVO_SEGUNDOS#',
      { force: true }
    )
  })

  cy.wait(1000)

  //Pega uma imagem
 cy.contains('label', 'Adicionar anexo', { timeout: 60000 })
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/images(1).png', { force: true })

  cy.wait(1000)

  cy.get('[ng-if="showingTutorPlanEditingPanel"] > .end > .btn-swipe-accent')
  .click()

  cy.wait(4000)

//Clica para ver a mensagem
  cy.get('[ng-repeat="tutorPlanItem in tutorPlanList"] > .icon-view')
  .click()

  cy.log('VISUALIZE A MENSAGEM')
  cy.wait(4000)
  
  //Fecha
  cy.get('[switch="tutorItemMailTemplate.show"] > .modal > .between > .btn')
  .click()

   cy.wait(1000)

     //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()

    cy.wait(1000)

   //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})

    });

  });

});
