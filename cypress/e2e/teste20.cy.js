/// <reference types="cypress" />
describe("Teste - Login", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080); // Define a dimensão da tela para o teste.

    cy.visit("https://www.hml.lector.live/universolector/showcase/340");
    cy.contains("button", "Entrar").click();
    cy.get('[style="z-index: 26;"] > :nth-child(1) > :nth-child(1) > .popup > :nth-child(1) > .ng-pristine').type("qualidade@lectortec.com.br");
    cy.get("#login_password_navbar").type("123");
    cy.get(".popup").contains("button", "Entrar").click();
});

  context("Treinamento sem aprovação gestor na turma", () => {
    it("Adicionando um documento", () => {
      //Criar pasta   TESTE PARA TREINAMENTO INTEIRO
      cy.get('[title="Documentos"]').click(); // clicar na aba de documentos
      cy.get(".relative > .btn-icon").click(); //botão de criar documento
      cy.get('[ng-click="showCreateNewFolder();"]').click(); // Botão de criar nova pasta
      cy.get('.ng-pristine.ng-scope > .border').type("Pasta de Teste 10.07.2025"); // Digitar nome da pasta
      cy.get('[switch="modal.createFolder"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent').click(); // Salvar pasta

      //Teste pra adicionar documento na pasta criada
      cy.get('.multiselect.ng-pristine > .ng-pristine').type("Pasta de Teste 10.07.2025"); // Digitar nome da pasta
      cy.get('.multiselect.ng-dirty > .btn').click(); // Botão de pesquisar pasta
      cy.wait(10000); // Espera para o modal abrir
      cy.get(".relative > .btn-icon").click(); //botão de criar documento
      cy.get('[ng-click="modal.uploadFiles = true;"]').click(); //botão de upload
      cy.wait(10000); // Espera para o modal abrir
        });

    it("Criando um treinamento", () => {
      //Criar treinamento sem aprovação do gestor na turma
      cy.get('[title="Treinamentos"]').click();
      cy.get(".title-bar > .btn-icon").click();

      //Editar dados
      cy.get("#courseName").click(); // Clica pra digitar
      cy.get("#courseName").type("Teste treinamento 08/07/2025 sem aprovação");

      //Adicionar conteúdos
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click(); // sessão conteúdos
      cy.get("ui-view.ng-scope > .flex > .btn-swipe-accent").click(); //novo conteúdo
      cy.get(".editing-resource > :nth-child(2) > .w-100").click(); //tipo
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); //selecionar documentos como tipo de conteúdo
      cy.wait(10000); //espera para digitar o nome do documento
      cy.get(".weight").type("1"); // selecionar peso
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); //selecionar peso 1
      cy.get(".editing-resource > .end > .btn-swipe-accent").click(); //adicionar documento

      //Adicionar turma
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click(); // sessão turma
      cy.get('[ng-click="editClass()"]').click(); //botão de adicionar turma
      cy.get("#className").type("Teste turma"); //nome da turma
      cy.get(".column > :nth-child(1) > .icon-checkbox").click(); // desativar checkbox
      cy.get(".add-content > .end > .btn-swipe-accent").click(); //botão de adicionar turma

      //Salvar treinamento
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click(); // sessão conteúdos
      cy.get(".content-box-footer > .flex > .btn-swipe-accent").click(); //botão de salvar
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar versionamento
        });
    
  context("Treinamento com aprovação gestor na turma", () => {
    it("Adicionando um documento", () => {
      //Criar pasta   TESTE PARA TREINAMENTO INTEIRO
      cy.get('[title="Documentos"]').click(); // clicar na aba de documentos
      cy.get(".relative > .btn-icon").click(); //botão de criar documento
      cy.get('[ng-click="showCreateNewFolder();"]').click(); // Botão de criar nova pasta
      cy.get('.ng-pristine.ng-scope > .border').type("Pasta de Teste 10.07.2025"); // Digitar nome da pasta
      cy.get('[switch="modal.createFolder"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent').click(); // Salvar pasta

      //Teste pra adicionar documento na pasta criada
      cy.get('.multiselect.ng-pristine > .ng-pristine').type("Pasta de Teste 10.07.2025"); // Digitar nome da pasta
      cy.get('.multiselect.ng-dirty > .btn').click(); // Botão de pesquisar pasta
      cy.wait(10000); // Espera para o modal abrir
      cy.get(".relative > .btn-icon").click(); //botão de criar documento
      cy.get('[ng-click="modal.uploadFiles = true;"]').click(); //botão de upload
      cy.wait(10000); // Espera para o modal abrir
        });

    it("Criando um treinamento", () => {
      //Criar treinamento sem aprovação do gestor na turma
      cy.wait(1000);
      cy.get('[title="Treinamentos"]').click();
      cy.get(".title-bar > .btn-icon").click();

      //Editar dados
      cy.get("#courseName").click(); // Clica pra digitar
      cy.get("#courseName").type("Teste treinamento 08/07/2025 com aprovação");

      //Adicionar conteúdos
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click(); // sessão conteúdos
      cy.get('ui-view.ng-scope > .flex > .btn-swipe-accent').click(); //novo conteúdo
      cy.get(".editing-resource > :nth-child(2) > .w-100").click(); //tipo
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); //selecionar documentos como tipo de conteúdo
      cy.wait(10000); //espera para digitar o nome do docuemnto
      cy.get(".weight").type("1"); // selecionar peso
      cy.get(".open > .ui-select-choices > :nth-child(2)").click(); //selecionar peso 1
      cy.get(".editing-resource > .end > .btn-swipe-accent").click(); //adicionar documento

      //Adicionar turma
      cy.get('[ui-sref="accessLink.content.courses.edit.id.classes"]').click(); // sessão turma
      cy.get('[ng-click="editClass()"]').click(); //botão de adicionar turma
      cy.get("#className").type("Teste turma"); //nome da turma
      cy.get(".add-content > .end > .btn-swipe-accent").click(); //botão de adicionar turma

      //Salvar treinamento
      cy.get('[ui-sref="accessLink.content.courses.edit.id.contents"]').click(); // sessão conteúdos
      cy.get(".content-box-footer > .flex > .btn-swipe-accent").click(); //botão de salvar
      cy.get('[ng-show="modal.useVersioning"] > .modal > :nth-child(3) > .checkbox > .icon-checkbox').click(); //selecionar versionamento
      cy.get('[ng-show="modal.useVersioning"] > .modal > .end > .ml-10').click(); //salvar versionamento
        });
      });
    });
  });