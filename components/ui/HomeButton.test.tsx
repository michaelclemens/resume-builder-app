import { render } from '@testing-library/react'
import HomeButton from './HomeButton'

describe('HomeButtonComponent', () => {
  it('Should render home button', () => {
    const { getByTitle } = render(<HomeButton />)
    expect(getByTitle(/home/i)).toBeInTheDocument()
  })
  it('Should have the correct link', () => {
    const { getByRole } = render(<HomeButton />)
    expect(getByRole('link')).toHaveAttribute('href', '/')
  })
})
