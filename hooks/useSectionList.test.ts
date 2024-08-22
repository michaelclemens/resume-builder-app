import { renderHookWithProviders } from '@/test/redux'
import useSectionList from './useSectionList'
import { SectionEnums } from '@/types/section'
import { createMockEmployment, createMultipleMockItems } from '@/test/mocks'
import { deleteEmployment, setEmploymentSortOrders } from '@/lib/client/employment'
import { waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'

jest.mock('@/lib/client/employment')
const mockSetSortOrder = jest.mocked(setEmploymentSortOrders)
const mockDeleteItem = jest.mocked(deleteEmployment)
console.error = jest.fn();

const employments = createMultipleMockItems(createMockEmployment, 3)

describe('useSectionListHook', () => {
  it('Should return an empty array if no state or passed in items', () => {
    const { result } = renderHookWithProviders(() => useSectionList(SectionEnums.employment))
    expect(result.current).toEqual(expect.objectContaining({ items: [] }))
  })
  it('Should set items to state and return it if no state', () => {
    const { result } = renderHookWithProviders(() => useSectionList(SectionEnums.employment, { initialItems: employments }))
    expect(result.current).toEqual(expect.objectContaining({ items: employments }))
  })
  it('Should return item from state', () => {
    const stateEmployments = createMultipleMockItems(createMockEmployment, 3)
    const { result } = renderHookWithProviders(() => useSectionList(SectionEnums.employment, { initialItems: employments }), {
      preloadedState: { employment: stateEmployments },
    })
    expect(result.current).toEqual(expect.objectContaining({ items: stateEmployments }))
  })
  it('Should update items on sort order change', async () => {
    const { result, store } = renderHookWithProviders(() => useSectionList(SectionEnums.employment, { initialItems: employments }), {
      preloadedState: { employment: employments },
    })
    const newEmployments = [...employments]
    newEmployments[0] = { ...employments[0], order: 3 }
    newEmployments[2] = { ...employments[2], order: 1 }

    await waitFor(() => result.current.saveSortOrder(newEmployments))

    expect(store.getState().employment).toEqual(newEmployments)
    expect(mockSetSortOrder).toHaveBeenCalledWith(newEmployments)
  })
  it('Should delete an item', async () => {
    const { result, store } = renderHookWithProviders(() => useSectionList(SectionEnums.employment, { initialItems: employments }), {
      preloadedState: { employment: employments },
    })

    await waitFor(() => result.current.remove(employments[1]))

    expect(store.getState().employment).toEqual(employments.filter(employment => employment.id !== employments[1].id))
    expect(mockDeleteItem).toHaveBeenCalledWith(employments[1].id)
  })
  it('Should handle errors when failing delete', async () => {
    const error = new Error(faker.lorem.sentence())
    mockDeleteItem.mockRejectedValueOnce(error)
    const { result, store } = renderHookWithProviders(() => useSectionList(SectionEnums.employment, { initialItems: employments }), {
      preloadedState: { employment: employments },
    })

    await waitFor(() => result.current.remove(employments[1]))

    expect(store.getState().employment).toEqual(employments)
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should set editing', async () => {
    const { result } = renderHookWithProviders(() => useSectionList(SectionEnums.employment, { initialItems: employments }), {
      preloadedState: { employment: employments },
    })

    expect(result.current.editing).toBeFalsy()
    await waitFor(() => result.current.setEditing(true))

    expect(result.current.editing).toBeTruthy()
  })
})
