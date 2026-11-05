const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    blockHosts: ['events.backtrace.io'],
    baseUrl: 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
