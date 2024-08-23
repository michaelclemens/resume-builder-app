import { fireEvent, render, waitFor } from '@testing-library/react'
import ListItemStrength from './ListItemStrength'
import { createMockStrength, regexString } from '@/test/mocks'
import { ButtonType } from '@/types/list'
import { SectionForm } from '../ui/form'
import { SectionEnums } from '@/types/section'

jest.mock('@/components/ui/form/SectionForm')

const remove = jest.fn()
const setEditing = jest.fn()
const onSave = jest.fn()
const mockSectionForm = jest.mocked(SectionForm)

const strength = createMockStrength()

const getListItemComponent = ({ editing = false, deleting = false } = {}) => (
  <ListItemStrength item={strength} remove={remove} setEditing={setEditing} onSave={onSave} editing={editing} deleting={deleting} />
)
const renderComponent = (options = {}) => render(getListItemComponent(options))

describe('ListItemStrengthComponent', () => {
  it('Should render a strength', () => {
    const { getByText } = renderComponent()

    expect(getByText(strength.name)).toBeInTheDocument()
  })
  it('Should render edit and delete buttons', () => {
    const { getByTitle } = renderComponent()

    expect(getByTitle(regexString(ButtonType.edit))).toBeInTheDocument()
    expect(getByTitle(regexString(ButtonType.delete))).toBeInTheDocument()
  })
  it('Should be able to delete', async () => {
    const { getByTitle } = renderComponent()

    fireEvent.click(getByTitle(regexString(ButtonType.delete)))

    await waitFor(() => expect(remove).toHaveBeenCalledWith(strength))
  })
  it('Should show form when editing', () => {
    const { rerender, getByTitle } = renderComponent()

    expect(mockSectionForm).not.toHaveBeenCalled()

    fireEvent.click(getByTitle(regexString(ButtonType.edit)))
    rerender(getListItemComponent({ editing: true }))

    expect(setEditing).toHaveBeenCalledWith(true)
    expect(mockSectionForm).toHaveBeenCalledWith(
      {
        sectionType: SectionEnums.strength,
        parentId: strength.resumeId,
        item: strength,
        onSave,
      },
      expect.anything()
    )
  })
  it('Should hide form when deleting', () => {
    const { rerender } = renderComponent({ editing: true })
    rerender(getListItemComponent({ editing: true, deleting: true }))
    expect(mockSectionForm).toHaveBeenCalledTimes(1)
  })
})
