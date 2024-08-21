import { sortByOrder } from '@/util/sort'
import { Skill } from '@prisma/client'

export default function Experience({ skills }: { skills: Skill[] }) {
  if (!skills || !skills.length) return

  return (
    <section className='mb-7 text-[8pt]'>
      <h3 className='border-b border-black pb-1 font-bold uppercase tracking-[0.2em]'>Experience</h3>
      <ul>
        {skills.sort(sortByOrder).map(skill => (
          <li key={skill.id} className='my-3 capitalize'>
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
