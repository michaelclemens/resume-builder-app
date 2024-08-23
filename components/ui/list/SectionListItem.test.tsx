import SectionListItem from './SectionListItem'
import { SectionEnums } from '@/types/section'
import { createMockEmployment } from '@/test/mocks'
import ListItemEmployment from '@/components/employment/ListItemEmployment'
import { renderWithProviders } from '@/test/redux'
import Loading from '@/components/ui/Loading'
import { useSectionList } from '@/hooks'

jest.mock('@/hooks/useSectionList')
jest.mock('@/components/employment/ListItemEmployment')
jest.mock('@/components/ui/Loading')

const mockListItemComponent = jest.mocked(ListItemEmployment)
const mockLoading = jest.mocked(Loading)
const useSectionListHook = jest.mocked(useSectionList)
const defaultHookReturn = { items: [], saveSortOrder: jest.fn(), remove: jest.fn(), setEditing: jest.fn(), editing: false }

const employment = createMockEmployment()

describe('SectionListItemComponent', () => {
  it('Should render correctly', () => {
    useSectionListHook.mockImplementationOnce(() => ({ ...defaultHookReturn, deleting: false }))
    renderWithProviders(<SectionListItem sectionType={SectionEnums.employment} item={employment} />)

    expect(mockListItemComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        item: employment,
        editing: false,
        deleting: false,
      }),
      expect.anything()
    )
    expect(mockLoading).not.toHaveBeenCalled()
  })
  it('Should display loading when deleting', () => {
    useSectionListHook.mockImplementationOnce(() => ({ ...defaultHookReturn, deleting: true }))
    renderWithProviders(<SectionListItem sectionType={SectionEnums.employment} item={employment} />)
    expect(mockLoading).toHaveBeenCalled()
  })
})
