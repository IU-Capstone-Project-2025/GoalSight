// Import Cypress configuration helper
import { defineConfig } from "cypress";

// Export the Cypress E2E configuration
export default defineConfig({
  e2e: {
    // Node event setup hook (can be used to add plugins or custom tasks)
    setupNodeEvents(on, config) {
      // Currently empty — add event listeners here if needed
    },

    // Base URL for running tests (frontend app should be running here)
    baseUrl: 'http://localhost:3000',

    // Pattern to locate test files (*.cy.ts or *.cy.tsx) inside e2e folder
    specPattern: "__tests__/cypress/e2e/**/*.cy.{ts,tsx}",

    // Path to support file which runs before every test file
    // Used for global imports, custom commands, or hooks
    supportFile: "__tests__/cypress/support/e2e.ts",
  },
});