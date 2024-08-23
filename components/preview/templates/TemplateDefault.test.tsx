import { render } from '@testing-library/react'
import TemplateDefault from './TemplateDefault'
import { createMockFullResume } from '@/test/mocks'
import { createRef } from 'react'
import { getDefaultOptions } from '@/util/template'
import { Template } from '@prisma/client'
import { faker } from '@faker-js/faker'

describe('TemplateDefaultComponent', () => {
  it('Should render with default colours', () => {
    const resume = createMockFullResume()
    const defaults = getDefaultOptions(Template.DEFAULT)
    const colourElementRef = createRef<HTMLDivElement>()
    render(<TemplateDefault resume={resume} colourElementRef={colourElementRef} />)
    expect(colourElementRef.current).toHaveStyle({
      backgroundColor: defaults.background,
      color: defaults.text,
    })
  })
  it('Should render saved colours', () => {
    const resume = {
      ...createMockFullResume(),
      templateOptions: { colours: { background: faker.color.rgb({ format: 'hex' }), text: faker.color.rgb({ format: 'hex' }) } },
    }
    const colourElementRef = createRef<HTMLDivElement>()
    render(<TemplateDefault resume={resume} colourElementRef={colourElementRef} />)
    expect(colourElementRef.current).toHaveStyle({
      backgroundColor: resume.templateOptions.colours.background,
      color: resume.templateOptions.colours.text,
    })
  })
})
