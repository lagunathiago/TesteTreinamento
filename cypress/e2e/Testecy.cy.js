/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('unselectable')) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("123");
     cy.get('#btn-entrar').click();

});

context("Criando Treinamento", { testIsolation: false }, () => {

  it("Aba Geral", () => {
    
     // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem').click()
      cy.wait(5000) //espera alguns segundos para carregar a pagina

      cy.contains('li.list-group-item', 'Teste Automação')
  .click({ force: true })
/*
      //Editando Nome do treinamento e o Idioma
      cy.get('.title-bar > .btn-icon').click()
      cy.get("#courseName").click(); // Clica pra digitar
      cy.get("#courseName").type("Teste Automação") //  Nome no Treinamento
*/
  });

  /*
      cy.get('div.ui-select-container[title="Idioma"]') //Idioma 
  .should('be.visible')
  .click();
    
      cy.log('SELECIONE UM IDIOMA MANUALMENTE')
      cy.wait(3000) //Espera alguns segundo para selecionar o idioma
    
      cy.get('label.thumb-placeholder[aspect="square"] input[type="file"]').selectFile('cypress/fixtures/images6.png', { force: true });
      cy.log('AJUSTE A IMAGEM MANUALMENTE')
      cy.wait(6000);                                                     // Aguarda alguns segudos para ajustar a imagem
      cy.get('button[ng-click="cropper.save()"]').click();               // Confirma em confirmar para salvar a imagem

      cy.get('[max="9999"] > .ng-pristine').type('1')  //Horas
      cy.get('[model="editingCourse.workload.minutes"] > .ng-pristine').type('30')//Minutos
      
      cy.get('[accessibility=""] > .checkbox > .icon-checkbox').click()  // Acessebilidade
      
  //Aguarda 30 segundos pra prencher algumas informações manualmente
  //-Descrição
  //-Resumo
  //-Tipo
  //-Resumo
  //-Progresso
  //Aproveitamento
      cy.log('PREENCHER IMFORMAÇOES MANUALMENTE DESCRIÇÃO|RESUMO|TIPO|PROGRESSO|APROVEITAMENTO')
      cy.wait(1000)
      */ /*
    });

    it('Autores', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.authors"]').click()        // Clica em Autores

      cy.get('[authors=""] > .ng-isolate-scope > .multiselect > .border > :nth-child(1) > .ui-select-search').type('Autor')  // Digita Autores
      cy.log('CLIQUE EM UM AUTOR')
      cy.wait(2000)                                                                                                          // Espera alguns segundo
      //Espera alguns segundos e clica no primeiro autor

      cy.contains('button', /^Criar autor$/i, { timeout: 10000 })   //Clica em criar autor
  .should('be.visible')
  .scrollIntoView({ block: 'center' })
  .click({ force: true });

  cy.get('.new-author input[placeholder="Insira o nome"]', { timeout: 8000 }) //Escreve um nome
  .should('be.visible')
  .click({ force: true })
  .type('{selectall}{backspace} TesteCypress', { delay: 30 });

  cy.get('input[placeholder="Insira o sobrenome"]', { timeout: 8000 }) //Escreve um sobrenome
  .should('be.visible')
  .click({ force: true })
  .type('{selectall}{backspace}Oliveira', { delay: 30 });

  //Espera alguns segundos para digitar um resumo sobre o autor manualmente
  cy.log('ESCREVA UM RESUMO MANUALMENTE')
  cy.wait(2000) 

  cy.get('button[ng-click="saveAuthor()"]', { timeout: 10000 }) //Salvar em salvar
  .should('be.visible')
  .scrollIntoView({ block: 'center' })
  .click({ force: true });

    })
 */
/*
  // ✅ Helper simples (opcional) - mantém o código bem parecido
  const abrirConteudosENovo = () => {
    cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click();
    cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click(); // Novo conteúdo
  };

  it('Conteúdo - Gravação', () => {
    abrirConteudosENovo();

    // Abre o select de Gravações (Evento)
    cy.contains('.ui-select-container', 'Informe o nome do evento')
      .should('be.visible')
      .click();

    // Digita no campo do ui-select (sempre pegue o input VISÍVEL)
    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .clear({ force: true })
      .type('Relatório Faturamento Philips', { force: true, delay: 30 });

    cy.contains('.ui-select-choices-row', 'Relatório Faturamento Philips', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

       cy.get(".weight").type("1"); // selecionar peso
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); //selecionar peso 1

    cy.get('.editing-resource > .end > .btn-swipe-accent').click(); // Adicionar
  });

  it('Conteúdo - Documento PDF', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();
    cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

    cy.contains('.ui-select-container', 'Escolha um documento')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .type('Chamada.pdf', { delay: 10 });

    cy.contains('.ui-select-choices-row', 'Chamada.pdf', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Documento XLSX', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();
    cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

    cy.contains('.ui-select-container', 'Escolha um documento')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .type('Bugs da webconferência 03.11.2023', { delay: 10 });

    cy.contains('.ui-select-choices-row', 'Bugs da webconferência 03.11.2023', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Documento PPTX', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();
    cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

    cy.contains('.ui-select-container', 'Escolha um documento')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .type('Certificado 14.02.2024', { delay: 10 });

    cy.contains('.ui-select-choices-row', 'Certificado 14.02.2024', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Documento DOC', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();
    cy.get(".open > .ui-select-choices > :nth-child(2)").click(); // Documentos

    cy.contains('.ui-select-container', 'Escolha um documento')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .type('6518 - Opcao de evento hibrido', { delay: 10 });

    cy.contains('.ui-select-choices-row', '6518 - Opcao de evento hibrido', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Avaliação (uma por página)', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();
    cy.get('.open > .ui-select-choices > :nth-child(3)').click(); // Avaliação

    cy.contains('.ui-select-container', 'Escolha uma avaliação')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .type('uma por página Thiago', { delay: 10 });

    cy.contains('.ui-select-choices-row', 'uma por página Thiago', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Avaliação (todas na mesma página)', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();
    cy.get('.open > .ui-select-choices > :nth-child(3)').click(); // Avaliação

    cy.contains('.ui-select-container', 'Escolha uma avaliação')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .type('todas na mesma página Thiago', { delay: 10 });

    cy.contains('.ui-select-choices-row', 'todas na mesma página Thiago', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });
  it('Conteúdo - Aula Presencial', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.get('body .ui-select-choices-row', { timeout: 10000 })
      .should('be.visible')
      .contains(/^\s*Aula\s*Presencial\s*$/i)
      .click({ force: true });

    cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type('Aula Presencial Cypress', { force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Webconferência (Teams)', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.contains('.ui-select-choices-row', 'Webconferência', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type('Web Conferencia Cypress', { force: true });

    cy.get('[ng-if="contaInfo.toolsConfig.webconferenceParams.enableExternalPlatforms"] > .w-100')
      .click({ force: true });

    cy.get('.open > .ui-select-choices > :nth-child(2)', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get('input[ng-model="editingResource.url"]', { timeout: 10000 })
      .should('be.visible')
      .clear({ force: true })
      .type('https://teams.live.com/meet/9327021005980?p=7AuU9CnF28qfXB0Gg0', { force: true });

    cy.get('input[ng-model="editingResource.recordingUrl"]', { timeout: 10000 })
      .should('be.visible')
      .clear({ force: true })
      .type('https://teams.live.com/meet/9327021005980?p=7AuU9CnF28qfXB0Gg0', { force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Vídeo (plataforma)', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.get('body .ui-select-choices-row')
      .contains(/V[ií]deo/i)
      .click({ force: true });

    cy.contains('.ui-select-container', 'Escolha um vídeo')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .clear({ force: true })
      .type('Automação Video da plataforma', { force: true, delay: 20 });

    cy.contains('.ui-select-choices-row', 'Automação Video da plataforma', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Vídeo (YouTube)', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.get('body .ui-select-choices-row')
      .contains(/V[ií]deo/i)
      .click({ force: true });

    cy.get('input[type="radio"][ng-model="editingResource.videoType"][value="LINK"]')
      .scrollIntoView({ block: 'center' })
      .check({ force: true });

    cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type('Automação Video do Youtube', { force: true });

    cy.get('input[placeholder="Link"]', { timeout: 10000 })
      .should('be.visible')
      .clear({ force: true })
      .type('https://www.youtube.com/watch?v=QC8iQqtG0hg', { force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Vídeo (Vimeo)', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.get('body .ui-select-choices-row')
      .contains(/V[ií]deo/i)
      .click({ force: true });

    cy.get('input[type="radio"][ng-model="editingResource.videoType"][value="LINK"]')
      .scrollIntoView({ block: 'center' })
      .check({ force: true });

    cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type('Automação Video Vimeo', { force: true });

    cy.get('input[placeholder="Link"]', { timeout: 10000 })
      .should('be.visible')
      .clear({ force: true })
      .type('https://vimeo.com/300018306?fl=pl&fe=sh', { force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Tópico', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.get('body .ui-select-choices-row:visible', { timeout: 10000 })
      .should('be.visible')
      .contains(/^\s*T[oó]pico\s*$/i)
      .click({ force: true });

    cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type('Teste Tópico', { force: true });

    const texto = 'Conteúdo escrito pelo Cypress ';

    cy.get('iframe.cke_wysiwyg_frame', { timeout: 15000 })
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .click()
      .type(`{selectall}{backspace}${texto}`, { delay: 10 });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - SCORM', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.get('body .ui-select-choices-row:visible', { timeout: 10000 })
      .should('be.visible')
      .contains(/^\s*SCORM\s*\/\s*IMSCC?\s*$/i)
      .click({ force: true });

    cy.contains('.ui-select-container', 'Escolha um documento')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .type('NR-12', { delay: 10 });

    cy.contains('.ui-select-choices-row', 'NR-12', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get('.editing-resource > .end > .btn-swipe-accent', { timeout: 10000 })
      .should('exist')
      .click({ force: true });

    cy.wait(6000);
  });

  it('Conteúdo - Entrega de atividade', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.contains('.ui-select-choices-row', 'Entrega de atividade', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
      .first()
      .clear({ force: true })
      .type('Automação Entrega de Atividade', { force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Reação/Pesquisa (uma por página)', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.log('ROLE PARA BAIXO NA LISTA ATÉ APARECER Avaliação de Reação/Pesquisa');
    cy.wait(2000);

    cy.get('body .ui-select-choices-row', { timeout: 10000 })
      .should('be.visible')
      .contains(/Avalia[cç][aã]o de Rea[cç][aã]o\/Pesquisa/i)
      .click({ force: true });

    cy.contains('.ui-select-container', 'Escolha uma avaliação')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .type('Reação uma por página Thiago', { delay: 10 });

    cy.contains('.ui-select-choices-row', 'Reação uma por página Thiago', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Reação/Pesquisa (todas em uma página)', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.log('ROLE PARA BAIXO NA LISTA ATÉ APARECER Avaliação de Reação/Pesquisa');
    cy.wait(2000);

    cy.get('body .ui-select-choices-row', { timeout: 10000 })
      .should('be.visible')
      .contains(/Avalia[cç][aã]o de Rea[cç][aã]o\/Pesquisa/i)
      .click({ force: true });

    cy.contains('.ui-select-container', 'Escolha uma avaliação')
      .should('be.visible')
      .click();

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .type('Reação todas em uma página Thiago', { delay: 10 });

    cy.contains('.ui-select-choices-row', 'Reação todas em uma página Thiago', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });

  it('Conteúdo - Certificado', () => {
    abrirConteudosENovo();

    cy.get('.editing-resource > :nth-child(2) > .w-100').click();

    cy.get('body .ui-select-choices-row', { timeout: 10000 })
      .should('be.visible')
      .contains(/^Certificado$/i)
      .click({ force: true });

    cy.wait(1500);

    cy.contains('.ui-select-container', 'Informe o nome do certificado', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.get('.ui-select-toggle').click({ force: true });
      });

    cy.get('input.ui-select-search:visible', { timeout: 10000 })
      .should('have.length', 1)
      .clear({ force: true })
      .type('Certificado do Treinamento', { force: true, delay: 20 });

    // Se existir opção, clica nela
    cy.get('.ui-select-choices-row', { timeout: 10000 })
      .contains('Certificado do Treinamento')
      .click({ force: true });

    cy.get(".editing-resource > .end > .btn-swipe-accent").click();
  });


    it('Turma Gratuita', () => {
      //Turma Gratuita

      // Garante que está na aba de Turmas
cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]')
  .should('be.visible')
  .click({ force: true });

// Espera renderizar a área
cy.wait(2000);


      cy.get("#className").type("Turma Gratuita"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação

      cy.wait(3000)


      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REALIZE O AGENDAMENTO')
      cy.wait(20000)

        cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("Aluno")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Aluno')
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()
      // Clica no botão "Salvar Turma"
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento

    });

    it('Turma paga', () => {
      //Turma Paga
//Clica no treinamento
      cy.contains('.card-items', 'Teste Automação', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

  //Clica em editar no treinamento
  cy.get('button[title="Editar treinamento"]', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });


      // Garante que está na aba das turmas
cy.get('button[title="Editar treinamento"]', { timeout: 30000 })
  .filter(':visible')
  .first()
  .scrollIntoView()
  .click({ force: true });


// Espera renderizar a área
cy.wait(2000);

// Força o clique no botão de editar/criar turma
cy.url({ timeout: 30000 }).should('include', '/courses/edit/');
cy.get('body', { timeout: 30000 }).should('be.visible');

// 2) Vai pra aba Turmas
cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]', { timeout: 30000 })
  .scrollIntoView()
  .click({ force: true });

  // 4)  clica em "Nova turma"
cy.get('[ng-click="editClass()"]', { timeout: 30000 })
  .filter(':visible')
  .first()
  .scrollIntoView()
  .click({ force: true });

      cy.get("#className").type("Turma Paga"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91'); 

      cy.wait(3000)


      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REALIZE O AGENDAMENTO')
      cy.wait(5000)

        cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("Aluno")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Aluno')
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()
      // Clica no botão "Salvar Turma"
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

    });

   it('Duplicar Turma Gratuita para Paga', () => {
      //Turma Paga
//Clica no treinamento
      cy.contains('.card-items', 'Teste Automação', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

  //Clica em editar no treinamento
  cy.get('button[title="Editar treinamento"]', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });


      // Garante que está na aba das turmas
cy.get('button[title="Editar treinamento"]', { timeout: 30000 })
  .filter(':visible')
  .first()
  .scrollIntoView()
  .click({ force: true });

// Espera renderizar a área
cy.wait(2000);

// 2) Vai pra aba Turmas
cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]', { timeout: 30000 })
  .scrollIntoView()
  .click({ force: true });

  //Clicar em clonar turma
cy.contains('tr', 'Turma Gratuita', { timeout: 20000 })
  .should('be.visible')
  .within(() => {
    cy.get('button[title="Clonar turma"]')
      .should('exist')
      .click({ force: true });
  });
       cy.get("#className").type("Para gratuita"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.price-box-container > :nth-child(2) > .price-box > .checkbox > .icon-radio').click() //Clica em fixo
      cy.get('#price-fixed').click() //Clica no valor
      cy.get('#price-fixed') //Valor Treinamento
  .clear()
  .type('{selectall}3.91'); 

      cy.wait(3000)

      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REALIZE O AGENDAMENTO')
      cy.wait(5000)

        cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("Aluno")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Aluno')
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()
      // Clica no botão "Salvar Turma"
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

    });

     it('Duplicar Turma Paga para Gratuita', () => {
      //Turma Paga
//Clica no treinamento
      cy.contains('.card-items', 'Teste Automação', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

  //Clica em editar no treinamento
  cy.get('button[title="Editar treinamento"]', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

// Espera renderizar a área
cy.wait(2000);

// 2) Vai pra aba Turmas
cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]', { timeout: 30000 })
  .scrollIntoView()
  .click({ force: true });

  //Clicar em clonar turma
cy.contains('tr', 'Turma Paga', { timeout: 20000 })
  .should('be.visible')
  .within(() => {
    cy.get('button[title="Clonar turma"]')
      .should('exist')
      .click({ force: true });
  });

       cy.get("#className").type("Para Gratuita"); //nome da turma
      cy.get('.column > :nth-child(1) > .icon-checkbox').click(); // desativa aprovação
      cy.get('.left-radius > .checkbox > .icon-radio').click()

      cy.wait(3000)

      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REALIZE O AGENDAMENTO')
      cy.wait(5000)

        cy.get('.navigation-controls > .ml-20').click()//botao prximo

      cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn').click()
      cy.get('.step2 > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default').type("Aluno")
      cy.get('.ui-select-dropdown')
  .should('be.visible')

cy.contains('.ui-select-choices-row', 'Aluno')
  .click()

      cy.contains('button', 'Adicionar')
  .should('be.visible')
  .click()
      // Clica no botão "Salvar Turma"
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

    });

    it('Material Complementar', () => {
      //Turma Paga
//Clica no treinamento
      cy.contains('.card-items', 'Teste Automação', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

  //Clica em editar no treinamento
  cy.get('button[title="Editar treinamento"]', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

// Espera renderizar a área
cy.wait(2000);

//Clica em material complentar
cy.get('a[ui-sref="accessLink.content.courses.edit.id.archive"]', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

//Clica em adicionar pasta
  cy.contains('button', 'Adicionar pasta', { timeout: 20000 })
  .should('be.visible')
  .click({ force: true });

  //Clica em Permitir que alunos insiram arquivos
  cy.get('.library-editor > :nth-child(2) > .checkbox > .icon-checkbox').click() 
  //Arquivos carregados por alunos precisam ser aprovados
  cy.get('.library-editor > :nth-child(3) > .checkbox > .icon-checkbox').click()

//Nome da pasta
  cy.get('input[placeholder="Nome da biblioteca"]', { timeout: 20000 })
  .filter(':visible')
  .first()
  .should('be.visible')
  .and('not.be.disabled')
  .clear({ force: true })
  .type('Pasta criada pelo Cypress', { delay: 30 });


  //Clica em Salvar
  cy.get('.library-editor > .end > .flex > .btn-swipe-accent').click()

  cy.contains('button', 'Carregar arquivo', { timeout: 30000 })
  .should('be.visible')
  .and('not.be.disabled');

  cy.get('input[type="file"][ngf-select="uploadLibraryContent($file)"]', {
  timeout: 30000
})
  .should('exist')
  .selectFile('cypress/fixtures/images6.png', { 
    force: true
  });

  //Clica em salvar
  cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()

    });



      it('Campo personalizado', () => {

        //Clica no treinamento
      cy.contains('.card-items', 'Teste Automação', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

  //Clica em editar no treinamento
  cy.get('button[title="Editar treinamento"]', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

// Espera renderizar a área
cy.wait(2000);
//Clica em campo personalizado

        cy.get('[ui-sref="accessLink.content.courses.edit.id.custom"]', { timeout: 20000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

        //Clica em novo campo personalizado
        cy.get('button[ng-click="editCustomField()"]', { timeout: 20000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

//Ecreve campo personalizado
  cy.get('input[placeholder="Nome"]', { timeout: 20000 })
  .first() // garante apenas 1 input
  .scrollIntoView()
  .click({ force: true })
  .invoke('removeAttr', 'disabled') // remove o disabled
  .clear({ force: true })
  .type('Campo personalizado Cypress', { force: true, delay: 30 });

        //Botão adicionar
        cy.get('.custom-field-editor > :nth-child(4) > .end > .btn-swipe-accent')
        //Salva o treinamento com o campo personalizado
        cy.contains('button.btn-swipe-accent', 'Salvar')
  .should('be.visible')
  .click({ force: true });

    });
  */

    it("Bloqueio de incrição", () => {
     //clica no treinamento
     cy.contains('.card-items', 'Teste Automação', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

  //Clica em editar no treinamento
  cy.get('button[title="Editar treinamento"]', { timeout: 30000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

//Clica em Bloqueio de Incrição
     cy.get('[ui-sref="accessLink.content.courses.edit.id.subscription-block"]', { timeout: 20000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true });

  cy.contains('th, div, span', 'USUÁRIO', { timeout: 20000 })
  .parents('div')
  .find('div.ui-select-match[placeholder="Escolha um usuário"]')
  .first()
  .click({ force: true });



cy.get('.ui-select-search')
  .should('be.visible')
  .type('thiagosuporte@uorak.com', { delay: 50 });



     cy.get('.new-block > .btn-swipe-accent').click() //Clica em novo bloqueio
     cy.contains('button', /^Salvar$/i, { timeout: 10000 })
       .should('be.visible')
       .click({ force: true });
     cy.wait(3000)

     cy.get('.card-items').click()
     cy.wait(2000)
     cy.contains('Inscrição bloqueada') //Verifica se a incrição no treinamento realmente está bloqueda 

     cy.get('.end.ng-scope > .icon-edit').click() // Clica em editar
     cy.get('[ui-sref="accessLink.content.courses.edit.id.subscription-block"]').click() 
     cy.get('button.btn.icon-discard').first().click(); //Clica na lixeira do primeiro nome da lista de bloqueio de incrição

     cy.contains('button', /^Salvar$/i, { timeout: 10000 })
       .should('be.visible')
       .click({ force: true });
    
     cy.get('.card-items').click()
     cy.contains('Fazer inscrição') //Verifica se é possivel fazer a incrição
     
    });
 
/*
    it('Adicionando o Treinamento na Vitrine', () => { 
     //Role até aparecer vitrines
    cy.log('ROLE ATÉ APARECER A VITRINES NA ABA')
    cy.wait(4000)
thiagosuporte@uorak.
        //Clica na vitrine
        cy.get('a.sideitem[ui-sref="accessLink.content.showcases"]')
  .should('be.visible')
  .click({ force: true });
        cy.wait(3000)
        //Clica na primeira vitrine
        cy.get('button.btn.round.icon-edit.ng-scope')
  .first()
  .should('be.visible')
  .click({ force: true });
        //Clica no carrossel
        cy.get(':nth-child(2) > .actions > .actions-line > :nth-child(1) > .btn').click()
        //Adicione o seu treinamento criado
        cy.log('SELECIONE O SEU TREINAMENTO CRIADO')
        cy.wait(15000)

        // Clica no botão "Adicionar"
cy.contains('button.btn-swipe-accent.btn-small.small.ng-binding', 'Adicionar')
  .should('be.visible')
  .click({ force: true });

// Clica no botão "Salvar" no carrosel
cy.contains('button.btn-swipe-accent.ng-binding', 'Salvar')
  .should('be.visible')
  .click({ force: true });

//clica em salvar novamente
cy.contains('button.btn-swipe-accent.ng-scope', 'Salvar')
  .should('be.visible')
  .click({ force: true });

   //Clica no icone da foto para abrir o modal e trocar o perfil
    cy.get('.button > [src="/img/svg/avatar.svg"]').click()
    cy.wait(2000)

    //Clica em selecionar perfil
    cy.get('.icon-pointer-right').click()

    // Clica em 'Aluno - Todos'
    cy.contains('div.option.item.ng-scope.btn-swipe-lgray', 'Aluno - Todos')
      .scrollIntoView()
      .click({ force: true });

    });
    */
  });
});
