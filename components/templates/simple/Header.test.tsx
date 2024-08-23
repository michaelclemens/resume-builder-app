import { render } from '@testing-library/react'
import Header from './Header'
import { createMockPersonal, regexString } from '@/test/mocks'

const personal = createMockPersonal()

describe('SimpleHeaderComponent', () => {
  it('Should not render if no personal is passed', () => {
    const { container } = render(<Header personal={null} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct details', () => {
    const { getByText, getByRole } = render(<Header personal={personal} />)
    expect(getByText(regexString(personal.firstName))).toBeInTheDocument()
    expect(getByText(regexString(personal.lastName))).toBeInTheDocument()
    expect(getByText(regexString(personal.position as string))).toBeInTheDocument()
    expect(getByText(regexString(`${personal.city}, ${personal.country}`))).toBeInTheDocument()
    expect(getByText(regexString(personal.phone as string))).toBeInTheDocument()
    const link = getByRole('link', { name: regexString(personal.email as string) })
    expect(link).toBeInTheDocument()
    expect(link).toHaveProperty('href', `mailto:${personal.email}`)
  })
})
