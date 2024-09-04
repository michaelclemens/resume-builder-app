'use client'

import { Education } from '@prisma/client'
import { ItemComponentProps } from '@/types/hook'
import { SectionEnums } from '@/types/section'
import { ExpandableWrapper } from '@/components/ui'
import { ListButton, ListDivider } from '@/components/ui/list'
import { getDisplayDate } from '@/util/date'
import { SectionForm } from '../ui/form'

export default function ListItemEducation({ item: education, remove, setEditing, onSave, editing, deleting }: ItemComponentProps<Education>) {
  return (
    <>
      <div className="flex-auto">
        <div>
          {education.degree} - {education.school}
        </div>
        <div className="mt-1 text-xs">
          {getDisplayDate(education.startDate)}
          {education.endDate && ` to ${getDisplayDate(education.endDate)}`}
        </div>
      </div>
      <span className="items-cente ml-auto flex font-medium">
        <ListButton type="edit" onClick={() => setEditing(!editing)} />
        <ListDivider />
        <ListButton type="delete" onClick={async () => remove(education)} />
      </span>
      <ExpandableWrapper open={editing && !deleting}>
        <SectionForm sectionType={SectionEnums.education} parentId={education.resumeId} item={education} onSave={onSave} />
      </ExpandableWrapper>
    </>
  )
}
