"use client"

import ListItemEducation from "./ListItemEducation";
import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem }  from "@/components/list";
import { useEducationList } from "@/hooks/list";
import { Education } from "@prisma/client";

export default function ListEducations({ educations: initialEducations }: { educations: Education[] }) {
    const { educations, saveSortOrder } = useEducationList(initialEducations);
    
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