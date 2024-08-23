import { render } from '@testing-library/react'
import EmploymentHistoryList from './EmploymentHistoryList'
import { createMockHistory, regexString } from '@/test/mocks'

const history = createMockHistory()

describe('CompactEmploymentHistoryListComponent', () => {
  it('Should not render if no histories are passed', () => {
    const { container } = render(<EmploymentHistoryList histories={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct details', () => {
    const partialHistory = { ...history, endDate: null, description: null }
    const { queryByText, rerender, getByText } = render(<EmploymentHistoryList histories={[partialHistory]} />)
    expect(getByText(regexString(history.title))).toBeInTheDocument()
    expect(getByText(regexString(history.startDate.toDateString()))).toBeInTheDocument()
    expect(queryByText(regexString(`- ${history.endDate?.toDateString()}`, false))).not.toBeInTheDocument()
    expect(queryByText(regexString((history.description as string).replace(/\n/g, ' ')))).not.toBeInTheDocument()

    rerender(<EmploymentHistoryList histories={[history]} />)
    expect(getByText(regexString(history.title))).toBeInTheDocument()
    expect(getByText(regexString(`${history.startDate.toDateString()} - ${history.endDate?.toDateString()}`))).toBeInTheDocument()
    expect(getByText(regexString((history.description as string).replace(/\n/g, ' ')))).toBeInTheDocument()
  })
})
