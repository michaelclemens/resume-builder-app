import { createMockEmployment, createMockEmploymentWithHistory, createMockHistory, regexString } from '@/test/mocks'
import EmploymentList from './EmploymentList'
import { render } from '@testing-library/react'
import { EmploymentWithHistory } from '@/types/section'
import EmploymentHistoryList from './EmploymentHistoryList'

jest.mock('./EmploymentHistoryList')
const mockEmploymentHistoryList = jest.mocked(EmploymentHistoryList)

const employment: EmploymentWithHistory = createMockEmploymentWithHistory()

describe('DefaultEmploymentListComponent', () => {
  it('Should not render if no employments are passed', () => {
    const { container } = render(<EmploymentList employments={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct heading', () => {
    const { getByText } = render(<EmploymentList employments={[employment]} />)
    expect(getByText(/employment history/i)).toBeInTheDocument()
  })
  it('Should render the correct details', () => {
    const partialEmployment = { ...employment, city: null, history: [] }
    const { queryByText, rerender, getByText, getByRole } = render(<EmploymentList employments={[partialEmployment]} />)
    expect(getByText(regexString(employment.employer))).toBeInTheDocument()
    expect(queryByText(regexString(employment.city as string))).not.toBeInTheDocument()
    expect(mockEmploymentHistoryList).toHaveBeenCalledWith(expect.objectContaining({ histories: [] }), expect.anything())

    rerender(<EmploymentList employments={[employment]} />)
    expect(getByText(regexString(employment.employer))).toBeInTheDocument()
    expect(getByText(regexString(employment.city as string))).toBeInTheDocument()
    expect(mockEmploymentHistoryList).toHaveBeenCalledWith(expect.objectContaining({ histories: employment.history }), expect.anything())

    const employmentWithoutHistory = createMockEmployment()
    const history = { ...createMockHistory(), employmentId: employmentWithoutHistory.id }
    rerender(<EmploymentList employments={[employmentWithoutHistory]} histories={[history]} />)
    expect(getByText(regexString(employmentWithoutHistory.employer))).toBeInTheDocument()
    expect(getByText(regexString(employmentWithoutHistory.city as string))).toBeInTheDocument()
    expect(mockEmploymentHistoryList).toHaveBeenCalledWith(expect.objectContaining({ histories: [history] }), expect.anything())
  })
})
