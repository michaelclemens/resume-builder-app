import { createMockEducation, regexString } from '@/test/mocks'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { ButtonType } from '@/types/list'
import { SectionEnums } from '@/types/section'
import { getDisplayDate } from '@/util/date'
import { SectionForm } from '../ui/form'
import ListItemEducation from './ListItemEducation'

jest.mock('@/components/ui/form/SectionForm')

const remove = jest.fn()
const setEditing = jest.fn()
const onSave = jest.fn()
const mockSectionForm = jest.mocked(SectionForm)

const education = createMockEducation()

const getListItemComponent = ({ editing = false, deleting = false } = {}) => (
  <ListItemEducation item={education} remove={remove} setEditing={setEditing} onSave={onSave} editing={editing} deleting={deleting} />
)

const renderComponent = (options = {}) => render(getListItemComponent(options))

describe('ListItemEducationComponent', () => {
  it('Should render a education', () => {
    const { getByText } = renderComponent()
    expect(getByText(regexString(`${education.degree} - ${education.school}`))).toBeInTheDocument()
    expect(getByText(regexString(`${getDisplayDate(education.startDate)} to ${getDisplayDate(education.endDate as Date)}`))).toBeInTheDocument()
  })
  it('Should render edit and delete buttons', () => {
    const { getByTitle } = renderComponent()
    expect(getByTitle(regexString(ButtonType.edit))).toBeInTheDocument()
    expect(getByTitle(regexString(ButtonType.delete))).toBeInTheDocument()
  })
  it('Should be able to delete', async () => {
    const { getByTitle } = renderComponent()

    fireEvent.click(getByTitle(regexString(ButtonType.delete)))

    await waitFor(() => expect(remove).toHaveBeenCalledWith(education))
  })
  it('Should show form when editing', () => {
    const { rerender, getByTitle } = renderComponent()
    expect(mockSectionForm).not.toHaveBeenCalled()

    fireEvent.click(getByTitle(regexString(ButtonType.edit)))
    rerender(getListItemComponent({ editing: true }))

    expect(setEditing).toHaveBeenCalledWith(true)
    expect(mockSectionForm).toHaveBeenCalledWith(
      {
        sectionType: SectionEnums.education,
        parentId: education.resumeId,
        item: education,
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
