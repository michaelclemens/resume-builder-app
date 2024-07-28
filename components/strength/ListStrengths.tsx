"use client"

import ListItemStrength from "./ListItemStrength";
import { sortByOrder } from "@/util/sort";
import { useStrengthList } from "@/hooks/list";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { Strength } from "@prisma/client";

export default function ListStrengths({ strengths: initialStrengths }: { strengths: Strength[] }) {
    const { strengths, saveSortOrder } = useStrengthList(initialStrengths);

    if (!strengths || !strengths.length) return <p>No Strengths</p>

    return (
        <SortableVerticalList items={strengths} onNewSortOrder={saveSortOrder}>
            {strengths.sort(sortByOrder).map((strength) => (
                <SortableItem key={strength.id} id={strength.id}>
                    <ListItemStrength {...strength} />
                </SortableItem>
            ))}
        </SortableVerticalList>
    )
}