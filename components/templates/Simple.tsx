import { Lato } from 'next/font/google'
import { Ref } from 'react'
import { ResumeFull } from '@/lib/client/resume'
import { getDisplayDate } from '@/util/date'
import { RichTextViewer } from '../ui'
import ColourElement from './util/ColourElement'
import ItemContent from './util/ItemContent'
import ListContent from './util/ListContent'

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' })

export default function Simple({
  resume: { personal, employments, educations, skills, strengths, histories: initialHistories },
  colourElementRef,
}: {
  resume: ResumeFull
  colourElementRef?: Ref<HTMLDivElement>
}) {
  return (
    <div className={`${lato.variable} font-lato flex h-full min-h-screen flex-col bg-white text-[8pt] text-black`}>
      <ColourElement colourElementRef={colourElementRef}>
        <ItemContent item={personal} className="flex flex-row px-20 py-10">
          {personal => (
            <>
              <div className="w-3/5 text-4xl leading-9 font-extrabold uppercase">
                <div>{personal?.firstName}</div>
                <div>{personal?.lastName}</div>
              </div>
              <div className="w-2/5 text-[9.5pt]">
                <div className="font-bold">{personal?.position}</div>
                <div>
                  {personal?.city}
                  {personal?.country && `, ${personal.country}`}
                </div>
                {personal?.email && (
                  <div>
                    <a href={`mailto:${personal.email}`}>{personal.email}</a>
                  </div>
                )}
                {personal?.phone && <div>{personal.phone}</div>}
              </div>
            </>
          )}
        </ItemContent>
      </ColourElement>
      <div className="px-20 py-8">
        <ItemContent item={personal} heading="Profile" className="text-[9.5pt]">
          {personal => personal?.summary && <RichTextViewer value={personal.summary} />}
        </ItemContent>
        <ListContent items={employments} heading="Employment History" className="pt-5 text-[9.5pt]">
          {employment => {
            const histories = initialHistories
              ? initialHistories.filter(history => history.employmentId === employment.id)
              : (employment.history ?? [])
            return (
              <section key={employment.id}>
                <p className="pt-3 text-[10pt] font-bold">
                  {employment.employer}
                  {employment.city && `, ${employment.city}`}
                </p>
                <ListContent items={histories}>
                  {history => (
                    <div key={history.id} className="pt-4 last-of-type:mb-0">
                      <p className="text-[10pt] font-bold">{history.title}</p>
                      <p className="text-[7.5pt] font-thin tracking-widest text-gray-400 uppercase">
                        {getDisplayDate(history.startDate)}
                        {history.endDate && ` - ${getDisplayDate(history.endDate)}`}
                      </p>
                      {history.description && <RichTextViewer value={history.description} />}
                    </div>
                  )}
                </ListContent>
              </section>
            )
          }}
        </ListContent>
        <ListContent items={educations} heading="Education" className="pt-5 text-[9.5pt]">
          {education => (
            <section key={education.id}>
              <p className="pt-2 text-[10pt] font-bold capitalize">
                {education.degree}, {education.school}
                {education.city && `, ${education.city}`}
              </p>
              <p className="text-[7.5pt] font-thin tracking-widest text-gray-400 uppercase">
                {getDisplayDate(education.startDate)}
                {education.endDate && ` - ${getDisplayDate(education.endDate)}`}
              </p>
              {education.description && <RichTextViewer value={education.description} />}
            </section>
          )}
        </ListContent>
        <ListContent items={skills} heading="Experience" className="pt-5 text-[9.5pt] [&>div]:mt-2 [&>div]:grid [&>div]:grid-cols-2">
          {skill => (
            <div key={skill.id} className="my-1 capitalize">
              {skill.name}
            </div>
          )}
        </ListContent>
        <ListContent items={strengths} heading="Strengths" className="pt-5 text-[9.5pt] [&>div]:mt-2 [&>div]:grid [&>div]:grid-cols-2">
          {strength => (
            <div key={strength.id} className="my-1 capitalize">
              {strength.name}
            </div>
          )}
        </ListContent>
      </div>
    </div>
  )
}
