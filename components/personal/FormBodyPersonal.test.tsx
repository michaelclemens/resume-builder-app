import { waitFor, fireEvent } from '@testing-library/react'
import { createMockPersonal } from '@/test/mocks'
import { PersonalSchema } from '@/types/form'
import { disabledClass } from '../ui/form/RichTextEditor'
import { getDefaultValues, richTextEditorClassName } from '@/util/form'
import FormBodyPersonal from './FormBodyPersonal'
import { Personal } from '@prisma/client'
import { SectionEnums } from '@/types/section'
import { renderFormBody } from '@/test/form'

const personal = createMockPersonal()
const onSave = jest.fn()
console.error = jest.fn()

const renderComponent = ({ personal }: { personal?: Personal } = {}) =>
  renderFormBody({
    component: FormBodyPersonal,
    editing: !!personal,
    defaultValues: getDefaultValues(SectionEnums.personal, personal),
    schema: PersonalSchema,
    onSave,
  })

describe('FormBodyPersonalComponent', () => {
  it('Should render create new form', async () => {
    const { getByRole, getByLabelText } = renderComponent()

    expect(getByRole('textbox', { name: /firstname/i })).toHaveValue('')
    expect(getByRole('textbox', { name: /lastname/i })).toHaveValue('')
    expect(getByRole('textbox', { name: /position/i })).toHaveValue('')
    expect(getByRole('textbox', { name: /email/i })).toHaveValue('')
    expect(getByRole('textbox', { name: /phone/i })).toHaveValue('')
    expect(getByRole('textbox', { name: /city/i })).toHaveValue('')
    expect(getByRole('textbox', { name: /country/i })).toHaveValue('')

    await waitFor(() => {
      expect(getByLabelText(/summary/i).querySelector(`.${richTextEditorClassName}`)).toHaveTextContent('')
    })

    expect(getByRole('button', { name: /save/i })).toBeInTheDocument()
  })
  it('Should render an update form', async () => {
    const { getByRole, getByLabelText } = renderComponent({ personal })

    expect(getByRole('textbox', { name: /firstname/i })).toHaveValue(personal.firstName)
    expect(getByRole('textbox', { name: /lastname/i })).toHaveValue(personal.lastName)
    expect(getByRole('textbox', { name: /position/i })).toHaveValue(personal.position)
    expect(getByRole('textbox', { name: /email/i })).toHaveValue(personal.email)
    expect(getByRole('textbox', { name: /phone/i })).toHaveValue(personal.phone)
    expect(getByRole('textbox', { name: /city/i })).toHaveValue(personal.city)
    expect(getByRole('textbox', { name: /country/i })).toHaveValue(personal.country)

    await waitFor(() => {
      expect(getByLabelText(/summary/i).querySelector(`.${richTextEditorClassName}`)).toHaveTextContent(personal.summary?.replace(/\n/g, ' '))
    })

    expect(getByRole('button', { name: /save/i })).toBeInTheDocument()
  })
  it('Should display errros for required fields', async () => {
    const { getAllByRole, getByRole, getByText, rerenderHook } = renderComponent()

    expect(getByRole('textbox', { name: /firstname/i })).toBeRequired()
    expect(getByRole('textbox', { name: /lastname/i })).toBeRequired()

    fireEvent.click(getByRole('button', { name: /save/i }))

    await waitFor(() => {
      rerenderHook()
      expect(onSave).not.toHaveBeenCalled()
      expect(getAllByRole('alert')).toHaveLength(3)
    })

    expect(getByText(/first name is required/i)).toBeInTheDocument()
    expect(getByText(/last name is required/i)).toBeInTheDocument()
    expect(getByText(/invalid email/i)).toBeInTheDocument()
  })
  it('Should disable form elements when submitting', async () => {
    const { getByRole, getByLabelText, rerenderHook } = renderComponent()

    fireEvent.click(getByRole('button', { name: /save/i }))

    await waitFor(() => {
      rerenderHook()
    })

    expect(getByRole('textbox', { name: /firstname/i })).toBeDisabled()
    expect(getByRole('textbox', { name: /lastname/i })).toBeDisabled()
    expect(getByRole('textbox', { name: /position/i })).toBeDisabled()
    expect(getByRole('textbox', { name: /email/i })).toBeDisabled()
    expect(getByRole('textbox', { name: /phone/i })).toBeDisabled()
    expect(getByRole('textbox', { name: /city/i })).toBeDisabled()
    expect(getByRole('textbox', { name: /country/i })).toBeDisabled()
    expect(getByLabelText(/summary/i)).toHaveClass(disabledClass)
    expect(getByRole('button', { name: /save/i })).toBeDisabled()
  })
  it('Should successfully submit form with new values', async () => {
    const { getByRole, getByLabelText, rerenderHook } = renderComponent({ personal })

    const newPersonal = createMockPersonal()
    fireEvent.change(getByRole('textbox', { name: /firstname/i }), { target: { value: newPersonal.firstName } })
    fireEvent.change(getByRole('textbox', { name: /lastname/i }), { target: { value: newPersonal.lastName } })
    fireEvent.change(getByRole('textbox', { name: /position/i }), { target: { value: newPersonal.position } })
    fireEvent.change(getByRole('textbox', { name: /email/i }), { target: { value: newPersonal.email } })
    fireEvent.change(getByRole('textbox', { name: /phone/i }), { target: { value: newPersonal.phone } })
    fireEvent.change(getByRole('textbox', { name: /city/i }), { target: { value: newPersonal.city } })
    fireEvent.change(getByRole('textbox', { name: /country/i }), { target: { value: newPersonal.country } })

    await waitFor(() => {
      fireEvent.change(getByLabelText(/summary/i).querySelector(`.${richTextEditorClassName} p`), { target: { textContent: newPersonal.summary } })
    })

    fireEvent.click(getByRole('button', { name: /save/i }))

    await waitFor(() => {
      rerenderHook()
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: newPersonal.firstName,
          lastName: newPersonal.lastName,
          position: newPersonal.position,
          summary: expect.stringContaining(newPersonal.summary ?? ''),
          email: newPersonal.email,
          phone: newPersonal.phone,
          city: newPersonal.city,
          country: newPersonal.country,
        }),
        expect.anything()
      )
    })
  })
})
