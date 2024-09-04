import { Template } from '@prisma/client'
import { render } from '@testing-library/react'
import { createRef, Ref } from 'react'
import { ResumeFull } from '@/lib/client/resume'
import { getTemplateConfig, TemplateConfigContext } from '@/util/template'
import { getTemplateComponent as getResumeTemplateComponent } from '@/util/template'

export const getTemplateComponent = (template: Template, resume: ResumeFull, colourElementRef?: Ref<HTMLDivElement>) => {
  const ResumeTemplateComponent = getResumeTemplateComponent(template)
  return <ResumeTemplateComponent resume={resume} colourElementRef={colourElementRef} />
}

export const renderTemplateComponent = (template: Template, resume: ResumeFull) => {
  const colourElementRef = createRef<HTMLDivElement>()
  const results = render(getTemplateComponent(template, resume, colourElementRef), {
    wrapper: ({ children }) => (
      <TemplateConfigContext.Provider value={getTemplateConfig(template, resume.templateOptions)}>{children}</TemplateConfigContext.Provider>
    ),
  })
  return { ...results, colourElementRef }
}
