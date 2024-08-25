import { ResumeFull } from '@/lib/client/resume'
import { Lato, Oswald } from 'next/font/google'
import { Ref } from 'react'
import ColourElement from './util/ColourElement'
import ItemContent from './util/ItemContent'
import { RenderHtml } from '../ui'
import ListContent from './util/ListContent'
import { TemplateHeading } from './util/Heading'

const oswald = Oswald({ subsets: ['latin'], display: 'swap', variable: '--font-oswald' })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' })

export default function Compact({
  resume: { personal, employments, educations, skills, strengths, histories: initialHistories },
  colourElementRef,
}: {
  resume: ResumeFull
  colourElementRef?: Ref<HTMLDivElement>
}) {
  return (
    <div className={`${lato.variable} ${oswald.variable} flex h-full min-h-screen flex-col bg-white font-lato text-[8pt] text-black`}>
      <div className="flex h-full min-h-screen gap-x-10">
        <div className="w-4/6 bg-white pb-5 pl-14 pt-16">
          <ItemContent item={personal} className="mb-7">
            {personal => (
              <>
                <div className="mb-2 font-oswald text-3xl font-medium">
                  {personal?.firstName} {personal?.lastName}
                </div>
                <div className="text-[6.5pt] uppercase tracking-widest">{personal?.position}</div>
              </>
            )}
          </ItemContent>
          <ItemContent item={personal} heading="Profile" className="text-[9pt]">
            {personal => (
              <>
                {personal?.summary && (
                  <div className="mt-2">
                    <RenderHtml html={personal.summary} />
                  </div>
                )}
              </>
            )}
          </ItemContent>
          <ListContent items={employments} heading="Employment History" className="pt-5 text-[9pt]">
            {employment => {
              const histories = initialHistories
                ? initialHistories.filter(history => history.employmentId === employment.id)
                : (employment.history ?? [])
              return (
                <section key={employment.id}>
                  <p className="pt-2 text-[10pt] font-bold">
                    {employment.employer}
                    {employment.city && `, ${employment.city}`}
                  </p>
                  <ListContent items={histories}>
                    {history => (
                      <div key={history.id} className="pt-4 last-of-type:mb-0">
                        <p className="text-[10pt] font-bold">{history.title}</p>
                        <p className="pt-1 text-[7.5pt] font-thin uppercase tracking-wider text-gray-400">
                          {history.startDate.toDateString()}
                          {history.endDate && ` - ${history.endDate.toDateString()}`}
                        </p>
                        {history.description && (
                          <div className="mt-2">
                            <RenderHtml html={history.description} />
                          </div>
                        )}
                      </div>
                    )}
                  </ListContent>
                </section>
              )
            }}
          </ListContent>
          <ListContent items={educations} heading="Education" className="pt-5 text-[9pt]">
            {education => (
              <section key={education.id}>
                <p className="pt-2 text-[10pt] font-bold capitalize">
                  {education.degree}, {education.school}
                  {education.city && `, ${education.city}`}
                </p>
                <p className="pt-1 text-[7.5pt] font-thin uppercase tracking-wider text-gray-400">
                  {education.startDate.toDateString()}
                  {education.endDate && ` - ${education.endDate.toDateString()}`}
                </p>
                {education.description && (
                  <div className="mt-2">
                    <RenderHtml html={education.description} />
                  </div>
                )}
              </section>
            )}
          </ListContent>
        </div>
        <ColourElement colourElementRef={colourElementRef} className="w-2/6 px-10 pb-5 pt-36 text-white">
          <ItemContent item={personal} heading="Details" headingType={TemplateHeading.h3} className="mb-7 text-[8pt]">
            {personal => (
              <>
                {personal?.city && <div className="mb-1 mt-2">{personal.city}</div>}
                {personal?.country && <div className="mb-1">{personal.country}</div>}
                {personal?.phone && <div className="mb-1">{personal.phone}</div>}
                {personal?.email && (
                  <div className="mb-1">
                    <a href={`mailto:${personal.email}`}>{personal.email}</a>
                  </div>
                )}
              </>
            )}
          </ItemContent>
          <ListContent items={skills} heading="Experience" headingType={TemplateHeading.h3} className="mb-7 text-[8pt]">
            {skill => (
              <div key={skill.id} className="my-2 capitalize">
                {skill.name}
              </div>
            )}
          </ListContent>
          <ListContent items={strengths} heading="Strengths" headingType={TemplateHeading.h3} className="mb-7 text-[8pt]">
            {strength => (
              <div key={strength.id} className="my-2 capitalize">
                {strength.name}
              </div>
            )}
          </ListContent>
        </ColourElement>
      </div>
    </div>
  )
}
