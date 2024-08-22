import { sortByOrder } from '@/util/sort'
import { Skill } from '@prisma/client'

export default function Experience({ skills }: { skills: Skill[] }) {
  if (!skills || !skills.length) return

  return (
    <section className="mb-7 text-[8pt]">
      <h3 className="font-oswald text-sm font-medium">Experience</h3>
      <ul>
        {skills.sort(sortByOrder).map(skill => (
          <li key={skill.id} className="my-2 capitalize">
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
