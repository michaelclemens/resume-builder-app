import ListItemSkill from "./ListItemSkill";
import { sortByLatestCreated } from "@/util/sort";
import { Skill } from "@prisma/client";

export default function ListSkills({ skills }: { skills: Skill[] }) {
    if (!skills || !skills.length) return <p>No Skills</p>

    return (
        <div>
            {skills
                .sort(sortByLatestCreated)
                .map((skill) => <ListItemSkill key={skill.id} {...skill} />)}
        </div>
    )
}