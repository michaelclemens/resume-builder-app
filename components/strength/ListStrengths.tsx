"use client"

import ListItemStrength from "./ListItemStrength";
import { sortByOrder } from "@/util/sort";
import { Strength } from "@prisma/client";
import { useStrength } from "@/hooks";
import { SortableVerticalList, SortableItem } from "@/components/list";

export default function ListStrengths({ initialStrengths }: { initialStrengths?: Strength[] }) {
    const { strengths, saveSortOrder } = useStrength(initialStrengths);

    if (!strengths.length) return <p>No Strengths</p>

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