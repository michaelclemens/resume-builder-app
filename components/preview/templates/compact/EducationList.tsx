import { RenderHtml } from '@/components/ui'
import { sortByOrder } from '@/util/sort'
import { Education } from '@prisma/client'

export default function EducationList({ educations }: { educations: Education[] }) {
  if (!educations || !educations.length) return

  return (
    <div className="pt-5 text-[9pt]">
      <h3 className="font-oswald text-xl font-medium">Education</h3>
      <div>
        {educations.sort(sortByOrder).map(education => (
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
        ))}
      </div>
    </div>
  )
}
