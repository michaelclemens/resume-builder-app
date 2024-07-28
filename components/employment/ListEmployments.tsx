"use client"

import ListItemEmployment from "./ListItemEmployment";
import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { useEmploymentList } from "@/hooks/list";
import { EmploymentWithHistory } from "@/lib/client/employment";

export default function ListEmployments({ employments: initialEmployments }: { employments: EmploymentWithHistory[] }) {
    const { employments, saveSortOrder } = useEmploymentList(initialEmployments);
    
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