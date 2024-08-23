import { RenderHtml } from '@/components/ui'
import { sortByOrder } from '@/util/sort'
import { Education } from '@prisma/client'

export default function EducationList({ educations }: { educations: Education[] }) {
  if (!educations || !educations.length) return

  return (
    <div className="pt-5 text-[8pt]">
      <h3 className="mb-3 border-b border-black pb-1 font-bold uppercase tracking-[0.2em]">Education</h3>
      <div>
        {educations.sort(sortByOrder).map(education => (
          <section key={education.id} className="pt-4 first-of-type:pt-0">
            <p className="flex justify-between">
              <span className="text-[9pt] font-bold capitalize">
                {education.degree}, {education.school}
              </span>
              {education.city}
            </p>
            <p>
              {education.startDate.toDateString()}
              {education.endDate && ` - ${education.endDate.toDateString()}`}
            </p>
            {education.description && (
              <div className="mt-2">
                <RenderHtml html={education.description} />
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}