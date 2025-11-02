/* eslint-disable no-unused-vars */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:4173",
    retries: 2,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
