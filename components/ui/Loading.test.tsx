import { render } from '@testing-library/react'
import Loading from './Loading'

describe('LoadingComponent', () => {
  it('Should render the spinner by default', () => {
    const { getByTitle } = render(<Loading />)
    expect(getByTitle(/loading spinner/i)).toBeInTheDocument()
  })
  it('Should not show the spinner if prop passed', () => {
    const { queryByTitle, getByText } = render(<Loading showSpinner={false} />)
    expect(queryByTitle(/loading spinner/i)).not.toBeInTheDocument()
    expect(getByText(/loading/i)).toBeInTheDocument()
  })
})
