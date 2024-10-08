'use client'

import { Skill } from '@prisma/client'
import { ItemComponentProps } from '@/types/hook'
import { SectionEnums } from '@/types/section'
import { ExpandableWrapper } from '@/components/ui'
import { ListButton, ListDivider } from '@/components/ui/list'
import { SectionForm } from '../ui/form'

export default function ListItemSkill({ item: skill, remove, setEditing, onSave, editing, deleting }: ItemComponentProps<Skill>) {
  return (
    <>
      <span className="w-3/4 flex-none">{skill.name}</span>
      <span className="ml-auto flex font-medium">
        <ListButton type="edit" onClick={() => setEditing(!editing)} />
        <ListDivider />
        <ListButton type="delete" onClick={async () => remove(skill)} />
      </span>
      <ExpandableWrapper open={editing && !deleting}>
        <SectionForm sectionType={SectionEnums.skill} parentId={skill.resumeId} item={skill} onSave={onSave} />
      </ExpandableWrapper>
    </>
  )
}
