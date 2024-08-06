"use client"

import { deleteEmployment, EmploymentWithHistory, setSortOrders } from "@/lib/client/employment";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect, useState } from "react";

export default function({ initialItems: initialEmployments }: { initialItems?: EmploymentWithHistory[] } = {}) {
    const { actions, selectors } = getSection(SectionEnums.employment);
    const employments = useAppSelector(selectors.selectItems);
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (initialEmployments && !employments) {
            console.log('setting employments...');
            dispatch(actions.setItems(initialEmployments));
        }
    }, [initialEmployments])

    const remove = async(employment: EmploymentWithHistory) => {
        setDeleting(true);
        try {
            await deleteEmployment(employment.id);
            dispatch(actions.removeItem(employment.id));
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    const saveSortOrder = async(employments: EmploymentWithHistory[]) => {
        dispatch(actions.setItems(employments));
        await setSortOrders(employments);
    }

    return { items: employments ? [...employments] : [...initialEmployments ?? []], remove, saveSortOrder, setEditing, editing, deleting }
}