import { useSectionList } from '@/hooks'
import { Suspense } from 'react'
import { ListItemType, ListSectionType } from '@/types/section'
import Loading from '@/components/ui/Loading'
import { getSectionListItemComponent } from '@/util/list'

export default function SectionListItem({
  sectionType,
  item,
  parentId,
  parentProperty,
}: {
  sectionType: ListSectionType
  item: ListItemType
  parentId?: string
  parentProperty?: keyof ListItemType
}) {
  const { remove, setEditing, editing, deleting } = useSectionList(sectionType, { parentId, parentProperty })
  const ListItemComponent = getSectionListItemComponent(sectionType)
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ListItemComponent
          item={item}
          remove={remove}
          setEditing={setEditing}
          onSave={() => setEditing(false)}
          editing={editing}
          deleting={deleting}
        />
      </Suspense>
      {deleting && <Loading />}
    </>
  )
}
