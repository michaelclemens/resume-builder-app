"use client"

import ListItemStrength from "./ListItemStrength";
import { sortByOrder } from "@/util/sort";
import { useStrengthList } from "@/hooks";
import { SortableVerticalList, SortableItem } from "@/components/list";
import Loading from "@/app/loading";
import { useEffect } from "react";

export default function ListStrengths({ resumeId }: { resumeId: string }) {
    const { strengths, loading, fetch, saveSortOrder } = useStrengthList();

    useEffect(() => { fetch(resumeId) }, [resumeId]);

    if (loading) return <Loading/>
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