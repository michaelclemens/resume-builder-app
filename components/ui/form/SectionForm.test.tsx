import { createMockHistory, createMockStrength } from '@/test/mocks'
import { renderWithProviders } from '@/test/redux'
import { faker } from '@faker-js/faker'
import { fireEvent, waitFor } from '@testing-library/react'
import { SectionEnums, SectionItemType, SectionType } from '@/types/section'
import { updateEmploymentHistory } from '@/lib/client/employmentHistory'
import { updateStrength } from '@/lib/client/strength'
import { RootState } from '@/lib/redux/store'
import { ResponseStatus } from '@/lib/response'
import FormBodyStrength from '../../strength/FormBodyStrength'
import SectionForm from './SectionForm'

jest.mock('../../strength/FormBodyStrength')
jest.mock('../../employment/history/FormBodyHistory')
jest.mock('@/lib/client/strength')
jest.mock('@/lib/client/employmentHistory')

const mockUpdateStrength = jest.mocked(updateStrength)
const mockUpdateEmploymentHistory = jest.mocked(updateEmploymentHistory)
const onSave = jest.fn()

async function createSuccessResponseReturn(key: SectionType, item: SectionItemType) {
  return Promise.resolve({
    status: ResponseStatus.success,
    payload: { [key]: item },
  })
}

function renderComponent({
  sectionType = SectionEnums.strength,
  parentId,
  item,
  preloadedState,
}: {
  sectionType?: SectionType
  parentId: string
  item?: SectionItemType
  preloadedState?: Partial<RootState>
}) {
  return renderWithProviders(<SectionForm sectionType={sectionType} parentId={parentId} item={item} onSave={onSave} />, { preloadedState })
}
describe('FormComponent', () => {
  it('Should render the body component for a create form', async () => {
    const resumeId = faker.string.alphanumeric({ length: 5 })
    renderComponent({ parentId: resumeId })

    await waitFor(() => expect(FormBodyStrength).toHaveBeenCalledWith(expect.objectContaining({ editing: false }), undefined))
  })
  it('Should render the body component for an update form', async () => {
    const strength = createMockStrength()
    renderComponent({
      parentId: strength.resumeId,
      item: strength,
    })

    expect(FormBodyStrength).toHaveBeenCalledWith(expect.objectContaining({ editing: true }), undefined)
  })
  it('Should call onSave on successful update form submission', async () => {
    const strength = createMockStrength()
    mockUpdateStrength.mockImplementationOnce(async () => createSuccessResponseReturn(SectionEnums.strength, strength))

    const { getByRole } = renderComponent({
      parentId: strength.resumeId,
      item: strength,
      preloadedState: { strength: [strength] },
    })

    expect(onSave).not.toHaveBeenCalled()

    fireEvent.submit(getByRole('form'))

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1)
    })
  })
  it('Should call onSave on successful update form submission with parent', async () => {
    const history = createMockHistory()
    mockUpdateEmploymentHistory.mockImplementationOnce(async () => createSuccessResponseReturn(SectionEnums.employmentHistory, history))

    const { getByRole } = renderComponent({
      sectionType: SectionEnums.employmentHistory,
      parentId: history.employmentId,
      item: history,
      preloadedState: { employmentHistory: [history] },
    })

    expect(onSave).not.toHaveBeenCalled()

    fireEvent.submit(getByRole('form'))

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1)
    })
  })
})
