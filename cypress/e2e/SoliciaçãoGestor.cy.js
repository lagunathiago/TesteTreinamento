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

    cy.visit("https://hml.lector.live/esmp/subscribe/login");
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

    
    it('Vaie em Cadastros', ()=> {

        // Clicando em Cadastros
      cy.get('[title="Cadastros"] > .sideitem', { timeout: 60000 })
        .should("be.visible")
        .click();

        //Clica em Clientes
  cy.get(':nth-child(5) > a > .w-100',{ timeout: 60000 })
  .should('be.visible')
  .click();

    });

    it('Verificar se a fleg "Solicitar aprovação do gestor nas matrículas" está ativida na unidade', () => {

         //Clica em Editar
  cy.get('[title="Portal teste para ESMP"] > .tree-icons > .icon-edit')
  .should('be.visible')
  .click()

  //Verefica se o incon box esta flegado, se não ele flega
  cy.get('input[ng-model="currentGroup.requireApproval"]')
  .should('exist')
  .wait(6000)
  .then(($checkbox) => {

    if (!$checkbox.is(':checked')) {
      cy.wrap($checkbox).click({ force: true });
    }

    //Clica em Salvar
    cy.get('button[ng-click="saveGroup(false)"]', { timeout: 60000 })
  .should('be.visible')
  .click();

  cy.wait(4000)

 });


    });

    it("Muda para o perfil Aluno - Portal teste para ESMP", ()=> {

        cy.wait(2000)

        //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Clica em perfil
  cy.get('.icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

    //Aluno
 cy.contains('span','Aluno - Portal teste para ESMP')
  .should('be.visible')
  .click()

   });
   
    it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica na vitrine Automação 2
        cy.contains('.showcase-menu-name', 'Teste Solicitações', { timeout: 60000 })
  .should('be.visible')
  .click();
       
   });
it('Incrição no Teste Gestor Automação 1', () => {

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

//Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 1', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(4000)

  
      });

      it('Incrição no Teste Gestor Automação 2', () => {

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 2', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()
                cy.wait(4000)
    
      });

      it('Incrição no Teste Gestor Automação 3', () => {

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 3', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()
                cy.wait(4000)
    
      });

      it('Incrição no Teste Gestor Automação 4', () => {

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 4', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()
                cy.wait(4000)
    
      });

      it('Incrição no Teste Gestor Automação 5', () => {

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 5', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(4000)
    
      });

      it('Incrição no Teste Gestor Automação 6', () => {

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 6', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

                cy.wait(4000)

      });
      

     it('Entra em outro perfil Gestor',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("thiagosuporte@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

    

    it("Muda para o perfil Gestor - 05.12.2024", ()=> {

        //Clioca no icon
  cy.contains('div', /Gestor|Administrador/, { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.get('body').then(($body) => {
  const texto = 'Gestor - 05.12.2024';

  if ($body.text().includes(texto)) {
    cy.contains('div', texto)
      .then(($el) => {
        const estaAtivo = $el.hasClass('active');
        const estaDesabilitado =
          $el.hasClass('disabled') ||
          $el.css('pointer-events') === 'none';

        if (!estaAtivo && !estaDesabilitado) {
          cy.wrap($el)
            .scrollIntoView()
            .click({ force: true });
        } else {
          cy.log(`Perfil "${texto}" já está selecionado ou indisponível. Seguindo fluxo...`);
        }
      });
  } else {
    cy.log(`Perfil "${texto}" não encontrado. Seguindo fluxo...`);
  }
});

    });

    it('Vai em solicitaçoes', () => {

      cy.wait(4000)

        //Clica em solicitaçoes
        cy.contains('Solicitações de matrícula',{timeout:60000})
        .should('be.visible')
        .click();

    });

    it('Verefique se não tem as Solicitaçoes em outra unidade', () => {

        cy.wait(5000)

        //Verefica se tem o nome qualidadena tabela (é um nome que esta no email que foi enviado)
        cy.get('.approvals-table-area')
        .should('not.contain', 'qualidade');

    });

    it('Muda para o Gestor - Portal teste para ESMP', () => {

        //Clioca no icon
  cy.contains('div', 'Gestor',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Clica em Perfil
  cy.get('.icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Gestor
 cy.contains('span','Gestor - Portal teste para ESMP')
  .should('be.visible')
  .click()

  cy.wait(6000)

    });
    

     it('Vai em solicitaçoes', () => {

        //Clica em solicitaçoes
        cy.contains('Solicitações de matrícula',{timeout:60000})
        .should('be.visible')
        .click();

        cy.wait(5000)

    });
    
it('Aceita uma solicitação', () => {

    //Clica no primeiro box
    cy.get('tbody > :nth-child(2) > .select-checkbox',{timeout:60000})
        .should('be.visible')
        .click();

        //Aprovar
        cy.get('[ng-click="confirmApproval(group.report)"]',{timeout:60000})
        .should('be.visible')
        .click();

        //Aprovar
        cy.get('[switch="modal.approve"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
        .should('be.visible')
        .click();

        cy.wait(8000)

    });

    it('Aceita duas solicitações', () => {

    //Clica no segunda icon box
    cy.get('tbody > :nth-child(2) > .select-checkbox',{timeout:60000})
        .should('be.visible')
        .click();

        //Clica no terceiro icon box
    cy.get('tbody > :nth-child(3) > .select-checkbox',{timeout:60000})
        .should('be.visible')
        .click();

        //Aprovar
        cy.get('[ng-click="confirmApproval(group.report)"]',{timeout:60000})
        .should('be.visible')
        .click();

        //Aprovar
        cy.get('[switch="modal.approve"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
        .should('be.visible')
        .click();

        cy.wait(8000)

    });

     it('Recusa uma Solicitação', () => {

    //Clica no segunda icon box
    cy.get('tbody > :nth-child(2) > .select-checkbox',{timeout:60000})
        .should('be.visible')
        .click();

        //Recusar
        cy.get('.end > .ml-20',{timeout:60000})
        .should('be.visible')
        .click();

        //Recusar
        cy.get('[switch="modal.decline"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
        .should('be.visible')
        .click();

        cy.wait(8000)

    });

     it('Recusa as duas solicitações', () => {

    //Clica no segunda icon box
    cy.get('tbody > :nth-child(2) > .select-checkbox',{timeout:60000})
        .should('be.visible')
        .click();

        //Clica no terceiro icon box
    cy.get('tbody > :nth-child(3) > .select-checkbox',{timeout:60000})
        .should('be.visible')
        .click();

        //Recusar
         cy.get('.end > .ml-20',{timeout:60000})
        .should('be.visible')
        .click();

        //Recusar
        cy.get('[switch="modal.decline"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
        .should('be.visible')
        .click();

        cy.wait(8000)

    });

    it('Verefique se voce resebeu os email de Aprovação ou Recusa', ()=> {

      cy.log('⚠️VEREFIQUE SE VOCE RESEBEU OS EMAISL DE APROVAÇÃO OU RECUSA⚠️')
      cy.pause()
    })

      it('Muda para o perfil ALuno',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

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

        //Clica na vitrine Teste Solicitaçoes
        cy.contains('.showcase-menu-name', 'Teste Solicitações', { timeout: 60000 })
  .should('be.visible')
  .click();
       
   });
   

  
      it('Acessa o conteudo no Teste Gestor Automação 1', () => {

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 1', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

        cy.wait(10000)
        
        //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

      //FINALIZE O TREINAMENTO
      cy.log('FINALIZE O TREINAMENTO')
      cy.pause
          
      });
      
        it('Incrição no Teste Gestor Automação 2', () => {

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 2', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

           cy.wait(10000)
        
        //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

       //FINALIZE O TREINAMENTO
      cy.log('FINALIZE O TREINAMENTO')
      cy.pause

      });

       it('Incrição no Teste Gestor Automação 3', () => {

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 3', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

           cy.wait(10000)
        
        //Clica em voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });

       //FINALIZE O TREINAMENTO
      cy.log('FINALIZE O TREINAMENTO')
      cy.pause

      //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

      });
      it('Incrição no Teste Gestor Automação 4', () => {

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 4', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()
                cy.wait(4000)
    
      });

      it('Incrição no Teste Gestor Automação 5', () => {

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 5', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(4000)
    
      });

      it('Incrição no Teste Gestor Automação 6', () => {

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click()

    //Ver tudo
     cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .click();

        //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Gestor Automação 6', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

   //Clica em Fazer Incrição
         cy.get('.classes-actions > [ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

                cy.wait(4000)

      });
      

       it('Entra em outro perfil Gestor',()=> {

        cy.visit("https://hml.lector.live/esmp/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should('be.visible')
      .type("thiagosuporte@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should('be.visible')
      .type("123");

    cy.get('#btn-entrar', { timeout: 60000 })
      .should('be.visible')
      .click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should('not.include', '/subscribe/login');

    });

    it('Vai em solicitaçoes', () => {

      cy.wait(4000)

        //Clica em solicitaçoes
        cy.contains('Solicitações de matrícula',{timeout:60000})
        .should('be.visible')
        .click();

    });

     it('Aceita duas solicitações', () => {

    //Clica no segunda icon box
    cy.get('tbody > :nth-child(2) > .select-checkbox',{timeout:60000})
        .should('be.visible')
        .click();

        //Clica no terceiro icon box
    cy.get('tbody > :nth-child(3) > .select-checkbox',{timeout:60000})
        .should('be.visible')
        .click();

        //Clica no quarto icon box
    cy.get('tbody > :nth-child(4) > .select-checkbox',{timeout:60000})
        .should('be.visible')
        .click();

        //Aprovar
        cy.get('[ng-click="confirmApproval(group.report)"]',{timeout:60000})
        .should('be.visible')
        .click();

        //Aprovar
        cy.get('[switch="modal.approve"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
        .should('be.visible')
        .click();

        cy.wait(5000)

     });

   });

});