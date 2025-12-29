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


  context("Criando Treinamento", () => {
    it("Aba Geral", () => {
     

     // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem').click()
      cy.wait(5000) //espera alguns segundos para carregar a pagina

      cy.contains('li.list-group-item', 'Teste Automação')
  .click({ force: true })

      //Editando Nome do treinamento e o Idioma
      cy.get('.title-bar > .btn-icon').click()
      cy.get("#courseName").click(); // Clica pra digitar
      cy.get("#courseName").type("Teste Automação") //  Nome no Treinamento
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
      */
    });
/*
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
    it('Conteúdos', () => {
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo 
      
      //Gravação
      // Abre o select de Gravações
cy.contains('.ui-select-container', 'Informe o nome do evento')
  .should('be.visible')
  .click()

// Digita no campo de busca do ui-select
cy.contains('.ui-select-container', 'Informe o nome do evento')
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .clear()
      .type('Relatório Faturamento Philips')
  })
  cy.wait(2000)

// Clica na gravação quando aparecer
cy.contains(
  '.ui-select-choices-row',
  'Relatório Faturamento Philips',
  { timeout: 10000 }
)
  .should('be.visible')
  .click()

  cy.get('.editing-resource > .end > .btn-swipe-accent').click()

      //Documento PDF
      
     cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
        cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo
        cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
        cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo

      cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Chamada.pdf')
  })

    cy.wait(2000)

 cy.contains(
  '.ui-select-choices-row',
  'Chamada.pdf',
  { timeout: 10000 }
)
  .should('be.visible')
  .click()
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 
      
      //Documento xlsx
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
      
      cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Bugs da webconferência 03.11.2023')
  })

    cy.wait(2000)

 cy.contains(
  '.ui-select-choices-row',
  'Bugs da webconferência 03.11.2023',
  { timeout: 10000 }
)
  .should('be.visible')
  .click()
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 

       
      //Documento pptx
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
      
      cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Certificado 14.02.2024')
  })

    cy.wait(2000)

 cy.contains(
  '.ui-select-choices-row',
  'Certificado 14.02.2024',
  { timeout: 10000 }
)
  .should('be.visible')
  .click()
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 


      //Documento word(.doc)
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
      
      cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('6518 - Opcao de evento hibrido')
  })

    cy.wait(2000)

 cy.contains(
  '.ui-select-choices-row',
  '6518 - Opcao de evento hibrido',
  { timeout: 10000 }
)
  .should('be.visible')
  .click()
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 

       //Avaliação um por página
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('.open > .ui-select-choices > :nth-child(3)').click()                   // Clica em Avaliação

      cy.contains('.ui-select-container', 'Escolha uma avaliação')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('uma por página Thiago')
  })

    cy.wait(2000)

 cy.contains(
  '.ui-select-choices-row',
  'uma por página Thiago',
  { timeout: 10000 }
)
 .should('be.visible')
  .click()
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 


      //Avaliação com todas as questoes por pagina
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('.open > .ui-select-choices > :nth-child(3)').click()                   // Clica em Avaliação
      
      cy.contains('.ui-select-container', 'Escolha uma avaliação')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('todas na mesma página Thiago')
  })

    cy.wait(2000)

 cy.contains(
  '.ui-select-choices-row',
  'todas na mesma página Thiago',
  { timeout: 10000 }
)
 .should('be.visible')
  .click()
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 

      //Aula Presencial
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('body .ui-select-choices-row', { timeout: 5000 })                       // Clica em Aula presencial
  .should('be.visible')
  .contains(/^\s*Aula\s*Presencial\s*$/i)
  .click({ force: true });

cy.get('input[placeholder="Nome"]:visible')
  .first()
  .clear()
  .type('Aula Presencial Cypress');

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
      
  
      // Webconferencia Teans
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      
      // Clica na opção "Webconferência"

// Seleciona Webconferência
cy.contains('.ui-select-choices-row', 'Webconferência', { timeout: 10000 })
  .click();

  cy.get('input[placeholder="Nome"]:visible')
  .first()
  .clear()
  .type('Web Conferencia Cypress');
//Clica na plaforma
  cy.get('[ng-if="contaInfo.toolsConfig.webconferenceParams.enableExternalPlatforms"] > .w-100').click()
//Clica no teans
cy.get('.open > .ui-select-choices > :nth-child(2)', { timeout: 10000 })
  .should('be.visible')
  .click();

  cy.get('input[ng-model="editingResource.url"]', { timeout: 10000 })
  .should('be.visible')
  .and('not.be.disabled')
  .type('https://teams.live.com/meet/9327021005980?p=7AuU9CnF28qfXB0Gg0');

/*
  cy.get('input[ng-model="editingResource.recordingUrl"]', { timeout: 10000 })
  .should('be.visible')
  .and('not.be.disabled')
  .clear()
  .type('https://teams.live.com/meet/9327021005980?p=7AuU9CnF28qfXB0Gg0');
*/
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar


      //Video
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('body .ui-select-choices-row')
  .contains(/V[ií]deo/i)
  .click({ force: true });

  cy.contains('.ui-select-container', 'Escolha um vídeo')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Automação Video da plataforma')
  })

    cy.wait(2000)

 cy.contains(
  '.ui-select-choices-row',
  'Automação Video da plataforma',
  { timeout: 10000 }
)
 .should('be.visible')
  .click()
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 


      //Video Youtube
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      
      cy.get('body .ui-select-choices-row')
  .contains(/V[ií]deo/i)
  .click({ force: true });

      cy.get('input[type="radio"][ng-model="editingResource.videoType"][value="LINK"]') //Clica em youtube/vimeo
  .scrollIntoView({ block: 'center' })
  .check({ force: true });
  cy.wait(2000)

  cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
  .scrollIntoView()
  .then($el => {
    cy.wrap($el)
      .click({ force: true })
      .invoke('val', 'Automação Video do Youtube')
      .trigger('input')   // atualiza ng-model
      .trigger('change')
      .trigger('blur');
  });

cy.get('input[placeholder="Nome"]:visible')
  .should('have.value', 'Automação Video do Youtube');


      cy.get('input[placeholder="Link"]', { timeout: 8000 })
  .should('be.visible')                                                                //coloca o link
  .scrollIntoView({ block: 'center' })
  .click({ force: true })
  .type('{selectall}{backspace}https://www.youtube.com/watch?v=QC8iQqtG0hg', { delay: 0 });

        cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar

cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      
      cy.get('body .ui-select-choices-row')
  .contains(/V[ií]deo/i)
  .click({ force: true });

      cy.get('input[type="radio"][ng-model="editingResource.videoType"][value="LINK"]') //Clica em youtube/vimeo
  .scrollIntoView({ block: 'center' })
  .check({ force: true });
  cy.wait(2000)

  cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
  .scrollIntoView()
  .then($el => {
    cy.wrap($el)
      .click({ force: true })
      .invoke('val', 'Automação Video Vimeo')
      .trigger('input')   // atualiza ng-model
      .trigger('change')
      .trigger('blur');
  });

cy.get('input[placeholder="Nome"]:visible')
  .should('have.value', 'Automação Video Vimeo');

  cy.get('input[placeholder="Link"]', { timeout: 8000 })
  .should('be.visible')                                                                //coloca o link
  .scrollIntoView({ block: 'center' })
  .click({ force: true })
  .type('{selectall}{backspace}https://vimeo.com/300018306?fl=pl&fe=sh', { delay: 0 });

        cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar


      
      //Tópico
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('body .ui-select-choices-row:visible', { timeout: 5000 })
  .should('be.visible')
  .contains(/^\s*T[oó]pico\s*$/i)   // aceita com ou sem acento
  .click({ force: true });

  cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
  .scrollIntoView()
  .then($el => {
    cy.wrap($el)
      .click({ force: true })
      .invoke('val', 'Teste Tópico')
      .trigger('input')   // atualiza ng-model
      .trigger('change')
      .trigger('blur');
  });

const texto = 'Conteúdo escrito pelo Cypress ';

cy.get('iframe.cke_wysiwyg_frame', { timeout: 15000 })
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .click()
  .type(`{selectall}{backspace}${texto}`, { delay: 10 })
  .trigger('keyup')
  .trigger('change')
  .trigger('blur');

      cy.wait(2000)

   cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar


       //Scorm
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('body .ui-select-choices-row:visible', { timeout: 5000 })
  .should('be.visible')
  .contains(/^\s*SCORM\s*\/\s*IMSCC?\s*$/i)   
  .scrollIntoView()
  .click({ force: true });

  cy.contains('.ui-select-container', 'Escolha um documento')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('NR-12')
  })

    cy.wait(2000)

 cy.contains('.ui-select-choices-row', 'NR-12', { timeout: 10000 })
  .should('be.visible')
  .click();

  cy.get('.editing-resource > .end > .btn-swipe-accent', { timeout: 10000 })
  .should('exist')
  .click({ force: true });
cy.wait(6000)
  
      //Entrega de atividade        
      cy.contains('button', /^Novo conteúdo$/i) //Clica em novo conteudo
  .should('be.visible')
  .click({ force: true });
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba

      cy.contains('.ui-select-choices-row', 'Entrega de atividade', { timeout: 10000 })
  .should('be.visible')
  .click();

  cy.get('input[placeholder="Nome"]:visible', { timeout: 10000 })
  .scrollIntoView()
  .then($el => {
    cy.wrap($el)
      .click({ force: true })
      .invoke('val', 'Automação Entrega de Atividade')
      .trigger('input')   // atualiza ng-model
      .trigger('change')
      .trigger('blur');
  });

cy.get('input[placeholder="Nome"]:visible')
  .should('have.value', 'Automação Entrega de Atividade');
  cy.log('ROLE PARA BAIXO PARA APARECER O BOTÃO DE ADICIONAR')
  cy.wait(5000)

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar

      //Avaliação de reaççao e pesquisa todoas na mesma pagina
       cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba

      //Espera alguns segundos para rolar e ate aparecer avaliação de reação
      cy.log('ROLE PARA BAIXO NA LISTA ATÉ APARECER ENTREGA DE ATIVIDADE')
      cy.wait(4000)
      // Clica na opção "Avaliação de Reação/Pesquisa"
cy.get('body .ui-select-choices-row', { timeout: 10000 })
  .should('be.visible')
  .contains(/Avalia[cç][aã]o de Rea[cç][aã]o\/Pesquisa/i)
  .click({ force: true });

  cy.contains('.ui-select-container', 'Escolha uma avaliação')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Reação uma por página Thiago')
  })

    cy.wait(2000)

 cy.contains(
  '.ui-select-choices-row',
  'Reação uma por página Thiago',
  { timeout: 10000 }
)
 .should('be.visible')
  .click()

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
      
      //Avaliação de reaççao e pesquisa uma por pagina
       cy.contains('button', /^Novo conteúdo$/i) //Clica em novo conteudo
  .should('be.visible')
  .click({ force: true });
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      //Espera alguns segundos para rolar e ate aparecer avaliação de reação
      cy.log('ROLE PARA BAIXO NA LISTA ATÉ APARECER ENTREGA DE ATIVIDADE')
      cy.wait(4000)
      // Clica na opção "Avaliação de Reação/Pesquisa"
cy.get('body .ui-select-choices-row', { timeout: 10000 })
  .should('be.visible')
  .contains(/Avalia[cç][aã]o de Rea[cç][aã]o\/Pesquisa/i)
  .click({ force: true });

   cy.contains('.ui-select-container', 'Escolha uma avaliação')
  .should('be.visible')
  .click()
  .within(() => {
    cy.get('input.ui-select-search')
      .should('be.visible')
      .type('Reação todas em uma página Thiago')
  })

    cy.wait(2000)

 cy.contains(
  '.ui-select-choices-row',
  'Reação todas em uma página Thiago',
  { timeout: 10000 }
)
 .should('be.visible')
  .click()

      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
      
      //Certificados
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      // Clica na opção "Certificado"
cy.get('body .ui-select-choices-row', { timeout: 10000 })
  .should('be.visible')
  .contains(/^Certificado$/i)
  .click({ force: true });
      //Espera alguns segundos para rolar e ate aparecer avaliação de reação
      cy.log('ROLE PARA BAIXO NA LISTA ATÉ CERTIFICADO')
      cy.wait(4000)
     
// acha o bloco do certificado pelo placeholder e abre o select
cy.contains('.ui-select-container', 'Informe o nome do certificado', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible')
  .within(() => {
    cy.get('.ui-select-toggle').click({ force: true });
  });


  cy.get('input.ui-select-search:visible', { timeout: 10000 })
  .should('have.length', 1)
  .clear({ force: true })
  .type('Certificado do Treinamento', { force: true, delay: 30 });

  cy.wait(2000)


// se existir opção, clica nela
cy.get('.ui-select-choices-row', { timeout: 10000 })
  .contains('Certificado do Treinamento')
  .click({ force: true });

        cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar

      
    })
    it('Turma Gratuita/Paga', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Teste turma Gratuita"); //nome da turma
      cy.log('MANUALMENTE ATIVE E DESATIVE A APROVAÇÃO DO GESTOR, DEIXE A TURMA A TURMA COMO GRATUITA,DEFINE UM PERIODO DE REALIZAÇÃO E INCRIÇÃO, ADICIONE UM GESTOR')
      cy.wait(3000)
      
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REALIZE O AGENDAMENTO')
      cy.wait(20000)
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REMOVE GRUPO TODOS')
      cy.log('MANUALMENTE ADICIONE UM GRUPO/PERFIL')
      cy.wait(10000)
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.step3 > .btn-swipe-accent').click()
  .click({ force: true });
      cy.log('MANUALMENTE ADICIONE UM BLOQUEIO DE VISUALIZAÇÃO')
      cy.wait(15000)
      
      // Clica no botão "Salvar Turma"
    
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
      
      cy.get('[title="Clonar turma"] > .icon-copy').click()
      cy.log('TURMA CLONADA !!! EDITE O NOME|SELECIONE TURMA PAGA|ALTERE AS PERMISOES|VERIFICAR SE TEM OS AGENDAMENTOS')
      cy.wait(10000)
      cy.get('.add-content > .end > .btn-swipe-accent').click() //Salvar
      
      //Turma Paga
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Teste turma Paga"); //nome da turma
      cy.log('MANUALMENTE ATIVE E DESATIVE A APROVAÇÃO DO GESTOR, DEFINIR PREÇO FIXO,DEFINE UM PERIODO DE REALIZAÇÃO E INCRIÇÃO, ADICIONE UM GESTOR')
      cy.wait(3000)
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REALIZE O AGENDAMENTO')
      cy.wait(20000)
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.log('REMOVE GRUPO TODOS')
      cy.log('MANUALMENTE ADICIONE UM GRUPO/PERFIL')
      cy.wait(10000)
      cy.get('.navigation-controls > .ml-20').click()//botao prximo
      cy.get('.step3 > .btn-swipe-accent').click()
  .click({ force: true });
      cy.log('MANUALMENTE ADICIONE UM BLOQUEIO DE VISUALIZAÇÃO')
      cy.wait(15000)
      // Clica no botão "Salvar"
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.log('NA TERCEIRA TURMA CLIQUE EM CLONAR TURMA')
      cy.wait(5000)
      cy.log('TURMA CLONADA !!| EDITE O NOME|SELECIONE TURMA GRATUITA|ALTERE AS PERMISOES|VERIFICAR SE TEM OS AGENDAMENTOS')
      cy.wait(10000)
      cy.get('.add-content > .end > .btn-swipe-accent').click() //Salvar

      cy.get(".content-box-footer > .flex > .btn-swipe-accent").click(); //botão de salvar
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
      
      

    })

    it('Campo personalizado', () => {

        cy.wait(4000)
        //Abre o treinamento
        cy.get('.card-items').click()
        cy.wait(5000)
        cy.get('.end.ng-scope > .icon-edit').click() // Clica em editar
        cy.wait(2000)

        //Clica em campos personalizado
        cy.contains('a.ng-binding.ng-scope', 'Campos personalizados')
  .should('be.visible')
  .click({ force: true });
        //Clica em novo campo personalizado
        cy.contains('button.btn-swipe-accent.ng-binding', 'Novo campo personalizado')
  .should('be.visible')
  .click({ force: true });
        //Epera alguns segundos
        cy.log('ESCREVA UM NOME NO CAMPO PERSONALIZADO')
        cy.wait(5000)
        //Botão adicionar
        cy.get('.custom-field-editor > :nth-child(4) > .end > .btn-swipe-accent')
        //Salva o treinamento com o campo personalizado
        cy.contains('button.btn-swipe-accent', 'Salvar')
  .should('be.visible')
  .click({ force: true });

    });
  
    it("Bloqueio de incrição", () => {
     //clica no treinamento
     cy.get('.card-items').click()
     cy.wait(5000)
     cy.get('.end.ng-scope > .icon-edit').click() // Clica em editar
     cy.wait(2000)
     //clica em bloqueio de incrição
     cy.contains('a.ng-binding.ng-scope', 'Bloqueios de inscrição')
  .should('be.visible')
  .click({ force: true });
     cy.wait(15000) //Espera alguns segundos para digitar um nome e a data
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
 

    it('Adicionando o Treinamento na Vitrine', () => { 
     //Role até aparecer vitrines
    cy.log('ROLE ATÉ APARECER A VITRINES NA ABA')
    cy.wait(4000)

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
  });
});



