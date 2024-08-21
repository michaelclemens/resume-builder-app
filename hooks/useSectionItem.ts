"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { SingleItemSectionType, SingleItemType } from "@/types/section";
import { getSection } from "@/util/section";
import { useEffect } from "react";

export default function useSectionItem(sectionType: SingleItemSectionType, { initialItem }: { initialItem?: SingleItemType|null } = {}) {
    const { state } = getSection(sectionType);
    const item = useAppSelector(state.selectors.selectItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initialItem && !item) {
            console.log(`setting ${sectionType}...`);
            dispatch(state.actions.setItem(initialItem));
        }
    }, [dispatch, initialItem, item, sectionType, state.actions])

    return { item: item ?? initialItem ?? null }
}