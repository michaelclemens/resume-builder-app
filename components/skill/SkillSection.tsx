import ListSkills from "./ListSkills";
import FormSkill from "./FormSkill";

export default async function SkillSection({ resumeId }: { resumeId: string }) {  
    return (
        <>
            <ListSkills resumeId={resumeId}/>
            <FormSkill resumeId={resumeId} />
        </>
    )
}