import { Alexandria, Roboto } from 'next/font/google'
import { Ref } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaMobileAlt } from 'react-icons/fa'
import { ResumeFull } from '@/lib/client/resume'
import { getDisplayDate } from '@/util/date'
import { RenderHtml } from '../ui'
import ColourElement from './util/ColourElement'
import { TemplateHeading } from './util/Heading'
import ItemContent from './util/ItemContent'
import ListContent from './util/ListContent'

const roboto = Roboto({ weight: ['100', '300', '400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-roboto' })
const alexandria = Alexandria({ subsets: ['latin'], display: 'swap', variable: '--font-alexandria' })

export default function Modern({
  resume: { personal, employments, educations, skills, strengths, histories: initialHistories },
  colourElementRef,
}: {
  resume: ResumeFull
  colourElementRef?: Ref<HTMLDivElement>
}) {
  return (
    <div className={`${roboto.variable} ${alexandria.variable} flex h-full min-h-screen flex-col bg-white font-roboto text-[9.5pt] text-black`}>
      <div className="flex h-full min-h-screen gap-x-6">
        <ColourElement colourElementRef={colourElementRef} className="z-10 w-2/6 pb-2 pl-5 pr-3 pt-5 text-white">
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
            {skill => {
              const skillName = skill.name.split(':')
              return (
                <fieldset key={skill.id} className="-ml-2 mb-1 rounded-md border border-slate-300/20 px-2 py-2">
                  <legend className="px-1 text-[10pt] font-semibold tracking-wider">{skillName[0]}</legend>
                  <div className="-mt-2 tracking-wide">{skillName[1]}</div>
                </fieldset>
              )
            }}
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
                <p className="text-[7.5pt] uppercase tracking-wider opacity-70">
                  {getDisplayDate(education.startDate)}
                  {education.endDate && ` - ${getDisplayDate(education.endDate)}`}
                </p>
              </section>
            )}
          </ListContent>
        </ColourElement>
        <div className="w-4/6 bg-white pb-2 pr-6">
          <ItemContent item={personal} className="-ml-5 -mr-6 border-b border-slate-300/20 bg-blue-950/5 pb-3 pt-5 text-center">
            {personal => (
              <div className="font-alexandria tracking-wider text-[#082A4D]">
                <div className="text-3xl font-semibold uppercase">
                  {personal?.firstName} {personal?.lastName}
                </div>
                <div className="text-lg capitalize">{personal?.position}</div>
              </div>
            )}
          </ItemContent>
          <ItemContent item={personal} heading="About" className="pt-3 text-[9.5pt]">
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
          <ListContent items={employments} heading="Experience" className="pt-2 text-[9.5pt]">
            {employment => {
              const histories = initialHistories
                ? initialHistories.filter(history => history.employmentId === employment.id)
                : (employment.history ?? [])
              return (
                <section key={employment.id} className="pt-2 first-of-type:pt-0">
                  <div className="flex pt-1 text-[10pt] font-semibold tracking-wide">
                    <div className="flex-grow">{employment.employer}</div>
                    {employment.city && <div>{employment.city}</div>}
                  </div>
                  <ListContent items={histories}>
                    {history => (
                      <div key={history.id}>
                        <div className="flex pt-1 tracking-wide">
                          <div className="flex-grow font-semibold">{history.title}</div>
                          <div className="text-[7.5pt] uppercase tracking-wider text-gray-400">
                            {getDisplayDate(history.startDate)}
                            {history.endDate && ` - ${getDisplayDate(history.endDate)}`}
                          </div>
                        </div>

                        {history.description && (
                          <div className="mt-1 [&_.ql-editor]:leading-[18px] [&_.ql-editor_li:before]:pr-1 [&_.ql-editor_li:last-of-type]:mb-0 [&_.ql-editor_li]:mb-[5px]">
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
