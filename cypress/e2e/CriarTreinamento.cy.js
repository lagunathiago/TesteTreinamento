/// <reference types="cypress" />

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://hml.lector.live/landing");
    cy.contains("button", "Entrar").click();
    cy.get('form.ng-pristine > [type="text"]').type("thiagosuporte@uorak.com");
    cy.get("ng-transclude > .border").type("123");
    cy.get(":nth-child(4) > .btn-swipe-accent").click();

});



  context("Criando Treinamento", () => {
    it("Aba Geral", () => {
     

     // Clicando na aba Treinamento
      cy.get('[title="Treinamentos"] > .sideitem').click()
      cy.wait(3000) //espera alguns segundos para carregar a pagina

      //Categoria
      cy.log('CRIE MANUALMENTE UMA CATEGORIA E UMA SUBCATEGORIA, E EM SEGUIDA, RETORNE PARA A ABA PRINCIPAL DA CATEGORIA RECÉM-CRIADA.')
      cy.wait(15000)

      //Editando Nome do treinamento e o Idioma
      cy.get('.title-bar > .btn-icon').click()
      cy.get("#courseName").click(); // Clica pra digitar
      cy.get("#courseName").type("Teste Automação") //  Nome no Treinamento

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

      //cy.get('[min-grade=""] > .input-number > .ng-pristine').type('50') //Aproveitamento minimo
      
      cy.get('[mail-interested=""] > .checkbox > .icon-checkbox').click() //Enviar e-mail aos usuários da lista de espera quando uma vaga for disponibilizada
      cy.get('[accessibility=""] > .checkbox > .icon-checkbox').click()  // Acessebilidade
      
      cy.get('[terms-of-use] input[type="checkbox"]') //Termo aceite
  .scrollIntoView({ block: 'center' })
  .check({ force: true });        

  //Aguarda 30 segundos pra prencher algumas informações manualmente
  //-Descrição
  //-Resumo
  //-Tipo
  //-Resumo
  //-Progresso
  //Aproveitamento
      cy.log('PREENCHER IMFORMAÇOES MANUALMENTE DESCRIÇÃO|RESUMO|TIPO|PROGRESSO|APROVEITAMENTO')
      cy.wait(5000)
      /*
    });

    

    it('Autores', () => {

      cy.get('[ui-sref="accessLink.content.courses.edit.id.authors"]').click()        // Clica em Autores

      cy.get('[authors=""] > .ng-isolate-scope > .multiselect > .border > :nth-child(1) > .ui-select-search').type('Autor')  // Digita Autores
      cy.log('CLIQUE EM UM AUTOR')
      cy.wait(3000)                                                                                                          // Espera alguns segundo
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
  cy.wait(4000) 

  cy.get('button[ng-click="saveAuthor()"]', { timeout: 10000 }) //Salvar em salvar
  .should('be.visible')
  .scrollIntoView({ block: 'center' })
  .click({ force: true });

*/
    })

    it('Conteúdos', () => {
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click()      // Clica em conteudos
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo 
      
      //Gravação
      cy.log('DIGITE UMA GRAVAÇAO E SELECIONE')
      cy.wait(10000)
      cy.get(".weight").type("1");                                                   // Selecionar peso
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
  /*    
      //Documento PDF
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
      cy.log('DIGITE UM DOCUMENTO EM PDF E SELECIONE')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 
      
      //Documento xlsx
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
      cy.log('DIGITE UM DOCUMENTO EM XLSX E SELECIONE')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 
       
      //Documento pptx
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
      cy.log('DIGITE UM DOCUMENTO EM PPTX E SELECIONE')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 

      //Documento word(.doc)
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar documentos como tipo de conteúdo
      cy.log('DIGITE UM DOCUMENTO WORD(.DOC) E SELECIONE')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar 

       //Avaliação um por página
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('.open > .ui-select-choices > :nth-child(3)').click()                   // Clica em Avaliação
      cy.log('DIGITE UMA AVALIAÇÃO COM UMA QUESTÃO POR PAGINA E SELECIONE')
      cy.wait(10000)
      cy.get(".weight").type("1");                                                   // selecionar peso
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  //selecionar peso 1
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar

      //Avaliação com todas as questoes por pagina
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('.open > .ui-select-choices > :nth-child(3)').click()                   // Clica em Avaliação
      cy.log('DIGITE UMA AVALIAÇÃO COM TODAS AS QUESTÃO POR PAGINA E SELECIONE')
      cy.wait(10000)
      cy.get(".weight").type("1");                                                   // Selecionar peso
      cy.get(".open > .ui-select-choices > :nth-child(2)").click();                  // Selecionar peso 1
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
      
      //Aula Presencial
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('body .ui-select-choices-row', { timeout: 5000 })                       // Clica em Aula presencial
  .should('be.visible')
  .contains(/^\s*Aula\s*Presencial\s*$/i)
  .click({ force: true });
      cy.log('DIGITE UM NOME DA AULA PRESENCIAL')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
  
      // Webconferencia Lector
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      // Clica na opção "Webconferência"
      cy.log('SELECIONE WEBCONFERENCIA')
      cy.wait(6000)
      cy.log('DIGITE UM NOME PARA A SUA WEBCONFERENCIA')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar

      //Video
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('body .ui-select-choices-row')
  .contains(/V[ií]deo/i)
  .click({ force: true });
      cy.log('DIGITE UM VIDEO DA PLATAFORMA LECTOR')
      cy.wait(10000)
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

      cy.get('input[placeholder="Link"]', { timeout: 8000 })
  .should('be.visible')                                                                //coloca o link
  .scrollIntoView({ block: 'center' })
  .click({ force: true })
  .type('{selectall}{backspace}https://www.youtube.com/watch?v=DfcXJYv_dxE', { delay: 0 });

      cy.log('DIGITE O NOME DO VIDEO ')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar


      //Video Vimeo
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('body .ui-select-choices-row')
  .contains(/V[ií]deo/i)
  .click({ force: true });

      cy.get('input[type="radio"][ng-model="editingResource.videoType"][value="LINK"]') //Clica em youtube/vimeo
  .scrollIntoView({ block: 'center' })
  .check({ force: true });

      cy.get('input[placeholder="Link"]', { timeout: 8000 })
  .should('be.visible')                                                                //coloca o link
  .scrollIntoView({ block: 'center' })
  .click({ force: true })
  .type('{selectall}{backspace}https://vimeo.com/100716497?fl=pl&fe=sh', { delay: 0 });

      cy.log('DIGITE O NOME DO VIDEO ')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
      
      //Tópico
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('body .ui-select-choices-row:visible', { timeout: 5000 })
  .should('be.visible')
  .contains(/^\s*T[oó]pico\s*$/i)   // aceita com ou sem acento
  .click({ force: true });
      cy.log('DIGITE O NOME DO TÓPICO E UM CONTEÚDO')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
       
       //Scorm
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      cy.get('body .ui-select-choices-row:visible', { timeout: 5000 })
  .should('be.visible')
  .contains(/^\s*SCORM\s*\/\s*IMSCC?\s*$/i)   
  .scrollIntoView()
  .click({ force: true });
      cy.log('DIGITE UM SCORM E SELECIONE')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
      

      //Entrega de atividade        
      cy.contains('button', /^Novo conteúdo$/i) //Clica em novo conteudo
  .should('be.visible')
  .click({ force: true });
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      // (garanta que o dropdown está aberto)
      cy.log('SELECIONE ENTREGA DE ATIVIDADEDE')
      cy.wait(6000)
      //Adicione um nome para a entrega de atividade
      cy.log('INSIRA UM NOME PARA A ENTREGA DE ATIVIDADE')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar

      //Avaliação de reaççao e pesquisa todoas na mesma pagina
       cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click()                 // Clica em novo conteudo
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      //Espera alguns segundos para rolar e ate aparecer avaliação de reação
      cy.log('ROLE PARA BAIXO NA LISTA ATÉ APARECER ENTREGA DE ATIVIDADE')
      cy.wait(6000)
      // Clica na opção "Avaliação de Reação/Pesquisa"
cy.get('body .ui-select-choices-row', { timeout: 10000 })
  .should('be.visible')
  .contains(/Avalia[cç][aã]o de Rea[cç][aã]o\/Pesquisa/i)
  .click({ force: true });
  cy.log('INSIRA UMA AVALIAÇÃO REAÇÃO PESQUISA/TODAS NA MESMA PAGINA E SELECIONE')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
      
      //Avaliação de reaççao e pesquisa uma por pagina
       cy.contains('button', /^Novo conteúdo$/i) //Clica em novo conteudo
  .should('be.visible')
  .click({ force: true });
      cy.get('.editing-resource > :nth-child(2) > .w-100').click()                   // Clicou na aba
      //Espera alguns segundos para rolar e ate aparecer avaliação de reação
      cy.log('ROLE PARA BAIXO NA LISTA ATÉ APARECER ENTREGA DE ATIVIDADE')
      cy.wait(5000)
      // Clica na opção "Avaliação de Reação/Pesquisa"
cy.get('body .ui-select-choices-row', { timeout: 10000 })
  .should('be.visible')
  .contains(/Avalia[cç][aã]o de Rea[cç][aã]o\/Pesquisa/i)
  .click({ force: true });
  cy.log('INSIRA UMA AVALIAÇÃO REAÇÃO PESQUISA/TODAS NA MESMA PAGINA E ADICIONE')
      cy.wait(10000)
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
      cy.wait(5000)
      // Clica na opção "Certificado"
cy.get('body .ui-select-choices-row', { timeout: 10000 })
  .should('be.visible')
  .contains(/^Certificado$/i)
  .click({ force: true });
       cy.log('INSIRA UM NOME PARA O CERTIFICADO E ADICIONE')
      cy.wait(10000)
      cy.get(".editing-resource > .end > .btn-swipe-accent").click();                // Clica em adicionar
      */
    })
    it('Turma Gratuita/Paga', () => {
      //Turma Gratuita
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click()
      cy.get('[ng-click="editClass()"]').click() //Nova turma
      cy.get("#className").type("Teste turma Gratuita"); //nome da turma
      cy.log('MANUALMENTE ATIVE E DESATIVE A APROVAÇÃO DO GESTOR, DEIXE A TURMA A TURMA COMO GRATUITA,DEFINE UM PERIODO DE REALIZAÇÃO E INCRIÇÃO, ADICIONE UM GESTOR')
      cy.wait(3000)
      /*
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
      */
      // Clica no botão "Salvar Turma"
    
      cy.get('.add-content > .end > .btn-swipe-accent').click()
      cy.get('.content-box-footer > .flex > .btn-swipe-accent').click()
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar sem versionamento
      /*
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
      
      */

    })
/*
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
 */

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



