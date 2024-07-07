import { sortByLatestCreated } from "@/util/sort";
import { EmploymentHistory } from "@prisma/client";
import ListItemHistory from "./ListItemHistory";

export default function ListHistory({ history }: { history: EmploymentHistory[] }) {
    if (!history || !history.length) { return <p>No Employment History</p> }

    return (
        <div>
            {history
                .sort(sortByLatestCreated)
                .map((item) => <ListItemHistory key={item.id} {...item} />)}
        </div>
    )
}