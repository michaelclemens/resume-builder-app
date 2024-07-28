"use client"

import ListItemSkill from "./ListItemSkill";
import { sortByOrder } from "@/util/sort";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { useSkillList } from "@/hooks/list";
import { Skill } from "@prisma/client";

export default function ListSkills({ skills: initialSkills }: { skills: Skill[] }) {
    const { skills, saveSortOrder } = useSkillList(initialSkills);
    
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