import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessageComponent', () => {
  it('Should render the error message', () => {
    const message = faker.lorem.sentence()

    const { getByRole } = render(<ErrorMessage error={{ type: 'test', message }} />)

    const errorEl = getByRole('alert')

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveTextContent(message)
  })
  it('Should not render if there is no error', () => {
    const { queryByRole } = render(<ErrorMessage />)

    expect(queryByRole('alert')).toBeNull()
  })
})
