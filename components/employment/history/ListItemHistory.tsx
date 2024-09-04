'use client'

import { EmploymentHistory } from '@prisma/client'
import { ItemComponentProps } from '@/types/hook'
import { SectionEnums } from '@/types/section'
import { ExpandableWrapper } from '@/components/ui'
import { SectionForm } from '@/components/ui/form'
import { ListButton, ListDivider } from '@/components/ui/list'
import { getDisplayDate } from '@/util/date'

export default function ListItemHistory({ item: history, remove, setEditing, onSave, editing, deleting }: ItemComponentProps<EmploymentHistory>) {
  return (
    <>
      <div className="flex-auto">
        <div>{history.title}</div>
        <div className="mt-1 text-xs">
          {getDisplayDate(history.startDate)}
          {history.endDate && ` to ${getDisplayDate(history.endDate)}`}
        </div>
      </div>
      <span className="ml-auto flex items-center justify-center font-medium">
        <ListButton type="edit" onClick={() => setEditing(!editing)} />
        <ListDivider />
        <ListButton type="delete" onClick={async () => remove(history)} />
      </span>
      <ExpandableWrapper open={editing && !deleting}>
        <SectionForm sectionType={SectionEnums.employmentHistory} parentId={history.employmentId} item={history} onSave={onSave} />
      </ExpandableWrapper>
    </>
  )
}
