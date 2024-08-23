import { sortByOrder } from '@/util/sort'
import EmploymentHistoryList from './EmploymentHistoryList'
import { Employment, EmploymentHistory } from '@prisma/client'

export default function EmploymentList({
  employments,
  histories: initialHistories,
}: {
  employments: (Employment & { history?: EmploymentHistory[] })[]
  histories?: EmploymentHistory[]
}) {
  if (!employments || !employments.length) return

  return (
    <div className="pt-5 text-[8pt]">
      <h3 className="border-b border-black pb-1 font-bold uppercase tracking-[0.2em]">Employment History</h3>
      <div>
        {employments.sort(sortByOrder).map(employment => {
          const histories = initialHistories ? initialHistories.filter(history => history.employmentId === employment.id) : (employment.history ?? [])
          return (
            <div key={employment.id}>
              <p className="flex justify-between pt-4">
                <span className="text-[9pt] font-bold">{employment.employer}</span>
                {employment.city}
              </p>
              <EmploymentHistoryList histories={histories} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
