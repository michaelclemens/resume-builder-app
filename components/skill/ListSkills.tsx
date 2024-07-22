import ListItemSkill from "./ListItemSkill";
import { sortByOrder } from "@/util/sort";
import { Skill } from "@prisma/client";
import { SortableVerticalList, SortableItem } from "@/components/list";
import { useSkill } from "@/hooks";

export default function ListSkills({ skills }: { skills: Skill[] }) {
    const { saveSortOrder } = useSkill();

    if (!skills.length) return <p>No Skills</p>

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