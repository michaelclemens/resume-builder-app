import { render } from '@testing-library/react'
import Details from './Details'
import { createMockPersonal, regexString } from '@/test/mocks'

const personal = createMockPersonal()

describe('CompactDetailsComponent', () => {
  it('Should not render if no personal is passed', () => {
    const { container } = render(<Details personal={null} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct heading', () => {
    const { getByText } = render(<Details personal={personal} />)
    expect(getByText(regexString('details'))).toBeInTheDocument()
  })
  it('Should render the correct details', () => {
    const partialPersonal = { ...personal, city: null, country: null, phone: null, email: null }
    const { queryByText, rerender, getByText, getByRole } = render(<Details personal={partialPersonal} />)
    expect(queryByText(regexString(personal.city as string))).not.toBeInTheDocument()
    expect(queryByText(regexString(personal.country as string))).not.toBeInTheDocument()
    expect(queryByText(regexString(personal.phone as string))).not.toBeInTheDocument()
    expect(queryByText(regexString(personal.email as string))).not.toBeInTheDocument()

    rerender(<Details personal={personal} />)
    expect(getByText(regexString(personal.city as string))).toBeInTheDocument()
    expect(getByText(regexString(personal.country as string))).toBeInTheDocument()
    expect(getByText(regexString(personal.phone as string))).toBeInTheDocument()
    const link = getByRole('link', { name: regexString(personal.email as string) })
    expect(link).toBeInTheDocument()
    expect(link).toHaveProperty('href', `mailto:${personal.email}`)
  })
})
