import '@testing-library/jest-dom'

jest.mock('@formkit/auto-animate/react', () => ({
  __esModule: true,
  useAutoAnimate: jest.fn(() => [null]),
}))
