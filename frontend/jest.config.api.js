const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/cypress/',
    '/__tests__/mocks/',
    '/__tests__/component_tests/'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage/api',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    'src/components/ui/match_forecast/forecastApi.ts',
    'src/components/ui/team_item/teamApi.ts',
    'src/components/ui/team_stats/statsApi.ts',
    'src/components/ui/upcomingMatches/matchesApi.ts',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/react-app-env.d.ts',
    '!src/setupTests.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};