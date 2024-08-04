"use client"

import { deleteEmployment, EmploymentWithHistory, setSortOrders } from "@/lib/client/employment";
import { removeEmployment, selectEmploymentList, setEmployments } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect } from "react";

export default function({ initialItems: initialEmployments }: { initialItems?: EmploymentWithHistory[] } = {}) {
    const employments = useAppSelector(selectEmploymentList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initialEmployments && !employments) {
            console.log('setting employments...');
            dispatch(setEmployments(initialEmployments));
        }
    }, [initialEmployments])

    const remove = async(employment: EmploymentWithHistory) => {
        await deleteEmployment(employment.id);
        dispatch(removeEmployment(employment.id));
    }

    const saveSortOrder = async(employments: EmploymentWithHistory[]) => {
        dispatch(setEmployments(employments));
        await setSortOrders(employments);
    }

    return { items: employments ? [...employments] : [...initialEmployments ?? []], remove, saveSortOrder }
}