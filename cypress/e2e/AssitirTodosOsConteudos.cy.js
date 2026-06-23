Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  // Erros conhecidos do Angular / Front que não devem quebrar o teste
  if (
    msg.includes('Cannot read properties of null') ||
    msg.includes('Cannot read properties of undefined') ||   // ✅ novo
    msg.includes("reading 'then'") ||                         // ✅ novo
    msg.includes('charAt') ||
    msg.includes('writeText') ||
    msg.includes('Clipboard') ||
    msg.includes('Document is not focused')
  ) {
    return false;
  }
});

describe("Teste - Login e troca de perfil", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

      cy.viewport(1920, 1080);

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("testeaut@uorak.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

context("Assitir Treinamento", { testIsolation: false }, () => {
  

   it('Vai até a vitrine', () => {

        //Clica em conteúdos
        cy.get('.active > .ng-binding',{timeout:60000})
        .should('be.visible')
        .click()

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

  it('Clica no treinamento ', ()=> {

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

    })

  it("Clicar em Fazer inscrição (se disponivel)", () => {

   // Clica na turma
    cy.get('label.class-container')
  .first()
  .click();

      cy.wait(2000)

      //Clica em fazer incrição
      cy.get('.selected > .class-info > .classes-actions > .btn-swipe-accent')
      .should('be.visible')
      .click();

      cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .modal-body > .default-table > tbody > tr > .p-5 > .ui-select-container',{timeout:60000})
        .click()

        cy.wait(1000)

        //Online
        cy.get('.open > .ui-select-choices > :nth-child(1)',{timeout:60000})
        .click()

        cy.wait(1000)

        //Continuar Incrição
        cy.get('[ng-show="modal.hybridEventsChoice"] > .modal > .content-box-footer > .btn-swipe-accent',{timeout:60000})
        .click()

  });

  // --- GRAVAÇÃO ---
  it("Assistir gravação e valida status, P/A 100%", () => {

    cy.log('ASSISTA À GRAVAÇÃO COMPLETA E, AO FINAL, RETIRE O PAUSE DO CYPRESS PARA PROSSEGUIR COM A EXECUÇÃO.');

    cy.get('.info-section-title', { timeout: 60000 })
  .should('be.visible')
  .and('contain', 'Relatório Faturamento Philips');

    cy.log('ASSISTA À GRAVAÇÃO COMPLETA E, AO FINAL, RETIRE O PAUSE DO CYPRESS PARA PROSSEGUIR COM A EXECUÇÃO.');
    cy.pause();

  //Clica no menu
  cy.get('#resourceMenuIndicator')
  .should('be.visible') 
  .click()

  cy.wait(2000)

cy.contains('li.course-content', 'Relatório Faturamento Philips', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    expect(textoLimpo).to.include('A 100%');
  });

  });


  // --- DOCUMENTO 1 ---
  it("Abrir documento PDF e validar 100%", () => {
    cy.wait(2000);

    //Clica no documento PDF
   cy.get('.resources-list-container > ul > :nth-child(2)')
  .should('be.visible')
  .click();

  //Verifica se o título do documento está visível
    cy.get('.info-section-title', { timeout: 60000 })
  .should('be.visible')
  .and('contain', 'Chamada');

  cy.wait(2000)

  //Clica no em comfirmação deleitura
  cy.get('#nextResourceArrow', { timeout: 10000 })
  .click({ force: true });

  cy.wait(2000)

  //Clica no chatbox 'li e concordo'
  cy.get('.modal-overlay:visible .modal', { timeout: 60000 })
  .first()
  .within(() => {
    cy.contains('label.checkbox, .checkbox', 'Li e concordo')
      .click({ force: true });
  });

    cy.wait(1000)

  //Clica em confirmar
  cy.get('[switch="modal.agreementRequired"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

  cy.contains('li.course-content', 'Chamada', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    expect(textoLimpo).to.include('A 100%');
  });

cy.wait(1000)



  });

  // --- DOCUMENTO 2 ---
  it("Abrir documento jpg e validar 100%", () => {

    //Clica no documento JPG
   cy.get('.resources-list-container > ul > :nth-child(3)')
  .should('be.visible')
  .click();

   //Verifica se o título do documento está visível
    cy.get('.info-section-title', { timeout: 60000 })
  .should('be.visible')
  .and('contain', 'CAPA 19');

  cy.wait(2000)

  //Clica no em comfirmação deleitura
  cy.get('#nextResourceArrow', { timeout: 10000 })
  .click({ force: true });

  cy.wait(2000)

  //Clica no chatbox 'li e concordo'
  cy.get('.modal-overlay:visible .modal', { timeout: 60000 })
  .first()
  .within(() => {
    cy.contains('label.checkbox, .checkbox', 'Li e concordo')
      .click({ force: true });
  });

    cy.wait(1000)

  //Clica em confirmar
  cy.get('[switch="modal.agreementRequired"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

   cy.contains('li.course-content', 'CAPA 19', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    expect(textoLimpo).to.include('A 100%');
  });

  cy.wait(1000)

  });
  

  // --- DOCUMENTO 3 ---
  it("Abrir documento png e validar 100%", () => {

    //Clica no documento PNG
   cy.get('.resources-list-container > ul > :nth-child(4)')
  .should('be.visible')
  .click();

   //Verifica se o título do documento está visível
    cy.get('.info-section-title', { timeout: 60000 })
  .should('be.visible')
  .and('contain', 'Acessibilidade');

  cy.wait(7000)

  //Clica no em comfirmação deleitura
  cy.get('#nextResourceArrow', { timeout: 10000 })
  .click({ force: true });

  cy.wait(2000)

  //Clica no chatbox 'li e concordo'
  cy.get('.modal-overlay:visible .modal', { timeout: 60000 })
  .first()
  .within(() => {
    cy.contains('label.checkbox, .checkbox', 'Li e concordo')
      .click({ force: true });
  });

    cy.wait(1000)

  //Clica em confirmar
  cy.get('[switch="modal.agreementRequired"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

   cy.contains('li.course-content', 'Acessibilidade', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    expect(textoLimpo).to.include('A 100%');
  });

  cy.wait(1000)

  });

  // --- DOCUMENTO 4 ---
  it("Abrir documento docx e validar 100%", () => {
  
    //Clica no documento docx
   cy.get('.resources-list-container > ul > :nth-child(5)')
  .should('be.visible')
  .click();

   //Verifica se o título do documento está visível
    cy.get('.info-section-title', { timeout: 60000 })
  .should('be.visible')
  .and('contain', 'Bugs da webconferência 03.11.2023 (10)');

  cy.wait(7000)

  //Clica no em comfirmação deleitura
  cy.get('#nextResourceArrow', { timeout: 10000 })
  .click({ force: true });

  cy.wait(2000)

  //Clica no chatbox 'li e concordo'
  cy.get('.modal-overlay:visible .modal', { timeout: 60000 })
  .first()
  .within(() => {
    cy.contains('label.checkbox, .checkbox', 'Li e concordo')
      .click({ force: true });
  });

    cy.wait(1000)

  //Clica em confirmar
  cy.get('[switch="modal.agreementRequired"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',{timeout:60000})
  .should('be.visible')
  .click()

  cy.wait(1000)

   cy.contains('li.course-content', 'Bugs da webconferência 03.11.2023 (10)', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    expect(textoLimpo).to.include('A 100%');
  });

  cy.wait(1000)

  });

  // --- DOCUMENTO 5 ---
  it("Abrir documento xlsx e validar 100%", () => {

   //Clica no documento xlsx
   cy.get('.resources-list-container > ul > :nth-child(6)')
  .should('be.visible')
  .click();

   //Verifica se o título do documento está visível
    cy.get('.info-section-title', { timeout: 60000 })
  .should('be.visible')
  .and('contain', 'Certificado 14.02.2024');

  cy.wait(7000)

  cy.contains('li.course-content', 'Certificado 14.02.2024', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    expect(textoLimpo).to.include('A 100%');
  });

  cy.wait(1000)

  });

  // --- DOCUMENTO 6 ---
    it("Abrir documento word e validar 100%", () => {

       //Clica no documento xlsx
   cy.get('.resources-list-container > ul > :nth-child(7)')
  .should('be.visible')
  .click();

   //Verifica se o título do documento está visível
    cy.get('.info-section-title', { timeout: 60000 })
  .should('be.visible')
  .and('contain', '6518 - Opcao de evento hibrido (20)');

  cy.wait(7000)

  cy.contains('li.course-content', '6518 - Opcao de evento hibrido (20)', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    expect(textoLimpo).to.include('A 100%');
  });

  cy.wait(1000)

  });

  it("Avaliação uma por pagina", () => {

    cy.wait(1000)

    // Clica na avaliação 
  cy.get('.resources-list-container > ul > :nth-child(8)')
  .should('be.visible')
  .click();

      cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ PREENCHA A AVALIAÇÃO E CLIQUE EM ENVIAR,PARA PROSSEGUIR!';
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

     cy.contains('li.course-content', 'uma por página Thiago', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');

  });

  });

  it("Avaliação todas na mesma página", () => {

    cy.wait(1000)

    cy.get('.resources-list-container > ul > :nth-child(9)')
  .should('be.visible')
  .click();

     cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ PREENCHA A AVALIAÇÃO E CLIQUE EM ENVIAR,PARA PROSSEGUIR!';
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


     cy.contains('li.course-content', 'todas na mesma página Thiago', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
  })

  });
   
  it("Avaliação Correção", () => {

    cy.wait(1000)

   cy.get('.resources-list-container > ul > :nth-child(10)')
  .should('be.visible')
  .click();

     cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ PREENCHA A AVALIAÇÃO E CLIQUE EM ENVIAR,PARA PROSSEGUIR!';
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

      cy.contains('li.course-content', 'todas na mesma página Thiago', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    });

  });

  it("Aula Presencial", () => {

    //Clica na aula presencial
    cy.wait(1000)

    // Clica na Aula Presencial
  cy.get('.resources-list-container > ul > :nth-child(11)')
  .should('be.visible')
  .click();

     //Verifica se o título do documento está visível
    cy.get('.info-section-title', { timeout: 60000 })
  .should('be.visible')
  .and('contain', 'Aula Presencial');

    cy.wait(3000);

  });

       it("Direcionamento para YOUTUBE", () => {
  cy.wait(3000)

  // Ignora o erro específico que a aplicação dispara ao abrir a Webconferência
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes("reading '@class'")) {
      // retorna false para o Cypress NÃO falhar o teste
      return false;
    }
    // outros erros continuam quebrando o teste
  });

   //Clica na aula presencial
    cy.wait(1000)

    // Clica na Aula Presencial - Youtube
  cy.get('.resources-list-container > ul > :nth-child(12)')
  .should('be.visible')
  .click();
 
  cy.wait(6000);

      });

  it("Vídeo Lector", () => {
    
    cy.wait(1000)

    // Clica no video lector
  cy.get('.resources-list-container > ul > :nth-child(13)')
  .scrollIntoView()
  .should('be.visible')
  .click();

      cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ VISUALIZE O VIDEO COMPLETO E PROSSIGA COM A AUTOMAÇÃO!';
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

  cy.contains('li.course-content', 'Automação Video da plataforma.mp4', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    expect(textoLimpo).to.include('A 100%');
  });

  });

  it("Video Youtube", () => {

     cy.wait(1000)

    // Clica no video youtube
  cy.get('.resources-list-container > ul > :nth-child(14)')
  .scrollIntoView()
  .should('be.visible')
  .click();

      cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ VISUALIZE O VIDEO COMPLETO E PROSSIGA COM A AUTOMAÇÃO!';
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

  cy.contains('li.course-content', 'Automação Video do Youtube', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
    expect(textoLimpo).to.include('A 100%');
  });
   
  });

  it("Topico ", () => {
   
     // Clica no topico
  cy.get('.resources-list-container > ul > :nth-child(16)')
  .scrollIntoView()
  .should('be.visible')
  .click();

      cy.log('Verifique se tem algo escrito')
    cy.wait(7000);

   });

  // Teste SCORM
  it("Scorm", () => {

    cy.wait(1000);
   
         // Clica no scorm
  cy.get('.resources-list-container > ul > :nth-child(17)')
  .scrollIntoView()
  .should('be.visible')
  .click();

     cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = 'VISUALIZE E RESPONDA O SCORM, PROSSIGA COM A AUTOMAÇÃO!';
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

     cy.contains('li.course-content', 'Simbologia Maçônica', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();
    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
     });
  
});
  

  it("Entrega de atividade", () => {

    cy.wait(2000)

     // Clica na entrega de atividade
  cy.get('.resources-list-container > ul > :nth-child(18)')
  .scrollIntoView()
  .should('be.visible')
  .click();
  
      cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ ENVIE UM ARQUIVO PARA CORREÇÃO DA ENTREGA!';
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

cy.pause(); 
   
  });

  it("Reação todas na mesma página", () => {

    // Clica na avaliação de reaução
  cy.get('.resources-list-container > ul > :nth-child(19)')
  .scrollIntoView()
  .should('be.visible')
  .click();

    cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ PREENCHA A AVALIAÇÃO E CLIQUE EM ENVIAR,PARA PROSSEGUIR!';
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

     cy.contains('li.course-content', 'Reação uma por página Thiago', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
     });
  
  });

  it("Reação uma por página", () => {

    // Clica na avaliação de reação
  cy.get('.resources-list-container > ul > :nth-child(20)')
  .scrollIntoView()
  .should('be.visible')
  .click();

    cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.innerHTML = '⚠️ PREENCHA A AVALIAÇÃO E CLIQUE EM ENVIAR,PARA PROSSEGUIR!';
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

     cy.contains('li.course-content', 'Reação todas em uma página Thiago', { timeout: 10000 })
  .should('be.visible')
  .invoke('text')
  .then((texto) => {
    const textoLimpo = texto.replace(/\s+/g, ' ').trim();

    expect(textoLimpo).to.include('Concluído');
    expect(textoLimpo).to.include('P 100%');
     });

     cy.wait(2000)
  
  });
  
  it('Sai da tela de conteúdos', () => {

    //Clica no X
    cy.get('#resourceMenuIndicator')
    .should('be.visible')
    .click();

      cy.wait(2000);

      //Clica na seta de voltar
    cy.get("#hideResource", { timeout: 60000 })
      .should("be.visible")
      .click({ force: true });
    
  });
  it("Troca pro perfil Administrador", () => {

     //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    cy.wait(2000)

    //Clica em selecionar perfil
  cy.contains('.menu-option', 'Selecionar perfil', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

      cy.wait(2000)

  //Clica em Administrador
  cy.contains('span', 'Administrador - Todos', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });
  
      cy.wait(2000)

  });

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

      it('Clica no treinamento', ()=> {

  cy.contains('.card-title', /^Teste Automação$/)
  .scrollIntoView()
  .should('be.visible')
  .click()

  //Clica na turma
     cy.get('label.class-container:visible')
  .first()
  .click();

         // Clica no gerenciar
  cy.contains('.class-container', 'Turma Gratuita')
  .find('button.icon-manage')
  .click();

    });

    
    it('Corrige Avaliação', () => {

      //Clica em Corrigir Avalaiação
      cy.get('[ng-class*="manageSubscriptionsTabs.evaluations"]',{timeout:60000})
      .should('be.visible')
      .click()

      //Clica em corrigir
      cy.get('.center > .btn',{timeout:60000})
      .should('be.visible')
      .click()

      cy.get('.pv-10 > .input-number > div > .icon-pointer-up',{timeout:60000})
      .should('be.visible')
      .click()

      //Laço de Repetição(Clica dez vezes)
for (let i = 0; i < 10; i++) {
  cy.get('.pv-10 > .input-number > div > .icon-pointer-up')
    .click();
}

//Escreve
cy.get('textarea[ng-model="questionAnswer.observations"]')
  .should('be.visible')
  .type('Teste de observação da correção');

  //Clica em enviar avaliação 
  cy.contains('button', 'Enviar correção')
  .click();

  //Espera Carregar o envio da avaliação
  cy.wait(10000)

    });
    
    it('Corrige Entrega de atividade', () => {

      cy.wait(2000)

      //Clica em Corrigir Avalaiação
      cy.get('[ng-click*="activitydelivery"]')
      .should('be.visible')
      .click()

      //Clica em corrigir
      cy.get('.ng-scope > .icon')
      .should('be.visible')
      .click()

      cy.wait(2000)

     for (let i = 0; i < 10; i++) {
  cy.get(':nth-child(5) > .input-number > div > .icon-pointer-up')
    .click();
}

cy.wait(2000)

//Confirma
cy.get('[switch="modal.activityFeedback"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent')
  .should('be.visible')
  .click()

  //Espera Carregar o envio da avaliação
  cy.wait(10000)

    });

it('Clica em lista de Presençã(Aulas presenciais)', () => {
  
  //Clica na lista de presença
  cy.get('a[ng-click*="loadPresenceList"]')
  .should('be.visible')
  .click();

  
  //Clica na aula presencial cypress
  cy.get(':nth-child(5) > .flex > .ui-select-container')
  .should('be.visible')
  .click();

  cy.wait(2000)

  //Clica em prersencial
cy.get('.open > .ui-select-choices > :nth-child(2)')
  .should('be.visible')
  .click();

  //Clica em salvar
  cy.get('[ng-show="presenceList != null"] > .end > .mr-20')
  .should('be.visible')
  .click();

  cy.wait(3000)

  //Fecha modal
  cy.get('[switch="modal.manageSubscriptions"] > .modal > .modal-header > .btn',{ timeout: 60000 })
  .should('be.visible')
  .click()



})
    

    


    it('Verifica se está na vitrine Altomação', () => {

   //Clica em editar
  cy.get('.flex > .icon-edit',{timeout:60000})
  .should('be.visible')
  .click()

  //Clica em vitrine
  cy.get('[ui-sref="accessLink.content.courses.edit.id.showcases"]',{timeout:60000})
  .should('be.visible')
  .click()

  //Verefica se está na vitrine automação
  cy.contains('td','teste automoção', {timeout:60000})
  .should('be.visible')
  .click()

    });

    it('Indice de Aprendizado', () => {

      //Clicas em indice de aprendizado
      cy.get('[ui-sref="accessLink.content.courses.edit.id.learning-rate"]',{timeout:60000})
      .should('be.visible')
      .click()

      cy.wait(2000)

      //Verifica  se o indice de aprendizado está entre 0 a 100%
      cy.get('h1.lector-txt-main', { timeout: 60000 })
  .should('be.visible')
  .should(($el) => {
    const texto = $el.text().trim();
    const numero = Number(texto.replace(/[^\d]/g, ''));

    expect(texto).to.not.equal('');
    expect(numero).to.not.be.NaN;
    expect(numero).to.be.within(0, 100);

  });

    //Clica em Salvar
    cy.get('.content-box-footer > .flex > .btn-swipe-accent')
    .should('be.visible')
    .click();

    cy.wait(5000)

  });

  it("Muda para o perfil aluno", ()=> {

    // Espera o treinamento aparecer
cy.contains('.card-title', /^Teste Automação$/, { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible');


        //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Clica em Perfil
cy.contains('div', 'Selecionar perfil')
  .should('be.visible')
  .click();
  cy.wait(2000)

  //Aluno
 cy.contains('span','Aluno - Teste 2801 Teste')
  .should('be.visible')
  .click()

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

  it('Clica no treinamento ', ()=> {

      //Clica no Treinamento
       cy.contains('.showcase-card-title', 'Teste Automação', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click()

    })

    it('Clica em : sim,continuar de onde parou', () => {

      //Clica em continuar de onde parou
    cy.get('#modal-courseContentsContinueFromLastItem > .modal-footer > .btn-swipe-accent',{timeout:60000})
    .should('be.visible')
    .click()

    });

    it('Verificação Manual Nessesaria', ()=> {

cy.log('⚠️⚠️⚠️BÃO ESTA SENDO POSSIVEL CONCLUIT TREINAMENTO, AGUARDA LIBERAÇÃO');
cy.pause();
  debugger;

    });

    /*
    it('Concluir Matricula', ()=> {

      //Clica em Concluir Matricula
      cy.get('.header > .btn-swipe-accent',{timeout:60000})
      .should('be.visible')
      .click()

      //Clica em Finalizar Treinamento
      cy.contains('span','Finalizar treinamento')
      .should('be.visible')
      .click()

      //Espera o Cetrificado ser Gerado
      cy.log('Certificado Sendo Gerado')
      cy.wait(10000)
      
    })
    
    it('Verificação de Abertura de certificado', () => {

      //Verifica se foi aberto
      cy.get('#certificate-view', { timeout: 60000 })
  .should('be.visible');

  //Espera 5 segundos pra visualzar o certificados
  cy.wait(5000)

  //Clica em Voltar
  cy.get('button[ng-click="closeCertificateRender()"]', { timeout: 60000 })
  .should('be.visible')
  .click();
 
    });
   */

  });

});


