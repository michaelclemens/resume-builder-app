import { sortByOrder } from '@/util/sort'
import { Skill } from '@prisma/client'

export default function Experience({ skills }: { skills: Skill[] }) {
  if (!skills.length) return

  return (
    <section className="pt-5 text-[9.5pt]">
      <span className="bg-black px-2 py-1 text-[8pt] font-semibold uppercase tracking-widest text-white">Experience</span>
      <div className="mt-2 grid grid-cols-2">
        {skills.sort(sortByOrder).map(skill => (
          <div key={skill.id} className="my-1 capitalize">
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  )
}
