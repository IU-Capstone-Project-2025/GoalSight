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
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};