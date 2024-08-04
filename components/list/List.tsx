"use client"

import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { ItemComponentType, SortableItemType, UseListHookType } from "@/types/hook";

export default function List<ItemType extends SortableItemType>(
    { useListHook, itemComponent: Item, initialItems, parentId }:
    { useListHook: UseListHookType<ItemType>, itemComponent: ItemComponentType<ItemType>, initialItems: ItemType[], parentId?: string }
) {
    const { items, saveSortOrder } = useListHook({ initialItems, parentId });
    
    if (!items || !items.length) return <p>Empty</p>

    return (
        <SortableVerticalList items={items} onNewSortOrder={saveSortOrder}>
            {items.sort(sortByOrder).map((item) => (
                <SortableItem key={item.id} id={item.id}>
                    <Item {...item} />
                </SortableItem>
            ))}
        </SortableVerticalList>
    )
}