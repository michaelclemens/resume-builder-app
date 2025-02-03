import { Alexandria, Roboto } from 'next/font/google'
import { Ref } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaMobileAlt } from 'react-icons/fa'
import { ResumeFull } from '@/lib/client/resume'
import { getDisplayDate } from '@/util/date'
import RichTextViewer from '../ui/RichTextViewer'
import ColourElement from './util/ColourElement'
import { TemplateHeading } from './util/Heading'
import ItemContent from './util/ItemContent'
import ListContent from './util/ListContent'

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700'], subsets: ['latin'], display: 'swap', variable: '--font-roboto' })
const alexandria = Alexandria({ weight: ['400', '600'], subsets: ['latin'], display: 'swap', variable: '--font-alexandria' })

export default function Modern({
  resume: { personal, employments, educations, skills, strengths, histories: initialHistories },
  colourElementRef,
}: {
  resume: ResumeFull
  colourElementRef?: Ref<HTMLDivElement>
}) {
  return (
    <div
      className={`${roboto.variable} ${alexandria.variable} prose prose-sm prose-h2:mb-1 prose-h2:mt-2 prose-h3:mt-2 prose-h3:text-[12.5pt] prose-h4:mt-1 prose-h4:text-[10.5pt] prose-a:font-normal prose-a:text-inherit prose-a:no-underline flex h-full min-h-screen w-full max-w-none gap-x-6 overflow-hidden bg-white text-[9.5pt] text-pretty text-black`}
    >
      <ColourElement colourElementRef={colourElementRef} className="z-10 w-2/6 pt-5 pr-3 pb-2 pl-5 text-white">
        <ItemContent item={personal} className="mb-3 leading-6">
          {personal => (
            <>
              {personal?.email && (
                <a href={`mailto:${personal.email}`}>
                  <FaEnvelope className="mr-2 mb-1 inline" />
                  {personal.email}
                </a>
              )}
              {personal?.phone && (
                <div>
                  <FaMobileAlt className="mr-2 mb-1 inline" />
                  {personal.phone}
                </div>
              )}
              {(personal?.city || personal?.country) && (
                <div>
                  <FaMapMarkerAlt className="mr-2 mb-1 inline" />
                  {personal?.city}
                  {personal?.country && `, ${personal.country}`}
                </div>
              )}
            </>
          )}
        </ItemContent>
        <ListContent items={skills} heading="Technical Expertise" headingType={TemplateHeading.h3} className="mb-3 leading-7">
          {skill => {
            const skillName = skill.name.split(':')
            return (
              <fieldset key={skill.id} className="-mr-1 mb-1 -ml-3 rounded-md border border-slate-300/20 px-2 py-1.5">
                <legend className="px-1.5 text-[11pt] font-semibold tracking-wider">{skillName[0]}</legend>
                <div className="-mt-2 font-medium tracking-wide">{skillName[1]}</div>
              </fieldset>
            )
          }}
        </ListContent>
        <ListContent items={strengths} heading="Strengths" headingType={TemplateHeading.h3} className="mb-3 leading-6">
          {strength => (
            <li key={strength.id} className="-ml-2 last-of-type:mb-0">
              {strength.name}
            </li>
          )}
        </ListContent>
        <ListContent items={educations} heading="Education" headingType={TemplateHeading.h3} className="print:pt-10">
          {education => (
            <section key={education.id} className="mb-1 last-of-type:mb-0">
              <p className="capitalize">
                {education.degree}, {education.school}
                {education.city && `, ${education.city}`}
                <span className="mt-1 block text-[8pt] tracking-wider uppercase opacity-70">
                  {getDisplayDate(education.startDate)}
                  {education.endDate && ` - ${getDisplayDate(education.endDate)}`}
                </span>
              </p>
            </section>
          )}
        </ListContent>
      </ColourElement>
      <div className="prose-ul:-ml-2 w-4/6 bg-white pr-6 pb-2 text-pretty">
        <ItemContent item={personal} className="-mr-8 -ml-8 border-b border-b-slate-200/80 bg-slate-50/90 pt-3 pb-2 text-center">
          {personal => (
            <div className="font-alexandria tracking-wider text-[#082A4D]">
              <div className="text-3xl font-semibold uppercase">
                {personal?.firstName} {personal?.lastName}
              </div>
              <div className="text-lg capitalize">{personal?.position}</div>
            </div>
          )}
        </ItemContent>
        <ItemContent item={personal} heading="Profile">
          {personal => personal?.summary && <RichTextViewer value={personal.summary} />}
        </ItemContent>
        <ListContent items={employments} heading="Professional Experience">
          {employment => {
            const histories = initialHistories
              ? initialHistories.filter(history => history.employmentId === employment.id)
              : (employment.history ?? [])
            return (
              <div key={employment.id}>
                <h3 className="flex items-center font-semibold tracking-wide">
                  <div className="flex-grow">{employment.employer}</div>
                  {employment.city && <div>{employment.city}</div>}
                </h3>
                <ListContent items={histories}>
                  {history => (
                    <section key={history.id}>
                      <h4 className="mb-0 flex items-center tracking-wide">
                        <div className="flex-grow">{history.title}</div>
                        <div className="text-[8.5pt] text-gray-500 uppercase">
                          {getDisplayDate(history.startDate)}
                          {history.endDate && ` - ${getDisplayDate(history.endDate)}`}
                        </div>
                      </h4>

                      {history.description && <RichTextViewer value={history.description} />}
                    </section>
                  )}
                </ListContent>
              </div>
            )
          }}
        </ListContent>
      </div>
    </div>
  )
}
