'use client'

import { Template } from '@prisma/client'
import { createContext, lazy } from 'react'
import { ColourElements, TemplateOptions } from '@/types/template'

type TemplateColours = {
  [ColourElements.background]?: string
  [ColourElements.text]?: string
}

type TemplateConfig = {
  template: Template
  defaultColours: TemplateColours
  selectedColours?: TemplateColours
}

const defaultColoursMap = {
  [Template.COMPACT]: { background: '#082A4D', text: '#FFF' },
  [Template.SIMPLE]: { background: '#FFE14C', text: '#000' },
  [Template.MODERN]: { background: '#082A4D', text: '#FFF' },
  [Template.DEFAULT]: { background: '#f4f4f4', text: '#000' },
}

const templateComponentMap = {
  [Template.COMPACT]: lazy(() => import('@/components/templates/Compact')),
  [Template.SIMPLE]: lazy(() => import('@/components/templates/Simple')),
  [Template.MODERN]: lazy(() => import('@/components/templates/Modern')),
  [Template.DEFAULT]: lazy(() => import('@/components/templates/Default')),
}

export const getDefaultColours = (template: Template): TemplateColours => ({
  background: defaultColoursMap[template].background,
  text: defaultColoursMap[template].text,
})

export const getTemplateConfig = (template: Template, templateOptions?: TemplateOptions): TemplateConfig => ({
  template,
  defaultColours: getDefaultColours(template),
  selectedColours: templateOptions?.colours ?? undefined,
})

export const getTemplateComponent = (template: Template) => templateComponentMap[template]

export const TemplateConfigContext = createContext<TemplateConfig>(getTemplateConfig(Template.DEFAULT))

export const getTemplateImage = (template: Template) => {
  const filename = template.toLowerCase()
  return `/templates/${filename}.jpg`
}
