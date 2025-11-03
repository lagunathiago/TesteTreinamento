const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
        testIsolation: false,            // ⬅️ mantém o estado/URL ao iniciar um novo `it`
        viewportWidth: 1920,             // (opcional) mesma largura que você usa
    viewportHeight: 1080,            // (opcional)
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
