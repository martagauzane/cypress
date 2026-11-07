const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Day 4: HTML report with screenshots (npm run test:report)
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Junior 2026 - Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    videoOnFailOnly: true,
  },
  e2e: {
    blockHosts: ['events.backtrace.io'],
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 800, 
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },
  },
});