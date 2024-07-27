"use client"

import ListItemEmployment from "./ListItemEmployment";
import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { useEmploymentList } from "@/hooks";
import { useEffect } from "react";
import Loading from "@/app/loading";

export default function ListEmployments({ resumeId }: { resumeId: string }) {
    const { employments, loading, fetch, saveSortOrder } = useEmploymentList();

    useEffect(() => { fetch(resumeId) }, [resumeId]);
    
    if (loading) return <Loading/>
    if (!employments || !employments.length) return <p>No Employments</p>

    return (
        <SortableVerticalList items={employments} onNewSortOrder={saveSortOrder}>
            {employments.sort(sortByOrder).map((employment) => (
                <SortableItem key={employment.id} id={employment.id}>
                    <ListItemEmployment {...employment} />
                </SortableItem>
            ))}
        </SortableVerticalList>
    )
}