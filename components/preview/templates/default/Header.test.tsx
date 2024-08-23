import { render } from '@testing-library/react'
import Header from './Header'
import { createMockPersonal, regexString } from '@/test/mocks'

const personal = createMockPersonal()

describe('DefaultHeaderComponent', () => {
  it('Should not render if no personal is passed', () => {
    const { container, queryByText } = render(<Header personal={null} />)
    expect(container).toBeEmptyDOMElement()
    expect(queryByText(regexString(`${personal.firstName} ${personal.lastName}`))).not.toBeInTheDocument()
    expect(queryByText(regexString(personal.position as string))).not.toBeInTheDocument()
  })
  it('Should render the correct details', () => {
    const { getByText } = render(<Header personal={personal} />)
    expect(getByText(regexString(`${personal.firstName} ${personal.lastName}`))).toBeInTheDocument()
    expect(getByText(regexString(personal.position as string))).toBeInTheDocument()
  })
})
