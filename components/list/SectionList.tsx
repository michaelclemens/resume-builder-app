"use client"

import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem } from "@/components/list";
import SectionListItem from "./SectionListItem";
import { useSectionList } from "@/hooks";
import { ListSectionType, ListItemType } from "@/types/section";

export const defaultEmptyMessage = 'Empty';

export default function SectionList(
    { sectionType, initialItems, parentId, parentProperty, emptyText = defaultEmptyMessage }: 
    { sectionType: ListSectionType, initialItems: ListItemType[]|null, parentId?: string, parentProperty?: string, emptyText?: string }
) {
    const { items, saveSortOrder } = useSectionList(sectionType, { initialItems, parentId, parentProperty });
    
    if (!items || !items.length) return <p>{emptyText}</p>

    return (
        <div className="rounded-lg bg-white mx-1 mt-2 mb-1 text-gray-700 divide-y divide-slate-400/20 ring-1 ring-slate-700/10 dark:bg-slate-800 dark:text-white">
            <SortableVerticalList items={items} onNewSortOrder={saveSortOrder}>
                {items.sort(sortByOrder).map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                        <SectionListItem
                            sectionType={sectionType}
                            item={item}
                            parentId={parentId}
                            parentProperty={parentProperty}
                        />
                    </SortableItem>
                ))}
            </SortableVerticalList>
        </div>
    )
}