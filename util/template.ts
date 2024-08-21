import { TemplateCompact, TemplateDefault } from '@/components/preview/templates'
import { ColourElements } from '@/types/template'
import { Template } from '@prisma/client'

export const resumePrintPreviewID = 'resume-print-preview'

export const getTemplateComponent = (template: Template) => {
  switch (template) {
    case Template.COMPACT:
      return TemplateCompact
    case Template.DEFAULT:
    default:
      return TemplateDefault
  }
}

export const getDefaultOptions = (template: Template) => {
  switch (template) {
    case Template.COMPACT:
      return { [ColourElements.background]: '#082A4D', [ColourElements.text]: '#fff' }
    case Template.DEFAULT:
    default:
      return { [ColourElements.background]: '#f4f4f4', [ColourElements.text]: '#000' }
  }
}
