import { render } from '@testing-library/react'
import Header from './Header'
import HomeButton from './HomeButton'
import ThemeToggle from './ThemeToggle'

jest.mock('./HomeButton')
jest.mock('./ThemeToggle')

const mockHomeButton = jest.mocked(HomeButton)
const mockThemeToggle = jest.mocked(ThemeToggle)

describe('HeaderComponent', () => {
  it('Should render correctly', () => {
    const { getByRole } = render(<Header />)
    expect(getByRole('banner')).toBeInTheDocument()
    expect(mockHomeButton).toHaveBeenCalled()
    expect(mockThemeToggle).toHaveBeenCalled()
  })
})
