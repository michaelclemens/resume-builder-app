import { render } from '@testing-library/react'
import EducationList from './EducationList'
import { createMockEducation } from '@/test/mocks'

const education = createMockEducation()

describe('CompactEducationComponent', () => {
  it('Should not render if no educations are passed', () => {
    const { container } = render(<EducationList educations={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct heading', () => {
    const { getByText } = render(<EducationList educations={[education]} />)
    expect(getByText(/education/i)).toBeInTheDocument()
  })
  it('Should render the correct details', () => {
    const partialEducation = { ...education, city: null, endDate: null, description: null }
    const { queryByText, rerender, getByText } = render(<EducationList educations={[partialEducation]} />)
    expect(getByText(new RegExp(`^${education.degree}, ${education.school}`, 'i'))).toBeInTheDocument()
    expect(getByText(new RegExp(`^${education.startDate.toDateString()}`, 'i'))).toBeInTheDocument()
    expect(queryByText(new RegExp(`, ${education.city}`, 'i'))).not.toBeInTheDocument()
    expect(queryByText(new RegExp(`- ${education.endDate?.toDateString()}`, 'i'))).not.toBeInTheDocument()
    expect(queryByText((education.description ?? '').replace(/\n/g, ' '))).not.toBeInTheDocument()

    rerender(<EducationList educations={[education]} />)
    expect(getByText(new RegExp(`^${education.degree}, ${education.school}, ${education.city}`, 'i'))).toBeInTheDocument()
    expect(getByText(new RegExp(`^${education.startDate.toDateString()} - ${education.endDate?.toDateString()}`, 'i'))).toBeInTheDocument()
    expect(getByText((education.description ?? '').replace(/\n/g, ' '))).toBeInTheDocument()
  })
})
