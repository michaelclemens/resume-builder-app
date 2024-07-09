import { EmploymentWithHistory } from "@/lib/client/employment";
import ListItemEmployment from "./ListItemEmployment";
import { sortByLatestCreated } from "@/util/sort";

export default function ListEmployments({ employments }: { employments: EmploymentWithHistory[]}) {
    if (!employments || !employments.length) return <p>No Employments</p>

    return (
        <div>
            {employments
                .sort(sortByLatestCreated)
                .map((employment) => <ListItemEmployment key={employment.id} {...employment} />)}
        </div>
    )
}