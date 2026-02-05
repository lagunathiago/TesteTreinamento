/*
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Cannot read properties of null') &&
      err.message.includes('charAt')) {
    return false
  }
})

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Cannot read properties of null") ||
    err.message.includes("charAt")
  ) {
    return false;
  }
});
*/
Cypress.on("uncaught:exception", (err) => {
  const msg = err.message || "";

  // Ignora erros conhecidos do Angular que não quebram o fluxo do teste
  if (
    msg.includes("Cannot read properties of null") &&
    (
      msg.includes("remove") ||
      msg.includes("charAt")
    )
  ) {
    return false;
  }
});



describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

  context("Teste Login", () => {
    
      it("Teste Login", () => {

        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="42"]',{timeout:60000})
      .should('be.visible')
      .click() 
       
   });

      it("Criar Treinamento/Aba Geral", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Campo Personalizado + Aprovação de Gestor + Analise Financeira") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Teste Analise1.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    })

    it("Adicionar Conteúdo", () => {

        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        //Doc
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        
         cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })

    it('Criando turma do treinamento', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Teste Automação 1"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
      cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente 
      cy.get('.column > :nth-child(1) > .input-number > div > .icon-pointer-up')//Clica 2x para ficar a parcela em 4x
  .click()
  .click();

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna',{timeout:60000})
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    });
    
         it('Adicinando a aprovação de campos personalizado', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica no campo "04.12"
            cy.get('#ui-select-choices-row-51-0',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Adicionar segundo campo
            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica no campo "Novo Campo 04.12"
            cy.get('#ui-select-choices-row-51-1',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(4000)

    });

      it("Criar Treinamento 2 /Aba Geral", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 1 minuto
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Campo Personalizado 2 + Aprovação de Gestor 2 + Analise Financeira 2") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Teste Analise 2.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    })

    it("Adicionar Conteúdos", () => {

        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        //Doc
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        
         cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })

    it('Criando a turma do treinamento', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Teste Automação 2"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   
      cy.get('.checkbox.mt-20.ng-scope > .icon-checkbox').click() //Clica em recorrente 
      cy.get('.column > :nth-child(1) > .input-number > div > .icon-pointer-up')//Clica 2x para ficar a parcela em 5x
  .click()
  .click()
  .click()
  
    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna',{timeout:60000})
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

    });
    
         it('Adicinando a aprovação de campos personalizado', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})
            
            //Clica em requer aprovação
            cy.get('.mb-20.ng-scope > .checkbox > .icon-checkbox',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica no campo "teste 09/12/2025 campo"
            cy.get('#ui-select-choices-row-51-2',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            cy.wait(1000)

            //Adicionar segundo campo
            //Clica em 'Selecionar um campo personalizado"
            cy.get('.flex > .ng-isolate-scope > .multiselect > .border > .ui-select-match > .btn-default',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica no campo "novo campo 17/12"
            cy.get('#ui-select-choices-row-51-5',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em adicionar 
            cy.get('.flex > .middle > .btn-swipe-accent',{timeout:60000})
            .should('be.visible')
            .click({force:true})

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(4000)

    });

it("Treinamento com aprovação, Aceitar Matricula", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) //
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento com aprovação, Aceitar Matricula") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Teste Analise 3.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    })

    it("Conteúdos", () => {

        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        //Doc
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        
         cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    })

    it('Turma Paga á vista com aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Teste Automação 3"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna')
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(3000)

    });



    it("Treinamento com aprovação, Cancelar Analise", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) //
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Treinamento com aprovação, Cancelar Analise") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Teste Analise 4.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

        //Codigo do treinamento 
        cy.get('[external-id=""] > .w-100').click()
        cy.get('[external-id=""] > .w-100').type("012025")

    })

    it("Conteúdos", () => {

        cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        //Doc
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
        cy.get(".weight").type("1");                                                   // Selecionar peso
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
        
         cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Minha')
  })

 cy.contains(
  '.ui-select-choices-row',
  'Minha Área - Adm.pdf',
  { timeout: 30000 }
)
  .should('be.visible')
  .click()

cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

    it('Turma Paga á vista com aprovação', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Teste Automação 3"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91');   

    cy.get('.field2 > div.mt-20 > .middle > .checkbox > .icon-checkbox').click() //Deixar em branco
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      
     cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("thiago laguna")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Thiago Laguna')
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()

      cy.wait(1000)

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

      cy.wait(3000)

    });

    it("Muda para o perfil aluno", ()=> {

        //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.get('.icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Aluno
  cy.get('.user-options-items > :nth-child(2) > ng-transclude', { timeout: 60000 })
  .should('be.visible')
  .click()

    })

     it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(9)', { timeout: 60000 })
        .should('be.visible')
        .click();
       
   });

  it('Ver tudo',()=> {

     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();
  })

  it('Envia Aprovação no Treinamento com aprovação, aceitar Matricula',()=> {

    //Clica no Treinamento
       cy.get(':nth-child(4) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

  })

  it('Envia Aprovação no Treinamento com aprovação, aceitar Matricula',()=> {

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

    //Clica no Treinamento
       cy.get(':nth-child(5) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(3000)

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

  });

  

   it("Envia os campos do Primeiro treiamento", () => {

        //Clica no Treinamento
        cy.get(':nth-child(2) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Teste Campo Automatização 01');

  cy.get('#customField_1')
    .clear()
    .type('Teste Campo Automatização 02');
});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

    it("Envia os campos do  Segundo treiamento", () => {

        //Clica no Treinamento
        cy.get(':nth-child(3) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em comprar
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();
 
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Teste Campo Automatização 03');
});

//Envia a imagem no quarto campo
cy.get('.modal > form.ng-valid > :nth-child(2) > .middle > label').selectFile('cypress/fixtures/images6.png', { force: true });

cy.wait(3000)

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

    cy.wait(4000)

  // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

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

    it("Aceita os campos", () => {

     //Clioca no icon de notivicações
    cy.get('button[title="Notificações"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Clica em visualizar nos documento
  cy.get(':nth-child(1) > .approval-box > .column > .approval-buttons > .btn-swipe-accent', { timeout: 60000 })
  .should('be.visible')
  .click();

  //Aceita o primeiro documento
  cy.get(':nth-child(3) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

  //Aceita o segundo documento
  cy.get(':nth-child(4) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

   //Aceita o aceita o terceiro documento
  cy.get(':nth-child(5) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

   //Aceita o quarto documento
  cy.get(':nth-child(6) > :nth-child(12) > .btn',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)
 
  // Salva a ação feita
cy.get('.modal:visible', { timeout: 60000 })
  .contains('button', 'Salvar')
  .should('be.visible')
  .click({ force: true });

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
    
       it('Entra em outro perfil e envia para analise ',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

    it("Envia para analise no Primeiro treinamento", () => {

     // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="42"]',{timeout:60000})
      .should('be.visible')
      .click()
      
      //Clica no treinamento
      cy.get(':nth-child(1) > .card-items',{timeout:60000})
      .should('be.visible')
      .click()
      
      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Envia pra analise
  cy.get('button.btn-swipe-accent', { timeout: 60000 })
  .contains('Análise financeira')
  .click();

  //Confirma analise
  cy.get('#confirmModalConfirm', { timeout: 20000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()
  
   });

 it("Envia para analise no Segundo treinamento", () => {

  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(5)',{ timeout: 60000 })
  .should('be.visible')
  .click()

//Clica no segundo treinamento
  cy.get('.card-items', { timeout: 60000 })
  .should('have.length.greaterThan', 1)
  .eq(1) // segundo card (index começa em 0)
  .scrollIntoView()
  .click()

      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

//Envia para analise
  cy.get('button.btn-swipe-accent', { timeout: 60000 })
  .contains('Análise financeira')
  .click();

 //Confirma analise
 cy.get('#confirmModalConfirm', { timeout: 20000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click();

    });

    it("Aprova o Treinamento", () => {
      
  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(5)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica no segundo treinamento
  cy.get('.card-items', { timeout: 60000 })
  .should('have.length.greaterThan', 2)
  .eq(2) // segundo card (index começa em 0)
  .scrollIntoView()
  .click()

      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Aprova denovo
  cy.get('button[ng-click="modal.approveBatchSubscriptions = true"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });


  //Aprovar a matricula
  cy.get('button[ng-click="batchProcessSubscriptionsRequests(true)"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  
//Clica em Desenpenho
  cy.contains('a', 'Desempenho', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica em agurdando pagamento
  cy.contains('a', 'Aguardando pagamento', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

  //Clica no usuario para ver se ele está em aguardando treinamento, não usei o contains para poder fazer a automação com quanquer usuario
  cy.get('.odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click();

    });
  
    it("Envia para analise", () => {
      
  //Volta para categoria
  cy.get('.breadcrumbs-path > :nth-child(5)',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Clica no quarto treinamento
  cy.get('.card-items', { timeout: 60000 })
  .should('have.length.greaterThan', 3)
  .eq(3) // segundo card (index começa em 0)
  .scrollIntoView()
  .click()

      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

  //Envia Aprovar
  cy.get('button.btn-swipe-accent', { timeout: 60000 })
  .contains('Análise financeira')
  .click();

 //Confirma
 cy.get('#confirmModalConfirm', { timeout: 20000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click();
  
    });

it("Vai até os relatóros", ()=> {

    //Clica em relatórios
    cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

          cy.wait(5000)

    //Clica em Compras/Relatório
    cy.contains('li.list-group-item.node-report-categories', 'Compras', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

    cy.wait(3000)

});

     it('Pesquisa o Primeiro treinamento e Aprova a compra', ()=> {

      cy.wait(3000)
      
  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Campo Personalizado + Aprovação de Gestor + Analise Financeira', { delay: 30 });

    cy.wait(3000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

//Clica em Revisar pagamento
  cy.get('button')
  .filter(':contains("Revisar pagamentos")')
  .last()
  .scrollIntoView()
  .click({ force: true });

    cy.wait(2000)

// validar valor da parcela
cy.contains('R$3.91').should('be.visible')

// validar valor total com desconto
cy.contains('R$15.64').should('be.visible')

//Clica em aprvovar compra
cy.contains('button', 'Aprovar compra', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

  cy.wait(2000)

    });

     it('Pesquisa o Segundo treinamento e Aprova a compra', ()=> {

      cy.wait(3000)
      
  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Campo Personalizado 2 + Aprovação de Gestor 2 + Analise Financeira 2', { delay: 30 });

    cy.wait(3000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

  //Clica em revisar pagamento
  cy.get('button')
  .filter(':contains("Revisar pagamentos")')
  .last()
  .scrollIntoView()
  .click({ force: true });

    cy.wait(2000)

// validar valor da parcela
cy.contains('R$3.91').should('be.visible')

// validar valor total com desconto
cy.contains('R$19.55').should('be.visible')

//Clica em aprvovar compra
cy.contains('button', 'Aprovar compra', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

  cy.wait(2000)

    });

    it('Pesquisa o Treinamento e Cancela a Analise', ()=> {
      cy.wait(3000)
      
  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Treinamento com aprovação, Cancelar Analise', { delay: 30 });

    cy.wait(3000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

//Clica em Revisar pagamento
  cy.get('button')
  .filter(':contains("Revisar pagamentos")')
  .last()
  .scrollIntoView()
  .click({ force: true });

    cy.wait(2000)

// validar valor da parcela
cy.contains('R$3.91').should('be.visible')

//Clica em Cancelar compra
cy.contains('button', 'Cancelar análise financeira', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

  cy.wait(2000)

    });
    it('Verifica se o aluno está em Aguardando Pagamento', ()=> {

      // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Clica na Categoria automação
      cy.get('[data-nodeid="42"]',{timeout:60000})
      .should('be.visible')
      .click() 

   //Clica no quarto treinamento
  cy.get('.card-items', { timeout: 60000 })
  .should('have.length.greaterThan', 3)
  .eq(3) // segundo card (index começa em 0)
  .scrollIntoView()
  .click()

      //Clica em gerenciar
      cy.get('.manage-subscription > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

     //Solicitação de matricula
      cy.contains('a', 'Solicitações de matrícula', { timeout: 60000 })
  .should('be.visible')
  .click()

//clica no usuario
  cy.get('#pending-subscriptions-table > tbody > .odd > .select-checkbox',{ timeout: 60000 })
  .should('be.visible')
  .click()

 //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(2000)

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

    });

    it('Entra no perfil aluno para validar os boletos',()=> {

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("2006lrnrgr");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

    it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(9)', { timeout: 60000 })
        .should('be.visible')
        .click();

    });
    
it('Emite o boleto do primeiro treinamento com campos personalizado', ()=> {

        //Clica no Treinamento
        cy.get(':nth-child(2) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em efetuar pagamento
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(2000)

        //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });


    it("Emite o boleto do treinamento com aprovação", () => {

      //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
        cy.get(':nth-child(4) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em efetuar pagamento
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

         cy.wait(2000)

         //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   it("Emite o boleto do segundo treinamento que tem campos persozalizado", () => {

        //Clica no Treinamento
        cy.get(':nth-child(4) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica em efetuar pagamento
        cy.get('.classes-actions > :nth-child(1) > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click();

         cy.wait(2000)

         //Fecha o modal do boleto
        cy.get('modal-header > div > .btn', {timeout:6000})
        .should('be.visible')
        .click()

        // volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

   });

   

    it("Vai em minhas aréas", () => {
      //Minha área
      cy.contains("span", "Minha Área", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Minhas compras
      cy.contains("button.showcase-home-menu-item", "Minhas Compras", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();
    });
    it("Valida a primeira compra", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Campo Personalizado + Aprovação de Gestor + Analise Financeira", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(300); // micro-wait só pra estabilizar render (bem pequeno)

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $last = $rows.last();
          expect($last.find("td.priceColumn").text()).to.contain("R$ 15.64");
        },
      );

      //clica no ultimo
      cy.get("#mypurchases-table tbody tr", { timeout: 20000 })
        .should("have.length.greaterThan", 0)
        .last()
        .within(() => {
          cy.get("button.bb-slip", { timeout: 20000 })
            .should("be.visible")
            .click({ force: true });
        });

      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");

      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

      cy.get('iframe#bb-boleto', { timeout: 30000 })
  .its('0.contentDocument.body').should('not.be.empty')
  .then(cy.wrap)
  .contains('div.cell.texto-a-direita', 'Valor Cobrado', { timeout: 30000 })
  .last()   // <- pega o último "Valor Cobrado"
  .invoke('text')
  .then((t) => {
    const txt = t.replace(/\s/g, '').replace(',', '.');
    expect(txt).to.include('3.91');
  });

         cy.log('VALIDE SE O SEU NOME E CPF ESTÁ CERTO')
        cy.wait(10000);
         cy.log('VALIDE SE O SEU NOME E CPF ESTÁ CERTO')

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

    });

    it("Valida a segunda compra", () => {

      cy.get('.showcase-head-2 > .btn', { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

        cy.contains("span", "Minha Área", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Minhas compras
      cy.contains("button.showcase-home-menu-item", "Minhas Compras", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();
  
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Campo Personalizado 2 + Aprovação de Gestor 2 + Analise Financeira 2", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).should(
        "have.length.greaterThan",
        0,
      );

      cy.wait(300); // micro-wait só pra estabilizar render (bem pequeno)

      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $last = $rows.last();
          expect($last.find("td.priceColumn").text()).to.contain("R$ 19.55");
        },
      );

      //clica no ultimo
       cy.get("#mypurchases-table tbody tr", { timeout: 20000 })
        .should("have.length.greaterThan", 0)
        .last()
        .within(() => {
          cy.get("button.bb-slip", { timeout: 20000 })
            .should("be.visible")
            .click({ force: true });
        });

      cy.wait(2000);

      //Após clicar no código de barras, o Cypress valida a exibição do popup da linha digitável.
      cy.wait(1000);
      cy.get(".icon-barcode", { timeout: 20000 })
        .should("exist")
        .click({ force: true });

      cy.log("Validação da exibição do popup do código de barra");

      // valida toast
      cy.contains("Linha digitável copiada para a área de transferência", {
        timeout: 10000,
      }).should("exist");

      cy.wait(1000);
      //Após clicar no pix, o Cypress valida a exibição do popup do pix.
      cy.get(".icon-pix", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

      cy.log("Validação da exibição do popup do pix");

      cy.contains("Chave Pix copiada para a área de transferência", {
        timeout: 10000,
      }).should("be.visible");

      //Abri o boleto
      cy.get(".icon-download", { timeout: 20000 })
        .should("be.visible")
        .click({ force: true });

       cy.log('VALIDE NOME E CFP NO BOLETO')

      cy.wait(1000);

        cy.get('iframe#bb-boleto', { timeout: 30000 })
  .its('0.contentDocument.body').should('not.be.empty')
  .then(cy.wrap)
  .contains('div.cell.texto-a-direita', 'Valor Cobrado', { timeout: 30000 })
  .last()   // <- pega o último "Valor Cobrado"
  .invoke('text')
  .then((t) => {
    const txt = t.replace(/\s/g, '').replace(',', '.');
    expect(txt).to.include('3.91');
  });

        cy.log('VALIDE SE O SEU NOME E CPF ESTÁ CERTO')
        cy.wait(10000);
         cy.log('VALIDE SE O SEU NOME E CPF ESTÁ CERTO')

      //Fecha o boleto
      cy.get("#modal-paymentBB", { timeout: 20000 }).should("exist");

      cy.get("#modal-paymentBB button.icon-close").click({ force: true });

      //Fecha o segundo modal
      cy.get("#bbSlipsDialog > .modal > .between > .btn", { timeout: 20000 })
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

    it("Vai até os relatóros", ()=> {

    //Clica em relatórios
    cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

          cy.wait(5000)

    //Clica em Compras/Relatório
    cy.contains('li.list-group-item.node-report-categories', 'Compras', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

    cy.wait(3000)

});

     it('Visualização e Edição de Pagamentos (Modal/Datas)', ()=> {

      cy.wait(3000)
      
  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Campo Personalizado + Aprovação de Gestor + Analise Financeira', { delay: 30 });

    cy.wait(3000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

//Clica em Revisar pagamento
  cy.get('button')
  .filter(':contains("Revisar pagamentos")')
  .last()
  .scrollIntoView()
  .click({ force: true });

    cy.wait(2000)

// validar valor da parcela
cy.contains('R$3.91').should('be.visible')

// validar valor total com desconto
cy.contains('R$15.64').should('be.visible')

//Clica em aprvovar compra
cy.contains('button', 'Aprovar compra', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

  cy.wait(2000)

    });

     it('Pesquisa o Segundo treinamento e Aprova a compra', ()=> {

      cy.wait(3000)
      
  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Campo Personalizado 2 + Aprovação de Gestor 2 + Analise Financeira 2', { delay: 30 });

    cy.wait(3000)

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

  //Clica em revisar pagamento
  cy.get('button')
  .filter(':contains("Revisar pagamentos")')
  .last()
  .scrollIntoView()
  .click({ force: true });

    cy.wait(2000)

// validar valor da parcela
cy.contains('R$3.91').should('be.visible')

// validar valor total com desconto
cy.contains('R$19.55').should('be.visible')

//Clica em aprvovar compra
cy.contains('button', 'Aprovar compra', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .click()

  cy.wait(2000)

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
    

    it("Vai até os relatóros", ()=> {

    //Clica em relatórios
    cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should('be.visible')
        .click();

          cy.wait(3000)

    //Clica em Compras/Relatório
    cy.contains('li.list-group-item.node-report-categories', 'Compras', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

    cy.wait(3000)

});

     it('Visualização e Edição de Pagamentos (Modal/Datas)', ()=> {

      
  //Escreve
        cy.get('.report-filters', { timeout: 10000 })
  .find('input[ng-model="filter.text"]')
  .filter(':visible')
  .eq(1) // garante só 1
  .should('be.visible')
  .clear()
  .type('Teste 04/02');

  //Clique em pesquisar
  cy.get(':nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

//Clica em Revisar pagamento
  cy.get('button')
  .filter(':contains("Revisar pagamentos")')
  .last()
  .scrollIntoView()
  .click({ force: true });

    });

    it('Altere a data de vencimento', ()=> {

  //ve se tem sim no modal
    cy.contains('td', 'Sim').should('be.visible')

    //Clica em alterar data de vencimento
    cy.contains('button', 'Alterar vencimento')
      .should('be.visible')
      .click()

      //Modal "Alterar boleto" já aberto
cy.get('div.modal:visible', { timeout: 20000 })
  .last()
  .within(() => {
    cy.get('input.datetimepicker')
      .should('be.visible')
      .click({ force: true })

  })
  
  cy.log('ALTERE PARA UMA DATA NO FUTURO E NO PASSADO, NÃO DEVE DEIXAR')
  cy.wait(20000)
  cy.log('ALTERE PARA UMA DATA NO FUTURO E NO PASSADO, NÃO DEVE DEIXAR')

    });
   });
  });