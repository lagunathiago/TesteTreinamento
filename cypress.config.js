const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    viewportWidth: 1920,
    viewportHeight: 1080,

    // 👇 ADICIONADO (igual do vídeo)
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});