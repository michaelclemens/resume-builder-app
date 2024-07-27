"use client"

import ListItemEducation from "./ListItemEducation";
import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem }  from "@/components/list";
import { useEducationList } from "@/hooks";
import { useEffect } from "react";
import Loading from "@/app/loading";

export default function ListEducations({ resumeId }: { resumeId: string }) {
    const { educations, loading, fetch, saveSortOrder } = useEducationList();

    useEffect(() => { fetch(resumeId) }, [resumeId]);
    
    if (loading) return <Loading/>
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