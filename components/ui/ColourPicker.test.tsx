import { fireEvent, render, waitFor } from '@testing-library/react'
import ColourPicker from './ColourPicker'
import { ColourElements, ColourElementType } from '@/types/template'
import { createRef } from 'react'
import { faker } from '@faker-js/faker'

const onChange = jest.fn()
const onSave = jest.fn()

const colourElementId = 'test-colour-element'

const getColourPickerComponent = (elementType: ColourElementType, colour: string) => {
  const colourElementRef = createRef<HTMLDivElement>()
  return (
    <>
      <div data-testid={colourElementId} ref={colourElementRef} />
      <ColourPicker elementType={elementType} colour={colour} colourElementRef={colourElementRef} onChange={onChange} onSave={onSave} />
    </>
  )
}
const renderComponent = (elementType: ColourElementType, colour: string) => render(getColourPickerComponent(elementType, colour))

describe('ColourPickerComponent', () => {
  it('Should render background colour picker button', () => {
    const colour = faker.color.rgb({ format: 'hex' })
    const { getByRole, queryByTitle } = renderComponent(ColourElements.background, colour)
    const button = getByRole('button', { name: /change background colour/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle({ color: colour })
    expect(queryByTitle(/colour picker/i)).not.toBeInTheDocument()
  })
  it('Should render text colour picker button', () => {
    const colour = faker.color.rgb({ format: 'hex' })
    const { getByRole, queryByTitle } = renderComponent(ColourElements.text, colour)
    const button = getByRole('button', { name: /change text colour/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle({ color: colour })
    expect(queryByTitle(/colour picker/i)).not.toBeInTheDocument()
  })
  it('Should show/hide colour picker when clicking button', () => {
    const colour = faker.color.rgb({ format: 'hex' })
    const { getByRole, getByTitle, queryByTitle } = renderComponent(ColourElements.background, colour)

    const button = getByRole('button', { name: /change background colour/i })
    fireEvent.click(button)
    expect(getByTitle(/colour picker/i)).toBeInTheDocument()

    fireEvent.click(button)
    expect(queryByTitle(/colour picker/i)).not.toBeInTheDocument()
  })
  it('Should update colour visually without saving', () => {
    const colour = faker.color.rgb({ format: 'hex' })
    const newColourBG = faker.color.rgb({ format: 'hex' })
    const newColourText = faker.color.rgb({ format: 'hex' })
    const { rerender, getByRole, getByTestId } = renderComponent(ColourElements.background, colour)

    fireEvent.click(getByRole('button', { name: /change background colour/i }))
    fireEvent.change(getByRole('textbox'), { target: { value: newColourBG } })

    expect(getByTestId(colourElementId)).toHaveStyle({ backgroundColor: newColourBG })
    expect(onChange).toHaveBeenLastCalledWith(newColourBG)
    expect(onSave).not.toHaveBeenCalled()

    rerender(getColourPickerComponent(ColourElements.text, colour))

    fireEvent.change(getByRole('textbox'), { target: { value: newColourText } })

    expect(getByTestId(colourElementId)).toHaveStyle({ color: newColourText })
    expect(onChange).toHaveBeenLastCalledWith(newColourText)
    expect(onSave).not.toHaveBeenCalled()
  })
  it('Should save the colour when the picker is closed', async () => {
    const newColourBG = faker.color.rgb({ format: 'hex' })
    const newColourText = faker.color.rgb({ format: 'hex' })
    const { rerender, getByRole, getByTestId } = renderComponent(ColourElements.background, newColourBG)

    fireEvent.click(getByRole('button', { name: /change background colour/i }))

    await waitFor(() => {
      fireEvent.mouseDown(getByTestId(colourElementId))
      fireEvent.click(getByTestId(colourElementId))
    })
    expect(onSave).toHaveBeenCalledWith(ColourElements.background, newColourBG)

    rerender(getColourPickerComponent(ColourElements.text, newColourText))

    fireEvent.click(getByRole('button', { name: /change text colour/i }))

    await waitFor(() => {
      fireEvent.mouseDown(getByTestId(colourElementId))
      fireEvent.click(getByTestId(colourElementId))
    })
    expect(onSave).toHaveBeenCalledWith(ColourElements.text, newColourText)
  })
})
