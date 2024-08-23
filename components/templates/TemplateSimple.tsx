import { ResumeFull } from '@/lib/client/resume'
import { EducationList, EmploymentList, Experience, Header, Profile, StrengthList } from './simple'
import { Lato } from 'next/font/google'
import { ColourElements } from '@/types/template'
import { getDefaultOptions } from '@/util/template'
import { Template } from '@prisma/client'
import { Ref } from 'react'

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' })

export default function TemplateSimple({
  resume: { templateOptions, personal, employments, educations, skills, strengths, histories },
  colourElementRef,
}: {
  resume: ResumeFull
  colourElementRef?: Ref<HTMLDivElement>
}) {
  const defaults = getDefaultOptions(Template.SIMPLE)
  return (
    <div className={`${lato.variable} flex h-full min-h-screen flex-col bg-white font-lato text-[8pt]`}>
      <div
        ref={colourElementRef}
        style={{
          backgroundColor: templateOptions?.colours?.[ColourElements.background] ?? defaults[ColourElements.background],
          color: templateOptions?.colours?.[ColourElements.text] ?? defaults[ColourElements.text],
        }}
      >
        <Header personal={personal} />
      </div>
      <div className="px-20 py-8">
        <Profile personal={personal} />
        <EmploymentList employments={employments} histories={histories} />
        <EducationList educations={educations} />
        <Experience skills={skills} />
        <StrengthList strengths={strengths} />
      </div>
    </div>
  )
}
