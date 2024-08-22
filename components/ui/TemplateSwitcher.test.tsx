import useResume from '@/hooks/useResume'
import TemplateSwitcher, { selectedClassName, unselectedClassName } from './TemplateSwitcher'
import { fireEvent, render } from '@testing-library/react'
import cuid from 'cuid'
import { Template } from '@prisma/client'

jest.mock('@/hooks/useResume')

const updateTemplate = jest.fn()
jest.mocked(useResume).mockReturnValue({ resume: null, updateTemplate, updateTemplateOptions: jest.fn() })
const resumeId = cuid()

describe('TemplateSwitcherComponent', () => {
  it('Should render all templates', () => {
    const { getByAltText } = render(<TemplateSwitcher resumeId={resumeId} />)

    for (const template of Object.values(Template)) {
      const element = getByAltText(new RegExp(`template ${template}`, 'i'))
      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(`/templates/${template.toLowerCase()}.jpg`)))
    }
  })
  it('Should select the current template', () => {
    const { getByAltText } = render(<TemplateSwitcher resumeId={resumeId} template={Template.COMPACT} />)

    expect(getByAltText(new RegExp(`template ${Template.COMPACT}`, 'i'))).toHaveClass(selectedClassName)
    expect(getByAltText(new RegExp(`template ${Template.DEFAULT}`, 'i'))).toHaveClass(unselectedClassName)
  })
  it('Should not do anything if selecting the selected template', () => {
    const { getByAltText } = render(<TemplateSwitcher resumeId={resumeId} template={Template.DEFAULT} />)

    fireEvent.click(getByAltText(new RegExp(`template ${Template.DEFAULT}`, 'i')))

    expect(updateTemplate).not.toHaveBeenCalled()
  })
  it('Should update the template when selecting', () => {
    const { getByAltText } = render(<TemplateSwitcher resumeId={resumeId} template={Template.DEFAULT} />)

    fireEvent.click(getByAltText(new RegExp(`template ${Template.COMPACT}`, 'i')))

    expect(updateTemplate).toHaveBeenCalledWith(resumeId, Template.COMPACT)
  })
})
