import { sortByOrder } from "@/util/sort";
import { EmploymentHistory } from "@prisma/client";
import ListItemHistory from "./ListItemHistory";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { useEmploymentHistory } from "@/hooks";

export default function ListHistory({ employmentId, histories }: { employmentId: string, histories: EmploymentHistory[] }) {
    const { saveSortOrder } = useEmploymentHistory();

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