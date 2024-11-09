import '@testing-library/jest-dom'

jest.mock('@formkit/auto-animate/react', () => ({
  __esModule: true,
  useAutoAnimate: jest.fn(() => [null]),
}))

Range.prototype.getBoundingClientRect = () => ({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
})

Range.prototype.getClientRects = () => ({
  item: () => null,
  length: 0,
  [Symbol.iterator]: jest.fn(),
})
