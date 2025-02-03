import { Montserrat } from 'next/font/google'
import { Ref } from 'react'
import { ResumeFull } from '@/lib/client/resume'
import { getDisplayDate } from '@/util/date'
import { RichTextViewer } from '../ui'
import ColourElement from './util/ColourElement'
import ItemContent from './util/ItemContent'
import ListContent from './util/ListContent'

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat' })

export default function Default({
  resume: { personal, employments, educations, skills, strengths, histories: initialHistories },
  colourElementRef,
}: {
  resume: ResumeFull
  colourElementRef?: Ref<HTMLDivElement>
}) {
  return (
    <div className={`${montserrat.variable} font-montserrat flex h-full min-h-screen flex-col bg-white text-[6.5pt] text-black`}>
      <ItemContent item={personal} className="flex justify-center">
        {personal => (
          <div className="absolute mt-10 flex flex-col bg-white px-16 py-10 text-center uppercase ring-1 ring-black">
            <div className="mb-1 text-2xl font-bold tracking-widest">
              {personal?.firstName} {personal?.lastName}
            </div>
            <div className="text-sm">{personal?.position}</div>
          </div>
        )}
      </ItemContent>
      <div className="flex h-full min-h-screen gap-x-7">
        <ColourElement colourElementRef={colourElementRef} className="w-2/6 pt-52 pr-7 pl-14">
          <ItemContent item={personal} heading="Details" className="mb-7 text-[8pt]">
            {personal => (
              <>
                {(personal?.city || personal?.country) && (
                  <div className="my-3">
                    <div className="mb-1 text-[6.5pt] font-bold uppercase">Address</div>
                    {personal?.city && <div>{personal.city}</div>}
                    {personal?.country && <div>{personal.country}</div>}
                  </div>
                )}
                {personal?.phone && (
                  <div className="my-3">
                    <div className="mb-1 text-[6.5pt] font-bold uppercase">Phone</div>
                    <div>{personal.phone}</div>
                  </div>
                )}
                {personal?.email && (
                  <div className="my-3">
                    <div className="mb-1 text-[6.5pt] font-bold uppercase">Email</div>
                    <div>
                      <a href={`mailto:${personal.email}`}>{personal.email}</a>
                    </div>
                  </div>
                )}
              </>
            )}
          </ItemContent>
          <ListContent items={skills} heading="Experience" className="mb-7 text-[8pt]">
            {skill => (
              <div key={skill.id} className="my-3 capitalize">
                {skill.name}
              </div>
            )}
          </ListContent>
          <ListContent items={strengths} heading="Strengths" className="mb-7 text-[8pt]">
            {strength => (
              <div key={strength.id} className="my-3 capitalize">
                {strength.name}
              </div>
            )}
          </ListContent>
        </ColourElement>
        <div className="w-4/6 bg-white pt-52 pr-14 pb-5">
          <ItemContent item={personal} heading="Profile" className="text-[8pt]">
            {personal => personal?.summary && <RichTextViewer value={personal.summary} />}
          </ItemContent>
          <ListContent items={employments} heading="Employment History" className="pt-5 text-[8pt]">
            {employment => {
              const histories = initialHistories
                ? initialHistories.filter(history => history.employmentId === employment.id)
                : (employment.history ?? [])
              return (
                <section key={employment.id}>
                  <p className="flex justify-between pt-4">
                    <span className="text-[9pt] font-bold">{employment.employer}</span>
                    {employment.city}
                  </p>
                  <ListContent items={histories}>
                    {history => (
                      <div key={history.id} className="pt-4 last-of-type:mb-0">
                        <p className="text-[9pt] font-bold">{history.title}</p>
                        <p>
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
          <ListContent items={educations} heading="Education" className="pt-5 text-[8pt]">
            {education => (
              <section key={education.id}>
                <p className="flex justify-between">
                  <span className="text-[9pt] font-bold capitalize">
                    {education.degree}, {education.school}
                  </span>
                  {education.city}
                </p>
                <p>
                  {getDisplayDate(education.startDate)}
                  {education.endDate && ` - ${getDisplayDate(education.endDate)}`}
                </p>
                {education.description && <RichTextViewer value={education.description} />}
              </section>
            )}
          </ListContent>
        </div>
      </div>
    </div>
  )
}
