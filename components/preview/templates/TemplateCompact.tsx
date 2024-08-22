import { ResumeFull } from '@/lib/client/resume'
import { Details, Education, Employment, Experience, Header, Profile, Strengths } from './compact'
import { Lato, Oswald } from 'next/font/google'
import { ColourElements } from '@/types/template'
import { getDefaultOptions } from '@/util/template'
import { Template } from '@prisma/client'
import { Ref } from 'react'

const oswald = Oswald({ subsets: ['latin'], display: 'swap', variable: '--font-oswald' })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' })

export default function TemplateCompact({
  resume: { templateOptions, personal, employments, educations, skills, strengths, histories },
  colourElementRef,
}: {
  resume: ResumeFull
  colourElementRef?: Ref<HTMLDivElement>
}) {
  const defaults = getDefaultOptions(Template.COMPACT)
  return (
    <div className={`${lato.variable} ${oswald.variable} flex h-full min-h-screen flex-col bg-white font-lato text-[8pt]`}>
      <div className="flex h-full min-h-screen gap-x-10">
        <div className="w-4/6 bg-white pb-5 pl-14 pt-16">
          <Header personal={personal} />
          <Profile personal={personal} />
          <Employment employments={employments} histories={histories} />
          <Education educations={educations} />
        </div>
        <div
          ref={colourElementRef}
          className="w-2/6 px-10 pb-5 pt-36 text-white"
          style={{
            backgroundColor: templateOptions?.colours?.[ColourElements.background] ?? defaults[ColourElements.background],
            color: templateOptions?.colours?.[ColourElements.text] ?? defaults[ColourElements.text],
          }}
        >
          <Details personal={personal} />
          <Experience skills={skills} />
          <Strengths strengths={strengths} />
        </div>
      </div>
    </div>
  )
}
