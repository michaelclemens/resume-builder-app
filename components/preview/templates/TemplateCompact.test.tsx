import { createMockFullResume } from '@/test/mocks'
import { render } from '@testing-library/react'
import TemplateCompact from './TemplateCompact'

const resume = createMockFullResume()

describe('TemplateCompactComponent', () => {
  it('Should render personal details', () => {
    const { personal } = resume
    const { getByText } = render(<TemplateCompact resume={resume} />)

    expect(getByText(new RegExp(`^${personal.firstName} ${personal.lastName}`, 'i'))).toBeInTheDocument()
    expect(getByText(new RegExp(`^${personal.position}`, 'i'))).toBeInTheDocument()
    expect(getByText(new RegExp(`^${personal.city}`, 'i'))).toBeInTheDocument()
    expect(getByText(new RegExp(`^${personal.country}`, 'i'))).toBeInTheDocument()
    personal.phone && expect(getByText(personal.phone)).toBeInTheDocument()
    expect(getByText(new RegExp(`^${personal.email}`, 'i'))).toBeInTheDocument()
    personal.summary && expect(getByText(personal.summary.replace(/\n/g, ' '))).toBeInTheDocument()
  })
  it('Should render education details', () => {
    const { educations } = resume
    const { getByText } = render(<TemplateCompact resume={resume} />)

    for (const education of educations) {
      expect(getByText(new RegExp(`^${education.degree}, ${education.school}, ${education.city}`, 'i'))).toBeInTheDocument()
      expect(getByText(new RegExp(`^${education.startDate.toDateString()}`, 'i'))).toBeInTheDocument()
      education.endDate && expect(getByText(new RegExp(`- ${education.endDate.toDateString()}`, 'i')))
      education.description && expect(getByText(education.description.replace(/\n/g, ' '))).toBeInTheDocument()
    }
  })
  it('Should render employment details', () => {
    const { employments } = resume
    const { getByText } = render(<TemplateCompact resume={resume} />)

    for (const employment of employments) {
      expect(getByText(new RegExp(`^${employment.employer}, ${employment.city}`, 'i'))).toBeInTheDocument()

      for (const employmentHistory of employment.history) {
        expect(getByText(new RegExp(`^${employmentHistory.title}`, 'i'))).toBeInTheDocument()
        expect(getByText(new RegExp(`^${employmentHistory.startDate.toDateString()}`, 'i'))).toBeInTheDocument()
        employmentHistory.endDate && expect(getByText(new RegExp(`- ${employmentHistory.endDate.toDateString()}`, 'i')))
        employmentHistory.description && expect(getByText(employmentHistory.description.replace(/\n/g, ' '))).toBeInTheDocument()
      }
    }
  })
  it('Should render skill details', () => {
    const { skills } = resume
    const { getByText } = render(<TemplateCompact resume={resume} />)

    for (const skill of skills) {
      expect(getByText(new RegExp(`^${skill.name}`, 'i'))).toBeInTheDocument()
    }
  })
  it('Should render strength details', () => {
    const { strengths } = resume
    const { getByText } = render(<TemplateCompact resume={resume} />)

    for (const strength of strengths) {
      expect(getByText(new RegExp(`^${strength.name}`, 'i'))).toBeInTheDocument()
    }
  })
})
