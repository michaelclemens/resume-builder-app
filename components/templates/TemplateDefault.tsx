import { ResumeFull } from '@/lib/client/resume'
import { Details, EducationList, EmploymentList, Experience, Header, Profile, StrengthList } from './default'
import { Montserrat } from 'next/font/google'
import { ColourElements } from '@/types/template'
import { getDefaultOptions } from '@/util/template'
import { Template } from '@prisma/client'
import { Ref } from 'react'

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat' })

export default function TemplateDefault({
  resume: { templateOptions, personal, employments, educations, skills, strengths },
  colourElementRef,
}: {
  resume: ResumeFull
  colourElementRef?: Ref<HTMLDivElement>
}) {
  const defaults = getDefaultOptions(Template.DEFAULT)
  return (
    <div className={`${montserrat.variable} flex h-full min-h-screen flex-col bg-white font-montserrat text-[6.5pt]`}>
      <Header personal={personal} />
      <div className="flex h-full min-h-screen gap-x-7">
        <div
          ref={colourElementRef}
          className="w-2/6 pl-14 pr-7 pt-52"
          style={{
            backgroundColor: templateOptions?.colours?.[ColourElements.background] ?? defaults[ColourElements.background],
            color: templateOptions?.colours?.[ColourElements.text] ?? defaults[ColourElements.text],
          }}
        >
          <Details personal={personal} />
          <Experience skills={skills} />
          <StrengthList strengths={strengths} />
        </div>
        <div className="w-4/6 bg-white pb-5 pr-14 pt-52">
          <Profile personal={personal} />
          <EmploymentList employments={employments} />
          <EducationList educations={educations} />
        </div>
      </div>
    </div>
  )
}
