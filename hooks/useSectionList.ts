"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ListItemType, ListSectionType } from "@/types/section";
import { getSection } from "@/util/section";
import { useEffect, useState } from "react";

export default function<ItemType extends ListItemType>(
    sectionType: ListSectionType, 
    { initialItems = null, parentId, parentProperty }: { initialItems?: ItemType[]|null, parentId?: string, parentProperty?: string } = {}
) {
    const { state, client } = getSection(sectionType);
    const items = useAppSelector((rootState) => state.selectors.selectItems(rootState, { parentId, parentProperty })) as ItemType[]|null;
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (initialItems && !items) {
            console.log(`setting ${sectionType}...`);
            dispatch(state.actions.setItems({ items: initialItems, parentId, parentProperty }));
        }
    }, [initialItems])
    
    const remove = async(item: ItemType) => {
        setDeleting(true);
        try {
            await client.deleteItem(item.id);
            dispatch(state.actions.removeItem(item));
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    const saveSortOrder = async(items: ItemType[]) => {
        dispatch(state.actions.setItems({ items, parentId, parentProperty }));
        await client.setSortOrders(items);
    }

    return { 
        items: items ? [...items] : [...initialItems ?? []], 
        remove, 
        saveSortOrder, 
        setEditing, 
        editing, 
        deleting
    }
}