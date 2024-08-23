import { render } from '@testing-library/react'
import Header from './Header'
import { createMockPersonal, regexString } from '@/test/mocks'

const personal = createMockPersonal()

describe('CompactHeaderComponent', () => {
  it('Should not render if no personal is passed', () => {
    const { container } = render(<Header personal={null} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct details', () => {
    const { getByText } = render(<Header personal={personal} />)
    expect(getByText(regexString(`${personal.firstName} ${personal.lastName}`))).toBeInTheDocument()
    expect(getByText(regexString(personal.position as string))).toBeInTheDocument()
  })
})
