import { render } from '@testing-library/react'
import Details from './Details'
import { createMockPersonal } from '@/test/mocks'

const personal = createMockPersonal()

describe('CompactDetailsComponent', () => {
  it('Should not render if no personal is passed', () => {
    const { container } = render(<Details personal={null} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct heading', () => {
    const { getByText } = render(<Details personal={personal} />)
    expect(getByText(/details/i)).toBeInTheDocument()
  })
  it('Should render the correct details', () => {
    const partialPersonal = { ...personal, city: null, country: null, phone: null, email: null }
    const { queryByText, rerender, getByText, getByRole } = render(<Details personal={partialPersonal} />)
    expect(queryByText(new RegExp(`^${personal.city}`, 'i'))).not.toBeInTheDocument()
    expect(queryByText(new RegExp(`^${personal.country}`, 'i'))).not.toBeInTheDocument()
    expect(queryByText(personal.phone as string)).not.toBeInTheDocument()
    expect(queryByText(new RegExp(`^${personal.email}`, 'i'))).not.toBeInTheDocument()

    rerender(<Details personal={personal} />)
    expect(getByText(new RegExp(`^${personal.city}`, 'i'))).toBeInTheDocument()
    expect(getByText(new RegExp(`^${personal.country}`, 'i'))).toBeInTheDocument()
    expect(getByText(personal.phone as string)).toBeInTheDocument()
    const link = getByRole('link', { name: new RegExp(`^${personal.email}`, 'i') })
    expect(link).toBeInTheDocument()
    expect(link).toHaveProperty('href', `mailto:${personal.email}`)
  })
})
