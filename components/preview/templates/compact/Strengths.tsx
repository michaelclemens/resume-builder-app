import { sortByOrder } from '@/util/sort'
import { Strength } from '@prisma/client'

export default function StrengthList({ strengths }: { strengths: Strength[] }) {
  if (!strengths || !strengths.length) return

  return (
    <section className='mb-7 text-[8pt]'>
      <h3 className='font-oswald text-sm font-medium'>Strengths</h3>
      <ul>
        {strengths.sort(sortByOrder).map(strength => (
          <li key={strength.id} className='my-2 capitalize'>
            {strength.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
