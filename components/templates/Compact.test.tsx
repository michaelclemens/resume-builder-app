import { createMockFullResume, regexString } from '@/test/mocks'
import { getTemplateComponent, renderTemplateComponent } from '@/test/template'
import { faker } from '@faker-js/faker'
import { Template } from '@prisma/client'
import { waitFor } from '@testing-library/react'
import { getDisplayDate } from '@/util/date'
import { getDefaultColours } from '@/util/template'

const template = Template.COMPACT
const resume = createMockFullResume()
const defaults = getDefaultColours(template)

describe('TemplateCompactComponent', () => {
  it('Should render with default colours', async () => {
    const { colourElementRef } = renderTemplateComponent(template, resume)
    await waitFor(() =>
      expect(colourElementRef.current).toHaveStyle({
        backgroundColor: defaults.background,
        color: defaults.text,
      })
    )
  })
  it('Should render saved colours', () => {
    const resumeWithColours = {
      ...resume,
      templateOptions: { colours: { background: faker.color.rgb({ format: 'hex' }), text: faker.color.rgb({ format: 'hex' }) } },
    }
    const { colourElementRef } = renderTemplateComponent(template, resumeWithColours)
    expect(colourElementRef.current).toHaveStyle({
      backgroundColor: resumeWithColours.templateOptions.colours.background,
      color: resumeWithColours.templateOptions.colours.text,
    })
  })
  it('Should render the correct personal details', () => {
    const { personal } = resume
    const { queryByText, rerender, getByText, getByRole } = renderTemplateComponent(template, { ...resume, personal: null })
    expect(queryByText(regexString(`${personal.firstName} ${personal.lastName}`))).not.toBeInTheDocument()

    const partialPersonal = { ...personal, position: null, summary: null, city: null, country: null, phone: null, email: null }
    rerender(getTemplateComponent(template, { ...resume, personal: partialPersonal }))
    expect(getByText(regexString(`${personal.firstName} ${personal.lastName}`))).toBeInTheDocument()
    expect(queryByText(regexString(personal.position as string))).not.toBeInTheDocument()
    expect(getByText(regexString('details'))).toBeInTheDocument()
    expect(queryByText(regexString(personal.city as string))).not.toBeInTheDocument()
    expect(queryByText(regexString(personal.country as string))).not.toBeInTheDocument()
    expect(queryByText(regexString(personal.phone as string))).not.toBeInTheDocument()
    expect(queryByText(regexString(personal.email as string))).not.toBeInTheDocument()
    expect(getByText(regexString('profile'))).toBeInTheDocument()
    expect(queryByText(regexString((personal.summary as string).replace(/\n/g, ' ')))).not.toBeInTheDocument()

    rerender(getTemplateComponent(template, resume))
    expect(getByText(regexString(`${personal.firstName} ${personal.lastName}`))).toBeInTheDocument()
    expect(getByText(regexString(personal.position as string))).toBeInTheDocument()
    expect(getByText(regexString('details'))).toBeInTheDocument()
    expect(getByText(regexString(personal.city as string))).toBeInTheDocument()
    expect(getByText(regexString(personal.country as string))).toBeInTheDocument()
    expect(getByText(regexString(personal.phone as string))).toBeInTheDocument()
    const link = getByRole('link', { name: regexString(personal.email as string) })
    expect(link).toBeInTheDocument()
    expect(link).toHaveProperty('href', `mailto:${personal.email}`)
    expect(getByText(regexString('profile'))).toBeInTheDocument()
    expect(getByText(regexString((personal.summary as string).replace(/\n/g, ' ')))).toBeInTheDocument()
  })
  it('Should render the correct education details', () => {
    const [education] = resume.educations
    const partialEducation = { ...education, city: null, endDate: null, description: null }

    const { queryByText, rerender, getByText } = renderTemplateComponent(template, { ...resume, educations: [partialEducation] })
    expect(getByText(regexString('education'))).toBeInTheDocument()
    expect(getByText(regexString(`${education.degree}, ${education.school}`))).toBeInTheDocument()
    expect(getByText(regexString(getDisplayDate(education.startDate)))).toBeInTheDocument()
    expect(queryByText(regexString((education.description as string).replace(/\n/g, ' ')))).not.toBeInTheDocument()

    rerender(getTemplateComponent(template, { ...resume, educations: [education] }))
    expect(getByText(regexString('education'))).toBeInTheDocument()
    expect(getByText(regexString(`${education.degree}, ${education.school}, ${education.city}`))).toBeInTheDocument()
    expect(getByText(regexString(`${getDisplayDate(education.startDate)} - ${getDisplayDate(education.endDate)}`))).toBeInTheDocument()
    expect(getByText(regexString((education.description as string).replace(/\n/g, ' ')))).toBeInTheDocument()
  })
  it('Should render the correct employment details', () => {
    const [employment] = resume.employments
    const [history] = employment.history
    const partialHistory = { ...history, endDate: null, description: null }
    const partialEmployment = { ...employment, city: null, history: [partialHistory] }

    const { queryByText, rerender, getByText } = renderTemplateComponent(template, { ...resume, employments: [partialEmployment] })
    expect(getByText(regexString('employment history'))).toBeInTheDocument()
    expect(getByText(regexString(employment.employer))).toBeInTheDocument()
    expect(getByText(regexString(history.title))).toBeInTheDocument()
    expect(getByText(regexString(getDisplayDate(history.startDate)))).toBeInTheDocument()
    expect(queryByText(regexString((history.description as string).replace(/\n/g, ' ')))).not.toBeInTheDocument()

    rerender(getTemplateComponent(template, { ...resume, employments: [{ ...employment, history: [history] }] }))
    expect(getByText(regexString('employment history'))).toBeInTheDocument()
    expect(getByText(regexString(`${employment.employer}, ${employment.city}`))).toBeInTheDocument()
    expect(getByText(regexString(history.title))).toBeInTheDocument()
    expect(getByText(regexString(`${getDisplayDate(history.startDate)} - ${getDisplayDate(history.endDate)}`))).toBeInTheDocument()
    expect(getByText(regexString((history.description as string).replace(/\n/g, ' ')))).toBeInTheDocument()
  })
  it('Should render the correct skill details', () => {
    const [skill] = resume.skills
    const { getByText } = renderTemplateComponent(template, { ...resume, skills: [skill] })
    expect(getByText(regexString('experience'))).toBeInTheDocument()
    expect(getByText(regexString(skill.name))).toBeInTheDocument()
  })
  it('Should render the correct strength details', () => {
    const [strength] = resume.strengths
    const { getByText } = renderTemplateComponent(template, { ...resume, strengths: [strength] })
    expect(getByText(regexString('strengths'))).toBeInTheDocument()
    expect(getByText(regexString(strength.name))).toBeInTheDocument()
  })
})
