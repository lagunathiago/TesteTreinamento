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

    cy.contains("button", "Entrar", { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
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

      
it('Cria o primeiro Treinamento com campos', () => {
  
        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Campo Personalizado Teste") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Primeiro Campo.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

    });

      it("Conteúdo - Avaliação (uma por página)", () => {
      
        //Clica em Conteúdo
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]',{timeout:60000})
      .should('be.visible')
      .click();
      
      //Clica em Novo Conteúdo
      cy.get("ui-view.ng-scope > .flex > .btn-swipe-accent",{timeout:60000})
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

      cy.contains(".ui-select-choices-row", "uma por página Thiago", {timeout: 60000 })
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
         it('Adicinando os campos peronalizado', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
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
  .type('Personalizado - 01', { force: true });

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
  .type('Personalizado - 02', { force: true });

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

      cy.wait(5000)

    });

it('Cria o segundo Treinamento com campos', () => {
  
     //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Segundo Campo Personalizado Teste") //  Nome no Treinamento

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Segundo Campo.png', { force: true });
        
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

    });

      it("Conteúdo - Avaliação (uma por página)", () => {
      
        //Clica em Conteúdo
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]',{timeout:60000})
      .should('be.visible')
      .click();
      
      //Clica em Novo Conteúdo
      cy.get("ui-view.ng-scope > .flex > .btn-swipe-accent",{timeout:60000})
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

      cy.contains(".ui-select-choices-row", "uma por página Thiago", {timeout: 60000 })
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
    
         it('Adicinando os campos peronalizado', () => {

            //Clica nos campos personalizado
            cy.get(':nth-child(6) > .dot',{timeout:60000})
            .should('be.visible')
            .click({force:true})

            //Clica em 'Selecionar um Grupo Personalizado'
            cy.contains('span.ui-select-toggle','Selecione um campo personalizado')
            .should('be.visible')
            .click({focer:true})

            //Clica no Campo Personalizado - 01
            cy.contains('span.ui-select-choices-row-inner','Personalizado - 01')
            .should('be.visible')
            .click({focer:true})

            cy.wait(2000)

            //Clica em Adicionar
            cy.get('.flex > .middle > .btn-swipe-accent', {timeout:5000})
            .click({force: true})

            //Clica em 'Selecionar um Grupo Personalizado'
            cy.contains('span.ui-select-toggle','Selecione um campo personalizado')
            .should('be.visible')
            .click({focer:true})
      
            //Clica no Campo Personalizado - 02
            cy.contains('span.ui-select-choices-row-inner','Personalizado - 02')
            .should('be.visible')
            .click({force:true})

            //Clica em Adicionar
            cy.get('.flex > .middle > .btn-swipe-accent', {timeout:5000})
            .click({force: true})

      // Clica no botão "Salvar Turma"
            cy.wait(2000)
      cy.get('.add-content > .end > .btn-swipe-accent').click()

      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click() //Salvar treinamento

      cy.wait(5000)

    });
    
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
        
   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

        cy.wait(2000)

//Verefica o está escrito corretamente o campo personalizado
        cy.contains('div.box-title','Personalizado - 01')
.should('be.visible')

//Verefica o está escrito corretamente o campo personalizado
cy.contains('div.box-title','Personalizado - 02')
.should('be.visible')
       
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Campo Automatização 01');

  cy.get('#customField_1')
    .clear()
    .type('Campo Automatização 02');
});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  //Espera alguns segundos na pagina para enviar os campos
  cy.wait(4000)

   //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });
    
   it('Meu Cadastro', ()=> {

    //Clica em Minhas Areas
        cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']",{timeout:60000})
  .find('.ng-binding')
  .click({ force: true })

  //Clica em Meu Cadastro
  cy.get("[ng-class*='home.register']",{timeout:60000})
  .click()

  //Outras informações
  cy.get('[ui-sref="accessLink.content.home.register.more-info"]', {timeout:60000})
  .should('be.visible')
  .click()

  //Verifica se no está escrito 'Personalizado 01'
  cy.get('input[placeholder="Personalizado - 01"]')
  .should('exist')
 
  //Verifica se está escrito 'Personalizado 02'
 cy.get('input[placeholder="Personalizado - 02"]')
  .should('exist')

  //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

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
     it('Clica no Segundo Treinamento ', () => {

         //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Segundo Campo Personalizado Teste', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()
        
   //Clica em Fazer Incrição
        cy.get('[ng-click="subscribeClass(class);"]', { timeout: 60000 })
        .should('be.visible')
        .click()

                cy.wait(2000)
        //Verefica se o campo personalizado está escrito corretamente
        cy.contains('div.box-title','Personalizado - 01')
.should('be.visible')

        //Verefica se o campo personalizado está escrito corretamente
cy.contains('div.box-title','Personalizado - 02')
.should('be.visible')
       
        //Escreve nos dois campos
        cy.get('.modal:visible').within(() => {
  cy.get('#customField_0')
    .clear()
    .type('Atualização Campo 01');

  cy.get('#customField_1')
    .clear()
    .type('Atualização Campo 02');
});

//Confirma o envio
cy.get('.modal:visible', { timeout: 20000 })
  .contains('button', 'Confirmar')
  .should('be.visible')
  .click();

  //Espera alguns segundos na pagina para enviar os campos
  cy.wait(4000)

   //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });

       it('Entra em outro perfil para verificar a edição dos campos',()=> {

        cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
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

     it("Vai até o treinamento", () => {

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

     //Clica no Treinamento
  cy.contains('.card-title', 'Campo Personalizado Teste', { timeout: 60000})
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true })

    });

    it('Vai até a turma e verifica se é possivel Editar,Excluir,Criar', () => {

      //Clica em editar
  cy.get('.end.ng-scope > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  //Clica na turma
        cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]',{timeout:60000})
        .should('be.visible')
        .click()

        //Clica no botão Editar da turma
        cy.get('[title="Editar turma"] > .icon-edit',{timeout:60000})
        .should('be.visible')
        .click()

        //Clica em Campos Personalizado
        cy.get(':nth-child(6) > .dot',{timeout:60000})
        .should('be.visible')
        .click()
    })

        it('Verefica que o "Selecionar um campo personalizado esteja desabilitado"', () => {

          //Verefica que o Selecionar um campo personalizado esteja desabilitado
          cy.get('.multiselect')
  .should('not.be.enabled')
        });

        it('Verifica se a lixeira não está na página', () => {

          //'Verifica se a lixeira não está na página
          cy.get('button[title="Remover"]')
  .should('not.exist')
        });

         it('Verifica se o botão de não está na página', () => {

          //'Verifica se o botão de Editar não está na página
          cy.get('button[title="Editar"]')
  .should('not.exist')
        });
      
        it('Verifica a mensagem de bloqueio ao administrador', () => {

          //Verifica a mensagem de bloqueio ao administrador
            cy.contains('span','esta operação está indisponível para edição, pois há matrículas em andamento nesta turma. Para garantir a consistência das informações, contate o suporte técnico.')

    });
it('Verefica se os Campos Perosnalizados criados anteriormente estejam na página', () => {

  cy.contains('td','Personalizado - 01')
  .should('be.visible')

  cy.contains('td','Personalizado - 02')
  .should('be.visible')

   cy.contains('td.ng-binding','Texto')
  .should('be.visible')

     });

  });

});

