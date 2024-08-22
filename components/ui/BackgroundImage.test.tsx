import { render } from '@testing-library/react'
import BackgroundImage from './BackgroundImage'

describe('BackgroundImageComponent', () => {
  it('Should render the light background image', () => {
    const { getByAltText } = render(<BackgroundImage />)
    const image = getByAltText(/background light/i)

    expect(image).toBeInTheDocument()
    expect(image).toHaveClass('visible', 'dark:invisible')
  })
  it('Should render the dark background image', () => {
    const { getByAltText } = render(<BackgroundImage />)
    const image = getByAltText(/background dark/i)

    expect(image).toBeInTheDocument()
    expect(image).toHaveClass('invisible', 'dark:visible')
  })
})
