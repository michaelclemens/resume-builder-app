'use client'

import { Template } from '@prisma/client'
import { createContext } from 'react'
import { ColourElements, TemplateOptions } from '@/types/template'
import { Compact, Simple, Default, Modern } from '@/components/templates'

type TemplateColours = {
  [ColourElements.background]?: string
  [ColourElements.text]?: string
}

type TemplateConfig = {
  template: Template
  defaultColours: TemplateColours
  selectedColours: TemplateColours
}

export const getDefaultColours = (template: Template): TemplateColours => {
  let background = '#FFF'
  let text = '#000'
  switch (template) {
    case Template.COMPACT:
      background = '#082A4D'
      text = '#FFF'
      break
    case Template.SIMPLE:
      background = '#FFE14C'
      text = '#000'
      break
    case Template.MODERN:
      background = '#0584a9'
      text = '#FFF'
      break
    case Template.DEFAULT:
      background = '#f4f4f4'
      text = '#000'
      break
  }
  return {
    background,
    text,
  }
}

export const getTemplateConfig = (template: Template, templateOptions?: TemplateOptions): TemplateConfig => ({
  template,
  defaultColours: getDefaultColours(template),
  selectedColours: templateOptions?.colours ?? {},
})

export const getTemplateComponent = (template: Template) => {
  switch (template) {
    case Template.COMPACT:
      return Compact
    case Template.SIMPLE:
      return Simple
    case Template.MODERN:
      return Modern
    case Template.DEFAULT:
    default:
      return Default
  }
}

export const TemplateConfigContext = createContext<TemplateConfig>(getTemplateConfig(Template.DEFAULT))

export const getTemplateImage = (template: Template) => {
  const filename = template.toLowerCase()
  return `/templates/${filename}.jpg`
}
