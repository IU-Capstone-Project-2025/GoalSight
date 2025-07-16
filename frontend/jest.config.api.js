// Importing ts-jest helper to use default TypeScript transformation preset
const { createDefaultPreset } = require("ts-jest");

// Extracting the transform configuration from the default preset
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  // Specifies the test environment (Node.js in this case)
  testEnvironment: "node",

  // Applies TypeScript transformation using ts-jest
  transform: {
    ...tsJestTransformCfg,
  },

  // Ignore specific directories when searching for test files
  testPathIgnorePatterns: [
    '/node_modules/',                     // Ignore dependencies
    '/__tests__/cypress/',               // Ignore Cypress E2E tests
    '/__tests__/mocks/',                 // Ignore MSW and mock handlers
    '/__tests__/component_tests/'        // Ignore React component tests
  ],

  // Specifies a setup file that runs after the test framework is installed
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Enables code coverage collection
  collectCoverage: true,

  // Directory where coverage output will be saved
  coverageDirectory: 'coverage/api',

  // Reporters used to output coverage results
  coverageReporters: ['text', 'lcov'],

  // Specific source files to collect coverage from
  collectCoverageFrom: [
    'src/components/ui/match_forecast/forecastApi.ts',   // API for predictions
    'src/components/ui/team_item/teamApi.ts',            // API for teams
    'src/components/ui/team_stats/statsApi.ts',          // API for team stats
    'src/components/ui/upcomingMatches/matchesApi.ts',   // API for matches
    '!src/**/*.d.ts',                                    // Exclude type definitions
    '!src/index.tsx',                                    // Exclude entry point
    '!src/react-app-env.d.ts',                           // Exclude environment declarations
    '!src/setupTests.ts',                                // Exclude global test setup
  ],

  // Minimum thresholds for coverage to enforce quality
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};