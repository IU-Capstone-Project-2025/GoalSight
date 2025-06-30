// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress console warnings and errors during tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
    console.error = (...args: any[]) => {
        // Suppress ReactDOMTestUtils.act deprecation warnings
        if (typeof args[0] === 'string' && args[0].includes('ReactDOMTestUtils.act')) {
            return;
        }
        // Suppress act() warnings
        if (typeof args[0] === 'string' && args[0].includes('An update to TestComponent inside a test was not wrapped in act')) {
            return;
        }
        // Suppress error messages from tests (like "API Error", "Error loading commands", etc.)
        if (typeof args[0] === 'string' && (
            args[0].includes('Error: API Error') ||
            args[0].includes('❌ Error loading commands') ||
            args[0].includes('Error fetching upcoming matches')
        )) {
            return;
        }
        originalError.call(console, ...args);
    };

    console.warn = (...args: any[]) => {
        // Suppress React Router future flag warnings
        if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
            return;
        }
        originalWarn.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
});

// Mock IntersectionObserver if not available in test environment
(global as any).IntersectionObserver = class {
    constructor() { }
    disconnect() { }
    observe() { }
    unobserve() { }
};

// Mock ResizeObserver if not available in test environment
global.ResizeObserver = class ResizeObserver {
    constructor() { }
    disconnect() { }
    observe() { }
    unobserve() { }
};

// Mock matchMedia if not available in test environment
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
}); 