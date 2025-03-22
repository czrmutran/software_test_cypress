const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'p4ouf6',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
