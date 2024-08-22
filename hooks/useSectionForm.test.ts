import { renderHookWithProviders } from '@/test/redux'
import useSectionForm from './useSectionForm'
import { SectionEnums, SectionItemType } from '@/types/section'
import { createMockEmployment, createMultipleMockItems } from '@/test/mocks'
import { waitFor } from '@testing-library/react'
import { getDefaultValues } from '@/util/form'
import { addEmployment, updateEmployment } from '@/lib/client/employment'
import { response, ResponseStatus } from '@/lib/response'
import { faker } from '@faker-js/faker'

jest.mock('@/lib/client/employment')

const mockAddItem = jest.mocked(addEmployment)
const mockUpdateItem = jest.mocked(updateEmployment)
const onSave = jest.fn()
const employment = createMockEmployment()
const employmentFormData = getDefaultValues(SectionEnums.employment, employment)
console.error = jest.fn()

describe('useSectionFormHook', () => {
  it('Should determine if editing or not', () => {
    const { result, rerender } = renderHookWithProviders(({ item }: { item?: SectionItemType } = {}) => useSectionForm(SectionEnums.employment, item))
    expect(result.current.editing).toBeFalsy()

    rerender({ item: employment })
    expect(result.current.editing).toBeTruthy()
  })
  it('Should create a new item on save', async () => {
    mockAddItem.mockReturnValueOnce(Promise.resolve(response(ResponseStatus.success, { payload: { employment } })))
    const currentEmployments = createMultipleMockItems(createMockEmployment, 3)
    const { result, store } = renderHookWithProviders(() => useSectionForm(SectionEnums.employment), {
      preloadedState: { employment: currentEmployments },
    })

    expect(store.getState().employment).not.toContain(employment)
    await waitFor(() => result.current.save(employment.resumeId, employmentFormData, onSave))

    expect(mockAddItem).toHaveBeenCalledWith(employment.resumeId, employmentFormData)
    expect(mockUpdateItem).not.toHaveBeenCalled()
    expect(onSave).toHaveBeenCalled()
    expect(store.getState().employment).toContain(employment)
  })
  it('Should update an item on save', async () => {
    const currentEmployments = createMultipleMockItems(createMockEmployment, 3)
    const initEmployment = currentEmployments[1]
    const updatingFormData = getDefaultValues(SectionEnums.employment, createMockEmployment()) as { employer: string; city: string }
    const updatedEmployment = { ...initEmployment, employer: updatingFormData.employer, city: updatingFormData.city }

    mockUpdateItem.mockReturnValueOnce(Promise.resolve(response(ResponseStatus.success, { payload: { employment: updatedEmployment } })))
    const { result, store } = renderHookWithProviders(() => useSectionForm(SectionEnums.employment, initEmployment), {
      preloadedState: { employment: currentEmployments },
    })

    expect(store.getState().employment).toContain(initEmployment)
    await waitFor(() => result.current.save(initEmployment.resumeId, updatingFormData, onSave))

    expect(mockUpdateItem).toHaveBeenCalledWith(initEmployment.id, initEmployment.resumeId, updatingFormData)
    expect(mockAddItem).not.toHaveBeenCalled()
    expect(onSave).toHaveBeenCalled()
    expect(store.getState().employment).toContain(updatedEmployment)
  })
  it('Should return an error response if saving failed', async () => {
    const error = new Error(faker.lorem.sentence())
    mockAddItem.mockReturnValueOnce(Promise.resolve(response(ResponseStatus.error, error)))

    const { result, store } = renderHookWithProviders(() => useSectionForm(SectionEnums.employment))

    await waitFor(() => result.current.save(employment.resumeId, employmentFormData, onSave))

    expect(console.error).toHaveBeenCalledWith(error.message)
    expect(onSave).not.toHaveBeenCalled()
    expect(store.getState().employment).toBeNull()
  })
})
