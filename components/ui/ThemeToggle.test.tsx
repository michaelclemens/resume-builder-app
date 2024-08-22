import useTheme from '@/hooks/useTheme'
import ThemeToggle, { darkModeTitle, lightModeTitle } from './ThemeToggle'
import { fireEvent, render } from '@testing-library/react'

jest.mock('@/hooks/useTheme')

const mockUseTheme = jest.mocked(useTheme)
const toggleMode = jest.fn()

describe('ThemeToggleComponent', () => {
  it('Should render light mode selected', () => {
    mockUseTheme.mockReturnValueOnce({ darkMode: false, toggleMode })
    const { getByTitle, queryByTitle } = render(<ThemeToggle />)

    expect(getByTitle(lightModeTitle)).toBeInTheDocument()
    expect(queryByTitle(darkModeTitle)).not.toBeInTheDocument()
  })
  it('Should render dark mode selected', () => {
    mockUseTheme.mockReturnValueOnce({ darkMode: true, toggleMode })
    const { getByTitle, queryByTitle } = render(<ThemeToggle />)

    expect(queryByTitle(lightModeTitle)).not.toBeInTheDocument()
    expect(getByTitle(darkModeTitle)).toBeInTheDocument()
  })
  it('Should toggle mode', () => {
    mockUseTheme.mockReturnValueOnce({ darkMode: false, toggleMode }).mockReturnValueOnce({ darkMode: true, toggleMode })

    const { getByRole, rerender } = render(<ThemeToggle />)

    fireEvent.click(getByRole('checkbox'))

    expect(toggleMode).toHaveBeenCalledWith(true)
    rerender(<ThemeToggle />)

    fireEvent.click(getByRole('checkbox'))

    expect(toggleMode).toHaveBeenCalledWith(false)
  })
})
