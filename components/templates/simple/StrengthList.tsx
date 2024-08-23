import { sortByOrder } from '@/util/sort'
import { Strength } from '@prisma/client'

export default function StrengthList({ strengths }: { strengths: Strength[] }) {
  if (!strengths || !strengths.length) return

  return (
    <section className="pt-5 text-[9.5pt]">
      <span className="bg-black px-2 py-1 text-[8pt] font-semibold uppercase tracking-widest text-white">Strengths</span>
      <div className="mt-2 grid grid-cols-2">
        {strengths.sort(sortByOrder).map(strength => (
          <div key={strength.id} className="my-1 capitalize">
            {strength.name}
          </div>
        ))}
      </div>
    </section>
  )
}
