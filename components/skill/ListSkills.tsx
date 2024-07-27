"use client"

import ListItemSkill from "./ListItemSkill";
import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { useSkillList } from "@/hooks";
import { useEffect } from "react";
import Loading from "@/app/loading";

export default function ListSkills({ resumeId }: { resumeId: string }) {
    const { skills, loading, fetch, saveSortOrder } = useSkillList();
    
    useEffect(() => { fetch(resumeId) }, [resumeId]);

    if (loading) return <Loading/>
    if (!skills || !skills.length) return <p>No Skills</p>

    return (
        <SortableVerticalList items={skills} onNewSortOrder={saveSortOrder}>
            {skills.sort(sortByOrder).map((skill) => (
                <SortableItem key={skill.id} id={skill.id}>
                    <ListItemSkill {...skill} />
                </SortableItem>
            ))}
        </SortableVerticalList>
    )
}