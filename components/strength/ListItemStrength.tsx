'use client'

import { Strength } from '@prisma/client'
import { ListButton, ListDivider } from '@/components/ui/list'
import { ExpandableWrapper } from '@/components/ui'
import { ButtonType } from '@/types/list'
import { SectionForm } from '@/components/ui/form'
import { ItemComponentProps } from '@/types/hook'
import { SectionEnums } from '@/types/section'

export default function ListItemStrength({ item: strength, remove, setEditing, onSave, editing, deleting }: ItemComponentProps<Strength>) {
  return (
    <>
      <span className='w-3/4 flex-none'>{strength.name}</span>
      <span className='ml-auto flex font-medium'>
        <ListButton type={ButtonType.edit} onClick={() => setEditing(!editing)} />
        <ListDivider />
        <ListButton type={ButtonType.delete} onClick={async () => remove(strength)} />
      </span>
      <ExpandableWrapper open={editing && !deleting}>
        <SectionForm sectionType={SectionEnums.strength} parentId={strength.resumeId} item={strength} onSave={onSave} />
      </ExpandableWrapper>
    </>
  )
}
