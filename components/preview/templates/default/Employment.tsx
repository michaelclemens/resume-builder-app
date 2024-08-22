import { sortByOrder } from '@/util/sort'
import EmploymentHistory from './EmploymentHistory'
import { EmploymentWithHistory } from '@/types/section'

export default function EmploymentList({ employments }: { employments: EmploymentWithHistory[] }) {
  if (!employments || !employments.length) return

  return (
    <div className="pt-5 text-[8pt]">
      <h3 className="border-b border-black pb-1 font-bold uppercase tracking-[0.2em]">Employment History</h3>
      <div>
        {employments.sort(sortByOrder).map(employment => (
          <div key={employment.id}>
            <p className="flex justify-between pt-4">
              <span className="text-[9pt] font-bold">{employment.employer}</span>
              {employment.city}
            </p>
            <EmploymentHistory histories={employment.history} />
          </div>
        ))}
      </div>
    </div>
  )
}
