"use client"

import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem } from "@/components/list";
import SectionListItem from "./SectionListItem";
import { useSectionList } from "@/hooks";
import { ListSectionType, ListItemType } from "@/types/section";

export const defaultEmptyMessage = 'Empty';

export default function SectionList<Name extends ListSectionType>(
    { sectionType, initialItems, parentId, parentProperty, emptyText = defaultEmptyMessage }: 
    { sectionType: Name, initialItems: ListItemType[]|null, parentId?: string, parentProperty?: string, emptyText?: string }
) {
    const { items, saveSortOrder } = useSectionList(sectionType, { initialItems, parentId, parentProperty });
    
    if (!items || !items.length) return <p>{emptyText}</p>

    return (
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
    )
}