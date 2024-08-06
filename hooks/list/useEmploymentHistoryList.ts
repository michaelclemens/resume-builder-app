"use client"

import { deleteEmploymentHistory, setSortOrders } from "@/lib/client/employmentHistory";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { EmploymentHistory } from "@prisma/client";
import { useState } from "react";

export default function({ parentId: employmentId, initialItems: initialHistories }: { parentId?: string, initialItems?: EmploymentHistory[] } = {}) {
    const { actions, selectors } = getSection(SectionEnums.employment);
    const { history } = employmentId ? useAppSelector(state => selectors.selectItemById(state, employmentId)) ?? { history: null } : { history: null };
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const remove = async(history: EmploymentHistory) => {
        setDeleting(true);
        try {
            await deleteEmploymentHistory(history.id);
            dispatch(actions.removeSiblingItem({ id: history.id, employmentId: history.employmentId}))
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    const saveSortOrder = async(items: EmploymentHistory[]) => {
        dispatch(actions.setSiblingItems({ employmentId, items }));
        await setSortOrders(items);
    }

    return { items: history ? [...history] : [...initialHistories ?? []], remove, saveSortOrder, setEditing, editing, deleting }
}