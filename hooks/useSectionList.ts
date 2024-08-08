"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ListItemTypes, ListSectionType } from "@/types/section";
import { getSection } from "@/util/section";
import { useEffect, useState } from "react";

export default function<ItemType extends ListItemTypes, Name extends ListSectionType>(
    sectionType: Name, 
    { initialItems = null, parentId }: { initialItems?: ItemType[]|null, parentId?: string } = {}
) {
    const { state, client } = getSection(sectionType);
    const items = useAppSelector((rootState) => state.selectors.selectItems(rootState, { parentId }));
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (initialItems && !items) {
            console.log(`setting ${sectionType}...`);
            dispatch(state.actions.setItems({ items: initialItems, parentId }));
        }
    }, [initialItems])
    
    const remove = async(item: ItemType) => {
        setDeleting(true);
        try {
            await client.deleteItem(item.id);
            dispatch(state.actions.removeItem({ id: item.id, parentId }));
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    const saveSortOrder = async(items: ItemType[]) => {
        dispatch(state.actions.setItems({ items, parentId }));
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