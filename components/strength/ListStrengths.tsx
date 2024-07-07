import ListItemStrength from "./ListItemStrength";
import { sortByLatestCreated } from "@/util/sort";
import { getStrengths } from "@/lib/client/strength";

export default async function ListStrengths({ resumeId }: { resumeId: string }) {
    const strengths = await getStrengths(resumeId);

    if (!strengths || !strengths.length) { return <p>No Strengths</p> }

    return (
        <div>
            {strengths
                .sort(sortByLatestCreated)
                .map((strength) => <ListItemStrength key={strength.id} {...strength} />)}
        </div>
    )
}