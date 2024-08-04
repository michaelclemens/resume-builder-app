"use client"

import { deleteEmploymentHistory, setSortOrders } from "@/lib/client/employmentHistory";
import { removeEmploymentHistory, selectEmploymentById, setEmploymentHistories } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { EmploymentHistory } from "@prisma/client";

export default function({ parentId: employmentId, initialItems: initialHistories }: { parentId?: string, initialItems?: EmploymentHistory[] }) {
    const { history } = employmentId ? useAppSelector(state => selectEmploymentById(state, employmentId)) ?? { history: null } : { history: null };
    const dispatch = useAppDispatch();

    const remove = async(history: EmploymentHistory) => {
        await deleteEmploymentHistory(history.id);
        dispatch(removeEmploymentHistory({ id: history.id, employmentId: history.employmentId}))
    }

    const saveSortOrder = async(items: EmploymentHistory[]) => {
        dispatch(setEmploymentHistories({ employmentId, items }));
        await setSortOrders(items);
    }

    return { items: history ? [...history] : [...initialHistories ?? []], remove, saveSortOrder }
}