import { Roboto } from 'next/font/google'
import { Ref } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaMobileAlt } from 'react-icons/fa'
import { ResumeFull } from '@/lib/client/resume'
import { getDisplayDate } from '@/util/date'
import { RenderHtml } from '../ui'
import ColourElement from './util/ColourElement'
import { TemplateHeading } from './util/Heading'
import ItemContent from './util/ItemContent'
import ListContent from './util/ListContent'

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
        <ColourElement colourElementRef={colourElementRef} className="w-2/6 pb-2 pl-5 pr-2 pt-5 text-white">
          <ItemContent item={personal} heading="Contact" headingType={TemplateHeading.h3} className="mb-3 text-[9.5pt]">
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
                    <FaMapMarkerAlt className="mr-2 inline" />
                    {personal?.city}
                    {personal?.country && `, ${personal.country}`}
                  </div>
                )}
              </>
            )}
          </ItemContent>
          <ListContent items={skills} heading="Expertise" headingType={TemplateHeading.h3} className="mb-3 text-[9.5pt]">
            {skill => (
              <div
                key={skill.id}
                className="mb-1 capitalize last-of-type:mb-0 [&>:first-of-type]:mr-1 [&>:first-of-type]:font-semibold [&>:first-of-type]:tracking-wide [&>:first-of-type]:text-orange-300 [&>:first-of-type]:after:content-[':']"
              >
                {skill.name.split(':').map(name => (
                  <div key={name}>{name.trim()}</div>
                ))}
              </div>
            )}
          </ListContent>
          <ListContent items={strengths} heading="Strengths" headingType={TemplateHeading.h3} className="mb-3 text-[9.5pt]">
            {strength => (
              <div key={strength.id} className="mb-1 capitalize last-of-type:mb-0">
                {strength.name}
              </div>
            )}
          </ListContent>
          <ListContent items={educations} heading="Education" headingType={TemplateHeading.h3} className="mb-3 text-[9.5pt]">
            {education => (
              <section key={education.id} className="mb-1 last-of-type:mb-0">
                <p className="capitalize">
                  {education.degree}, {education.school}
                  {education.city && `, ${education.city}`}
                </p>
                <p className="pt-1 text-[9pt] font-thin tracking-wide opacity-80">
                  {getDisplayDate(education.startDate)}
                  {education.endDate && ` - ${getDisplayDate(education.endDate)}`}
                </p>
              </section>
            )}
          </ListContent>
        </ColourElement>
        <div className="w-4/6 bg-white pb-2 pr-3 pt-5">
          <ItemContent item={personal} className="mb-3">
            {personal => (
              <>
                <div className="text-3xl font-semibold">
                  {personal?.firstName} {personal?.lastName}
                </div>
                <div className="text-[9pt] capitalize tracking-wide">{personal?.position}</div>
              </>
            )}
          </ItemContent>
          <ItemContent item={personal} heading="About" className="mb-2 text-[9.5pt]">
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
          <ListContent items={employments} heading="Experience" className="text-[9.5pt]">
            {employment => {
              const histories = initialHistories
                ? initialHistories.filter(history => history.employmentId === employment.id)
                : (employment.history ?? [])
              return (
                <section key={employment.id} className="mb-2 last-of-type:mb-0">
                  <div className="flex font-semibold tracking-wide">
                    <div className="flex-grow">{employment.employer}</div>
                    {employment.city && <div>{employment.city}</div>}
                  </div>
                  <ListContent items={histories}>
                    {history => (
                      <div key={history.id} className="mt-1">
                        <p className="font-semibold tracking-wide">{history.title}</p>
                        <p className="text-[9pt] font-thin tracking-wide opacity-70">
                          {getDisplayDate(history.startDate)}
                          {history.endDate && ` - ${getDisplayDate(history.endDate)}`}
                        </p>
                        {history.description && (
                          <div className="mt-1 [&_.ql-editor]:leading-[18px]">
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
        </div>
      </div>
    </div>
  )
}
