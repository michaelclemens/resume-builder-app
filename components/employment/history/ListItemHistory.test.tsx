import { createMockHistory, regexString } from '@/test/mocks'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { getDisplayDate } from '@/util/date'
import { ButtonType } from '@/types/list'
import { SectionEnums } from '@/types/section'
import { SectionForm } from '../../ui/form'
import ListItemHistory from './ListItemHistory'

jest.mock('@/components/ui/form/SectionForm')

const remove = jest.fn()
const setEditing = jest.fn()
const onSave = jest.fn()
const mockSectionForm = jest.mocked(SectionForm)

const history = createMockHistory()

const getListItemComponent = ({ editing = false, deleting = false } = {}) => (
  <ListItemHistory item={history} remove={remove} setEditing={setEditing} onSave={onSave} editing={editing} deleting={deleting} />
)
const renderComponent = (options = {}) => render(getListItemComponent(options))

describe('ListItemHistoryComponent', () => {
  it('Should render an employment history', () => {
    const { getByText } = renderComponent()

    expect(getByText(history.title)).toBeInTheDocument()
    expect(getByText(regexString(`${getDisplayDate(history.startDate)} to ${getDisplayDate(history.endDate as Date)}`))).toBeInTheDocument()
  })
  it('Should render edit and delete buttons', () => {
    const { getByTitle } = renderComponent()
    expect(getByTitle(regexString(ButtonType.edit))).toBeInTheDocument()
    expect(getByTitle(regexString(ButtonType.delete))).toBeInTheDocument()
  })
  it('Should be able to delete', async () => {
    const { getByTitle } = renderComponent()

    fireEvent.click(getByTitle(regexString(ButtonType.delete)))

    await waitFor(() => expect(remove).toHaveBeenCalledWith(history))
  })
  it('Should show form when editing', () => {
    const { rerender, getByTitle } = renderComponent()

    expect(mockSectionForm).not.toHaveBeenCalled()

    fireEvent.click(getByTitle(regexString(ButtonType.edit)))
    rerender(getListItemComponent({ editing: true }))

    expect(setEditing).toHaveBeenCalledWith(true)
    expect(mockSectionForm).toHaveBeenCalledWith(
      {
        sectionType: SectionEnums.employmentHistory,
        parentId: history.employmentId,
        item: history,
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
