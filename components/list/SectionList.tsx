"use client"

import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { SortableItemType } from "@/types/hook";
import SectionListItem from "./SectionListItem";
import { useSectionList } from "@/hooks";
import { SectionType } from "@/types/section";

export const defaultEmptyMessage = 'Empty';

export default function SectionList<ItemType extends SortableItemType>(
    { sectionType, initialItems, parentId, emptyText = defaultEmptyMessage }:
    { sectionType: SectionType, initialItems: ItemType[], parentId?: string, emptyText?: string }
) {
    const { items, saveSortOrder } = useSectionList(sectionType, { initialItems, parentId });
    
    if (!items || !items.length) return <p>{emptyText}</p>

    return (
        <SortableVerticalList items={items} onNewSortOrder={saveSortOrder}>
            {items.sort(sortByOrder).map((item) => (
                <SortableItem key={item.id} id={item.id}>
                    <SectionListItem<ItemType>
                        sectionType={sectionType}
                        item={item}
                        parentId={parentId}
                    />
                </SortableItem>
            ))}
        </SortableVerticalList>
    )
}