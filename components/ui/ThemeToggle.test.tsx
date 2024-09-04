import { fireEvent, render } from '@testing-library/react'
import useTheme from '@/hooks/useTheme'
import ThemeToggle, { darkModeTitle, lightModeTitle } from './ThemeToggle'

jest.mock('@/hooks/useTheme')

const mockUseTheme = jest.mocked(useTheme)
const toggleMode = jest.fn()

describe('ThemeToggleComponent', () => {
  it('Should render light mode selected', () => {
    mockUseTheme.mockReturnValueOnce({ darkMode: false, toggleMode })
    const { getByTitle, queryByTitle } = render(<ThemeToggle />)

    expect(getByTitle(lightModeTitle)).toBeInTheDocument()
    expect(getByTitle(lightModeTitle)).toHaveClass('opacity-100', 'dark:opacity-0')
  })
  it('Should render dark mode selected', () => {
    mockUseTheme.mockReturnValueOnce({ darkMode: true, toggleMode })
    const { getByTitle, queryByTitle } = render(<ThemeToggle />)

    expect(getByTitle(darkModeTitle)).toBeInTheDocument()
    expect(getByTitle(darkModeTitle)).toHaveClass('opacity-0', 'dark:opacity-100')
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
