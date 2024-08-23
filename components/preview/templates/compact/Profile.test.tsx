import { render } from '@testing-library/react'
import Profile from './Profile'
import { createMockPersonal, regexString } from '@/test/mocks'

const personal = createMockPersonal()

describe('CompactProfileComponent', () => {
  it('Should not render if no personal is passed', () => {
    const { container } = render(<Profile personal={null} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct heading', () => {
    const { getByText } = render(<Profile personal={personal} />)
    expect(getByText(regexString('profile'))).toBeInTheDocument()
  })
  it('Should render the correct details', () => {
    const partialPersonal = { ...personal, summary: null }
    const { getByText, queryByText, rerender } = render(<Profile personal={partialPersonal} />)
    expect(queryByText(regexString((personal.summary as string).replace(/\n/g, ' ')))).not.toBeInTheDocument()

    rerender(<Profile personal={personal} />)
    expect(getByText(regexString((personal.summary as string).replace(/\n/g, ' ')))).toBeInTheDocument()
  })
})
