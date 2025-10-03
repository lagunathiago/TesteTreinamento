// ATENÇÃO: Os gráficos "Matrículas" e "Usuários Matriculados" devem estar já selecionados.
// Este teste remove esses gráficos e depois os adiciona novamente, validando todo o fluxo.

describe('Teste de Dashboard', () => {
  context('Teste Dashboard', () => {

    // === NÃO MEXI NADA AQUI ===
    it('Dashboard', () => {
      cy.log('Acessa a landing e faz login')
      cy.visit('https://hml.lector.live/landing')

      cy.contains('button', 'Entrar').click()

      cy.get('form.ng-pristine > [type="text"]').type('thiagosuporte@uorak.com')
      cy.get('ng-transclude > .border').type('123')
      cy.get(':nth-child(4) > .btn-swipe-accent').click()

      cy.log('Confirma navegação até o Dashboard')
      cy.location('pathname', { timeout: 20000 }).should('match', /home\/dashboard$/)

      // Remoção dos cards
      cy.log('Remove o card "Matrículas"')
      cy.contains('.widget-header', 'Matrículas', { timeout: 15000 })
        .should('be.visible')
        .within(() => {
          cy.get('button.icon-close.btn.round').click({ force: true })
        })
      cy.get('[switch="modal.removeWidgets"]', { timeout: 15000 })
        .should('be.visible')
        .contains('button', /^Remover$/i)
        .click()

      cy.log('Remove o card "Usuários Matriculados"')
      cy.contains('.widget-header', 'Usuários Matriculados', { timeout: 15000 })
        .should('be.visible')
        .within(() => {
          cy.get('button.icon-close.btn.round').click({ force: true })
        })
      cy.get('[switch="modal.removeWidgets"]', { timeout: 15000 })
        .should('be.visible')
        .contains('button', /^Remover$/i)
        .click()

      cy.log('Valida que os dois cards foram removidos')
      cy.contains('.widget-header', 'Matrículas').should('not.exist')
      cy.contains('.widget-header', 'Usuários Matriculados').should('not.exist')

      // Adição de widgets
      cy.get('button[ng-click="addWidget()"]:visible', { timeout: 15000 })
        .should('be.visible')
        .click({ force: true })

      cy.get('.widget-options > :nth-child(1) > .checkbox > .icon-checkbox').click()
      cy.get('.widget-options > :nth-child(2) > .checkbox > .icon-checkbox').click()
      cy.get('.widget-options > :nth-child(3) > .checkbox > .icon-checkbox').click()
      cy.get(':nth-child(4) > .checkbox > .icon-checkbox').click()
      cy.get('[switch="modal.addWidgets"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent > ng-transclude').click()

      // Validação
      cy.get('.widget-header').contains('Matrículas').should('be.visible')
      cy.get('.widget-header').contains('Usuários Matriculados').should('be.visible')
      cy.get('.widget-header').contains('Matrículas Novas').should('be.visible')
      cy.get('.widget-header').contains('Matrículas Ativas').should('be.visible')

      // Edição do gráfico "Matrículas"
      cy.log('Edita o tipo de gráfico do card "Matrículas"')
      cy.contains('.gridster-item:not(.ng-hide) .widget-header div', 'Matrículas')
        .closest('.gridster-item')
        .within(() => {
          cy.contains('Tipo de gráfico')
            .parent()
            .find('.widget-type-select [ng-click*="toggle"], .widget-type-select[title="Escolher"], .ui-select-toggle')
            .first()
            .should('be.visible')
            .scrollIntoView()
            .click({ force: true })
        })
      cy.get('.open > .ui-select-choices > :nth-child(1)').click()
    });
  });
});



