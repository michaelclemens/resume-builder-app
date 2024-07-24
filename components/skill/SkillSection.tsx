import ListSkills from "./ListSkills";
import FormSkill from "./FormSkill";
import { Skill } from "@prisma/client";

export default async function SkillSection({ resumeId, initialSkills }: { resumeId: string, initialSkills?: Skill[] }) {  
    return (
        <>
            <ListSkills initialSkills={initialSkills}/>
            <FormSkill resumeId={resumeId} />
        </>
    )
}