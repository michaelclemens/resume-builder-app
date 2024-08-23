import { faker } from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'
import ListButton, { iconYPaddingClass, labelYPaddingClass } from './ListButton'
import { AvailableButtonTypes, ButtonType } from '@/types/list'

const label = faker.lorem.word()

describe('List/ListButtonComponent', () => {
  it('Should render a button', () => {
    const { getByRole } = render(<ListButton label={label} />)
    expect(getByRole('button', { name: label })).toBeInTheDocument()
  })
  it('Should render a button without any props', () => {
    const { getByRole } = render(<ListButton />)
    expect(getByRole('button')).toBeInTheDocument()
  })
  it('Should render a button with text', () => {
    const type = 'unsupported type' as AvailableButtonTypes
    const { getByRole } = render(<ListButton label={label} type={type} />)
    expect(getByRole('button', { name: label })).toBeInTheDocument()
  })
  it('Should render an edit icon button', () => {
    const { getByTitle } = render(<ListButton type={ButtonType.edit} />)
    expect(getByTitle(new RegExp(ButtonType.edit, 'i'))).toBeInTheDocument()
  })
  it('Should render a delete icon button', () => {
    const { getByTitle } = render(<ListButton type={ButtonType.delete} />)
    expect(getByTitle(new RegExp(ButtonType.delete, 'i'))).toBeInTheDocument()
  })
  it('Should fire callback on click', () => {
    const onClick = jest.fn()
    const { rerender } = render(<ListButton label={label} type={ButtonType.delete} />)

    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()

    rerender(<ListButton label={label} type={ButtonType.delete} onClick={onClick} />)

    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
  it('Should apply the correct padding depending on the content', () => {
    const { rerender } = render(<ListButton label={label} />)
    expect(screen.getByRole('button', { name: label })).toHaveClass(labelYPaddingClass)

    rerender(<ListButton type={ButtonType.edit} />)
    expect(screen.getByRole('button')).toHaveClass(iconYPaddingClass)
  })
})
