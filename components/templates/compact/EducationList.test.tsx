import { render } from '@testing-library/react'
import EducationList from './EducationList'
import { createMockEducation, regexString } from '@/test/mocks'

const education = createMockEducation()

describe('CompactEducationComponent', () => {
  it('Should not render if no educations are passed', () => {
    const { container } = render(<EducationList educations={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct heading', () => {
    const { getByText } = render(<EducationList educations={[education]} />)
    expect(getByText(regexString('education'))).toBeInTheDocument()
  })
  it('Should render the correct details', () => {
    const partialEducation = { ...education, city: null, endDate: null, description: null }
    const { queryByText, rerender, getByText } = render(<EducationList educations={[partialEducation]} />)
    expect(getByText(regexString(`${education.degree}, ${education.school}`))).toBeInTheDocument()
    expect(getByText(regexString(education.startDate.toDateString()))).toBeInTheDocument()
    expect(queryByText(regexString(`, ${education.city}`, false))).not.toBeInTheDocument()
    expect(queryByText(regexString(`- ${education.endDate?.toDateString()}`, false))).not.toBeInTheDocument()
    expect(queryByText(regexString((education.description as string).replace(/\n/g, ' ')))).not.toBeInTheDocument()

    rerender(<EducationList educations={[education]} />)
    expect(getByText(regexString(`${education.degree}, ${education.school}, ${education.city}`))).toBeInTheDocument()
    expect(getByText(regexString(`${education.startDate.toDateString()} - ${education.endDate?.toDateString()}`))).toBeInTheDocument()
    expect(getByText(regexString((education.description as string).replace(/\n/g, ' ')))).toBeInTheDocument()
  })
})
