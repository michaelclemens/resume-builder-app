import ListItemEducation from "./ListItemEducation";
import { sortByOrder } from "@/util/sort";
import { Education } from "@prisma/client";
import SortableVerticalList from "../SortableVerticalList";
import SortableItem from "../SortableItem";
import useEducation from "@/hooks/useEducation";

export default function ListEducations({ educations }: { educations: Education[] }) {
    const { saveSortOrder } = useEducation();
    
    if (!educations || !educations.length) return <p>No Educations</p>

    return (
        <SortableVerticalList items={educations} onNewSortOrder={saveSortOrder}>
            {educations.sort(sortByOrder).map((education) => (
                <SortableItem key={education.id} id={education.id}>
                    <ListItemEducation {...education} />
                </SortableItem>
            ))}
        </SortableVerticalList>
    )
}