import ListSkills from "./ListSkills";
import FormSkill from "./FormSkill";
import { Skill } from "@prisma/client";

export default function SkillSection({ resumeId, skills }: { resumeId: string, skills: Skill[] }) {
    return (
        <>
            <ListSkills skills={skills} />
            <FormSkill resumeId={resumeId} />
        </>
    )
}