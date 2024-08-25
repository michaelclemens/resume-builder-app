import { ResumeFull } from '@/lib/client/resume'
import { Roboto } from 'next/font/google'
import { Ref } from 'react'
import ColourElement from './util/ColourElement'
import ItemContent from './util/ItemContent'
import { FaEnvelope, FaMapMarkerAlt, FaMobileAlt } from 'react-icons/fa'
import ListContent from './util/ListContent'
import { Heading } from '@/util/template'
import { RenderHtml } from '../ui'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-roboto' })

export default function Modern({
  resume: { personal, employments, educations, skills, strengths, histories: initialHistories },
  colourElementRef,
}: {
  resume: ResumeFull
  colourElementRef?: Ref<HTMLDivElement>
}) {
  return (
    <div className={`${roboto.variable} flex h-full min-h-screen flex-col bg-white font-roboto text-[8pt] text-black`}>
      <div className="flex h-full min-h-screen gap-x-5">
        <ColourElement colourElementRef={colourElementRef} className="w-2/6 px-5 pb-2 pt-8 text-white">
          <ItemContent item={personal} heading="Contact" headingType={Heading.h3} className="mb-3 text-[9pt]">
            {personal => (
              <>
                {personal?.email && (
                  <div>
                    <a href={`mailto:${personal.email}`}>
                      <FaEnvelope className="mb-1 mr-2 inline" />
                      {personal.email}
                    </a>
                  </div>
                )}
                {personal?.phone && (
                  <div>
                    <FaMobileAlt className="mb-1 mr-2 inline" />
                    {personal.phone}
                  </div>
                )}
                {(personal?.city || personal?.country) && (
                  <div>
                    <FaMapMarkerAlt className="mb-1 mr-2 inline" />
                    {personal?.city}
                    {personal?.country && `, ${personal.country}`}
                  </div>
                )}
              </>
            )}
          </ItemContent>
          <ListContent items={skills} heading="Expertise" headingType={Heading.h3} className="mb-3 text-[9pt]">
            {skill => {
              const typeAndSkill = skill.name.split(':')
              return (
                <div key={skill.id} className="mb-1 border-b border-b-white/30 pb-1 capitalize last-of-type:border-b-0 last-of-type:pb-0">
                  <div className="font-semibold tracking-wide">{typeAndSkill[0]}</div>
                  <div>{typeAndSkill[1]}</div>
                </div>
              )
            }}
          </ListContent>
          <ListContent items={educations} heading="Education" headingType={Heading.h3} className="mb-3 text-[9pt]">
            {education => (
              <section key={education.id} className="mb-2 last-of-type:mb-0">
                <p className="capitalize">
                  {education.degree}, {education.school}
                  {education.city && `, ${education.city}`}
                </p>
                <p className="pt-1 text-[8pt] font-thin tracking-wide opacity-80">
                  {education.startDate.toDateString()}
                  {education.endDate && ` - ${education.endDate.toDateString()}`}
                </p>
              </section>
            )}
          </ListContent>
          <ListContent items={strengths} heading="Strengths" headingType={Heading.h3} className="text-[9pt]">
            {strength => (
              <div key={strength.id} className="pb-1 capitalize last-of-type:pb-0">
                {strength.name}
              </div>
            )}
          </ListContent>
        </ColourElement>
        <div className="w-4/6 bg-white pb-2 pr-5 pt-8">
          <ItemContent item={personal} className="mb-3">
            {personal => (
              <>
                <div className="mb-1 text-3xl font-semibold">
                  {personal?.firstName} {personal?.lastName}
                </div>
                <div className="text-[9pt] capitalize tracking-wide">{personal?.position}</div>
              </>
            )}
          </ItemContent>
          <ItemContent item={personal} heading="About" className="mb-3 text-[9pt]">
            {personal => (
              <>
                {personal?.summary && (
                  <div>
                    <RenderHtml html={personal.summary} />
                  </div>
                )}
              </>
            )}
          </ItemContent>
          <ListContent items={employments} heading="Experience" className="text-[9pt]">
            {employment => {
              const histories = initialHistories
                ? initialHistories.filter(history => history.employmentId === employment.id)
                : (employment.history ?? [])
              return (
                <div key={employment.id}>
                  <div className="flex font-semibold tracking-wide">
                    <div className="flex-grow">{employment.employer}</div>
                    {employment.city && <div>{employment.city}</div>}
                  </div>
                  <ListContent items={histories}>
                    {history => (
                      <section key={history.id} className="mt-1">
                        <p className="font-semibold tracking-wide">{history.title}</p>
                        <p className="pt-1 text-[8pt] font-thin tracking-wide opacity-70">
                          {history.startDate.toDateString()}
                          {history.endDate && ` - ${history.endDate.toDateString()}`}
                        </p>
                        {history.description && (
                          <div className="mt-1">
                            <RenderHtml html={history.description} />
                          </div>
                        )}
                      </section>
                    )}
                  </ListContent>
                </div>
              )
            }}
          </ListContent>
        </div>
      </div>
    </div>
  )
}
