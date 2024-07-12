import { EmploymentWithHistory } from "@/lib/client/employment";
import ListItemEmployment from "./ListItemEmployment";
import { sortByOrder } from "@/util/sort";
import SortableVerticalList from "../SortableVerticalList";
import SortableItem from "../SortableItem";
import useEmployment from "@/hooks/useEmployment";

export default function ListEmployments({ employments }: { employments: EmploymentWithHistory[] }) {
    const { saveSortOrder } = useEmployment();
    
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