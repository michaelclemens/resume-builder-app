import { renderFormBody } from '@/test/form'
import { createMockHistory } from '@/test/mocks'
import { EmploymentHistory } from '@prisma/client'
import { waitFor, fireEvent } from '@testing-library/react'
import { EmploymentHistorySchema } from '@/types/form'
import { SectionEnums } from '@/types/section'
import { getInputDate, getMockInputDate } from '@/util/date'
import { getDefaultValues, richTextEditorClassName } from '@/util/form'
import FormBodyHistory from './FormBodyHistory'

const history = createMockHistory()
const onSave = jest.fn()
console.error = jest.fn()

const renderComponent = ({ history }: { history?: EmploymentHistory } = {}) =>
  renderFormBody({
    component: FormBodyHistory,
    editing: !!history,
    defaultValues: getDefaultValues(SectionEnums.employmentHistory, history),
    schema: EmploymentHistorySchema,
    onSave,
  })

describe('FormBodyHistoryComponent', () => {
  it('Should render create new form', async () => {
    const { getByRole, getByLabelText } = renderComponent()

    expect(getByRole('textbox', { name: /title/i })).toHaveValue('')
    expect(getByLabelText(/startdate/i)).toHaveValue('')
    expect(getByLabelText(/enddate/i)).toHaveValue('')

    await waitFor(() => {
      expect(getByLabelText(/description/i).querySelector(`.${richTextEditorClassName}`)).toHaveTextContent('')
    })

    expect(getByRole('button', { name: /add employment history/i })).toBeInTheDocument()
  })
  it('Should render an update form', async () => {
    const { getByRole, getByLabelText } = renderComponent({ history })

    expect(getByRole('textbox', { name: /title/i })).toHaveValue(history.title)
    expect(getByLabelText(/startdate/i)).toHaveValue(getInputDate(history.startDate))
    expect(getByLabelText(/enddate/i)).toHaveValue(getInputDate(history.endDate))

    await waitFor(() => {
      expect(getByLabelText(/description/i).querySelector(`.${richTextEditorClassName}`)).toHaveTextContent(history.description?.replace(/\n/g, ' '))
    })

    expect(getByRole('button', { name: /save/i })).toBeInTheDocument()
  })
  it('Should display errros for required fields', async () => {
    const { getAllByRole, getByLabelText, getByRole, getByText, rerenderHook } = renderComponent()

    expect(getByRole('textbox', { name: /title/i })).toBeRequired()
    expect(getByLabelText(/startdate/i)).toBeRequired()

    fireEvent.click(getByRole('button', { name: /add employment history/i }))

    await waitFor(() => {
      rerenderHook()
      expect(onSave).not.toHaveBeenCalled()
      expect(getAllByRole('alert')).toHaveLength(2)
    })

    expect(getByText(/title is required/i)).toBeInTheDocument()
    expect(getByText(/start date is required/i)).toBeInTheDocument()
  })
  it('Should disable form elements when submitting', async () => {
    const { getByRole, getByLabelText, rerenderHook } = renderComponent()

    fireEvent.click(getByRole('button', { name: /add employment history/i }))

    await waitFor(() => {
      rerenderHook()
    })

    expect(getByRole('textbox', { name: /title/i })).toBeDisabled()
    expect(getByLabelText(/startdate/i)).toBeDisabled()
    expect(getByLabelText(/enddate/i)).toBeDisabled()
    expect(getByRole('button', { name: /add employment history/i })).toBeDisabled()
  })
  it('Should successfully submit form with new values', async () => {
    const { getByRole, getByLabelText, rerenderHook } = renderComponent({ history })

    const newHistory = createMockHistory()
    fireEvent.change(getByRole('textbox', { name: /title/i }), { target: { value: newHistory.title } })
    fireEvent.change(getByLabelText(/startdate/i), { target: { value: getInputDate(newHistory.startDate) } })
    fireEvent.change(getByLabelText(/enddate/i), { target: { value: getInputDate(newHistory.endDate ?? undefined) } })

    await waitFor(async () => {
      const descriptionContent = getByLabelText(/description/i).querySelector(`.${richTextEditorClassName} p`)
      fireEvent.change(descriptionContent, { target: { innerHTML: newHistory.description } })
    })

    fireEvent.click(getByRole('button', { name: /save/i }))

    await waitFor(() => {
      rerenderHook()
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          title: newHistory.title,
          startDate: getMockInputDate(newHistory.startDate),
          endDate: newHistory.endDate && getMockInputDate(newHistory.endDate),
          description: expect.stringContaining(newHistory.description?.replace(/\s/g, ' ') ?? ''),
        }),
        undefined
      )
    })
  })
})
