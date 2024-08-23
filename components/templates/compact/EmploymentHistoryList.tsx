import { RenderHtml } from '@/components/ui'
import { sortByOrder } from '@/util/sort'
import { EmploymentHistory } from '@prisma/client'

export default function EmploymentHistoryList({ histories }: { histories: EmploymentHistory[] }) {
  if (!histories || !histories.length) return

  return (
    <div>
      {histories.sort(sortByOrder).map(history => (
        <section key={history.id} className="pt-4 last-of-type:mb-0">
          <p className="text-[10pt] font-bold">{history.title}</p>
          <p className="pt-1 text-[7.5pt] font-thin uppercase tracking-wider text-gray-400">
            {history.startDate.toDateString()}
            {history.endDate && ` - ${history.endDate.toDateString()}`}
          </p>
          {history.description && (
            <div className="mt-2">
              <RenderHtml html={history.description} />
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
