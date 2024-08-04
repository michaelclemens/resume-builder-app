"use client"

import { deleteStrength, setSortOrders } from "@/lib/client/strength";
import { removeStrength, selectStrengthList, setStrengths } from "@/lib/redux/reducers/strength";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Strength } from "@prisma/client";
import { useEffect, useState } from "react";

export default function({ initialItems: initialStrengths }: { initialItems?: Strength[] } = {}) {
    const strengths = useAppSelector(selectStrengthList);
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (initialStrengths && !strengths) {
            console.log('setting strengths...');
            dispatch(setStrengths(initialStrengths));
        }
    }, [initialStrengths])

    const remove = async(strength: Strength) => {
        setDeleting(true);
        try {
            await deleteStrength(strength.id);
            dispatch(removeStrength(strength.id));
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    const saveSortOrder = async(strengths: Strength[]) => {
        dispatch(setStrengths(strengths));
        await setSortOrders(strengths);
    }

    return { items: strengths ? [...strengths] : [...initialStrengths ?? []], remove, saveSortOrder, setEditing, editing, deleting }
}