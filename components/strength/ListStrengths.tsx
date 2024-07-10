import ListItemStrength from "./ListItemStrength";
import { sortByLatestCreated } from "@/util/sort";
import { Strength } from "@prisma/client";

export default function ListStrengths({ strengths }: { strengths: Strength[] }) {
    if (!strengths || !strengths.length) return <p>No Strengths</p>

    return (
        <div>
            {strengths
                .sort(sortByLatestCreated)
                .map((strength) => <ListItemStrength key={strength.id} {...strength} />)}
        </div>
    )
}