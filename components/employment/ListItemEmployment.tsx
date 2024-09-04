'use client'

import { ItemComponentProps } from '@/types/hook'
import { EmploymentWithHistory, SectionEnums } from '@/types/section'
import { ExpandableWrapper } from '@/components/ui'
import { ListButton, ListDivider } from '@/components/ui/list'
import { SectionForm } from '../ui/form'
import HistorySection from './history/HistorySection'

export default function ListItemEmployment({
  item: employment,
  remove,
  setEditing,
  onSave,
  editing,
  deleting,
}: ItemComponentProps<EmploymentWithHistory>) {
  return (
    <>
      <span className="w-2/4 flex-none">{employment.employer}</span>
      {employment.city && <span>{employment.city}</span>}
      <span className="items-cente ml-auto flex font-medium">
        <ListButton type="edit" onClick={() => setEditing(!editing)} />
        <ListDivider />
        <ListButton type="delete" onClick={async () => remove(employment)} />
      </span>
      <ExpandableWrapper open={editing && !deleting}>
        <SectionForm sectionType={SectionEnums.employment} parentId={employment.resumeId} item={employment} onSave={onSave} />
      </ExpandableWrapper>

      <HistorySection employmentId={employment.id} histories={employment.history} />
    </>
  )
}
