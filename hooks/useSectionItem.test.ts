import { createMockPersonal } from '@/test/mocks'
import { renderHookWithProviders } from '@/test/redux'
import { SectionEnums } from '@/types/section'
import useSectionItem from './useSectionItem'

const personal = createMockPersonal()

describe('useSectionItemHook', () => {
  it('Should return null if no state or passed in item', () => {
    const { result } = renderHookWithProviders(() => useSectionItem(SectionEnums.personal))
    expect(result.current).toEqual({ item: null })
  })
  it('Should set item to state and return it if no state', () => {
    const { result, store } = renderHookWithProviders(() => useSectionItem(SectionEnums.personal, { initialItem: personal }))
    expect(result.current).toEqual({ item: personal })
    expect(store.getState().personal).toEqual(personal)
  })
  it('Should return item from state', () => {
    const statePersonal = createMockPersonal()
    const { result } = renderHookWithProviders(() => useSectionItem(SectionEnums.personal, { initialItem: personal }), {
      preloadedState: { personal: statePersonal },
    })
    expect(result.current).toEqual({ item: statePersonal })
  })
})
