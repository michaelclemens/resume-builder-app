import { createMockHistory } from '@/test/mocks'
import { fireEvent, render } from '@testing-library/react'
import { SectionEnums } from '@/types/section'
import { SectionForm } from '@/components/ui/form'
import { List } from '@/components/ui/list'
import HistorySection from './HistorySection'

jest.mock('@/components/ui/list')
jest.mock('@/components/ui/form')

const mockListComponent = jest.mocked(List)
const mockFormComponent = jest.mocked(SectionForm)

const history = createMockHistory()

describe('HistorySectionComponent', () => {
  it('Should render initially collapsed', () => {
    const { getByText, getByTitle, queryByTitle } = render(<HistorySection employmentId={history.employmentId} histories={[history]} />)

    expect(getByText(/employment history/i)).toBeInTheDocument()
    expect(getByTitle(/open/i)).toBeInTheDocument()
    expect(queryByTitle(/close/i)).not.toBeInTheDocument()
    expect(mockListComponent).not.toHaveBeenCalled()
    expect(mockFormComponent).not.toHaveBeenCalled()
  })
  it('Should show the list and form components when opened', () => {
    const { getByTitle, queryByTitle } = render(<HistorySection employmentId={history.employmentId} histories={[history]} />)

    fireEvent.click(getByTitle(/open/i))

    expect(queryByTitle(/open/i)).not.toBeInTheDocument()
    expect(getByTitle(/close/i)).toBeInTheDocument()
    expect(mockListComponent).toHaveBeenCalledWith(
      {
        sectionType: SectionEnums.employmentHistory,
        parentId: history.employmentId,
        parentProperty: 'employmentId',
        initialItems: [history],
      },
      expect.anything()
    )
    expect(mockFormComponent).toHaveBeenCalledWith(
      {
        sectionType: SectionEnums.employmentHistory,
        parentId: history.employmentId,
      },
      expect.anything()
    )
  })
})
