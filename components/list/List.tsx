"use client"

import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem, ListItem } from "@/components/list";
import { ItemComponentType, SortableItemType, UseListHookType } from "@/types/hook";

export const defaultEmptyMessage = 'Empty';

export default function List<ItemType extends SortableItemType>(
    { useListHook, itemComponent, initialItems, parentId, emptyText = defaultEmptyMessage }:
    { useListHook: UseListHookType<ItemType>, itemComponent: ItemComponentType<ItemType>, initialItems: ItemType[], parentId?: string, emptyText?: string }
) {
    const { items, saveSortOrder } = useListHook({ initialItems, parentId });
    
    if (!items || !items.length) return <p>{emptyText}</p>

    return (
        <SortableVerticalList items={items} onNewSortOrder={saveSortOrder}>
            {items.sort(sortByOrder).map((item) => (
                <SortableItem key={item.id} id={item.id}>
                    <ListItem<ItemType>
                        item={item}
                        useListHook={useListHook}
                        itemComponent={itemComponent}
                        parentId={parentId}
                    />
                </SortableItem>
            ))}
        </SortableVerticalList>
    )
}