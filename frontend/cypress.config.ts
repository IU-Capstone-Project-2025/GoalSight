import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:3000',
    specPattern: "__tests__/cypress/e2e/**/*.cy.{ts,tsx}",
    supportFile: "__tests__/cypress/support/e2e.ts",
  },
});