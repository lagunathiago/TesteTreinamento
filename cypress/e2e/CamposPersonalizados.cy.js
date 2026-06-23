Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

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

    /*
    it("Vai pra categoria", () => {

      // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

      //Clica na Categoria
      cy.contains("li.list-group-item", "1Teste Automação",{timeout: 60000})
      .should('be.visible')
      .click({force: true})
      
    });

    it('Cria o primeiro Treinamento com campos', () => {
      cy.get('.title-bar .btn-icon', { timeout: 10000 })
        .scrollIntoView()
        .should('exist')
        .should('be.visible')
        .and('not.be.disabled')
        .click({ force: true });

      cy.get("#courseName", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click()
        .type("Campo Personalizado Teste");
    });

    it("Conteúdo - Documento JPEG", () => {
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get(".editing-resource > :nth-child(2) > .w-100", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get(".open > .ui-select-choices > :nth-child(2)", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.contains(".ui-select-container", "Escolha um documento", { timeout: 10000 })
        .scrollIntoView()
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 10000 })
        .scrollIntoView()
        .should("have.length", 1)
        .type("CAPA 19.jpg", { delay: 10 });

      cy.contains(".ui-select-choices-row", "CAPA 19.jpg", { timeout: 10000 })
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.get(".weight", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("1");

      cy.get(".open > .ui-select-choices > :nth-child(2)", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get(".editing-resource > .end > .btn-swipe-accent", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    it('Criando turma do treinamento', () => {
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ng-click="editClass()"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get("#className", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("Turma Teste Automação Turma");

      cy.get('.navigation-controls > .ml-20', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('.navigation-controls > .ml-20', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("Aluno");

      cy.get('.ui-select-dropdown', { timeout: 10000 })
        .should('be.visible');

      cy.contains('.ui-select-choices-row', 'Aluno', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .first()
        .click();

      cy.contains('button', 'Adicionar', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

    });

    it('Adicinando os campos peronalizado', () => {
      cy.get(':nth-child(6) > .dot', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.contains('label', 'Novo', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.get('table.custom-fields-table', { timeout: 10000 })
        .scrollIntoView()
        .find('input[placeholder="Nome"]')
        .first()
        .should('be.visible')
        .should('not.be.disabled')
        .clear({ force: true })
        .type('Personalizado - 01', { force: true });

      cy.get('td .ui-select-container.lector-select', { timeout: 10000 })
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.contains('.ui-select-choices-row', 'Texto', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get(':nth-child(4) > .middle > .btn-swipe-accent', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.get('table.custom-fields-table', { timeout: 10000 })
        .scrollIntoView()
        .find('input[placeholder="Nome"]')
        .first()
        .should('be.visible')
        .should('not.be.disabled')
        .clear({ force: true })
        .type('Personalizado - 02', { force: true });

      cy.get('td .ui-select-container.lector-select', { timeout: 10000 })
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.contains('.ui-select-choices-row', 'Texto', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get(':nth-child(4) > .middle > .btn-swipe-accent', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.get('.add-content > .end > .btn-swipe-accent', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('.content-box-footer > .flex > .btn-swipe-accent', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

                cy.wait(4000)

    });



    it('Cria o segundo Treinamento com campos', () => {
      cy.get('.title-bar .btn-icon', { timeout: 10000 })
        .scrollIntoView()
        .should('exist')
        .should('be.visible')
        .and('not.be.disabled')
        .click({ force: true });

      cy.get("#courseName", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click()
        .type("Segundo Campo Personalizado Teste");

      cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]', { timeout: 10000 })
        .scrollIntoView()
        .should('exist')
        .selectFile('cypress/fixtures/Segundo Campo.png', { force: true });

      cy.get('button[ng-click="cropper.save()"]', { timeout: 30000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

    });

    it("Conteúdo - Documento JPEG", () => {
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get(".editing-resource > :nth-child(2) > .w-100", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get(".open > .ui-select-choices > :nth-child(2)", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.contains(".ui-select-container", "Escolha um documento", { timeout: 10000 })
        .scrollIntoView()
        .should("be.visible")
        .click();

      cy.get("input.ui-select-search:visible", { timeout: 10000 })
        .scrollIntoView()
        .should("have.length", 1)
        .type("CAPA 19.jpg", { delay: 10 });

      cy.contains(".ui-select-choices-row", "CAPA 19.jpg", { timeout: 10000 })
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.get(".weight", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("1");

      cy.get(".open > .ui-select-choices > :nth-child(2)", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get(".editing-resource > .end > .btn-swipe-accent", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    it('Criando turma do treinamento', () => {
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ng-click="editClass()"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get("#className", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("Turma Teste Automação Turma");

      cy.get('.navigation-controls > .ml-20', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('.navigation-controls > .ml-20', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("Aluno");

      cy.get('.ui-select-dropdown', { timeout: 10000 })
        .should('be.visible');

      cy.contains('.ui-select-choices-row', 'Aluno', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .first()
        .click();

      cy.contains('button', 'Adicionar', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    it('Adicinando os campos peronalizado', () => {
      cy.get(':nth-child(6) > .dot', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.contains('span.ui-select-toggle', 'Selecione um campo personalizado', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.contains('span.ui-select-choices-row-inner', 'Personalizado - 01', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.get('.flex > .middle > .btn-swipe-accent', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.contains('span.ui-select-toggle', 'Selecione um campo personalizado', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.contains('span.ui-select-choices-row-inner', 'Personalizado - 02', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.get('.flex > .middle > .btn-swipe-accent', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.get('.add-content > .end > .btn-swipe-accent', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('.content-box-footer > .flex > .btn-swipe-accent', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

                cy.wait(5000)
          
    });
    

    it('Entra em outro perfil e envia os Documentos', () => {
      cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");

      cy.contains("button", "Entrar", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('form.ng-pristine > [type="text"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("teste28053@mailto.plus");

      cy.get("ng-transclude > .border", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("123");
        
      cy.get('#btn-entrar', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.url({ timeout: 10000 }).should('not.include', '/subscribe/login');
    });
  
    it('Vai até a vitrine', () => {

      cy.get('.active > .ng-binding', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

         //Vai até a vitrine
        cy.contains('span', 'teste automoção')
  .closest('button')
  .click();

          //Clica em Ver Tudo
          cy.get(':nth-child(3) > .carousel-container > .showcase-title-container > .middle > .show-all')
          .should('be.visible')
          .click()

    });

    it('Clica no Treinamento ', () => {

      cy.contains('.showcase-card-title', 'Campo Personalizado Teste', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

        // Clica na turma
    cy.get('label.class-container')
  .first()
  .click();

      cy.wait(2000)

      //Clica em fazer incrição
      cy.get('.selected > .class-info > .classes-actions > .btn-swipe-accent')
      .should('be.visible')
      .click();

      cy.contains('div.box-title', 'Personalizado - 01', { timeout: 20000 })
        .scrollIntoView()
        .should('be.visible');

      cy.contains('div.box-title', 'Personalizado - 02', { timeout: 20000 })
        .scrollIntoView()
        .should('be.visible');

      cy.get('.modal:visible').within(() => {
        cy.get('#customField_0', { timeout: 20000 })
          .scrollIntoView()
          .should('be.visible')
          .clear()
          .type('Campo Automatização 01');

        cy.get('#customField_1', { timeout: 20000 })
          .scrollIntoView()
          .should('be.visible')
          .clear()
          .type('Campo Automatização 02');
      });

      cy.get('.modal:visible', { timeout: 20000 })
        .contains('button', 'Confirmar')
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('.modal:visible', { timeout: 20000 })
        .should('not.exist');

      cy.get('.showcase-head-2 > .btn', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();
        
    })

    it('Conclui', () => {

            cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ CONCLUA O TREINAMENTO E PROSSIGA!';
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

  });

    it('Meu Cadastro', () => {
      cy.get("[ng-class*='accessLink.content.showcase.id.modal.home']", { timeout: 10000 })
        .scrollIntoView()
        .find('.ng-binding')
        .click({ force: true });

      cy.get("[ng-class*='home.register']", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[ui-sref="accessLink.content.home.register.more-info"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('input[placeholder="Personalizado - 01"]', { timeout: 10000 })
        .scrollIntoView()
        .should('exist');

      cy.get('input[placeholder="Personalizado - 02"]', { timeout: 10000 })
        .scrollIntoView()
        .should('exist');


    });

    it('Vai até a vitrine', () => {

 //Clica em conteúdos
cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

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

    it('Clica no Segundo Treinamento ', () => {

      //Clica no treinamento
      cy.contains('.showcase-card-title', 'Segundo Campo Personalizado Teste', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

       // Clica na turma
    cy.get('label.class-container')
  .first()
  .click();

      cy.wait(2000)

      //Clica em fazer incrição
      cy.get('.selected > .class-info > .classes-actions > .btn-swipe-accent')
      .should('be.visible')
      .click();

      cy.contains('div.box-title', 'Personalizado - 01', { timeout: 20000 })
        .scrollIntoView()
        .should('be.visible');

      cy.contains('div.box-title', 'Personalizado - 02', { timeout: 20000 })
        .scrollIntoView()
        .should('be.visible');

      cy.get('.modal:visible').within(() => {
        cy.get('#customField_0', { timeout: 20000 })
          .scrollIntoView()
          .should('be.visible')
          .clear()
          .type('Atualização Campo 01');

        cy.get('#customField_1', { timeout: 20000 })
          .scrollIntoView()
          .should('be.visible')
          .clear()
          .type('Atualização Campo 02');
      });

      cy.get('.modal:visible', { timeout: 20000 })
        .contains('button', 'Confirmar')
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('.modal:visible', { timeout: 20000 })
        .should('not.exist');

    });

    it('Entra em outro perfil para verificar a edição dos campos', () => {
      cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");

      cy.contains("button", "Entrar", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('form.ng-pristine > [type="text"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("qualidade2@lectortec.com.br");

      cy.get("ng-transclude > .border", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .type("2006lrnrgr");

      cy.get('#btn-entrar', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.url({ timeout: 10000 }).should('not.include', '/subscribe/login');
    });
*/

    it("Vai até o treinamento", () => {
   
        // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

      cy.contains("li.list-group-item", "1Teste Automação", { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    });

    it('Clica no treinamento', () => {
      cy.contains('.card-title', 'Campo Personalizado Teste', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    });

    it('Vai até a turma e verifica se é possivel Editar,Excluir,Criar', () => {

        //Clica em editar
  cy.get('.flex > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('[title="Editar turma"] > .icon-edit', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get(':nth-child(6) > .dot', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible')
        .click();
    });

    it('Verefica que o "Selecionar um campo personalizado esteja desabilitado"', () => {
 
cy.get('.ui-select-container[disabled="disabled"]')
  .should('be.visible')
  .and('have.attr', 'disabled', 'disabled');

    });

    it('Verifica se a lixeira não está na página', () => {
      cy.get('button[title="Remover"]', { timeout: 10000 })
        .should('not.exist');
    });

    it('Verifica se o botão de não está na página', () => {
      cy.get('button[title="Editar"]', { timeout: 10000 })
        .should('not.exist');
    });

    it('Verifica a mensagem de bloqueio ao administrador', () => {
      cy.contains(
        'span',
        'esta operação está indisponível para edição, pois há matrículas em andamento nesta turma. Para garantir a consistência das informações, contate o suporte técnico.',
        { timeout: 10000 }
      )
        .scrollIntoView()
        .should('be.visible');
    });

    it('Verefica se os Campos Perosnalizados criados anteriormente estejam na página', () => {
      cy.contains('td', 'Personalizado - 01', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible');

      cy.contains('td', 'Personalizado - 02', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible');

      cy.contains('td.ng-binding', 'Texto', { timeout: 10000 })
        .scrollIntoView()
        .should('be.visible');

    });
  });
});