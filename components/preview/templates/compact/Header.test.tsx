import { render } from '@testing-library/react'
import Header from './Header'
import { createMockPersonal } from '@/test/mocks'

const personal = createMockPersonal()

describe('CompactHeaderComponent', () => {
  it('Should not render if no personal is passed', () => {
    const { container } = render(<Header personal={null} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct details', () => {
    const { getByText } = render(<Header personal={personal} />)
    expect(getByText(new RegExp(`^${personal.firstName} ${personal.lastName}`, 'i'))).toBeInTheDocument()
    expect(getByText(new RegExp(`^${personal.position}`, 'i'))).toBeInTheDocument()
  })
})
