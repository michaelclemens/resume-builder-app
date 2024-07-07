import ListItemSkill from "./ListItemSkill";
import { sortByLatestCreated } from "@/util/sort";
import { getSkills } from "@/lib/client/skill";

export default async function ListSkills({ resumeId }: { resumeId: string }) {
    const skills = await getSkills(resumeId);

    if (!skills || !skills.length) { return <p>No Skills</p> }

    return (
        <div>
            {skills
                .sort(sortByLatestCreated)
                .map((skill) => <ListItemSkill key={skill.id} {...skill} />)}
        </div>
    )
}