module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
        '<rootDir>/__tests__/**/*.test.[jt]s?(x)',
    ],
    collectCoverageFrom: [
        'src/components/**/*.{ts,tsx}',
        '!src/components/**/*.d.ts',
        '!src/components/**/index.tsx',
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/__tests__/api/'],
    transformIgnorePatterns: [
        'node_modules/(?!(axios|react-router|@babel)/)',
    ],
    moduleDirectories: ['node_modules', 'src'],
    coverageDirectory: 'coverage/components',
};