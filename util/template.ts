import { TemplateCompact, TemplateDefault, TemplateSimple } from '@/components/templates'
import { ColourElements } from '@/types/template'
import { Template } from '@prisma/client'

export const resumePrintPreviewID = 'resume-print-preview'

export const getTemplateComponent = (template: Template) => {
  switch (template) {
    case Template.COMPACT:
      return TemplateCompact
    case Template.SIMPLE:
      return TemplateSimple
    case Template.DEFAULT:
    default:
      return TemplateDefault
  }
}

export const getDefaultOptions = (template: Template) => {
  switch (template) {
    case Template.COMPACT:
      return { [ColourElements.background]: '#082A4D', [ColourElements.text]: '#fff' }
    case Template.SIMPLE:
      return { [ColourElements.background]: '#FFE14C', [ColourElements.text]: '#000' }
    case Template.DEFAULT:
    default:
      return { [ColourElements.background]: '#f4f4f4', [ColourElements.text]: '#000' }
  }
}
