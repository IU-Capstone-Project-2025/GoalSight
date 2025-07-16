module.exports = {
    // Use ts-jest preset to enable TypeScript support in Jest
    preset: 'ts-jest',

    // Simulate a browser-like environment for component testing
    testEnvironment: 'jsdom',

    // Setup file that runs after Jest is initialized (e.g., for mocks or test libraries)
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

    // Map static asset imports (e.g., CSS, images) to mock modules
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock styles
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js', // Mock media files
    },

    // Use ts-jest to transform TypeScript files
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },

    // Define patterns for locating test files
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',          // Component test files under `__tests__` folders
        '<rootDir>/__tests__/**/*.test.[jt]s?(x)',            // Other top-level test files
    ],

    // Specify files from which to collect code coverage
    collectCoverageFrom: [
        'src/components/**/*.{ts,tsx}',                       // All component source files
        '!src/components/**/*.d.ts',                          // Exclude type definitions
        '!src/components/**/index.tsx',                       // Exclude barrel/index files
        '!src/components/**/forecastApi.ts',                  // Exclude API logic (covered in API tests)
        '!src/components/**/teamApi.ts',
        '!src/components/**/statsApi.ts',
        '!src/components/**/matchesApi.ts',
    ],

    // Minimum coverage thresholds to enforce test quality
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },

    // Recognized file extensions for modules
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    // Ignore tests in these folders
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/__tests__/api/'],

    // Transform only specific node_modules (used by ESM packages)
    transformIgnorePatterns: [
        'node_modules/(?!(axios|react-router|@babel)/)',
    ],

    // Allow importing modules from these directories without relative paths
    moduleDirectories: ['node_modules', 'src'],

    // Output directory for code coverage report
    coverageDirectory: 'coverage/components',
};