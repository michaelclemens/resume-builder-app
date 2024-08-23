import { render } from '@testing-library/react'
import StrengthList from './StrengthList'
import { createMockStrength } from '@/test/mocks'

const strength = createMockStrength()

describe('CompactStrengthListComponent', () => {
  it('Should not render if no strengths is passed', () => {
    const { container } = render(<StrengthList strengths={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct heading', () => {
    const { getByText } = render(<StrengthList strengths={[strength]} />)
    expect(getByText(/strengths/i)).toBeInTheDocument()
  })
  it('Should render the correct details', () => {
    const { getByText } = render(<StrengthList strengths={[strength]} />)
    expect(getByText(new RegExp(`^${strength.name}`, 'i'))).toBeInTheDocument()
  })
})
