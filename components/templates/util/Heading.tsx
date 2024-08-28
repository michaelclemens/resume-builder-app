import { TemplateConfigContext } from '@/util/template'
import { Template } from '@prisma/client'
import { useContext } from 'react'

export enum TemplateHeading {
  h2 = 'h2',
  h3 = 'h3',
}
export type TemplateHeadingType = keyof typeof TemplateHeading

const templateClassNames = {
  [Template.COMPACT]: { [TemplateHeading.h2]: 'font-oswald text-xl font-medium', [TemplateHeading.h3]: 'font-oswald text-sm font-medium' },
  [Template.SIMPLE]: { [TemplateHeading.h2]: 'inline bg-black px-2 py-1 text-[8pt] font-semibold uppercase tracking-widest text-white' },
  [Template.MODERN]: { [TemplateHeading.h2]: 'text-lg font-semibold', [TemplateHeading.h3]: 'py-1 text-sm font-semibold' },
  [Template.DEFAULT]: { [TemplateHeading.h2]: 'mb-3 border-b border-black pb-1 font-bold uppercase tracking-[0.2em]' },
}

export default function Heading({ heading, headingType = TemplateHeading.h2 }: { heading: string; headingType?: TemplateHeadingType }) {
  const { template } = useContext(TemplateConfigContext)
  const Element = headingType
  return <Element className={templateClassNames[template][headingType] ?? ''}>{heading}</Element>
}