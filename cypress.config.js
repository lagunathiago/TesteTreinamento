const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    viewportWidth: 1920,
    viewportHeight: 1080,

    video: true,
    videoCompression: false, // 🔥 ESSA LINHA FAZ DIFERENÇA
    screenshotOnRunFailure: true,

    defaultCommandTimeout: 10000, // evita espera exagerada
    pageLoadTimeout: 30000,

    setupNodeEvents(on, config) {},
  },
});