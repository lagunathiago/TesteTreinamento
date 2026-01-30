Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Cannot read properties of null") &&
    err.message.includes("charAt")
  ) {
    return false;
  }
});

describe("Teste - Login", () => {
  before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/ext/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("thiagosuporte2@uorak.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");
  });

  context("Teste Cupons", () => {
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

    it("Remover Cupon", () => {
      cy.get(".edit-coupon-btn", { timeout: 20000 })
        .first()
        .should("be.visible")
        .click();

      cy.contains("button", "Remover", { timeout: 20000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get(
        '[switch="modal.removeCoupon"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent',
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      cy.wait(2000);
    });

    it("Filtros de cupons", () => {
      //Selecionar colunas
      cy.get(".buttons-collection", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.get('[data-cv-idx="0"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="1"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="2"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="3"]').click();
      cy.wait(1000);

      cy.get('[data-cv-idx="0"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="1"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="2"]').click();
      cy.wait(1000);
      cy.get('[data-cv-idx="3"]').click();
      cy.wait(1000);

      //Clica fora para sumir a caixiha
      cy.get(".breadcrumbs-bar").click();

      //Copiar
      cy.get(".buttons-copy", { timeout: 60000 }).should("be.visible").click();

      cy.wait(1000);

      //Csv
      cy.get(".buttons-csv", { timeout: 60000 }).should("be.visible").click();

      cy.wait(1000);

      //Pdf
      cy.get(".buttons-pdf", { timeout: 60000 }).should("be.visible").click();

      cy.wait(1000);

      //Copiar
      cy.get(".icon-file-xls", { timeout: 60000 }).should("be.visible").click();

      cy.wait(1000);

      //Imprimir
      cy.get(".buttons-print", { timeout: 60000 }).should("be.visible").click();

      cy.wait(6000);
    });

    it("Pesquisar cupom", () => {
      cy.get('input[placeholder="Pesquisar..."]', { timeout: 20000 })
        .should("be.visible")
        .clear()
        .type("Teste");

      cy.get(".title-bar > .multiselect > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);
    });

    it("Criar cupom R$", () => {
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
        .invoke("val", "Cupom Automação R$")
        .trigger("input")
        .trigger("change")
        .blur();

      //Valor
      cy.get('input[type="number"][ng-model="coupon.value"]', {
        timeout: 20000,
      })
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type("1");

      //Código
      cy.get('input[ng-model="coupon.code"]', { timeout: 20000 })
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type("717273");

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

      //C onfirma
      cy.get(
        '[switch="modal.coupons"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent',
      )
        .should("be.visible")
        .click();

      cy.wait(4000);
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
        .invoke("val", "Cupom Automação %")
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
        .type("747576");

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
    });

    it("Recarregando a pagina para salvar cupom", () => {
      cy.get(":nth-child(12) > a > .w-100", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);

      //Clica em Cupons
      cy.get(":nth-child(13) > a > .w-100", { timeout: 60000 })
        .should("be.visible")
        .click();

      cy.wait(3000);
    });

    it("Voltando pro perfil aluno e Comprando com Cupom %", () => {
      //Clioca no icon
      cy.get(".profile-select", { timeout: 60000 })
        .should("be.visible")
        .click();

      /* cy.get('.profile-select', { timeout: 60000 })
  .should('be.visible')
  .click() */

      //Clica em perfil
      cy.get(
        ":nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right",
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      //Clica em Aluno
      cy.get(
        ".user-options-items > :nth-child(2) > ng-transclude > .ng-binding",
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      // Clicando no icon da vitrine
      cy.get(".active > .icon-next", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica na vitrine Automação
      cy.get(".showcase-navigation-menu > :nth-child(5)", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica no Treinamento
      cy.get(
        ':nth-child(1) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container',
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      //Clica em compra
      cy.get(".classes-actions > :nth-child(1) > .btn-swipe-accent", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();
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
        .invoke("val", "717273")
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
    });

    it("Minha área/Minhas compras/Cupon %", () => {
      //Fecha a compra
      cy.get(".column.ng-valid > .modal-header > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

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

      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Compra Cupom Automação 1", { delay: 50 });

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
          expect($last.find("td.couponColumn").text()).to.contain("50%");
          expect($last.find("td.priceColumn").text()).to.contain("R$ 0.50");
        },
      );

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
    });

    it("Relatórios/Compras", () => {
      //Fecha QRCode
      cy.get(".modal-overlay.ng-scope > .modal > .modal-header > .btn", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();

      //Clioca no icon
      cy.get("#user-options-btn > .icon-profile", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica em perfil
      cy.get(
        ":nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right",
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      //Clica em Administrador
      cy.get(
        ":nth-child(4) > .user-options-items > :nth-child(1) > ng-transclude > .ng-binding",
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      //Clica em relatórios
      cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica em Compras/Relatório
      cy.contains("li.list-group-item.node-report-categories", "Compras", {
        timeout: 60000,
      })
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.wait(5000);

      //Escreve
      cy.get(".report-filters", { timeout: 10000 })
        .find('input[ng-model="filter.text"]')
        .filter(":visible")
        .eq(1) // garante só 1
        .should("be.visible")
        .clear()
        .type("Compra Cupom Automação 1", { delay: 30 });

      cy.wait(2000);

      //Clique em pesquisar
      cy.get(
        ":nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn",
        { timeout: 10000 },
      )
        .should("be.visible")
        .click();

      cy.log("VEREFEQUE O HORARIO DA COMPRA E O DESCONTO DO CUPOM");
      cy.wait(8000);
    });

    it("Voltando pro perfil aluno e Comprando com Cupom $", () => {
      //Clioca no icon
      cy.get(".profile-select", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica em perfil
      cy.get(
        ":nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right",
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      //Clica em Aluno
      cy.get(
        ".user-options-items > :nth-child(2) > ng-transclude > .ng-binding",
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      // Clicando no icon da vitrine
      cy.get(".active > .icon-next", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica na vitrine Automação
      cy.get(".showcase-navigation-menu > :nth-child(5)", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica no Treinamento
      cy.get(
        ':nth-child(2) > .card-container > [ng-init="course = content.entity"] > a.ng-scope > .showcase-card-container',
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      //Clica em compra
      cy.get(".classes-actions > :nth-child(1) > .btn-swipe-accent", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();
    });

    it("Limite de Cupom $", () => {
      //Digita um cupom já com um limite atingido
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]', {
        timeout: 10000,
      })
        .should("be.visible")
        .and("not.be.disabled")
        .scrollIntoView()
        .clear()
        .invoke("val", "747576")
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

    it("Data de cupom Expirada $", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "2101")
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

    it("Valor Acima do Minimo $", () => {
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

    it("Apllica cupom $ á vista", () => {
      cy.get('input[ng-model="$root.sicredi.selectedClass.couponCode"]')
        .should("be.visible")
        .and("not.be.disabled")
        .click()
        .invoke("val", "747576")
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
    });

    it("Minha área/Minhas compras/Cupon $", () => {
      //Fecha a compra
      cy.get(".column.ng-valid > .modal-header > .btn", { timeout: 60000 })
        .should("be.visible")
        .click();

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

      //Digita o treinamernto
      cy.get('input[ng-model="searchFilter.text"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type("Compra Cupom Automação 2", { delay: 50 });

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
          expect($last.find("td.couponColumn").text()).to.contain("R$1.00");
          expect($last.find("td.priceColumn").text()).to.contain("R$ 1.00");
        },
      );

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
    });

    it("Relatórios/Compras", () => {
      //Fecha QRCode
      cy.get(".modal-overlay.ng-scope > .modal > .modal-header > .btn", {
        timeout: 60000,
      })
        .should("be.visible")
        .click();

      //Clioca no icon
      cy.get("#user-options-btn > .icon-profile", { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica em perfil
      cy.get(
        ":nth-child(4) > .menu-option > ng-transclude > .icon-pointer-right",
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      //Clica em Administrador
      cy.get(
        ":nth-child(4) > .user-options-items > :nth-child(1) > ng-transclude > .ng-binding",
        { timeout: 60000 },
      )
        .should("be.visible")
        .click();

      //Clica em relatórios
      cy.get('[title="Relatórios"] > .sideitem', { timeout: 60000 })
        .should("be.visible")
        .click();

      //Clica em Compras/Relatório
      cy.contains("li.list-group-item.node-report-categories", "Compras", {
        timeout: 60000,
      })
        .scrollIntoView()
        .should("be.visible")
        .click({ force: true });

      cy.wait(5000);

      //Escreve
      cy.get(".report-filters", { timeout: 10000 })
        .find('input[ng-model="filter.text"]')
        .filter(":visible")
        .eq(1) // garante só 1
        .should("be.visible")
        .clear()
        .type("Compra Cupom Automação 2", { delay: 30 });

      cy.wait(2000);

      //Clique em pesquisar
      cy.get(
        ":nth-child(2) > div.ng-scope > .text-filter > .multiselect > .btn",
        { timeout: 10000 },
      )
        .should("be.visible")
        .click();

      cy.log("VEREFEQUE O HORARIO DA COMPRA E O DESCONTO DO CUPOM");
      cy.wait(8000);
    });
  });
});
