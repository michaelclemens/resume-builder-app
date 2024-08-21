'use client'

import { Education } from '@prisma/client'
import { ListButton, ListDivider } from '@/components/ui/list'
import { getDisplayDateFromDate } from '@/util/date'
import { ExpandableWrapper } from '@/components/ui'
import { SectionForm } from '../ui/form'
import { ItemComponentProps } from '@/types/hook'
import { SectionEnums } from '@/types/section'

export default function ListItemEducation({ item: education, remove, setEditing, onSave, editing, deleting }: ItemComponentProps<Education>) {
  return (
    <>
      <div className='flex-auto'>
        <div>
          {education.degree} - {education.school}
        </div>
        <div className='mt-1 text-xs'>
          {getDisplayDateFromDate(education.startDate)}
          {education.endDate && ` to ${getDisplayDateFromDate(education.endDate)}`}
        </div>
      </div>
      <span className='items-cente ml-auto flex font-medium'>
        <ListButton type='edit' onClick={() => setEditing(!editing)} />
        <ListDivider />
        <ListButton type='delete' onClick={async () => remove(education)} />
      </span>
      <ExpandableWrapper open={editing && !deleting}>
        <SectionForm sectionType={SectionEnums.education} parentId={education.resumeId} item={education} onSave={onSave} />
      </ExpandableWrapper>
    </>
  )
}
