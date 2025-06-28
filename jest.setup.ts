import { server } from './mocks/server';

// Start API mocking before all tests.
beforeAll(() => server.listen());

// Reset handlers between tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());