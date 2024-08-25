'use client'

import { Compact, Simple, Default, Modern } from '@/components/templates'
import { ColourElements, TemplateOptions } from '@/types/template'
import { Template } from '@prisma/client'
import { createContext } from 'react'

export const resumePrintPreviewID = 'resume-print-preview'

type TemplateColours = {
  [ColourElements.background]?: string
  [ColourElements.text]?: string
}

export enum Heading {
  h2 = 'h2',
  h3 = 'h3',
}
export type HeadingType = keyof typeof Heading

type TemplateConfig = {
  headingClassName: {
    [key in HeadingType]?: string
  }
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

const getHeadingClassName = (template: Template) => {
  switch (template) {
    case Template.COMPACT:
      return { [Heading.h2]: 'font-oswald text-xl font-medium', [Heading.h3]: 'font-oswald text-sm font-medium' }
    case Template.SIMPLE:
      return { [Heading.h2]: 'inline bg-black px-2 py-1 text-[8pt] font-semibold uppercase tracking-widest text-white' }
    case Template.MODERN:
      return { [Heading.h2]: 'text-lg font-semibold', [Heading.h3]: 'py-1 text-sm font-semibold' }
    case Template.DEFAULT:
    default:
      return { [Heading.h2]: 'mb-3 border-b border-black pb-1 font-bold uppercase tracking-[0.2em]' }
  }
}

export const getTemplateConfig = (template: Template, templateOptions?: TemplateOptions): TemplateConfig => ({
  headingClassName: getHeadingClassName(template),
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
