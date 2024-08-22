'use client'

import { sortByOrder } from '@/util/sort'
import { SortableVerticalList, SortableItem } from '@/components/ui/list'
import SectionListItem from './SectionListItem'
import { useSectionList } from '@/hooks'
import { ListSectionType, ListItemType } from '@/types/section'

export const defaultEmptyMessage = 'Empty'

export default function SectionList({
  sectionType,
  initialItems,
  parentId,
  parentProperty,
  emptyText = defaultEmptyMessage,
}: {
  sectionType: ListSectionType
  initialItems: ListItemType[] | null
  parentId?: string
  parentProperty?: string
  emptyText?: string
}) {
  const { items, saveSortOrder } = useSectionList(sectionType, { initialItems, parentId, parentProperty })

  if (!items || !items.length) return <p>{emptyText}</p>

  return (
    <div className="mx-1 mb-1 mt-2 divide-y divide-slate-300/60 rounded-lg text-white shadow-md ring-1 ring-slate-300/60 backdrop-blur-sm dark:divide-slate-400/20 dark:ring-slate-400/20">
      <SortableVerticalList items={items} onNewSortOrder={saveSortOrder}>
        {items.sort(sortByOrder).map(item => (
          <SortableItem key={item.id} id={item.id}>
            <SectionListItem sectionType={sectionType} item={item} parentId={parentId} parentProperty={parentProperty} />
          </SortableItem>
        ))}
      </SortableVerticalList>
    </div>
  )
}
