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
  if (!employments.length) return

  return (
    <div className="pt-5 text-[9pt]">
      <h3 className="font-oswald text-xl font-medium">Employment History</h3>
      <div>
        {employments.sort(sortByOrder).map(employment => {
          const histories = initialHistories ? initialHistories.filter(history => history.employmentId === employment.id) : (employment.history ?? [])
          return (
            <div key={employment.id}>
              <p className="pt-2 text-[10pt] font-bold">
                {employment.employer}
                {employment.city && `, ${employment.city}`}
              </p>
              <EmploymentHistoryList histories={histories} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
