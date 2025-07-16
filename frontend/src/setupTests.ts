// jest-dom adds custom jest matchers for asserting on DOM nodes.
// Allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver if not available in the test environment (JSDOM doesn't implement it)
// This prevents tests from crashing when components rely on it (e.g., for lazy loading or animations)
(global as any).IntersectionObserver = class {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
};

// Mock ResizeObserver if not available in the test environment
// Used in components that track element size or layout changes
global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
};

// Mock matchMedia if not available in the test environment
// Used by some CSS-in-JS libraries or UI libraries for responsive behavior
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,              // Default to no media query matching
        media: query,                // Return the actual query string
        onchange: null,
        addListener: jest.fn(),      // Deprecated but still mocked for compatibility
        removeListener: jest.fn(),   // Deprecated
        addEventListener: jest.fn(), // New standard
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
}); 