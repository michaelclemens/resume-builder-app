"use client"

import { EmploymentWithHistory } from "@/lib/client/employment";
import ListItemEmployment from "./ListItemEmployment";
import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { useEmployment } from "@/hooks";

export default function ListEmployments({ initialEmployments }: { initialEmployments?: EmploymentWithHistory[] }) {
    const { employments, saveSortOrder } = useEmployment(initialEmployments);
    
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