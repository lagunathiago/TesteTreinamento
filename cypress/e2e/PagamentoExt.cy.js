Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  // Erros conhecidos do Angular / Front que não devem quebrar o teste
  if (
    msg.includes('Cannot read properties of null') ||
    msg.includes('charAt') ||
    msg.includes('writeText') ||
    msg.includes('Clipboard') ||
    msg.includes('Document is not focused')
  ) {
    return false; // ignora o erro e continua o teste
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/ext/subscribe/login");
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

  context("Teste Pagamento Ext", () => {

   /* 
    it("Aba Treinamentos", () => {


         // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

      cy.wait(3000) //espera alguns segundos para carregar a pagina

      // Clica na Categoria automação (pelo nodeid, no elemento clicável)
      cy.contains('span.text-area', 'TesteAutomação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });


    });
    
    it("Criando Turma paga á vista ", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Turma paga á vista") //  Nome no Treinamento

                cy.wait(2000)

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/TurmaáVista.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
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
      .type('Boletim Lector')
  });


  // 3) clica no item pelo texto (use um trecho, não o nome inteiro)
cy.get('.ui-select-dropdown, .ui-select-choices', { timeout: 60000 })
  .contains('div.ui-select-choices-row', 'Boletim Lector 07-10-2024', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true });
  
  cy.get(".editing-resource > .end > .btn-swipe-accent").click();


    });

    it('Turma Paga á vista sem aprovação', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Paga á vista"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}1.00');   

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

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
     
    });

      it("Criar turma paga com pagamento em 4x", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Turma paga 4x Cartão") //  Nome no Treinamento

                cy.wait(2000)
        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Turma4x.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
    });
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
      .type('Boletim Lector')
  })


  // 3) clica no item pelo texto (use um trecho, não o nome inteiro)
cy.get('.ui-select-dropdown, .ui-select-choices', { timeout: 60000 })
  .contains('div.ui-select-choices-row', 'Boletim Lector 07-10-2024', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true });
  
  cy.get(".editing-resource > .end > .btn-swipe-accent").click();


    });


    it('Turma pagamento 4x', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Paga 4x"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}10.00');   

       // Clica no número de parcelas (ui-select)
cy.contains('div.field-title', 'Quantidade máxima de parcelas no cartão', { timeout: 60000 })
  .closest('div')                 // sobe pro container do campo (se precisar ajustar)
  .parent()
  .find('.ui-select-container.lector-select')
  .should('be.visible')
  .click({ force: true });


  cy.wait(2000)

   // Seleciona o número 4 de parcelas
cy.contains('.ui-select-choices-row', '4', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
      

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

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
     
    });

     it("Criar Turma á  vista com cupom", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Pagamento á vista com cupom") //  Nome no Treinamento
                cy.wait(2000)

        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/Turmaávistacomcupon.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

    });


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
      .type('Boletim Lector')
  });

  // 3) clica no item pelo texto (use um trecho, não o nome inteiro)
cy.get('.ui-select-dropdown, .ui-select-choices', { timeout: 60000 })
  .contains('div.ui-select-choices-row', 'Boletim Lector 07-10-2024', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true });
  
  cy.get(".editing-resource > .end > .btn-swipe-accent").click();

    });

    it('Turma pagamento á vista com aprovação', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma á vista com"); //nome da turma
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}1.00');   
        cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação

     
      
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

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

cy.wait(3000)

    });

    

    it("Criar turma paga cartão e cupom", () => {

        //Clicar em criar treinamentos
        cy.get('.title-bar .btn-icon', { timeout: 600000 }) // até 10 minutos
    .should('exist')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });

    cy.wait(1000)
        cy.get("#courseName").click(); // Clica pra digitar
        cy.get("#courseName").type("Turma paga Cartão e Cupom") //  Nome no Treinamento

                cy.wait(2000)
        cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/PagaCartãoeCupom.png', { force: true });
        cy.log('AJUSTE A IMAGEM MANUALMENTE')
        cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
        cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem
    });
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
      .type('Boletim Lector')
  })


  // 3) clica no item pelo texto (use um trecho, não o nome inteiro)
cy.get('.ui-select-dropdown, .ui-select-choices', { timeout: 60000 })
  .contains('div.ui-select-choices-row', 'Boletim Lector 07-10-2024', { timeout: 60000 })
  .scrollIntoView()
  .click({ force: true });
  
  cy.get(".editing-resource > .end > .btn-swipe-accent").click();


    });


    it('Turma pagamento 4x', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Turma Paga cartão e cupom"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}10.00');   

       // Clica no número de parcelas (ui-select)
cy.contains('div.field-title', 'Quantidade máxima de parcelas no cartão', { timeout: 60000 })
  .closest('div')                 // sobe pro container do campo (se precisar ajustar)
  .parent()
  .find('.ui-select-container.lector-select')
  .should('be.visible')
  .click({ force: true });


  cy.wait(2000)

   // Seleciona o número 4 de parcelas
cy.contains('.ui-select-choices-row', '2', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });
      
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

      cy.wait(1000);
     
      // Clica no botão "Salvar Turma"
      
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
     
    });


    it("Clica em cupon", () => {
      // Clicando em Cadastros
      cy.get('[title="Cadastros"] > .sideitem', { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica em Cupons
      cy.get(":nth-child(13) > a > .w-100", { timeout: 60000 })
        .should("be.visible")
        .click();
    });


    
    it("Criar cupom %", () => {
      //Clica em criar cupons
      cy.get(".title-bar > .btn-icon", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Nome cupom
      cy.contains("Editar cupom", { timeout: 20000 }).should("be.visible");

      cy.get('input[id*="pt_BR_"]', { timeout: 20000 })
        .should("exist")
        .first()
        .click({ force: true })
        .invoke("val", "Cupom Cypress ")
        .trigger("input")
        .trigger("change")
        .blur();

      // Escolhe %
      cy.get('select[ng-model="coupon.valueType"]', { timeout: 60000 })
        .should("be.visible")
        .select("%");

      cy.wait(1000);

      cy.get('select[ng-model="coupon.valueType"]', { timeout: 20000 })
        .should("be.visible")
        .select("%");

      //Valor
      cy.get('input[type="number"][ng-model="coupon.value"]', {
        timeout: 20000,
      })
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type("50");

      //Código
      cy.get('input[ng-model="coupon.code"]', { timeout: 20000 })
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type("808183");

      // Quantidade
      cy.contains("div.box-title", "Quantidade")
        .next()
        .find('input[type="number"]')
        .clear({ force: true })
        .type("80", { force: true })
        .blur();

      //Data de inicio
      cy.get('input[ng-model="coupon.startDate"]', { timeout: 20000 })
        .should("be.visible")
        .invoke("val", "01/01/2026 10:00")
        .trigger("input")
        .trigger("change");

      //Data de fim
      cy.get('input[ng-model="coupon.endDate"]', { timeout: 20000 })
        .should("be.visible")
        .should("not.be.disabled")
        .invoke("val", "05/12/2026 18:00")
        .trigger("input")
        .trigger("change");

      cy.wait(4000);

      //Confirma
      cy.get(
        '[switch="modal.coupons"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',
      )
        .should("be.visible")
        .click();

      cy.wait(4000);

      cy.log('Confira se o cupom está na lista')
      cy.pause()

    });



     it('Sai do Perfil adm', () => {


    //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Perfil
  cy.get('.icon-pointer-right',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  //Aluno
  cy.get('.user-options-items > :nth-child(1) > ng-transclude', { timeout: 60000 })
  .should('be.visible')
  .click()

  cy.wait(10000)

    });
    
*/
    it("Vai até a vitrine", () => {

        // Clicando no icon da vitrine
      cy.get('.active > .icon-next', { timeout: 60000 })
        .should('be.visible')
        .click();

        cy.wait(3000)

        //Clica na vitrine Automação
        cy.get('.showcase-navigation-menu > :nth-child(7)', { timeout: 60000 })
        .should('be.visible')
        .click();
       
   });

   /*
    it('Compra da Turma paga á vista sem aprovação', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .first()
        .should('be.visible')
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga á vista', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

  //Clica em comprar
        cy.get('.center > div > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

  cy.wait(3000)

  //Clica no pix
      cy.get(".mb-5 > .icon-radio", { timeout: 10000 })
        .should("be.visible")
        .click();

        //Clica em continuar compra
      cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {
        timeout: 10000,
      })
        .should("be.visible")
        .click();

      cy.wait(4000);

      cy.get("#pixQrCode", { timeout: 60000 }).should("be.visible");

        //Fecha a compra
      cy.get(".column.ng-valid > .modal-header > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();


        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();

    });
    */
    

     it('Turma paga 4x Cartão', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .first()
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga 4x Cartão', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

       //Clica em comprar
        cy.get('.center > div > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()  

        // Clica em Cartão
cy.get('input[type="radio"][value="CREDIT_CARD"]', { timeout: 10000 })
  .should('exist')
  .check({ force: true });

  //Clica em continuar compra
      cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {
        timeout: 10000,
      })
        .should("be.visible")
        .click();

        //Abre o seletor de paletas
  cy.get('.ui-select-container.lector-select:visible', { timeout: 10000 })
  .first()
  .click();


  cy.wait(1000)

  // Valida os textos das parcelas
cy.get('.ui-select-choices:visible', { timeout: 10000 }).within(() => {
  cy.contains('Em 1x de R$10.00').should('be.visible');
  cy.contains('Em 2x de R$5.00').should('be.visible');
  cy.contains('Em 3x de R$3.33').should('be.visible');
  cy.contains('Em 4x de R$2.50').should('be.visible');
});

//Fecha o modal
  cy.get('.column.ng-dirty > .modal-header > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();



        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();   

    });



    it('Pagamento Pagamento á vista com cupom', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .first()
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Pagamento á vista com cupom', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

    //Clica em comprar
        cy.get('.center > div > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()   

        cy.wait(2000)

    });

        

   it("Limite de Cupom %", () => {
  //Digita um cupom já com um limite atingido
  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]', {
    timeout: 10000,
  })
    .should("be.visible")
    .and("not.be.disabled")
    .scrollIntoView()
    .clear()
    .invoke("val", "05/01/2026")
    .trigger("input")
    .trigger("change")
    .blur();

  //Clica no pix
  cy.get(".mb-5 > .icon-radio", { timeout: 10000 })
    .should("be.visible")
    .click();

  //Aplicar cupom
  cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
    .should("be.visible")
    .click();

  //Verifica a mensagem de limite
  cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
    timeout: 10000,
  })
    .should("be.visible")
    .and("contain", "Limite de cupons alcançado");

  cy.wait(2000);
});

it("Data de cupom Expirada %", () => {
  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click()
    .invoke("val", "0520")
    .trigger("input")
    .trigger("change");

  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

  //Aplicar cupom
  cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
    .should("be.visible")
    .click();

  //Verifica a mensagem de limite
  cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
    timeout: 10000,
  })
    .should("be.visible")
    .and("contain", "Cupom não encontrado");

  cy.wait(2000);
});

it("Valor Acima do Minimo %", () => {
  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click()
    .invoke("val", "2203")
    .trigger("input")
    .trigger("change");

  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

  //Aplicar cupom
  cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
    .should("be.visible")
    .click();

  //Verifica a mensagem de limite
  cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
    timeout: 10000,
  })
    .should("be.visible")
    .and("contain", "Valor de compra insuficiente");

  cy.wait(2000);
});

it("Apllica cupom % á vista", () => {
  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click()
    .invoke("val", "808183")
    .trigger("input")
    .trigger("change");

  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

  cy.wait(4000);

  //Aplicar cupom
  cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
    .should("be.visible")
    .click();

  cy.wait(4000);

  //Clica em continuar compra
  cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {
    timeout: 10000,
  })
    .should("be.visible")
    .click();
    
  cy.wait(4000);

  cy.get("#pixQrCode", { timeout: 60000 }).should("be.visible");

  //Fecha o modal
  cy.get('.column.ng-dirty > .modal-header > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();


        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();    

    });

 it('Turma paga Cartão e Cupom', ()=> {

    //Ver tudo
        cy.get('.show-all', { timeout: 60000 })
        .should('be.visible')
        .first()
        .click();

            //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Turma paga Cartão e Cupom', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

    //Clica em comprar
        cy.get('.center > div > .btn-swipe-accent', { timeout: 60000 })
        .should('be.visible')
        .click()

 })

         it("Limite de Cupom %", () => {
  //Digita um cupom já com um limite atingido
  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]', {
    timeout: 10000,
  })
    .should("be.visible")
    .and("not.be.disabled")
    .scrollIntoView()
    .clear()
    .invoke("val", "05/01/2026")
    .trigger("input")
    .trigger("change")
    .blur();

  //Clica no pix
  cy.get(".mb-5 > .icon-radio", { timeout: 10000 })
    .should("be.visible")
    .click();

  //Aplicar cupom
  cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
    .should("be.visible")
    .click();


  //Verifica a mensagem de limite
  cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
    timeout: 10000,
  })
    .should("be.visible")
    .and("contain", "Limite de cupons alcançado");

  cy.wait(2000);
});

it("Data de cupom Expirada %", () => {
  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click()
    .invoke("val", "0520")
    .trigger("input")
    .trigger("change");

  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

  //Aplicar cupom
  cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
    .should("be.visible")
    .click();

  //Verifica a mensagem de limite
  cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
    timeout: 10000,
  })
    .should("be.visible")
    .and("contain", "Cupom não encontrado");

  cy.wait(2000);
});

it("Valor Acima do Minimo %", () => {
  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click()
    .invoke("val", "1901")
    .trigger("input")
    .trigger("change");

  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

  //Aplicar cupom
  cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
    .should("be.visible")
    .click();

  //Verifica a mensagem de limite
  cy.get('div[ng-if="sicredi.selectedClass.couponErrorMessage"]', {
    timeout: 10000,
  })
    .should("be.visible")
    .and("contain", "Valor de compra insuficiente");

  cy.wait(2000);
});

it("Apllica cupom % á vista", () => {

  //Clica em cartão
  cy.get('input[type="radio"][value="CREDIT_CARD"]', { timeout: 20000 })
  .should('exist')
  .check({ force: true });


  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click()
    .invoke("val", "808183")
    .trigger("input")
    .trigger("change");

  cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]').blur();

  cy.wait(4000);

  //Aplicar cupom
  cy.get(".w-50 > .button-input > .btn-swipe-accent", { timeout: 10000 })
    .should("be.visible")
    .click();

    cy.wait(1000)


  cy.wait(4000);

  //Clica em continuar compra
      cy.get('[ng-show="!sicredi.paymentOption"] > .btn-swipe-accent', {
        timeout: 10000,
      })
        .should("be.visible")
        .click();

        //Abre o seletor de paletas
  cy.get('.ui-select-container.lector-select:visible', { timeout: 10000 })
  .first()
  .click();

  cy.wait(1000)

  // Valida os textos das parcelas
cy.get('.ui-select-choices:visible', { timeout: 10000 }).within(() => {
  cy.contains('Em 1x de R$5.00').should('be.visible');
  cy.contains('Em 2x de R$2.50').should('be.visible');
});

//Fecha o modal
  cy.get('.column.ng-dirty > .modal-header > .btn', { timeout: 10000 })
  .should('be.visible')
  .click();

        //Volta pra vitrine
        cy.get('.showcase-head-2 > .btn', {timeout:60000})
        .should('be.visible')
        .click();   

    });




 it("Minha área/Minhas compras/", () => {

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

it("Valida compra da Turma paga á vista", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Turma paga á vista", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)


      //clica no ultimo
      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 })
        .should("have.length.greaterThan", 0)
        .last()
        .within(() => {
          cy.get("button.sicredi-slip", { timeout: 20000 })
            .should("be.visible")
            .click({ force: true });
        });

      //Garante que o pix abriu
      cy.get("#pixQrCode", { timeout: 20000 }).should("be.visible");

      cy.wait(2000);
    
//Fecha QRCode
      cy.get(".modal-overlay.ng-scope > .modal > .modal-header > .btn",{timeout:60000})
      .should('be.visible')
      .click()       

      });


      it("Valida compra da Pagamento á vista com cupom", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Pagamento á vista com cupom", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

        cy.wait(5000)

         cy.get("table#mypurchases-table tbody tr", { timeout: 20000 }).then(
        ($rows) => {
          const $last = $rows.last();
          expect($last.find("td.couponColumn").text()).to.contain("50%");
          expect($last.find("td.priceColumn").text()).to.contain("R$ 0.50");
        },
      );


      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)


      //clica no ultimo
      cy.get("table#mypurchases-table tbody tr", { timeout: 20000 })
        .should("have.length.greaterThan", 0)
        .last()
        .within(() => {
          cy.get("button.sicredi-slip", { timeout: 20000 })
            .should("be.visible")
            .click({ force: true });
        });

      //Garante que o pix abriu
      cy.get("#pixQrCode", { timeout: 20000 }).should("be.visible");

      cy.wait(2000);
    
//Fecha QRCode
      cy.get(".modal-overlay.ng-scope > .modal > .modal-header > .btn",{timeout:60000})
      .should('be.visible')
      .click()       

      });


      it("Valida compra da Turma paga á vista", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Turma paga 4x Cartão", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)


      cy.get('table#mypurchases-table tbody tr', { timeout: 20000 })
  .last()
  .should('contain.text', 'Turma paga 4x Cartão');

      });


      
      it("Turma paga Cartão e Cupom", () => {
      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Turma paga 4x Cartão", { delay: 50 });

      cy.wait(3000);

      //Pesquisa
      cy.get(".multiselect.ng-dirty > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000); // micro-wait só pra estabilizar render (bem pequeno)


      cy.get('table#mypurchases-table tbody tr', { timeout: 20000 })
  .last()
  .should('contain.text', 'Turma paga Cartão e Cupom');

  
      });


  });
});