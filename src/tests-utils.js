export const buildIntersectionObserverMock = (overrides = {}) => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  ...overrides
})