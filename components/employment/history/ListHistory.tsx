"use client"

import { sortByOrder } from "@/util/sort";
import ListItemHistory from "./ListItemHistory";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { useEmploymentHistoryList } from "@/hooks";

export default function ListHistory({ employmentId }: { employmentId: string }) {
    const { histories, saveSortOrder } = useEmploymentHistoryList(employmentId);

    if (!histories || !histories.length) return <p>No Employment History</p>

    return (
        <SortableVerticalList items={histories} onNewSortOrder={(items) => saveSortOrder(employmentId, items)}>
            {histories.sort(sortByOrder).map((history) => (
                <SortableItem key={history.id} id={history.id}>
                    <ListItemHistory {...history} />
                </SortableItem>
            ))}
        </SortableVerticalList>
    )
}