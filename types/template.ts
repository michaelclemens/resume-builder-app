import { Prisma } from '@prisma/client'

export const resumePrintPreviewID = 'resume-print-preview'

export enum ColourElements {
  background = 'background',
  text = 'text',
}

export type ColourElementType = keyof typeof ColourElements
export type ColourOptions = {
  [key in ColourElementType]?: string
}

export type TemplateOptions =
  | ({
      colours?: ColourOptions
    } & Prisma.JsonValue)
  | null
