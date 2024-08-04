"use client"

import { deleteStrength, setSortOrders } from "@/lib/client/strength";
import { removeStrength, selectStrengthList, setStrengths } from "@/lib/redux/reducers/strength";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Strength } from "@prisma/client";
import { useEffect } from "react";

export default function({ initialItems: initialStrengths }: { initialItems?: Strength[] } = {}) {
    const strengths = useAppSelector(selectStrengthList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initialStrengths && !strengths) {
            console.log('setting strengths...');
            dispatch(setStrengths(initialStrengths));
        }
    }, [initialStrengths])

    const remove = async(strength: Strength) => {
        await deleteStrength(strength.id);
        dispatch(removeStrength(strength.id));
    }

    const saveSortOrder = async(strengths: Strength[]) => {
        dispatch(setStrengths(strengths));
        await setSortOrders(strengths);
    }

    return { items: strengths ? [...strengths] : [...initialStrengths ?? []], remove, saveSortOrder }
}