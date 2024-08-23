import { render } from '@testing-library/react'
import EmploymentHistoryList from './EmploymentHistoryList'
import { createMockHistory } from '@/test/mocks'

const history = createMockHistory()

describe('CompactEmploymentHistoryListComponent', () => {
  it('Should not render if no histories are passed', () => {
    const { container } = render(<EmploymentHistoryList histories={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct details', () => {
    const partialHistory = { ...history, endDate: null, description: null }
    const { queryByText, rerender, getByText } = render(<EmploymentHistoryList histories={[partialHistory]} />)
    expect(getByText(new RegExp(`^${history.title}`, 'i'))).toBeInTheDocument()
    expect(getByText(new RegExp(`^${history.startDate.toDateString()}`, 'i'))).toBeInTheDocument()
    expect(queryByText(new RegExp(`- ${history.endDate?.toDateString()}`, 'i'))).not.toBeInTheDocument()
    expect(queryByText((history.description ?? '').replace(/\n/g, ' '))).not.toBeInTheDocument()

    rerender(<EmploymentHistoryList histories={[history]} />)
    expect(getByText(new RegExp(`^${history.title}`, 'i'))).toBeInTheDocument()
    expect(getByText(new RegExp(`^${history.startDate.toDateString()} - ${history.endDate?.toDateString()}`, 'i'))).toBeInTheDocument()
    expect(getByText((history.description ?? '').replace(/\n/g, ' '))).toBeInTheDocument()
  })
})
